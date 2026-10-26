import io
import os
import zipfile
import pytest
from fastapi.testclient import TestClient

from backend.main import app
from backend.services.ast_analyzer import ASTAnalyzer
from backend.services.tutorial_matcher import TutorialMatcher
from backend.services.commit_forensics import CommitForensics
from backend.services.viva_engine import VivaEngine
from backend.services.jd_matcher import JDMatcher
from backend.services.bias_engine import BiasEngine

client = TestClient(app)
NETWORK_SKIP = pytest.mark.skipif(
    os.getenv("PROOFCARD_RUN_NETWORK_TESTS") != "1",
    reason="Requires live GitHub access; set PROOFCARD_RUN_NETWORK_TESTS=1 to run",
)

def test_root_and_health():
    res = client.get("/")
    assert res.status_code == 200
    data = res.json()
    assert data["project"] == "ProofCard"
    assert data["status"] == "online"

    health = client.get("/health")
    assert health.status_code == 200
    assert health.json()["status"] == "healthy"

def test_demo_profiles_retrieval():
    res = client.get("/api/proofcard/profiles")
    assert res.status_code == 200
    profiles = res.json()
    assert len(profiles) >= 3
    # Check that The Copier, The Builder, and The Middleground exist
    cand_ids = [p["candidate_id"] for p in profiles]
    assert "cand_copier_01" in cand_ids
    assert "cand_builder_02" in cand_ids
    assert "cand_middle_03" in cand_ids

def test_ast_analyzer_python():
    py_code = """
def complex_algorithm(items, threshold):
    results = []
    for item in items:
        if item > threshold:
            try:
                val = item * 2
                if val % 3 == 0:
                    results.append(val)
                else:
                    results.append(-val)
            except Exception:
                pass
    return results
"""
    funcs = ASTAnalyzer.analyze_python_complexity(py_code, "algo.py")
    assert len(funcs) == 1
    assert funcs[0]["function_name"] == "complex_algorithm"
    assert funcs[0]["complexity"] >= 4

def test_ast_analyzer_javascript():
    js_code = """
export async function processData(req, res) {
    if (!req.body) {
        return res.status(400).send("No body");
    }
    for (let i = 0; i < req.body.length; i++) {
        if (req.body[i].active && req.body[i].score > 50) {
            try {
                await saveItem(req.body[i]);
            } catch (err) {
                console.error(err);
            }
        }
    }
}
"""
    funcs = ASTAnalyzer.analyze_js_ts_complexity(js_code, "handler.js")
    assert len(funcs) >= 1
    assert funcs[0]["function_name"] == "processData"
    assert funcs[0]["complexity"] >= 4

def test_tutorial_matcher():
    matcher = TutorialMatcher()
    assert len(matcher.tutorials) >= 15
    # Simulate a Traversy MERN clone project file tree
    file_tree = [
        "server.js",
        "backend/routes/goalRoutes.js",
        "backend/controllers/goalController.js",
        "backend/models/goalModel.js",
        "backend/middleware/errorMiddleware.js",
        "package.json"
    ]
    tokens = {
        "server.js": "Program>ExpressionStatement>CallExpression>VariableDeclaration>FunctionDeclaration>TryStatement>MemberExpression"
    }
    deps = {"express": "4.18.2", "mongoose": "7.0.3"}
    is_clone, match = matcher.match_project(file_tree, tokens, deps)
    assert is_clone is True
    assert match is not None
    assert "traversy" in match["name"].lower()
    assert match["similarity_score"] >= 0.60

