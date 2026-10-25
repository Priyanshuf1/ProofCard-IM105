from typing import List, Optional
from fastapi import APIRouter
from backend.models.schemas import BiasMirrorRequest, BiasMirrorResponse
from backend.services.bias_engine import BiasEngine

router = APIRouter(prefix="/api/bias", tags=["Recruiter Bias Mirror"])

@router.post("/audit", response_model=BiasMirrorResponse)
def audit_recruiter_bias(req: BiasMirrorRequest):
    decisions = [d.model_dump() for d in req.session_decisions]
    result = BiasEngine.audit_recruiter_decisions(decisions)
    return result

@router.get("/fairness-stress-test")
def run_fairness_stress_test(
    authenticity_score: int = 94,
    viva_score: int = 9
):
    """
    Live Stage Demo Endpoint:
    Compares two identical skill profiles (Elite IIT vs Tier-3 Rural State College)
    and demonstrates 0.00 disparity across all metrics.
    """
    result = BiasEngine.run_live_fairness_stress_test(
        base_authenticity=authenticity_score,
        base_viva=viva_score
    )
    return result
