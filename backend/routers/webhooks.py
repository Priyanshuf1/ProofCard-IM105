import asyncio
from typing import Optional, Dict, Any, List
from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel, Field

from backend.models.schemas import IngestionURLRequest
from backend.services.n8n_service import N8nService
from backend.services.email_formatter import EmailFormatter
from backend.routers.github_analysis import analyze_github_repo

router = APIRouter(prefix="/api/webhooks", tags=["n8n & Continuous Verification Webhooks"])

class N8nConfigRequest(BaseModel):
    webhook_url: Optional[str] = ""
    sync_sheets: Optional[bool] = True
    feedback_emails: Optional[bool] = True

class TestWebhookRequest(BaseModel):
    webhook_url: Optional[str] = None

class DispatchEventRequest(BaseModel):
    event_type: str
    payload: Dict[str, Any]
    webhook_url: Optional[str] = None

class ContinuousVerificationRequest(BaseModel):
    github_url: str
    candidate_name: Optional[str] = "Continuous Integration Candidate"
    email: Optional[str] = None
    college: Optional[str] = "Automated CI/CD Pipeline"
    consent_granted: bool = True
    github_token: Optional[str] = None
    target_subpath: Optional[str] = None

@router.get("/n8n-config")
def get_n8n_config():
    """Returns the currently active n8n automation webhook configuration."""
    return N8nService.get_config()

@router.post("/n8n-config")
def update_n8n_config(req: N8nConfigRequest):
    """Saves or updates n8n automation settings."""
    cfg = req.model_dump(exclude_unset=True)
    updated = N8nService.save_config(cfg)
    return {
        "status": "success",
        "message": "n8n configuration updated successfully.",
        "config": updated
    }

@router.post("/test")
async def test_n8n_connection(req: Optional[TestWebhookRequest] = None):
    """
    Sends a test ping to the configured n8n webhook URL.
    Returns status: 'success' and delivered: true on success.
    """
    url = req.webhook_url if req else None
    result = await N8nService.dispatch_test_ping(webhook_url=url)
    return result

@router.post("/dispatch")
async def dispatch_custom_event(req: DispatchEventRequest):
    """
    Dispatches an event directly to the configured n8n webhook.
    Supported events: CANDIDATE_SCANNED, CANDIDATE_SHORTLISTED, FEEDBACK_DISPATCH.
    """
    if req.event_type == "CANDIDATE_SHORTLISTED":
        result = await N8nService.dispatch_candidate_shortlisted(req.payload, req.webhook_url)
    elif req.event_type == "FEEDBACK_DISPATCH":
        result = await N8nService.dispatch_feedback_email(req.payload, req.webhook_url)
    elif req.event_type == "CANDIDATE_SCANNED":
        result = await N8nService.dispatch_candidate_scanned(req.payload, req.webhook_url)
    else:
        result = await N8nService.dispatch(req.event_type, req.payload, req.webhook_url)
    return result

@router.post("/continuous-verification")
async def trigger_continuous_verification(
    req: ContinuousVerificationRequest,
    background_tasks: BackgroundTasks
):
    """
    Inbound webhook endpoint that accepts { github_url, candidate_name, email, college }
    (as forwarded by GitHub push webhooks or n8n workflows) and triggers forensic analysis.
    Dispatches CANDIDATE_SCANNED back to n8n once completed.
    """
    if not req.github_url or not req.github_url.strip():
        raise HTTPException(status_code=400, detail="github_url is required for continuous verification.")

    ingest_req = IngestionURLRequest(
        github_url=req.github_url.strip(),
        candidate_name=req.candidate_name,
        college=req.college,
        consent_granted=req.consent_granted,
        github_token=req.github_token,
        target_subpath=req.target_subpath,
        email=req.email
    )

    try:
        profile = await analyze_github_repo(ingest_req)
        # Ensure email is included
        if req.email and not profile.get("email"):
            profile["email"] = req.email

        # Asynchronously dispatch candidate scanned event to n8n
        background_tasks.add_task(N8nService.dispatch_candidate_scanned, profile)

        return {
            "status": "success",
            "message": "Continuous verification analysis completed successfully.",
            "profile": profile
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Continuous verification failed: {str(e)}")

class DecisionEmailRequest(BaseModel):
    candidate: Dict[str, Any]
    decision: str = "FEEDBACK"  # "SHORTLISTED", "REJECTED", "FEEDBACK"
    rejection_reason_code: Optional[str] = None
    custom_note: Optional[str] = None
    webhook_url: Optional[str] = None

@router.post("/send-decision-email")
async def send_decision_email(req: DecisionEmailRequest):
    """
    Generates luxury HTML and text candidate decision report,
    and dispatches via n8n webhook or returns formatted payload.
    """
    email_data = EmailFormatter.generate_email(
        candidate=req.candidate,
        decision=req.decision,
        rejection_reason_code=req.rejection_reason_code,
        custom_note=req.custom_note
    )
    dispatch_res = await N8nService.dispatch(
        event_type="DECISION_EMAIL_DISPATCH",
        payload=email_data,
        webhook_url=req.webhook_url
    )
    return {
        "status": "success",
        "delivered": dispatch_res.get("delivered", False),
        "email_data": email_data,
        "dispatch_result": dispatch_res
    }


class VivaInvitationRequest(BaseModel):
    candidate: Dict[str, Any]
    custom_message: Optional[str] = None
    webhook_url: Optional[str] = None

@router.post("/send-viva-invitation")
async def send_viva_invitation(req: VivaInvitationRequest):
    """
    Generates professional Viva Defense Invitation email with direct links and mailto fallback,
    and dispatches via webhook or returns email payload.
    """
    invitation_data = EmailFormatter.generate_viva_invitation(
        candidate=req.candidate,
        custom_note=req.custom_message
    )
    dispatch_res = await N8nService.dispatch(
        event_type="VIVA_INVITATION_DISPATCH",
        payload=invitation_data,
        webhook_url=req.webhook_url
    )
    return {
        "status": "success",
        "delivered": dispatch_res.get("delivered", False),
        "invitation_data": invitation_data,
        "dispatch_result": dispatch_res
    }