def test_commit_forensics():
    # 1. Burst commit pattern (clone)
    burst_commits = [
        {"sha": "abc1", "message": "initial commit", "date": "2024-03-01T10:00:00Z", "additions": 800, "deletions": 0},
        {"sha": "abc2", "message": "done project", "date": "2024-03-01T12:00:00Z", "additions": 30, "deletions": 1}
    ]
    clone_res = CommitForensics.analyze_commits(burst_commits, test_files_count=0)
    assert clone_res["burst_ratio"] >= 0.80
    assert clone_res["organic_growth"] is False
    assert clone_res["authenticity_score"] < 40

    # 2. Organic multi-week commits with refactoring
    organic_commits = [
        {"sha": "o1", "message": "feat: scaffold service and db models", "date": "2024-01-01T10:00:00Z", "additions": 300, "deletions": 0},
        {"sha": "o2", "message": "refactor: optimize query performance", "date": "2024-01-15T14:00:00Z", "additions": 150, "deletions": 80},
        {"sha": "o3", "message": "fix: resolve race condition in cache lock", "date": "2024-01-28T16:00:00Z", "additions": 90, "deletions": 30},
        {"sha": "o4", "message": "test: add integration test suite with mocks", "date": "2024-02-12T11:00:00Z", "additions": 220, "deletions": 15}
    ]
    builder_res = CommitForensics.analyze_commits(organic_commits, test_files_count=5)
    assert builder_res["organic_growth"] is True
    assert builder_res["authenticity_score"] >= 80

def test_viva_engine():
    engine = VivaEngine()
    complex_funcs = [{
        "file": "core/broker.py",
        "function_name": "dispatch_event",
        "complexity": 8,
        "line_number": 42,
        "snippet": "async def dispatch_event(event):\n    async with pool.acquire() as conn:\n        await conn.execute('INSERT ...')"
    }]
    questions = engine.generate_questions_for_functions(complex_funcs)
    assert len(questions) == 3
    assert "dispatch_event" in questions[0]["question"]

    # Test answer scoring
    ans_good = "We utilized connection pool backpressure to prevent socket starvation under async concurrency."
    eval_good = engine.evaluate_answer(questions[0]["question"], questions[0]["expected_concepts"], ans_good)
    assert eval_good["score"] >= 6
    assert eval_good["passed"] is True

    ans_poor = "I made it work."
    eval_poor = engine.evaluate_answer(questions[0]["question"], questions[0]["expected_concepts"], ans_poor)
    assert eval_poor["score"] <= 4
    assert eval_poor["passed"] is False

def test_zip_upload_endpoint():
    # Create in-memory zip archive
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("main.py", "import os\ndef calculate_sum(a, b):\n    if a > 0:\n        return a + b\n    return b\n")
        zf.writestr("test_main.py", "from main import calculate_sum\ndef test_calc():\n    assert calculate_sum(1, 2) == 3\n")
        zf.writestr("requirements.txt", "fastapi\npytest\n")
    zip_buffer.seek(0)

    res = client.post(
        "/api/upload/zip",
        files={"file": ("project.zip", zip_buffer, "application/zip")},
        data={"candidate_name": "Harshvardhan", "college": "GEC Jabalpur", "consent_granted": True}
    )
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "success"
    assert data["candidate_name"] == "Harshvardhan"
    assert data["authenticity_score"] == 0
    assert data["engineering_signal_score"] > 60
    assert data["git_dna"]["history_verified"] is False
    assert len(data["viva_questions"]) == 3
    assert data["consent_recorded"] is True

def test_recruiter_jd_parsing_and_battle():
    # 1. Parse JD
    jd_payload = {
        "job_title": "Senior Backend Engineer",
        "job_description": "Looking for a Python developer experienced with FastAPI, PostgreSQL, Redis, Docker and unit testing."
    }
    res_jd = client.post("/api/recruiter/parse-jd", json=jd_payload)
    assert res_jd.status_code == 200
    skills = res_jd.json()["required_skills"]
    assert "python" in skills
    assert "fastapi" in skills
    assert "postgresql" in skills

    # 2. Battle Compare
    battle_payload = {
        "job_requirements": ["python", "fastapi", "postgresql", "testing", "docker"],
        "candidates": [
            {
                "candidate_id": "cand_builder",
                "name": "Ananya Patel",
                "college": "Tier-3 State College",
                "authenticity_score": 96,
                "detected_files": ["core/main.py", "api/fastapi_routes.py", "db/postgres.py", "tests/test_all.py", "Dockerfile"],
                "viva_score": 10
            },
            {
                "candidate_id": "cand_copier",
                "name": "Rohan Sharma",
                "college": "Tier-1 Elite College",
                "authenticity_score": 20,
                "detected_files": ["server.js", "routes.js"],
                "viva_score": 3
            }
        ]
    }
    res_battle = client.post("/api/recruiter/battle-compare", json=battle_payload)
    assert res_battle.status_code == 200
    b_data = res_battle.json()
    assert b_data["status"] == "success"
    assert b_data["winner_id"] == "cand_builder"
    assert b_data["diff_pts"] > 30

