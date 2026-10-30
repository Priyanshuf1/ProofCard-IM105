"""
backend/models/resume_schemas.py
Pydantic schemas for multi-format resume ingestion, structured profile extraction,
and enterprise Sandbox bulk uploads.
"""

from typing import List, Optional, Dict, Any, Union
from pydantic import BaseModel, Field, field_validator
import re
import uuid


class CandidateContact(BaseModel):
    name: str = Field(..., description="Candidate full name")
    email: Optional[str] = Field(None, description="Contact email address")
    phone: Optional[str] = Field(None, description="Contact phone number")
    location: Optional[str] = Field(None, description="City/State/Country or Address")
    linkedin_url: Optional[str] = Field(None, description="LinkedIn profile URL")
    github_url: Optional[str] = Field(None, description="GitHub account or primary repository URL")
    portfolio_url: Optional[str] = Field(None, description="Live portfolio or personal website URL")
    other_links: List[str] = Field(default_factory=list, description="Other links found in resume")
    all_github_urls: List[str] = Field(default_factory=list, description="All GitHub repo/profile URLs found in resume")
    all_live_urls: List[str] = Field(default_factory=list, description="All live/portfolio URLs found in resume")

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and v.strip():
            EMAIL_REGEX = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            if not re.match(EMAIL_REGEX, v.strip()):
                raise ValueError("Invalid email format.")
            return v.strip().lower()
        return None if v is not None and not v.strip() else v


class EducationEntry(BaseModel):
    institution: str = Field(..., description="College or university name")
    degree: Optional[str] = Field(None, description="Degree name (e.g., B.Tech, M.S., B.A.)")
    field_of_study: Optional[str] = Field(None, description="Major / Specialization (e.g., Computer Science)")
    graduation_year: Optional[int] = Field(None, description="Year of graduation")
    grade_or_gpa: Optional[str] = Field(None, description="GPA or percentage achieved (e.g., 8.9/10, 85%)")


class WorkExperienceEntry(BaseModel):
    company: str = Field(..., description="Organization or company name")
    title: str = Field(..., description="Job title / role")
    start_date: Optional[str] = Field(None, description="Start date (YYYY-MM or string)")
    end_date: Optional[str] = Field(None, description="End date or 'Present'")
    is_current: bool = Field(False, description="Whether candidate currently works here")
    description: Optional[str] = Field(None, description="Role summary")
    highlights: List[str] = Field(default_factory=list, description="Key achievements / bullet points")


class ProjectEntry(BaseModel):
    title: str = Field(..., description="Project name")
    description: Optional[str] = Field(None, description="Project overview")
    technologies: List[str] = Field(default_factory=list, description="Tech stack used")
    repo_url: Optional[str] = Field(None, description="GitHub or git repository URL")
    live_url: Optional[str] = Field(None, description="Live deployed website URL")


class CandidateSkills(BaseModel):
    technical: List[str] = Field(default_factory=list, description="Programming languages, frameworks, databases")
    non_technical: List[str] = Field(default_factory=list, description="Soft skills, management, collaboration")
    tools: List[str] = Field(default_factory=list, description="Developer tools, CI/CD, IDEs, platforms")


class ParsedResume(BaseModel):
    candidate_id: str = Field(default_factory=lambda: f"cand_{uuid.uuid4().hex[:10]}", description="Unique candidate ID")
    contact_info: CandidateContact
    summary: Optional[str] = Field(None, description="Professional summary or objective")
    education: List[EducationEntry] = Field(default_factory=list)
    work_experience: List[WorkExperienceEntry] = Field(default_factory=list)
    projects: List[ProjectEntry] = Field(default_factory=list)
    skills: CandidateSkills = Field(default_factory=CandidateSkills)
    certifications: List[str] = Field(default_factory=list)
    raw_text: str = Field(..., description="Normalized plain text extracted from resume")
    file_metadata: Dict[str, Any] = Field(default_factory=dict, description="Metadata: format, size, word_count, pages")


class ResumeUploadResponse(BaseModel):
    status: str = "SUCCESS"
    candidate_id: str
    parsed_resume: ParsedResume
    message: str = "Resume successfully parsed into structured format"


# -------------------------------------------------------------
# Enterprise Sandbox Bulk Ingestion Schemas
# -------------------------------------------------------------

class BulkCandidateItem(BaseModel):
    model_config = {"extra": "allow"}
    candidate_id: Optional[str] = None
    name: Optional[str] = None
    email: Optional[str] = None
    college: Optional[str] = "Affiliated Engineering Institute"
    college_tier: Optional[str] = "Tier-3"
    repo_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    resume_text: Optional[str] = None
    resume_base64: Optional[str] = None
    resume_filename: Optional[str] = None
    raw_skills: List[str] = Field(default_factory=list)


class SandboxBulkIngestRequest(BaseModel):
    sandbox_api_key: Optional[str] = Field(None, description="Sandbox authentication key (or pass via header)")
    company_id: Optional[str] = Field("integraminds_partner", description="Identifier of enterprise company")
    job_id: Optional[str] = Field(None, description="Target job description ID to link candidates")
    candidates: List[BulkCandidateItem] = Field(..., description="Batch of candidate records to ingest")


class IngestionResultItem(BaseModel):
    candidate_id: str
    name: str
    status: str  # "SUCCESS" | "FAILED" | "PARTIAL"
    parsed_profile: Optional[ParsedResume] = None
    error_message: Optional[str] = None


class SandboxBulkIngestResponse(BaseModel):
    batch_id: str = Field(default_factory=lambda: f"batch_{uuid.uuid4().hex[:12]}")
    company_id: str
    job_id: Optional[str] = None
    total_received: int
    successful_count: int
    failed_count: int
    results: List[IngestionResultItem]
    status: str = "COMPLETED"
    created_at: Optional[str] = None
