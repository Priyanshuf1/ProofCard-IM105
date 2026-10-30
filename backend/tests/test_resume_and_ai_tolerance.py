"""
Unit tests for Resume Parser and Enterprise AI Tolerance Gate.
"""
import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)


def test_ai_tolerance_templates_endpoint():
    res = client.get("/api/ai-tolerance/templates")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "success"
    templates = data["templates"]
    assert len(templates) >= 3
    ids = [t["id"] for t in templates]
    assert "strict-core-logic" in ids
    assert "balanced-copilot" in ids
    assert "ai-native-builder" in ids


def test_ai_tolerance_human_pass():
    human_answer = (
        "In our component we noticed heavy re-renders whenever telemetry data arrived. "
        "So we added a custom throttle hook and cached the previous reading with useMemo. "
        "It was kind of messy at first, but it fixed the UI lag."
    )
    res = client.post("/api/ai-tolerance/check", json={
        "answer_text": human_answer,
        "tolerance_percent": 35.0,
        "template_id": "balanced-copilot"
    })
    assert res.status_code == 200
    data = res.json()
    assert data["verdict"] == "PASS"
    assert data["exceeded"] is False
    assert data["tolerance_percent"] == 35.0


def test_ai_tolerance_ai_violation():
    ai_answer = (
        "Furthermore, to ensure optimal system responsiveness, it is imperative to note that modern web "
        "engineering paradigms dictate the seamless orchestration of disparate state pipelines. Consequently, "
        "by leveraging comprehensive architectural patterns, our implementation mitigates redundant computational overhead, "
        "thereby serving as a foundational testament to robust software engineering scalability."
    )
    res = client.post("/api/ai-tolerance/check", json={
        "answer_text": ai_answer,
        "tolerance_percent": 20.0,
        "template_id": "strict-core-logic"
    })
    assert res.status_code == 200
    data = res.json()
    assert data["verdict"] == "FAIL"
    assert data["exceeded"] is True
    assert data["excess_percent"] > 0
    assert "POLICY VIOLATION" in data["message"]


def test_resume_parser_endpoint_tech():
    import pymupdf as fitz
    doc = fitz.open()
    page = doc.new_page()
    text = (
        "Priyanshu Awasthi\n"
        "Email: priyanshu@example.edu\n"
        "GLA University - Computer Science Engineering\n"
        "GitHub: https://github.com/Priyanshuf1/rabto\n"
        "SKILLS: Python, TypeScript, React, FastAPI, Docker, SQL, Machine Learning\n"
    )
    page.insert_text((50, 50), text)
    pdf_bytes = doc.tobytes()
    doc.close()

    res = client.post("/api/resume/parse", files={"file": ("resume.pdf", pdf_bytes, "application/pdf")})
    assert res.status_code == 200
    data = res.json()
    assert data["name"] == "Priyanshu Awasthi"
    assert data["email"] == "priyanshu@example.edu"
    assert data["college"] == "GLA University"
    assert data["github_url"] == "https://github.com/Priyanshuf1/rabto"
    assert data["role_type"] == "Software Engineer"
    assert len(data["skills"]) >= 5


def test_resume_parser_endpoint_mba():
    import pymupdf as fitz
    doc = fitz.open()
    page = doc.new_page()
    text = (
        "Sneha Sharma\n"
        "Email: sneha.sharma@iima.ac.in\n"
        "IIM Ahmedabad - Master of Business Administration (Marketing & Finance)\n"
        "LinkedIn: https://linkedin.com/in/sneha-sharma\n"
        "SKILLS: Marketing, Finance, Accounting, Market Analysis, Excel, Tableau, Strategic Planning\n"
    )
    page.insert_text((50, 50), text)
    pdf_bytes = doc.tobytes()
    doc.close()

    res = client.post("/api/resume/parse", files={"file": ("mba_resume.pdf", pdf_bytes, "application/pdf")})
    assert res.status_code == 200
    data = res.json()
    assert data["name"] == "Sneha Sharma"
    assert data["email"] == "sneha.sharma@iima.ac.in"
    assert data["college"] == "IIM Ahmedabad"
    assert data["role_type"] == "Business/MBA"
    assert "Marketing" in data["skills"]
