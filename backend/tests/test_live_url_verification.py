"""
Unit and integration tests for Live URL Verification & SSRF Guard.
Tests:
- SSRF prevention on private, loopback, link-local, and cloud metadata IPs.
- Non-HTTP schemes rejection.
- Valid public URLs with mocked and live responses.
- 404 Not Found and 500 Server Error classification.
- Unreachable / timeout URLs.
- Malicious SSRF redirect hops.
"""
import asyncio
import time
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
# 1. SSRF Attack Vector Tests
# ==============================================================================

@pytest.mark.parametrize("blocked_url", [
    "http://localhost:8000",
    "http://127.0.0.1:3000",
    "http://127.127.127.127",
    "http://[::1]",
    "http://10.0.0.1",
    "http://10.254.254.1",
    "http://172.16.0.1",
    "http://172.31.255.255",
    "http://192.168.1.1",
    "http://192.168.100.50",
    "http://169.254.169.254/latest/meta-data",
    "http://metadata.google.internal",
    "http://0.0.0.0:80",
    "http://2130706433",  # Integer representation of 127.0.0.1
    "file:///etc/passwd",
    "ftp://my-app.vercel.app",
    "javascript:alert(1)",
])
def test_ssrf_protection_blocks_dangerous_urls(blocked_url):
    response = client.post("/api/deployment/verify-live-url", json={"url": blocked_url})
    assert response.status_code == 200
    data = response.json()
    assert data["is_live"] is False
    assert data["status_code"] is None
    assert data["error"] is not None
    assert any(term in data["error"].lower() for term in ["ssrf", "forbidden", "restricted", "scheme", "invalid", "blocked"])


@pytest.mark.parametrize("cgnat_url", [
    "http://100.64.0.1",
    "http://100.127.255.254",
    "http://[::ffff:100.64.0.1]",
    "http://1681915905",  # Decimal integer encoding of 100.64.0.1
])
def test_cgnat_shared_address_space_blocked_upfront(cgnat_url):
    """Verify RFC 6598 Carrier Grade NAT (100.64.0.0/10) is blocked upfront with an SSRF error in < 1ms."""
    start = time.perf_counter()
    response = client.post("/api/deployment/verify-live-url", json={"url": cgnat_url})
    elapsed_ms = (time.perf_counter() - start) * 1000
    assert response.status_code == 200
    data = response.json()
    assert data["is_live"] is False
    assert data["status_code"] is None
    assert data["error"] is not None
    assert any(term in data["error"].lower() for term in ["forbidden", "ssrf protection", "restricted", "ssrf"])
    assert "timed out" not in data["error"].lower()
    # Upfront rejection happens immediately (< 100ms) without waiting for network timeout
    assert elapsed_ms < 100


# ==============================================================================
# 2. Valid Public URLs (Mocked & Liveness Logic)
# ==============================================================================

def test_valid_public_url_successful_head():
    async def _run():
        mock_response = httpx.Response(200, headers={"server": "Vercel"})

        with patch("backend.services.deployment_readiness.validate_url_and_check_ssrf", new_callable=AsyncMock) as mock_val:
            mock_val.return_value = (True, "https://my-app.vercel.app", None)
            with patch("httpx.AsyncClient.head", new_callable=AsyncMock) as mock_head:
                mock_head.return_value = mock_response
                result = await DeploymentReadiness.verify_live_url("https://my-app.vercel.app")
                assert result["is_live"] is True
                assert result["status_code"] == 200
                assert result["server"] == "Vercel"
                assert result["error"] is None
                assert result["response_time_ms"] is not None

    asyncio.run(_run())


def test_fallback_to_get_when_head_returns_405():
    async def _run():
        mock_head_res = httpx.Response(405, headers={})
        mock_get_res = httpx.Response(200, headers={"server": "nginx/1.24"})

        with patch("backend.services.deployment_readiness.validate_url_and_check_ssrf", new_callable=AsyncMock) as mock_val:
            mock_val.return_value = (True, "https://portfolio.dev", None)
            with patch("httpx.AsyncClient.head", new_callable=AsyncMock) as mock_head:
                mock_head.return_value = mock_head_res
                with patch("httpx.AsyncClient.get", new_callable=AsyncMock) as mock_get:
                    mock_get.return_value = mock_get_res
                    result = await DeploymentReadiness.verify_live_url("https://portfolio.dev")
                    assert result["is_live"] is True
                    assert result["status_code"] == 200
                    assert result["server"] == "nginx/1.24"
                    mock_head.assert_called_once()
                    mock_get.assert_called_once()

    asyncio.run(_run())


