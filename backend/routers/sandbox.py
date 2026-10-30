"""
backend/routers/sandbox.py
FastAPI Router for Enterprise Sandbox API Ingestion.
Endpoints:
- POST /api/v1/sandbox/bulk-ingest
- POST /api/v1/sandbox/resumes/batch
- GET  /api/v1/sandbox/batch/{batch_id}
"""

from typing import List, Optional
from fastapi import APIRouter, Header, Form, Query, File, UploadFile, HTTPException, status

from backend.models.resume_schemas import (
    SandboxBulkIngestRequest,
    SandboxBulkIngestResponse,
)
from backend.services.sandbox_service import SandboxIngestionService

router = APIRouter(prefix="/api/v1/sandbox", tags=["Sandbox API Bulk Ingestion"])


@router.get(
    "/status",
    summary="Get Sandbox API Status",
    description="Returns sandbox operational readiness, batch limits, and supported formats.",
)
def get_sandbox_status(
    x_sandbox_api_key: Optional[str] = Header(None, alias="X-Sandbox-API-Key"),
    sandbox_api_key: Optional[str] = Query(None),
    authorization: Optional[str] = Header(None, alias="Authorization"),
    company_id: Optional[str] = Query(None),
    company_name: Optional[str] = Query(None),
):
    """
    Verifies Sandbox API authentication and returns operational readiness status.
    Authenticate via X-Sandbox-API-Key header, sandbox_api_key query param, or Authorization: Bearer <key>.
    """
    valid_key = SandboxIngestionService.authenticate(
        header_key=x_sandbox_api_key,
        query_key=sandbox_api_key,
        bearer_header=authorization,
    )
    auth_company = company_id or company_name or "integraminds_partner"
    return {
        "status": "ready",
        "company_id": auth_company,
        "max_batch_size": 500,
        "supported_formats": [".pdf", ".docx", ".doc", ".txt", ".md"],
    }


@router.post(
    "/bulk-ingest",
    response_model=SandboxBulkIngestResponse,
    summary="Bulk Ingest Candidate Records",
    description="Accepts batch candidate JSON array (up to 500 candidates) with API key auth and per-candidate error isolation.",
)
def bulk_ingest_candidates(
    request: SandboxBulkIngestRequest,
    x_sandbox_api_key: Optional[str] = Header(None, alias="X-Sandbox-API-Key"),
    authorization: Optional[str] = Header(None, alias="Authorization"),
):
    """
    Ingests multiple candidate records in a single payload.
    Supports raw text and base64-encoded resumes.
    """
    valid_key = SandboxIngestionService.authenticate(
        header_key=x_sandbox_api_key,
        payload_key=request.sandbox_api_key,
        bearer_header=authorization,
    )
    return SandboxIngestionService.process_bulk_batch(request=request, api_key=valid_key)


@router.post(
    "/resumes/batch",
    response_model=SandboxBulkIngestResponse,
    summary="Batch Upload Resume Files",
    description="Accepts multi-file multipart upload (up to 500 files) linked to company and optional job ID.",
)
async def batch_upload_resumes(
    files: List[UploadFile] = File(..., description="List of resume files (PDF, DOCX, DOC, TXT)"),
    company_id: str = Form("integraminds_partner"),
    job_id: Optional[str] = Form(None),
    sandbox_api_key: Optional[str] = Form(None),
    x_sandbox_api_key: Optional[str] = Header(None, alias="X-Sandbox-API-Key"),
    authorization: Optional[str] = Header(None, alias="Authorization"),
):
    """
    Processes multiple resume files uploaded via multipart form.
    Isolates errors per file so invalid files do not fail valid resumes.
    """
    valid_key = SandboxIngestionService.authenticate(
        header_key=x_sandbox_api_key,
        form_key=sandbox_api_key,
        bearer_header=authorization,
    )
    return await SandboxIngestionService.process_file_batch(
        files=files,
        company_id=company_id,
        job_id=job_id,
        api_key=valid_key,
    )


@router.get(
    "/batch/{batch_id}",
    response_model=SandboxBulkIngestResponse,
    summary="Get Batch Status & Results",
    description="Returns current status and per-candidate results for a batch by batch_id.",
)
def get_batch_status(
    batch_id: str,
    x_sandbox_api_key: Optional[str] = Header(None, alias="X-Sandbox-API-Key"),
    sandbox_api_key: Optional[str] = Query(None),
    authorization: Optional[str] = Header(None, alias="Authorization"),
):
    """
    Retrieves status and results for an ingested batch.
    Requires authenticated Sandbox API key.
    """
    SandboxIngestionService.authenticate(
        header_key=x_sandbox_api_key,
        query_key=sandbox_api_key,
        bearer_header=authorization,
    )
    batch = SandboxIngestionService.get_batch(batch_id)
    if not batch:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Batch ID '{batch_id}' not found.",
        )
    return batch
