"""
backend/routers/forensics.py
Public Projects, Forensic Repository Cloner & Live Site Inspection Router for ProofCard (IM-105).
Extracts public Git and deployment URLs from resume text, performs forensic repository inspection
with timeout and size limits, and audits live deployed web applications.
"""

from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field
from fastapi import APIRouter, HTTPException, status

from backend.services.repo_extractor import RepoUrlExtractor
from backend.services.forensic_cloner import ForensicRepoCloner
from backend.services.live_site_inspector import LiveSiteInspector
from backend.services.apify_site_evaluator import ApifySiteEvaluator

router = APIRouter(prefix="/api/v1/forensics", tags=["Forensic Repository & Live Site Inspection"])


# ---------------------------------------------------------------------------
# Request & Response Schemas
# ---------------------------------------------------------------------------

class TextUrlExtractionRequest(BaseModel):
    text: str = Field(..., description="Raw resume text or profile content to extract URLs from")


class UrlExtractionResponse(BaseModel):
    git_repos: List[str] = Field(default_factory=list, description="Extracted canonical Git repository URLs")
    live_deployments: List[str] = Field(default_factory=list, description="Extracted live web application URLs")


class RepoCloneRequest(BaseModel):
    repo_url: str = Field(..., description="Target Git repository URL to clone and inspect")
    test_mode: Optional[bool] = Field(False, description="When true, falls back to local sample fixtures")
    timeout_seconds: Optional[int] = Field(15, description="Timeout limit in seconds for cloning")
    max_size_mb: Optional[int] = Field(150, description="Maximum repository size limit in MB")


class LiveSiteEvaluationRequest(BaseModel):
    url: str = Field(..., description="Target working live deployment URL")
    candidate_name: Optional[str] = Field("Candidate", description="Name of candidate")
    candidate_email: Optional[str] = Field("student@example.edu", description="Contact email")
    college: Optional[str] = Field("Academic / Industry Organization", description="University or organization")
    stream_track: Optional[str] = Field("TECHNICAL", description="TECHNICAL or NON_TECHNICAL")
    apify_token: Optional[str] = Field(None, description="Apify API Key")
    timeout_seconds: Optional[float] = Field(8.0, description="Evaluation timeout limit")


class LiveUrlInspectionRequest(BaseModel):
    url: str = Field(..., description="Target web application URL to inspect")
    timeout: Optional[float] = Field(8.0, description="HTTP request timeout in seconds")


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@router.post(
    "/extract-urls",
    response_model=UrlExtractionResponse,
    summary="Extract Git Repositories and Live Deployment URLs",
    description="Parses resume text and extracts public Git repositories (GitHub, GitLab, Bitbucket) and live PaaS deployments.",
)
def extract_candidate_urls(payload: TextUrlExtractionRequest):
    """
    Extracts Git repos and live deployment URLs from resume text.
    Filters out non-repo paths, issues, PRs, and social links.
    """
    extracted = RepoUrlExtractor.extract_urls(payload.text)
    return UrlExtractionResponse(
        git_repos=extracted["git_repos"],
        live_deployments=extracted["live_deployments"],
    )


@router.post(
    "/clone",
    response_model=Dict[str, Any],
    summary="Forensically Clone and Inspect Public Repository",
    description="Performs shallow blobless cloning with timeouts, size limits, and automatic fallback to local test fixtures.",
)
def clone_and_inspect_repository(payload: RepoCloneRequest):
    """
    Clones and inspects public Git repository.
    Enforces timeout and size limits, returning forensic commits and file tree telemetry.
    """
    telemetry = ForensicRepoCloner.clone_and_inspect(
        repo_url=payload.repo_url,
        test_mode=payload.test_mode or False,
        timeout_seconds=payload.timeout_seconds or 15,
        max_size_mb=payload.max_size_mb or 150,
    )
    return telemetry


@router.post(
    "/inspect-live",
    response_model=Dict[str, Any],
    summary="Audit Live Website Application",
    description="Inspects candidate live web URL for HTTP status, SSL, load latency, semantic DOM, viewport, and a11y.",
)
async def inspect_live_website(payload: LiveUrlInspectionRequest):
    """
    Inspects live deployment URL.
    Returns HTTP status, SSL validity, load latency, semantic DOM elements, and viewport detection.
    """
    audit = await LiveSiteInspector.audit_url(
        url=payload.url,
        timeout=payload.timeout or 8.0,
    )
    return audit


@router.post(
    "/evaluate-live-site",
    response_model=Dict[str, Any],
    summary="Evaluate Live Site Authenticity via Apify",
    description="Evaluates live deployment URL, searches for similar websites on Google via Apify, compares content/design uniqueness, and generates viva questions and ProofCard profile.",
)
async def evaluate_live_site_with_apify(payload: LiveSiteEvaluationRequest):
    """
    Evaluates candidate live site without requiring a GitHub link.
    Performs live inspection, Apify search, similarity scoring, and returns complete CandidateProfile.
    """
    profile = await ApifySiteEvaluator.evaluate_url(
        url=payload.url,
        candidate_name=payload.candidate_name or "Candidate",
        candidate_email=payload.candidate_email or "student@example.edu",
        college=payload.college or "Academic Institution",
        stream_track=payload.stream_track or "TECHNICAL",
        apify_token=payload.apify_token,
        timeout_seconds=payload.timeout_seconds or 8.0,
    )
    return profile
