from typing import Any, Dict, List, Optional

from fastapi import APIRouter
from pydantic import BaseModel, Field

from backend.models.schemas import (
    LiveUrlVerificationRequest,
    LiveUrlVerificationResponse,
)
from backend.services.deployment_readiness import DeploymentReadiness


router = APIRouter(prefix="/api/deployment", tags=["Deployment Readiness"])


class DeploymentContractRequest(BaseModel):
    profile: Dict[str, Any]
    role_title: Optional[str] = None
    role_requirements: List[str] = Field(default_factory=list)


@router.post("/contract")
def create_deployment_contract(req: DeploymentContractRequest):
    return {
        "status": "success",
        "contract": DeploymentReadiness.build_contract(
            profile=req.profile,
            role_title=req.role_title,
            role_requirements=req.role_requirements,
        ),
    }


@router.post("/verify-live-url", response_model=LiveUrlVerificationResponse)
async def verify_live_url_endpoint(req: LiveUrlVerificationRequest):
    """
    Verify candidate live deployment or portfolio URLs with SSRF protections.
    Performs non-blocking HTTP probe and measures latency & server headers.
    """
    target_url = req.target_url()
    if not target_url:
        return LiveUrlVerificationResponse(is_live=False, error="URL must be provided.")
    result = await DeploymentReadiness.verify_live_url(target_url)
    return result

