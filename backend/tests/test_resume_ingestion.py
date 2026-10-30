"""
backend/tests/test_resume_ingestion.py
=======================================
Milestone 1 Test Suite: Multi-Format Resume Ingestion & Validation
Covers:
- PDF parsing (valid, password-protected, scanned/low-text, corrupted)
- DOCX parsing (paragraphs, embedded tables, corrupted packages)
- Legacy DOC parsing (OLE2 header, binary string extraction)
- Plain text / Markdown parsing (UTF-8, Latin-1)
- Unicode text normalization and section segmentation
- Structured candidate profile extraction
- FastAPI router integration (/api/v1/resumes/upload)
- Boundary conditions: 0-byte, >10MB, unsupported extensions, missing files
"""

import io
import re
import pytest
import docx
import pypdf
from fastapi.testclient import TestClient

from backend.main import app
from backend.services.resume_parser import (
    ResumeParserService,
    UnsupportedFormatError,
    PasswordProtectedFileError,
    CorruptedFileError,
    ScannedOrEmptyResumeError,
)
from backend.models.resume_schemas import ParsedResume

client = TestClient(app)

# ============================================================================
# IN-MEMORY FIXTURE GENERATORS
# ============================================================================

def generate_valid_pdf_bytes(
    name: str = "Priyanshu Awasthi",
    email: str = "priyanshu@example.com",
    skills: list = None,
    github_url: str = "https://github.com/priyanshu/fastapi-distributed"
) -> bytes:
    """Generates a valid, minimal PDF-1.4 binary file with exact byte offset xref."""
    if skills is None:
        skills = ["Python", "FastAPI", "Docker", "PostgreSQL", "Redis"]
    lines = [
        f"{name}",
        f"Email: {email} | Phone: +91-9876543210",
        f"GitHub: {github_url}",
        f"Skills: {', '.join(skills)}",
        "Education: GLA University Mathura, B.Tech Computer Science (2024)",
        "Experience: Backend Engineering Intern at TechFlow (2023-2024)",
        "Projects: Distributed Task Queue using Redis and asyncio with FastAPI"
    ]
    stream_content = "BT\n/F1 12 Tf\n50 750 Td\n14 TL\n"
    for line in lines:
        clean = line.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")
        stream_content += f"({clean}) ' \n"
    stream_content += "ET\n"
    stream_bytes = stream_content.encode("latin1")

    header = b"%PDF-1.4\n"
    obj1 = b"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n"
    obj2 = b"2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n"
    obj3 = b"3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n"
    obj4 = f"4 0 obj\n<< /Length {len(stream_bytes)} >>\nstream\n".encode("latin1") + stream_bytes + b"\nendstream\nendobj\n"
    obj5 = b"5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n"

    offsets = [0]
    curr = len(header)
    for obj in [obj1, obj2, obj3, obj4, obj5]:
        offsets.append(curr)
        curr += len(obj)

    xref = f"xref\n0 {len(offsets)}\n0000000000 65535 f \n".encode("latin1")
    for off in offsets[1:]:
        xref += f"{off:010d} 00000 n \n".encode("latin1")

    trailer = f"trailer\n<< /Size {len(offsets)} /Root 1 0 R >>\nstartxref\n{curr}\n%%EOF".encode("latin1")
    return header + obj1 + obj2 + obj3 + obj4 + obj5 + xref + trailer


def generate_encrypted_pdf_bytes(password: str = "secret123") -> bytes:
    """Generates a valid PDF encrypted with user password."""
    raw = generate_valid_pdf_bytes("Confidential Candidate", "secret@example.com")
    reader = pypdf.PdfReader(io.BytesIO(raw))
    writer = pypdf.PdfWriter()
    writer.append(reader)
    writer.encrypt(password)
    buf = io.BytesIO()
    writer.write(buf)
    return buf.getvalue()


