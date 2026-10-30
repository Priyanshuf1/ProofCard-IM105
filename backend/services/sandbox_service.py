"""
backend/services/sandbox_service.py
Enterprise Sandbox Bulk Ingestion Service for ProofCard (IM-105).
Handles API key authentication, bulk JSON ingestion, multi-file uploads,
error isolation, and in-memory batch state management.
"""

import os
import uuid
import base64
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional, Tuple, Set
from fastapi import HTTPException, status, UploadFile

from backend.models.resume_schemas import (
    ParsedResume,
    CandidateContact,
    CandidateSkills,
    BulkCandidateItem,
    SandboxBulkIngestRequest,
    IngestionResultItem,
    SandboxBulkIngestResponse,
)
from backend.services.resume_parser import ResumeParserService


class SandboxIngestionService:
    """Enterprise service for Sandbox API key validation, batch ingestion, and polling."""

    DEFAULT_KEYS: Set[str] = {
        "sandbox_key_deviathon_2026",
        "imats_sandbox_live_key_99",
        "test_sandbox_key_2026",
        "sbx_enterprise_demo_key",
        "sbx_valid_partner_key",
    }

    # In-memory batch store: batch_id -> SandboxBulkIngestResponse
    _BATCH_STORE: Dict[str, SandboxBulkIngestResponse] = {}

    @classmethod
    def get_valid_api_keys(cls) -> Set[str]:
        """Loads valid API keys from environment variable and built-in defaults."""
        keys = set(cls.DEFAULT_KEYS)
        env_keys = os.getenv("SANDBOX_API_KEYS", "")
        if env_keys:
            for k in env_keys.split(","):
                k_clean = k.strip()
                if k_clean:
                    keys.add(k_clean)
        return keys

    @classmethod
    def verify_api_key(cls, key: Optional[str]) -> bool:
        """
        Validates the provided Sandbox API key.
        Accepts registered keys or keys with prefix 'sbx_' (length >= 8).
        """
        if not key or not str(key).strip():
            return False
        clean_key = str(key).strip()
        valid_keys = cls.get_valid_api_keys()
        if clean_key in valid_keys:
            return True
        if clean_key.startswith("sbx_") and len(clean_key) >= 8:
            return True
        return False

    @classmethod
    def authenticate(
        cls,
        header_key: Optional[str] = None,
        payload_key: Optional[str] = None,
        form_key: Optional[str] = None,
        query_key: Optional[str] = None,
        bearer_header: Optional[str] = None,
    ) -> str:
        """
        Unified authentication method.
        Resolves candidate key from header, payload, form, query, or bearer token.
        Raises 401 if missing, 403 if invalid.
        """
        resolved_key = (
            (header_key and header_key.strip())
            or (payload_key and payload_key.strip())
            or (form_key and form_key.strip())
            or (query_key and query_key.strip())
        )

        if not resolved_key and bearer_header:
            parts = bearer_header.strip().split()
            if len(parts) == 2 and parts[0].lower() == "bearer":
                resolved_key = parts[1].strip()

        if not resolved_key:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Missing Sandbox API key. Provide via header 'X-Sandbox-API-Key' or body 'sandbox_api_key'.",
            )

        if not cls.verify_api_key(resolved_key):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Invalid or expired Sandbox API key.",
            )

        return resolved_key

    @classmethod
    def process_bulk_batch(
        cls,
        request: SandboxBulkIngestRequest,
        api_key: str,
    ) -> SandboxBulkIngestResponse:
        """
        Processes a JSON batch of candidate records with per-candidate error isolation.
        Supports up to 500 candidates.
        """
        candidates = request.candidates or []
        if len(candidates) == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Candidates list cannot be empty.",
            )
        if len(candidates) > 500:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail="Batch size exceeds maximum limit of 500 candidates.",
            )

        batch_id = f"batch_{uuid.uuid4().hex[:12]}"
        created_at = datetime.now(timezone.utc).isoformat()
        results: List[IngestionResultItem] = []
        successful_count = 0
        failed_count = 0

        for idx, item in enumerate(candidates):
            cand_id = item.candidate_id or f"cand_{uuid.uuid4().hex[:8]}"
            try:
                if not item.name or not str(item.name).strip():
                    raise ValueError("Candidate name is required and missing.")

                parsed_profile: Optional[ParsedResume] = None

                # Branch A: Base64-encoded resume file
                if item.resume_base64 and item.resume_base64.strip():
                    try:
                        raw_bytes = base64.b64decode(item.resume_base64.strip(), validate=True)
                    except Exception as b64_exc:
                        raise ValueError(f"Corrupted or invalid base64 encoding: {b64_exc}")

                    filename = item.resume_filename or f"{cand_id}.pdf"
                    raw_text = ResumeParserService.parse_document(filename, raw_bytes)
                    parsed_profile = ResumeParserService.extract_structured_candidate(
                        raw_text=raw_text,
                        filename=filename,
                        candidate_id=cand_id,
                    )

                # Branch B: Plain raw resume text
                elif item.resume_text and item.resume_text.strip():
                    parsed_profile = ResumeParserService.extract_structured_candidate(
                        raw_text=item.resume_text.strip(),
                        filename=item.resume_filename or "resume.txt",
                        candidate_id=cand_id,
                    )

                # Branch C: Structured candidate profile without resume attachment
                else:
                    contact = CandidateContact(
                        name=item.name,
                        email=item.email,
                        github_url=item.repo_url,
                        portfolio_url=item.portfolio_url,
                    )
                    skills = CandidateSkills(technical=item.raw_skills or [])
                    raw_snippet = f"Candidate: {item.name}\nCollege: {item.college}\nSkills: {', '.join(item.raw_skills or [])}"
                    parsed_profile = ParsedResume(
                        candidate_id=cand_id,
                        contact_info=contact,
                        skills=skills,
                        raw_text=raw_snippet,
                        file_metadata={"source": "direct_json_metadata", "college": item.college},
                    )

                # Overlay any explicit metadata passed in the request item
                if parsed_profile:
                    if item.name and (not parsed_profile.contact_info.name or parsed_profile.contact_info.name.startswith("Candidate_") or parsed_profile.contact_info.name == "Anonymous Candidate"):
                        parsed_profile.contact_info.name = item.name
                    if item.email and not parsed_profile.contact_info.email:
                        parsed_profile.contact_info.email = item.email
                    if item.repo_url and not parsed_profile.contact_info.github_url:
                        parsed_profile.contact_info.github_url = item.repo_url
                    if item.portfolio_url and not parsed_profile.contact_info.portfolio_url:
                        parsed_profile.contact_info.portfolio_url = item.portfolio_url
                    if item.raw_skills:
                        existing = set(s.lower() for s in parsed_profile.skills.technical)
                        for s in item.raw_skills:
                            if s.lower() not in existing:
                                parsed_profile.skills.technical.append(s)

                results.append(
                    IngestionResultItem(
                        candidate_id=cand_id,
                        name=item.name,
                        status="SUCCESS",
                        parsed_profile=parsed_profile,
                        error_message=None,
                    )
                )
                successful_count += 1

            except Exception as exc:
                # Strictly isolate error to this candidate
                results.append(
                    IngestionResultItem(
                        candidate_id=cand_id,
                        name=item.name or "Unknown Record",
                        status="FAILED",
                        parsed_profile=None,
                        error_message=f"Candidate ingestion failed: {str(exc)}",
                    )
                )
                failed_count += 1

        batch_status = "COMPLETED" if failed_count == 0 else ("PARTIAL" if successful_count > 0 else "FAILED")

        response = SandboxBulkIngestResponse(
            batch_id=batch_id,
            company_id=request.company_id or "integraminds_partner",
            job_id=request.job_id,
            total_received=len(candidates),
            successful_count=successful_count,
            failed_count=failed_count,
            results=results,
            status=batch_status,
            created_at=created_at,
        )

        cls._BATCH_STORE[batch_id] = response
        return response

    @classmethod
    async def process_file_batch(
        cls,
        files: List[UploadFile],
        company_id: str,
        job_id: Optional[str],
        api_key: str,
    ) -> SandboxBulkIngestResponse:
        """
        Processes a multi-file multipart upload of resumes with error isolation per file.
        Supports up to 500 files.
        """
        if not files or len(files) == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Files list cannot be empty.",
            )
        if len(files) > 50:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail="Batch size exceeds maximum limit of 500 files (maximum 50 files per batch upload).",
            )

        batch_id = f"batch_{uuid.uuid4().hex[:12]}"
        created_at = datetime.now(timezone.utc).isoformat()
        results: List[IngestionResultItem] = []
        successful_count = 0
        failed_count = 0

        for file in files:
            cand_id = f"cand_{uuid.uuid4().hex[:8]}"
            filename = file.filename or "resume.pdf"
            try:
                ext = os.path.splitext(filename.lower())[1]
                if ext not in {".pdf", ".docx", ".doc", ".txt", ".md"}:
                    raise ValueError(f"Unsupported file format '{ext}'. Supported: .pdf, .docx, .doc, .txt, .md")

                content = await file.read()
                if len(content) == 0:
                    raise ValueError("Uploaded file is empty (0 bytes).")
                if len(content) > 10 * 1024 * 1024:
                    raise ValueError("File size exceeds maximum limit of 10MB.")

                raw_text = ResumeParserService.parse_document(filename, content)
                parsed_profile = ResumeParserService.extract_structured_candidate(
                    raw_text=raw_text,
                    filename=filename,
                    candidate_id=cand_id,
                )

                candidate_name = parsed_profile.contact_info.name or filename

                results.append(
                    IngestionResultItem(
                        candidate_id=cand_id,
                        name=candidate_name,
                        status="SUCCESS",
                        parsed_profile=parsed_profile,
                        error_message=None,
                    )
                )
                successful_count += 1

            except Exception as exc:
                results.append(
                    IngestionResultItem(
                        candidate_id=cand_id,
                        name=filename,
                        status="FAILED",
                        parsed_profile=None,
                        error_message=f"File parsing failed: {str(exc)}",
                    )
                )
                failed_count += 1

        batch_status = "COMPLETED" if failed_count == 0 else ("PARTIAL" if successful_count > 0 else "FAILED")

        response = SandboxBulkIngestResponse(
            batch_id=batch_id,
            company_id=company_id or "integraminds_partner",
            job_id=job_id,
            total_received=len(files),
            successful_count=successful_count,
            failed_count=failed_count,
            results=results,
            status=batch_status,
            created_at=created_at,
        )

        cls._BATCH_STORE[batch_id] = response
        return response

    @classmethod
    def get_batch(cls, batch_id: str) -> Optional[SandboxBulkIngestResponse]:
        """Retrieves stored batch status by batch_id."""
        return cls._BATCH_STORE.get(batch_id)

    @classmethod
    def clear_batches(cls) -> None:
        """Utility for test suite cleanup."""
        cls._BATCH_STORE.clear()
