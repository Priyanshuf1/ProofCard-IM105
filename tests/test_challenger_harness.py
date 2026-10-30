"""
Empirical Challenger Test Harness for Milestone 1:
SSRF & Edge-Case Stress Testing on /api/deployment/verify-live-url and validate_url_and_check_ssrf.

Covers:
1. Decimal IP representations
2. IPv6 loopbacks, IPv4-mapped, and translations
3. Cloud metadata endpoints (AWS, GCP, Azure, DigitalOcean)
4. Private RFC 1918 subnets
5. Reserved / special address spaces (0.0.0.0, multicast, broadcast, test-nets)
6. 302 redirects targeting private/metadata endpoints and schemes
7. Dangerous schemes (file://, gopher://, ftp://, dict://, ldap://, javascript:, data:)
8. Unreachable, timeout, DNS resolution failure, 404, 500, 502, 503 URLs
9. Credential embedding and port manipulation attacks
"""
import asyncio
from unittest.mock import patch, AsyncMock
import httpx
import pytest
from fastapi.testclient import TestClient

from backend.main import app
from backend.services.deployment_readiness import (
    DeploymentReadiness,
    validate_url_and_check_ssrf,
)

client = TestClient(app)


# ==============================================================================
# Tier A: SSRF Decimal, IPv6, Cloud Metadata, Private Subnets, Schemes
# ==============================================================================

ADVERSARIAL_URLS = [
    # 1. Decimal IP Representations
    "http://2130706433",          # 127.0.0.1
    "http://2130706433:8080",     # 127.0.0.1 with port
    "http://3232235521",          # 192.168.0.1
    "http://2852039166",          # 169.254.169.254
    "http://167772161",           # 10.0.0.1
    "http://2886729729",          # 172.16.0.1

    # 2. IPv6 Loopbacks & IPv4-Mapped
    "http://[::1]",
    "http://[::1]:8080",
    "http://[::ffff:127.0.0.1]",
    "http://[::ffff:7f00:1]",
    "http://[::ffff:169.254.169.254]",
    "http://[::ffff:10.0.0.1]",
    "http://[::ffff:172.16.0.1]",
    "http://[::ffff:192.168.1.1]",
    "http://[0000::1]",
    "http://[::]",

    # 3. Cloud Metadata Endpoints
    "http://169.254.169.254/latest/meta-data",
    "http://169.254.169.254/computeMetadata/v1/",
    "http://169.254.169.254:80",
    "http://metadata.google.internal",
    "http://metadata.internal",
    "http://instance-data",

    # 4. Private RFC 1918 Subnets
    "http://10.0.0.1",
    "http://10.254.254.254",
    "http://172.16.0.1",
    "http://172.31.255.255",
    "http://192.168.1.1",
    "http://192.168.254.254",

    # 5. Other Reserved / Unspecified / Broadcast IPs
    "http://0.0.0.0",
    "http://0.0.0.0:8000",
    "http://0",
    "http://127.0.0.1",
    "http://127.0.0.2",
    "http://127.127.127.127",
    "http://198.18.0.1",          # Benchmarking
    "http://198.51.100.1",        # TEST-NET-2
    "http://203.0.113.1",         # TEST-NET-3
    "http://192.0.2.1",           # TEST-NET-1
    "http://224.0.0.1",           # Multicast
    "http://240.0.0.1",           # Reserved
    "http://255.255.255.255",     # Broadcast

    # 6. Local Hostnames
    "http://localhost",
    "http://localhost:3000",
    "http://localhost.localdomain",
    "http://app.localhost",
    "http://sub.local",

    # 7. Dangerous Schemes
    "file:///etc/passwd",
    "file:///C:/Windows/win.ini",
    "gopher://127.0.0.1:70/",
    "ftp://127.0.0.1/",
    "ftp://ftp.example.com",
    "dict://127.0.0.1:11211/",
    "ldap://127.0.0.1/",
    "javascript:alert(1)",
    "data:text/html,test",

    # 8. Credential & Path Obfuscation
    "http://admin:secret@127.0.0.1:8000",
    "http://root@169.254.169.254/latest/meta-data",
    "http://user:pass@10.0.0.1/admin",
]


@pytest.mark.parametrize("target_url", ADVERSARIAL_URLS)
def test_adversarial_ssrf_payload_blocked(target_url):
    response = client.post("/api/deployment/verify-live-url", json={"url": target_url})
    assert response.status_code == 200
    data = response.json()
    assert data["is_live"] is False, f"URL {target_url} was not blocked: {data}"
    assert data["status_code"] is None
    assert data["error"] is not None
    assert any(
        kw in data["error"].lower()
        for kw in ["ssrf", "forbidden", "restricted", "scheme", "invalid", "blocked", "failed"]
    ), f"Expected SSRF/security error for {target_url}, got: {data['error']}"


# ==============================================================================
# Tier B: 302 Redirect Hijacking Tests
# ==============================================================================

def test_redirect_to_localhost_blocked():
    mock_resp = httpx.Response(302, headers={"location": "http://127.0.0.1:8000/admin"})
    with patch("httpx.AsyncClient.head", new_callable=AsyncMock) as m_head:
        m_head.return_value = mock_resp
        res = client.post("/api/deployment/verify-live-url", json={"url": "https://google.com"})
        data = res.json()
        assert data["is_live"] is False
        assert data["status_code"] is None
        assert "127.0.0.1" in data["error"] or "SSRF" in data["error"]


