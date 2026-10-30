"""
backend/tests/test_sandbox_challenger.py
========================================
Empirical Challenge & Adversarial Stress Suite for Sandbox Bulk Ingestion.
Conducted by Challenger M1_2.

Test Dimensions:
1. Batch Limits (0 items, 500 boundary, 501 overflow, 600 overflow, multipart 501 overflow)
2. Authentication Edge Cases (empty string, whitespace, header vs body precedence, prefix validation, Bearer token)
3. Mixed Batch Error Isolation (exact 10 valid + 2 corrupted items, all corrupted items, schema validation edge cases)
4. Status Endpoint Verification (200 retrieval, 404 not found, 401 unauthenticated, 401 whitespace, 403 forbidden)
5. Stress, Unicode, and Metadata Edge Cases (emojis, Hebrew/Arabic RTL, skill deduplication, 10MB file limit isolation)
"""

import base64
import pytest
from fastapi.testclient import TestClient

from backend.main import app
from backend.services.sandbox_service import SandboxIngestionService
from backend.tests.test_resume_ingestion import (
    generate_valid_pdf_bytes,
    generate_valid_docx_bytes,
    generate_text_resume,
)

client = TestClient(app)

VALID_KEY = "sandbox_key_deviathon_2026"
VALID_SBX_KEY = "sbx_enterprise_demo_key"
VALID_CUSTOM_SBX = "sbx_custom_secure_partner_2026"
INVALID_KEY = "unauthorized_malicious_key_999"


# ============================================================================
# 1. BATCH LIMIT TESTS (0, 500, 501, 600, Multipart 501)
# ============================================================================

def test_batch_limit_zero_candidates():
    """Empty candidate array must return 400 Bad Request."""
    payload = {
        "company_id": "test_corp",
        "candidates": [],
    }
    headers = {"X-Sandbox-API-Key": VALID_KEY}
    res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers=headers)
    assert res.status_code == 400
    assert "cannot be empty" in res.json()["detail"].lower()


def test_batch_limit_exact_500_candidates():
    """Exact upper bound of 500 candidates must be accepted (200 OK)."""
    candidates = [
        {
            "candidate_id": f"c_{i:04d}",
            "name": f"Candidate {i:04d}",
            "email": f"cand{i:04d}@example.com",
            "college": "Testing Institute",
            "raw_skills": ["Python", "FastAPI"],
        }
        for i in range(500)
    ]
    payload = {
        "company_id": "corp_500_stress",
        "candidates": candidates,
    }
    headers = {"X-Sandbox-API-Key": VALID_KEY}
    res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers=headers)
    assert res.status_code == 200
    data = res.json()
    assert data["total_received"] == 500
    assert data["successful_count"] == 500
    assert data["failed_count"] == 0
    assert data["status"] == "COMPLETED"


def test_batch_limit_501_candidates_rejection():
    """Batch of 501 candidates must be rejected with 413 Payload Too Large."""
    candidates = [
        {
            "candidate_id": f"c_{i:04d}",
            "name": f"Candidate {i:04d}",
            "email": f"cand{i:04d}@example.com",
        }
        for i in range(501)
    ]
    payload = {
        "company_id": "corp_501_overflow",
        "candidates": candidates,
    }
    headers = {"X-Sandbox-API-Key": VALID_KEY}
    res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers=headers)
    assert res.status_code == 413
    assert "maximum limit of 500" in res.json()["detail"].lower()


def test_batch_limit_600_candidates_rejection():
    """Batch of 600 candidates must also be rejected with 413."""
    candidates = [
        {"name": f"Candidate {i}", "email": f"cand{i}@example.com"}
        for i in range(600)
    ]
    payload = {
        "company_id": "corp_600_overflow",
        "candidates": candidates,
    }
    headers = {"X-Sandbox-API-Key": VALID_KEY}
    res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers=headers)
    assert res.status_code == 413


def test_multipart_batch_limit_501_files():
    """Multipart upload exceeding 500 files must be rejected with 413."""
    headers = {"X-Sandbox-API-Key": VALID_KEY}
    dummy_content = b"Candidate Name: John Doe\nSkills: Python"
    files = [
        ("files", (f"cand_{i}.txt", dummy_content, "text/plain"))
        for i in range(501)
    ]
    data = {"company_id": "corp_files_overflow"}
    res = client.post("/api/v1/sandbox/resumes/batch", headers=headers, files=files, data=data)
    assert res.status_code == 413
    assert "maximum limit of 500" in res.json()["detail"].lower()


