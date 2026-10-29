import io
import json
import zipfile
import asyncio
from unittest.mock import patch, AsyncMock
from fastapi.testclient import TestClient

from backend.main import app
from backend.services.n8n_service import N8nService, CONFIG_PATH, DEFAULT_CONFIG

client = TestClient(app)
_INITIAL_CONFIG = None

def setup_module():
    """Remember initial configuration so tests don't overwrite user config on disk."""
    global _INITIAL_CONFIG
    _INITIAL_CONFIG = N8nService.get_config()

def setup_function():
    """Ensure clean state for every test."""
    N8nService._recent_dispatches.clear()

def teardown_module():
    """Restore user's config after tests run so disk state is preserved."""
    N8nService._recent_dispatches.clear()
    if _INITIAL_CONFIG is not None:
        N8nService.save_config(_INITIAL_CONFIG)
    else:
        N8nService.save_config(DEFAULT_CONFIG)

def test_n8n_config_endpoints():
    initial_cfg = N8nService.get_config()
    try:
        # 1. Get config
        res = client.get("/api/webhooks/n8n-config")
        assert res.status_code == 200
        data = res.json()
        assert "webhook_url" in data
        assert "sync_sheets" in data
        assert "feedback_emails" in data

        # 2. Update config
        test_url = "https://n8n.example.com/webhook/test-flow"
        update_res = client.post("/api/webhooks/n8n-config", json={
            "webhook_url": test_url,
            "sync_sheets": True,
            "feedback_emails": False
        })
        assert update_res.status_code == 200
        updated_data = update_res.json()
        assert updated_data["status"] == "success"
        assert updated_data["config"]["webhook_url"] == test_url
        assert updated_data["config"]["feedback_emails"] is False

        # Verify retrieval reflects update
        res2 = client.get("/api/webhooks/n8n-config")
        assert res2.json()["webhook_url"] == test_url
    finally:
        # Restore configuration
        N8nService.save_config(initial_cfg)

def test_n8n_test_ping_unconfigured():
    # Empty url should return skipped without error
    initial_cfg = N8nService.get_config()
    try:
        N8nService.save_config({"webhook_url": ""})
        res = client.post("/api/webhooks/test", json={"webhook_url": ""})
        assert res.status_code == 200
        data = res.json()
        assert data["delivered"] is False
        assert data["status"] == "skipped"
    finally:
        N8nService.save_config(initial_cfg)

def test_n8n_dispatch_resilience_on_offline():
    # Mocking httpx to simulate connection error or offline n8n server
    async def _run():
        with patch("httpx.AsyncClient.post", side_effect=Exception("Connection refused")):
            res = await N8nService.dispatch("TEST_EVENT", {"foo": "bar"}, webhook_url="http://offline-n8n:5678/webhook")
            assert res["status"] == "error"
            assert res["delivered"] is False
            assert "Connection refused" in res["error"]
    asyncio.run(_run())

def test_n8n_dispatch_candidate_scanned():
    async def _run():
        mock_candidate = {
            "candidate_id": "cand_test_01",
            "name": "Alex Dev",
            "email": "alex@example.edu",
            "college": "Tech Institute",
            "college_tier": "Tier-3",
            "authenticity_score": 95,
            "viva_score": 9,
            "is_clone": False,
            "proof_card": {
                "status": "VERIFIED_EXEMPLARY",
                "headline": "Outstanding Code Ownership",
                "tamper_proof_hash": "SHA256:123456"
            }
        }

        mock_response = AsyncMock()
        mock_response.status_code = 200
        mock_response.text = '{"success": true}'

        with patch("httpx.AsyncClient.post", return_value=mock_response):
            res = await N8nService.dispatch_candidate_scanned(mock_candidate, webhook_url="http://mock-n8n/webhook")
            assert res["status"] == "success"
            assert res["delivered"] is True
    asyncio.run(_run())

def test_n8n_feedback_dispatch_for_clone():
    async def _run():
        clone_candidate = {
            "candidate_id": "cand_clone_01",
            "name": "Clone User",
            "email": "clone@example.edu",
            "college": "Sample College",
            "authenticity_score": 25,
            "is_clone": True,
            "matched_tutorial": {
                "name": "CodeWithHarry Spotify Clone"
            },
            "proof_card": {
                "headline": "High probability tutorial clone detected.",
                "growth_area": "Build custom modules",
                "specific_action": "Implement OAuth and test fixtures"
            }
        }

        mock_response = AsyncMock()
        mock_response.status_code = 200
        mock_response.text = '{"success": true}'

        with patch("httpx.AsyncClient.post", return_value=mock_response):
            res = await N8nService.dispatch_feedback_email(clone_candidate, webhook_url="http://mock-n8n/webhook")
            assert res["status"] == "success"
            assert res["delivered"] is True
    asyncio.run(_run())