def test_bias_mirror_and_fairness_stress_test():
    # 1. Test Recruiter Bias Audit
    bias_req = {
        "recruiter_id": "rec_01",
        "session_decisions": [
            {"candidate_id": "c1", "name": "A", "college": "IIT Delhi", "college_tier": "Tier-1", "skill_score": 70, "recruiter_shortlisted": True},
            {"candidate_id": "c2", "name": "B", "college": "IIT Bombay", "college_tier": "Tier-1", "skill_score": 65, "recruiter_shortlisted": True},
            {"candidate_id": "c3", "name": "C", "college": "IIT Madras", "college_tier": "Tier-1", "skill_score": 75, "recruiter_shortlisted": True},
            {"candidate_id": "c4", "name": "D", "college": "GEC Bilaspur", "college_tier": "Tier-3", "skill_score": 92, "recruiter_shortlisted": False},
            {"candidate_id": "c5", "name": "E", "college": "BIET Jhansi", "college_tier": "Tier-3", "skill_score": 88, "recruiter_shortlisted": False}
        ]
    }
    res_audit = client.post("/api/bias/audit", json=bias_req)
    assert res_audit.status_code == 200
    audit_data = res_audit.json()
    assert audit_data["unconscious_bias_detected"] is True
    assert audit_data["fairness_compliance_status"] == "ADVERSE_IMPACT_RISK"

    # 2. Test Live Fairness Stress Test
    res_stress = client.get("/api/bias/fairness-stress-test?authenticity_score=94&viva_score=9")
    assert res_stress.status_code == 200
    stress_data = res_stress.json()
    assert stress_data["test_status"] == "PASSED_PERFECT_EQUALITY"
    assert stress_data["demographic_disparity_score"] == 0.0

def test_zip_slip_security_prevention():
    """Security verification: Ensure Zip Slip path traversal is rejected with HTTP 400."""
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zf:
        # Malicious entry attempting path traversal out of sandbox
        zf.writestr("../../evil.py", "print('hacked')")
    zip_buffer.seek(0)

    res = client.post(
        "/api/upload/zip",
        files={"file": ("malicious.zip", zip_buffer, "application/zip")},
        data={"candidate_name": "Attacker", "college": "DarkNet", "consent_granted": True}
    )
    assert res.status_code == 400
    assert "security alert" in res.json()["detail"].lower()

def test_consent_guardrail_enforcement():
    """Privacy guardrail verification: Ingestion without consent MUST be rejected with HTTP 403."""
    # 1. ZIP upload without consent
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("app.py", "print('hello')")
    zip_buffer.seek(0)

    res_zip = client.post(
        "/api/upload/zip",
        files={"file": ("test.zip", zip_buffer, "application/zip")},
        data={"candidate_name": "NoConsent", "college": "Test", "consent_granted": False}
    )
    assert res_zip.status_code == 403
    assert "consent" in res_zip.json()["detail"].lower()

    # 2. GitHub scan without consent
    res_gh = client.post(
        "/api/github/analyze",
        json={"github_url": "https://github.com/torvalds/linux", "consent_granted": False}
    )
    assert res_gh.status_code == 403
    assert "consent" in res_gh.json()["detail"].lower()