def generate_valid_docx_bytes(
    name: str = "Aditi Sharma",
    email: str = "aditi@example.com",
    skills: list = None,
    github_url: str = "https://github.com/aditi/auth-microservice"
) -> bytes:
    """Generates a valid Microsoft Word .docx file with paragraphs and embedded tables."""
    if skills is None:
        skills = ["Go", "Kubernetes", "gRPC", "Docker", "Prometheus"]
    doc = docx.Document()
    doc.add_heading(name, 0)
    doc.add_paragraph(f"Email: {email} | Phone: +91-9812345678")
    doc.add_paragraph(f"GitHub: {github_url}")
    doc.add_heading("Summary", level=1)
    doc.add_paragraph("Cloud infrastructure engineer specializing in Go microservices and Kubernetes controllers.")
    doc.add_heading("Technical Skills", level=1)
    doc.add_paragraph(", ".join(skills))
    doc.add_heading("Education", level=1)
    table = doc.add_table(rows=2, cols=3)
    hdr = table.rows[0].cells
    hdr[0].text = "Institution"
    hdr[1].text = "Degree"
    hdr[2].text = "Year"
    row = table.rows[1].cells
    row[0].text = "IIT Roorkee"
    row[1].text = "B.Tech Computer Science"
    row[2].text = "2024"
    buf = io.BytesIO()
    doc.save(buf)
    return buf.getvalue()


def generate_legacy_doc_bytes(
    name: str = "Rohan Verma",
    email: str = "rohan@example.com",
    skills: list = None
) -> bytes:
    """Generates an OLE2 binary stream mock for legacy Word .doc format."""
    if skills is None:
        skills = ["Java", "Spring Boot", "MySQL", "AWS", "Kafka"]
    ole2_header = b"\xd0\xcf\x11\xe0\xa1\xb1\x1a\xe1\x00\x00\x00\x00\x00\x00\x00\x00"
    text_content = (
        f"{name}\n"
        f"Email: {email}\n"
        f"Skills: {', '.join(skills)}\n"
        f"Education: NIT Trichy, B.Tech CSE (2024)\n"
        f"GitHub: https://github.com/rohan/spring-ecommerce\n"
    )
    ascii_bytes = text_content.encode("ascii")
    utf16_bytes = "Projects: High-throughput Kafka order processing engine.".encode("utf-16le")
    return ole2_header + b"\x00" * 32 + b"WordDocument" + b"\x00" * 16 + ascii_bytes + b"\x00" * 8 + utf16_bytes


def generate_text_resume(
    name: str = "Sunil Mehta",
    email: str = "sunil@example.com",
    skills: list = None
) -> str:
    """Generates plain text/markdown resume."""
    if skills is None:
        skills = ["Rust", "Tokio", "C++", "WebAssembly"]
    return f"""# {name}
Email: {email} | Phone: +91-9123456780
GitHub: https://github.com/sunil/distributed-broker

## Professional Summary
Systems engineer with extensive background in concurrent systems programming in Rust and low-latency network protocols.

## Skills
{', '.join(skills)}

## Experience
- Systems Engineering Intern at InfraScale (2023-2024)
  Built custom lock-free memory ring buffer.

## Education
Bundelkhand Institute of Engineering & Technology, B.Tech (2024)
"""


# ============================================================================
# UNIT TESTS: ResumeParserService DIRECT EXTRACTION
# ============================================================================

def test_resume_parser_service_pdf_valid():
    pdf_bytes = generate_valid_pdf_bytes("Priyanshu Awasthi", "priyanshu@example.com")
    text = ResumeParserService.extract_text_from_pdf(pdf_bytes)
    assert "Priyanshu Awasthi" in text
    assert "priyanshu@example.com" in text
    assert "FastAPI" in text


def test_resume_parser_service_docx_valid():
    docx_bytes = generate_valid_docx_bytes("Aditi Sharma", "aditi@example.com")
    text = ResumeParserService.extract_text_from_docx(docx_bytes)
    assert "Aditi Sharma" in text
    assert "aditi@example.com" in text
    assert "IIT Roorkee" in text
    assert "Kubernetes" in text


