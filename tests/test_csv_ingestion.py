import os
import json
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_csv_ingest_endpoint():
    csv_sample = """name,college,github_url,role
Priyanshu Awasthi,GLA University Mathura,https://github.com/shivendra1911/Data_SIH,Fullstack AI
Aditi Sharma,IIT Roorkee,https://github.com/aditi/auth-microservice,Backend Engineer
Rohan Verma,NIT Trichy,https://github.com/rohan/tutorial-clone-todo,Frontend Dev
Sunil Mehta,Bundelkhand Institute,https://github.com/sunil/distributed-broker,Systems Engineer
"""
    res = client.post("/api/batch/ingest-csv", json={"csv_text": csv_sample})
    assert res.status_code == 200
    data = res.json()
    assert data["total_candidates"] == 4
    assert len(data["cohort"]) == 4
    assert data["cohort"][0]["name"] == "Priyanshu Awasthi"
    assert data["cohort"][0]["college"] == "GLA University Mathura"

def test_auto_shortlist_with_cutoffs():
    # Test strict cutoffs
    res = client.post("/api/batch/auto-shortlist", json={
        "candidates": [],
        "target_count": 10,
        "min_authenticity": 85,
        "min_viva": 8,
        "exclude_clones": True,
        "required_skills": ["python", "fastapi"]
    })
    assert res.status_code == 200
    data = res.json()
    assert "qualified_count" in data
    assert "cutoff_failed_count" in data
    assert len(data["shortlisted"]) <= 10
    # Every shortlisted candidate MUST meet the minimum cutoff thresholds
    for c in data["shortlisted"]:
        assert c["authenticity_score"] >= 85, f"Candidate {c['name']} auth {c['authenticity_score']} < 85"
        assert c["viva_score"] >= 8, f"Candidate {c['name']} viva {c['viva_score']} < 8"
        assert not c["is_clone"], f"Candidate {c['name']} is flagged as clone"

if __name__ == "__main__":
    test_csv_ingest_endpoint()
    test_auto_shortlist_with_cutoffs()
    print("ALL CSV INGESTION & SHORTLIST CUTOFF TESTS PASSED!")
