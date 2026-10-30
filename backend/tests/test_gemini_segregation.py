"""
backend/tests/test_gemini_segregation.py
Comprehensive unit & integration tests for Milestone 2:
- Gemini API key authentication (Header, Body, Env, 401 Missing, 401 Invalid, 401 Whitespace)
- Candidate Stream Segregation (Technical vs Non-Technical, confidence, domains, reasoning)
- Enterprise Job Requirements CRUD (Create, List with 30 preloaded, Get by ID, 404, 422)
- Multi-dimensional Resume-to-Job Comparison (Alignment %, fit verdict, matched/missing skills)
- Batch segregation and batch comparison endpoints
"""

import os
import pytest
from fastapi.testclient import TestClient

from backend.main import app
from backend.services.gemini_agent import GeminiAgentService
from backend.models.gemini_schemas import JobRequirementInput

client = TestClient(app)

VALID_KEY = "mock_gemini_test_api_key_valid"
INVALID_KEY = "invalid_fake_key_123"


# ============================================================================
# 1. UNIT TESTS: GeminiAgentService Key Resolution
# ============================================================================

def test_resolve_key_from_header():
    key = GeminiAgentService.resolve_api_key(header_key="header_test_key_123")
    assert key == "header_test_key_123"


def test_resolve_key_from_body():
    key = GeminiAgentService.resolve_api_key(request_key="body_test_key_456")
    assert key == "body_test_key_456"


def test_resolve_key_from_env(monkeypatch):
    monkeypatch.setenv("GEMINI_API_KEY", "env_test_key_789")
    key = GeminiAgentService.resolve_api_key()
    assert key == "env_test_key_789"


def test_resolve_key_missing_raises_401(monkeypatch):
    monkeypatch.delenv("GEMINI_API_KEY", raising=False)
    with pytest.raises(Exception) as exc_info:
        GeminiAgentService.resolve_api_key()
    assert exc_info.value.status_code == 401


def test_resolve_key_empty_string_raises_401(monkeypatch):
    monkeypatch.delenv("GEMINI_API_KEY", raising=False)
    with pytest.raises(Exception) as exc_info:
        GeminiAgentService.resolve_api_key(header_key="")
    assert exc_info.value.status_code == 401


def test_resolve_key_whitespace_raises_401(monkeypatch):
    monkeypatch.delenv("GEMINI_API_KEY", raising=False)
    with pytest.raises(Exception) as exc_info:
        GeminiAgentService.resolve_api_key(header_key="   ")
    assert exc_info.value.status_code == 401


def test_resolve_key_invalid_fake_raises_401():
    with pytest.raises(Exception) as exc_info:
        GeminiAgentService.resolve_api_key(header_key=INVALID_KEY)
    assert exc_info.value.status_code == 401


# ============================================================================
# 2. UNIT TESTS: Candidate Stream Segregation
# ============================================================================

def test_segregate_technical_backend():
    candidate = {
        "candidate_id": "cand_01",
        "name": "Aarav Sharma",
        "verified_skills": ["Python", "FastAPI", "PostgreSQL", "Docker", "Redis"],
        "project_type": "Python Backend / FastAPI",
    }
    result = GeminiAgentService.segregate_candidate(candidate, api_key=VALID_KEY)
    assert result.stream == "TECHNICAL"
    assert result.confidence_score >= 0.70
    assert "Backend" in result.primary_domain
    assert len(result.technical_capabilities) > 0


def test_segregate_technical_frontend():
    candidate = {
        "name": "Neha Gupta",
        "verified_skills": ["React", "TypeScript", "TailwindCSS", "Next.js"],
        "project_type": "React / TypeScript UI",
    }
    result = GeminiAgentService.segregate_candidate(candidate, api_key=VALID_KEY)
    assert result.stream == "TECHNICAL"
    assert "Frontend" in result.primary_domain


