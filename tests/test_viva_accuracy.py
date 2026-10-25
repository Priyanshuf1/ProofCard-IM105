import pytest
from backend.services.viva_engine import VivaEngine

def test_viva_evaluation_accuracy():
    v = VivaEngine()
    q = "In cryptographic routine handler, how do you ensure the computed verification hash is deterministic across platforms and resistant to state tampering?"
    exp = [
        "Deterministic byte canonicalization",
        "Constant-time comparison",
        "Tamper-evident verification",
        "Cross-platform newline normalization"
    ]

    # Nonsense / non-answers / pop culture MUST score 0/10
    evasions = [
        "i am groot",
        "jdv hbehbe",
        "idk",
        "no idea",
        "hello world",
        "blah blah",
        "asdfghjkl",
        "never gonna give you up"
    ]
    for ans in evasions:
        res = v.evaluate_answer(q, exp, ans)
        assert res["score"] == 0, f"Expected 0 for '{ans}', got {res['score']}"
        assert not res["passed"]
        assert len(res["concepts_demonstrated"]) == 0

    # Mediocre answer (mentions sha256 or 1 concept without deep mechanism) -> 1-3/10
    res_weak = v.evaluate_answer(q, exp, "we just use sha256 hash")
    assert 1 <= res_weak["score"] <= 3, f"Expected 1-3 for weak answer, got {res_weak['score']}"
    assert not res_weak["passed"]

    # Borderline answer (2 concepts mentioned shallowly without deep rationale) -> 4-5/10
    res_borderline = v.evaluate_answer(q, exp, "we use canonical bytes and check the hash")
    assert 4 <= res_borderline["score"] <= 5, f"Expected 4-5 for borderline, got {res_borderline['score']}"

    # Competent passing answer (2-3 concepts with rationale keywords) -> 6-7/10
    res_good = v.evaluate_answer(
        q, exp,
        "We use canonical byte sorting to ensure determinism and constant-time comparison to prevent timing attacks."
    )
    assert 6 <= res_good["score"] <= 7, f"Expected 6-7 for good answer, got {res_good['score']}"
    assert res_good["passed"]

    # Senior / Exemplary answer (all 4 concepts + deep architectural justification) -> 8-10/10
    res_expert = v.evaluate_answer(
        q, exp,
        "We enforce deterministic byte canonicalization with newline normalization across operating systems, "
        "and perform constant-time comparison to ensure tamper-evident verification resistant to side-channel timing leaks."
    )
    assert 8 <= res_expert["score"] <= 10, f"Expected 8-10 for expert answer, got {res_expert['score']}"
    assert res_expert["passed"]

if __name__ == "__main__":
    test_viva_evaluation_accuracy()
    print("ALL VIVA ACCURACY TESTS PASSED!")
