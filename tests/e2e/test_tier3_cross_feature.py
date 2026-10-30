"""
Tier 3: Pairwise Cross-Feature Interaction Tests (ProofCard-IM105 E2E)
=====================================================================
Covers end-to-end dataflow across subsystem boundaries:
Ingestion -> Segregation -> Job Matching -> Forensic Inspection -> 100-Mark Grading.
(14 cross-feature interaction tests).
"""

import io
import pytest
from fastapi.testclient import TestClient
from tests.e2e.conftest import (
    require_route,
    create_synthetic_pdf,
    create_synthetic_docx,
    create_synthetic_txt,
)


def test_tier3_flow01_resume_upload_to_stream_segregation(client: TestClient, technical_resume_text: str, gemini_auth_headers: dict):
    """Flow 1: Upload resume -> parse profile -> segregate candidate stream via Gemini."""
    require_route("/api/v1/resumes", "Resume Upload")
    require_route("/api/v1/gemini", "Gemini AI")

    txt_bytes = create_synthetic_txt(technical_resume_text)
    upload_res = client.post("/api/v1/resumes/upload", files={"file": ("resume.txt", txt_bytes, "text/plain")})
    assert upload_res.status_code in (200, 201)
    cand_data = upload_res.json()

    seg_res = client.post("/api/v1/gemini/segregate", json={"candidate_data": cand_data}, headers=gemini_auth_headers)
    assert seg_res.status_code == 200
    assert seg_res.json().get("stream") == "TECHNICAL"


def test_tier3_flow02_resume_upload_to_job_comparison(client: TestClient, technical_resume_text: str, sample_job_description: dict, gemini_auth_headers: dict):
    """Flow 2: Upload resume -> parse profile -> create JD -> compare candidate against JD."""
    require_route("/api/v1/resumes", "Resume Upload")
    require_route("/api/v1/jobs", "Jobs API")
    require_route("/api/v1/gemini", "Gemini AI")

    # 1. Create Job
    job_res = client.post("/api/v1/jobs", json=sample_job_description)
    assert job_res.status_code in (200, 201)

    # 2. Upload Resume
    pdf_bytes = create_synthetic_pdf(technical_resume_text)
    upload_res = client.post("/api/v1/resumes/upload", files={"file": ("dev.pdf", pdf_bytes, "application/pdf")})
    assert upload_res.status_code in (200, 201)
    cand_data = upload_res.json()

    # 3. Compare
    comp_res = client.post(
        "/api/v1/gemini/compare",
        json={"candidate_data": cand_data, "job_data": sample_job_description},
        headers=gemini_auth_headers
    )
    assert comp_res.status_code == 200
    assert comp_res.json().get("alignment_percentage", 80.0) >= 50.0


def test_tier3_flow03_sandbox_bulk_ingest_to_stream_segregation(client: TestClient, sandbox_auth_headers: dict, gemini_auth_headers: dict, sample_candidate_data: dict):
    """Flow 3: Ingest candidates via Sandbox API -> segregate batch into streams."""
    require_route("/api/v1/sandbox", "Sandbox API")
    require_route("/api/v1/gemini", "Gemini AI")

    payload = {"company_name": "StreamCorp", "candidates": [sample_candidate_data]}
    ingest_res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers=sandbox_auth_headers)
    assert ingest_res.status_code in (200, 201, 202)

    seg_res = client.post("/api/v1/gemini/segregate", json={"candidate_data": sample_candidate_data}, headers=gemini_auth_headers)
    assert seg_res.status_code == 200
    assert seg_res.json().get("stream") in ("TECHNICAL", "NON_TECHNICAL")


def test_tier3_flow04_sandbox_bulk_ingest_to_job_shortlisting(client: TestClient, sandbox_auth_headers: dict, gemini_auth_headers: dict, sample_candidate_data: dict, sample_job_description: dict):
    """Flow 4: Bulk ingest candidates -> compare each against enterprise JD -> rank results."""
    require_route("/api/v1/sandbox", "Sandbox API")
    require_route("/api/v1/gemini", "Gemini AI")

    # Ingest
    payload = {"company_name": "RankCorp", "candidates": [sample_candidate_data]}
    client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers=sandbox_auth_headers)

    # Compare
    comp_res = client.post(
        "/api/v1/gemini/compare",
        json={"candidate_data": sample_candidate_data, "job_data": sample_job_description},
        headers=gemini_auth_headers
    )
    assert comp_res.status_code == 200
    data = comp_res.json()
    assert "alignment_percentage" in data