def test_segregate_non_technical_pm():
    candidate = {
        "name": "Pooja Verma",
        "verified_skills": ["Product Management", "PRD Authoring", "Agile Leadership", "User Research"],
        "resume_raw_text": "Associate Product Manager with experience leading sprints and user interviews.",
    }
    result = GeminiAgentService.segregate_candidate(candidate, api_key=VALID_KEY)
    assert result.stream == "NON_TECHNICAL"
    assert result.primary_domain == "Product Management"


def test_segregate_non_technical_hr():
    candidate = {
        "name": "Vikram Singh",
        "verified_skills": ["Talent Acquisition", "Technical Sourcing", "HR Operations", "Behavioral Interviewing"],
    }
    result = GeminiAgentService.segregate_candidate(candidate, api_key=VALID_KEY)
    assert result.stream == "NON_TECHNICAL"


def test_segregate_german_technical_resume():
    candidate = {
        "name": "Lukas Weber",
        "resume_raw_text": "Softwareentwickler für verteilte Systeme mit Python und Docker.",
    }
    result = GeminiAgentService.segregate_candidate(candidate, api_key=VALID_KEY)
    assert result.stream == "TECHNICAL"


def test_segregate_blank_candidate():
    candidate = {"name": "Blank Candidate"}
    result = GeminiAgentService.segregate_candidate(candidate, api_key=VALID_KEY)
    assert result.stream == "TECHNICAL"
    assert result.confidence_score == 0.50


# ============================================================================
# 3. UNIT TESTS: Job Requirement Comparison
# ============================================================================

def test_compare_perfect_match():
    cand = {
        "name": "Dev Sharma",
        "verified_skills": ["Python", "FastAPI", "PostgreSQL", "Docker", "pytest"],
        "resume_raw_text": "Built scalable FastAPI microservices with PostgreSQL and pytest.",
    }
    job = {
        "title": "Python Backend Engineer",
        "technical_skills": ["Python", "FastAPI", "PostgreSQL", "pytest"],
        "preferred_skills": ["Docker"],
    }
    result = GeminiAgentService.compare_resume_to_job(cand, job, api_key=VALID_KEY)
    assert result.alignment_percentage >= 80.0
    assert result.fit_verdict == "STRONG_MATCH"
    assert "Python" in result.matched_skills
    assert len(result.missing_skills) == 0


def test_compare_zero_overlap():
    cand = {
        "name": "Chef Gordon",
        "verified_skills": ["French Cuisine", "Baking", "Food Safety"],
    }
    job = {
        "title": "Python Backend Engineer",
        "technical_skills": ["Python", "FastAPI", "PostgreSQL"],
    }
    result = GeminiAgentService.compare_resume_to_job(cand, job, api_key=VALID_KEY)
    assert result.alignment_percentage <= 20.0
    assert result.fit_verdict == "MISALIGNED"
    assert len(result.missing_skills) == 3


def test_compare_empty_candidate():
    cand = {"name": "Empty"}
    job = {"title": "DevOps", "technical_skills": ["Kubernetes", "Terraform"]}
    result = GeminiAgentService.compare_resume_to_job(cand, job, api_key=VALID_KEY)
    assert result.alignment_percentage == 0.0
    assert result.fit_verdict == "MISALIGNED"


def test_compare_case_insensitive():
    cand = {"verified_skills": ["PYTHON", "FASTAPI", "POSTGRESQL"]}
    job = {"technical_skills": ["python", "fastapi", "postgresql"]}
    result = GeminiAgentService.compare_resume_to_job(cand, job, api_key=VALID_KEY)
    assert result.alignment_percentage >= 70.0


# ============================================================================
# 4. API TESTS: Endpoints for Gemini AI & Jobs
# ============================================================================

def test_api_gemini_segregate_success():
    headers = {"x-gemini-api-key": VALID_KEY}
    payload = {
        "candidate_data": {
            "name": "Test Backend Dev",
            "verified_skills": ["Go", "Kubernetes", "gRPC", "Docker"],
        }
    }
    res = client.post("/api/v1/gemini/segregate", json=payload, headers=headers)
    assert res.status_code == 200
    data = res.json()
    assert data["stream"] == "TECHNICAL"