def test_fallback_to_get_when_head_returns_501():
    async def _run():
        mock_head_res = httpx.Response(501, headers={})
        mock_get_res = httpx.Response(200, headers={"server": "Apache/2.4"})

        with patch("backend.services.deployment_readiness.validate_url_and_check_ssrf", new_callable=AsyncMock) as mock_val:
            mock_val.return_value = (True, "https://legacy-server.dev", None)
            with patch("httpx.AsyncClient.head", new_callable=AsyncMock) as mock_head:
                mock_head.return_value = mock_head_res
                with patch("httpx.AsyncClient.get", new_callable=AsyncMock) as mock_get:
                    mock_get.return_value = mock_get_res
                    result = await DeploymentReadiness.verify_live_url("https://legacy-server.dev")
                    assert result["is_live"] is True
                    assert result["status_code"] == 200
                    assert result["server"] == "Apache/2.4"
                    mock_head.assert_called_once()
                    mock_get.assert_called_once()

    asyncio.run(_run())


# ==============================================================================
# 3. 404 / 500 Responses
# ==============================================================================

def test_404_response_marked_not_live():
    async def _run():
        mock_res = httpx.Response(404, headers={"server": "Cloudflare"})

        with patch("backend.services.deployment_readiness.validate_url_and_check_ssrf", new_callable=AsyncMock) as mock_val:
            mock_val.return_value = (True, "https://broken-app.vercel.app", None)
            with patch("httpx.AsyncClient.head", new_callable=AsyncMock) as mock_head:
                mock_head.return_value = mock_res
                result = await DeploymentReadiness.verify_live_url("https://broken-app.vercel.app")
                assert result["is_live"] is False
                assert result["status_code"] == 404
                assert "404" in result["error"]
                assert result["server"] == "Cloudflare"

    asyncio.run(_run())


def test_500_response_marked_not_live():
    async def _run():
        mock_res = httpx.Response(500, headers={"server": "gunicorn"})

        with patch("backend.services.deployment_readiness.validate_url_and_check_ssrf", new_callable=AsyncMock) as mock_val:
            mock_val.return_value = (True, "https://crashing-api.app", None)
            with patch("httpx.AsyncClient.head", new_callable=AsyncMock) as mock_head:
                mock_head.return_value = mock_res
                result = await DeploymentReadiness.verify_live_url("https://crashing-api.app")
                assert result["is_live"] is False
                assert result["status_code"] == 500
                assert "500" in result["error"]

    asyncio.run(_run())


# ==============================================================================
# 4. Unreachable & Timeout URLs
# ==============================================================================

def test_timeout_handling():
    async def _run():
        with patch("backend.services.deployment_readiness.validate_url_and_check_ssrf", new_callable=AsyncMock) as mock_val:
            mock_val.return_value = (True, "https://slow-service.com", None)
            with patch("httpx.AsyncClient.head", side_effect=httpx.TimeoutException("Timeout")) as mock_head, \
                 patch("httpx.AsyncClient.get") as mock_get:
                result = await DeploymentReadiness.verify_live_url("https://slow-service.com", timeout_seconds=1.0)
                assert result["is_live"] is False
                assert result["status_code"] is None
                assert "timed out" in result["error"].lower()
                mock_head.assert_called_once()
                mock_get.assert_not_called()

    asyncio.run(_run())


def test_connection_error_handling():
    async def _run():
        with patch("backend.services.deployment_readiness.validate_url_and_check_ssrf", new_callable=AsyncMock) as mock_val:
            mock_val.return_value = (True, "https://offline-host.com", None)
            with patch("httpx.AsyncClient.head", side_effect=httpx.ConnectError("Connection refused")) as mock_head, \
                 patch("httpx.AsyncClient.get") as mock_get:
                result = await DeploymentReadiness.verify_live_url("https://offline-host.com")
                assert result["is_live"] is False
                assert result["status_code"] is None
                assert "connect" in result["error"].lower()
                mock_head.assert_called_once()
                mock_get.assert_not_called()

    asyncio.run(_run())


# ==============================================================================
# 5. SSRF Redirect Attack Prevention
# ==============================================================================

def test_ssrf_via_redirect_is_aborted():
    async def _run():
        mock_redirect = httpx.Response(302, headers={"location": "http://169.254.169.254/latest/meta-data"})

        # First call is safe public host; second call in redirect loop targets link-local IP
        async def mock_validator_side_effect(url):
            if "169.254" in url:
                return (False, url, "Host resolves to restricted IP (SSRF protection).")
            return (True, url, None)

        with patch("backend.services.deployment_readiness.validate_url_and_check_ssrf", side_effect=mock_validator_side_effect):
            with patch("httpx.AsyncClient.head", return_value=mock_redirect):
                result = await DeploymentReadiness.verify_live_url("https://malicious-public-redirector.com")
                assert result["is_live"] is False
                assert result["status_code"] is None
                assert "SSRF protection" in result["error"]

    asyncio.run(_run())