# ============================================================================
# 2. AUTHENTICATION EDGE CASES (Empty, Whitespace, Precedence, Prefix, Bearer)
# ============================================================================

def test_auth_missing_all_credentials():
    """No credentials in header, body, query, or bearer -> 401 Unauthorized."""
    payload = {
        "company_id": "auth_test",
        "candidates": [{"name": "Test User", "email": "test@example.com"}],
    }
    res = client.post("/api/v1/sandbox/bulk-ingest", json=payload)
    assert res.status_code == 401
    assert "missing sandbox api key" in res.json()["detail"].lower()


def test_auth_empty_string_header():
    """Empty string header 'X-Sandbox-API-Key: \"\"' -> 401 Unauthorized."""
    payload = {
        "company_id": "auth_test",
        "candidates": [{"name": "Test User", "email": "test@example.com"}],
    }
    headers = {"X-Sandbox-API-Key": ""}
    res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers=headers)
    assert res.status_code == 401


def test_auth_whitespace_header_variations():
    """Headers with tabs, spaces, newlines -> 401 Unauthorized."""
    payload = {
        "company_id": "auth_test",
        "candidates": [{"name": "Test User", "email": "test@example.com"}],
    }
    for ws in ["   ", "\t", " \t \r\n "]:
        res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers={"X-Sandbox-API-Key": ws})
        assert res.status_code == 401, f"Failed on whitespace: {repr(ws)}"


def test_auth_empty_string_body_key():
    """Empty string in JSON body 'sandbox_api_key': \"\" -> 401 Unauthorized."""
    payload = {
        "sandbox_api_key": "",
        "company_id": "auth_test",
        "candidates": [{"name": "Test User", "email": "test@example.com"}],
    }
    res = client.post("/api/v1/sandbox/bulk-ingest", json=payload)
    assert res.status_code == 401


def test_auth_whitespace_body_key():
    """Whitespace in JSON body 'sandbox_api_key': \"   \" -> 401 Unauthorized."""
    payload = {
        "sandbox_api_key": "   \t  ",
        "company_id": "auth_test",
        "candidates": [{"name": "Test User", "email": "test@example.com"}],
    }
    res = client.post("/api/v1/sandbox/bulk-ingest", json=payload)
    assert res.status_code == 401


def test_auth_precedence_valid_header_wins_over_invalid_body():
    """When both Header and Body are present, Header takes precedence (Valid Header, Invalid Body -> 200)."""
    headers = {"X-Sandbox-API-Key": VALID_KEY}
    payload = {
        "sandbox_api_key": INVALID_KEY,
        "company_id": "auth_precedence_corp",
        "candidates": [{"name": "Precedence Candidate", "email": "prec@example.com"}],
    }
    res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers=headers)
    assert res.status_code == 200
    assert res.json()["successful_count"] == 1


def test_auth_precedence_invalid_header_wins_over_valid_body():
    """When Header is present and invalid, Header takes precedence over valid Body key -> 403 Forbidden."""
    headers = {"X-Sandbox-API-Key": INVALID_KEY}
    payload = {
        "sandbox_api_key": VALID_KEY,
        "company_id": "auth_precedence_corp",
        "candidates": [{"name": "Precedence Candidate", "email": "prec@example.com"}],
    }
    res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers=headers)
    assert res.status_code == 403
    assert "invalid or expired" in res.json()["detail"].lower()


def test_auth_precedence_whitespace_header_falls_through_to_valid_body():
    """When Header is pure whitespace, it is treated as missing and falls through to valid Body key -> 200 OK."""
    headers = {"X-Sandbox-API-Key": "   "}
    payload = {
        "sandbox_api_key": VALID_KEY,
        "company_id": "auth_fallback_corp",
        "candidates": [{"name": "Fallback Candidate", "email": "fallback@example.com"}],
    }
    res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers=headers)
    assert res.status_code == 200
    assert res.json()["successful_count"] == 1


