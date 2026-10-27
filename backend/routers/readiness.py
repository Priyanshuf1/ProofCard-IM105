from typing import Any, Dict, List

from fastapi import APIRouter
from pydantic import BaseModel, Field

from backend.services.readiness_engine import ReadinessEngine


router = APIRouter(prefix="/api/readiness", tags=["Employment Readiness"])


class ReadinessPlanRequest(BaseModel):
    profile: Dict[str, Any]
    target_skills: List[str] = Field(default_factory=list)


@router.post("/plan")
def create_readiness_plan(req: ReadinessPlanRequest):
    profile = req.profile
    plan = ReadinessEngine.build_plan(
        skill_evidence=profile.get("skill_evidence"),
        complex_functions=profile.get("complex_functions") or profile.get("complex_functions_for_viva"),
        git_dna=profile.get("git_dna"),
        viva_questions=profile.get("viva_questions"),
        matched_tutorial=profile.get("matched_tutorial"),
        analysis_status=profile.get("analysis_status", "VERIFICATION_INCOMPLETE"),
        target_skills=req.target_skills,
    )
    return {"status": "success", "plan": plan}
