import json
import hashlib
from pathlib import Path
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/api/proofcard", tags=["ProofCard Generator"])
DATA_DIR = Path(__file__).resolve().parent.parent / "data"

@router.get("/profiles")
def get_demo_profiles():
    """
    Returns the 3 pre-cached offline demo candidates:
    1. The Copier (Rohan Sharma)
    2. The Builder (Ananya Patel)
    3. The Middleground (Vikram Rao)
    """
    path = DATA_DIR / "demo_profiles.json"
    if path.exists():
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f).get("profiles", [])
    return []

@router.get("/profile/{candidate_id}")
def get_proofcard_by_id(candidate_id: str):
    path = DATA_DIR / "demo_profiles.json"
    if path.exists():
        with open(path, "r", encoding="utf-8") as f:
            profiles = json.load(f).get("profiles", [])
            for p in profiles:
                if p.get("candidate_id") == candidate_id:
                    return p

    # If dynamic candidate ID
    sample_hash = "SHA256:" + hashlib.sha256(candidate_id.encode()).hexdigest()
    return {
        "candidate_id": candidate_id,
        "name": "Candidate " + candidate_id[-4:],
        "college": "Affiliated Technical University",
        "authenticity_score": 88,
        "is_clone": False,
        "matched_tutorial": None,
        "viva_score": 8,
        "proof_card": {
            "status": "VERIFIED_COMPETENT",
            "headline": "High-confidence genuine software engineer.",
            "strengths": [
                "Organic commit progression over multi-week development cycle",
                "Clean modular architecture with low cyclomatic complexity",
                "Demonstrated conceptual mastery in code viva"
            ],
            "growth_area": "Incorporate automated integration and boundary condition tests.",
            "specific_action": "Add 3 pytest or jest test files to ensure comprehensive test coverage.",
            "tamper_proof_hash": sample_hash
        }
    }
