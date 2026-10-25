import pytest
from fastapi.testclient import TestClient
from backend.main import app
from backend.services.viva_engine import VivaEngine

client = TestClient(app)

def test_viva_non_answers_and_gibberish_strict_zero():
    engine = VivaEngine()
    expected = [
        "Deterministic byte canonicalization",
        "Constant-time comparison",
        "Tamper-evident verification",
        "Cross-platform newline normalization"
    ]
    q = "In cryptographic routine 'compute_pipeline_hash', how do you ensure the computed verification hash is deterministic across platforms and resistant to state tampering?"

    non_answers = [
        "I am Groot",
        "i am groot",
        "idk",
        "i don't know",
        "no idea",
        "not sure",
        "dunno",
        "skip",
        "asdfghjkl",
        "qwertyuiop zxcvbnm",
        "jdv hbehbe",
        "never gonna give you up",
        "why did the chicken cross the road",
        "haha lol lmao",
        "test test test test",
        "a b c d e f"
    ]

    for ans in non_answers:
        res = engine.evaluate_answer(q, expected, ans)
        assert res["score"] == 0, f"Expected 0 for '{ans}', got {res['score']}"
        assert res["passed"] is False
        assert len(res["concepts_demonstrated"]) == 0

def test_stop_words_cannot_leak_substrings():
    engine = VivaEngine()
    expected = [
        "Deterministic byte canonicalization",
        "Constant-time comparison",
        "Tamper-evident verification",
        "Cross-platform newline normalization"
    ]
    q = "In cryptographic routine, how do you ensure verification hash is deterministic and resistant to state tampering?"

    # The infamous 'I am Groot' or 'in to is am' test:
    # 'am' was leaking into 'tamper'
    # 'in' was leaking into 'deterministic'
    # 'is' was leaking into 'deterministic'
    # 'to' was leaking into 'cryptographic'
    stop_phrase = "i am in to is"
    res = engine.evaluate_answer(q, expected, stop_phrase)
    assert res["score"] == 0
    assert len(res["concepts_demonstrated"]) == 0

def test_mediocre_buzzword_answer_grading():
    engine = VivaEngine()
    expected = [
        "Deterministic byte canonicalization",
        "Constant-time comparison",
        "Tamper-evident verification",
        "Cross-platform newline normalization"
    ]
    q = "In cryptographic routine, how do you ensure verification hash is deterministic and resistant to state tampering?"

    # A candidate just mentioning one concept without rationale
    weak_ans = "we used a sha256 hash for verification"
    res = engine.evaluate_answer(q, expected, weak_ans)
    assert 2 <= res["score"] <= 4, f"Expected 2-4 for weak answer, got {res['score']}"
    assert res["passed"] is False
    assert len(res["concepts_demonstrated"]) >= 1

def test_solid_technical_answer_grading():
    engine = VivaEngine()
    expected = [
        "Deterministic byte canonicalization",
        "Constant-time comparison",
        "Tamper-evident verification",
        "Cross-platform newline normalization"
    ]
    q = "In cryptographic routine, how do you ensure verification hash is deterministic and resistant to state tampering?"

    solid_ans = (
        "We sort dictionary keys and encode strings into utf-8 bytes before hashing with sha256 "
        "to guarantee deterministic canonical output across different OS platforms, preventing state tampering."
    )
    res = engine.evaluate_answer(q, expected, solid_ans)
    assert 6 <= res["score"] <= 8, f"Expected 6-8 for solid answer, got {res['score']}"
    assert res["passed"] is True
    assert len(res["concepts_demonstrated"]) >= 2

def test_expert_technical_answer_grading():
    engine = VivaEngine()
    expected = [
        "Deterministic byte canonicalization",
        "Constant-time comparison",
        "Tamper-evident verification",
        "Cross-platform newline normalization"
    ]
    q = "In cryptographic routine, how do you ensure verification hash is deterministic and resistant to state tampering?"

    expert_ans = (
        "To ensure verification hashes are strictly deterministic across platforms, we canonicalize the AST payload "
        "by sorting object keys and normalizing CRLF line endings to LF before computing a SHA-256 digest. "
        "We also employ constant-time comparison (hmac.compare_digest) to eliminate timing attack vectors "
        "and ensure tamper-evident state integrity against replay payloads."
    )
    res = engine.evaluate_answer(q, expected, expert_ans)
    assert 8 <= res["score"] <= 10, f"Expected 8-10 for expert answer, got {res['score']}"
    assert res["passed"] is True
    assert len(res["concepts_demonstrated"]) >= 3

def test_api_viva_evaluate_single_endpoint():
    payload = {
        "candidate_id": "cand_eval_01",
        "question_id": "viva_q_1",
        "question_text": "In cryptographic routine, how do you ensure verification hash is deterministic?",
        "expected_concepts": [
            "Deterministic byte canonicalization",
            "Constant-time comparison",
            "Tamper-evident verification"
        ],
        "candidate_answer": "I am Groot"
    }
    res = client.post("/api/viva/evaluate-single", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["score"] == 0
    assert data["passed"] is False

    # Now test with solid answer
    payload["candidate_answer"] = (
        "We canonicalize object keys deterministically and use sha256 hashing to ensure state integrity."
    )
    res_solid = client.post("/api/viva/evaluate-single", json=payload)
    assert res_solid.status_code == 200
    data_solid = res_solid.json()
    assert data_solid["score"] >= 6
    assert data_solid["passed"] is True
