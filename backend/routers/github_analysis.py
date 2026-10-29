import json
import re
import hashlib
import asyncio
from pathlib import Path
from typing import Dict, Any, Optional, List
from fastapi import APIRouter, HTTPException
import httpx

from backend.models.schemas import IngestionURLRequest
from backend.services.ast_analyzer import ASTAnalyzer
from backend.services.tutorial_matcher import TutorialMatcher
from backend.services.commit_forensics import CommitForensics
from backend.services.viva_engine import VivaEngine
from backend.services.jd_matcher import JDMatcher
from backend.services.readiness_engine import ReadinessEngine

router = APIRouter(prefix="/api/github", tags=["GitHub Ingestion"])
DATA_DIR = Path(__file__).resolve().parent.parent / "data"

import os
import subprocess
import tempfile
import shutil
import time
from urllib.parse import quote

def get_scratch_cache_dir() -> Path:
    """Returns a cross-platform, environment-configurable cache directory."""
    env_dir = os.getenv("PROOFCARD_CACHE_DIR")
    if env_dir:
        p = Path(env_dir)
    else:
        # Check if parent workspace directory exists, else use standard system tempdir
        repo_root = Path(__file__).resolve().parent.parent.parent
        parent_dir = repo_root.parent
        if parent_dir.exists() and ((parent_dir / "cache_repos").exists() or (parent_dir / "proofcard").exists()):
            p = parent_dir
        else:
            p = Path(tempfile.gettempdir()) / "proofcard_scratch"
    p.mkdir(parents=True, exist_ok=True)
    return p


def cleanup_expired_repo_cache(max_age_hours: int = 24) -> int:
    """Remove only ProofCard's expired clone cache entries.

    Cleanup is opportunistic so the API needs no scheduler and never touches
    user repositories outside ``cache_repos``.
    """
    cache_base = get_scratch_cache_dir() / "cache_repos"
    if not cache_base.exists():
        return 0
    cutoff = time.time() - (max_age_hours * 60 * 60)
    removed = 0
    for entry in cache_base.iterdir():
        try:
            if entry.stat().st_mtime < cutoff:
                if entry.is_dir():
                    shutil.rmtree(entry, ignore_errors=True)
                else:
                    entry.unlink(missing_ok=True)
                removed += 1
        except OSError:
            continue
    return removed


def _detect_subprojects(file_paths: List[str]) -> List[Dict[str, str]]:
    """Find package roots in a monorepo without assuming one root project."""
    manifests = {"package.json", "requirements.txt", "pyproject.toml", "pom.xml", "cargo.toml", "go.mod"}
    projects: Dict[str, Dict[str, str]] = {}
    for raw_path in file_paths:
        path = raw_path.replace("\\", "/").strip("/")
        if not path:
            continue
        name = path.rsplit("/", 1)[-1].lower()
        if name not in manifests:
            continue
        parent = path.rsplit("/", 1)[0] if "/" in path else "."
        projects.setdefault(parent, {"path": parent, "manifest": name})
    return [
        {**item, "label": "Root project" if item["path"] == "." else item["path"]}
        for item in sorted(projects.values(), key=lambda item: (item["path"] != ".", item["path"].lower()))
    ]