def test_api_gemini_segregate_missing_key(monkeypatch):
    monkeypatch.delenv("GEMINI_API_KEY", raising=False)
    payload = {"candidate_data": {"name": "Test Dev"}}
    res = client.post("/api/v1/gemini/segregate", json=payload)
    assert res.status_code == 401


def test_api_gemini_compare_success():
    headers = {"x-gemini-api-key": VALID_KEY}
    payload = {
        "candidate_data": {
            "name": "Match Candidate",
            "verified_skills": ["Python", "FastAPI"],
        },
        "job_data": {
            "title": "FastAPI Developer",
            "technical_skills": ["Python", "FastAPI"],
        },
    }
    res = client.post("/api/v1/gemini/compare", json=payload, headers=headers)
    assert res.status_code == 200
    data = res.json()
    assert data["alignment_percentage"] >= 60.0


def test_api_jobs_crud():
    # 1. Create Job
    job_payload = {
        "job_id": "jd_unit_test_01",
        "title": "Cloud Infrastructure Engineer",
        "department": "Infrastructure",
        "domain": "DevOps",
        "technical_skills": ["Terraform", "AWS", "Docker", "Kubernetes"],
        "responsibilities": ["Manage AWS VPCs and EKS clusters"],
    }
    create_res = client.post("/api/v1/jobs", json=job_payload)
    assert create_res.status_code in (200, 201)
    created = create_res.json()
    assert created["job_id"] == "jd_unit_test_01"
    assert created["title"] == "Cloud Infrastructure Engineer"

    # 2. Get Job by ID
    get_res = client.get("/api/v1/jobs/jd_unit_test_01")
    assert get_res.status_code == 200
    assert get_res.json()["domain"] == "DevOps"

    # 3. List Jobs (includes created + preloaded 30)
    list_res = client.get("/api/v1/jobs")
    assert list_res.status_code == 200
    all_jobs = list_res.json()
    assert len(all_jobs) >= 30

    # 4. 404 on nonexistent job ID
    missing_res = client.get("/api/v1/jobs/jd_nonexistent_99999")
    assert missing_res.status_code == 404

    # 5. 422 on job missing title and skills
    invalid_res = client.post("/api/v1/jobs", json={"department": "Security"})
    assert invalid_res.status_code == 422


def test_api_gemini_segregate_batch():
    headers = {"x-gemini-api-key": VALID_KEY}
    payload = {
        "candidates": [
            {"candidate_id": "c1", "name": "Dev", "verified_skills": ["Python", "FastAPI"]},
            {"candidate_id": "c2", "name": "PM", "verified_skills": ["Product Management", "PRD"]},
        ]
    }
    res = client.post("/api/v1/gemini/segregate-batch", json=payload, headers=headers)
    assert res.status_code == 200
    data = res.json()
    assert data["total_analyzed"] == 2
    assert data["technical_count"] == 1
    assert data["non_technical_count"] == 1


def test_api_gemini_compare_batch():
    headers = {"x-gemini-api-key": VALID_KEY}
    payload = {
        "job": {
            "job_id": "jd_batch_target",
            "title": "Python Developer",
            "technical_skills": ["Python", "FastAPI"],
        },
        "candidates": [
            {"candidate_id": "c1", "name": "Dev", "verified_skills": ["Python", "FastAPI"]},
            {"candidate_id": "c2", "name": "Chef", "verified_skills": ["Pastry", "Culinary"]},
        ],
        "minimum_alignment_threshold": 50.0,
    }
    res = client.post("/api/v1/gemini/compare-batch", json=payload, headers=headers)
    assert res.status_code == 200
    data = res.json()
    assert data["total_evaluated"] == 2
    assert data["shortlisted_count"] == 1
    assert data["ranked_candidates"][0]["candidate_id"] == "c1"
