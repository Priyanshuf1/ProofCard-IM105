import os
import re
import zipfile
import tempfile
import shutil
import hashlib
from pathlib import Path
from typing import List, Dict, Any, Optional
import asyncio
from fastapi import APIRouter, UploadFile, File, Form, HTTPException

from backend.services.ast_analyzer import ASTAnalyzer
from backend.services.tutorial_matcher import TutorialMatcher
from backend.services.commit_forensics import CommitForensics
from backend.services.viva_engine import VivaEngine
from backend.services.jd_matcher import JDMatcher
from backend.services.readiness_engine import ReadinessEngine
from backend.services.n8n_service import N8nService
from backend.services.adversarial_defense import AdversarialDefensePipeline
from backend.services.injection_scanner import InjectionScanner

router = APIRouter(prefix="/api/upload", tags=["Local Ingestion"])

IGNORED_DIRS = {"node_modules", "venv", ".env", "env", "__pycache__", ".git", "dist", "build", ".next", ".cache"}
CODE_EXTENSIONS = {".js", ".jsx", ".ts", ".tsx", ".py", ".java", ".cpp", ".go", ".rs", ".html", ".css"}
MAX_ARCHIVE_BYTES = 50 * 1024 * 1024
MAX_UNCOMPRESSED_BYTES = 250 * 1024 * 1024
MAX_ARCHIVE_MEMBERS = 20_000

def is_safe_path(base_dir: Path, target_path: Path) -> bool:
    """Security: Prevent Zip Slip path traversal attacks."""
    return base_dir.resolve() in target_path.resolve().parents or base_dir.resolve() == target_path.resolve()

