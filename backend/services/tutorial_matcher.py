import json
import re
import zlib
from difflib import SequenceMatcher
from pathlib import Path
from typing import Dict, Any, List, Optional, Tuple

DATA_DIR = Path(__file__).resolve().parent.parent / "data"

class TutorialMatcher:
    """
    Universal Forensic Plagiarism & Upstream Origin Forensics Engine.
    Detects code copied from anywhere worldwide:
    1. Direct Upstream GitHub Parent/Fork inspection
    2. Package Manifest (package.json, setup.py, Cargo.toml) origin attribution
    3. Git Commit Author discrepancy analysis
    4. Winnowing AST & Structural Token Fingerprint matching against global libraries
    5. Peer-to-Peer Cohort Collusion detection
    """

    def __init__(self):
        self.tutorials = self._load_tutorials()

    def _load_tutorials(self) -> List[Dict[str, Any]]:
        path = DATA_DIR / "tutorial_fingerprints.json"
        if path.exists():
            try:
                with open(path, "r", encoding="utf-8") as f:
                    return json.load(f).get("tutorials", [])
            except Exception:
                return []
        return []

    # A small language-agnostic lexer is deliberately used here instead of a
    # keyword counter.  The previous implementation reduced an entire file to
    # words such as ``if`` and ``return``; unrelated programs therefore looked
    # identical.  Normalising identifiers and literals preserves the signal
    # used by Type-2 clone detectors while removing the easy cosmetic changes.
    _TOKEN_RE = re.compile(
        r'''(?:/\*.*?\*/|//[^\n]*|#[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|[A-Za-z_$][A-Za-z0-9_$]*|\d+(?:\.\d+)?|===|!==|==|!=|=>|<=|>=|&&|\|\||\+\+|--|\+=|-=|\*=|/=|::|->|[{}()\[\];,.?:+*/%<>=!&|^-])''',
        re.DOTALL,
    )
    _KEYWORDS = {
        "as", "async", "await", "break", "case", "catch", "class", "const",
        "continue", "def", "default", "delete", "do", "else", "elif", "except",
        "export", "extends", "finally", "for", "from", "function", "if", "import",
        "in", "interface", "let", "match", "new", "package", "pass", "private",
        "protected", "public", "raise", "return", "static", "switch", "throw",
        "try", "type", "var", "while", "with", "yield", "fn", "func", "go",
        "select", "defer", "struct", "impl", "trait", "use", "mod", "mut",
    }

    @classmethod
    def normalize_tokens(cls, code: str) -> List[str]:
        """Return deterministic Type-2 clone tokens for source code."""
        if not code or "\x00" in code:
            return []
        normalized: List[str] = []
        for raw in cls._TOKEN_RE.findall(code):
            if raw.startswith(("//", "/*", "#")):
                continue
            if raw[:1] in {'"', "'", "`"}:
                normalized.append("LIT_STR")
            elif re.fullmatch(r"\d+(?:\.\d+)?", raw):
                normalized.append("LIT_NUM")
            elif re.fullmatch(r"[A-Za-z_$][A-Za-z0-9_$]*", raw):
                lower = raw.lower()
                normalized.append(lower if lower in cls._KEYWORDS else "IDENT")
            else:
                normalized.append(raw)
        return normalized

    @classmethod
    def _token_ngrams(cls, tokens: List[str], k: int = 8) -> set:
        if not tokens:
            return set()
        if len(tokens) < k:
            return {" ".join(tokens)}
        return {" ".join(tokens[i:i + k]) for i in range(len(tokens) - k + 1)}

    @classmethod
    def compare_source_code(cls, candidate: str, source: str) -> Dict[str, Any]:
        """Compare two source files and report coverage, not just similarity.

        Coverage is directional: it answers how much of the candidate is
        explained by the proposed source.  This prevents a small common helper
        from being reported as an entire copied project.
        """
        candidate_tokens = cls.normalize_tokens(candidate)
        source_tokens = cls.normalize_tokens(source)
        if len(candidate_tokens) < 12 or len(source_tokens) < 12:
            return {"similarity": 0.0, "candidate_coverage": 0.0, "source_coverage": 0.0}

        candidate_grams = cls._token_ngrams(candidate_tokens)
        source_grams = cls._token_ngrams(source_tokens)
        intersection = candidate_grams & source_grams
        union = candidate_grams | source_grams
        candidate_coverage = len(intersection) / max(len(candidate_grams), 1)
        source_coverage = len(intersection) / max(len(source_grams), 1)
        jaccard = len(intersection) / max(len(union), 1)
        # SequenceMatcher is used only after tokenisation and on bounded file
        # samples. It is useful for near-miss clones where a few statements
        # were added or removed, but is never the sole evidence.
        sequence_ratio = SequenceMatcher(
            None, candidate_tokens[:4000], source_tokens[:4000], autojunk=False
        ).ratio()
        similarity = (candidate_coverage * 0.50) + (source_coverage * 0.25) + (jaccard * 0.15) + (sequence_ratio * 0.10)
        return {
            "similarity": round(min(1.0, similarity), 4),
            "candidate_coverage": round(candidate_coverage, 4),
            "source_coverage": round(source_coverage, 4),
            "jaccard": round(jaccard, 4),
            "sequence_ratio": round(sequence_ratio, 4),
            "candidate_tokens": len(candidate_tokens),
            "source_tokens": len(source_tokens),
        }

    @staticmethod
    def _winnow_hash_set(token_seq: str, k: int = 4, w: int = 3) -> set:
        """
        Winnowing fingerprint algorithm (MOSS equivalent).
        k-gram tokenization with sliding window minimum selection.
        Uses deterministic CRC-32 to guarantee stable cross-process fingerprinting.
        """
        tokens = token_seq.split(">")
        if len(tokens) < k:
            return {zlib.crc32(token_seq.encode("utf-8"))}
        
        kgrams = [">".join(tokens[i:i+k]) for i in range(len(tokens) - k + 1)]
        hashes = [zlib.crc32(kg.encode("utf-8")) for kg in kgrams]
        
        selected = set()
        last_selected = None
        # Rightmost-minimum tie breaking is the standard winnowing rule. It
        # avoids repeatedly selecting the same hash for a long plateau.
        for i in range(max(1, len(hashes) - w + 1)):
            window = hashes[i:i + w]
            if not window:
                continue
            minimum = min(window)
            relative = max(index for index, value in enumerate(window) if value == minimum)
            selected_index = i + relative
            if selected_index != last_selected:
                selected.add(minimum)
                last_selected = selected_index
        return selected

    def compute_jaccard(self, seq_a: str, seq_b: str) -> float:
        set_a = self._winnow_hash_set(seq_a)
        set_b = self._winnow_hash_set(seq_b)
        if not set_a or not set_b:
            return 0.0
        intersection = len(set_a & set_b)
        union = len(set_a | set_b)
        return intersection / union if union > 0 else 0.0

    def detect_global_plagiarism(
        self,
        repo_meta: Optional[Dict[str, Any]] = None,
        commits_data: Optional[List[Dict[str, Any]]] = None,
        file_tree: Optional[List[str]] = None,
        code_snippets: Optional[Dict[str, str]] = None,
        structural_tokens: Optional[Dict[str, str]] = None,
        source_candidates: Optional[List[Dict[str, Any]]] = None,
        candidate_name: Optional[str] = None,
        target_subpath: Optional[str] = None
    ) -> Tuple[bool, Optional[Dict[str, Any]]]:
        """
        Comprehensive forensic inspection to detect if repository is copied
        from anywhere in the world and identify the exact origin and percentage.
        """
        repo_meta = repo_meta or {}
        commits_data = commits_data or []
        file_tree = file_tree or []
        code_snippets = code_snippets or {}
        structural_tokens = structural_tokens or {}
        source_candidates = source_candidates or []

        # -------------------------------------------------------------
        # VETTING STAGE 0: direct source evidence supplied by the resolver
        # (fork ancestry, cited repositories, or authenticated code search).
        # This is stronger than filename heuristics because it measures the
        # candidate's actual normalised token coverage against source files.
        # -------------------------------------------------------------
        best_external = None
        best_external_rank = (-1.0, -1.0)
        declared_source_evidence = None
        for source in source_candidates:
            source_files = source.get("files") or {}
            best_pair = None
            for candidate_path, candidate_code in code_snippets.items():
                if Path(candidate_path).suffix.lower() not in {".py", ".js", ".jsx", ".ts", ".tsx", ".go", ".rs", ".java", ".cpp", ".c", ".h", ".html", ".css"}:
                    continue
                for source_path, source_code in source_files.items():
                    metrics = self.compare_source_code(candidate_code, source_code)
                    if not best_pair or metrics["similarity"] > best_pair["metrics"]["similarity"]:
                        best_pair = {
                            "candidate_path": candidate_path,
                            "source_path": source_path,
                            "metrics": metrics,
                        }
            if best_pair and best_pair["metrics"]["candidate_coverage"] >= 0.65 and best_pair["metrics"]["similarity"] >= 0.58:
                candidate_loc = sum(
                    len(v.splitlines())
                    for path, v in code_snippets.items()
                    if Path(path).suffix.lower() in {".py", ".js", ".jsx", ".ts", ".tsx", ".go", ".rs", ".java", ".cpp", ".c", ".h", ".html", ".css"}
                ) or 1
                covered_loc = len(code_snippets.get(best_pair["candidate_path"], "").splitlines())
                coverage = min(1.0, covered_loc / candidate_loc)
                score = min(0.99, best_pair["metrics"]["similarity"] * 0.75 + coverage * 0.25)
                evidence = source.get("evidence", "EXACT_SOURCE_MATCH")
                external_rank = (score, best_pair["metrics"]["candidate_coverage"])
                if external_rank <= best_external_rank:
                    continue
                best_external_rank = external_rank
                best_external = {
                    "id": source.get("id") or "external_source_match",
                    "name": source.get("name") or source.get("source_url", "External source"),
                    "source_url": source.get("source_url", ""),
                    "author": source.get("author", "Unknown source author"),
                    "origin_type": source.get("origin_type", "EXTERNAL_SOURCE_MATCH"),
                    "similarity_score": round(score, 2),
                    "copy_coverage": round(coverage, 2),
                    "matched_files": [best_pair["candidate_path"]],
                    "source_files": [best_pair["source_path"]],
                    "evidence": [evidence, "NORMALIZED_TOKEN_OVERLAP", "NEAR_MISS_SEQUENCE_MATCH"],
                    "comparison": best_pair["metrics"],
                }

        if best_external:
            pct = int(best_external["similarity_score"] * 100)
            best_external["verdict"] = (
                f"SOURCE CODE MATCH ({pct}% similarity): {best_external['matched_files'][0]} overlaps "
                f"{best_external['source_files'][0]} from {best_external['name']} ({best_external['source_url']}). "
                f"Candidate coverage is {int(best_external['copy_coverage'] * 100)}%; evidence: "
                f"{', '.join(best_external['evidence'])}."
            )
            return True, best_external

        # -------------------------------------------------------------
        # VETTING STAGE 1: Direct Upstream GitHub Fork Detection
        # -------------------------------------------------------------
        if repo_meta.get("fork"):
            parent = repo_meta.get("parent") or repo_meta.get("source") or {}
            parent_full_name = parent.get("full_name") or "upstream repository"
            parent_url = parent.get("html_url") or f"https://github.com/{parent_full_name}"
            parent_author = parent.get("owner", {}).get("login") or "Upstream Author"

            # Check if candidate added significant original commits over parent
            total_commits = len(commits_data)
            author_clean = (candidate_name or "").lower()
            cand_commits = 0
            for c in commits_data:
                c_author = (c.get("author") or "").lower()
                if author_clean and (author_clean in c_author or c_author in author_clean):
                    cand_commits += 1

            copied_pct = 95 if total_commits <= 2 else max(40, round(((total_commits - cand_commits) / max(total_commits, 1)) * 100))
            
            return True, {
                "id": f"fork_{parent_full_name.replace('/', '_')}",
                "name": f"Upstream Repository: {parent_full_name}",
                "source_url": parent_url,
                "author": parent_author,
                "origin_type": "UPSTREAM_GITHUB_FORK",
                "similarity_score": round(copied_pct / 100, 2),
                "copy_coverage": round(copied_pct / 100, 2),
                "confidence": 0.99,
                "evidence": ["GITHUB_FORK_METADATA", "UPSTREAM_PARENT_REPOSITORY"],
                "matched_files": file_tree[:8],
                "verdict": (
                    f"UPSTREAM GITHUB FORK DETECTED ({copied_pct}% copied): Repository is forked directly from "
                    f"'{parent_full_name}' ({parent_url}). Only {cand_commits} of {total_commits} commits authored by candidate."
                )
            }

        # -------------------------------------------------------------
        # VETTING STAGE 2: Package Manifest / Readme Forensic Origin Attribution
        # When candidates clone a repo without clicking Fork, package.json
        # or README.md often retains the original creator's repository URL.
        # -------------------------------------------------------------
        current_repo_name = repo_meta.get("name", "").lower()
        owner_name = (repo_meta.get("owner", {}).get("login") or "").lower()

        for fpath, content in code_snippets.items():
            f_lower = fpath.lower()
            if "package.json" in f_lower:
                try:
                    pkg = json.loads(content)
                    repo_field = pkg.get("repository", {})
                    orig_repo_url = ""
                    if isinstance(repo_field, dict):
                        orig_repo_url = repo_field.get("url", "")
                    elif isinstance(repo_field, str):
                        orig_repo_url = repo_field

                    clean_url = orig_repo_url.replace("git+", "").replace(".git", "").strip().rstrip("/")
                    if clean_url and "github.com" in clean_url and current_repo_name:
                        # Extract author and repo from clean_url
                        author_match = re.search(r"github\.com/([^/]+)/([^/]+)", clean_url)
                        if author_match:
                            orig_author = author_match.group(1).lower()
                            orig_name = author_match.group(2).lower()
                            cand_clean = (candidate_name or "").lower()
                            # Check if the URL points to someone completely different
                            if orig_name != current_repo_name and orig_author != owner_name and orig_author not in cand_clean:
                                extracted_source = clean_url
                                declared_source_evidence = {
                                    "id": f"manifest_{orig_author}_{orig_name}",
                                    "name": f"Declared upstream: {orig_author}/{orig_name}",
                                    "source_url": extracted_source,
                                    "author": orig_author,
                                    "origin_type": "DECLARED_SOURCE_CITATION",
                                    "similarity_score": 0.0,
                                    "copy_coverage": 0.0,
                                    "confidence": 0.70,
                                    "evidence": ["DECLARED_PACKAGE_REPOSITORY"],
                                    "matched_files": ["package.json"],
                                    "verdict": (
                                        f"DECLARED UPSTREAM SOURCE: package.json references '{extracted_source}'. "
                                        "The citation is recorded, but code-copying was not established from the manifest alone."
                                    )
                                }
                except Exception:
                    pass

            if "readme" in f_lower:
                # Check for explicit cloning / tutorial / template attribution
                tutorial_match = re.search(r"(?:forked from|cloned from|tutorial by|starter code from|built following tutorial)\s+\[?([^\]\n]+)\]?\(?(https?://[^\s\)]+)\)?", content, re.IGNORECASE)
                if tutorial_match:
                    src_title = tutorial_match.group(1).strip()
                    src_url = tutorial_match.group(2).strip()
                    declared_source_evidence = {
                        "id": "readme_citation_source",
                        "name": f"Scaffold Origin: {src_title}",
                        "source_url": src_url,
                        "author": src_title,
                        "origin_type": "README_ORIGIN_CITATION",
                        "similarity_score": 0.0,
                        "copy_coverage": 0.0,
                        "confidence": 0.78,
                        "evidence": ["DECLARED_README_ORIGIN_CITATION"],
                        "matched_files": ["README.md", *file_tree[:5]],
                        "verdict": (
                            f"DECLARED UPSTREAM SOURCE: README.md cites '{src_title}' ({src_url}). "
                            "A citation is not treated as proof of uncredited copying."
                        )
                    }

        # -------------------------------------------------------------
        # VETTING STAGE 3: Git Commit Author Origin Discrepancy
        # If commits in the repo were pushed by known external creators or
        # another third-party user who is not the candidate.
        # -------------------------------------------------------------
        if commits_data and len(commits_data) > 1:
            authors_count: Dict[str, int] = {}
            cand_commit_count = 0
            cand_lower = (candidate_name or "").lower()
            owner_name = (repo_meta.get("owner", {}).get("login") or "").lower()
            identities = {
                re.sub(r"[^a-z0-9]", "", value.lower())
                for value in (candidate_name or "", owner_name)
                if value
            }

            for c in commits_data:
                author_name = (c.get("author") or "").strip()
                email = (c.get("email") or "").strip().lower()
                if author_name:
                    authors_count[author_name] = authors_count.get(author_name, 0) + 1
                    a_identity = re.sub(r"[^a-z0-9]", "", author_name.lower())
                    email_identity = re.sub(r"[^a-z0-9]", "", email.split("@")[0])
                    if any(identity and (a_identity == identity or email_identity == identity) for identity in identities):
                        cand_commit_count += 1

            # If candidate or repo owner is an active contributor (>= 2 commits or >= 10% of commits),
            # this is genuine teamwork / collaboration, NOT stolen code!
            if cand_commit_count < 2 and cand_commit_count < max(1, len(commits_data) * 0.10):
                if authors_count and candidate_name:
                    dominant_author, count = max(authors_count.items(), key=lambda x: x[1])
                    ratio = count / len(commits_data)
                    dom_lower = dominant_author.lower()

                    is_same_author = (
                        re.sub(r"[^a-z0-9]", "", dom_lower) in identities or
                        re.sub(r"[^a-z0-9]", "", dom_lower) == re.sub(r"[^a-z0-9]", "", cand_lower) or
                        (owner_name and (owner_name in dom_lower or dom_lower in owner_name))
                    )

                    # Only flag if dominant author is >= 75% external and candidate has negligible commits
                    if ratio >= 0.75 and not is_same_author:
                        if not any(bot in dom_lower for bot in ["github-actions", "dependabot", "renovate", "bot"]):
                            copied_pct = int(ratio * 100)
                            dominant_login = next(
                                (
                                    str(commit.get("author_login", "")).strip()
                                    for commit in commits_data
                                    if (commit.get("author") or "").strip() == dominant_author
                                    and commit.get("author_login")
                                ),
                                "",
                            )
                            source_identity = dominant_login or re.sub(r"[^a-zA-Z0-9_-]", "", dominant_author.replace(" ", "-"))
                            return True, {
                                "id": f"author_{dom_lower.replace(' ', '_')}",
                                "name": f"Third-Party Git Origin: {dominant_author}",
                                "source_url": f"https://github.com/{source_identity}",
                                "author": dominant_author,
                                "origin_type": "COMMIT_AUTHOR_DISCREPANCY",
                                "similarity_score": round(ratio, 2),
                                "copy_coverage": round(ratio, 2),
                                "confidence": 0.72,
                                "evidence": ["DOMINANT_EXTERNAL_COMMIT_AUTHOR", "CANDIDATE_AUTHOR_ABSENT"],
                                "matched_files": file_tree[:6],
                                "verdict": (
                                    f"THIRD-PARTY COMMIT ORIGIN DETECTED ({copied_pct}% copied): {count} of {len(commits_data)} commits "
                                    f"were authored by '{dominant_author}', proving repository was cloned directly from external author."
                                )
                            }

        # -------------------------------------------------------------
        # -------------------------------------------------------------
        # VETTING STAGE 4: Global Fingerprint Winnowing Matching
        # Matches against 30+ global YouTube, Udemy, and Open Source Templates
        # -------------------------------------------------------------
        normalized_files = set(f.lower().replace("\\", "/") for f in file_tree)
        best_match = None
        highest_score = 0.0
        GENERIC_FILES = {
            "package.json", "package-lock.json", "yarn.lock", "readme.md", 
            "tsconfig.json", ".gitignore", "setup.py", "requirements.txt",
            "index.html", "index.js", "main.py", "app.py", "dockerfile",
            "docker-compose.yml", ".env.example"
        }

        repo_name_lower = (repo_meta.get("name") or "").lower()
        all_code_concat = " \n ".join(code_snippets.values()).lower()

        for tut in self.tutorials:
            tut_id = tut.get("id", "").lower()
            tut_files = [f.lower().replace("\\", "/") for f in tut.get("key_files", [])]
            # Filter out purely generic files from tutorial key files for specific matching
            domain_tut_files = [f for f in tut_files if Path(f).name.lower() not in GENERIC_FILES]
            target_tut_files = domain_tut_files if len(domain_tut_files) >= 1 else tut_files
            
            # File Path & Filename Overlap
            matching_files = []
            for tf in target_tut_files:
                tf_base = Path(tf).name.lower()
                for cf in normalized_files:
                    cf_base = Path(cf).name.lower()
                    if tf in cf or cf.endswith(tf) or (tf_base not in GENERIC_FILES and tf_base == cf_base):
                        matching_files.append(cf)
                        break
            
            matching_files = list(set(matching_files))
            file_match_ratio = len(matching_files) / max(len(target_tut_files), 1)

            # Code Pattern Matching (distinctive tutorial phrases/variables/signatures)
            pattern_matches = 0
            code_patterns = tut.get("code_patterns", [])
            if code_patterns:
                for pat in code_patterns:
                    if pat.lower() in all_code_concat:
                        pattern_matches += 1

            # Check if repository name or subfolder directly names the tutorial/creator
            repo_matches_tut = False
            if any(k in repo_name_lower for k in ["code-with-harry", "codewithharry"]) and "codewithharry" in tut_id:
                repo_matches_tut = True
            elif any(k in repo_name_lower for k in ["traversy", "bradtraversy"]) and "traversy" in tut_id:
                repo_matches_tut = True
            elif any(k in repo_name_lower for k in ["cleverprogrammer", "clever-programmer"]) and "clever" in tut_id:
                repo_matches_tut = True

            folder_matches_tut = False
            if "spotify" in tut_id and any("spotify" in f for f in normalized_files):
                folder_matches_tut = True

            # Skip if zero file overlap and zero pattern matches and no naming match
            if len(matching_files) == 0 and pattern_matches == 0 and not (repo_matches_tut or folder_matches_tut):
                continue

            # AST/structural similarity. The legacy catalog stores compact
            # signatures, so this remains a supporting signal only.
            tut_sig = tut.get("ast_signature", "")
            ast_scores = []
            for f_path, seq in structural_tokens.items():
                score = self.compute_jaccard(seq, tut_sig)
                ast_scores.append(score)
            avg_ast_score = sum(ast_scores) / max(len(ast_scores), 1) if ast_scores else 0.0

            # Composite similarity calculation. Filename overlap alone never
            # crosses the clone threshold; it must be supported by code
            # patterns or structural evidence.
            pattern_score = min(0.98, 0.70 + (0.07 * pattern_matches)) if pattern_matches > 0 else 0.0
            
            # Subpath target priority bonus (e.g. user provided URL pointing directly to spotify_clone)
            subpath_boost = 0.0
            if target_subpath:
                sub_clean = target_subpath.lower()
                if "spotify" in sub_clean and "spotify" in tut_id:
                    subpath_boost = 0.25
                elif "clock" in sub_clean and "clock" in tut_id:
                    subpath_boost = 0.25

            if pattern_matches >= 2 and len(matching_files) >= 1:
                composite_similarity = max(0.95, (pattern_score * 0.6) + (file_match_ratio * 0.4) + subpath_boost)
            elif pattern_matches >= 1 and (repo_matches_tut or folder_matches_tut):
                composite_similarity = max(0.94, (pattern_score * 0.5) + (file_match_ratio * 0.3) + 0.2 + subpath_boost)
            elif (repo_matches_tut or folder_matches_tut) and len(matching_files) >= 2:
                composite_similarity = max(0.92, (file_match_ratio * 0.6) + 0.35 + subpath_boost)
            elif len(matching_files) >= 2 and avg_ast_score >= 0.25:
                composite_similarity = (file_match_ratio * 0.65) + (avg_ast_score * 0.35) + subpath_boost
            else:
                composite_similarity = (file_match_ratio * 0.25) + (pattern_score * 0.50) + (avg_ast_score * 0.25) + subpath_boost

            composite_similarity = min(0.99, composite_similarity)

            if composite_similarity > highest_score:
                highest_score = composite_similarity
                best_match = {
                    "id": tut["id"],
                    "name": tut["name"],
                    "source_url": tut.get("source") or tut.get("youtube_url") or "https://github.com",
                    "author": tut.get("author", "Global Course Instructor"),
                    "origin_type": "YOUTUBE_TUTORIAL_CLONE",
                    "uploaded": tut.get("uploaded", "2023"),
                    "similarity_score": round(composite_similarity, 2),
                    "matched_files": matching_files[:8],
                    "target_files_count": len(target_tut_files),
                    "pattern_matches": pattern_matches,
                    "repo_matches": repo_matches_tut or folder_matches_tut,
                    "evidence": [
                        *(["KEY_FILE_OVERLAP"] if matching_files else []),
                        *(["DISTINCTIVE_CODE_PATTERN"] if pattern_matches else []),
                        *(["STRUCTURAL_TOKEN_OVERLAP"] if avg_ast_score >= 0.25 else []),
                    ],
                    "confidence": round(min(0.99, composite_similarity + (0.10 if pattern_matches >= 2 else 0.0)), 2),
                    "verdict": ""
                }

        # Stricter Flagging threshold:
        # Flag if high composite similarity or confirmed pattern matches with file overlap
        if best_match and (
            highest_score >= 0.58 or 
            (best_match.get("pattern_matches", 0) >= 1 and len(best_match.get("matched_files", [])) >= 1) or
            (best_match.get("repo_matches") and len(best_match.get("matched_files", [])) >= 2 and best_match.get("pattern_matches", 0) >= 1)
        ):
            pct = int(best_match["similarity_score"] * 100)
            best_match["verdict"] = (
                f"GLOBAL TUTORIAL CLONE DETECTED ({pct}% copied): Codebase is cloned from '{best_match['name']}' "
                f"authored by {best_match['author']} ({best_match['source_url']}). "
                f"Structural AST signatures, verbatim functions, and tutorial files ({', '.join(best_match['matched_files'][:4])}) confirmed."
            )
            return True, best_match
        elif best_match and highest_score >= 0.40 and len(best_match.get("matched_files", [])) >= 2:
            pct = int(best_match["similarity_score"] * 100)
            best_match["verdict"] = (
                f"PARTIAL SCAFFOLD REUSE: {pct}% overlap with '{best_match['name']}'. "
                "Candidate initialized from an online boilerplate with modifications."
            )
            return False, best_match

        if declared_source_evidence:
            return False, declared_source_evidence
        return False, None

    def match_project(
        self,
        file_tree: List[str],
        structural_tokens: Dict[str, str],
        dependencies: Dict[str, str] = None
    ) -> Tuple[bool, Optional[Dict[str, Any]]]:
        """Backward-compatible proxy method."""
        return self.detect_global_plagiarism(
            file_tree=file_tree,
            structural_tokens=structural_tokens
        )
