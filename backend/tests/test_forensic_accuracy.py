from datetime import datetime

from backend.routers.github_analysis import _extract_declared_sources
from backend.services.commit_forensics import CommitForensics
from backend.services.tutorial_matcher import TutorialMatcher
from backend.services.viva_engine import VivaEngine


def test_normalized_source_comparison_detects_renamed_near_clone():
    source = """
def calculate_total(items):
    total = 0
    for item in items:
        if item.active:
            total += item.value
    return total
"""
    renamed = """
def summarize(records):
    result = 0
    for record in records:
        if record.enabled:
            result += record.amount
    return result
"""
    unrelated = """
class Cache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.values = {}

    def evict(self, key):
        if key in self.values:
            del self.values[key]
        return len(self.values)
"""

    clone_metrics = TutorialMatcher.compare_source_code(renamed, source)
    unrelated_metrics = TutorialMatcher.compare_source_code(unrelated, source)

    assert clone_metrics["candidate_coverage"] >= 0.90
    assert clone_metrics["similarity"] >= 0.90
    assert unrelated_metrics["similarity"] < clone_metrics["similarity"]


def test_external_match_reports_real_source_and_coverage():
    candidate = {
        "src/worker.py": """
def calculate_total(items):
    total = 0
    for item in items:
        if item.active:
            total += item.value
    return total
"""
    }
    matcher = TutorialMatcher()
    is_clone, match = matcher.detect_global_plagiarism(
        file_tree=list(candidate),
        code_snippets=candidate,
        source_candidates=[
            {
                "name": "example/source-project",
                "source_url": "https://github.com/example/source-project",
                "author": "example",
                "files": {"lib/totals.py": candidate["src/worker.py"]},
                "evidence": "AUTHENTICATED_GITHUB_CODE_SEARCH",
            }
        ],
    )

    assert is_clone is True
    assert match["source_url"] == "https://github.com/example/source-project"
    assert match["source_files"] == ["lib/totals.py"]
    assert match["copy_coverage"] == 1.0
    assert "NORMALIZED_TOKEN_OVERLAP" in match["evidence"]


def test_external_match_keeps_highest_quality_source_candidate():
    code = """
def calculate_total(items):
    total = 0
    for item in items:
        if item.active:
            total += item.value
    return total
"""
    matcher = TutorialMatcher()
    is_clone, match = matcher.detect_global_plagiarism(
        code_snippets={"src/worker.py": code},
        source_candidates=[
            {"name": "exact/source", "source_url": "https://github.com/exact/source", "files": {"lib/worker.py": code}},
            {"name": "larger/source", "source_url": "https://github.com/larger/source", "files": {"lib/worker.py": code + "\n\n# additional unrelated source\n"}},
        ],
    )

    assert is_clone is True
    assert match["source_url"] == "https://github.com/exact/source"


def test_declared_source_parser_ignores_candidate_repository():
    snippets = {
        "package.json": '{"repository": "https://github.com/example/original.git"}',
        "README.md": "derived from https://github.com/example/other",
        "src/app.py": "https://github.com/candidate/project should be ignored",
    }
    sources = _extract_declared_sources(snippets, "candidate", "project")

    assert sources == [("example", "original"), ("example", "other")]


def test_empty_viva_never_invents_a_code_function():
    assert VivaEngine().generate_questions_for_functions([]) == []


def test_commit_forensics_accepts_mixed_timestamp_and_stat_types():
    result = CommitForensics.analyze_commits([
        {
            "message": "feat: add worker",
            "date": datetime(2024, 1, 1, 10, 0, 0),
            "additions": "20",
            "deletions": "2",
        },
        {
            "message": "fix: resolve timeout issue",
            "date": "2024-01-08T10:00:00Z",
            "additions": 10,
            "deletions": 4,
        },
    ])

    assert result["total_commits"] == 2
    assert result["time_span_days"] == 7
    assert result["deletion_ratio"] > 0


def test_commit_forensics_does_not_score_missing_or_invalid_history():
    assert CommitForensics.analyze_commits([], test_files_count=3)["authenticity_score"] == 0
    invalid = CommitForensics.analyze_commits([
        {"message": "initial commit", "date": "not-a-date", "additions": 500, "deletions": 0}
    ])
    assert invalid["history_verified"] is False
    assert invalid["authenticity_score"] == 0
    assert invalid["organic_growth"] is False