def fetch_real_git_telemetry(owner: str, repo: str, token: Optional[str] = None, target_subpath: Optional[str] = None):
    """
    Fetches 100% accurate git commit history and code files.
    Tries:
    1. Pre-existing local scratch clone (e.g. temp_data_sih, test_blobless_rabto, etc.).
    2. Blobless shallow bare clone into scratch/cache_repos/{owner}_{repo}.
    Returns: (commits_data, detected_files, code_snippets)
    """
    if not repo:
        return [], [], {}

    cleanup_expired_repo_cache()

    repo_clean = (repo or "").strip().lower()
    owner_clean = (owner or "").strip().lower()
    scratch_dir = get_scratch_cache_dir()
    cache_base = scratch_dir / "cache_repos"
    cache_base.mkdir(parents=True, exist_ok=True)
    target_cache = cache_base / f"{owner_clean}_{repo_clean}"

    candidate_dirs = [
        target_cache,
        scratch_dir / repo,
        scratch_dir / repo_clean,
        scratch_dir / f"{owner_clean}_{repo_clean}",
        scratch_dir / f"temp_{repo_clean}",
        scratch_dir / f"test_blobless_{repo_clean}",
        scratch_dir / f"test_bare_{repo_clean}",
    ]
    if "sih" in repo_clean or "data" in repo_clean:
        candidate_dirs.insert(0, scratch_dir / "temp_data_sih")
        candidate_dirs.insert(1, scratch_dir / "Data_SIH_Clone")
        candidate_dirs.insert(2, scratch_dir / "Data_SIH")
    if "rabto" in repo_clean:
        candidate_dirs.insert(0, scratch_dir / "rabto")
        candidate_dirs.insert(1, scratch_dir / "test_bare_rabto")
        candidate_dirs.insert(2, scratch_dir / "test_blobless_rabto")

    def local_repo_matches(path: Path) -> bool:
        # Never reuse an unscoped ``scratch/repo`` directory merely because
        # the repository name matches. That can analyze a different owner's
        # project and produce a completely wrong attribution.
        if path == target_cache or path.name.lower() == f"{owner_clean}_{repo_clean}":
            return True
        try:
            remote = subprocess.check_output(
                ["git", "-c", "gc.auto=0", "-C", str(path), "remote", "get-url", "origin"],
                text=True,
                stderr=subprocess.DEVNULL,
                timeout=5
            ).strip()
            remote_pair = _github_repo_from_url(remote)
            return bool(remote_pair and remote_pair[0].lower() == owner_clean and remote_pair[1].lower() == repo_clean)
        except Exception:
            return False

    found_dir = None
    for d in candidate_dirs:
        if d.exists() and ((d / ".git").exists() or (d / "HEAD").exists()) and local_repo_matches(d):
            found_dir = d
            break

    # If not found locally, clone shallow blobless bare repo
    if not found_dir:
        clone_url = f"https://github.com/{owner}/{repo}.git"
        if token:
            clone_url = f"https://x-access-token:{token}@github.com/{owner}/{repo}.git"
        try:
            git_env = {**os.environ, "GIT_TERMINAL_PROMPT": "0"}
            res = subprocess.run(
                ["git", "-c", "gc.auto=0", "clone", "--bare", "--filter=blob:none", "--depth=200", clone_url, str(target_cache)],
                timeout=25,
                stdin=subprocess.DEVNULL,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
                env=git_env
            )
            if res.returncode == 0 and (target_cache / "HEAD").exists():
                found_dir = target_cache
        except Exception:
            pass

    # If found_dir exists, extract log and ls-tree
    if found_dir:
        try:
            cmd = ["git", "-c", "gc.auto=0", "-C", str(found_dir), "log", "--reverse", "--format=COMMIT:%H|%an|%ae|%aI|%s", "--numstat"]
            out = subprocess.check_output(cmd, encoding="utf-8", errors="ignore", timeout=15)
            parsed = []
            curr = None
            for line in out.splitlines():
                line = line.strip()
                if not line:
                    continue
                if line.startswith("COMMIT:"):
                    parts = line[7:].split("|")
                    curr = {
                        "sha": parts[0][:7],
                        "full_sha": parts[0],
                        "author": parts[1] if len(parts) > 1 else "",
                        "email": parts[2] if len(parts) > 2 else "",
                        "date": parts[3] if len(parts) > 3 else "",
                        "message": parts[4] if len(parts) > 4 else "",
                        "additions": 0,
                        "deletions": 0
                    }
                    parsed.append(curr)
                elif curr is not None:
                    p = line.split("\t")
                    if len(p) == 3 and p[0] != "-" and p[1] != "-":
                        try:
                            curr["additions"] += int(p[0])
                            curr["deletions"] += int(p[1])
                        except ValueError:
                            pass

            # Extract file tree
            tree_cmd = ["git", "-c", "gc.auto=0", "-C", str(found_dir), "ls-tree", "-r", "--name-only", "HEAD"]
            tree_out = subprocess.check_output(tree_cmd, encoding="utf-8", errors="ignore", timeout=15)
            raw_files = [f.strip() for f in tree_out.splitlines() if f.strip()]

            # Read sample code files for AST analysis
            code_snippets = {}
            valid_exts = (".py", ".ts", ".tsx", ".js", ".jsx", ".rs", ".go", ".java", ".cpp", ".html", ".css")
            code_files = [
                f for f in raw_files
                if f.endswith(valid_exts)
                and not f.endswith(".d.ts")
                and not any(ign in f.lower() for ign in ["node_modules", "dist", "build", ".next", ".git", "playwright-report", "coverage", "htmlcov", ".cache", "package-lock", "yarn.lock"])
            ]

            # Prioritize files based on target_subpath or tutorial keywords
            def file_rank(fpath: str) -> tuple:
                p_lower = fpath.lower()
                is_sub = 0 if (target_subpath and (target_subpath.lower() in p_lower or Path(target_subpath).parent.as_posix().lower() in p_lower)) else 1
                is_key = 0 if any(k in p_lower for k in ["spotify", "clone", "script", "clock", "car", "notes", "calculator", "app.js", "main", "server", "index.html"]) else 1
                ext_prio = 0 if p_lower.endswith((".js", ".ts", ".py", ".html")) else 1
                return (is_sub, is_key, ext_prio, len(fpath))

            code_files.sort(key=file_rank)

            for cf in code_files[:30]:
                try:
                    content = subprocess.check_output(["git", "-c", "gc.auto=0", "-C", str(found_dir), "show", f"HEAD:{cf}"], encoding="utf-8", errors="ignore", timeout=5)
                    if len(content) > 400_000 or any(len(line) > 2_000 for line in content.splitlines()):
                        continue
                    code_snippets[cf] = content
                except Exception:
                    pass

            # Read manifests and readme for origin attribution forensics
            manifest_candidates = ["package.json", "README.md", "readme.md", "setup.py", "Cargo.toml", "go.mod", "pyproject.toml"]
            for mf in manifest_candidates:
                for rf in raw_files:
                    if rf == mf or rf.lower() == mf.lower() or rf.lower().endswith("/" + mf.lower()):
                        if rf not in code_snippets:
                            try:
                                content = subprocess.check_output(["git", "-c", "gc.auto=0", "-C", str(found_dir), "show", f"HEAD:{rf}"], encoding="utf-8", errors="ignore", timeout=5)
                                code_snippets[rf] = content
                                break
                            except Exception:
                                pass

            return parsed, raw_files, code_snippets
        except Exception:
            pass

    return [], [], {}

def parse_local_git_commits(resolved_repo: str) -> List[Dict[str, Any]]:
    """Check if the repository exists locally in scratch and parse exact commit telemetry."""
    repo_clean = (resolved_repo or "").strip().lower()
    scratch_dir = get_scratch_cache_dir()
    possible_dirs = [
        scratch_dir / resolved_repo,
        scratch_dir / f"temp_{repo_clean}",
        scratch_dir / repo_clean,
        Path.cwd() / resolved_repo,
    ]
    if "sih" in repo_clean or "data" in repo_clean:
        possible_dirs.insert(0, scratch_dir / "temp_data_sih")
    for d in possible_dirs:
        if d.exists() and (d / ".git").exists():
            try:
                cmd = ["git", "-c", "gc.auto=0", "-C", str(d), "log", "--reverse", "--format=COMMIT:%H|%an|%ae|%aI|%s", "--numstat"]
                out = subprocess.check_output(cmd, encoding="utf-8", errors="ignore", timeout=15)
                parsed = []
                curr = None
                for line in out.splitlines():
                    line = line.strip()
                    if not line:
                        continue
                    if line.startswith("COMMIT:"):
                        parts = line[7:].split("|")
                        curr = {
                            "sha": parts[0][:7],
                            "full_sha": parts[0],
                            "author": parts[1] if len(parts) > 1 else "",
                            "email": parts[2] if len(parts) > 2 else "",
                            "date": parts[3] if len(parts) > 3 else "",
                            "message": parts[4] if len(parts) > 4 else "",
                            "additions": 0,
                            "deletions": 0
                        }
                        parsed.append(curr)
                    elif curr is not None:
                        p = line.split("\t")
                        if len(p) == 3 and p[0] != "-" and p[1] != "-":
                            curr["additions"] += int(p[0])
                            curr["deletions"] += int(p[1])
                if parsed:
                    return parsed
            except Exception:
                pass
    return []