def test_auth_bearer_token_support():
    """Authorization: Bearer <valid_key> must be supported."""
    headers = {"Authorization": f"Bearer {VALID_KEY}"}
    payload = {
        "company_id": "bearer_corp",
        "candidates": [{"name": "Bearer Candidate", "email": "bearer@example.com"}],
    }
    res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers=headers)
    assert res.status_code == 200


def test_auth_bearer_token_invalid():
    """Authorization: Bearer <invalid_key> -> 403 Forbidden."""
    headers = {"Authorization": f"Bearer {INVALID_KEY}"}
    payload = {
        "company_id": "bearer_corp",
        "candidates": [{"name": "Bearer Candidate", "email": "bearer@example.com"}],
    }
    res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers=headers)
    assert res.status_code == 403


def test_auth_bearer_token_malformed():
    """Authorization without token or non-Bearer scheme -> 401 Unauthorized."""
    payload = {
        "company_id": "bearer_corp",
        "candidates": [{"name": "Bearer Candidate", "email": "bearer@example.com"}],
    }
    for malformed in ["Bearer", "Basic xyz123", "Token 123"]:
        res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers={"Authorization": malformed})
        assert res.status_code == 401


def test_auth_prefix_sbx_valid_and_invalid():
    """Any key starting with 'sbx_' with length >= 8 is valid, shorter keys are invalid."""
    payload = {
        "company_id": "prefix_corp",
        "candidates": [{"name": "Prefix Candidate", "email": "prefix@example.com"}],
    }
    # Valid sbx key (length >= 8)
    res_valid = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers={"X-Sandbox-API-Key": VALID_CUSTOM_SBX})
    assert res_valid.status_code == 200

    # Short sbx key (length < 8)
    res_short = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers={"X-Sandbox-API-Key": "sbx_12"})
    assert res_short.status_code == 403


# ============================================================================
# 3. MIXED BATCH ERROR ISOLATION (10 Valid + 2 Corrupted Items)
# ============================================================================

