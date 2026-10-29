"""
Tests for Dynamic College Tier Classification and Luxury Decision Email Dispatch
"""

import pytest
from fastapi.testclient import TestClient
from backend.main import app
from backend.services.college_classifier import CollegeTierClassifier
from backend.services.email_formatter import EmailFormatter

client = TestClient(app)

def test_college_tier_classification():
    """Verify accurate tiering across Tier-1, Tier-2, and Tier-3 institutions."""
    assert CollegeTierClassifier.classify("IIT Delhi")[0] == "Tier-1"
    assert CollegeTierClassifier.classify("Indian Institute of Technology, Bombay")[0] == "Tier-1"
    assert CollegeTierClassifier.classify("BITS Pilani")[0] == "Tier-1"
    assert CollegeTierClassifier.classify("NIT Surathkal")[0] == "Tier-1"
    assert CollegeTierClassifier.classify("IIIT Hyderabad")[0] == "Tier-1"
    assert CollegeTierClassifier.classify("Stanford University")[0] == "Tier-1"
    
    assert CollegeTierClassifier.classify("GLA University")[0] == "Tier-2"
    assert CollegeTierClassifier.classify("VIT Vellore")[0] == "Tier-2"
    assert CollegeTierClassifier.classify("Thapar University")[0] == "Tier-2"
    assert CollegeTierClassifier.classify("Manipal Institute of Technology")[0] == "Tier-2"
    
    assert CollegeTierClassifier.classify("Government Engineering College Bilaspur")[0] == "Tier-3"
    assert CollegeTierClassifier.classify("Random Rural Institute")[0] == "Tier-3"

def test_email_formatter_shortlisted():
    """Verify luxury email generation for shortlisted candidates."""
    candidate = {
        "candidate_id": "cand_test_01",
        "name": "Priyanshu Awasthi",
        "email": "priyanshu@example.edu",
        "college": "GLA University",
        "project_name": "Data_SIH",
        "project_type": "Fullstack AI",
        "authenticity_score": 95,
        "viva_score": 9.0,
        "is_clone": False,
        "git_dna": {"total_commits": 157, "time_span_days": 32, "deletion_ratio": 0.38}
    }
    email_data = EmailFormatter.generate_email(candidate, decision="SHORTLISTED")
    assert email_data["decision"] == "SHORTLISTED"
    assert "Priyanshu Awasthi" in email_data["subject"]
    assert email_data["college_tier"] == "Tier-2"
    assert "SHORTLISTED" in email_data["badge_title"]
    assert "https://proofcard-im105.vercel.app" in email_data["verification_url"]
    assert "<!DOCTYPE html>" in email_data["formatted_email_html"]
    assert len(email_data["formatted_email_text"]) > 100

def test_email_formatter_rejected_viva():
    """Verify rejection email for authentic code with weak viva defense (non-clone)."""
    candidate = {
        "candidate_id": "cand_test_02",
        "name": "Akash Gupta",
        "email": "akash@example.edu",
        "college": "GEC Bilaspur",
        "project_name": "Microservices Auth",
        "project_type": "Backend Go",
        "authenticity_score": 85,
        "viva_score": 4.5,
        "is_clone": False,
        "git_dna": {"total_commits": 24, "time_span_days": 10, "deletion_ratio": 0.15}
    }
    email_data = EmailFormatter.generate_email(
        candidate, 
        decision="REJECTED", 
        rejection_reason_code="VIVA_INCOMPLETE"
    )
    assert email_data["decision"] == "REJECTED"
    assert "TECHNICAL SCREENING NOTICE" in email_data["badge_title"]
    assert "Viva" in email_data["findings_summary"]
    assert len(email_data["action_plan_steps"]) > 0

def test_send_decision_email_endpoint():
    """Verify /api/webhooks/send-decision-email endpoint."""
    res = client.post(
        "/api/webhooks/send-decision-email",
        json={
            "candidate": {
                "candidate_id": "cand_test_03",
                "name": "Ananya Patel",
                "email": "ananya@example.edu",
                "college": "IIT Bombay",
                "authenticity_score": 92,
                "viva_score": 8.5,
                "is_clone": False
            },
            "decision": "SHORTLISTED"
        }
    )
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "success"
    assert data["email_data"]["candidate_name"] == "Ananya Patel"
    assert data["email_data"]["college_tier"] == "Tier-1"


def test_evaluate_cohort_endpoint():
    """Verify /api/batch/evaluate-cohort computes real metrics, tiers, and AST viva baselines."""
    candidates = [
        {
            "name": "Priyanshu Awasthi",
            "college": "GLA University",
            "repo_url": "https://github.com/Priyanshuf1/rabto",
            "role": "Interactive WebGL Architect"
        },
        {
            "name": "Clone Tester",
            "college": "Unknown College",
            "repo_url": "https://github.com/user/netflix-clone",
            "role": "Frontend Clone"
        }
    ]
    res = client.post("/api/batch/evaluate-cohort", json={"cohort": candidates})
    assert res.status_code == 200
    data = res.json()
    assert data["total_evaluated"] == 2
    assert data["authentic_count"] == 1
    assert data["clone_count"] == 1
    
    priyanshu = next(c for c in data["cohort"] if "Priyanshu" in c["name"])
    assert priyanshu["college_tier"] == "Tier-2"
    assert priyanshu["authenticity_score"] >= 70
    assert priyanshu["viva_status"] == "PENDING_DEFENSE"
    assert priyanshu["viva_score"] == 0
    assert priyanshu["is_clone"] is False

    clone = next(c for c in data["cohort"] if "Clone" in c["name"])
    assert clone["is_clone"] is True
    assert clone["authenticity_score"] <= 35
    assert clone["viva_blocked"] is True


def test_dispatch_viva_invites_endpoint():
    """Verify /api/batch/dispatch-viva-invites queues async viva invitations."""
    res = client.post(
        "/api/batch/dispatch-viva-invites",
        json={
            "candidates": [
                {"candidate_id": "c1", "name": "Dev 1", "email": "dev1@example.edu"},
                {"candidate_id": "c2", "name": "Dev 2", "email": "dev2@example.edu"}
            ]
        }
    )
    assert res.status_code == 200
    data = res.json()
    assert data["dispatched_count"] == 2
    assert "viva?cid=c1" in data["dispatched"][0]["viva_link"]
