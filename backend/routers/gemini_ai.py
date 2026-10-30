"""
backend/routers/gemini_ai.py
Gemini AI Talent Segregation & Job Requirement Comparison Router for ProofCard (IM-105).
Strictly validates live Gemini API key (via request body, header, or environment variable)
and performs candidate classification and multi-dimensional job matching.
"""

from typing import List, Dict, Any, Optional
from fastapi import APIRouter, Header, Request, HTTPException, status

from backend.models.gemini_schemas import (
    CandidateSegregationResult,
    CandidateJobComparisonResult,
    BatchSegregationRequest,
    BatchSegregationResponse,
    BatchComparisonRequest,
    BatchComparisonResponse,
)
from backend.services.gemini_agent import GeminiAgentService

router = APIRouter(prefix="/api/v1/gemini", tags=["Gemini AI Talent Intelligence"])


def _extract_header_key(request: Request) -> Optional[str]:
    """
    Extracts Gemini API key from request headers case-insensitively.
    Returns None if header is not present. If header is present (even empty), returns its value.
    """
    for header_name, header_val in request.headers.items():
        if header_name.lower() in ("x-gemini-api-key", "gemini-api-key"):
            return header_val
    return None


@router.post(
    "/segregate",
    response_model=CandidateSegregationResult,
    summary="Segregate Candidate into Technical or Non-Technical Stream",
    description="Analyzes candidate profile/resume and classifies into TECHNICAL or NON_TECHNICAL stream with confidence and reasoning.",
)
async def segregate_candidate_endpoint(
    request: Request,
):
    """
    Classifies a candidate into Technical vs Non-Technical branch.
    Strictly enforces Gemini API key resolution.
    """
    body_data: Dict[str, Any] = {}
    try:
        body_data = await request.json()
    except Exception:
        body_data = {}

    header_key = _extract_header_key(request)
    request_key = body_data.get("gemini_api_key")

    valid_key = GeminiAgentService.resolve_api_key(
        request_key=request_key,
        header_key=header_key,
    )

    candidate_data = (
        body_data.get("candidate_data")
        or body_data.get("candidate")
        or body_data
    )

    # Remove non-candidate wrapper fields if present
    if isinstance(candidate_data, dict):
        candidate_data = dict(candidate_data)
        candidate_data.pop("gemini_api_key", None)

    return GeminiAgentService.segregate_candidate(
        candidate_data=candidate_data,
        api_key=valid_key,
    )


@router.post(
    "/segregate-batch",
    response_model=BatchSegregationResponse,
    summary="Batch Segregate Multiple Candidates",
    description="Segregates an array of candidate records into Technical and Non-Technical streams.",
)
async def segregate_batch_endpoint(
    request: Request,
    payload: BatchSegregationRequest,
):
    """
    Segregates multiple candidate records in a single batch.
    """
    header_key = _extract_header_key(request)
    valid_key = GeminiAgentService.resolve_api_key(
        request_key=payload.gemini_api_key,
        header_key=header_key,
    )

    tech_stream: List[CandidateSegregationResult] = []
    non_tech_stream: List[CandidateSegregationResult] = []

    for item in payload.candidates:
        res = GeminiAgentService.segregate_candidate(candidate_data=item, api_key=valid_key)
        if res.stream == "TECHNICAL":
            tech_stream.append(res)
        else:
            non_tech_stream.append(res)

    return BatchSegregationResponse(
        total_analyzed=len(payload.candidates),
        technical_count=len(tech_stream),
        non_technical_count=len(non_tech_stream),
        technical_stream=tech_stream,
        non_technical_stream=non_tech_stream,
    )


@router.post(
    "/compare",
    response_model=CandidateJobComparisonResult,
    summary="Compare Candidate Resume to Job Requirement",
    description="Evaluates candidate against enterprise JD across skills, responsibilities, experience, and education.",
)
async def compare_candidate_to_job_endpoint(
    request: Request,
):
    """
    Compares candidate against an enterprise job requirement.
    Produces alignment percentage, match/gap breakdown, and fit verdict.
    """
    body_data: Dict[str, Any] = {}
    try:
        body_data = await request.json()
    except Exception:
        body_data = {}

    header_key = _extract_header_key(request)
    request_key = body_data.get("gemini_api_key")

    valid_key = GeminiAgentService.resolve_api_key(
        request_key=request_key,
        header_key=header_key,
    )

    candidate_data = body_data.get("candidate_data") or body_data.get("candidate") or {}
    job_data = body_data.get("job_data") or body_data.get("job") or {}

    return GeminiAgentService.compare_resume_to_job(
        candidate_data=candidate_data,
        job_data=job_data,
        api_key=valid_key,
    )


@router.post(
    "/compare-batch",
    response_model=BatchComparisonResponse,
    summary="Batch Compare Candidates to Job Requirement",
    description="Ranks and compares multiple candidates against a target enterprise JD.",
)
async def compare_batch_endpoint(
    request: Request,
    payload: BatchComparisonRequest,
):
    """
    Compares multiple candidates against a single JD, ranking by alignment score.
    """
    header_key = _extract_header_key(request)
    valid_key = GeminiAgentService.resolve_api_key(
        request_key=payload.gemini_api_key,
        header_key=header_key,
    )

    job_data = payload.job_data or payload.job or {}
    job_id = job_data.get("job_id") or "jd_target"
    job_title = job_data.get("title") or job_data.get("job_title") or "Target Role"

    results: List[CandidateJobComparisonResult] = []
    shortlisted = 0
    threshold = payload.minimum_alignment_threshold or 60.0

    for cand in payload.candidates:
        res = GeminiAgentService.compare_resume_to_job(
            candidate_data=cand,
            job_data=job_data,
            api_key=valid_key,
        )
        results.append(res)
        if res.alignment_percentage >= threshold:
            shortlisted += 1

    # Sort descending by alignment percentage
    results.sort(key=lambda x: x.alignment_percentage, reverse=True)

    return BatchComparisonResponse(
        job_id=job_id,
        job_title=job_title,
        total_evaluated=len(payload.candidates),
        shortlisted_count=shortlisted,
        ranked_candidates=results,
    )