def test_webhooks_dispatch_endpoint():
    mock_response = AsyncMock()
    mock_response.status_code = 200
    mock_response.text = '{"received": true}'

    with patch("httpx.AsyncClient.post", return_value=mock_response):
        res = client.post("/api/webhooks/dispatch", json={
            "event_type": "CANDIDATE_SHORTLISTED",
            "payload": {
                "job_title": "Backend Architect",
                "winner_name": "Priyanshu Awasthi",
                "winner_id": "cand_builder_02",
                "shortlisted": [
                    {
                        "candidate_id": "cand_builder_02",
                        "name": "Priyanshu Awasthi",
                        "email": "priyanshu@example.edu",
                        "college": "GLA University",
                        "authenticity_score": 96,
                        "viva_score": 9,
                        "composite_score": 94,
                        "verified_skills": ["python", "fastapi"]
                    }
                ]
            },
            "webhook_url": "http://mock-n8n/webhook"
        })
        assert res.status_code == 200
        assert res.json()["delivered"] is True

def test_continuous_verification_endpoint():
    mock_profile = {
        "candidate_id": "cand_cv_01",
        "name": "Priyanshu Awasthi",
        "email": "priyanshu@example.edu",
        "college": "GLA University",
        "authenticity_score": 96,
        "viva_score": 9,
        "is_clone": False
    }
    with patch("backend.routers.webhooks.analyze_github_repo", new=AsyncMock(return_value=mock_profile)):
        res = client.post("/api/webhooks/continuous-verification", json={
            "github_url": "https://github.com/Priyanshuf1/rabto",
            "candidate_name": "Priyanshu Awasthi",
            "email": "priyanshu@example.edu",
            "college": "GLA University"
        })
        assert res.status_code == 200
        data = res.json()
        assert data["status"] == "success"
        assert "profile" in data
        assert data["profile"]["email"] == "priyanshu@example.edu"

def test_n8n_deduplication_window():
    """Verify that firing duplicate events within 5 seconds suppresses second dispatch."""
    async def _run():
        mock_response = AsyncMock()
        mock_response.status_code = 200
        mock_response.text = '{"ok": true}'

        candidate = {
            "candidate_id": "cand_dedup_01",
            "name": "Dedup Test",
            "email": "dedup@test.edu",
            "authenticity_score": 90
        }

        with patch("httpx.AsyncClient.post", return_value=mock_response) as mock_post:
            # First dispatch should go through
            res1 = await N8nService.dispatch_candidate_scanned(candidate, webhook_url="http://mock-n8n/webhook")
            assert res1["delivered"] is True
            assert mock_post.call_count == 1

            # Second immediate dispatch should be suppressed
            res2 = await N8nService.dispatch_candidate_scanned(candidate, webhook_url="http://mock-n8n/webhook")
            assert res2["status"] == "skipped"
            assert res2["delivered"] is False
            assert "deduplication window" in res2["message"]
            assert mock_post.call_count == 1  # No additional network call made
    asyncio.run(_run())

def test_n8n_url_scheme_auto_correction():
    """Verify that webhook URLs without http/https protocol prefix are auto-corrected."""
    async def _run():
        mock_response = AsyncMock()
        mock_response.status_code = 200
        mock_response.text = '{"ok": true}'

        with patch("httpx.AsyncClient.post", return_value=mock_response) as mock_post:
            res = await N8nService.dispatch("TEST_PING", {"ping": "pong"}, webhook_url="localhost:5678/webhook/test")
            assert res["delivered"] is True
            # Verify the actual URL passed to httpx starts with http://
            called_url = mock_post.call_args[0][0]
            assert called_url.startswith("http://")
    asyncio.run(_run())

def test_zip_upload_with_student_email():
    """Verify that uploading a project ZIP accepts email and embeds it in profile and proof card."""
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("main.py", "def test():\n    print('authentic')\n")
    zip_buffer.seek(0)

    res = client.post(
        "/api/upload/zip",
        files={"file": ("project.zip", zip_buffer, "application/zip")},
        data={
            "candidate_name": "Student Builder",
            "college": "GLA University",
            "consent_granted": True,
            "email": "student.builder@example.edu"
        }
    )
    assert res.status_code == 200
    data = res.json()
    assert data["email"] == "student.builder@example.edu"
    assert data["proof_card"]["email"] == "student.builder@example.edu"

def test_batch_csv_with_email_column():
    """Verify that batch CSV ingestion correctly parses email columns."""
    csv_text = """name,email,college,github_url
Rahul Verma,rahul@example.edu,IIT Bombay,https://github.com/rahul/backend-service
Sneha Roy,sneha@sample.ac.in,NIT Trichy,https://github.com/sneha/distributed-cache
"""
    res = client.post("/api/batch/ingest-csv", json={"csv_text": csv_text})
    assert res.status_code == 200
    cohort = res.json()["cohort"]
    assert len(cohort) == 2
    assert cohort[0]["email"] == "rahul@example.edu"
    assert cohort[1]["email"] == "sneha@sample.ac.in"

def test_batch_csv_headerless_parsing():
    """Verify that headerless CSV with email positionally parses correctly."""
    csv_text = """Aman Gupta,aman@example.edu,GLA University,https://github.com/aman/repo-one
Kavita Jain,kavita@test.org,State College,https://github.com/kavita/repo-two
"""
    res = client.post("/api/batch/ingest-csv", json={"csv_text": csv_text})
    assert res.status_code == 200
    cohort = res.json()["cohort"]
    assert len(cohort) == 2
    assert cohort[0]["name"] == "Aman Gupta"
    assert cohort[0]["email"] == "aman@example.edu"
    assert cohort[1]["email"] == "kavita@test.org"
