import re
from pathlib import PurePosixPath
from typing import List, Dict, Any, Tuple

TECH_DICTIONARY = {
    "python": [r"\bpython\b", r"\.py\b"],
    "fastapi": [r"\bfastapi\b"],
    "react": [r"\breact\b", r"\.jsx\b", r"\.tsx\b"],
    "nextjs": [r"\bnext(\.js)?\b", r"\.next\b"],
    "nodejs": [r"\bnode(\.js)?\b", r"\bexpress\b"],
    "postgresql": [r"\bpostgres(ql)?\b", r"\basyncpg\b", r"\bpsycopg2?\b", r"\bsql\b"],
    "mongodb": [r"\bmongo(db)?\b", r"\bmongoose\b"],
    "redis": [r"\bredis\b"],
    "docker": [r"\bdocker\b", r"dockerfile", r"docker-compose"],
    "testing": [r"\bpytest\b", r"\bjest\b", r"test_.*\.py", r".*\.test\.(js|ts)"],
    "async_io": [r"\basync\b", r"\bawait\b", r"\basyncio\b"],
    "typescript": [r"\btypescript\b", r"\.ts\b", r"\.tsx\b"],
    "rest_api": [r"\brest\b", r"\bapi\b", r"\bendpoint\b"],
    "microservices": [r"\bmicroservices?\b", r"\bgrpc\b", r"\bmessage broker\b", r"\bkafka\b", r"\brabbitmq\b"],
    "git": [r"\bgit\b", r"\bgithub\b"],
    "tailwind": [r"\btailwind(css)?\b"]
}

class JDMatcher:
    @staticmethod
    def extract_skill_evidence(code_snippets: Dict[str, str], file_paths: List[str]) -> Dict[str, List[str]]:
        """Return the exact files that support each detected technology signal."""
        evidence: Dict[str, List[str]] = {}
        for skill, patterns in TECH_DICTIONARY.items():
            matches = []
            for path in file_paths:
                text = f"{path}\n{code_snippets.get(path, '')}".lower()
                if any(re.search(pattern, text) for pattern in patterns):
                    matches.append(path)
            if matches:
                evidence[skill] = matches[:12]
        return evidence

    @staticmethod
    def extract_requirements(jd_text: str) -> List[str]:
        text_lower = jd_text.lower()
        matched = []
        for skill, patterns in TECH_DICTIONARY.items():
            if any(re.search(p, text_lower) for p in patterns):
                matched.append(skill)
        return matched if matched else ["python", "rest_api", "testing"]

    @staticmethod
    def verify_candidate_skills(
        detected_files: List[str],
        required_skills: List[str],
        skill_evidence: Dict[str, List[str]] | None = None,
    ) -> Tuple[List[str], List[str]]:
        normalized_files = [PurePosixPath(str(path).replace("\\", "/")).as_posix().lower() for path in detected_files]
        files_str = " ".join(normalized_files)
        verified = []
        missing = []
        for skill in required_skills:
            patterns = TECH_DICTIONARY.get(skill, [rf"\b{skill}\b"])
            evidence_paths = (skill_evidence or {}).get(skill, [])
            if evidence_paths or any(re.search(p, files_str) for p in patterns):
                verified.append(skill)
            else:
                missing.append(skill)
        return verified, missing

    @classmethod
    def run_battle(
        cls,
        candidates: List[Dict[str, Any]],
        required_skills: List[str]
    ) -> Dict[str, Any]:
        results = []
        for c in candidates:
            detected_files = c.get("detected_files", [])
            verified, missing = cls.verify_candidate_skills(
                detected_files,
                required_skills,
                c.get("skill_evidence") or {},
            )
            jd_pct = round((len(verified) / max(len(required_skills), 1)) * 100)
            auth_score = c.get("authenticity_score", 0)
            viva_score = c.get("viva_score", 0)
            is_clone = c.get("is_clone", False)

            # Composite Score: 40% Authenticity + 35% JD Match + 25% Viva (scaled to 100)
            composite = round((auth_score * 0.40) + (jd_pct * 0.35) + (viva_score * 10 * 0.25))
            if is_clone:
                composite = min(composite, 25)

            has_tests = "testing" in verified or any("test" in f.lower() for f in detected_files)

            results.append({
                "candidate_id": c.get("candidate_id"),
                "name": c.get("name"),
                "email": c.get("email"),
                "college": c.get("college", "Engineering Institute"),
                "authenticity_score": auth_score,
                "jd_match_pct": jd_pct,
                "viva_score": viva_score,
                "composite_score": composite,
                "verified_skills": verified,
                "missing_skills": missing,
                "has_tests": has_tests,
                "is_clone": is_clone
            })

        sorted_results = sorted(results, key=lambda x: x["composite_score"], reverse=True)
        if not sorted_results:
            raise ValueError("No candidates provided for ranking.")
        winner = sorted_results[0]
        runner_up = sorted_results[1] if len(sorted_results) > 1 else winner
        diff_pts = winner["composite_score"] - runner_up["composite_score"]

        rationale = (
            f"**{winner['name']}** secures #1 ranking (+{diff_pts} pts margin). "
            f"Verified {len(winner['verified_skills'])} of {len(required_skills)} required technical skills in codebase. "
            f"Authenticity Score: {winner['authenticity_score']}/100, Viva Mastery: {winner['viva_score']}/10. "
            f"{'Demonstrated strong test discipline.' if winner['has_tests'] else 'Note: Add unit tests to further strengthen profile.'}"
        )

        return {
            "status": "success",
            "winner_id": winner["candidate_id"],
            "winner_name": winner["name"],
            "diff_pts": diff_pts,
            "rationale": rationale,
            "battle_matrix": sorted_results
        }