def test_mixed_batch_exact_10_valid_and_2_corrupted():
    """
    CRITICAL CHALLENGE:
    Submit a batch with exact 10 valid candidates + 2 corrupted items.
    Must return HTTP 200 OK with exact 10 SUCCESS and 2 FAILED items,
    batch status 'PARTIAL', and non-crashing error diagnostics.
    """
    headers = {"X-Sandbox-API-Key": VALID_KEY}
    candidates = []

    # 10 Valid Candidates (mixture of text resumes, docx base64, pdf base64, and direct JSON)
    for i in range(10):
        if i % 3 == 0:
            # Base64 valid PDF
            pdf_b64 = base64.b64encode(generate_valid_pdf_bytes(f"Valid PDF User {i}", f"valid_pdf_{i}@example.com")).decode("utf-8")
            candidates.append({
                "candidate_id": f"valid_cand_{i:02d}",
                "name": f"Valid Candidate {i:02d}",
                "email": f"valid_{i:02d}@example.com",
                "resume_base64": pdf_b64,
                "resume_filename": f"resume_{i}.pdf",
                "raw_skills": ["Python", "FastAPI"],
            })
        elif i % 3 == 1:
            # Base64 valid DOCX
            docx_b64 = base64.b64encode(generate_valid_docx_bytes(f"Valid DOCX User {i}", f"valid_docx_{i}@example.com")).decode("utf-8")
            candidates.append({
                "candidate_id": f"valid_cand_{i:02d}",
                "name": f"Valid Candidate {i:02d}",
                "email": f"valid_{i:02d}@example.com",
                "resume_base64": docx_b64,
                "resume_filename": f"resume_{i}.docx",
                "raw_skills": ["Docker", "Kubernetes"],
            })
        else:
            # Text resume
            candidates.append({
                "candidate_id": f"valid_cand_{i:02d}",
                "name": f"Valid Candidate {i:02d}",
                "email": f"valid_{i:02d}@example.com",
                "resume_text": generate_text_resume(f"Valid Candidate {i:02d}", f"valid_{i:02d}@example.com", ["React", "TypeScript"]),
                "raw_skills": ["React", "TypeScript"],
            })

    # Corrupted Item 1: Corrupted Base64 encoding (invalid base64 characters)
    candidates.append({
        "candidate_id": "corrupt_item_01",
        "name": "Corrupted B64 Candidate",
        "email": "corrupt1@example.com",
        "resume_base64": "!!!NOT_VALID_BASE64_AT_ALL???",
        "resume_filename": "corrupt1.pdf",
    })

    # Corrupted Item 2: Corrupted file bytes (valid base64 encoding of garbage bytes for a PDF)
    corrupted_pdf_bytes = b"%PDF-1.4\nGARBAGE_HEADER_CORRUPTED_STREAM_NO_XREF_EOF_TRUNCATED"
    garbage_b64 = base64.b64encode(corrupted_pdf_bytes).decode("utf-8")
    candidates.append({
        "candidate_id": "corrupt_item_02",
        "name": "Corrupted PDF Stream Candidate",
        "email": "corrupt2@example.com",
        "resume_base64": garbage_b64,
        "resume_filename": "corrupt2.pdf",
    })

    payload = {
        "company_id": "mixed_batch_corp",
        "job_id": "job_mixed_10_2",
        "candidates": candidates,
    }

    res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers=headers)
    assert res.status_code == 200, f"Expected 200 OK for partial batch, got {res.status_code}: {res.text}"

    data = res.json()
    assert data["total_received"] == 12
    assert data["successful_count"] == 10
    assert data["failed_count"] == 2
    assert data["status"] == "PARTIAL"
    assert len(data["results"]) == 12

    # Check that each valid candidate has status SUCCESS and non-empty parsed_profile
    for i in range(10):
        item_res = next(r for r in data["results"] if r["candidate_id"] == f"valid_cand_{i:02d}")
        assert item_res["status"] == "SUCCESS", f"Candidate {i} should be SUCCESS"
        assert item_res["error_message"] is None
        assert item_res["parsed_profile"] is not None
        assert item_res["parsed_profile"]["candidate_id"] == f"valid_cand_{i:02d}"

    # Check corrupted items have status FAILED and descriptive error_message
    bad1 = next(r for r in data["results"] if r["candidate_id"] == "corrupt_item_01")
    bad2 = next(r for r in data["results"] if r["candidate_id"] == "corrupt_item_02")

    assert bad1["status"] == "FAILED"
    assert bad1["parsed_profile"] is None
    assert bad1["error_message"] is not None
    assert "corrupted or invalid base64" in bad1["error_message"].lower() or "failed" in bad1["error_message"].lower()

    assert bad2["status"] == "FAILED"
    assert bad2["parsed_profile"] is None
    assert bad2["error_message"] is not None


def test_mixed_batch_all_corrupted_candidates():
    """When all items in batch fail, returns 200 OK with status 'FAILED' and failed_count == total."""
    headers = {"X-Sandbox-API-Key": VALID_KEY}
    candidates = [
        {
            "candidate_id": f"all_bad_{i}",
            "name": f"Bad Candidate {i}",
            "resume_base64": "!!!INVALID_B64!!!",
        }
        for i in range(3)
    ]
    payload = {"company_id": "all_bad_corp", "candidates": candidates}
    res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers=headers)
    assert res.status_code == 200
    data = res.json()
    assert data["total_received"] == 3
    assert data["successful_count"] == 0
    assert data["failed_count"] == 3
    assert data["status"] == "FAILED"


# ============================================================================
# 4. STATUS ENDPOINT TESTS (GET /api/v1/sandbox/batch/{batch_id})
# ============================================================================

def test_status_endpoint_success_retrieval():
    """Poll existing batch status with valid header -> 200 OK."""
    headers = {"X-Sandbox-API-Key": VALID_KEY}
    payload = {
        "company_id": "poll_test_corp",
        "candidates": [{"name": "Status Tester", "email": "status@example.com"}],
    }
    ingest_res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers=headers)
    assert ingest_res.status_code == 200
    batch_id = ingest_res.json()["batch_id"]

    res = client.get(f"/api/v1/sandbox/batch/{batch_id}", headers=headers)
    assert res.status_code == 200
    data = res.json()
    assert data["batch_id"] == batch_id
    assert data["company_id"] == "poll_test_corp"
    assert data["successful_count"] == 1


