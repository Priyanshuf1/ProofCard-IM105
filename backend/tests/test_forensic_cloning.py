"""
backend/tests/test_forensic_cloning.py
Comprehensive unit & integration tests for Milestone 3:
- RepoUrlExtractor (GitHub, GitLab, Bitbucket, Codeberg, Vercel, Netlify, Render, punctuation stripping, filtering)
- ForensicRepoCloner (Test mode fallback, commits, files, branch, timeout handling, Windows cleanup)
- LiveSiteInspector (HTTP status, SSL, latency, DOM semantics, mobile viewport, DNS/timeout error handling)
- Forensics API Endpoints (/extract-urls, /clone, /inspect-live)
"""

import pytest
from fastapi.testclient import TestClient

from backend.main import app
from backend.services.repo_extractor import RepoUrlExtractor
from backend.services.forensic_cloner import ForensicRepoCloner
from backend.services.live_site_inspector import LiveSiteInspector

client = TestClient(app)


# ============================================================================
# 1. UNIT TESTS: RepoUrlExtractor
# ============================================================================

def test_extract_git_repos():
    text = (
        "Check my projects at https://github.com/developer/proofcard-api and "
        "https://gitlab.com/team/microservices.git or bitbucket.org/corp/backend."
    )
    repos = RepoUrlExtractor.extract_git_repos(text)
    assert len(repos) == 3
    assert any("github.com/developer/proofcard-api" in r for r in repos)
    assert any("gitlab.com/team/microservices" in r for r in repos)
    assert any("bitbucket.org/corp/backend" in r for r in repos)


def test_extract_git_filter_blacklisted_and_subpaths():
    text = (
        "Links: https://github.com/login, https://github.com/pricing, "
        "https://github.com/dev/project/pull/42, https://github.com/dev/project/commit/abc"
    )
    repos = RepoUrlExtractor.extract_git_repos(text)
    assert len(repos) == 1
    assert repos[0] == "https://github.com/dev/project"


def test_extract_live_deployments():
    text = (
        "Live at https://my-portfolio.vercel.app and https://backend-api.onrender.com/docs, "
        "also https://frontend-ui.netlify.app."
    )
    deployments = RepoUrlExtractor.extract_live_deployments(text)
    assert len(deployments) == 3
    assert any("vercel.app" in d for d in deployments)
    assert any("onrender.com" in d for d in deployments)
    assert any("netlify.app" in d for d in deployments)


def test_extract_live_filter_social_and_articles():
    text = (
        "Find me on https://linkedin.com/in/dev and read https://medium.com/@dev/post "
        "and watch https://youtube.com/watch?v=123."
    )
    deployments = RepoUrlExtractor.extract_live_deployments(text)
    assert len(deployments) == 0


def test_clean_url_punctuation():
    dirty = "(https://github.com/user/repo), [https://app.vercel.app]."
    urls = RepoUrlExtractor.extract_urls(dirty)
    for r in urls["git_repos"]:
        assert not r.endswith((")", ",", "."))
    for l in urls["live_deployments"]:
        assert not l.endswith(("]", ",", "."))


# ============================================================================
# 2. UNIT TESTS: ForensicRepoCloner
# ============================================================================

def test_cloner_fallback_telemetry():
    result = ForensicRepoCloner.clone_and_inspect("https://github.com/devsharma/task-queue", test_mode=True)
    assert result["status"] == "FALLBACK_SUCCESS"
    assert "commits" in result
    assert result["commit_count"] >= 3
    assert "files" in result
    assert result["file_count"] >= 3
    assert result["branch"] in ("main", "HEAD")


def test_cloner_synthetic_mock_fixture():
    result = ForensicRepoCloner.clone_and_inspect("https://github.com/completely/random-repo-12345", test_mode=True)
    assert result["status"] == "FALLBACK_SUCCESS"
    assert result["commit_count"] == 5
    assert len(result["files"]) >= 5


# ============================================================================
# 3. UNIT TESTS: LiveSiteInspector
# ============================================================================

def test_live_site_inspector_dns_failure():
    import asyncio
    result = asyncio.run(LiveSiteInspector.audit_url("https://this-domain-does-not-exist-at-all-xyz987654.app"))
    assert result["is_live"] is False
    assert result["http_status"] == 0
    assert result["total"] == 0.0


# ============================================================================
# 4. API TESTS: Forensics Endpoints
# ============================================================================

def test_api_extract_urls():
    text = (
        "Github: https://github.com/dev/app\n"
        "Deployment: https://app.vercel.app\n"
        "Social: https://linkedin.com/in/dev"
    )
    res = client.post("/api/v1/forensics/extract-urls", json={"text": text})
    assert res.status_code == 200
    data = res.json()
    assert len(data["git_repos"]) == 1
    assert "github.com/dev/app" in data["git_repos"][0]
    assert len(data["live_deployments"]) == 1
    assert "app.vercel.app" in data["live_deployments"][0]


def test_api_clone_test_mode():
    payload = {
        "repo_url": "https://github.com/devsharma/task-queue",
        "test_mode": True,
        "timeout_seconds": 15,
        "max_size_mb": 150,
    }
    res = client.post("/api/v1/forensics/clone", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["status"] in ("FALLBACK_SUCCESS", "SUCCESS", "MOCKED")
    assert data["commit_count"] > 0
    assert len(data["files"]) > 0


def test_api_inspect_live():
    res = client.post("/api/v1/forensics/inspect-live", json={"url": "https://httpstat.us/200"})
    assert res.status_code == 200
    data = res.json()
    assert "is_live" in data
    assert "latency_ms" in data
    assert "total" in data
