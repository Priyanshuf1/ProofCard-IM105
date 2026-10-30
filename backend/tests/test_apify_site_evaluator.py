import asyncio
import pytest
from fastapi.testclient import TestClient
from backend.main import app
from backend.services.apify_site_evaluator import ApifySiteEvaluator

client = TestClient(app)

def test_evaluate_live_site_endpoint():
    """Test POST /api/v1/forensics/evaluate-live-site with mock live website."""
    payload = {
        "url": "https://proofcard.vercel.app",
        "candidate_name": "Priyanshu Awasthi",
        "candidate_email": "priyanshu@example.edu",
        "college": "GLA University",
        "stream_track": "TECHNICAL",
        "timeout_seconds": 5.0
    }
    response = client.post("/api/v1/forensics/evaluate-live-site", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "candidate_id" in data
    assert data["name"] == "Priyanshu Awasthi"
    assert data["authenticity_score"] > 0
    assert "live_site_audit" in data
    audit = data["live_site_audit"]
    assert audit["url"] == "https://proofcard.vercel.app"
    assert "potential_matches" in audit
    assert len(audit["potential_matches"]) > 0
    assert "viva_questions" in data
    assert len(data["viva_questions"]) >= 10
    assert data["viva_status"] == "PENDING_DEFENSE"

def test_apify_site_evaluator_direct():
    """Test ApifySiteEvaluator.evaluate_url directly using asyncio.run."""
    profile = asyncio.run(ApifySiteEvaluator.evaluate_url(
        url="https://rabto.vercel.app",
        candidate_name="Rohan Sharma",
        candidate_email="rohan@example.edu",
        college="IIT Delhi",
        stream_track="TECHNICAL",
        timeout_seconds=5.0
    ))
    assert profile["candidate_id"].startswith("live_")
    assert "rabto" in profile["project_name"] or len(profile["project_name"]) > 0
    assert profile["live_site_audit"]["domain"] == "rabto.vercel.app"
    assert profile["live_site_audit"]["content_originality_score"] > 0
    assert len(profile["complex_functions"]) >= 2
