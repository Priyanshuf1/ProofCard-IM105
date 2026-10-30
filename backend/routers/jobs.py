"""
backend/routers/jobs.py
Enterprise Job Requirements CRUD Router for ProofCard (IM-105).
Supports creating new job specifications, listing catalog JDs (including 30 preloaded JDs),
and retrieving specific job descriptions by ID.
"""

import os
import json
from pathlib import Path
from typing import List, Dict, Any, Optional
from fastapi import APIRouter, HTTPException, status, Query

from backend.models.gemini_schemas import (
    JobRequirementInput,
    JobRequirementResponse,
)

router = APIRouter(prefix="/api/v1/jobs", tags=["Job Requirements"])

# In-memory store for created / modified jobs
_STORED_JOBS: Dict[str, Dict[str, Any]] = {}

# Path to preloaded 30 enterprise JDs
_PRELOADED_FILE = Path(__file__).resolve().parent.parent / "data" / "job_descriptions_30.json"


def _load_preloaded_jobs() -> Dict[str, Dict[str, Any]]:
    """Loads preloaded 30 enterprise JDs from data directory."""
    jobs_map: Dict[str, Dict[str, Any]] = {}
    if _PRELOADED_FILE.exists():
        try:
            with open(_PRELOADED_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
                items = data.get("job_descriptions", [])
                for item in items:
                    jid = item.get("jd_id")
                    if jid:
                        # Normalize fields to match JobRequirementInput model
                        normalized = dict(item)
                        normalized["job_id"] = jid
                        normalized["job_title"] = item.get("title")
                        normalized["job_description"] = item.get("description")
                        normalized["technical_skills"] = item.get("required_skills", [])
                        jobs_map[jid] = normalized
        except Exception:
            pass
    return jobs_map


@router.post(
    "",
    response_model=Dict[str, Any],
    status_code=status.HTTP_201_CREATED,
    summary="Create Enterprise Job Requirement",
    description="Stores an enterprise JD with responsibilities, technical/non-technical skills, and eligibility criteria.",
)
def create_job_requirement(job: JobRequirementInput):
    """
    Creates and stores a new job requirement.
    Canonicalizes job title, description, and technical skills.
    """
    job_dict = job.model_dump()
    job_id = job.job_id
    _STORED_JOBS[job_id] = job_dict
    return job_dict


@router.get(
    "",
    response_model=List[Dict[str, Any]],
    summary="List Job Requirements",
    description="Lists all enterprise job requirements, combining newly created and preloaded catalog JDs.",
)
def list_job_requirements(
    domain: Optional[str] = Query(None, description="Optional domain filter"),
    limit: int = Query(50, ge=1, le=100),
):
    """
    Returns list of job descriptions.
    Includes in-memory created JDs and the 30 preloaded enterprise JDs.
    """
    all_jobs: Dict[str, Dict[str, Any]] = _load_preloaded_jobs()
    all_jobs.update(_STORED_JOBS)

    results = list(all_jobs.values())
    if domain:
        results = [j for j in results if str(j.get("domain", "")).lower() == domain.lower()]

    return results[:limit]


@router.get(
    "/{job_id}",
    response_model=Dict[str, Any],
    summary="Get Job Requirement by ID",
    description="Retrieves a specific enterprise job requirement by job_id.",
)
def get_job_requirement(job_id: str):
    """
    Retrieves job requirement by ID.
    Raises 404 if not found in custom or preloaded stores.
    """
    if job_id in _STORED_JOBS:
        return _STORED_JOBS[job_id]

    preloaded = _load_preloaded_jobs()
    if job_id in preloaded:
        return preloaded[job_id]

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Job requirement with ID '{job_id}' not found.",
    )