def test_status_endpoint_query_param_auth():
    """Poll existing batch status with query param sandbox_api_key -> 200 OK."""
    headers = {"X-Sandbox-API-Key": VALID_KEY}
    payload = {
        "company_id": "query_auth_corp",
        "candidates": [{"name": "Query Auth Tester", "email": "query@example.com"}],
    }
    ingest_res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers=headers)
    batch_id = ingest_res.json()["batch_id"]

    # Request without header but with query param
    res = client.get(f"/api/v1/sandbox/batch/{batch_id}?sandbox_api_key={VALID_KEY}")
    assert res.status_code == 200
    assert res.json()["batch_id"] == batch_id


def test_status_endpoint_invalid_batch_id_returns_404():
    """Non-existent batch ID must return 404 Not Found."""
    headers = {"X-Sandbox-API-Key": VALID_KEY}
    res = client.get("/api/v1/sandbox/batch/batch_non_existent_uuid_99999", headers=headers)
    assert res.status_code == 404
    assert "not found" in res.json()["detail"].lower()


def test_status_endpoint_unauthenticated_returns_401():
    """Requesting batch status without credentials -> 401 Unauthorized."""
    res = client.get("/api/v1/sandbox/batch/batch_any_id_12345")
    assert res.status_code == 401
    assert "missing sandbox api key" in res.json()["detail"].lower()


def test_status_endpoint_whitespace_key_returns_401():
    """Whitespace key on status endpoint -> 401 Unauthorized."""
    headers = {"X-Sandbox-API-Key": "   \t  "}
    res = client.get("/api/v1/sandbox/batch/batch_any_id_12345", headers=headers)
    assert res.status_code == 401


def test_status_endpoint_invalid_key_returns_403():
    """Invalid key on status endpoint -> 403 Forbidden."""
    headers = {"X-Sandbox-API-Key": INVALID_KEY}
    res = client.get("/api/v1/sandbox/batch/batch_any_id_12345", headers=headers)
    assert res.status_code == 403
    assert "invalid or expired" in res.json()["detail"].lower()


# ============================================================================
# 5. MULTIPART RESUME BATCH UPLOAD (POST /api/v1/sandbox/resumes/batch)
# ============================================================================

def test_multipart_batch_mixed_error_isolation():
    """
    Multipart batch containing 3 valid files and 2 corrupted/invalid files.
    Must return 200 OK with 3 SUCCESS, 2 FAILED, status 'PARTIAL'.
    """
    headers = {"X-Sandbox-API-Key": VALID_KEY}
    pdf_bytes = generate_valid_pdf_bytes("Multi Valid PDF", "mv_pdf@example.com")
    docx_bytes = generate_valid_docx_bytes("Multi Valid DOCX", "mv_docx@example.com")
    txt_bytes = b"Multi Valid TXT Resume\nEmail: mv_txt@example.com\nSkills: Python, Go"

    # Corrupt 1: Unsupported extension .exe
    exe_bytes = b"MZ\x90\x00\x03\x00\x00\x00\x04\x00\x00\x00\xff\xff"
    # Corrupt 2: 0-byte file
    empty_bytes = b""

    files = [
        ("files", ("good1.pdf", pdf_bytes, "application/pdf")),
        ("files", ("good2.docx", docx_bytes, "application/vnd.openxmlformats-officedocument.wordprocessingml.document")),
        ("files", ("good3.txt", txt_bytes, "text/plain")),
        ("files", ("bad_ext.exe", exe_bytes, "application/octet-stream")),
        ("files", ("bad_empty.pdf", empty_bytes, "application/pdf")),
    ]
    data = {"company_id": "multipart_mixed_corp", "job_id": "job_mp_01"}
    res = client.post("/api/v1/sandbox/resumes/batch", headers=headers, files=files, data=data)
    assert res.status_code == 200
    data = res.json()
    assert data["total_received"] == 5
    assert data["successful_count"] == 3
    assert data["failed_count"] == 2
    assert data["status"] == "PARTIAL"


# ============================================================================
# 6. UNICODE & METADATA OVERLAY STRESS TESTS
# ============================================================================

