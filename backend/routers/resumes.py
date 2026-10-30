"""
backend/routers/resumes.py
FastAPI Router for Single Resume Upload and Parsing.
Endpoint: POST /api/v1/resumes/upload
"""

import os
import uuid
from typing import Optional
from fastapi import APIRouter, UploadFile, File, Form, Header, HTTPException, status

from backend.models.resume_schemas import (
    ResumeUploadResponse,
)
from backend.services.resume_parser import (
    ResumeParserService,
    PasswordProtectedFileError,
    CorruptedFileError,
    ScannedOrEmptyResumeError,
    UnsupportedFormatError,
)

router = APIRouter(prefix="/api/v1/resumes", tags=["Resume Ingestion"])


@router.post(
    "/upload",
    response_model=ResumeUploadResponse,
    summary="Upload and Parse Single Resume Document",
    description="Accepts single resume document (PDF, DOCX, DOC, TXT) and parses into structured profile.",
)
async def upload_single_resume(
    file: UploadFile = File(..., description="Resume file to upload (PDF, DOCX, DOC, TXT)"),
    candidate_name: Optional[str] = Form(None, description="Optional override for candidate name"),
    email: Optional[str] = Form(None, description="Optional override for candidate email"),
    gemini_api_key: Optional[str] = Form(None, description="Optional Gemini API key for multimodal parsing"),
    x_gemini_api_key: Optional[str] = Header(None, alias="x-gemini-api-key"),
):
    """
    Validates, parses, and extracts structured entities from a single resume document.
    """
    filename = file.filename or "resume.pdf"
    ext = os.path.splitext(filename.lower())[1]

    # Validate file extension
    if ext not in {".pdf", ".docx", ".doc", ".txt", ".md"}:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file format '{ext}'. Supported formats: .pdf, .docx, .doc, .txt, .md.",
        )

    # Read binary content and check size boundaries
    content = await file.read()
    if len(content) == 0:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="The uploaded resume contains no extractable text or is corrupted/scanned.",
        )
    if len(content) > 10 * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="Resume file size exceeds maximum limit of 10MB.",
        )

    candidate_id = f"cand_{uuid.uuid4().hex[:8]}"
    effective_gemini_key = gemini_api_key or x_gemini_api_key or os.getenv("GEMINI_API_KEY")

    # Document parsing with specific exception translation
    try:
        raw_text = ResumeParserService.parse_document(filename=filename, content=content)
    except PasswordProtectedFileError:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Password-protected PDF files cannot be parsed.",
        )
    except UnsupportedFormatError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )
    except CorruptedFileError as exc:
        if ext == ".docx":
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Failed to parse DOCX document: invalid or corrupted archive.",
            )
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="The uploaded resume contains no extractable text or is corrupted/scanned.",
        )
    except ScannedOrEmptyResumeError:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="The uploaded resume contains no extractable text or is corrupted/scanned.",
        )
    except Exception as exc:
        err_msg = str(exc).lower()
        if "password" in err_msg or "encrypt" in err_msg:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Password-protected PDF files cannot be parsed.",
            )
        if ext == ".docx" or "docx" in err_msg or "zip" in err_msg:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Failed to parse DOCX document: invalid or corrupted archive.",
            )
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="The uploaded resume contains no extractable text or is corrupted/scanned.",
        )

    # Scanned document or empty text detection
    if not raw_text or len(raw_text.strip()) < 20:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="The uploaded resume contains no extractable text or is corrupted/scanned.",
        )

    # Structured profile extraction
    try:
        parsed_resume = ResumeParserService.extract_structured_candidate(
            raw_text=raw_text,
            filename=filename,
            candidate_id=candidate_id,
            gemini_api_key=effective_gemini_key,
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Entity extraction failed: {str(exc)}",
        )

    # Apply overrides from form fields if provided
    if candidate_name and candidate_name.strip():
        parsed_resume.contact_info.name = candidate_name.strip()
    if email and email.strip():
        parsed_resume.contact_info.email = email.strip()

    return ResumeUploadResponse(
        status="SUCCESS",
        candidate_id=candidate_id,
        parsed_resume=parsed_resume,
        message="Resume successfully parsed into structured format",
    )