def test_resume_parser_service_doc_legacy():
    doc_bytes = generate_legacy_doc_bytes("Rohan Verma", "rohan@example.com")
    text = ResumeParserService.extract_text_from_doc(doc_bytes)
    assert "Rohan Verma" in text
    assert "rohan@example.com" in text
    assert "Spring Boot" in text


def test_resume_parser_service_dispatcher():
    pdf_bytes = generate_valid_pdf_bytes()
    t1 = ResumeParserService.parse_document("test.pdf", pdf_bytes)
    assert len(t1) > 40

    docx_bytes = generate_valid_docx_bytes()
    t2 = ResumeParserService.parse_document("test.docx", docx_bytes)
    assert len(t2) > 40

    txt_bytes = generate_text_resume().encode("utf-8")
    t3 = ResumeParserService.parse_document("test.txt", txt_bytes)
    assert len(t3) > 40


def test_text_normalization():
    # Test ligature normalization (\ufb01 -> fi, \ufb02 -> fl), smart quotes, and dashes
    raw = "Pro\ufb01cient in \ufb02uent English. \u201cGreat\u201d skills \u2014 fast\r\n\r\n\r\nand clean."
    norm = ResumeParserService.normalize_text(raw)
    assert "Proficient in fluent English." in norm
    assert '"Great"' in norm
    assert "-" in norm
    assert "\r" not in norm



def test_section_segmentation():
    text = generate_text_resume("Sunil Mehta", "sunil@example.com")
    sections = ResumeParserService.segment_sections(text)
    assert "summary" in sections or "skills" in sections
    assert "education" in sections


def test_extract_structured_candidate_heuristic():
    raw_text = generate_text_resume("Sunil Mehta", "sunil@example.com", ["Rust", "Tokio", "C++"])
    profile = ResumeParserService.extract_structured_candidate(
        raw_text=raw_text,
        filename="sunil_resume.txt",
        candidate_id="cand_test_001"
    )
    assert isinstance(profile, ParsedResume)
    assert profile.candidate_id == "cand_test_001"
    assert profile.contact_info.email == "sunil@example.com"
    assert profile.contact_info.github_url == "https://github.com/sunil/distributed-broker"
    assert any("rust" in s.lower() or "tokio" in s.lower() for s in profile.skills.technical)


# ============================================================================
# API ENDPOINT TESTS: POST /api/v1/resumes/upload
# ============================================================================

def test_upload_valid_pdf():
    pdf_bytes = generate_valid_pdf_bytes("Priyanshu Awasthi", "priyanshu@example.com")
    files = {"file": ("priyanshu_resume.pdf", pdf_bytes, "application/pdf")}
    data = {"candidate_name": "Priyanshu Awasthi", "email": "priyanshu@example.com"}
    res = client.post("/api/v1/resumes/upload", files=files, data=data)
    assert res.status_code == 200, res.text
    body = res.json()
    assert body["status"] == "SUCCESS"
    assert "parsed_resume" in body
    assert body["parsed_resume"]["contact_info"]["email"] == "priyanshu@example.com"


def test_upload_valid_docx():
    docx_bytes = generate_valid_docx_bytes("Aditi Sharma", "aditi@example.com")
    files = {"file": ("aditi_resume.docx", docx_bytes, "application/vnd.openxmlformats-officedocument.wordprocessingml.document")}
    res = client.post("/api/v1/resumes/upload", files=files)
    assert res.status_code == 200, res.text
    body = res.json()
    assert body["status"] == "SUCCESS"
    assert body["parsed_resume"]["contact_info"]["name"] == "Aditi Sharma"


def test_upload_valid_legacy_doc():
    doc_bytes = generate_legacy_doc_bytes("Rohan Verma", "rohan@example.com")
    files = {"file": ("rohan_resume.doc", doc_bytes, "application/msword")}
    res = client.post("/api/v1/resumes/upload", files=files)
    assert res.status_code == 200, res.text
    body = res.json()
    assert body["status"] == "SUCCESS"
    assert "Rohan Verma" in body["parsed_resume"]["raw_text"]


