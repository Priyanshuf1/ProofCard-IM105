"""
backend/models/gemini_schemas.py
Pydantic schemas for Gemini AI Candidate Segregation, Job Requirements CRUD,
and Multi-Dimensional Job Alignment Comparison.
"""

from typing import List, Optional, Dict, Any, Union
from pydantic import BaseModel, Field, model_validator
import uuid


# ---------------------------------------------------------------------------
# 1. Candidate Stream Segregation Schemas
# ---------------------------------------------------------------------------

class CandidateSegregationResult(BaseModel):
    model_config = {"extra": "allow"}
    candidate_id: Optional[str] = None
    candidate_name: Optional[str] = None
    stream: str = Field(..., description="'TECHNICAL' or 'NON_TECHNICAL'")
    confidence_score: float = Field(0.95, ge=0.0, le=1.0, description="Classification confidence score")
    primary_domain: str = Field("Backend", description="e.g. Backend, Frontend, AI/ML, Product Management, HR")
    sub_domains: List[str] = Field(default_factory=list)
    technical_capabilities: List[str] = Field(default_factory=list)
    non_technical_capabilities: List[str] = Field(default_factory=list)
    reasoning: str = Field(..., description="Explanation of segregation classification")
    recommended_job_roles: List[str] = Field(default_factory=list)


class SingleSegregationRequest(BaseModel):
    model_config = {"extra": "allow"}
    gemini_api_key: Optional[str] = Field(None, description="Optional Gemini API key in body")
    candidate_data: Optional[Dict[str, Any]] = None
    candidate: Optional[Dict[str, Any]] = None


class BatchSegregationRequest(BaseModel):
    model_config = {"extra": "allow"}
    gemini_api_key: Optional[str] = None
    candidates: List[Dict[str, Any]] = Field(..., description="List of candidate records to segregate")


class BatchSegregationResponse(BaseModel):
    total_analyzed: int
    technical_count: int
    non_technical_count: int
    technical_stream: List[CandidateSegregationResult]
    non_technical_stream: List[CandidateSegregationResult]


# ---------------------------------------------------------------------------
# 2. Enterprise Job Requirement Schemas
# ---------------------------------------------------------------------------

class JobRequirementInput(BaseModel):
    model_config = {"extra": "allow"}
    job_id: Optional[str] = None
    title: Optional[str] = None
    job_title: Optional[str] = None
    department: Optional[str] = "Engineering"
    domain: Optional[str] = "Backend"
    experience_level: Optional[str] = "Fresher / Campus Graduate (0-1 Years)"
    relevant_experience: Optional[str] = "0-1 Years"
    description: Optional[str] = None
    job_description: Optional[str] = None
    responsibilities: List[str] = Field(default_factory=list)
    technical_skills: List[str] = Field(default_factory=list)
    required_skills: List[str] = Field(default_factory=list)
    preferred_skills: List[str] = Field(default_factory=list)
    non_technical_skills: List[str] = Field(default_factory=list)
    educational_qualifications: List[str] = Field(default_factory=list)
    eligibility_criteria: List[str] = Field(default_factory=list)
    minimum_score_threshold: Optional[int] = 70

    @model_validator(mode="after")
    def validate_and_canonicalize(self) -> "JobRequirementInput":
        effective_title = self.title or self.job_title
        if not effective_title or not str(effective_title).strip():
            raise ValueError("Job title is required and cannot be empty.")

        # Ensure title and job_title are in sync
        self.title = str(effective_title).strip()
        self.job_title = str(effective_title).strip()

        # Check skills: either technical_skills or required_skills must be provided
        combined_skills = list(self.technical_skills) + list(self.required_skills)
        if not combined_skills:
            raise ValueError("At least one technical/required skill must be specified.")

        if not self.technical_skills and self.required_skills:
            self.technical_skills = list(self.required_skills)
        if not self.required_skills and self.technical_skills:
            self.required_skills = list(self.technical_skills)

        # Sync descriptions
        effective_desc = self.description or self.job_description or f"Job description for {self.title}"
        self.description = effective_desc
        self.job_description = effective_desc

        if not self.job_id or not str(self.job_id).strip():
            self.job_id = f"jd_{uuid.uuid4().hex[:8]}"

        return self


class JobRequirementResponse(BaseModel):
    status: str = "SUCCESS"
    job_id: str
    job: JobRequirementInput
    message: str = "Job requirement stored successfully"


# ---------------------------------------------------------------------------
# 3. Resume-to-Job Comparison Schemas
# ---------------------------------------------------------------------------

class ScoreBreakdown(BaseModel):
    technical_skills_score: float = Field(..., ge=0.0, le=100.0)
    responsibilities_readiness_score: float = Field(..., ge=0.0, le=100.0)
    experience_alignment_score: float = Field(..., ge=0.0, le=100.0)
    education_fit_score: float = Field(..., ge=0.0, le=100.0)
    non_technical_skills_score: float = Field(..., ge=0.0, le=100.0)


class CandidateJobComparisonResult(BaseModel):
    model_config = {"extra": "allow"}
    candidate_id: Optional[str] = None
    candidate_name: Optional[str] = None
    job_id: Optional[str] = None
    job_title: Optional[str] = None
    alignment_percentage: float = Field(..., ge=0.0, le=100.0, description="Overall alignment percentage (0-100)")
    fit_verdict: str = Field(..., description="'STRONG_MATCH', 'MODERATE_MATCH', 'POTENTIAL_MATCH', or 'MISALIGNED'")
    score_breakdown: Optional[ScoreBreakdown] = None
    skills_breakdown: Optional[Dict[str, Any]] = None
    matched_skills: List[str] = Field(default_factory=list)
    missing_skills: List[str] = Field(default_factory=list)
    missing_qualifications: List[str] = Field(default_factory=list)
    strengths: List[str] = Field(default_factory=list)
    gaps_and_growth_areas: List[str] = Field(default_factory=list)
    recruiter_recommendation: str = Field(..., description="Executive recruiter hiring assessment")


class SingleComparisonRequest(BaseModel):
    model_config = {"extra": "allow"}
    gemini_api_key: Optional[str] = None
    candidate_data: Optional[Dict[str, Any]] = None
    candidate: Optional[Dict[str, Any]] = None
    job_data: Optional[Dict[str, Any]] = None
    job: Optional[Dict[str, Any]] = None


class BatchComparisonRequest(BaseModel):
    model_config = {"extra": "allow"}
    gemini_api_key: Optional[str] = None
    job_data: Optional[Dict[str, Any]] = None
    job: Optional[Dict[str, Any]] = None
    candidates: List[Dict[str, Any]] = Field(..., description="List of candidates to compare")
    minimum_alignment_threshold: Optional[float] = 60.0


class BatchComparisonResponse(BaseModel):
    job_id: str
    job_title: str
    total_evaluated: int
    shortlisted_count: int
    ranked_candidates: List[CandidateJobComparisonResult]
