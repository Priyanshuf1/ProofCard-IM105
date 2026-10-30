"""Build an evidence-backed contract between assessment and real work.

The contract intentionally does not calculate a hiring score.  It records what
was observed, what still needs to be demonstrated, and what an employer or
mentor must verify after deployment.
"""

import asyncio
import hashlib
import ipaddress
import json
import re
import socket
import time
import urllib.parse
from typing import Any, Dict, List, Optional, Tuple, Union
import httpx


def _slug(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-") or "competency"


_CGNAT_NETWORK = ipaddress.ip_network("100.64.0.0/10")


def _is_blocked_ip(ip: Union[ipaddress.IPv4Address, ipaddress.IPv6Address]) -> bool:
    """Check if an IP address belongs to private, loopback, link-local, CGNAT, or reserved blocks."""
    if hasattr(ip, "ipv4_mapped") and ip.ipv4_mapped:
        ip = ip.ipv4_mapped
    if (
        not ip.is_global
        or ip.is_multicast
        or ip.is_private
        or ip.is_loopback
        or ip.is_link_local
        or ip.is_reserved
        or ip.is_unspecified
        or (isinstance(ip, ipaddress.IPv4Address) and ip in _CGNAT_NETWORK)
    ):
        return True
    # Explicit link-local cloud metadata IP (AWS, GCP, Azure, DigitalOcean)
    if str(ip) == "169.254.169.254":
        return True
    return False


async def validate_url_and_check_ssrf(raw_url: str) -> Tuple[bool, str, Optional[str]]:
    """
    Validate URL syntax and enforce SSRF protections against internal/private resources.
    Returns: (is_safe: bool, normalized_url_or_error: str, error_detail: Optional[str])
    """
    if not raw_url or not isinstance(raw_url, str):
        return False, "", "URL cannot be empty"

    url = raw_url.strip()
    try:
        parsed = urllib.parse.urlsplit(url)
    except Exception as e:
        return False, url, f"Malformed URL syntax: {e}"

    if parsed.scheme:
        if parsed.scheme.lower() not in ("http", "https"):
            return False, url, f"Unsupported scheme '{parsed.scheme}'. Only HTTP and HTTPS are permitted."
    else:
        url = "https://" + url
        try:
            parsed = urllib.parse.urlsplit(url)
        except Exception as e:
            return False, url, f"Malformed URL syntax: {e}"

    hostname = parsed.hostname
    if not hostname:
        return False, url, "Missing or invalid hostname in URL."

    hostname_clean = hostname.strip().lower()

    # Blocked hostnames (loopback, metadata)
    BLOCKED_HOSTNAMES = {
        "localhost",
        "localhost.localdomain",
        "local",
        "metadata.google.internal",
        "metadata.internal",
        "instance-data",
    }
    if (
        hostname_clean in BLOCKED_HOSTNAMES
        or hostname_clean.endswith(".localhost")
        or hostname_clean.endswith(".local")
    ):
        return False, url, f"Access to host '{hostname}' is forbidden (SSRF protection)."

    # Check alternative integer representation of IPv4 (e.g. 2130706433 -> 127.0.0.1)
    try:
        if hostname_clean.isdigit():
            val = int(hostname_clean)
            ip_obj = ipaddress.ip_address(val)
            if _is_blocked_ip(ip_obj):
                return False, url, f"Access to IP '{ip_obj}' is forbidden (SSRF protection)."
    except Exception:
        pass

    # Check direct IP address literal
    try:
        direct_ip = ipaddress.ip_address(hostname_clean)
        if _is_blocked_ip(direct_ip):
            return False, url, f"Access to IP '{direct_ip}' is forbidden (SSRF protection)."
    except ValueError:
        pass

    # Non-blocking DNS resolution
    try:
        port = parsed.port or (443 if parsed.scheme == "https" else 80)
        addr_info = await asyncio.to_thread(
            socket.getaddrinfo, hostname_clean, port, proto=socket.IPPROTO_TCP
        )
        resolved_ips = {item[4][0] for item in addr_info}
        for ip_str in resolved_ips:
            try:
                ip_obj = ipaddress.ip_address(ip_str)
                if _is_blocked_ip(ip_obj):
                    return (
                        False,
                        url,
                        f"Host '{hostname}' resolves to restricted IP '{ip_str}' (SSRF protection).",
                    )
            except ValueError:
                return False, url, f"Invalid resolved IP address: '{ip_str}'"
    except socket.gaierror as e:
        return False, url, f"Invalid host: DNS resolution failed for '{hostname}': {e}"
    except Exception as e:
        return False, url, f"Invalid host: Failed to resolve host '{hostname}': {e}"

    return True, url, None



class DeploymentReadiness:
    DEFAULT_COMPETENCIES = [
        "source ownership",
        "testing and failure handling",
        "technical explanation",
        "delivery reliability",
    ]

    @classmethod
    def build_contract(
        cls,
        *,
        profile: Dict[str, Any],
        role_title: str | None = None,
        role_requirements: List[str] | None = None,
    ) -> Dict[str, Any]:
        evidence = profile.get("skill_evidence") or {}
        complex_functions = profile.get("complex_functions") or profile.get("complex_functions_for_viva") or []
        git_dna = profile.get("git_dna") or {}
        viva_questions = profile.get("viva_questions") or []
        role = (role_title or profile.get("project_type") or "Software Engineer").strip()

        requested = [str(item).strip() for item in (role_requirements or []) if str(item).strip()]
        observed_skills = [str(key).strip() for key in evidence if str(key).strip()]
        competency_names = list(dict.fromkeys(requested + observed_skills))
        if not competency_names:
            competency_names = cls.DEFAULT_COMPETENCIES.copy()

        evidence_lookup = {str(key).lower(): paths for key, paths in evidence.items()}
        competencies: List[Dict[str, Any]] = []
        for name in competency_names[:10]:
            paths = evidence_lookup.get(name.lower(), [])
            if paths:
                state = "OBSERVED_IN_SOURCE"
                next_proof = "Confirm this capability in the role work sample."
            else:
                state = "NOT_OBSERVED"
                next_proof = f"Provide a role-specific work sample demonstrating {name}."

            competencies.append({
                "id": _slug(name),
                "name": name,
                "state": state,
                "source_files": paths[:8],
                "next_proof": next_proof,
            })

        source_files = [
            path
            for paths in evidence.values()
            for path in paths[:8]
        ]
        history_verified = bool(git_dna.get("history_verified"))
        source_available = bool(profile.get("detected_files") or source_files)
        analysis_complete = profile.get("analysis_status") == "COMPLETED"

        if analysis_complete and history_verified and source_available:
            contract_status = "READY_FOR_WORK_SAMPLE"
        else:
            contract_status = "EVIDENCE_INCOMPLETE"

        contract_basis = {
            "candidate_id": profile.get("candidate_id", "unknown"),
            "role": role,
            "competencies": competencies,
            "history_verified": history_verified,
            "source_available": source_available,
            "analysis_status": profile.get("analysis_status", "VERIFICATION_INCOMPLETE"),
        }
        contract_hash = hashlib.sha256(
            json.dumps(contract_basis, sort_keys=True, default=str).encode("utf-8")
        ).hexdigest()

        return {
            "version": "deployment-contract-v1",
            "contract_id": f"DPC-{contract_hash[:16].upper()}",
            "contract_hash": f"SHA256:{contract_hash}",
            "candidate_id": profile.get("candidate_id"),
            "role_title": role,
            "status": contract_status,
            "decision_use": "Do not use this contract as a standalone hiring score.",
            "summary": "Connects verified assessment evidence to a role work sample and later workplace verification.",
            "competencies": competencies,
            "work_sample": {
                "status": "NOT_STARTED",
                "brief": f"Complete a bounded {role} task using the candidate's own approach, then explain the trade-offs.",
                "required_evidence": [
                    "submitted work or patch",
                    "passing test or validation output",
                    "short explanation of one trade-off",
                ],
                "acceptance": "A reviewer can reproduce the result and link each claimed competency to an artifact.",
            },
            "outcome_checkpoints": [
                {
                    "checkpoint": "30_DAY",
                    "status": "NOT_RECORDED",
                    "required_evidence": "Mentor-verified first independent contribution.",
                },
                {
                    "checkpoint": "60_DAY",
                    "status": "NOT_RECORDED",
                    "required_evidence": "A shipped contribution and one reviewed collaboration artifact.",
                },
                {
                    "checkpoint": "90_DAY",
                    "status": "NOT_RECORDED",
                    "required_evidence": "Manager-verified role outcome and remaining skill gaps.",
                },
            ],
            "calibration": {
                "status": "AWAITING_WORKPLACE_OUTCOMES",
                "assessment_prediction": "NOT_COMPARED",
                "time_to_productivity": "NOT_RECORDED",
                "message": "Workplace outcomes must be supplied by an authorised mentor or employer before calibration is calculated.",
            },
            "evidence_basis": {
                "source_files": sorted(set(source_files))[:20],
                "history_verified": history_verified,
                "complex_functions": len(complex_functions),
                "viva_questions": len(viva_questions),
                "analysis_status": profile.get("analysis_status", "VERIFICATION_INCOMPLETE"),
            },
        }

    @classmethod
    async def verify_live_url(
        cls,
        raw_url: str,
        timeout_seconds: float = 5.0,
    ) -> Dict[str, Any]:
        """
        Verify the liveness, responsiveness, and headers of a candidate live URL.
        Guards against SSRF and validates URL safety.
        """
        is_safe, normalized_url, error_reason = await validate_url_and_check_ssrf(raw_url)
        if not is_safe:
            return {
                "is_live": False,
                "status_code": None,
                "response_time_ms": None,
                "server": None,
                "error": error_reason or "URL blocked by security filter",
            }

        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) ProofCard-LiveUrlVerification/2.0",
            "Accept": "*/*",
        }

        current_url = normalized_url
        start_time = time.perf_counter()
        final_response: Optional[httpx.Response] = None

        try:
            async with httpx.AsyncClient(
                timeout=httpx.Timeout(timeout_seconds, connect=min(3.0, timeout_seconds)),
                verify=True,
            ) as client:
                # Follow up to 3 redirects safely with per-hop SSRF validation
                for _ in range(4):
                    hop_safe, safe_url, hop_err = await validate_url_and_check_ssrf(current_url)
                    if not hop_safe:
                        return {
                            "is_live": False,
                            "status_code": None,
                            "response_time_ms": None,
                            "server": None,
                            "error": f"Redirect target blocked: {hop_err}",
                        }

                    # Attempt HEAD request first
                    try:
                        res = await client.head(safe_url, headers=headers, follow_redirects=False)
                    except (httpx.TimeoutException, httpx.ConnectError):
                        # Network timeout or connection failure: do NOT retry GET; re-raise to exit immediately
                        raise
                    except httpx.HTTPError:
                        # Non-fatal protocol error during HEAD; allow fallback to GET below
                        res = None

                    # If HEAD was rejected with method error (405 Method Not Allowed or 501 Not Implemented), fallback to GET
                    if res is None or res.status_code in (405, 501):
                        res = await client.get(safe_url, headers=headers, follow_redirects=False)

                    final_response = res

                    # Check for redirect
                    if res is not None and res.status_code in (301, 302, 303, 307, 308) and "location" in res.headers:
                        redirect_location = res.headers["location"]
                        current_url = urllib.parse.urljoin(safe_url, redirect_location)
                        continue
                    break

            elapsed_ms = round((time.perf_counter() - start_time) * 1000, 2)

            if final_response is None:
                return {
                    "is_live": False,
                    "status_code": None,
                    "response_time_ms": None,
                    "server": None,
                    "error": "Failed to receive a valid response from host.",
                }

            status = final_response.status_code
            server_header = final_response.headers.get("server") or final_response.headers.get("x-powered-by")
            is_live = 200 <= status < 400

            error_msg = None
            if not is_live:
                reason = getattr(final_response, "reason_phrase", None) or "Unhealthy Status"
                error_msg = f"HTTP {status}: {reason}"

            return {
                "is_live": is_live,
                "status_code": status,
                "response_time_ms": elapsed_ms,
                "server": server_header,
                "error": error_msg,
            }

        except httpx.TimeoutException:
            return {
                "is_live": False,
                "status_code": None,
                "response_time_ms": None,
                "server": None,
                "error": f"Connection timed out after {timeout_seconds}s",
            }
        except httpx.ConnectError as e:
            return {
                "is_live": False,
                "status_code": None,
                "response_time_ms": None,
                "server": None,
                "error": f"Failed to connect to host: {e}",
            }
        except Exception as e:
            return {
                "is_live": False,
                "status_code": None,
                "response_time_ms": None,
                "server": None,
                "error": f"Unexpected verification failure: {e}",
            }