def test_redirect_to_cloud_metadata_blocked():
    mock_resp = httpx.Response(302, headers={"location": "http://169.254.169.254/latest/meta-data"})
    with patch("httpx.AsyncClient.head", new_callable=AsyncMock) as m_head:
        m_head.return_value = mock_resp
        res = client.post("/api/deployment/verify-live-url", json={"url": "https://google.com"})
        data = res.json()
        assert data["is_live"] is False
        assert data["status_code"] is None
        assert "169.254.169.254" in data["error"] or "SSRF" in data["error"]


def test_redirect_to_private_rfc1918_blocked():
    mock_resp = httpx.Response(302, headers={"location": "http://10.0.0.1:8080/metrics"})
    with patch("httpx.AsyncClient.head", new_callable=AsyncMock) as m_head:
        m_head.return_value = mock_resp
        res = client.post("/api/deployment/verify-live-url", json={"url": "https://google.com"})
        data = res.json()
        assert data["is_live"] is False
        assert data["status_code"] is None
        assert "10.0.0.1" in data["error"] or "SSRF" in data["error"]


def test_redirect_to_dangerous_scheme_blocked():
    mock_resp = httpx.Response(302, headers={"location": "file:///etc/passwd"})
    with patch("httpx.AsyncClient.head", new_callable=AsyncMock) as m_head:
        m_head.return_value = mock_resp
        res = client.post("/api/deployment/verify-live-url", json={"url": "https://google.com"})
        data = res.json()
        assert data["is_live"] is False
        assert data["status_code"] is None
        assert "scheme" in data["error"].lower()


def test_multihop_redirect_to_metadata_blocked():
    # Hop 1: google.com -> github.com (both valid public domains)
    # Hop 2: github.com -> http://169.254.169.254/latest/
    hop1 = httpx.Response(301, headers={"location": "https://github.com"})
    hop2 = httpx.Response(302, headers={"location": "http://169.254.169.254/latest/"})
    with patch("httpx.AsyncClient.head", new_callable=AsyncMock) as m_head:
        m_head.side_effect = [hop1, hop2]
        res = client.post("/api/deployment/verify-live-url", json={"url": "https://google.com"})
        data = res.json()
        assert data["is_live"] is False
        assert data["status_code"] is None
        assert "169.254" in data["error"] or "SSRF" in data["error"]


# ==============================================================================
# Tier C: HTTP Status Code and Network Error Classification
# ==============================================================================

@pytest.mark.parametrize("status_code, expected_live, err_snippet", [
    (200, True, None),
    (201, True, None),
    (204, True, None),
    (400, False, "HTTP 400"),
    (401, False, "HTTP 401"),
    (403, False, "HTTP 403"),
    (404, False, "HTTP 404"),
    (500, False, "HTTP 500"),
    (502, False, "HTTP 502"),
    (503, False, "HTTP 503"),
])
def test_http_status_codes(status_code, expected_live, err_snippet):
    mock_resp = httpx.Response(status_code, headers={"server": "test-web-server"})
    with patch("httpx.AsyncClient.head", new_callable=AsyncMock) as m_head:
        m_head.return_value = mock_resp
        res = client.post("/api/deployment/verify-live-url", json={"url": "https://google.com"})
        data = res.json()
        assert data["is_live"] is expected_live
        assert data["status_code"] == status_code
        if err_snippet:
            assert err_snippet in (data["error"] or "")
        else:
            assert data["error"] is None


def test_connection_timeout():
    with patch("httpx.AsyncClient.head", new_callable=AsyncMock) as m_head:
        m_head.side_effect = httpx.TimeoutException("Connection timed out")
        with patch("httpx.AsyncClient.get", new_callable=AsyncMock) as m_get:
            m_get.side_effect = httpx.TimeoutException("Connection timed out")
            res = client.post("/api/deployment/verify-live-url", json={"url": "https://google.com"})
            data = res.json()
            assert data["is_live"] is False
            assert data["status_code"] is None
            assert "timed out" in data["error"].lower()


def test_connection_refused():
    with patch("httpx.AsyncClient.head", new_callable=AsyncMock) as m_head:
        m_head.side_effect = httpx.ConnectError("Connection refused by peer")
        with patch("httpx.AsyncClient.get", new_callable=AsyncMock) as m_get:
            m_get.side_effect = httpx.ConnectError("Connection refused by peer")
            res = client.post("/api/deployment/verify-live-url", json={"url": "https://google.com"})
            data = res.json()
            assert data["is_live"] is False
            assert data["status_code"] is None
            assert "connect" in data["error"].lower()


def test_dns_resolution_failure():
    res = client.post(
        "/api/deployment/verify-live-url",
        json={"url": "https://nonexistent-subdomain-unresolvable-xyz-987654.org"}
    )
    data = res.json()
    assert data["is_live"] is False
    assert data["status_code"] is None
    assert any(term in data["error"].lower() for term in ["dns resolution failed", "failed to resolve"])


def test_empty_and_whitespace_urls():
    for bad_url in ["", "   "]:
        res = client.post("/api/deployment/verify-live-url", json={"url": bad_url})
        data = res.json()
        assert data["is_live"] is False
        assert data["status_code"] is None
        assert data["error"] is not None
        assert len(data["error"]) > 0


def test_rfc6598_carrier_grade_nat():
    """Verify that RFC 6598 (100.64.0.1) results in is_live=False."""
    res = client.post("/api/deployment/verify-live-url", json={"url": "http://100.64.0.1"})
    data = res.json()
    assert data["is_live"] is False
    assert data["status_code"] is None
    assert data["error"] is not None
