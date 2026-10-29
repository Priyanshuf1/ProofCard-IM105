from typing import List
from fastapi import APIRouter, HTTPException
from backend.models.schemas import JDParsingRequest, BattleRequest, BattleResponse
from backend.services.jd_matcher import JDMatcher

router = APIRouter(prefix="/api/recruiter", tags=["Recruiter Battle Matrix"])

@router.post("/parse-jd")
def parse_job_description(req: JDParsingRequest):
    required = JDMatcher.extract_requirements(req.job_description)
    return {
        "job_title": req.job_title,
        "required_skills": required,
        "total_skills_extracted": len(required)
    }

@router.post("/battle-compare", response_model=BattleResponse)
def battle_compare_candidates(req: BattleRequest):
    if len(req.candidates) < 2:
        raise HTTPException(status_code=400, detail="Must provide at least 2 candidates for head-to-head battle matrix.")

    incomplete = [
        c for c in req.candidates
        if getattr(c, "analysis_status", "") == "VERIFICATION_INCOMPLETE"
    ]
    # If all candidates have incomplete analysis status, require completed evidence
    if len(incomplete) == len(req.candidates):
        raise HTTPException(
            status_code=422,
            detail="At least two candidates with completed evidence are required for ranking.",
        )

    raw_candidates = [c.model_dump() for c in req.candidates if getattr(c, "analysis_status", "") != "VERIFICATION_INCOMPLETE"]
    if len(raw_candidates) < 2:
        raw_candidates = [c.model_dump() for c in req.candidates]

    try:
        result = JDMatcher.run_battle(raw_candidates, req.job_requirements)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
