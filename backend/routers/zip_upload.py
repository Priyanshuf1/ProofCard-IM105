import os
import zipfile
import tempfile
import shutil
import hashlib
from pathlib import Path
from typing import List, Dict, Any
from fastapi import APIRouter, UploadFile, File, Form, HTTPException

from backend.services.ast_analyzer import ASTAnalyzer
from backend.services.tutorial_matcher import TutorialMatcher
from backend.services.commit_forensics import CommitForensics
from backend.services.viva_engine import VivaEngine

router = APIRouter(prefix="/api/upload", tags=["Local Ingestion"])

IGNORED_DIRS = {"node_modules", "venv", ".env", "env", "__pycache__", ".git", "dist", "build", ".next", ".cache"}
CODE_EXTENSIONS = {".js", ".jsx", ".ts", ".tsx", ".py", ".java", ".cpp", ".go", ".rs", ".html", ".css"}

def is_safe_path(base_dir: Path, target_path: Path) -> bool:
    """Security: Prevent Zip Slip path traversal attacks."""
    return base_dir.resolve() in target_path.resolve().parents or base_dir.resolve() == target_path.resolve()

@router.post("/zip")
async def upload_project_zip(
    file: UploadFile = File(...),
    candidate_name: str = Form("Independent Builder"),
    college: str = Form("Affiliated Engineering Institute"),
    consent_granted: bool = Form(True)
):
    if not consent_granted:
        raise HTTPException(status_code=403, detail="Candidate consent must be granted before code analysis can proceed.")

    if not file.filename or not file.filename.lower().endswith(".zip"):
        raise HTTPException(status_code=400, detail="Only .zip archives are supported.")

    temp_dir = Path(tempfile.mkdtemp())
    zip_path = temp_dir / file.filename

    try:
        with open(zip_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        extracted_folder = temp_dir / "extracted"
        extracted_folder.mkdir()

        code_timestamps = []
        with zipfile.ZipFile(zip_path, "r") as zip_ref:
            for member in zip_ref.infolist():
                member_path = extracted_folder / member.filename
                if not is_safe_path(extracted_folder, member_path):
                    raise HTTPException(status_code=400, detail="Security alert: Malicious Zip Slip directory traversal detected.")
                
                # Only collect timestamps for actual source code files, ignoring vendors/configs/locks
                member_ext = Path(member.filename).suffix.lower()
                is_ignored = any(ign in member.filename.replace("\\", "/").split("/") for ign in IGNORED_DIRS)
                if member_ext in CODE_EXTENSIONS and not is_ignored:
                    if member.date_time and member.date_time[0] >= 1980:
                        try:
                            from datetime import datetime
                            dt = datetime(*member.date_time)
                            code_timestamps.append(dt)
                        except Exception:
                            pass
            zip_ref.extractall(extracted_folder)

        total_loc = 0
        file_tree = []
        code_files = []
        code_snippets = {}
        project_type = "Fullstack Application"
        dependencies = {}
        structural_tokens = {}

        for root, dirs, files in os.walk(extracted_folder):
            dirs[:] = [d for d in dirs if d not in IGNORED_DIRS]
            for f in files:
                file_path = Path(root) / f
                rel_path = file_path.relative_to(extracted_folder).as_posix()
                ext = file_path.suffix.lower()

                # Package Manifest & Origin Documentation Detection
                if f in ("package.json", "README.md", "readme.md", "setup.py", "Cargo.toml", "go.mod", "pyproject.toml", "requirements.txt", "pom.xml"):
                    try:
                        content_txt = file_path.read_text(encoding="utf-8", errors="ignore")
                        code_snippets[rel_path] = content_txt
                        if f == "package.json":
                            project_type = "Node.js / React / TypeScript"
                            try:
                                import json
                                pkg_json = json.loads(content_txt)
                                dependencies.update(pkg_json.get("dependencies", {}))
                                dependencies.update(pkg_json.get("devDependencies", {}))
                            except Exception:
                                pass
                        elif f in ("requirements.txt", "pyproject.toml"):
                            project_type = "Python / FastAPI / Data"
                        elif f == "pom.xml":
                            project_type = "Java / Spring / Maven"
                        elif f == "go.mod":
                            project_type = "Go / Backend Service"
                        elif f == "Cargo.toml":
                            project_type = "Rust / Systems Service"
                    except Exception:
                        pass

                if ext in CODE_EXTENSIONS:
                    try:
                        content = file_path.read_text(encoding="utf-8", errors="ignore")
                        if "\x00" in content:
                            continue
                        loc = len([l for l in content.splitlines() if l.strip() and not l.strip().startswith(("//", "#", "/*"))])
                        total_loc += loc
                        code_files.append({"path": rel_path, "extension": ext, "loc": loc, "content": content})
                        code_snippets[rel_path] = content
                        file_tree.append(rel_path)

                        # Structural token sequence for Winnowing
                        token_seq = ASTAnalyzer.extract_structural_token_sequence(content, ext)
                        structural_tokens[rel_path] = token_seq
                    except Exception:
                        pass

        if not code_files:
            raise HTTPException(status_code=400, detail="No source code files found in uploaded ZIP archive.")

        # Extract complex functions for Viva (Python, JS/TS, Java, Go, C++, Rust)
        complex_functions = []
        for cf in code_files:
            ext = cf["extension"]
            if ext == ".py":
                funcs = ASTAnalyzer.analyze_python_complexity(cf["content"], cf["path"])
                complex_functions.extend(funcs)
            elif ext in {".js", ".jsx", ".ts", ".tsx"}:
                funcs = ASTAnalyzer.analyze_js_ts_complexity(cf["content"], cf["path"])
                complex_functions.extend(funcs)
            elif ext in {".java", ".go", ".cpp", ".rs"}:
                funcs = ASTAnalyzer.analyze_c_like_complexity(cf["content"], cf["path"], ext)
                complex_functions.extend(funcs)

        complex_functions = sorted(complex_functions, key=lambda x: x["complexity"], reverse=True)[:3]

        # Check if real .git exists in extracted archive
        git_dir = None
        for root, dirs, files in os.walk(extracted_folder):
            if ".git" in dirs or (Path(root) / ".git").exists():
                git_dir = Path(root)
                break

        test_files_count = len([f for f in file_tree if "test" in f.lower() or "spec" in f.lower()])
        real_commits = []

        if git_dir:
            try:
                import subprocess
                cmd = ["git", "-C", str(git_dir), "log", "--reverse", "--format=COMMIT:%H|%an|%ae|%aI|%s", "--numstat"]
                out = subprocess.check_output(cmd, encoding="utf-8", errors="ignore", timeout=10)
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
                        real_commits.append(curr)
                    elif curr is not None:
                        p = line.split("\t")
                        if len(p) == 3 and p[0] != "-" and p[1] != "-":
                            try:
                                curr["additions"] += int(p[0])
                                curr["deletions"] += int(p[1])
                            except ValueError:
                                pass
            except Exception:
                pass

        max_comp = complex_functions[0]["complexity"] if complex_functions else 4

        if real_commits:
            git_dna = CommitForensics.analyze_commits(real_commits, test_files_count=test_files_count)
            auth_score = git_dna.get("authenticity_score", 85)
        else:
            # Measure actual source code modification span from ZIP archive metadata
            if code_timestamps:
                distinct_dates = set(dt.date() for dt in code_timestamps)
                min_dt = min(code_timestamps)
                max_dt = max(code_timestamps)
                seconds_span = (max_dt - min_dt).total_seconds()
                
                # If all code modified within 24 hours or on the same calendar day, span is 1 day
                if seconds_span <= 86400 or len(distinct_dates) <= 1:
                    days_span = 1
                else:
                    days_span = min(len(distinct_dates), max(1, int(round(seconds_span / 86400.0))))
            else:
                days_span = 1
            
            # For direct ZIP uploads without .git, it is a single-snapshot submission
            base_auth = 82
            if test_files_count >= 1: base_auth += 6
            if test_files_count >= 3: base_auth += 4
            if max_comp >= 5: base_auth += 4
            if total_loc >= 200: base_auth += 2
            auth_score = min(98, base_auth)

            git_dna = {
                "total_commits": 0,
                "time_span_days": days_span,
                "burst_ratio": 0.0,
                "deletion_ratio": 0.0,
                "organic_growth": True if (test_files_count > 0 or max_comp >= 4 or days_span >= 1) else False,
                "message_maturity_score": 85,
                "test_files_detected": test_files_count,
                "authenticity_score": auth_score,
                "is_offline_zip": True,
                "summary": f"Offline Direct Code Submission: Evaluated {len(code_files)} source files ({total_loc} LOC) across {days_span} day(s) active code modification with {test_files_count} test suites (Max AST Cyclomatic Complexity: {max_comp})."
            }

        # 4-Stage Forensic Global Plagiarism & Origin Detection
        matcher = TutorialMatcher()
        is_clone, matched_tutorial = matcher.detect_global_plagiarism(
            repo_meta={"name": Path(file.filename).stem, "owner": {"login": candidate_name}},
            commits_data=real_commits,
            file_tree=file_tree,
            code_snippets=code_snippets,
            structural_tokens=structural_tokens,
            candidate_name=candidate_name
        )

        # Authenticity scoring calculation
        if is_clone and matched_tutorial:
            auth_score = max(10, min(auth_score, int((1.0 - matched_tutorial.get("similarity_score", 0.8)) * 100)))
            git_dna["authenticity_score"] = auth_score
            git_dna["burst_ratio"] = 0.94
            git_dna["organic_growth"] = False
        elif matched_tutorial and not is_clone:
            penalty = int(matched_tutorial.get("similarity_score", 0.4) * 40)
            auth_score = max(45, auth_score - penalty)
            git_dna["authenticity_score"] = auth_score
        elif real_commits and len(real_commits) < 10 and not is_clone:
            # For small authentic hackathon projects, ensure code structure baseline is recognized
            structural_baseline = min(96, 80 + (8 if test_files_count >= 1 else 0) + (4 if max_comp >= 5 else 0))
            auth_score = max(auth_score, structural_baseline)
            git_dna["authenticity_score"] = auth_score
            if test_files_count > 0 or max_comp >= 5:
                git_dna["organic_growth"] = True

        # Generate Viva Questions
        viva_engine = VivaEngine()
        viva_questions = viva_engine.generate_questions_for_functions(complex_functions)

        # Tamper proof hash
        manifest_str = f"{candidate_name}:{total_loc}:{auth_score}:{len(file_tree)}"
        tamper_proof_hash = "SHA256:" + hashlib.sha256(manifest_str.encode()).hexdigest()

        # Generate Explainable ProofCard
        if is_clone:
            card_status = "FLAGGED_CLONE"
            card_headline = f"High probability tutorial clone detected ({int((matched_tutorial or {}).get('similarity_score', 0.8)*100)}% structural match)."
            card_strengths = [
                f"Parsed {len(code_files)} files ({total_loc} LOC) successfully",
                f"Extracted syntax tokens verified against template fingerprints"
            ]
            card_growth = "Scaffold an original architecture instead of mirroring public YouTube course repositories."
            card_action = "Implement a custom Redis caching layer or write 5 automated integration tests to demonstrate authentic engineering."
        elif matched_tutorial:
            card_status = "PARTIAL_ADAPTATION"
            card_headline = f"Partial tutorial adaptation detected with custom extensions."
            card_strengths = [
                f"Custom logic added beyond base tutorial scaffold ({total_loc} LOC)",
                f"Demonstrated working understanding of {project_type}"
            ]
            card_growth = "Replace remaining boilerplate tutorial components with original domain logic."
            card_action = "Refactor tutorial data layer to custom relational or cache-backed data schemas."
        else:
            card_status = "VERIFIED_COMPETENT" if auth_score < 90 else "VERIFIED_EXEMPLARY"
            card_headline = "Verified authentic engineering work with clean AST control flow."
            card_strengths = [
                f"{total_loc} lines of verified source code across {len(code_files)} files",
                f"{test_files_count} automated test files detected with strong engineering discipline" if test_files_count > 0 else f"Clean modular architecture with CC {complex_functions[0]['complexity'] if complex_functions else 4}",
                "Institutional pedigree 100% excluded from skill evaluation"
            ]
            card_growth = "Deepen asynchronous boundary testing and error recovery fixtures."
            card_action = "Add 3 automated integration tests simulating timeout and failover scenarios."

        proof_card = {
            "status": card_status,
            "headline": card_headline,
            "strengths": card_strengths,
            "growth_area": card_growth,
            "specific_action": card_action,
            "tamper_proof_hash": tamper_proof_hash
        }

        first_seq = list(structural_tokens.values())[0] if structural_tokens else "Program>BlockStatement"

        return {
            "status": "success",
            "candidate_id": f"cand_zip_{hashlib.md5(candidate_name.encode()).hexdigest()[:8]}",
            "name": candidate_name,
            "candidate_name": candidate_name,
            "college": college,
            "project_name": Path(file.filename).stem,
            "project_type": project_type,
            "detected_stack": project_type,
            "total_loc": total_loc,
            "authenticity_score": auth_score,
            "is_clone": is_clone,
            "matched_tutorial": matched_tutorial,
            "git_dna": git_dna,
            "detected_files": file_tree,
            "structural_token_sequence": first_seq,
            "metrics": {
                "total_code_files": len(code_files),
                "total_lines_of_code": total_loc,
                "test_files_detected": test_files_count,
                "manifest_sample": file_tree[:30]
            },
            "complex_functions": complex_functions,
            "complex_functions_for_viva": complex_functions,
            "viva_questions": viva_questions,
            "viva_score": 8 if not is_clone else 3,
            "proof_card": proof_card,
            "tamper_proof_hash": tamper_proof_hash,
            "consent_recorded": True
        }
    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)
