"""Build an evidence-backed contract between assessment and real work.

The contract intentionally does not calculate a hiring score.  It records what
was observed, what still needs to be demonstrated, and what an employer or
mentor must verify after deployment.
"""

import hashlib
import json
import re
from typing import Any, Dict, List


def _slug(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-") or "competency"


class DeploymentReadiness:
    DEFAULT_COMPETENCIES = [
        "source ownership",
        "testing and failure handling",
        "technical explanation",
        "delivery reliability",
    ]

    @classmethod
    def build_contract(
        cls,
        *,
        profile: Dict[str, Any],
        role_title: str | None = None,
        role_requirements: List[str] | None = None,
    ) -> Dict[str, Any]:
        evidence = profile.get("skill_evidence") or {}
        complex_functions = profile.get("complex_functions") or profile.get("complex_functions_for_viva") or []
        git_dna = profile.get("git_dna") or {}
        viva_questions = profile.get("viva_questions") or []
        role = (role_title or profile.get("project_type") or "Software Engineer").strip()

        requested = [str(item).strip() for item in (role_requirements or []) if str(item).strip()]
        observed_skills = [str(key).strip() for key in evidence if str(key).strip()]
        competency_names = list(dict.fromkeys(requested + observed_skills))
        if not competency_names:
            competency_names = cls.DEFAULT_COMPETENCIES.copy()

        evidence_lookup = {str(key).lower(): paths for key, paths in evidence.items()}
        competencies: List[Dict[str, Any]] = []
        for name in competency_names[:10]:
            paths = evidence_lookup.get(name.lower(), [])
            if paths:
                state = "OBSERVED_IN_SOURCE"
                next_proof = "Confirm this capability in the role work sample."
            else:
                state = "NOT_OBSERVED"
                next_proof = f"Provide a role-specific work sample demonstrating {name}."

            competencies.append({
                "id": _slug(name),
                "name": name,
                "state": state,
                "source_files": paths[:8],
                "next_proof": next_proof,
            })

        source_files = [
            path
            for paths in evidence.values()
            for path in paths[:8]
        ]
        history_verified = bool(git_dna.get("history_verified"))
        source_available = bool(profile.get("detected_files") or source_files)
        analysis_complete = profile.get("analysis_status") == "COMPLETED"

        if analysis_complete and history_verified and source_available:
            contract_status = "READY_FOR_WORK_SAMPLE"
        else:
            contract_status = "EVIDENCE_INCOMPLETE"

        contract_basis = {
            "candidate_id": profile.get("candidate_id", "unknown"),
            "role": role,
            "competencies": competencies,
            "history_verified": history_verified,
            "source_available": source_available,
            "analysis_status": profile.get("analysis_status", "VERIFICATION_INCOMPLETE"),
        }
        contract_hash = hashlib.sha256(
            json.dumps(contract_basis, sort_keys=True, default=str).encode("utf-8")
        ).hexdigest()

        return {
            "version": "deployment-contract-v1",
            "contract_id": f"DPC-{contract_hash[:16].upper()}",
            "contract_hash": f"SHA256:{contract_hash}",
            "candidate_id": profile.get("candidate_id"),
            "role_title": role,
            "status": contract_status,
            "decision_use": "Do not use this contract as a standalone hiring score.",
            "summary": "Connects verified assessment evidence to a role work sample and later workplace verification.",
            "competencies": competencies,
            "work_sample": {
                "status": "NOT_STARTED",
                "brief": f"Complete a bounded {role} task using the candidate's own approach, then explain the trade-offs.",
                "required_evidence": [
                    "submitted work or patch",
                    "passing test or validation output",
                    "short explanation of one trade-off",
                ],
                "acceptance": "A reviewer can reproduce the result and link each claimed competency to an artifact.",
            },
            "outcome_checkpoints": [
                {
                    "checkpoint": "30_DAY",
                    "status": "NOT_RECORDED",
                    "required_evidence": "Mentor-verified first independent contribution.",
                },
                {
                    "checkpoint": "60_DAY",
                    "status": "NOT_RECORDED",
                    "required_evidence": "A shipped contribution and one reviewed collaboration artifact.",
                },
                {
                    "checkpoint": "90_DAY",
                    "status": "NOT_RECORDED",
                    "required_evidence": "Manager-verified role outcome and remaining skill gaps.",
                },
            ],
            "calibration": {
                "status": "AWAITING_WORKPLACE_OUTCOMES",
                "assessment_prediction": "NOT_COMPARED",
                "time_to_productivity": "NOT_RECORDED",
                "message": "Workplace outcomes must be supplied by an authorised mentor or employer before calibration is calculated.",
            },
            "evidence_basis": {
                "source_files": sorted(set(source_files))[:20],
                "history_verified": history_verified,
                "complex_functions": len(complex_functions),
                "viva_questions": len(viva_questions),
                "analysis_status": profile.get("analysis_status", "VERIFICATION_INCOMPLETE"),
            },
        }
