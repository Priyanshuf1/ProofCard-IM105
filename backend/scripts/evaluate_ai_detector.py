"""
Reproducible Evaluation Script for ProofCard AI Text Detector.
Evaluates the detector on the labeled benchmark dataset (backend/data/ai_detector_benchmark.json),
measuring Precision, Recall, F1 score, False Positive Rate (FPR), False Negative Rate (FNR),
and performance breakdown by text length, authorship category, and language.
"""

import os
import sys
import json
import time

# Ensure project root is in sys.path
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from typing import Dict, Any, List
from backend.services.ai_detector import AIDetector, AIDetectorConfig

BENCHMARK_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "ai_detector_benchmark.json")


def run_evaluation() -> Dict[str, Any]:
    print("=" * 75)
    print("  ProofCard AI-Generated Text Detector — Empirical Benchmark Evaluation")
    print(f"  Model Version: {AIDetectorConfig.MODEL_VERSION}")
    print("=" * 75)

    if not os.path.exists(BENCHMARK_FILE):
        print(f"ERROR: Benchmark dataset not found at {BENCHMARK_FILE}")
        return {}

    with open(BENCHMARK_FILE, "r", encoding="utf-8") as f:
        samples = json.load(f)

    detector = AIDetector()
    results = []

    start_eval = time.time()
    for s in samples:
        t0 = time.time()
        res = detector.detect(s["text"])
        lat = (time.time() - t0) * 1000
        results.append({
            "id": s["id"],
            "expected_label": s["label"],
            "source": s.get("source"),
            "subject": s.get("subject"),
            "length_type": s.get("length_type"),
            "predicted_class": res["classification"],
            "ai_prob": res["ai_probability"],
            "latency_ms": lat
        })
    total_eval_time = time.time() - start_eval

    # Filter binary evaluation set (human vs ai of sufficient length)
    binary_set = [r for r in results if r["expected_label"] in ("human", "ai") and r["length_type"] != "too_short" and r["predicted_class"] != "unsupported_language"]

    tp = sum(1 for r in binary_set if r["expected_label"] == "ai" and r["predicted_class"] == "ai_like")
    fn = sum(1 for r in binary_set if r["expected_label"] == "ai" and r["predicted_class"] != "ai_like")
    fp = sum(1 for r in binary_set if r["expected_label"] == "human" and r["predicted_class"] == "ai_like")
    tn = sum(1 for r in binary_set if r["expected_label"] == "human" and r["predicted_class"] == "human_like")

    precision = tp / max(tp + fp, 1)
    recall = tp / max(tp + fn, 1)
    f1 = 2 * (precision * recall) / max(precision + recall, 1e-6)
    accuracy = (tp + tn) / max(len(binary_set), 1)
    fpr = fp / max(fp + tn, 1)
    fnr = fn / max(tp + fn, 1)

    print("\n[1] Overall Binary Evaluation Metrics (Held-Out Benchmark Set):")
    print(f"  • Evaluated Samples:     {len(binary_set)}")
    print(f"  • Accuracy:              {accuracy * 100:.2f}%")
    print(f"  • Precision (AI):        {precision * 100:.2f}%")
    print(f"  • Recall (AI):           {recall * 100:.2f}%")
    print(f"  • F1 Score:              {f1:.4f}")
    print(f"  • False Positive Rate:   {fpr * 100:.2f}% (Human falsely classified as AI)")
    print(f"  • False Negative Rate:   {fnr * 100:.2f}% (AI undetected)")

    # Breakdown by length and special categories
    print("\n[2] Category & Edge Case Breakdown:")
    for cat in ["short", "medium", "long", "too_short", "multilingual"]:
        cat_samples = [r for r in results if r["length_type"] == cat or r["subject"] == cat]
        if cat_samples:
            cat_preds = {r["predicted_class"] for r in cat_samples}
            print(f"  • Category '{cat}': {len(cat_samples)} samples -> classifications: {sorted(list(cat_preds))}")

    # Mixed authorship verification
    mixed_samples = [r for r in results if r["expected_label"] == "mixed"]
    print(f"\n[3] Mixed Authorship Handling:")
    print(f"  • Tested {len(mixed_samples)} mixed human/AI samples.")
    for m in mixed_samples:
        print(f"    - Sample {m['id']}: Classified as '{m['predicted_class']}' (P(AI)={m['ai_prob']})")

    # Latency
    avg_latency = sum(r["latency_ms"] for r in results) / max(len(results), 1)
    print(f"\n[4] Performance & Scaling Latency:")
    print(f"  • Total Evaluation Time: {total_eval_time * 1000:.2f} ms for {len(samples)} samples")
    print(f"  • Average Per-Request Latency: {avg_latency:.2f} ms")
    print("=" * 75)

    return {
        "accuracy": accuracy,
        "precision": precision,
        "recall": recall,
        "f1": f1,
        "fpr": fpr,
        "fnr": fnr,
        "avg_latency_ms": avg_latency,
        "total_samples": len(samples)
    }


if __name__ == "__main__":
    run_evaluation()
