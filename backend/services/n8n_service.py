import os
import json
import time
import asyncio
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, Any, Optional, List
from backend.services.email_formatter import EmailFormatter
import httpx

CONFIG_PATH = Path(__file__).resolve().parent.parent / "data" / "n8n_config.json"

DEFAULT_CONFIG: Dict[str, Any] = {
    "webhook_url": os.getenv("N8N_WEBHOOK_URL", ""),
    "sync_sheets": True,
    "feedback_emails": True,
    "last_test_status": None,
    "last_test_timestamp": None,
    "last_error": None
}

class N8nService:
    """
    Resilient, non-blocking n8n automation webhook dispatcher.
    Ensures zero performance degradation or downtime if n8n is offline or unconfigured.
    """
    _recent_dispatches: Dict[str, float] = {}

    @staticmethod
    def get_config() -> Dict[str, Any]:
        """Loads configuration from persistent JSON with environment fallback."""
        if CONFIG_PATH.exists():
            try:
                with open(CONFIG_PATH, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    cfg = {**DEFAULT_CONFIG, **data}
                    if not cfg.get("webhook_url") and os.getenv("N8N_WEBHOOK_URL"):
                        cfg["webhook_url"] = os.getenv("N8N_WEBHOOK_URL")
                    return cfg
            except Exception:
                pass
        return dict(DEFAULT_CONFIG)

    @staticmethod
    def save_config(new_config: Dict[str, Any]) -> Dict[str, Any]:
        """Saves n8n automation settings to persistent JSON storage."""
        current = N8nService.get_config()
        current.update(new_config)
        CONFIG_PATH.parent.mkdir(parents=True, exist_ok=True)
        try:
            with open(CONFIG_PATH, "w", encoding="utf-8") as f:
                json.dump(current, f, indent=2)
        except Exception:
            pass
        return current

    @staticmethod
    async def dispatch(event_type: str, payload: Dict[str, Any], webhook_url: Optional[str] = None) -> Dict[str, Any]:
        """
        Dispatches an event payload to the configured n8n webhook URL.
        Features a strict 3.0s non-blocking timeout and comprehensive error shielding.
        """
        target_url = webhook_url or N8nService.get_config().get("webhook_url", "").strip()
        
        if not target_url:
            return {
                "status": "skipped",
                "delivered": False,
                "event": event_type,
                "message": "n8n webhook URL not configured."
            }

        # Auto-correct URL scheme if missing (e.g. localhost:5678/webhook/test)
        if not target_url.startswith(("http://", "https://")):
            target_url = f"http://{target_url}"

        # Deduplication check for non-ping events within a 5-second window
        now = time.time()
        # Evict entries older than 60 seconds
        N8nService._recent_dispatches = {k: v for k, v in N8nService._recent_dispatches.items() if now - v < 60.0}

        dedup_key = None
        if event_type == "CANDIDATE_SCANNED":
            cid = payload.get("candidate_id") or payload.get("repo_url") or "unknown"
            dedup_key = f"scanned:{target_url}:{cid}"
        elif event_type == "FEEDBACK_DISPATCH":
            em = payload.get("email") or payload.get("candidate_id") or "unknown"
            dedup_key = f"feedback:{target_url}:{em}"
        elif event_type == "CANDIDATE_SHORTLISTED":
            wid = payload.get("winner_id") or payload.get("job_title") or "unknown"
            dedup_key = f"shortlist:{target_url}:{wid}"

        if dedup_key and dedup_key in N8nService._recent_dispatches:
            if now - N8nService._recent_dispatches[dedup_key] < 5.0:
                return {
                    "status": "skipped",
                    "delivered": False,
                    "event": event_type,
                    "message": "Duplicate event suppressed by deduplication window (5s)."
                }
        if dedup_key:
            N8nService._recent_dispatches[dedup_key] = now

        wrapped_payload = {
            "event": event_type,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "source": "ProofCard IM-105 Verification Engine",
            "data": payload
        }

        try:
            async with httpx.AsyncClient(timeout=3.0) as client:
                res = await client.post(
                    target_url,
                    json=wrapped_payload,
                    headers={
                        "Content-Type": "application/json",
                        "User-Agent": "ProofCard-n8n-Bridge/2.0",
                        "X-ProofCard-Event": event_type
                    }
                )
                delivered = (200 <= res.status_code < 300)
                return {
                    "status": "success" if delivered else "warning",
                    "delivered": delivered,
                    "event": event_type,
                    "http_status": res.status_code,
                    "error": None if delivered else f"Webhook returned HTTP {res.status_code}: {res.text[:100]}",
                    "response_text": res.text[:200] if res.text else None
                }
        except httpx.TimeoutException:
            return {
                "status": "timeout",
                "delivered": False,
                "event": event_type,
                "error": "n8n webhook did not respond within the 3.0s deadline."
            }
        except Exception as e:
            return {
                "status": "error",
                "delivered": False,
                "event": event_type,
                "error": str(e)
            }

    @staticmethod
    async def dispatch_candidate_scanned(candidate: Dict[str, Any], webhook_url: Optional[str] = None) -> Dict[str, Any]:
        """
        Dispatches CANDIDATE_SCANNED event when repository analysis completes.
        Includes candidate name, email, college, authenticity score, viva score, is_clone, qr_url.
        """
        config = N8nService.get_config()
        if not config.get("sync_sheets", True) and not webhook_url:
            return {"status": "skipped", "delivered": False, "reason": "sync_sheets disabled"}

        cid = candidate.get("candidate_id", "cand_unknown")
        qr_url = f"https://proofcard.dev/verify/{cid}"
        proof_card = candidate.get("proof_card") or {}
        email = candidate.get("email") or proof_card.get("email")

        auth_score = candidate.get("authenticity_score", 0)
        is_clone = bool(candidate.get("is_clone", False))
        decision = "SHORTLISTED" if (auth_score >= 70 and not is_clone) else "FEEDBACK"
        
        email_data = EmailFormatter.generate_email(
            candidate=candidate,
            decision=decision
        )

        payload = {
            **email_data,
            "candidate_id": cid,
            "name": candidate.get("name") or candidate.get("candidate_name") or "Anonymous Candidate",
            "email": email,
            "to": email,
            "recipient": email,
            "college": candidate.get("college") or "Affiliated Institution",
            "college_tier": candidate.get("college_tier", "Tier-3"),
            "repo_url": candidate.get("repo_url", ""),
            "project_name": candidate.get("project_name", "Software Project"),
            "project_type": candidate.get("project_type", "Fullstack Application"),
            "authenticity_score": auth_score,
            "viva_score": candidate.get("viva_score", 0),
            "is_clone": is_clone,
            "matched_tutorial": candidate.get("matched_tutorial"),
            "status": proof_card.get("status") or candidate.get("analysis_status", "COMPLETED"),
            "headline": proof_card.get("headline", ""),
            "tamper_proof_hash": candidate.get("tamper_proof_hash") or proof_card.get("tamper_proof_hash", ""),
            "qr_verification_url": email_data.get("verification_url", qr_url),
            "verification_url": email_data.get("verification_url", qr_url),
            "action_plan": "\n\n".join(f"{s['title']}\n{s['desc']}" for s in email_data.get("action_plan_steps", []))
        }

        result = await N8nService.dispatch("CANDIDATE_SCANNED", payload, webhook_url)

        # If candidate has low authenticity or is a clone, automatically queue constructive feedback email
        auth_score = candidate.get("authenticity_score", 0)
        is_clone = bool(candidate.get("is_clone", False))
        if (auth_score < 60 or is_clone) and email and config.get("feedback_emails", True):
            asyncio.create_task(N8nService.dispatch_feedback_email(candidate, webhook_url))

        return result

    @staticmethod
    async def dispatch_candidate_shortlisted(shortlist_data: Dict[str, Any], webhook_url: Optional[str] = None) -> Dict[str, Any]:
        """
        Dispatches CANDIDATE_SHORTLISTED event when candidates are ranked or shortlisted in Recruiter Battle.
        """
        candidates_summary = []
        raw_list = shortlist_data.get("battle_matrix") or shortlist_data.get("shortlisted") or []
        for idx, c in enumerate(raw_list):
            candidates_summary.append({
                "rank": idx + 1,
                "candidate_id": c.get("candidate_id"),
                "name": c.get("name"),
                "email": c.get("email"),
                "college": c.get("college"),
                "authenticity_score": c.get("authenticity_score", 0),
                "viva_score": c.get("viva_score", 0),
                "composite_score": c.get("composite_score", 0),
                "jd_match_pct": c.get("jd_match_pct", 0),
                "verified_skills": c.get("verified_skills", []),
                "is_clone": c.get("is_clone", False)
            })

        payload = {
            "job_title": shortlist_data.get("job_title", "Software Engineer"),
            "winner_id": shortlist_data.get("winner_id"),
            "winner_name": shortlist_data.get("winner_name"),
            "diff_pts": shortlist_data.get("diff_pts", 0),
            "rationale": shortlist_data.get("rationale", ""),
            "total_candidates": len(candidates_summary),
            "candidates": candidates_summary
        }

        return await N8nService.dispatch("CANDIDATE_SHORTLISTED", payload, webhook_url)

    @staticmethod
    async def dispatch_feedback_email(
        candidate: Dict[str, Any], 
        webhook_url: Optional[str] = None,
        decision: str = "FEEDBACK",
        rejection_reason_code: Optional[str] = None,
        custom_note: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Dispatches FEEDBACK_DISPATCH / DECISION_EMAIL event with full luxury HTML & structured plain text.
        """
        proof_card = candidate.get("proof_card") or {}
        email = candidate.get("email") or proof_card.get("email")
        if not email:
            return {"status": "skipped", "delivered": False, "reason": "No student email provided"}

        email_data = EmailFormatter.generate_email(
            candidate=candidate,
            decision=decision,
            rejection_reason_code=rejection_reason_code,
            custom_note=custom_note
        )

        # Retain backward-compatible fields in payload while providing luxury formatted emails
        payload = {
            **email_data,
            "action_plan": "\n\n".join(f"{s['title']}\n{s['desc']}" for s in email_data.get("action_plan_steps", []))
        }

        event_name = "CANDIDATE_SHORTLISTED" if decision == "SHORTLISTED" else "FEEDBACK_DISPATCH"
        return await N8nService.dispatch(event_name, payload, webhook_url)

    @staticmethod
    async def dispatch_test_ping(webhook_url: Optional[str] = None) -> Dict[str, Any]:
        """Sends a verification ping to n8n to test connectivity."""
        payload = {
            "ping": "pong",
            "message": "Connection test from ProofCard IM-105 Verification Engine.",
            "test_candidate": {
                "name": "Priyanshu Awasthi",
                "email": "priyanshu@example.edu",
                "college": "GLA University",
                "authenticity_score": 96,
                "viva_score": 9,
                "is_clone": False,
                "status": "VERIFIED_EXEMPLARY"
            }
        }
        res = await N8nService.dispatch("TEST_PING", payload, webhook_url)
        # Update config with status
        N8nService.save_config({
            "last_test_status": "SUCCESS" if res.get("delivered") else "FAILED",
            "last_test_timestamp": datetime.now(timezone.utc).isoformat(),
            "last_error": res.get("error")
        })
        return res
