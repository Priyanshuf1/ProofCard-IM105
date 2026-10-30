"""
backend/tests/test_sandbox_bulk.py
===================================
Milestone 1 Test Suite: Enterprise Sandbox Bulk Ingestion
Covers:
- Sandbox API key authentication (Header, Body, Prefix 'sbx_', Missing 401, Invalid 403)
- Single candidate ingestion batch
- Large candidate batch (50 items)
- Partial error isolation (1 valid + 1 corrupted item)
- Batch size limit enforcement (> 500 candidates -> 413)
- Batch status polling (GET /api/v1/sandbox/batch/{batch_id})
- Multi-file multipart batch upload (/api/v1/sandbox/resumes/batch)
- Multi-file error isolation
"""

import base64
import pytest
from fastapi.testclient import TestClient

from backend.main import app
from backend.services.sandbox_service import SandboxIngestionService
from backend.models.resume_schemas import SandboxBulkIngestRequest, BulkCandidateItem
from backend.tests.test_resume_ingestion import (
    generate_valid_pdf_bytes,
    generate_valid_docx_bytes,
    generate_text_resume
)

client = TestClient(app)

VALID_KEY = "sandbox_key_deviathon_2026"
VALID_SBX_KEY = "sbx_live_partner_enterprise_99"
INVALID_KEY = "invalid_expired_sandbox_key_000"


# ============================================================================
# UNIT TESTS: SandboxIngestionService Authentication
# ============================================================================

def test_verify_api_key_valid():
    assert SandboxIngestionService.verify_api_key(VALID_KEY) is True
    assert SandboxIngestionService.verify_api_key(VALID_SBX_KEY) is True


def test_verify_api_key_invalid():
    assert SandboxIngestionService.verify_api_key(INVALID_KEY) is False
    assert SandboxIngestionService.verify_api_key("") is False
    assert SandboxIngestionService.verify_api_key("   ") is False
    assert SandboxIngestionService.verify_api_key(None) is False


# ============================================================================
# API TESTS: Sandbox API Key Authentication Enforcement
# ============================================================================

def test_sandbox_auth_missing_key():
    payload = {
        "company_id": "test_corp",
        "candidates": [
            {"name": "Priyanshu Awasthi", "email": "priyanshu@example.com"}
        ]
    }
    res = client.post("/api/v1/sandbox/bulk-ingest", json=payload)
    assert res.status_code == 401
    assert "missing sandbox api key" in res.json()["detail"].lower()


def test_sandbox_auth_whitespace_key():
    headers = {"X-Sandbox-API-Key": "   "}
    payload = {
        "company_id": "test_corp",
        "candidates": [
            {"name": "Priyanshu Awasthi", "email": "priyanshu@example.com"}
        ]
    }
    res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers=headers)
    assert res.status_code == 401
    assert "missing sandbox api key" in res.json()["detail"].lower()


def test_sandbox_auth_invalid_key():
    headers = {"X-Sandbox-API-Key": INVALID_KEY}
    payload = {
        "company_id": "test_corp",
        "candidates": [
            {"name": "Priyanshu Awasthi", "email": "priyanshu@example.com"}
        ]
    }
    res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers=headers)
    assert res.status_code == 403
    assert "invalid or expired" in res.json()["detail"].lower()


def test_sandbox_auth_valid_header():
    headers = {"X-Sandbox-API-Key": VALID_KEY}
    payload = {
        "company_id": "test_corp",
        "candidates": [
            {
                "candidate_id": "c1",
                "name": "Priyanshu Awasthi",
                "email": "priyanshu@example.com",
                "resume_text": generate_text_resume("Priyanshu Awasthi", "priyanshu@example.com")
            }
        ]
    }
    res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers=headers)
    assert res.status_code == 200, res.text
    data = res.json()
    assert data["status"] == "COMPLETED"
    assert data["successful_count"] == 1


def test_sandbox_auth_valid_body_key():
    payload = {
        "sandbox_api_key": VALID_KEY,
        "company_id": "test_corp",
        "candidates": [
            {
                "candidate_id": "c1",
                "name": "Aditi Sharma",
                "email": "aditi@example.com",
                "resume_text": generate_text_resume("Aditi Sharma", "aditi@example.com")
            }
        ]
    }
    res = client.post("/api/v1/sandbox/bulk-ingest", json=payload)
    assert res.status_code == 200, res.text
    assert res.json()["successful_count"] == 1


# ============================================================================
# API TESTS: Bulk Ingestion Scenarios & Error Isolation
# ============================================================================