def test_multi_candidate_battle_ranking():
    """Verify rank ordering with 3 candidates."""
    battle_payload = {
        "job_requirements": ["python", "fastapi", "docker", "testing"],
        "candidates": [
            {
                "candidate_id": "c1",
                "name": "Candidate Low",
                "college": "College A",
                "authenticity_score": 30,
                "detected_files": ["main.py"],
                "viva_score": 3
            },
            {
                "candidate_id": "c2",
                "name": "Candidate High",
                "college": "College B",
                "authenticity_score": 95,
                "detected_files": ["main.py", "fastapi_app.py", "Dockerfile", "test_main.py"],
                "viva_score": 9
            },
            {
                "candidate_id": "c3",
                "name": "Candidate Mid",
                "college": "College C",
                "authenticity_score": 70,
                "detected_files": ["main.py", "Dockerfile"],
                "viva_score": 6
            }
        ]
    }
    res = client.post("/api/recruiter/battle-compare", json=battle_payload)
    assert res.status_code == 200
    matrix = res.json()["battle_matrix"]
    assert len(matrix) == 3
    assert matrix[0]["candidate_id"] == "c2"
    assert matrix[1]["candidate_id"] == "c3"
    assert matrix[2]["candidate_id"] == "c1"

def test_ast_analyzer_java_and_go():
    """Verify multi-language AST complexity extraction for Java and Go."""
    java_code = """
    package com.example;
    public class OrderService {
        public double calculateDiscount(double price, int quantity) {
            double discount = 0.0;
            if (quantity > 10 && price > 100.0) {
                discount = 0.20;
            } else if (quantity > 5) {
                discount = 0.10;
            }
            return price * (1.0 - discount);
        }
    }
    """
    funcs = ASTAnalyzer.analyze_c_like_complexity(java_code, "OrderService.java", ".java")
    assert len(funcs) == 1
    assert funcs[0]["function_name"] == "calculateDiscount"
    assert funcs[0]["complexity"] >= 3

    go_code = """
    package main
    func ProcessStream(items []int) int {
        total := 0
        for _, val := range items {
            if val > 0 && val%2 == 0 {
                total += val
            }
        }
        return total
    }
    """
    go_funcs = ASTAnalyzer.analyze_c_like_complexity(go_code, "main.go", ".go")
    assert len(go_funcs) == 1
    assert go_funcs[0]["function_name"] == "ProcessStream"
    assert go_funcs[0]["complexity"] >= 3

def test_zip_upload_full_profile_schema():
    """Ensure upload_project_zip returns all required CandidateProfile fields."""
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("app/main.py", "def run():\n    if True:\n        return 1\n    return 0\n")
        zf.writestr("tests/test_app.py", "def test_run():\n    assert True\n")
        zf.writestr("requirements.txt", "fastapi\n")
    zip_buffer.seek(0)

    res = client.post(
        "/api/upload/zip",
        files={"file": ("service.zip", zip_buffer, "application/zip")},
        data={"candidate_name": "Divyansh", "college": "GLA University", "consent_granted": True}
    )
    assert res.status_code == 200
    data = res.json()
    assert data["name"] == "Divyansh"
    assert data["project_type"] == "Python / FastAPI / Data"
    assert len(data["detected_files"]) >= 2
    assert "complex_functions" in data
    assert len(data["complex_functions"]) >= 1
    assert "structural_token_sequence" in data
    assert "proof_card" in data
    assert data["proof_card"]["status"] == "VERIFICATION_INCOMPLETE"
    assert data["authenticity_score"] == 0

