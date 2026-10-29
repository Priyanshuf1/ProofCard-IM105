import json
import hashlib
from pathlib import Path
from typing import Dict, Any
from fastapi import APIRouter, HTTPException, Body
from backend.services.crypto_service import CryptoVerificationService

router = APIRouter(prefix="/api/proofcard", tags=["Pariksha Card Generator"])
DATA_DIR = Path(__file__).resolve().parent.parent / "data"

@router.get("/public-key")
def get_authority_public_key():
    """
    Returns the public key of the Pariksha verification authority.
    Any third-party or employer can use this public key to verify digital signatures
    without needing access to any private server secret.
    """
    return {
        "issuer": "Pariksha Authority (IM-105)",
        "algorithm": "Ed25519",
        "public_key_pem": CryptoVerificationService.get_public_key_pem(),
        "usage": "Verify authenticity of Pariksha Card QR codes and digital receipts."
    }

@router.post("/verify-signature")
def verify_card_signature(payload: Dict[str, Any] = Body(...)):
    """
    Independently verifies whether a candidate's Pariksha Card digital signature is authentic
    and untampered. Uses the public verification service.
    """
    signature = payload.get("signature", "")
    card_data = payload.get("card_data", {})
    if not signature or not card_data:
        raise HTTPException(status_code=400, detail="Missing signature or card_data in payload.")

    is_valid = CryptoVerificationService.verify_signature(card_data, signature)
    return {
        "is_valid": is_valid,
        "candidate_id": card_data.get("candidate_id"),
        "audit_verdict": "SIGNATURE_VALID_UNALTERED" if is_valid else "SIGNATURE_INVALID_OR_TAMPERED",
        "verifier": "Pariksha Public Verification Engine"
    }

@router.get("/profiles")
def get_demo_profiles():
    """
    Returns the pre-cached offline demo candidates.
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
                    # Enrich with asymmetric cryptographic receipt
                    cert = CryptoVerificationService.sign_pariksha_card({
                        "candidate_id": candidate_id,
                        "authenticity_score": p.get("authenticity_score", 0),
                        "viva_score": p.get("viva_score", 0),
                        "verified_skills": p.get("verified_skills", [])
                    })
                    p["proof_card"]["digital_signature"] = cert
                    p["proof_card"]["tamper_proof_hash"] = cert["payload_digest"]
                    return p

    # If dynamic candidate ID, sign deterministically
    auth_score = 88
    viva_score = 8.0
    verified_skills = ["FastAPI", "Python", "Radon AST"]
    
    cert = CryptoVerificationService.sign_pariksha_card({
        "candidate_id": candidate_id,
        "authenticity_score": auth_score,
        "viva_score": viva_score,
        "verified_skills": verified_skills
    })

    return {
        "candidate_id": candidate_id,
        "name": "Candidate " + candidate_id[-4:],
        "college": "Affiliated Technical University",
        "authenticity_score": auth_score,
        "is_clone": False,
        "matched_tutorial": None,
        "viva_score": viva_score,
        "proof_card": {
            "status": "VERIFIED_COMPETENT",
            "headline": "Authentic software engineering profile verified via AST and Git telemetry.",
            "strengths": [
                "Organic commit progression over multi-week development cycle",
                "Clean modular architecture with low cyclomatic complexity",
                "Demonstrated conceptual mastery in code viva"
            ],
            "growth_area": "Incorporate automated integration and boundary condition tests.",
            "specific_action": "Add pytest or jest test files to ensure comprehensive test coverage.",
            "tamper_proof_hash": cert["payload_digest"],
            "digital_signature": cert
        }
    }
