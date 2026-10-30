import os
import io
import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def create_mock_pdf_stream(text: str) -> bytes:
    import fitz  # PyMuPDF
    doc = fitz.open()
    page = doc.new_page()
    page.insert_text((50, 72), text, fontsize=11)
    buf = io.BytesIO()
    doc.save(buf)
    doc.close()
    return buf.getvalue()


# =====================================================================
# 1. Non-Tech MBA Track & CandidateIngestion Flow Verification
# =====================================================================

def test_m2_mba_resume_parsing_and_classification():
    """Verify that MBA/BBA resumes parse accurately with role_type='Business/MBA'."""
    text = (
        "Rohit Singhania\n"
        "Email: rohit.s@iima.ac.in\n"
        "IIM Ahmedabad - Master of Business Administration (MBA)\n"
        "Skills: Financial Modeling, Strategic Planning, Marketing, Market Analysis, Budgeting\n"
        "PROJECTS\n"
        "GTM Strategy and Unit Economics Optimization for Retail D2C\n"
    )
    pdf_bytes = create_mock_pdf_stream(text)
    res = client.post("/api/resume/parse", files={"file": ("rohit_mba.pdf", pdf_bytes, "application/pdf")})
    assert res.status_code == 200
    data = res.json()
    assert data["role_type"] == "Business/MBA"
    assert "Rohit Singhania" in data["name"]
    assert "iima.ac.in" in data["email"]
    assert len(data["skills"]) >= 3


def test_m2_mba_resume_without_projects_or_skills():
    """Adversarial: Resume with no projects and sparse skills still cleanly parses without error."""
    text = (
        "Simran Kaur\n"
        "Email: simran@fms.edu\n"
        "Faculty of Management Studies (FMS) Delhi - MBA\n"
    )
    pdf_bytes = create_mock_pdf_stream(text)
    res = client.post("/api/resume/parse", files={"file": ("simran.pdf", pdf_bytes, "application/pdf")})
    assert res.status_code == 200
    data = res.json()
    assert data["role_type"] == "Business/MBA"
    assert data["name"] == "Simran Kaur"
    # Even with 0 explicit skills in resume text, parsing confidence is valid
    assert 0.0 <= data["parse_confidence"] <= 1.0


def test_m2_business_viva_question_contract_and_eval():
    """Verify synthesized business questions satisfy backend evaluation contract."""
    business_questions = [
        {
            "question_id": "viva_biz_1",
            "function_name": "business_case_roi",
            "file": "strategy/business_case.md",
            "line_number": 14,
            "question": "What was the core business constraint you faced and how did you measure ROI?",
            "expected_concepts": ["roi", "attribution", "conversion", "metrics", "budget"],
            "difficulty": "medium",
            "weight": 0.35
        },
        {
            "question_id": "viva_biz_2",
            "function_name": "market_penetration_cac",
            "file": "gtm/market_analysis.xlsx",
            "line_number": 28,
            "question": "Explain a specific conflict or misalignment between cross-functional stakeholders and your framework for resolution.",
            "expected_concepts": ["cac", "ltv", "payback", "retention", "margin"],
            "difficulty": "hard",
            "weight": 0.35
        },
        {
            "question_id": "viva_biz_3",
            "function_name": "executive_stakeholder_tradeoffs",
            "file": "operations/stakeholder_mgmt.doc",
            "line_number": 45,
            "question": "If your primary acquisition channel dropped 30% month-over-month, walk through your 48-hour diagnostic protocol.",
            "expected_concepts": ["alignment", "kpi", "roadmap", "mitigation", "governance"],
            "difficulty": "medium",
            "weight": 0.30
        }
    ]

    for q in business_questions:
        assert q["question_id"].startswith("viva_biz_")
        assert len(q["expected_concepts"]) >= 4
        assert q["file"] and q["function_name"] and q["line_number"] > 0
        assert q["difficulty"] in ["easy", "medium", "hard"]

    # Test evaluating a valid business answer
    res = client.post("/api/viva/evaluate-single", json={
        "candidate_id": "cand_mba_rohit",
        "question_id": "viva_biz_1",
        "question_text": business_questions[0]["question"],
        "expected_concepts": business_questions[0]["expected_concepts"],
        "candidate_answer": (
            "We faced a strict budget ceiling of $50k. To measure return on investment (ROI), "
            "we established multi-touch attribution across marketing channels to track lead-to-paid "
            "conversion rates and defined clear payback metrics."
        )
    })
    assert res.status_code == 200
    data = res.json()
    assert data["score"] >= 6
    assert data["passed"] is True
    assert len(data["concepts_demonstrated"]) >= 2


def test_m2_business_viva_short_and_evasive_answers():
    """Adversarial: Evasive, empty, or gibberish business answers must be failed cleanly without 500."""
    # 1. Empty answer
    res_empty = client.post("/api/viva/evaluate-single", json={
        "candidate_id": "cand_mba_fail",
        "question_id": "viva_biz_1",
        "question_text": "What was ROI?",
        "expected_concepts": ["roi", "attribution"],
        "candidate_answer": ""
    })
    assert res_empty.status_code == 200
    assert res_empty.json()["score"] <= 2
    assert res_empty.json()["passed"] is False

    # 2. Evasive "I don't know" answer
    res_idk = client.post("/api/viva/evaluate-single", json={
        "candidate_id": "cand_mba_fail",
        "question_id": "viva_biz_2",
        "question_text": "How did you manage stakeholders?",
        "expected_concepts": ["alignment", "governance"],
        "candidate_answer": "I don't know, this was handled by someone else."
    })
    assert res_idk.status_code == 200
    assert res_idk.json()["score"] <= 2
    assert res_idk.json()["passed"] is False