def test_upload_valid_txt_markdown():
    txt_content = generate_text_resume("Sunil Mehta", "sunil@example.com")
    files = {"file": ("sunil_resume.md", txt_content.encode("utf-8"), "text/markdown")}
    res = client.post("/api/v1/resumes/upload", files=files)
    assert res.status_code == 200, res.text
    body = res.json()
    assert body["status"] == "SUCCESS"
    assert body["parsed_resume"]["contact_info"]["github_url"] == "https://github.com/sunil/distributed-broker"


# ============================================================================
# BOUNDARY & ERROR HANDLING TESTS
# ============================================================================

def test_upload_password_protected_pdf():
    enc_pdf = generate_encrypted_pdf_bytes("pass123")
    files = {"file": ("encrypted_resume.pdf", enc_pdf, "application/pdf")}
    res = client.post("/api/v1/resumes/upload", files=files)
    assert res.status_code == 422
    assert "password" in res.json()["detail"].lower()


def test_upload_corrupted_pdf():
    corrupted_bytes = b"%PDF-1.4\nBROKEN_BODY_CORRUPTED_HEADER_DATA_GARBAGE"
    files = {"file": ("corrupt.pdf", corrupted_bytes, "application/pdf")}
    res = client.post("/api/v1/resumes/upload", files=files)
    assert res.status_code == 422
    assert "corrupt" in res.json()["detail"].lower() or "no extractable text" in res.json()["detail"].lower()


def test_upload_corrupted_docx():
    corrupted_docx = b"PK\x03\x04NOT_A_VALID_ZIP_PACKAGE_DATA"
    files = {"file": ("corrupt.docx", corrupted_docx, "application/vnd.openxmlformats-officedocument.wordprocessingml.document")}
    res = client.post("/api/v1/resumes/upload", files=files)
    assert res.status_code == 422
    assert "docx" in res.json()["detail"].lower() or "corrupt" in res.json()["detail"].lower()


def test_upload_empty_file():
    files = {"file": ("empty.pdf", b"", "application/pdf")}
    res = client.post("/api/v1/resumes/upload", files=files)
    assert res.status_code == 422
    assert "no extractable text" in res.json()["detail"].lower() or "empty" in res.json()["detail"].lower()


def test_upload_scanned_low_text_pdf():
    # PDF containing barely 2 characters
    short_pdf = b"%PDF-1.4\n1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj\n2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj\n3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>endobj\n4 0 obj<< /Length 20 >>stream\nBT /F1 12 Tf (Hi) Tj ET\nendstream\nendobj\n5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>endobj\nxref\n0 6\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000236 00000 n \n0000000305 00000 n \ntrailer<< /Size 6 /Root 1 0 R >>\nstartxref\n379\n%%EOF"
    files = {"file": ("short.pdf", short_pdf, "application/pdf")}
    res = client.post("/api/v1/resumes/upload", files=files)
    assert res.status_code == 422
    assert "no extractable text" in res.json()["detail"].lower() or "scanned" in res.json()["detail"].lower()


def test_upload_huge_file_over_10mb():
    huge_data = b"0" * (10 * 1024 * 1024 + 1024)
    files = {"file": ("huge_resume.pdf", huge_data, "application/pdf")}
    res = client.post("/api/v1/resumes/upload", files=files)
    assert res.status_code == 413
    assert "10mb" in res.json()["detail"].lower() or "limit" in res.json()["detail"].lower()


def test_upload_unsupported_file_extension():
    files = {"file": ("trojan.exe", b"MZ\x90\x00\x03\x00\x00\x00", "application/octet-stream")}
    res = client.post("/api/v1/resumes/upload", files=files)
    assert res.status_code == 400
    assert "unsupported file format" in res.json()["detail"].lower()


def test_upload_missing_file_form():
    res = client.post("/api/v1/resumes/upload", data={"candidate_name": "Ghost"})
    assert res.status_code == 422