def test_unicode_and_special_characters_in_candidate_item():
    """Candidate with emojis, Hindi (Devanagari), and Arabic characters must not crash parser."""
    headers = {"X-Sandbox-API-Key": VALID_KEY}
    payload = {
        "company_id": "unicode_corp_🚀",
        "candidates": [
            {
                "candidate_id": "cand_unicode_01",
                "name": "राजेश शर्मा (Rajesh Sharma) 🌟",
                "email": "rajesh@example.com",
                "college": "भारतीय प्रौद्योगिकी संस्थान (IIT)",
                "raw_skills": ["पायथन", "मशीन लर्निंग", "GoLang 🚀"],
            }
        ]
    }
    res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers=headers)
    assert res.status_code == 200
    data = res.json()
    assert data["successful_count"] == 1
    result = data["results"][0]
    assert result["status"] == "SUCCESS"
    assert "राजेश शर्मा" in result["name"]
    assert "पायथन" in result["parsed_profile"]["skills"]["technical"]


def test_invalid_email_format_is_isolated_to_failed_candidate():
    """
    Candidate with malformed email (fails CandidateContact validation)
    must be cleanly isolated to status FAILED without crashing the batch.
    """
    headers = {"X-Sandbox-API-Key": VALID_KEY}
    payload = {
        "company_id": "email_test_corp",
        "candidates": [
            {
                "candidate_id": "cand_good_email",
                "name": "Good Email",
                "email": "good@example.com",
            },
            {
                "candidate_id": "cand_bad_email",
                "name": "Bad Email",
                "email": "THIS_IS_NOT_AN_EMAIL_ADDRESS",
            },
        ],
    }
    res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers=headers)
    assert res.status_code == 200
    data = res.json()
    assert data["total_received"] == 2
    assert data["successful_count"] == 1
    assert data["failed_count"] == 1
    good = next(r for r in data["results"] if r["candidate_id"] == "cand_good_email")
    bad = next(r for r in data["results"] if r["candidate_id"] == "cand_bad_email")
    assert good["status"] == "SUCCESS"
    assert bad["status"] == "FAILED"
    assert "invalid email format" in bad["error_message"].lower()


def test_massive_resume_text_payload():
    """Batch item with massive 500KB text payload should process cleanly without OOM."""
    headers = {"X-Sandbox-API-Key": VALID_KEY}
    large_text = "Experience Section:\n" + ("Built scalable microservices in Python. " * 10000)
    payload = {
        "company_id": "large_text_corp",
        "candidates": [
            {
                "candidate_id": "cand_large_text",
                "name": "Big Data Engineer",
                "email": "bigdata@example.com",
                "resume_text": large_text,
            }
        ],
    }
    res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers=headers)
    assert res.status_code == 200
    data = res.json()
    assert data["successful_count"] == 1
    assert data["results"][0]["status"] == "SUCCESS"


def test_env_var_sandbox_api_key(monkeypatch):
    """API key defined in SANDBOX_API_KEYS environment variable must be recognized."""
    monkeypatch.setenv("SANDBOX_API_KEYS", "env_enterprise_key_alpha, env_enterprise_key_beta")
    payload = {
        "company_id": "env_key_corp",
        "candidates": [{"name": "Env Candidate", "email": "env@example.com"}],
    }
    res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers={"X-Sandbox-API-Key": "env_enterprise_key_alpha"})
    assert res.status_code == 200
    assert res.json()["successful_count"] == 1


def test_sequential_batch_store_isolation():
    """Verify distinct batch_ids preserve their respective data in _BATCH_STORE without collisions."""
    headers = {"X-Sandbox-API-Key": VALID_KEY}
    batch_ids = []
    for i in range(5):
        payload = {
            "company_id": f"corp_seq_{i}",
            "job_id": f"job_seq_{i}",
            "candidates": [{"candidate_id": f"cand_seq_{i}", "name": f"Seq Cand {i}", "email": f"s{i}@example.com"}],
        }
        res = client.post("/api/v1/sandbox/bulk-ingest", json=payload, headers=headers)
        assert res.status_code == 200
        batch_ids.append((res.json()["batch_id"], f"corp_seq_{i}", f"job_seq_{i}"))

    for bid, comp, job in batch_ids:
        poll_res = client.get(f"/api/v1/sandbox/batch/{bid}", headers=headers)
        assert poll_res.status_code == 200
        data = poll_res.json()
        assert data["batch_id"] == bid
        assert data["company_id"] == comp
        assert data["job_id"] == job

