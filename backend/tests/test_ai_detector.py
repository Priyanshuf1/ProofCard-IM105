"""
Tests for Production-Ready AI-Generated Text Detection Module.
Evaluates model schema, length gating, language detection, classification accuracy,
and non-breaking error resilience.
"""

import pytest
from fastapi.testclient import TestClient
from backend.main import app
from backend.services.ai_detector import AIDetector, AIDetectorConfig, LanguageDetector
from backend.services.viva_engine import VivaEngine

client = TestClient(app)


def test_ai_detector_output_schema_conformance():
    detector = AIDetector()
    text = (
        "Furthermore, it is important to note that by leveraging comprehensive paradigms, "
        "the architecture streamlines optimal system responsiveness and plays a pivotal role "
        "in fostering robustness across modern distributed engineering deployments."
    )
    result = detector.detect(text)

    # Validate all required schema keys
    assert result["status"] == "analyzed"
    assert result["classification"] in ["ai_like", "human_like", "mixed_or_uncertain", "insufficient_text", "unsupported_language"]
    assert "ai_probability" in result
    assert "human_probability" in result
    assert "model_score" in result
    assert "text_length" in result
    assert "language_supported" in result
    assert "model_version" in result
    assert "limitations" in result
    assert isinstance(result["limitations"], list)
    assert len(result["limitations"]) > 0


def test_insufficient_text_length_gating():
    detector = AIDetector()
    short_samples = [
        "",
        "yes",
        "short text",
        "def hello(): pass",
        "too short to analyze"
    ]
    for sample in short_samples:
        result = detector.detect(sample)
        assert result["classification"] == "insufficient_text"
        assert result["ai_probability"] is None
        assert result["human_probability"] is None
        assert result["model_score"] is None


def test_unsupported_language_gating():
    detector = AIDetector()
    # Cyrillic
    cyrillic_text = "Это пример ответа на русском языке, который использует не поддерживаемый алфавит."
    res = detector.detect(cyrillic_text)
    assert res["classification"] == "unsupported_language"
    assert res["language_supported"] is False
    assert res["ai_probability"] is None

    # Chinese
    cjk_text = "这是一个用中文编写的技术答案，需要多语言模型支持才能进行准确分类评估。"
    res_cjk = detector.detect(cjk_text)
    assert res_cjk["classification"] == "unsupported_language"
    assert res_cjk["language_supported"] is False


def test_human_authored_technical_answer_classification():
    detector = AIDetector()
    # High burstiness, colloquial engineering terms, short-long sentence variation
    human_sample = (
        "We sort the dictionary keys and encode normalized payload strings into utf-8 bytes. "
        "Then we just hash it with sha256. It's basically a simple way to prevent state tampering across platforms. "
        "Notice we didn't use md5 because it's broken."
    )
    res = detector.detect(human_sample)
    assert res["language_supported"] is True
    assert res["classification"] in ["human_like", "mixed_or_uncertain"]
    if res["ai_probability"] is not None:
        assert res["ai_probability"] <= 0.60


def test_ai_generated_answer_classification_and_viva_penalty():
    detector = AIDetector()
    ai_sample = (
        "Furthermore, it is important to note that by leveraging comprehensive caching mechanisms, "
        "the architecture streamlines optimal system responsiveness. Crucially, this holistic paradigm "
        "fosters enhanced operational robustness, thereby orchestrating scalable concurrency across disparate boundaries."
    )
    res = detector.detect(ai_sample)
    assert res["language_supported"] is True
    assert res["classification"] == "ai_like"
    assert res["ai_probability"] is not None
    assert res["ai_probability"] >= 0.75

    # Integration test with VivaEngine: AI-detected text receives score penalty
    engine = VivaEngine()
    q = "Explain concurrency and caching in your service."
    expected = ["Caching mechanisms", "Optimal system responsiveness", "Concurrency"]
    viva_res = engine.evaluate_answer(q, expected, ai_sample)
    assert viva_res["ai_detection"]["classification"] == "ai_like"
    # Even if keywords matched, score is capped / penalized
    assert viva_res["score"] <= 3
    assert viva_res["passed"] is False
    assert "AI Pattern Detected" in viva_res["feedback"]


def test_long_answer_overlapping_chunking():
    detector = AIDetector()
    # Construct answer with 150+ words
    long_text = " ".join([
        "We implemented a persistent connection pool to handle database queries.",
        "Furthermore, it is important to note that connection starvation occurs when workers do not release clients.",
        "Crucially, by leveraging an async semaphore, the system bounds concurrent socket acquisitions.",
        "This ensures that under heavy burst load, the event loop remains responsive and does not experience starvation."
    ] * 3)

    res = detector.detect(long_text)
    assert res["status"] == "analyzed"
    assert res["text_length"] > 400
    assert res["classification"] in ["ai_like", "mixed_or_uncertain", "human_like"]


def test_api_viva_ai_detect_endpoint():
    payload = {
        "text": "Furthermore, it is important to note that by leveraging comprehensive paradigms, we foster system scalability."
    }
    resp = client.post("/api/viva/ai-detect", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "analyzed"
    assert "classification" in data
    assert "ai_probability" in data