@router.post("/zip")
async def upload_project_zip(
    file: UploadFile = File(...),
    candidate_name: str = Form("Independent Builder"),
    college: str = Form("Affiliated Engineering Institute"),
    consent_granted: bool = Form(True),
    email: Optional[str] = Form(None)
):
    if not consent_granted:
        raise HTTPException(status_code=403, detail="Candidate consent must be granted before code analysis can proceed.")

    if email and email.strip():
        EMAIL_REGEX = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        if not re.match(EMAIL_REGEX, email.strip()):
            raise HTTPException(status_code=400, detail="Invalid student email format.")

    if not file.filename or not file.filename.lower().endswith(".zip"):
        raise HTTPException(status_code=400, detail="Only .zip archives are supported.")

    temp_dir = Path(tempfile.mkdtemp())
    zip_path = temp_dir / file.filename

    try:
        bytes_written = 0
        with open(zip_path, "wb") as buffer:
            while chunk := file.file.read(1024 * 1024):
                bytes_written += len(chunk)
                if bytes_written > MAX_ARCHIVE_BYTES:
                    raise HTTPException(status_code=413, detail="ZIP archive exceeds the 50 MB upload limit.")
                buffer.write(chunk)

        extracted_folder = temp_dir / "extracted"
        extracted_folder.mkdir()

        code_timestamps = []
        with zipfile.ZipFile(zip_path, "r") as zip_ref:
            members = zip_ref.infolist()
            if len(members) > MAX_ARCHIVE_MEMBERS:
                raise HTTPException(status_code=413, detail="ZIP archive contains too many files.")
            total_uncompressed = sum(max(0, member.file_size) for member in members)
            if total_uncompressed > MAX_UNCOMPRESSED_BYTES:
                raise HTTPException(status_code=413, detail="ZIP archive expands beyond the 250 MB safety limit.")
            for member in members:
                if "\x00" in member.filename:
                    raise HTTPException(status_code=400, detail="Security alert: Invalid NUL byte in archive path.")
                member_path = extracted_folder / member.filename
                if not is_safe_path(extracted_folder, member_path):
                    raise HTTPException(status_code=400, detail="Security alert: Malicious Zip Slip directory traversal detected.")

                # ZIP symlinks can point outside the extraction root after
                # extraction even when their archive name is safe.
                unix_mode = (member.external_attr >> 16) & 0o170000
                if unix_mode == 0o120000:
                    raise HTTPException(status_code=400, detail="Security alert: Symbolic links are not allowed in uploaded archives.")
                
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

        max_comp = max((item["complexity"] for item in complex_functions), default=0)

        if real_commits:
            git_dna = CommitForensics.analyze_commits(real_commits, test_files_count=test_files_count)
            auth_score = git_dna.get("authenticity_score", 0)
            engineering_signal_score = auth_score
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
            # A ZIP snapshot cannot prove development history. Score only the
            # observable engineering evidence and expose the missing-history
            # limitation instead of calling a one-day archive organic.
            engineering_signal_score = 72
            if test_files_count >= 1: engineering_signal_score += 6
            if test_files_count >= 3: engineering_signal_score += 4
            if max_comp >= 5: engineering_signal_score += 4
            if total_loc >= 200: engineering_signal_score += 2
            engineering_signal_score = min(98, engineering_signal_score)
            auth_score = 0

            git_dna = {
                "total_commits": 0,
                "time_span_days": days_span,
                "burst_ratio": 0.0,
                "deletion_ratio": 0.0,
                "organic_growth": False,
                "history_verified": False,
                "confidence": 0.0,
                "message_maturity_score": 0,
                "test_files_detected": test_files_count,
                "authenticity_score": auth_score,
                "engineering_signal_score": engineering_signal_score,
                "is_offline_zip": True,
                "summary": f"Offline Direct Code Submission: Evaluated {len(code_files)} source files ({total_loc} LOC) across {days_span} day(s) of archive timestamps with {test_files_count} test suites (Max AST Cyclomatic Complexity: {max_comp}). Git history was not supplied, so development rhythm is unverified."
            }

        # Security: Adversarial Prompt Injection & Synthetic AI Scanner
        commit_msgs = [c.get("message", "") for c in real_commits if c.get("message")]
        security_report = InjectionScanner.scan_repository(code_snippets, commit_msgs)
        is_prompt_injected = security_report.get("is_prompt_injected", False)

        # 4-Stage Forensic Global Plagiarism & Origin Detection
        matcher = TutorialMatcher()
        is_clone, matched_tutorial = matcher.detect_global_plagiarism(
            repo_meta={"name": Path(file.filename).stem, "owner": {"login": candidate_name}},
            commits_data=real_commits,
            file_tree=file_tree,
            code_snippets=code_snippets,
            structural_tokens=structural_tokens,
            candidate_name=candidate_name,
            is_prompt_injected=is_prompt_injected
        )

        if is_prompt_injected:
            is_clone = False
            matched_tutorial = None
            auth_score = min(auth_score, 10)
            git_dna["authenticity_score"] = auth_score

        # Authenticity scoring calculation
        if is_clone and matched_tutorial:
            auth_score = max(0, min(auth_score, int((1.0 - matched_tutorial.get("similarity_score", 0.0)) * 100)))
            git_dna["authenticity_score"] = auth_score
            git_dna["organic_growth"] = False
        elif matched_tutorial and not is_clone and matched_tutorial.get("similarity_score", 0) > 0:
            penalty = int(matched_tutorial.get("similarity_score", 0.4) * 40)
            auth_score = max(45, auth_score - penalty)
            git_dna["authenticity_score"] = auth_score
        elif real_commits and len(real_commits) < 10 and not is_clone:
            # For small authentic hackathon projects, ensure code structure baseline is recognized
            structural_baseline = min(96, 80 + (8 if test_files_count >= 1 else 0) + (4 if max_comp >= 5 else 0))
            auth_score = max(auth_score, structural_baseline)
            git_dna["authenticity_score"] = auth_score
            git_dna["organic_growth"] = bool(git_dna.get("history_verified"))

        # Generate Viva Questions
        viva_engine = VivaEngine()
        viva_questions = viva_engine.generate_questions_for_functions(complex_functions)

        # Ingestion-Stage Prompt Injection Defense
        has_prompt_injection = False
        for fpath, content in code_snippets.items():
            detected, _ = AdversarialDefensePipeline.detect_prompt_injection(content)
            if detected:
                has_prompt_injection = True
                break
        if not has_prompt_injection and real_commits:
            for c in real_commits:
                msg = c.get("message") or ""
                detected, _ = AdversarialDefensePipeline.detect_prompt_injection(msg)
                if detected:
                    has_prompt_injection = True
                    break

        if has_prompt_injection:
            auth_score = 0
            git_dna["authenticity_score"] = 0
            engineering_signal_score = 0

        # Tamper proof hash
        manifest_str = f"{candidate_name}:{total_loc}:{auth_score}:{len(file_tree)}"
        tamper_proof_hash = "SHA256:" + hashlib.sha256(manifest_str.encode()).hexdigest()

        # Generate Explainable ProofCard
        if is_prompt_injected or has_prompt_injection:
            card_status = "FLAGGED_ADVERSARIAL_INJECTION"
            card_headline = "Security Alert: Adversarial Prompt Injection Detected. Uploaded archive attempted prompt injection against AI evaluator."
            card_strengths = [
                f"Security Isolation Shield intercepted {security_report.get('findings_count', 1)} adversarial directive(s)",
                f"Quarantined vectors in {', '.join(security_report.get('files_affected', ['source'])[:3])}",
                "Automated grading protected: directives quarantined and sanitized"
            ]
            card_growth = "Remove adversarial prompt injection directives and benchmark test harnesses before enterprise submission."
            card_action = "Clean files of '[AI_EVALUATION_DIRECTIVE]' and bypass comments."
        elif is_clone:
            card_status = "FLAGGED_CLONE"
            card_headline = f"High probability tutorial clone detected ({int((matched_tutorial or {}).get('similarity_score', 0.0)*100)}% structural match)."
            card_strengths = [
                f"Parsed {len(code_files)} files ({total_loc} LOC) successfully",
                f"Extracted syntax tokens verified against template fingerprints"
            ]
            card_growth = "Scaffold an original architecture instead of mirroring public YouTube course repositories."
            card_action = "Implement a custom Redis caching layer or write 5 automated integration tests to demonstrate authentic engineering."
        elif matched_tutorial and matched_tutorial.get("similarity_score", 0) > 0:
            card_status = "PARTIAL_ADAPTATION"
            card_headline = f"Partial tutorial adaptation detected with custom extensions."
            card_strengths = [
                f"Custom logic added beyond base tutorial scaffold ({total_loc} LOC)",
                f"Demonstrated working understanding of {project_type}"
            ]
            card_growth = "Replace remaining boilerplate tutorial components with original domain logic."
            card_action = "Refactor tutorial data layer to custom relational or cache-backed data schemas."
        elif matched_tutorial:
            card_status = "DECLARED_SOURCE_CITATION"
            card_headline = matched_tutorial.get("verdict", "An upstream source was declared, but code copying was not established.")
            card_strengths = [
                f"{total_loc} lines of source observed across {len(code_files)} files",
                "Declared provenance was recorded separately from verified code overlap",
                "No plagiarism verdict was produced from the citation alone",
            ]
            card_growth = "Verify the upstream relationship with source comparison and complete Git history."
            card_action = "Provide the cited source and repository history for attribution review."
        elif not real_commits:
            card_status = "VERIFICATION_INCOMPLETE"
            card_headline = "Source snapshot analyzed; Git development history was not supplied, so authenticity is unverified."
            card_strengths = [
                f"{total_loc} lines of source observed across {len(code_files)} files",
                f"Engineering signal score: {engineering_signal_score}/100",
                f"{test_files_count} automated test files detected" if test_files_count else "No automated test files detected",
            ]
            card_growth = "Provide repository history or a verified Git export for development-rhythm analysis."
            card_action = "Submit the repository with its .git history to verify authorship and progression."
        else:
            card_status = "VERIFIED_COMPETENT" if auth_score < 90 else "VERIFIED_EXEMPLARY"
            card_headline = "Verified authentic engineering work with clean AST control flow."
            card_strengths = [
                f"{total_loc} lines of verified source code across {len(code_files)} files",
                f"{test_files_count} automated test files detected with strong engineering discipline" if test_files_count > 0 else f"Clean modular architecture with maximum observed CC {max_comp}",
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
            "tamper_proof_hash": tamper_proof_hash,
            "has_prompt_injection": has_prompt_injection,
            "email": email
        }

        first_seq = list(structural_tokens.values())[0] if structural_tokens else ""

        clone_pct = int((matched_tutorial or {}).get("similarity_score", 0.0) * 100) if (is_clone and matched_tutorial) else 0
        anomaly_pct = max(0, 100 - auth_score)
        viva_blocked = bool(clone_pct > 30 or anomaly_pct > 30 or is_prompt_injected or has_prompt_injection)

        if is_prompt_injected or has_prompt_injection:
            viva_blocked_reason = "Adversarial prompt injection detected in uploaded archive."
        elif clone_pct > 30:
            viva_blocked_reason = f"Uploaded code exhibits {clone_pct}% clone similarity with '{matched_tutorial.get('name')}', exceeding the 30% permissible limit."
        elif anomaly_pct > 30:
            viva_blocked_reason = f"Forensic anomaly score ({anomaly_pct}%) exceeds the 30% threshold."
        else:
            viva_blocked_reason = None

        result_profile = {
            "status": "success",
            "email": email,
            "viva_blocked": viva_blocked,
            "viva_blocked_reason": viva_blocked_reason,
            "clone_pct": clone_pct,
            "anomaly_pct": anomaly_pct,
            "candidate_id": f"cand_zip_{hashlib.md5(candidate_name.encode()).hexdigest()[:8]}",
            "name": candidate_name,
            "candidate_name": candidate_name,
            "college": college,
            "project_name": Path(file.filename).stem,
            "project_type": project_type,
            "detected_stack": project_type,
            "total_loc": total_loc,
            "authenticity_score": auth_score,
            "engineering_signal_score": engineering_signal_score,
            "analysis_status": "COMPLETED" if git_dna.get("history_verified") else "VERIFICATION_INCOMPLETE",
            "analysis_confidence": git_dna.get("confidence", 0.0),
            "skill_evidence": JDMatcher.extract_skill_evidence(code_snippets, file_tree),
            "readiness_plan": ReadinessEngine.build_plan(
                skill_evidence=JDMatcher.extract_skill_evidence(code_snippets, file_tree),
                complex_functions=complex_functions,
                git_dna=git_dna,
                viva_questions=viva_questions,
                matched_tutorial=matched_tutorial,
                analysis_status="COMPLETED" if git_dna.get("history_verified") else "VERIFICATION_INCOMPLETE",
            ),
            "is_clone": is_clone,
            "has_prompt_injection": has_prompt_injection,
            "matched_tutorial": matched_tutorial,
            "security_scan": security_report,
            "is_prompt_injected": is_prompt_injected,
            "is_synthetic_ai": security_report.get("is_synthetic_ai", False),
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
            "viva_score": 0,
            "viva_status": "BLOCKED_HIGH_ANOMALY" if viva_blocked else ("PENDING_LIVE_DEFENSE" if viva_questions else "UNAVAILABLE_NO_COMPLEX_SOURCE"),
            "viva_block_reason": viva_blocked_reason,
            "anomaly_score": max(clone_pct, anomaly_pct, 90 if is_prompt_injected else 0),
            "proof_card": proof_card,
            "tamper_proof_hash": tamper_proof_hash,
            "consent_recorded": True
        }

        try:
            asyncio.create_task(N8nService.dispatch_candidate_scanned(result_profile))
        except Exception:
            pass

        return result_profile
    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)