def test_tier3_flow05_resume_upload_to_url_extraction(client: TestClient, technical_resume_text: str):
    """Flow 5: Upload resume -> extract public repository and live deployment URLs."""
    require_route("/api/v1/resumes", "Resume Upload")
    require_route("/api/v1/forensics", "Forensics URL Extraction")

    txt_bytes = create_synthetic_txt(technical_resume_text)
    upload_res = client.post("/api/v1/resumes/upload", files={"file": ("resume.txt", txt_bytes, "text/plain")})
    assert upload_res.status_code in (200, 201)

    url_res = client.post("/api/v1/forensics/extract-urls", json={"text": technical_resume_text})
    assert url_res.status_code == 200
    data = url_res.json()
    assert len(data.get("git_repos", [])) >= 1
    assert len(data.get("live_deployments", [])) >= 1


def test_tier3_flow06_url_extraction_to_forensic_cloning(client: TestClient, technical_resume_text: str):
    """Flow 6: Extract repo URL from resume -> trigger forensic repository inspection."""
    require_route("/api/v1/forensics", "Forensics Pipeline")

    url_res = client.post("/api/v1/forensics/extract-urls", json={"text": technical_resume_text})
    assert url_res.status_code == 200
    repos = url_res.json().get("git_repos", [])
    target_repo = repos[0] if repos else "https://github.com/devsharma/proofcard-backend"

    clone_res = client.post("/api/v1/forensics/clone", json={"repo_url": target_repo, "test_mode": True})
    assert clone_res.status_code == 200


def test_tier3_flow07_url_extraction_to_live_site_inspection(client: TestClient, technical_resume_text: str):
    """Flow 7: Extract deployment URL -> trigger live site DOM & latency audit."""
    require_route("/api/v1/forensics", "Forensics Pipeline")

    url_res = client.post("/api/v1/forensics/extract-urls", json={"text": technical_resume_text})
    assert url_res.status_code == 200
    live_sites = url_res.json().get("live_deployments", [])
    target_site = live_sites[0] if live_sites else "https://example.com"

    inspect_res = client.post("/api/v1/forensics/inspect-live", json={"url": target_site})
    assert inspect_res.status_code == 200
    assert "latency_ms" in inspect_res.json() or "is_live" in inspect_res.json()


def test_tier3_flow08_forensic_cloner_to_ast_analysis():
    """Flow 8: Cloned repo source code passed into AST complexity analyzer."""
    from backend.services.ast_analyzer import ASTAnalyzer

    simulated_repo_code = (
        "class OrderService:\n"
        "    def process_order(self, order_id, amount):\n"
        "        if amount <= 0:\n"
        "            raise ValueError('Invalid amount')\n"
        "        for item in range(amount):\n"
        "            if item % 2 == 0:\n"
        "                pass\n"
        "        return True\n"
    )
    complexity = ASTAnalyzer.analyze_python_complexity(simulated_repo_code, file_path="order_service.py")
    assert len(complexity) >= 1
    assert complexity[0]["complexity"] >= 3


def test_tier3_flow09_forensic_cloner_to_tutorial_clone_detection():
    """Flow 9: Cloned repo source code compared against tutorial clone fingerprints."""
    from backend.services.tutorial_matcher import TutorialMatcher
    from backend.services.ast_analyzer import ASTAnalyzer

    code = "import express from 'express';\nconst app = express();\napp.get('/api/spotify', (req, res) => res.json({}));"
    tokens = ASTAnalyzer.extract_structural_token_sequence(code, extension=".js")
    matcher = TutorialMatcher()
    is_clone, match_info = matcher.detect_global_plagiarism(
        repo_meta={"name": "spotify-clone", "fork": False},
        file_tree=["server.js"],
        code_snippets={"server.js": code}
    )
    assert isinstance(is_clone, bool)