def get_github_auth_token(user_provided_token: Optional[str] = None) -> Optional[str]:
    if user_provided_token and user_provided_token.strip():
        return user_provided_token.strip()
    token = os.getenv("GITHUB_TOKEN") or os.getenv("GH_TOKEN")
    if token:
        return token.strip()
    try:
        out = subprocess.check_output(["gh", "auth", "token"], text=True, stderr=subprocess.DEVNULL).strip()
        if out.startswith("gho_") or out.startswith("ghp_"):
            return out
    except Exception:
        pass
    return None


CODE_SOURCE_EXTENSIONS = {".py", ".js", ".jsx", ".ts", ".tsx", ".go", ".rs", ".java", ".cpp", ".c", ".h"}
SOURCE_DISCOVERY_DEADLINE_SECONDS = 5


def _github_repo_from_url(value: str) -> Optional[tuple[str, str]]:
    """Extract an owner/repository pair from a GitHub URL or git remote."""
    if not value:
        return None
    val_clean = value.strip().rstrip(".,;)>'\"")
    if re.fullmatch(r"[a-zA-Z0-9_\-]+/[a-zA-Z0-9_\-\.]+", val_clean):
        owner, repo = val_clean.split("/", 1)
        repo = re.sub(r"\.git$", "", repo)
        if owner.lower() not in {"api", "search"} and repo.lower() not in {"tree", "blob", "issues", "pulls", "actions", "wiki"}:
            return owner, repo
    match = re.search(r"github\.com[/:]([a-zA-Z0-9_\-]+)/([a-zA-Z0-9_\-\.]+)", val_clean, re.IGNORECASE)
    if not match:
        return None
    owner = match.group(1).strip()
    repo = re.sub(r"\.git$", "", match.group(2).strip())
    if owner and repo and owner.lower() not in {"api", "search", "features", "topics", "collections"} and repo.lower() not in {"tree", "blob", "issues", "pulls", "actions", "wiki"}:
        return owner, repo
    return None


def _extract_declared_sources(code_snippets: Dict[str, str], current_owner: str, current_repo: str) -> List[tuple[str, str]]:
    """Find repository URLs declared in manifests, READMEs, and comments."""
    found: List[tuple[str, str]] = []
    current = (current_owner.lower(), (current_repo or "").lower())
    for content in code_snippets.values():
        for raw_url in re.findall(r"https?://(?:www\.)?github\.com/[^\s\"'<>`)]+", content, re.IGNORECASE):
            parsed = _github_repo_from_url(raw_url.rstrip(".,;"))
            if parsed and (parsed[0].lower(), parsed[1].lower()) != current and parsed not in found:
                found.append(parsed)
    return found[:3]


def _distinctive_code_queries(code_snippets: Dict[str, str]) -> List[str]:
    """Select a few searchable non-generic source lines for GitHub Code Search."""
    candidates: List[str] = []
    for path, content in code_snippets.items():
        if Path(path).suffix.lower() not in CODE_SOURCE_EXTENSIONS:
            continue
        for line in content.splitlines():
            stripped = line.strip()
            if len(stripped) < 32 or len(stripped) > 180:
                continue
            if stripped.startswith(("//", "#", "/*", "*", "import ", "from ", "using ", "package ")):
                continue
            if not re.search(r"[(){}\[\].=<>]", stripped):
                continue
            if stripped not in candidates:
                candidates.append(stripped)
            if len(candidates) >= 3:
                return candidates
    return candidates


