import pytest
from backend.services.viva_engine import VivaEngine
from backend.services.commit_forensics import CommitForensics
from backend.services.ast_analyzer import ASTAnalyzer

def test_buzzword_stuffing_prevention():
    v = VivaEngine()
    q = "In asynchronous UI handler, how do you guard against race conditions?"
    exp = [
        "Concurrency debounce / locks",
        "Request cancellation (AbortController)",
        "Defensive state isolation",
        "Idempotent state updates"
    ]

    # Adversarial buzzword stuffing: stringing together keywords without real verbs/clauses
    stuffed_ans = "concurrency debounce locks abortcontroller state isolation idempotent race condition mutex lock"
    res = v.evaluate_answer(q, exp, stuffed_ans)
    assert res["score"] <= 2, f"Expected <= 2 for buzzword stuffing, got {res['score']}"
    assert not res["passed"]
    assert "keyword stuffing" in res["feedback"].lower() or "disconnected" in res["feedback"].lower()

    # Legitimate authentic answer with verbs and grammar
    legit_ans = (
        "We use an AbortController to cancel inflight fetch requests when user queries change, "
        "and wrap state mutations in an isMounted guard to eliminate race conditions."
    )
    res_legit = v.evaluate_answer(q, exp, legit_ans)
    assert res_legit["score"] >= 8, f"Expected >= 8 for authentic answer, got {res_legit['score']}"
    assert res_legit["passed"]

def test_squashed_commit_fairness():
    # 1 single commit with test files and good message
    single_commit = [{
        "sha": "a1b2c3d",
        "message": "feat: release v1.0.0 with full test suite and documentation",
        "date": "2024-03-01T12:00:00Z",
        "additions": 1500,
        "deletions": 0
    }]
    res = CommitForensics.analyze_commits(single_commit, test_files_count=3)
    # Shouldn't be punished to 13/100
    assert res["authenticity_score"] >= 60, f"Expected >= 60 for squashed release, got {res['authenticity_score']}"
    assert "compressed" in res["summary"].lower() or "squashed" in res["summary"].lower()

def test_ast_analyzer_comment_and_string_stripping():
    # JS code where strings and comments have keywords that shouldn't inflate cyclomatic complexity
    js_code = """
    function computeTotal(items) {
        // while looping, if error happens, catch it
        const debugMsg = "if something fails, check for error and retry";
        return items.length;
    }
    """
    results = ASTAnalyzer.analyze_js_ts_complexity(js_code, "test.js")
    assert len(results) == 1
    # Complexity should be 1, because the keywords were inside comments/strings!
    assert results[0]["complexity"] == 1, f"Expected complexity 1, got {results[0]['complexity']}"
