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

    eligible = [
        candidate for candidate in req.candidates
        if candidate.analysis_status == "COMPLETED"
        and (candidate.analysis_confidence is None or candidate.analysis_confidence >= 0.50)
        and not candidate.is_clone
    ]
    if len(eligible) < 2:
        raise HTTPException(
            status_code=422,
            detail="At least two non-clone candidates with completed evidence and confidence >= 0.50 are required for ranking.",
        )

    raw_candidates = [c.model_dump() for c in eligible]
    result = JDMatcher.run_battle(raw_candidates, req.job_requirements)
    return result