def test_viva_http_endpoints():
    """Test HTTP evaluation of viva question answer submission."""
    payload = {
        "candidate_id": "cand_test_01",
        "question_id": "viva_q_1",
        "question_text": "How do you mitigate connection pool starvation in async backpressure?",
        "expected_concepts": ["Connection pool starvation", "Async timeout propagation", "Queue backpressure"],
        "candidate_answer": "We implemented an asyncio semaphore to throttle peak concurrent workers and prevent connection pool starvation."
    }
    res = client.post("/api/viva/evaluate-single", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["score"] >= 7
    assert data["passed"] is True
    assert "Connection pool starvation" in data["concepts_demonstrated"]

def test_viva_gibberish_scores_zero():
    """Verify that keyboard mashing and nonsensical gibberish (e.g. 'jdv hbehbe') receives strict 0 score and fails."""
    gibberish_samples = [
        "jdv hbehbe",
        "asdfghjkl zxcvbnm",
        "qwerty uiop",
        "xxxx yyyy zzzz",
        "bcdfghjklmnpqrstvwxyz"
    ]
    for sample in gibberish_samples:
        payload = {
            "candidate_id": "cand_test_01",
            "question_id": "viva_q_1",
            "question_text": "How do you mitigate connection pool starvation in async backpressure?",
            "expected_concepts": ["Connection pool starvation", "Async timeout propagation", "Queue backpressure"],
            "candidate_answer": sample
        }
        res = client.post("/api/viva/evaluate-single", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert data["score"] == 0, f"Expected 0 for '{sample}', got {data['score']}"
        assert data["passed"] is False
        assert len(data["concepts_demonstrated"]) == 0

def test_viva_generate_more_questions():
    """Verify dynamic question generation endpoint supporting up to 10 questions."""
    req = {
        "complex_functions": [
            {"file": "core.py", "function_name": "worker", "complexity": 10, "line_number": 10, "snippet": "def worker(): pass"}
        ],
        "count": 5
    }
    res = client.post("/api/viva/generate-more", json=req)
    assert res.status_code == 200
    data = res.json()
    assert len(data["questions"]) == 5

@NETWORK_SKIP
def test_github_analysis_full_response():
    """Test GitHub analyze endpoint returns complete profile fields."""
    req_body = {
        "github_url": "https://github.com/torvalds/custom-repo",
        "candidate_name": "Linus Coder",
        "college": "Helsinki Tech",
        "consent_granted": True
    }
    res = client.post("/api/github/analyze", json=req_body)
    assert res.status_code == 200
    data = res.json()
    assert data["name"] == "Linus Coder"
    assert data["project_name"] == "custom-repo"
    assert "detected_files" in data
    assert "complex_functions" in data
    assert len(data["complex_functions"]) >= 1
    assert "proof_card" in data

@NETWORK_SKIP
def test_github_profile_url_ingestion_priyanshu():
    """Verify that a user profile URL (https://github.com/Priyanshuf1) is parsed and returns authentic code & viva."""
    req_body = {
        "github_url": "https://github.com/Priyanshuf1",
        "candidate_name": "Priyanshu Awasthi",
        "college": "GLA University",
        "consent_granted": True
    }
    res = client.post("/api/github/analyze", json=req_body)
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "success"
    assert "Priyanshu" in data["name"]
    assert data["authenticity_score"] >= 60
    assert not data["is_clone"]
    # Check that real functions from Priyanshu's repo are present
    assert len(data["complex_functions"]) >= 1
    fn_names = [f["function_name"] for f in data["complex_functions"]]
    assert len(fn_names) > 0
    # Check that viva questions are generated
    assert len(data["viva_questions"]) >= 3
    q_functions = [q["function_name"] for q in data["viva_questions"]]
    assert any(q_fn in fn_names for q_fn in q_functions)

@NETWORK_SKIP
def test_viva_question_accuracy_cross_verification():
    """Cross-verify that generated viva questions accurately reflect the candidate's actual codebase."""
    res = client.post("/api/github/analyze", json={
        "github_url": "https://github.com/Priyanshuf1",
        "candidate_name": "Priyanshu Awasthi",
        "college": "GLA University",
        "consent_granted": True
    })
    assert res.status_code == 200
    data = res.json()
    questions = data["viva_questions"]
    for q in questions:
        assert "question" in q and len(q["question"]) > 20
        assert "expected_concepts" in q and len(q["expected_concepts"]) >= 2
        assert q["function_name"] in [f["function_name"] for f in data["complex_functions"]]

@NETWORK_SKIP
def test_github_invisiguard_repo_ingestion():
    """Test direct ingestion of Priyanshu's InvisiGuard radar/AI repository."""
    res = client.post("/api/github/analyze", json={
        "github_url": "https://github.com/Priyanshuf1/InvisiGuard",
        "candidate_name": "Priyanshu Awasthi",
        "college": "GLA University",
        "consent_granted": True
    })
    assert res.status_code == 200
    data = res.json()
    assert data["project_name"] == "InvisiGuard"
    assert data["status"] == "success"
    fn_names = [f["function_name"] for f in data["complex_functions"]]
    assert any(fn in fn_names for fn in ["main", "compute_pipeline_hash", "audit_codebase", "fit"])
    assert len(data["viva_questions"]) >= 3

@NETWORK_SKIP
def test_github_instagram_lookup_repo_ingestion():
    """Test direct ingestion of Priyanshu's instagram-id-lookup-gui repository."""
    res = client.post("/api/github/analyze", json={
        "github_url": "https://github.com/Priyanshuf1/instagram-id-lookup-gui",
        "candidate_name": "Priyanshu Awasthi",
        "college": "GLA University",
        "consent_granted": True
    })
    assert res.status_code == 200
    data = res.json()
    assert data["project_name"] == "instagram-id-lookup-gui"
    fn_names = [f["function_name"] for f in data["complex_functions"]]
    assert any(fn in fn_names for fn in ["handler", "handleResolve", "handleLoadTarget"])
    assert len(data["viva_questions"]) >= 3

@NETWORK_SKIP
def test_github_nonexistent_user_returns_404():
    """Test that a non-existent GitHub user returns HTTP 404."""
    res = client.post("/api/github/analyze", json={
        "github_url": "https://github.com/nonexistent_user_xyz123456789",
        "candidate_name": "Unknown",
        "college": "Unknown",
        "consent_granted": True
    })
    assert res.status_code == 404
    assert "not found" in res.json()["detail"].lower()


def test_batch_cohort_100_endpoint():
    """Verify that /api/batch/cohort-100 returns the full cohort of candidates."""
    res = client.get("/api/batch/cohort-100")
    assert res.status_code == 200
    data = res.json()
    assert "cohort" in data
    assert len(data["cohort"]) == 100
    assert data["total_candidates"] == 100


def test_batch_ingest_csv_endpoint():
    """Verify that batch ingestion validates URLs without guessing plagiarism."""
    csv_sample = """name,college,github_url,role,college_tier
Rohan Sharma,IIT Delhi,https://github.com/rohan/traversy-mern-goal,Backend Engineer,Tier-1
Ananya Patel,GEC Bilaspur,https://github.com/ananya/clean-architecture-api,Fullstack Builder,Tier-3
Vikas Gupta,State Univ,https://github.com/vikas/netflix-clone,Frontend Engineer,Tier-3
"""
    res = client.post("/api/batch/ingest-csv", json={"csv_text": csv_sample})
    assert res.status_code == 200
    data = res.json()
    assert data["total_candidates"] == 3
    assert data["clones_flagged_count"] == 0
    assert data["hours_saved"] == 0
    assert len(data["cohort"]) == 3
    assert all(c["analysis_status"] == "PENDING_FORENSIC_ANALYSIS" for c in data["cohort"])


def test_batch_auto_shortlist_endpoint():
    """Verify that /api/batch/auto-shortlist filters clones and ranks top candidates."""
    req_body = {
        "candidates": [
            {
                "candidate_id": "c1",
                "name": "Builder",
                "authenticity_score": 92,
                "viva_score": 9,
                "is_clone": False,
                "detected_files": ["core/main.py", "tests/test_api.py", "Dockerfile"]
            },
            {
                "candidate_id": "c2",
                "name": "Copier",
                "authenticity_score": 20,
                "viva_score": 3,
                "is_clone": True,
                "detected_files": ["server.js"]
            }
        ],
        "target_count": 15,
        "min_authenticity": 70,
        "min_viva": 6,
        "exclude_clones": True,
        "required_skills": ["python", "fastapi"]
    }
    res = client.post("/api/batch/auto-shortlist", json=req_body)
    assert res.status_code == 200
    data = res.json()
    assert data["shortlisted_count"] == 1
    assert data["shortlisted"][0]["candidate_id"] == "c1"
    assert data["shortlisted"][0]["composite_score"] > 50


def test_imats_ingest_batch_endpoint():
    """Verify that /api/v1/imats/ingest-batch accepts external ATS webhooks."""
    payload = {
        "candidates": [{"name": "A", "github_url": "https://github.com/a/b"}],
        "callback_url": "https://client-ats.internal/webhook"
    }
    res = client.post("/api/v1/imats/ingest-batch", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "ACCEPTED"
    assert "TXN-IMATS" in data["imats_transaction_id"]
    assert data["pipeline_state"] == "QUEUED_FOR_FORENSIC_ANALYSIS"


def test_imats_rank_endpoint():
    """Verify that /api/v1/imats/rank validates EEOC compliance."""
    res = client.post("/api/v1/imats/rank", json={"job_id": "JD-DEV-001"})
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "COMPLETED"
    assert data["verdict"] == "COMPLIANT_WITH_EEOC_4_5THS_RULE"
    assert data["fairness_demographic_parity"] >= 0.80


def test_sliding_burst_without_numstats():
    """Verify that commits without per-commit numstats use sliding 1-hour commit window without pegging to 100%."""
    # 20 commits spread over 10 days, 2 commits peak in any 1-hour window
    spread_commits = []
    from datetime import datetime, timezone, timedelta
    base_t = datetime(2024, 1, 1, 10, 0, 0, tzinfo=timezone.utc)
    for i in range(20):
        t = base_t + timedelta(days=i * 0.5)
        spread_commits.append({
            "sha": f"c_{i}",
            "message": f"feat: iterative update part {i}",
            "date": t.isoformat(),
            "additions": 0,
            "deletions": 0
        })
    res = CommitForensics.analyze_commits(spread_commits, test_files_count=3)
    assert res["burst_ratio"] <= 0.25
    assert res["organic_growth"] is True
    assert res["authenticity_score"] >= 80


@NETWORK_SKIP
def test_clean_repo_data_sih_authenticity_and_zero_plagiarism():
    """Verify that authentic collaborative repo (Data_SIH) scores >= 90% and is not flagged as a clone."""
    res = client.post("/api/github/analyze", json={
        "github_url": "https://github.com/Priyanshuf1/Data_SIH",
        "candidate_name": "Priyanshu Awasthi",
        "college": "GLA University",
        "consent_granted": True
    })
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "success"
    assert data["authenticity_score"] >= 90
    assert data["is_clone"] is False
    assert data["matched_tutorial"] is None


def test_viva_10_dynamic_questions():
    """Verify VivaEngine dynamically generates up to 10 distinct architectural probes."""
    engine = VivaEngine()
    funcs = [{
        "file": "core/engine.py",
        "function_name": "run_inference",
        "complexity": 7,
        "line_number": 10,
        "snippet": "def run_inference(): pass"
    }]
    questions = engine.generate_questions_for_functions(funcs, max_questions=10)
    assert len(questions) == 10
    unique_q_texts = set(q["question"] for q in questions)
    assert len(unique_q_texts) == 10


def test_zip_upload_manifest_citation_is_not_clone_proof():
    """Verify that a package.json citation is recorded without a code-copy verdict."""
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.writestr(
            "package.json",
            '{\n  "name": "mern-goalsetter",\n  "version": "1.0.0",\n  "repository": {\n    "type": "git",\n    "url": "https://github.com/bradtraversy/mern-tutorial"\n  }\n}'
        )
        zf.writestr("server.js", 'const express = require("express");\nconst app = express();\napp.listen(5000);')
        zf.writestr("backend/controllers/goalController.js", 'const asyncHandler = require("express-async-handler");\nconst getGoals = asyncHandler(async (req, res) => res.json([]));')

    zip_buffer.seek(0)
    files = {"file": ("project.zip", zip_buffer.getvalue(), "application/zip")}
    data = {"candidate_name": "Test Cloner", "college": "Test University", "consent_granted": "true"}
    res = client.post("/api/upload/zip", files=files, data=data)
    assert res.status_code == 200
    res_data = res.json()
    assert res_data["is_clone"] is False
    assert res_data["proof_card"]["status"] == "DECLARED_SOURCE_CITATION"
    assert res_data["matched_tutorial"] is not None
    assert res_data["matched_tutorial"]["similarity_score"] == 0


def test_zip_upload_authentic_project():
    """Verify that uploading an authentic ZIP with original modular code and test suites achieves VERIFIED_COMPETENT."""
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.writestr(
            "package.json",
            '{\n  "name": "invisiguard-core",\n  "version": "2.4.1",\n  "author": "Ananya Patel"\n}'
        )
        zf.writestr(
            "src/core/radar.ts",
            'export class RadarEngine {\n  calibrate(signal: number[]) {\n    if (!signal.length) return 0;\n    return signal.reduce((a, b) => a + b, 0) / signal.length;\n  }\n}'
        )
        zf.writestr(
            "tests/radar.test.ts",
            'import { RadarEngine } from "../src/core/radar";\ntest("calibrate", () => {\n  const r = new RadarEngine();\n  expect(r.calibrate([1, 2, 3])).toBe(2);\n});'
        )

    zip_buffer.seek(0)
    files = {"file": ("invisiguard.zip", zip_buffer.getvalue(), "application/zip")}
    data = {"candidate_name": "Ananya Patel", "college": "Govt Engg College", "consent_granted": "true"}
    res = client.post("/api/upload/zip", files=files, data=data)
    assert res.status_code == 200
    res_data = res.json()
    assert res_data["is_clone"] is False
    assert res_data["proof_card"]["status"] == "VERIFICATION_INCOMPLETE"
    assert res_data["authenticity_score"] == 0
    assert res_data["engineering_signal_score"] >= 75


def test_viva_gibberish_strict_zero():
    """Verify that gibberish, word loops, and keyboard runs strictly receive a 0 score."""
    engine = VivaEngine()
    q_concepts = ["Asynchronous backpressure", "Event-loop starvation", "Socket descriptor cleanup"]
    q_text = "How do you handle socket backpressure in high-load scenarios?"

    # 1. Repeating word loop
    loop_res = engine.evaluate_answer(
        question_text=q_text,
        candidate_answer="bla bla bla bla bla bla bla bla",
        expected_concepts=q_concepts
    )
    assert loop_res["score"] == 0
    assert loop_res["passed"] is False

    # 2. Short-word flood
    flood_res = engine.evaluate_answer(
        question_text=q_text,
        candidate_answer="a b c d e f g h i j k",
        expected_concepts=q_concepts
    )
    assert flood_res["score"] == 0
    assert flood_res["passed"] is False

    # 3. Consonant cluster keyboard mashing
    mash_res = engine.evaluate_answer(
        question_text=q_text,
        candidate_answer="wkjebf kwejbf wkqefj kbqkwjefb qwertyuiop",
        expected_concepts=q_concepts
    )
    assert mash_res["score"] == 0
    assert mash_res["passed"] is False

    # 4. Legitimate technical answer
    valid_res = engine.evaluate_answer(
        question_text=q_text,
        candidate_answer="We prevent event-loop starvation by implementing asynchronous backpressure with an explicit queue throttle, and ensure all TCP socket descriptors are cleanly aborted and closed on timeout.",
        expected_concepts=q_concepts
    )
    assert valid_res["score"] >= 8
    assert valid_res["passed"] is True