def test_bulk_ingest_single_candidate():
    headers = {"X-Sandbox-API-Key": VALID_KEY}
    pdf_b64 = base64.b64encode(generate_valid_pdf_bytes("Rohan Verma", "rohan@example.com")).decode("utf-8")
    payload = {
        "company_id": "integra_demo",
        "candidates": [
            {
                "candidate_id": "cand_single_01",
                "name": "Rohan Verma",
                "email": "rohan@example.com",
                "resume_base64": pdf_b64,
                "resume_filename": "rohan_resume.pdf"
            }
        ]
    }
    res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers=headers)
    assert res.status_code == 200
    data = res.json()
    assert data["total_received"] == 1
    assert data["successful_count"] == 1
    assert data["failed_count"] == 0
    assert len(data["results"]) == 1
    assert data["results"][0]["status"] == "SUCCESS"
    assert data["results"][0]["candidate_id"] == "cand_single_01"


def test_bulk_ingest_50_candidates():
    headers = {"X-Sandbox-API-Key": VALID_KEY}
    candidates = []
    for i in range(50):
        name = f"Candidate {i:03d}"
        email = f"cand_{i:03d}@example.com"
        candidates.append({
            "candidate_id": f"batch_cand_{i:03d}",
            "name": name,
            "email": email,
            "college": "Tier-2 Engineering College",
            "resume_text": generate_text_resume(name, email, ["Python", "FastAPI", "SQL"])
        })
    payload = {
        "company_id": "integra_enterprise",
        "job_id": "jd_01",
        "candidates": candidates
    }
    res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers=headers)
    assert res.status_code == 200
    data = res.json()
    assert data["total_received"] == 50
    assert data["successful_count"] == 50
    assert data["failed_count"] == 0
    assert len(data["results"]) == 50


def test_bulk_ingest_error_isolation():
    """Verify that an invalid candidate record does not fail the rest of the batch."""
    headers = {"X-Sandbox-API-Key": VALID_KEY}
    valid_pdf_b64 = base64.b64encode(generate_valid_pdf_bytes("Valid Candidate", "valid@example.com")).decode("utf-8")
    corrupt_b64 = base64.b64encode(b"NOT_A_VALID_PDF_CORRUPTED_BYTES").decode("utf-8")

    payload = {
        "company_id": "integra_demo",
        "candidates": [
            {
                "candidate_id": "cand_good",
                "name": "Valid Candidate",
                "email": "valid@example.com",
                "resume_base64": valid_pdf_b64,
                "resume_filename": "valid.pdf"
            },
            {
                "candidate_id": "cand_bad",
                "name": "Corrupted Candidate",
                "email": "corrupt@example.com",
                "resume_base64": corrupt_b64,
                "resume_filename": "bad.pdf"
            }
        ]
    }
    res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers=headers)
    assert res.status_code == 200, "Partial failures must return 200 OK with isolated errors"
    data = res.json()
    assert data["total_received"] == 2
    assert data["successful_count"] == 1
    assert data["failed_count"] == 1

    good_res = next(r for r in data["results"] if r["candidate_id"] == "cand_good")
    bad_res = next(r for r in data["results"] if r["candidate_id"] == "cand_bad")

    assert good_res["status"] == "SUCCESS"
    assert good_res["parsed_profile"] is not None

    assert bad_res["status"] == "FAILED"
    assert bad_res["error_message"] is not None


def test_bulk_ingest_exceeds_max_batch_size():
    """Verify that batches exceeding 500 candidates are rejected with 413."""
    headers = {"X-Sandbox-API-Key": VALID_KEY}
    candidates = [{"name": f"Candidate {i}", "email": f"c{i}@example.com"} for i in range(501)]
    payload = {
        "company_id": "integra_huge",
        "candidates": candidates
    }
    res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers=headers)
    assert res.status_code == 413
    assert "maximum limit of 500" in res.json()["detail"].lower()


# ============================================================================
# API TESTS: Batch Status Polling
# ============================================================================

def test_batch_status_polling_success():
    headers = {"X-Sandbox-API-Key": VALID_KEY}
    payload = {
        "company_id": "status_check_corp",
        "candidates": [
            {"candidate_id": "poll_c1", "name": "Poll Candidate", "resume_text": generate_text_resume("Poll Candidate")}
        ]
    }
    ingest_res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers=headers)
    assert ingest_res.status_code == 200
    batch_id = ingest_res.json()["batch_id"]

    # Poll status
    status_res = client.get(f"/api/v1/sandbox/batch/{batch_id}", headers=headers)
    assert status_res.status_code == 200
    status_data = status_res.json()
    assert status_data["batch_id"] == batch_id
    assert status_data["status"] in ("COMPLETED", "PROCESSING")
    assert status_data["total_received"] == 1