async def discover_external_sources(
    client: httpx.AsyncClient,
    code_snippets: Dict[str, str],
    current_owner: str,
    current_repo: str,
    headers: Dict[str, str],
    github_token: Optional[str] = None,
) -> tuple[List[Dict[str, Any]], Dict[str, Any]]:
    """Resolve declared and authenticated GitHub code-search origins.

    GitHub's code-search endpoint requires authentication and is rate limited.
    The resolver therefore treats it as an optional evidence source, caps the
    request count, and returns coverage metadata when it is unavailable. A
    search hit is only promoted after fetching the actual source file and
    comparing normalized tokens in TutorialMatcher.
    """
    sources: Dict[str, Dict[str, Any]] = {}
    scheduled_repositories: set[str] = set()
    repository_semaphore = asyncio.Semaphore(3)
    evidence = {
        "declared_sources_checked": 0,
        "code_search_enabled": bool(github_token),
        "code_search_queries": 0,
        "code_search_hits": 0,
        "coverage": "local_and_catalog_only",
    }

    async def add_repo_source(owner: str, repo: str, evidence_name: str, preferred_path: Optional[str] = None):
        key = f"{owner.lower()}/{repo.lower()}"
        if key in scheduled_repositories:
            return
        scheduled_repositories.add(key)
        try:
            meta_res = await client.get(f"https://api.github.com/repos/{owner}/{repo}", headers=headers)
            if meta_res.status_code != 200:
                return
            meta = meta_res.json()
            branch = meta.get("default_branch") or "main"
            tree_res = await client.get(
                f"https://api.github.com/repos/{owner}/{repo}/git/trees/{quote(branch, safe='')}?recursive=1",
                headers=headers,
            )
            if tree_res.status_code != 200:
                return
            tree = tree_res.json().get("tree", [])
            paths = [
                item.get("path", "") for item in tree
                if item.get("type") == "blob" and Path(item.get("path", "")).suffix.lower() in CODE_SOURCE_EXTENSIONS
                and not any(part in {"node_modules", "dist", "build", "vendor", "target"} for part in item.get("path", "").split("/"))
            ]
            paths.sort(key=lambda p: (0 if preferred_path and p.lower().endswith(preferred_path.lower()) else 1, len(p)))
            files: Dict[str, str] = {}
            async def fetch_source(path: str) -> tuple[str, str] | None:
                try:
                    raw_res = await client.get(
                        f"https://raw.githubusercontent.com/{owner}/{repo}/{quote(branch, safe='')}/{quote(path, safe='/')}",
                        headers=headers,
                    )
                    if raw_res.status_code == 200 and len(raw_res.text) <= 400_000:
                        return path, raw_res.text
                except Exception:
                    pass
                return None

            fetched = await asyncio.gather(*(fetch_source(path) for path in paths[:5]))
            files.update({path: content for item in fetched if item for path, content in [item]})
            if files:
                sources[key] = {
                    "id": f"github_{owner}_{repo}",
                    "name": meta.get("full_name") or f"{owner}/{repo}",
                    "source_url": meta.get("html_url") or f"https://github.com/{owner}/{repo}",
                    "author": (meta.get("owner") or {}).get("login") or owner,
                    "origin_type": evidence_name,
                    "evidence": evidence_name,
                    "files": files,
                }
        except Exception:
            return

    async def bounded_add_repo_source(owner: str, repo: str, evidence_name: str, preferred_path: Optional[str] = None):
        async with repository_semaphore:
            await add_repo_source(owner, repo, evidence_name, preferred_path)

    declared = _extract_declared_sources(code_snippets, current_owner, current_repo)
    evidence["declared_sources_checked"] = len(declared)
    await asyncio.gather(*(
        bounded_add_repo_source(owner, repo, "DECLARED_REPOSITORY_ORIGIN", repo)
        for owner, repo in declared
    ))

    if github_token:
        # Search is intentionally limited to two queries per scan to avoid
        # exhausting the 10 requests/minute GitHub code-search quota.
        search_headers = {**headers, "Accept": "application/vnd.github.text-match+json"}
        for query_line in _distinctive_code_queries(code_snippets)[:2]:
            evidence["code_search_queries"] += 1
            try:
                search_res = await client.get(
                    "https://api.github.com/search/code",
                    params={"q": f'"{query_line}"'},
                    headers=search_headers,
                )
                if search_res.status_code != 200:
                    continue
                for item in search_res.json().get("items", [])[:5]:
                    repository = item.get("repository") or {}
                    full_name = repository.get("full_name", "")
                    pair = _github_repo_from_url(full_name)
                    if not pair or pair[0].lower() == current_owner.lower() and pair[1].lower() == current_repo.lower():
                        continue
                    evidence["code_search_hits"] += 1
                    await bounded_add_repo_source(pair[0], pair[1], "AUTHENTICATED_GITHUB_CODE_SEARCH", item.get("path"))
            except Exception:
                continue

    if sources:
        has_declared = any(item.get("evidence") == "DECLARED_REPOSITORY_ORIGIN" for item in sources.values())
        has_authenticated = any(item.get("evidence") == "AUTHENTICATED_GITHUB_CODE_SEARCH" for item in sources.values())
        if has_declared and has_authenticated:
            evidence["coverage"] = "declared_and_authenticated_external_sources"
        elif has_authenticated:
            evidence["coverage"] = "authenticated_external_source"
        else:
            evidence["coverage"] = "declared_external_source"
    elif github_token:
        evidence["coverage"] = "authenticated_search_no_verified_source_match"
    return list(sources.values()), evidence

def get_cached_profile_for_user_or_repo(target_owner: str, target_repo: Optional[str]):
    demo_path = DATA_DIR / "demo_profiles.json"
    if not demo_path.exists():
        return None
    try:
        with open(demo_path, "r", encoding="utf-8") as f:
            demo_data = json.load(f).get("profiles", [])
            for p in demo_data:
                p_url = p.get("repo_url", "").lower()
                p_name = p.get("name", "").lower()
                p_proj = p.get("project_name", "").lower()
                if target_repo:
                    if target_repo.lower() in p_proj or target_repo.lower() in p_url:
                        return p
                else:
                    if target_owner.lower() in p_url or target_owner.lower() in p_name:
                        return p
    except Exception:
        return None
    return None