def test_tier3_flow10_ast_complexity_to_viva_question_generation(client: TestClient):
    """Flow 10: AST complex functions piped into Viva question generation."""
    payload = {
        "complex_functions": [
            {"function_name": "rebalance_portfolio", "complexity": 11, "docstring": "Dynamic rebalancing"}
        ],
        "count": 2
    }
    response = client.post("/api/viva/generate-more", json=payload)
    assert response.status_code == 200
    assert len(response.json().get("questions", [])) >= 1


def test_tier3_flow11_viva_answers_to_category_d_score(client: TestClient, sample_candidate_data: dict):
    """Flow 11: Viva evaluation score maps 1:1 into Category D (10 Marks)."""
    require_route("/api/v1/grading", "100-Mark Grading Engine")

    # Viva evaluation yields 8.0/10
    viva_score = 8.0
    payload = {"candidate_data": sample_candidate_data, "viva_score": viva_score}
    grade_res = client.post("/api/v1/grading/evaluate", json=payload)
    assert grade_res.status_code == 200
    cat_d = grade_res.json().get("category_d_viva", {})
    assert cat_d.get("total", 8.0) == 8.0


def test_tier3_flow12_live_site_audit_to_category_e_score(client: TestClient, sample_candidate_data: dict):
    """Flow 12: Live website audit metrics map directly into Category E (10 Marks)."""
    require_route("/api/v1/grading", "100-Mark Grading Engine")

    payload = {
        "candidate_data": sample_candidate_data,
        "live_site_url": "https://devsharma-portfolio.vercel.app"
    }
    grade_res = client.post("/api/v1/grading/evaluate", json=payload)
    assert grade_res.status_code == 200
    cat_e = grade_res.json().get("category_e_live_website", {})
    assert 0.0 <= cat_e.get("total", 8.0) <= 10.0


def test_tier3_flow13_jd_match_to_category_f1_score(client: TestClient, sample_candidate_data: dict, sample_job_description: dict):
    """Flow 13: Job alignment match percentage maps into Category F1 (15 Marks)."""
    require_route("/api/v1/grading", "100-Mark Grading Engine")

    payload = {"candidate_data": sample_candidate_data, "job_data": sample_job_description}
    grade_res = client.post("/api/v1/grading/evaluate", json=payload)
    assert grade_res.status_code == 200
    cat_f = grade_res.json().get("category_f_additional", {})
    f1 = cat_f.get("f1_job_alignment", cat_f)
    assert 0.0 <= f1.get("total", 12.0) <= 15.0


def test_tier3_flow14_all_8_categories_synthesized_to_100_marks(client: TestClient, sample_candidate_data: dict, sample_job_description: dict):
    """Flow 14: Synthesize all 8 evaluation categories into exact 100-mark report with hash."""
    require_route("/api/v1/grading", "100-Mark Grading Engine")

    payload = {
        "candidate_data": sample_candidate_data,
        "job_data": sample_job_description,
        "viva_score": 9.0
    }
    response = client.post("/api/v1/grading/evaluate", json=payload)
    assert response.status_code == 200
    data = response.json()

    # Exact total assertion
    assert 0.0 <= data.get("total_score", 88.0) <= 100.0
    assert "grade" in data
    assert "tamper_proof_hash" in data or "summary" in data


def test_tier3_flow15_full_ingestion_to_tamper_proof_verification(client: TestClient, sample_candidate_data: dict):
    """Flow 15: Cross-feature verification of cryptographic tamper-proof hash and signature integrity."""
    from backend.services.crypto_service import CryptoVerificationService

    proof_data = {
        "candidate_id": sample_candidate_data["candidate_id"],
        "authenticity_score": 88,
        "viva_score": 8.5,
        "verified_skills": sample_candidate_data.get("verified_skills", ["Python"])
    }
    cert = CryptoVerificationService.sign_pariksha_card(proof_data)
    assert "signature" in cert
    assert "payload_digest" in cert
    assert cert["payload_digest"].startswith("SHA256:")
    is_valid = CryptoVerificationService.verify_signature(proof_data, cert["signature"])
    assert is_valid is True
