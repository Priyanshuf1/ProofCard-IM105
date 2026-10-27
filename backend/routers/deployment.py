from typing import Any, Dict, List, Optional

from fastapi import APIRouter
from pydantic import BaseModel, Field

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