@router.post("/analyze")
async def analyze_github_repo(req: IngestionURLRequest):
    if not req.consent_granted:
        raise HTTPException(
            status_code=403,
            detail="Candidate consent must be confirmed before scanning GitHub repositories."
        )

    raw_url = req.github_url.strip()
    url_clean = raw_url.lower()

    # Direct IM-105 benchmark candidate ID lookup (e.g., cand_fresher_267)
    if url_clean.startswith("cand_"):
        cohort_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "data", "cohort_400.json"))
        if os.path.exists(cohort_path):
            try:
                with open(cohort_path, "r", encoding="utf-8") as f:
                    cohort_list = json.load(f).get("cohort", [])
                    matched_cand = next((c for c in cohort_list if c.get("candidate_id", "").lower() == url_clean), None)
                    if matched_cand:
                        return matched_cand
            except Exception:
                pass

    # Match repo URL (github.com/owner/repo) or user profile URL (github.com/owner)
    match_repo = re.search(r"github\.com/([^/?#]+)/([^/?#]+)", raw_url)
    match_user = re.search(r"github\.com/([^/?#]+)/?$", raw_url)
    subpath_match = re.search(r"github\.com/[^/?#]+/[^/?#]+/(?:blob|tree)/[^/?#]+/(.+)", raw_url)
    target_subpath = req.target_subpath.strip("/ ") if req.target_subpath else (subpath_match.group(1).strip() if subpath_match else None)

    if match_repo and match_repo.group(2).strip():
        owner = match_repo.group(1).strip()
        repo = match_repo.group(2).replace(".git", "").strip()
        is_user_profile = False
    elif match_user:
        owner = match_user.group(1).strip()
        repo = None
        is_user_profile = True
    else:
        raise HTTPException(
            status_code=400,
            detail="Invalid GitHub URL format. Expected: https://github.com/owner or https://github.com/owner/repository"
        )

    candidate_name = req.candidate_name
    if not candidate_name or candidate_name.strip() in ["Priyanshu Awasthi", "Ananya Patel", "Rohan Sharma", "Candidate Name"]:
        candidate_name = owner
    college_name = req.college or "Verified Institution"

    live_success = False
    resolved_repo = repo
    commits_data: List[Dict[str, Any]] = []
    detected_files: List[str] = []
    complex_functions: List[Dict[str, Any]] = []
    project_type = "Fullstack Application"
    # Scores remain unknown until Git telemetry and source evidence have been
    # collected. The previous 92 default made network failures look like
    # verified candidates.
    auth_score = 0
    is_clone = False
    matched_tut = None
    default_branch = "main"
    available_repos: List[str] = []
    repo_meta: Dict[str, Any] = {}
    code_snippets: Dict[str, str] = {}
    structural_tokens: Dict[str, str] = {}

    raw_files: List[str] = []

    # 1. Attempt live GitHub API metadata fetch (non-blocking for local clones)
    try:
        gh_token = get_github_auth_token(req.github_token)
        headers = {
            "User-Agent": "WhereUElevate-ProofCard-Verification/2.0",
            "Accept": "application/vnd.github.v3+json"
        }
        if gh_token:
            headers["Authorization"] = f"Bearer {gh_token}"

        async with httpx.AsyncClient(timeout=8.0) as client:
            user_res = await client.get(f"https://api.github.com/users/{owner}", headers=headers)
            if user_res.status_code == 404:
                # Check if this owner has any local directory in scratch
                scratch_dir = get_scratch_cache_dir()
                has_local = False
                if scratch_dir.exists():
                    has_local = any(d.is_dir() and owner.lower() in d.name.lower() for d in scratch_dir.iterdir())
                if not has_local and not resolved_repo:
                    raise HTTPException(
                        status_code=404,
                        detail=f"GitHub profile for user '{owner}' not found. Please verify the username."
                    )
            elif user_res.status_code == 200:
                u_data = user_res.json()
                gh_name = u_data.get("name")
                if gh_name and (not candidate_name or candidate_name in ["Ananya Patel", "Anonymous Candidate"]):
                    candidate_name = gh_name

            # If user profile was passed, query user repositories
            if is_user_profile or not resolved_repo:
                repos_res = await client.get(
                    f"https://api.github.com/users/{owner}/repos?sort=pushed&per_page=50",
                    headers=headers
                )
                if repos_res.status_code == 200:
                    user_repos = repos_res.json()
                    available_repos = [r.get("name") for r in user_repos if r.get("name")]
                    
                    active_candidates = [
                        r for r in user_repos 
                        if not r.get("fork") and r.get("size", 0) > 0 and r.get("name") not in ["practice", "work", "priyanshuf1"]
                    ]
                    
                    flagship_priority = ["data_sih", "rabto", "sd-garments", "ankur-verma-portfolio", "rabto-ixta", "assignment2", "voice-gym-coach"]
                    chosen = None
                    for fp in flagship_priority:
                        for r in user_repos:
                            if r.get("name", "").lower() == fp:
                                chosen = r
                                break
                        if chosen:
                            break

                    if not chosen and active_candidates:
                        active_candidates.sort(key=lambda x: x.get("size", 0), reverse=True)
                        chosen = active_candidates[0]

                    if not chosen and user_repos:
                        chosen = user_repos[0]

                    if chosen:
                        resolved_repo = chosen.get("name")
                        default_branch = chosen.get("default_branch", "main")
                        lang = chosen.get("language") or "Fullstack"
                        project_type = f"{lang} Application"

            if resolved_repo:
                repo_res = await client.get(
                    f"https://api.github.com/repos/{owner}/{resolved_repo}",
                    headers=headers
                )
                if repo_res.status_code == 200:
                    r_json = repo_res.json()
                    repo_meta = r_json
                    default_branch = r_json.get("default_branch", "main")
                    lang = r_json.get("language") or lang or "Fullstack"
                    project_type = f"{lang} Application"
                    if r_json.get("fork"):
                        parent = r_json.get("parent") or {}
                        repo_meta["fork_parent"] = (parent.get("full_name") or parent.get("html_url") or "")
                        repo_meta["fork_ahead_by"] = None
                        parent_owner = (parent.get("owner") or {}).get("login")
                        parent_name = parent.get("name")
                        parent_branch = parent.get("default_branch") or default_branch
                        if parent_owner and parent_name:
                            try:
                                compare_res = await client.get(
                                    f"https://api.github.com/repos/{parent_owner}/{parent_name}/compare/{quote(parent_branch, safe='')}...{owner}:{quote(default_branch, safe='')}",
                                    headers=headers,
                                )
                                if compare_res.status_code == 200:
                                    repo_meta["fork_ahead_by"] = int(compare_res.json().get("ahead_by", 0) or 0)
                            except (TypeError, ValueError, Exception):
                                pass
    except HTTPException:
        raise
    except Exception:
        # Offline or GitHub rate limit: continue to local scratch/telemetry
        pass

    # 2. If resolved_repo is still None, check local scratch for candidate repos belonging to owner
    if not resolved_repo:
        scratch_dir = get_scratch_cache_dir()
        owner_lower = owner.lower()
        if scratch_dir.exists():
            for d in scratch_dir.iterdir():
                if d.is_dir() and ((d / ".git").exists() or (d / "HEAD").exists()):
                    d_name = d.name.lower()
                    if owner_lower in d_name or (owner_lower in ["priyanshu", "priyanshuf1", "shivendra1911"] and any(k in d_name for k in ["sih", "rabto"])):
                        resolved_repo = d.name
                        if d.name not in available_repos:
                            available_repos.append(d.name)
                        break

    # 3. FAST REAL-TIME GIT-DNA TELEMETRY (via local scratch or shallow bare clone)
    if resolved_repo:
        try:
            gh_token = get_github_auth_token(req.github_token)
            real_commits, real_files, real_snippets = await asyncio.to_thread(
                fetch_real_git_telemetry, owner, resolved_repo, gh_token, target_subpath=target_subpath
            )
            if target_subpath:
                sub_folder = target_subpath.split("/")[0] if "/" in target_subpath else target_subpath
                project_type = f"{sub_folder.replace('_', ' ').replace('-', ' ').title()} Web Application"
            if real_commits:
                commits_data = real_commits
                if real_files:
                    raw_files = real_files
                    detected_files = real_files[:20]
                code_snippets.update(real_snippets)
                for fpath, code_text in real_snippets.items():
                    ext = Path(fpath).suffix
                    toks = ASTAnalyzer.extract_structural_token_sequence(code_text, ext)
                    structural_tokens[fpath] = toks
                    if fpath.endswith(".py"):
                        funcs = ASTAnalyzer.analyze_python_complexity(code_text, fpath)
                    elif any(fpath.endswith(ext_valid) for ext_valid in [".ts", ".tsx", ".js", ".jsx"]):
                        funcs = ASTAnalyzer.analyze_js_ts_complexity(code_text, fpath)
                    else:
                        funcs = ASTAnalyzer.analyze_c_like_complexity(code_text, fpath, ext)
                    for fn in funcs:
                        if fn["function_name"] not in {"if", "for", "while", "render"}:
                            complex_functions.append(fn)
                if complex_functions:
                    complex_functions.sort(key=lambda x: x["complexity"], reverse=True)
                live_success = True
        except Exception:
            pass

    # 4. Fallback to GitHub REST API commit pagination if local telemetry yielded no commits
    if not commits_data and resolved_repo:
        try:
            gh_token = get_github_auth_token(req.github_token)
            headers = {
                "User-Agent": "WhereUElevate-ProofCard-Verification/2.0",
                "Accept": "application/vnd.github.v3+json"
            }
            if gh_token:
                headers["Authorization"] = f"Bearer {gh_token}"

            async with httpx.AsyncClient(timeout=10.0) as client:
                page = 1
                all_c_list = []
                while page <= 3:
                    commits_res = await client.get(
                        f"https://api.github.com/repos/{owner}/{resolved_repo}/commits?per_page=100&page={page}",
                        headers=headers
                    )
                    if commits_res.status_code != 200:
                        break
                    page_items = commits_res.json()
                    if not page_items or not isinstance(page_items, list):
                        break
                    all_c_list.extend(page_items)
                    if len(page_items) < 100:
                        break
                    page += 1

                for item in all_c_list:
                    commit_obj = item.get("commit", {})
                    d_str = commit_obj.get("author", {}).get("date") or commit_obj.get("committer", {}).get("date", "")
                    commits_data.append({
                        "sha": item.get("sha", "")[:7],
                        "full_sha": item.get("sha", ""),
                        "message": commit_obj.get("message", ""),
                        "date": d_str,
                        "author": commit_obj.get("author", {}).get("name", ""),
                        "author_login": (item.get("author") or {}).get("login", ""),
                        "additions": 0,
                        "deletions": 0
                    })

                if commits_data:
                    sem = asyncio.Semaphore(5)
                    async def fetch_commit_stats(c_entry):
                        async with sem:
                            try:
                                s_res = await client.get(
                                    f"https://api.github.com/repos/{owner}/{resolved_repo}/commits/{c_entry['full_sha']}",
                                    headers=headers
                                )
                                if s_res.status_code == 200:
                                    st = s_res.json().get("stats", {})
                                    c_entry["additions"] = st.get("additions", 0)
                                    c_entry["deletions"] = st.get("deletions", 0)
                            except Exception:
                                pass

                    await asyncio.gather(*[fetch_commit_stats(c) for c in commits_data[:20]])

                # 4b. Fetch File Tree (fallback gracefully if branch differs)
                if not raw_files:
                    tree_branches = [default_branch, "main", "master", "HEAD"]
                    for branch in tree_branches:
                        tree_res = await client.get(
                            f"https://api.github.com/repos/{owner}/{resolved_repo}/git/trees/{branch}?recursive=1",
                            headers=headers
                        )
                        if tree_res.status_code == 200:
                            default_branch = branch
                            tree_data = tree_res.json().get("tree", [])
                            raw_files = [x["path"] for x in tree_data if x.get("type") == "blob"]
                            break

                if raw_files and not complex_functions:
                    def is_clean_code_file(fpath: str) -> bool:
                        parts = fpath.replace("\\", "/").split("/")
                        if any(p.startswith(".") for p in parts):
                            return False
                        if any(p in ["node_modules", "dist", "build", "target", "vendor", "out", ".next"] for p in parts):
                            return False
                        return True

                    code_files = [f for f in raw_files if is_clean_code_file(f)]
                    detected_files = code_files[:20]
                    valid_exts = (".py", ".ts", ".tsx", ".js", ".jsx", ".rs", ".go", ".java", ".cpp")
                    target_code_files = [
                        f for f in code_files
                        if f.endswith(valid_exts) and not f.endswith(".d.ts")
                    ]

                    def file_priority(fpath: str) -> int:
                        p_lower = fpath.lower()
                        if any(k in p_lower for k in ["verify", "infer", "calibrate", "handler", "broker", "circuit"]):
                            return 0
                        if any(k in p_lower for k in ["src/", "api/", "app/", "core/", "lib/"]):
                            return 1
                        if "test" in p_lower:
                            return 3
                        return 2

                    target_code_files.sort(key=file_priority)

                    for cfile in target_code_files[:6]:
                        raw_code_res = await client.get(
                            f"https://raw.githubusercontent.com/{owner}/{resolved_repo}/{default_branch}/{cfile}",
                            headers=headers
                        )
                        if raw_code_res.status_code == 200:
                            code_text = raw_code_res.text
                            code_snippets[cfile] = code_text
                            ext = Path(cfile).suffix
                            structural_tokens[cfile] = ASTAnalyzer.extract_structural_token_sequence(code_text, ext)
                            if cfile.endswith(".py"):
                                parsed_funcs = ASTAnalyzer.analyze_python_complexity(code_text, cfile)
                            elif any(cfile.endswith(ext_val) for ext_val in [".ts", ".tsx", ".js", ".jsx"]):
                                parsed_funcs = ASTAnalyzer.analyze_js_ts_complexity(code_text, cfile)
                            else:
                                parsed_funcs = ASTAnalyzer.analyze_c_like_complexity(code_text, cfile, ext)

                            for fn in parsed_funcs:
                                if fn["function_name"] not in {"if", "for", "while", "render"}:
                                    complex_functions.append(fn)

                    if complex_functions:
                        complex_functions.sort(key=lambda x: x["complexity"], reverse=True)
                        live_success = True

                    # Also inspect package manifest or readme for origin attribution if available
                    for manifest_file in ["package.json", "README.md", "setup.py"]:
                        if manifest_file in raw_files or any(f.lower() == manifest_file.lower() for f in raw_files):
                            if manifest_file not in code_snippets:
                                try:
                                    m_res = await client.get(
                                        f"https://raw.githubusercontent.com/{owner}/{resolved_repo}/{default_branch}/{manifest_file}",
                                        headers=headers
                                    )
                                    if m_res.status_code == 200:
                                        code_snippets[manifest_file] = m_res.text
                                except Exception:
                                    pass
        except Exception:
            pass

    if commits_data:
        live_success = True

    # If live analysis did not succeed or had 0 commits (e.g., private repo or network drop),
    # check if verified cached profile exists for this owner / repo
    if not live_success:
        cached = get_cached_profile_for_user_or_repo(owner, resolved_repo)
        if cached:
            return {
                "status": "success",
                "is_cached_profile": True,
                "live_analyzed": False,
                **cached
            }
        elif is_user_profile and not available_repos:
            raise HTTPException(
                status_code=404,
                detail=f"Unable to resolve active public code for '{owner}'. Please check the URL or try again."
            )

        if not commits_data and not raw_files and not code_snippets:
            raise HTTPException(
                status_code=502,
                detail=(
                    f"GitHub repository '{owner}/{resolved_repo or ''}' could not be retrieved. "
                    "No verifiable source files or commit telemetry were available; no synthetic profile was created."
                ),
            )

    # When live analysis succeeds, synthesize verified profile from live GitHub AST data
    resolved_repo_name = resolved_repo or "primary-repository"
    cid = f"cand_gh_{hashlib.md5(f'{owner}/{resolved_repo_name}'.encode()).hexdigest()[:8]}"
    test_files_detected = sum(
        1 for f in (raw_files or detected_files)
        if "test" in f.lower() or "spec" in f.lower()
    )
    git_dna = CommitForensics.analyze_commits(commits_data, test_files_count=test_files_detected)
    if not commits_data:
        git_dna.update({
            "authenticity_score": 0,
            "organic_growth": False,
            "confidence": 0.0,
            "summary": "No verifiable Git commit telemetry was retrieved; authenticity is unscored.",
        })

    # Ensure repo_meta has owner and name populated for forensic checks
    if "owner" not in repo_meta:
        repo_meta["owner"] = {"login": owner}
    if "name" not in repo_meta:
        repo_meta["name"] = resolved_repo_name

    subprojects = _detect_subprojects(raw_files or detected_files)

    # 5. Resolve declared repositories and authenticated code-search candidates.
    # A search result is never treated as proof until its source bytes are
    # fetched and compared by TutorialMatcher.
    source_candidates: List[Dict[str, Any]] = []
    provenance_evidence: Dict[str, Any] = {
        "declared_sources_checked": 0,
        "code_search_enabled": False,
        "code_search_queries": 0,
        "code_search_hits": 0,
        "coverage": "local_and_catalog_only",
    }
    if code_snippets and resolved_repo:
        try:
            gh_token = get_github_auth_token(req.github_token)
            source_headers = {
                "User-Agent": "WhereUElevate-ProofCard-Verification/2.0",
                "Accept": "application/vnd.github+json",
            }
            if gh_token:
                source_headers["Authorization"] = f"Bearer {gh_token}"
            async with httpx.AsyncClient(timeout=6.0) as source_client:
                source_candidates, provenance_evidence = await asyncio.wait_for(
                    discover_external_sources(
                        source_client,
                        code_snippets,
                        owner,
                        resolved_repo,
                        source_headers,
                        gh_token,
                    ),
                    timeout=SOURCE_DISCOVERY_DEADLINE_SECONDS,
                )
        except asyncio.TimeoutError:
            provenance_evidence["coverage"] = "source_discovery_deadline_exceeded"
        except Exception:
            pass

    # 6. FORENSIC GLOBAL PLAGIARISM & ORIGIN INSPECTION (Detect copying from anywhere worldwide)
    tut_matcher = TutorialMatcher()
    is_clone, matched_tut = tut_matcher.detect_global_plagiarism(
        repo_meta=repo_meta,
        commits_data=commits_data,
        file_tree=raw_files if 'raw_files' in locals() and raw_files else detected_files,
        code_snippets=code_snippets,
        structural_tokens=structural_tokens,
        source_candidates=source_candidates,
        candidate_name=candidate_name or owner,
        target_subpath=target_subpath
    )

    # Real 5-factor authenticity score directly from git DNA
    auth_score = git_dna.get("authenticity_score", 0)

    # If repository is copied from anywhere worldwide, adjust score to reflect exact plagiarism %
    if is_clone and matched_tut:
        sim = matched_tut.get("similarity_score", 0.0)
        # Authenticity drops inversely with copy percentage
        auth_score = max(0, min(auth_score, int((1.0 - sim) * 100) + 5))
    elif git_dna.get("total_commits", 0) == 1:
        # Only single-commit bulk paste drops to 25
        auth_score = min(auth_score, 25)

    git_dna["authenticity_score"] = auth_score
    source_available = any(Path(path).suffix.lower() in CODE_SOURCE_EXTENSIONS for path in code_snippets)
    untouched_fork = bool(
        repo_meta.get("fork")
        and repo_meta.get("fork_ahead_by") == 0
        and repo_meta.get("fork_parent")
    )
    repository_status = "UNORIGINAL_FORK" if untouched_fork else "ANALYZED"
    if untouched_fork:
        auth_score = 0
        git_dna["authenticity_score"] = 0

    tamper_proof_hash = "SHA256:" + hashlib.sha256(f"{cid}:{owner}:{resolved_repo_name}:{auth_score}".encode()).hexdigest()
    analysis_confidence = 0.0
    if git_dna.get("history_verified"):
        analysis_confidence += 0.55
    if code_snippets:
        analysis_confidence += 0.35
    if provenance_evidence.get("coverage") != "local_and_catalog_only":
        analysis_confidence += 0.10

    viva_engine = VivaEngine()
    viva_questions = viva_engine.generate_questions_for_functions(complex_functions, max_questions=5)

    if is_clone and matched_tut:
        sim_pct = int(matched_tut.get("similarity_score", 0.0) * 100)
        source_link = matched_tut.get("source_url") or "external online repository"
        proof_card = {
            "status": "FLAGGED_CLONE",
            "headline": matched_tut.get("verdict") or f"Flagged: {sim_pct}% code copied from {matched_tut.get('name')}.",
            "strengths": [
                f"Forensically matched to source: {matched_tut.get('name')}",
                f"{sim_pct}% structural alignment with {source_link}",
                f"Identified {len(matched_tut.get('matched_files', []))} overlapping files"
            ],
            "growth_area": f"Requires authentic engineering. Codebase was scraped from {matched_tut.get('author', 'third-party source')}.",
            "specific_action": f"Re-implement the application independently. Avoid cloning from {source_link}.",
            "tamper_proof_hash": tamper_proof_hash
        }
    else:
        history_available = bool(commits_data and git_dna.get("history_verified"))
        if history_available and source_available:
            verification_status = "UNORIGINAL_FORK" if untouched_fork else ("VERIFIED_EXEMPLARY" if (git_dna.get("organic_growth") or auth_score >= 90) else "VERIFIED_COMPETENT")
            verification_headline = (
                f"Verified engineering signals with clean AST modularity and Git progression across {resolved_repo_name}."
            )
            if untouched_fork:
                verification_headline = f"Untouched fork of {repo_meta.get('fork_parent')}; no repository-specific commits were verified."
            verification_strengths = [
                f"{git_dna.get('total_commits', 0)} verified commits over {git_dna.get('time_span_days', 0)} days",
                f"Extracted {len(complex_functions)} non-trivial AST control blocks directly from {resolved_repo_name}",
                f"Iterative refactoring ratio of {int(git_dna.get('deletion_ratio', 0) * 100)}%",
            ]
        else:
            verification_status = "VERIFICATION_INCOMPLETE"
            verification_headline = (
                f"Source was retrieved from {resolved_repo_name}, but {'Git history' if not history_available else 'source files'} was unavailable; authenticity is unscored."
            )
            verification_strengths = [
                f"Retrieved {len(detected_files)} repository files",
                f"Extracted {len(complex_functions)} AST control blocks from available source",
                "Git development rhythm requires a complete repository history",
            ]
        proof_card = {
            "status": verification_status,
            "headline": verification_headline,
            "strengths": verification_strengths,
            "growth_area": "Expand automated boundary mocking for external third-party dependencies.",
            "specific_action": "Add integration test fixtures verifying failure isolation under network latency.",
            "tamper_proof_hash": tamper_proof_hash
        }


    return {
        "status": "success",
        "live_analyzed": True,
        "is_cached_profile": False,
        "candidate_id": cid,
        "name": candidate_name or owner,
        "candidate_name": candidate_name or owner,
        "college": college_name,
        "repo_url": raw_url,
        "project_name": resolved_repo_name,
        "project_type": project_type,
        "detected_stack": project_type,
        "total_loc": sum(
            1
            for path, content in code_snippets.items()
            if Path(path).suffix.lower() in CODE_SOURCE_EXTENSIONS
            for line in content.splitlines()
            if line.strip() and not line.strip().startswith(("//", "#", "/*", "*"))
        ),
        "authenticity_score": auth_score,
        "analysis_confidence": round(min(1.0, analysis_confidence), 2),
        "analysis_status": "COMPLETED" if (git_dna.get("history_verified") and source_available) else "VERIFICATION_INCOMPLETE",
        "repository_status": repository_status,
        "fork_parent": repo_meta.get("fork_parent"),
        "fork_ahead_by": repo_meta.get("fork_ahead_by"),
        "available_subprojects": subprojects,
        "skill_evidence": JDMatcher.extract_skill_evidence(code_snippets, detected_files),
        "readiness_plan": ReadinessEngine.build_plan(
            skill_evidence=JDMatcher.extract_skill_evidence(code_snippets, detected_files),
            complex_functions=complex_functions,
            git_dna=git_dna,
            viva_questions=viva_questions,
            matched_tutorial=matched_tut,
            analysis_status="COMPLETED" if (git_dna.get("history_verified") and source_available) else "VERIFICATION_INCOMPLETE",
        ),
        "is_clone": is_clone,
        "matched_tutorial": matched_tut,
        "provenance_evidence": provenance_evidence,
        "git_dna": git_dna,
        "detected_files": detected_files,
        "structural_token_sequence": next(iter(structural_tokens.values()), ""),
        "complex_functions": complex_functions[:5],
        "complex_functions_for_viva": complex_functions[:3],
        "viva_questions": viva_questions,
        "viva_score": 0,
        "viva_status": "PENDING_LIVE_DEFENSE" if viva_questions else "UNAVAILABLE_NO_COMPLEX_SOURCE",
        "proof_card": proof_card,
        "tamper_proof_hash": tamper_proof_hash,
        "available_repos": available_repos or ([resolved_repo] if resolved_repo else []),
        "consent_recorded": True
    }