def test_batch_status_polling_not_found():
    headers = {"X-Sandbox-API-Key": VALID_KEY}
    res = client.get("/api/v1/sandbox/batch/batch_nonexistent_xyz_999", headers=headers)
    assert res.status_code == 404
    assert "not found" in res.json()["detail"].lower()


def test_batch_status_polling_unauthorized():
    res = client.get("/api/v1/sandbox/batch/some_batch_id")
    assert res.status_code == 401


# ============================================================================
# API TESTS: Multi-File Batch Upload (POST /api/v1/sandbox/resumes/batch)
# ============================================================================

def test_multi_file_batch_upload():
    headers = {"X-Sandbox-API-Key": VALID_KEY}
    pdf_bytes = generate_valid_pdf_bytes("Batch PDF User", "pdf_user@example.com")
    docx_bytes = generate_valid_docx_bytes("Batch DOCX User", "docx_user@example.com")
    txt_bytes = generate_text_resume("Batch TXT User", "txt_user@example.com").encode("utf-8")

    files = [
        ("files", ("cand1.pdf", pdf_bytes, "application/pdf")),
        ("files", ("cand2.docx", docx_bytes, "application/vnd.openxmlformats-officedocument.wordprocessingml.document")),
        ("files", ("cand3.txt", txt_bytes, "text/plain"))
    ]
    data = {"company_id": "multipart_corp", "job_id": "jd_02"}
    res = client.post("/api/v1/sandbox/resumes/batch", headers=headers, files=files, data=data)
    assert res.status_code == 200, res.text
    resp = res.json()
    assert resp["total_received"] == 3
    assert resp["successful_count"] == 3
    assert resp["failed_count"] == 0


def test_multi_file_batch_upload_unauthorized():
    pdf_bytes = generate_valid_pdf_bytes("Batch User", "user@example.com")
    files = [("files", ("cand1.pdf", pdf_bytes, "application/pdf"))]
    res = client.post("/api/v1/sandbox/resumes/batch", files=files)
    assert res.status_code == 401


def test_multi_file_batch_upload_error_isolation():
    headers = {"X-Sandbox-API-Key": VALID_KEY}
    valid_pdf = generate_valid_pdf_bytes("Good User", "good@example.com")
    corrupt_bytes = b"CORRUPTED_NOT_PDF"

    files = [
        ("files", ("good.pdf", valid_pdf, "application/pdf")),
        ("files", ("bad.pdf", corrupt_bytes, "application/pdf"))
    ]
    res = client.post("/api/v1/sandbox/resumes/batch", headers=headers, files=files)
    assert res.status_code == 200
    resp = res.json()
    assert resp["total_received"] == 2
    assert resp["successful_count"] == 1
    assert resp["failed_count"] == 1
    assert resp["status"] == "PARTIAL"


def test_sandbox_status_valid_header():
    """GET /api/v1/sandbox/status authenticates via X-Sandbox-API-Key header."""
    headers = {"X-Sandbox-API-Key": VALID_KEY}
    res = client.get("/api/v1/sandbox/status", headers=headers)
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "ready"
    assert data["max_batch_size"] == 500
    assert ".pdf" in data["supported_formats"]
    assert ".docx" in data["supported_formats"]
    assert ".doc" in data["supported_formats"]
    assert data["company_id"] == "integraminds_partner"


def test_sandbox_status_query_param_and_custom_company():
    """GET /api/v1/sandbox/status authenticates via query param and respects company_id."""
    res = client.get(f"/api/v1/sandbox/status?sandbox_api_key={VALID_KEY}&company_id=acme_corp")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "ready"
    assert data["company_id"] == "acme_corp"


def test_sandbox_status_bearer_auth():
    """GET /api/v1/sandbox/status authenticates via Bearer authorization token."""
    headers = {"Authorization": f"Bearer {VALID_KEY}"}
    res = client.get("/api/v1/sandbox/status", headers=headers)
    assert res.status_code == 200
    assert res.json()["status"] == "ready"


def test_sandbox_status_missing_key_401():
    """GET /api/v1/sandbox/status without credentials returns 401 Unauthorized."""
    res = client.get("/api/v1/sandbox/status")
    assert res.status_code == 401
    assert "detail" in res.json()


def test_sandbox_status_invalid_key_403():
    """GET /api/v1/sandbox/status with invalid credentials returns 403 Forbidden."""
    headers = {"X-Sandbox-API-Key": "completely_invalid_key_9999"}
    res = client.get("/api/v1/sandbox/status", headers=headers)
    assert res.status_code == 403
    assert "detail" in res.json()