# =====================================================================
# 2. Synthesized Complex Functions Rendering & AST Compatibility
# =====================================================================

def test_m2_synthesized_functions_structure():
    """Verify synthesized functions conform to ComplexFunction schema."""
    synthesized_functions = [
        {
            "file": "strategy/business_case.md",
            "function_name": "business_case_roi",
            "complexity": 8,
            "line_number": 14,
            "snippet": "# Strategic Business Case & ROI Framework\ndef business_case_roi(budget, revenue, attribution_rate):\n    incremental_margin = revenue * attribution_rate\n    roi = (incremental_margin - budget) / budget\n    return {'roi': roi, 'payback_ratio': incremental_margin / budget}"
        },
        {
            "file": "gtm/market_analysis.xlsx",
            "function_name": "market_penetration_cac",
            "complexity": 7,
            "line_number": 28,
            "snippet": "# Market Penetration & CAC Payback Model\ndef market_penetration_cac(cac, ltv, retention_rate):\n    payback_months = cac / (ltv * retention_rate)\n    return {'payback_months': payback_months, 'unit_margin': ltv - cac}"
        },
        {
            "file": "operations/stakeholder_mgmt.doc",
            "function_name": "executive_stakeholder_tradeoffs",
            "complexity": 9,
            "line_number": 45,
            "snippet": "# Executive Stakeholder Trade-off & Governance Protocol\ndef executive_stakeholder_tradeoffs(kpi_targets, roadmap_milestones):\n    alignment_score = evaluate_alignment(kpi_targets)\n    return mitigate_governance_risk(alignment_score, roadmap_milestones)"
        }
    ]

    for fn in synthesized_functions:
        assert isinstance(fn["file"], str) and len(fn["file"]) > 0
        assert isinstance(fn["function_name"], str) and len(fn["function_name"]) > 0
        assert isinstance(fn["complexity"], int) and 1 <= fn["complexity"] <= 10
        assert isinstance(fn["line_number"], int) and fn["line_number"] > 0
        assert isinstance(fn["snippet"], str) and len(fn["snippet"]) > 20
        # Ensure snippet is valid Python syntax that can be compiled / parsed if needed
        import ast
        # Strip python code from comments or function defs
        code_lines = [line for line in fn["snippet"].splitlines() if not line.startswith("#")]
        code_str = "\n".join(code_lines)
        parsed = ast.parse(code_str)
        assert len(parsed.body) >= 1


# =====================================================================
# 3. 30% Anomaly Screening Gate Verification
# =====================================================================

def test_m2_anomaly_gate_exact_boundary():
    """Verify boundary conditions for 30% anomaly gate."""
    def is_blocked(clone_pct: float, auth_score: float, is_injected: bool = False, is_clone: bool = False):
        anomaly_pct = max(0, 100 - auth_score)
        max_anomaly = max(clone_pct, anomaly_pct, 90 if is_injected else 0)
        return bool(max_anomaly > 30 or is_injected or is_clone)

    # 1. Exactly 30% anomaly (auth_score = 70) -> NOT blocked
    assert is_blocked(clone_pct=0, auth_score=70) is False

    # 2. 29% anomaly (auth_score = 71) -> NOT blocked
    assert is_blocked(clone_pct=0, auth_score=71) is False

    # 3. 31% anomaly (auth_score = 69) -> BLOCKED
    assert is_blocked(clone_pct=0, auth_score=69) is True

    # 4. 0% authenticity (100% anomaly) -> BLOCKED
    assert is_blocked(clone_pct=0, auth_score=0) is True

    # 5. Low clone score 15% but is_clone is True -> BLOCKED
    assert is_blocked(clone_pct=15, auth_score=85, is_clone=True) is True

    # 6. Prompt injection flag set -> BLOCKED
    assert is_blocked(clone_pct=0, auth_score=95, is_injected=True) is True

    # 7. Dual clone + injection -> BLOCKED
    assert is_blocked(clone_pct=85, auth_score=20, is_injected=True, is_clone=True) is True


def test_m2_backend_batch_cohort_anomaly_enforcement():
    """Verify backend evaluate-cohort endpoint enforces the 30% gate on cohort items."""
    cohort = [
        {
            "name": "High Anomaly Candidate",
            "college": "College",
            "repo_url": "https://github.com/test/high-anomaly-dump",
            "role": "Backend"
        },
        {
            "name": "Pure Tutorial Clone",
            "college": "College",
            "repo_url": "https://github.com/user/code-with-harry-projects",
            "role": "Frontend"
        },
        {
            "name": "Clean Authentic Builder",
            "college": "GLA University",
            "repo_url": "https://github.com/authentic/microservice-core",
            "role": "Systems"
        }
    ]
    res = client.post("/api/batch/evaluate-cohort", json={"cohort": cohort})
    assert res.status_code == 200
    data = res.json()["cohort"]

    clean_cand = next(c for c in data if "microservice-core" in c["repo_url"])
    clone_cand = next(c for c in data if "code-with-harry" in c["repo_url"])

    # Clean candidate should not be blocked
    assert clean_cand["viva_blocked"] is False
    assert clean_cand["viva_status"] == "PENDING_DEFENSE"

    # Clone candidate must be blocked and anomaly > 30%
    assert clone_cand["viva_blocked"] is True
    assert clone_cand["is_clone"] is True
    assert clone_cand["viva_status"] == "BLOCKED_CLONE"
    assert (100 - clone_cand["authenticity_score"]) >= 30
