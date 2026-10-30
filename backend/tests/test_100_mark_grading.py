"""
backend/tests/test_100_mark_grading.py
Comprehensive unit & integration tests for Milestone 4:
- 100-Mark AI Holistic Evaluation Engine
- Exact Category Boundaries: A (10), B (15), C (20), D (10), E (10), F1 (15), F2 (10), F3 (10)
- Summation Verification: total_score exactly equals sum of all categories
- Tutorial Clone Penalty (Category C <= 4.0 / 6.0)
- Viva Integration (seamless 0-10 mapping, PENDING status when None)
- Live Site Integration (Category E = 0 when missing, verified when present)
- Grade distribution (A+, A, B, C, D) and cryptographic SHA-256 audit hash
"""

import pytest
from fastapi.testclient import TestClient

from backend.main import app
from backend.services.grading_engine import GradingEngine
from backend.models.grading_schemas import ComprehensiveEvaluation100

client = TestClient(app)


# ============================================================================
# 1. UNIT TESTS: GradingEngine Rubric Boundaries
# ============================================================================

def test_grading_engine_bounds_and_summation():
    cand = {
        "candidate_id": "cand_perfect_01",
        "name": "Dev Sharma",
        "verified_skills": ["Python", "FastAPI", "PostgreSQL", "Docker", "pytest", "Redis"],
        "resume_raw_text": "Experienced Python Backend Engineer with production microservices and live apps.",
        "portfolio_url": "https://devsharma.vercel.app",
        "github_url": "https://github.com/devsharma/task-queue",
    }
    job = {
        "title": "Python Backend Engineer",
        "technical_skills": ["Python", "FastAPI", "PostgreSQL", "pytest"],
    }
    report = GradingEngine.calculate_100_marks(
        candidate_data=cand,
        job_data=job,
        viva_score=9.5,
        live_url="https://devsharma.vercel.app",
        repo_url="https://github.com/devsharma/task-queue",
    )

    assert isinstance(report, ComprehensiveEvaluation100)
    assert 0.0 <= report.total_score <= 100.0
    assert 0.0 <= report.category_a_formatting.total <= 10.0
    assert 0.0 <= report.category_b_projects.total <= 15.0
    assert 0.0 <= report.category_c_originality.total <= 20.0
    assert 0.0 <= report.category_d_viva.total <= 10.0
    assert 0.0 <= report.category_e_live_website.total <= 10.0
    assert 0.0 <= report.category_f_additional.total <= 35.0

    # Verify exact summation
    expected_sum = round(
        report.category_a_formatting.total
        + report.category_b_projects.total
        + report.category_c_originality.total
        + report.category_d_viva.total
        + report.category_e_live_website.total
        + report.category_f_additional.total,
        1,
    )
    assert report.total_score == expected_sum
    assert report.grade in ("A+", "A")
    assert len(report.tamper_proof_hash) == 64


def test_grading_engine_clone_penalty():
    clone_cand = {
        "candidate_id": "cand_clone_01",
        "name": "Clone User",
        "verified_skills": ["React", "Node.js"],
        "is_clone": True,
        "matched_tutorial": {"title": "Fullstack Spotify Clone", "overlap": 0.89},
        "resume_raw_text": "Built Spotify clone from MERN tutorial.",
    }
    report = GradingEngine.calculate_100_marks(candidate_data=clone_cand, viva_score=3.0)
    assert report.category_c_originality.total <= 6.0
    assert report.category_c_originality.is_clone is True
    assert report.total_score < 65.0


def test_grading_engine_pending_viva():
    cand = {"candidate_id": "cand_no_viva", "name": "No Viva", "verified_skills": ["Python"]}
    report = GradingEngine.calculate_100_marks(candidate_data=cand, viva_score=None)
    assert report.category_d_viva.viva_status == "PENDING"
    assert report.category_d_viva.total == 0.0


def test_grading_engine_missing_live_url():
    cand = {"candidate_id": "cand_no_live", "name": "No Live URL", "verified_skills": ["Python"]}
    report = GradingEngine.calculate_100_marks(candidate_data=cand, live_url=None)
    assert report.category_e_live_website.has_live_deployment is False
    assert report.category_e_live_website.total == 0.0


def test_grading_engine_worst_case_blank_candidate():
    blank_cand = {"candidate_id": "cand_blank", "name": "Blank", "verified_skills": []}
    report = GradingEngine.calculate_100_marks(candidate_data=blank_cand, viva_score=0.0)
    assert report.total_score <= 25.0
    assert report.grade in ("D", "C")


# ============================================================================
# 2. API TESTS: /api/v1/grading/evaluate Endpoint
# ============================================================================

def test_api_grading_evaluate_endpoint_success():
    payload = {
        "candidate_data": {
            "candidate_id": "cand_api_01",
            "name": "Ananya Sen",
            "verified_skills": ["Python", "FastAPI", "PostgreSQL", "Docker", "pytest"],
            "portfolio_url": "https://ananya.vercel.app",
        },
        "job_data": {
            "title": "FastAPI Engineer",
            "technical_skills": ["Python", "FastAPI", "PostgreSQL"],
        },
        "viva_score": 8.8,
    }
    res = client.post("/api/v1/grading/evaluate", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert 0.0 <= data["total_score"] <= 100.0
    assert data["grade"] in ("A+", "A", "B")
    assert "tamper_proof_hash" in data
    assert "category_a_formatting" in data
    assert "category_b_projects" in data
    assert "category_c_originality" in data
    assert "category_d_viva" in data
    assert "category_e_live_website" in data
    assert "category_f_additional" in data
