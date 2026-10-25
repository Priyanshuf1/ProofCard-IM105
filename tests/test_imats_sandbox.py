import urllib.request
import json
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_imats_sandbox_endpoints():
    res = client.get("/api/v1/imats/sandbox/status")
    assert res.status_code == 200
    data = res.json()
    assert data["anonymised_profiles_loaded"] == 400
    assert data["job_descriptions_loaded"] == 30
    assert data["consent_enforced"] is True
    assert data["human_readable_reasons_enforced"] is True

def test_imats_sandbox_agreement():
    payload = {
        "target_count": 10,
        "min_authenticity": 70,
        "min_viva": 6,
        "exclude_clones": True
    }
    res = client.post("/api/v1/imats/sandbox/evaluate-agreement", json=payload)
    assert res.status_code == 200
    data = res.json()
    summary = data["benchmark_summary"]
    assert summary["recruiter_shortlist_agreement_pct"] >= 75.0
    assert summary["fairness_constraint"]["is_compliant"] is True
    assert summary["fairness_constraint"]["disparate_impact_ratio"] >= 0.80
    assert summary["guardrails_audit"]["human_readable_reasons_present"] is True
    assert summary["guardrails_audit"]["candidate_consent_verified"] is True
    assert len(data["jd_breakdown"]) == 30

def test_imats_sandbox_push_shortlist():
    payload = {
        "jd_id": "jd_01",
        "target_count": 5,
        "shortlisted_candidates": [
            {"candidate_id": "cand_fresher_001", "name": "Priyanshu Awasthi", "score": 96}
        ],
        "recruiter_notes": "Shortlisted via ProofCard IMATS verification pipeline."
    }
    res = client.post("/api/v1/imats/sandbox/push-shortlist", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "COMMITTED_TO_IMATS_PIPELINE"
    assert "transaction_id" in data

if __name__ == "__main__":
    test_imats_sandbox_endpoints()
    test_imats_sandbox_agreement()
    test_imats_sandbox_push_shortlist()
    print("ALL IMATS SANDBOX BENCHMARK TESTS PASSED!")
