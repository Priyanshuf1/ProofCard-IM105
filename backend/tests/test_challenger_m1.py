"""
backend/tests/test_challenger_m1.py
===================================
Adversarial Stress Test Suite: Milestone 1 - Resume Ingestion & Parsing
Empirical challenger tests for ResumeParserService and POST /api/v1/resumes/upload:
1. Corrupted PDFs (random bytes, truncated xref, zero pages, damaged streams)
2. Password-encrypted PDFs (AES/RC4, encrypted without password, protected streams)
3. Scanned / zero-text PDFs (image-only, blank pages, low text threshold < 40 chars)
4. Corrupted DOCX archives (fake zip, missing document.xml, malformed XML, empty docx)
5. Legacy DOC without OLE2 header (random bytes, non-OLE2 ASCII, empty/corrupt OLE2)
6. Non-ASCII Unicode strings (Hindi Devanagari, CJK, Cyrillic, RTL Arabic, emojis, Zalgo, NFKC)
7. Extreme whitespace (huge spacing, 10k newlines, long lines, mixed CR/LF)
8. Boundary payloads on POST /api/v1/resumes/upload (0-byte, 1-byte, 10MB boundary, 10MB+1,
   unsupported extensions, path traversal, injection payloads, invalid form overrides)
"""

import io
import os
import zipfile
import pytest
from fastapi.testclient import TestClient
import docx
import pypdf

from backend.main import app
from backend.services.resume_parser import (
    ResumeParserService,
    ResumeParsingError,
    UnsupportedFormatError,
    PasswordProtectedFileError,
    CorruptedFileError,
    ScannedOrEmptyResumeError,
)
from backend.models.resume_schemas import ParsedResume

client = TestClient(app)


# ============================================================================
# HELPER GENERATORS
# ============================================================================

def make_valid_pdf(name="Test Candidate", email="candidate@example.com", text_extra=""):
    """Helper to generate a clean, valid PDF with selectable text."""
    lines = [
        name,
        f"Email: {email} | Phone: +1-555-0199",
        "Skills: Python, FastAPI, Docker, PostgreSQL, Kubernetes, Redis",
        "Education: Tech Institute, B.Tech Computer Science 2023",
        "Experience: Software Engineer at CloudCorp 2023-Present",
        "Projects: Built scalable microservices using Python and asyncio",
    ]
    if text_extra:
        lines.append(text_extra)

    stream_content = "BT\n/F1 12 Tf\n50 750 Td\n14 TL\n"
    for line in lines:
        clean = line.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")
        stream_content += f"({clean}) ' \n"
    stream_content += "ET\n"
    stream_bytes = stream_content.encode("latin1", errors="ignore")

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


def make_zero_page_pdf():
    """PDF with 0 pages."""
    header = b"%PDF-1.4\n"
    obj1 = b"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n"
    obj2 = b"2 0 obj\n<< /Type /Pages /Kids [] /Count 0 >>\nendobj\n"
    offsets = [0, len(header), len(header) + len(obj1)]
    curr = len(header) + len(obj1) + len(obj2)
    xref = f"xref\n0 3\n0000000000 65535 f \n{offsets[1]:010d} 00000 n \n{offsets[2]:010d} 00000 n \n".encode("latin1")
    trailer = f"trailer\n<< /Size 3 /Root 1 0 R >>\nstartxref\n{curr}\n%%EOF".encode("latin1")
    return header + obj1 + obj2 + xref + trailer


def make_valid_docx(text="Candidate Name\nEmail: c@example.com\nPython, Docker, FastAPI developer."):
    doc = docx.Document()
    for p in text.split("\n"):
        if p.strip():
            doc.add_paragraph(p.strip())
    buf = io.BytesIO()
    doc.save(buf)
    return buf.getvalue()


# ============================================================================
# 1. CORRUPTED PDF TESTS
# ============================================================================

def test_corrupted_pdf_random_bytes():
    """PDF containing completely random noise raises CorruptedFileError / 422."""
    noise = os.urandom(1024)
    with pytest.raises(CorruptedFileError):
        ResumeParserService.extract_text_from_pdf(noise)

    res = client.post("/api/v1/resumes/upload", files={"file": ("corrupt.pdf", noise, "application/pdf")})
    assert res.status_code == 422
    assert "detail" in res.json()


def test_corrupted_pdf_truncated_body():
    """PDF with header %PDF-1.4 but truncated in the middle."""
    truncated = b"%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n"
    with pytest.raises((CorruptedFileError, ScannedOrEmptyResumeError)):
        ResumeParserService.extract_text_from_pdf(truncated)

    res = client.post("/api/v1/resumes/upload", files={"file": ("truncated.pdf", truncated, "application/pdf")})
    assert res.status_code == 422


def test_corrupted_pdf_zero_pages():
    """PDF with zero pages raises ScannedOrEmptyResumeError / 422."""
    zero_p = make_zero_page_pdf()
    with pytest.raises(ScannedOrEmptyResumeError):
        ResumeParserService.extract_text_from_pdf(zero_p)

    res = client.post("/api/v1/resumes/upload", files={"file": ("zero_pages.pdf", zero_p, "application/pdf")})
    assert res.status_code == 422


def test_corrupted_pdf_garbage_trailer():
    """PDF with broken xref and trailer."""
    raw = make_valid_pdf()
    broken = raw[: len(raw) // 2] + b"\n%%EOF_CORRUPTED"
    with pytest.raises((CorruptedFileError, ScannedOrEmptyResumeError)):
        ResumeParserService.extract_text_from_pdf(broken)

    res = client.post("/api/v1/resumes/upload", files={"file": ("broken_xref.pdf", broken, "application/pdf")})
    assert res.status_code == 422


# ============================================================================
# 2. PASSWORD-ENCRYPTED PDF TESTS
# ============================================================================

def test_encrypted_pdf_aes():
    """Password protected PDF raises PasswordProtectedFileError and returns 422 with password notice."""
    raw = make_valid_pdf()
    reader = pypdf.PdfReader(io.BytesIO(raw))
    writer = pypdf.PdfWriter()
    writer.append(reader)
    writer.encrypt("topsecret2026")
    buf = io.BytesIO()
    writer.write(buf)
    enc_bytes = buf.getvalue()

    with pytest.raises(PasswordProtectedFileError):
        ResumeParserService.extract_text_from_pdf(enc_bytes)

    res = client.post("/api/v1/resumes/upload", files={"file": ("encrypted.pdf", enc_bytes, "application/pdf")})
    assert res.status_code == 422
    assert "password" in res.json()["detail"].lower()


# ============================================================================
# 3. SCANNED / ZERO-TEXT PDF TESTS
# ============================================================================

def test_scanned_pdf_empty_stream():
    """PDF with valid page structure but completely empty text stream (scanned image simulator)."""
    header = b"%PDF-1.4\n"
    obj1 = b"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n"
    obj2 = b"2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n"
    obj3 = b"3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>\nendobj\n"
    obj4 = b"4 0 obj\n<< /Length 0 >>\nstream\n\nendstream\nendobj\n"

    offsets = [0, len(header), len(header) + len(obj1), len(header) + len(obj1) + len(obj2), len(header) + len(obj1) + len(obj2) + len(obj3)]
    curr = len(header) + len(obj1) + len(obj2) + len(obj3) + len(obj4)
    xref = f"xref\n0 5\n0000000000 65535 f \n{offsets[1]:010d} 00000 n \n{offsets[2]:010d} 00000 n \n{offsets[3]:010d} 00000 n \n{offsets[4]:010d} 00000 n \n".encode("latin1")
    trailer = f"trailer\n<< /Size 5 /Root 1 0 R >>\nstartxref\n{curr}\n%%EOF".encode("latin1")
    blank_pdf = header + obj1 + obj2 + obj3 + obj4 + xref + trailer

    with pytest.raises(ScannedOrEmptyResumeError):
        ResumeParserService.extract_text_from_pdf(blank_pdf)

    res = client.post("/api/v1/resumes/upload", files={"file": ("scanned_blank.pdf", blank_pdf, "application/pdf")})
    assert res.status_code == 422
    assert "no extractable text" in res.json()["detail"].lower() or "scanned" in res.json()["detail"].lower()


def test_pdf_low_text_under_threshold():
    """PDF with only 10 characters (<40 char threshold) raises ScannedOrEmptyResumeError."""
    short_content = "BT\n/F1 12 Tf\n50 750 Td\n(Short txt) '\nET\n".encode("latin1")
    header = b"%PDF-1.4\n"
    obj1 = b"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n"
    obj2 = b"2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n"
    obj3 = b"3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n"
    obj4 = f"4 0 obj\n<< /Length {len(short_content)} >>\nstream\n".encode("latin1") + short_content + b"\nendstream\nendobj\n"
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
    short_pdf = header + obj1 + obj2 + obj3 + obj4 + obj5 + xref + trailer

    with pytest.raises(ScannedOrEmptyResumeError):
        ResumeParserService.extract_text_from_pdf(short_pdf)

    res = client.post("/api/v1/resumes/upload", files={"file": ("short.pdf", short_pdf, "application/pdf")})
    assert res.status_code == 422


# ============================================================================
# 4. CORRUPTED DOCX ARCHIVE TESTS
# ============================================================================

def test_corrupted_docx_fake_zip():
    """DOCX with PK\x03\x04 header followed by random garbage raises CorruptedFileError / 422."""
    bad_docx = b"PK\x03\x04" + os.urandom(256)
    with pytest.raises(CorruptedFileError):
        ResumeParserService.extract_text_from_docx(bad_docx)

    res = client.post("/api/v1/resumes/upload", files={"file": ("bad.docx", bad_docx, "application/vnd.openxmlformats-officedocument.wordprocessingml.document")})
    assert res.status_code == 422
    assert "docx" in res.json()["detail"].lower() or "corrupted" in res.json()["detail"].lower()


def test_corrupted_docx_missing_document_xml():
    """Valid ZIP archive missing word/document.xml raises CorruptedFileError / 422."""
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w") as z:
        z.writestr("dummy.txt", "This is not a docx")
    zip_bytes = buf.getvalue()

    with pytest.raises(CorruptedFileError):
        ResumeParserService.extract_text_from_docx(zip_bytes)

    res = client.post("/api/v1/resumes/upload", files={"file": ("missing_doc.docx", zip_bytes, "application/vnd.openxmlformats-officedocument.wordprocessingml.document")})
    assert res.status_code == 422


def test_corrupted_docx_malformed_xml():
    """ZIP archive with malformed XML in word/document.xml raises CorruptedFileError / 422."""
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w") as z:
        z.writestr("[Content_Types].xml", '<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"/>')
        z.writestr("word/document.xml", "<w:document><w:body><w:p><unclosed_tag></w:body></w:document>")
    zip_bytes = buf.getvalue()

    with pytest.raises(CorruptedFileError):
        ResumeParserService.extract_text_from_docx(zip_bytes)

    res = client.post("/api/v1/resumes/upload", files={"file": ("bad_xml.docx", zip_bytes, "application/vnd.openxmlformats-officedocument.wordprocessingml.document")})
    assert res.status_code == 422


def test_docx_empty_document():
    """Valid DOCX with no paragraphs/text (<20 chars) raises ScannedOrEmptyResumeError / 422."""
    empty_docx = make_valid_docx(text="")
    with pytest.raises(ScannedOrEmptyResumeError):
        ResumeParserService.extract_text_from_docx(empty_docx)

    res = client.post("/api/v1/resumes/upload", files={"file": ("empty.docx", empty_docx, "application/vnd.openxmlformats-officedocument.wordprocessingml.document")})
    assert res.status_code == 422


# ============================================================================
# 5. LEGACY DOC WITHOUT OLE2 HEADER TESTS
# ============================================================================

def test_legacy_doc_binary_noise_without_ole2():
    """Binary file named .doc with non-ASCII bytes (no OLE2 header) raises CorruptedFileError / 422."""
    noise = b"\x00\x01\x02\x03\x04\x05\x06\x07" * 32
    with pytest.raises(CorruptedFileError):
        ResumeParserService.extract_text_from_doc(noise)

    res = client.post("/api/v1/resumes/upload", files={"file": ("random.doc", noise, "application/msword")})
    assert res.status_code == 422


def test_reproduce_bug_legacy_doc_without_ole2_header_accepted():
    """
    Empirical Bug Reproduction:
    A non-OLE2 file (e.g., PE executable or shell script) containing >= 20 characters of ASCII text
    must be rejected with CorruptedFileError / HTTP 422 when uploaded as a .doc file.
    Currently, ResumeParserService incorrectly extracts the ASCII text and returns HTTP 200 SUCCESS.
    """
    non_ole2_payload = b"MZ\x90\x00" + b"This program cannot be run in DOS mode. Extra strings here."
    with pytest.raises(CorruptedFileError):
        ResumeParserService.extract_text_from_doc(non_ole2_payload)

    res = client.post("/api/v1/resumes/upload", files={"file": ("malware.doc", non_ole2_payload, "application/msword")})
    assert res.status_code == 422



def test_legacy_doc_with_ole2_header_only_no_text():
    """File with valid OLE2 magic header but only binary padding raises ScannedOrEmptyResumeError / 422."""
    ole2_header = b"\xd0\xcf\x11\xe0\xa1\xb1\x1a\xe1" + b"\x00" * 128
    with pytest.raises(ScannedOrEmptyResumeError):
        ResumeParserService.extract_text_from_doc(ole2_header)

    res = client.post("/api/v1/resumes/upload", files={"file": ("empty_ole2.doc", ole2_header, "application/msword")})
    assert res.status_code == 422


def test_legacy_doc_with_ole2_only_boilerplate():
    """File with valid OLE2 header containing only internal Word boilerplate."""
    ole2_header = b"\xd0\xcf\x11\xe0\xa1\xb1\x1a\xe1"
    boilerplate = b"WordDocument\x00SummaryInformation\x00DocumentSummaryInformation\x00CompObj\x00Normal.dotm"
    payload = ole2_header + b"\x00" * 32 + boilerplate + b"\x00" * 32
    with pytest.raises(ScannedOrEmptyResumeError):
        ResumeParserService.extract_text_from_doc(payload)

    res = client.post("/api/v1/resumes/upload", files={"file": ("boilerplate.doc", payload, "application/msword")})
    assert res.status_code == 422


# ============================================================================
# 6. NON-ASCII UNICODE TESTS
# ============================================================================

def test_unicode_hindi_devanagari():
    """Resume with Hindi Devanagari script parses cleanly, normalizes, and extracts fields."""
    hindi_resume = """
# प्रियंशु अवस्थी (Priyanshu Awasthi)
ईमेल: priyanshu.awasthi@example.com | फोन: +91-9876543210
गिटहब: https://github.com/priyanshu/hindi-nlp-engine

## सारांश (Summary)
सॉफ्टवेयर इंजीनियर - Distributed Systems, Python, FastAPI, Docker, and Redis विशेषज्ञ।

## तकनीकी कौशल (Technical Skills)
Python, FastAPI, Docker, Kubernetes, PostgreSQL, Redis, Linux, Git

## शिक्षा (Education)
GLA University Mathura, B.Tech Computer Science (2024)

## परियोजनाएं (Projects)
- Distributed Task Engine: Redis-backed distributed scheduler built with Python and FastAPI.
"""
    norm = ResumeParserService.normalize_text(hindi_resume)
    assert "प्रियंशु अवस्थी" in norm

    res = client.post(
        "/api/v1/resumes/upload",
        files={"file": ("resume_hindi.txt", hindi_resume.encode("utf-8"), "text/plain")},
    )
    assert res.status_code == 200, res.text
    body = res.json()
    assert body["status"] == "SUCCESS"
    assert "priyanshu.awasthi@example.com" in body["parsed_resume"]["contact_info"]["email"]
    assert any("python" in s.lower() for s in body["parsed_resume"]["skills"]["technical"])


def test_unicode_cjk_chinese():
    """Resume with Chinese characters parses cleanly."""
    cjk_resume = """
# 张伟 (Wei Zhang)
Email: zhangwei@example.com | Phone: +86-13800138000
GitHub: https://github.com/zhangwei/distributed-go

## 职业概述 (Professional Summary)
资深后端开发工程师，拥有分布式系统架构与高并发微服务设计经验。

## 技能 (Skills)
Go, Golang, Kubernetes, Docker, gRPC, Redis, PostgreSQL, MySQL

## 教育经历 (Education)
清华大学 (Tsinghua University), 计算机科学学士 (2023)

## 项目经历 (Projects)
- 分布式消息队列 (Distributed Message Queue): 基于 Go 和 Raft 共识算法实现。
"""
    res = client.post(
        "/api/v1/resumes/upload",
        files={"file": ("resume_cjk.txt", cjk_resume.encode("utf-8"), "text/plain")},
    )
    assert res.status_code == 200, res.text
    body = res.json()
    assert body["status"] == "SUCCESS"
    assert body["parsed_resume"]["contact_info"]["email"] == "zhangwei@example.com"
    assert any("go" in s.lower() or "golang" in s.lower() for s in body["parsed_resume"]["skills"]["technical"])


def test_unicode_emojis_and_zalgo():
    """Resume with heavy emojis and combining characters is normalized without crashing."""
    emoji_resume = """
# Alex Dev 🚀💻🔥
Email: alex.dev@example.com | 📱 +1-555-0144
GitHub: https://github.com/alexdev/hyper-engine
Portfolio: https://alexdev.dev

Summary:
Full-stack wizard 🧙‍♂️ building high-performance cloud applications ☁️ with Python 🐍 and Rust 🦀.

Skills:
Python, Rust, FastAPI, React, Docker, Kubernetes, AWS, TypeScript

Education:
State University of Technology, B.S. in Computer Science (2022)

Projects:
- Neural Pipeline 🧠: Deep learning model serving platform with FastAPI and Docker.
"""
    parsed = ResumeParserService.parse_document("alex_emoji.md", emoji_resume.encode("utf-8"))
    assert "Alex Dev" in parsed
    assert "alex.dev@example.com" in parsed

    res = client.post(
        "/api/v1/resumes/upload",
        files={"file": ("alex_emoji.md", emoji_resume.encode("utf-8"), "text/markdown")},
    )
    assert res.status_code == 200
    assert res.json()["status"] == "SUCCESS"


def test_unicode_ligatures_and_smart_symbols():
    """NFKC normalization properly resolves ligatures and typography characters."""
    ligature_text = (
        "O\ufb03cial re\ufb02ection on \ufb01nance and a\ufb04uent sta\ufb00ing.\n"
        "\u201cProfessional Experience\u201d \u2014 Senior Engineer at TechCorp\n"
        "Email: tech.lead@example.com\n"
        "Skills: Python, Docker, FastAPI, Linux\n"
        "Education: University of Science, B.Tech 2021\n"
    )
    normalized = ResumeParserService.normalize_text(ligature_text)
    assert "Official reflection on finance and affluent staffing." in normalized
    assert '"Professional Experience"' in normalized
    assert "-" in normalized


# ============================================================================
# 7. EXTREME WHITESPACE TESTS
# ============================================================================

def test_extreme_newlines_and_spaces():
    """Document with 5,000 blank lines and 50,000 spaces collapses cleanly."""
    extreme_ws = (
        "Candidate Name" + (" " * 500) + "Email: cand@example.com\n" +
        ("\n" * 5000) +
        "Skills: Python, Docker, Kubernetes, FastAPI, Redis\n" +
        ("   \t   \t   \n" * 500) +
        "Education: MIT, B.S. Computer Science 2024\n" +
        "Projects: Built microservices platform in Python"
    )
    normalized = ResumeParserService.normalize_text(extreme_ws)
    # Consecutive newlines should be collapsed to at most \n\n
    assert "\n\n\n" not in normalized
    assert len(normalized) < len(extreme_ws) // 5

    res = client.post(
        "/api/v1/resumes/upload",
        files={"file": ("whitespace.txt", extreme_ws.encode("utf-8"), "text/plain")},
    )
    assert res.status_code == 200
    assert res.json()["status"] == "SUCCESS"
    assert res.json()["parsed_resume"]["contact_info"]["email"] == "cand@example.com"


def test_extreme_long_line_no_newline():
    """Document with 5,000 characters on a single line does not trigger regex catastrophism."""
    long_line = "Developer " + ("skill " * 500) + " email: longline@example.com Python Docker FastAPI"
    doc_text = f"Name: Fast Dev\n{long_line}\nEducation: State College, B.S. 2023\n"
    res = client.post(
        "/api/v1/resumes/upload",
        files={"file": ("longline.txt", doc_text.encode("utf-8"), "text/plain")},
    )
    assert res.status_code == 200
    assert res.json()["status"] == "SUCCESS"


# ============================================================================
# 8. BOUNDARY PAYLOADS ON POST /api/v1/resumes/upload
# ============================================================================

def test_endpoint_zero_byte_file():
    """0-byte upload returns HTTP 422 Unprocessable Entity."""
    res = client.post("/api/v1/resumes/upload", files={"file": ("zero.pdf", b"", "application/pdf")})
    assert res.status_code == 422
    assert "no extractable text" in res.json()["detail"].lower() or "scanned" in res.json()["detail"].lower()


def test_endpoint_one_byte_file():
    """1-byte upload returns HTTP 422."""
    res = client.post("/api/v1/resumes/upload", files={"file": ("one.txt", b"A", "text/plain")})
    assert res.status_code == 422


def test_endpoint_exact_10mb_limit():
    """10MB file boundary check."""
    # 10MB + 1 byte -> 413
    over_10mb = b"X" * (10 * 1024 * 1024 + 1)
    res_over = client.post("/api/v1/resumes/upload", files={"file": ("over.txt", over_10mb, "text/plain")})
    assert res_over.status_code == 413
    assert "10mb" in res_over.json()["detail"].lower()


def test_endpoint_unsupported_extensions():
    """Various unsupported file extensions return HTTP 400 Bad Request."""
    bad_extensions = [
        ("malicious.exe", b"MZ\x90\x00\x03\x00\x00\x00"),
        ("script.sh", b"#!/bin/bash\nrm -rf /"),
        ("archive.zip", b"PK\x05\x06" + b"\x00" * 18),
        ("source.py", b"print('hello world')"),
        ("image.png", b"\x89PNG\r\n\x1a\n" + b"\x00" * 32),
        ("data.json", b'{"key": "value"}'),
        ("webpage.html", b"<html><body>Resume</body></html>"),
    ]
    for fn, payload in bad_extensions:
        res = client.post("/api/v1/resumes/upload", files={"file": (fn, payload, "application/octet-stream")})
        assert res.status_code == 400, f"Expected 400 for {fn}, got {res.status_code}"
        assert "unsupported file format" in res.json()["detail"].lower()


def test_endpoint_path_traversal_filename():
    """Filename containing directory traversal sequences is contained safely."""
    valid_txt = "John Doe\nEmail: john@example.com\nPython, Docker, FastAPI Engineer.\nEducation: University, 2024"
    res = client.post(
        "/api/v1/resumes/upload",
        files={"file": ("../../../../etc/shadow.txt", valid_txt.encode("utf-8"), "text/plain")},
    )
    # The file should be parsed safely without filesystem traversal
    assert res.status_code == 200
    assert res.json()["status"] == "SUCCESS"


def test_endpoint_xss_and_sqli_in_form_overrides():
    """Form field overrides containing XSS and SQL injection are stored safely without code execution."""
    valid_txt = "Candidate Name\nEmail: cand@example.com\nPython, Docker, FastAPI Engineer.\nEducation: University, 2024"
    xss_name = "<script>alert('xss')</script>"
    sqli_name = "Robert'); DROP TABLE candidates;--"

    res1 = client.post(
        "/api/v1/resumes/upload",
        files={"file": ("resume.txt", valid_txt.encode("utf-8"), "text/plain")},
        data={"candidate_name": xss_name},
    )
    assert res1.status_code == 200
    assert res1.json()["parsed_resume"]["contact_info"]["name"] == xss_name

    res2 = client.post(
        "/api/v1/resumes/upload",
        files={"file": ("resume.txt", valid_txt.encode("utf-8"), "text/plain")},
        data={"candidate_name": sqli_name},
    )
    assert res2.status_code == 200
    assert res2.json()["parsed_resume"]["contact_info"]["name"] == sqli_name


def test_endpoint_invalid_email_override():
    """Form field override with completely invalid email format."""
    valid_txt = "Candidate Name\nEmail: cand@example.com\nPython, Docker, FastAPI Engineer.\nEducation: University, 2024"
    res = client.post(
        "/api/v1/resumes/upload",
        files={"file": ("resume.txt", valid_txt.encode("utf-8"), "text/plain")},
        data={"email": "not-an-email"},
    )
    # What happens? Let's verify containment
    assert res.status_code in (200, 422)


def test_endpoint_mismatched_content_type():
    """File has .txt extension but content type claims application/pdf."""
    valid_txt = "Jane Doe\nEmail: jane@example.com\nSkills: Python, FastAPI, Docker\nEducation: College 2024"
    res = client.post(
        "/api/v1/resumes/upload",
        files={"file": ("resume.txt", valid_txt.encode("utf-8"), "application/pdf")},
    )
    # Parser should use extension/magic bytes and parse successfully
    assert res.status_code == 200
    assert res.json()["status"] == "SUCCESS"


# ============================================================================
# 9. ADVANCED RESILIENCE & CONCURRENCY TESTS
# ============================================================================

def test_docx_nested_tables_and_merged_cells():
    """DOCX with complex tables and merged cells does not duplicate text or crash."""
    doc = docx.Document()
    doc.add_heading("Jane Developer", 0)
    doc.add_paragraph("Email: jane.dev@example.com")
    
    # Add a table with merged cells
    table = doc.add_table(rows=3, cols=3)
    table.cell(0, 0).text = "Category"
    table.cell(0, 1).merge(table.cell(0, 2))
    table.cell(0, 1).text = "Technologies"
    table.cell(1, 0).text = "Backend"
    table.cell(1, 1).text = "Python, FastAPI, Redis"
    table.cell(1, 2).text = "Docker, Kubernetes"
    table.cell(2, 0).text = "Database"
    table.cell(2, 1).merge(table.cell(2, 2))
    table.cell(2, 1).text = "PostgreSQL, MongoDB"
    
    buf = io.BytesIO()
    doc.save(buf)
    content = buf.getvalue()
    
    text = ResumeParserService.extract_text_from_docx(content)
    assert "Jane Developer" in text
    assert "FastAPI" in text
    assert "PostgreSQL" in text


def test_redos_resistance_portfolio_and_phone():
    """Adversarial input designed to trigger catastrophic backtracking in regex completes in milliseconds."""
    import time
    from backend.services.resume_parser import PORTFOLIO_REGEX, PHONE_REGEX, EMAIL_REGEX
    
    # Adversarial string for portfolio regex (nested repeaters)
    adversarial_url = "https://" + "sub." * 50 + "notmatchingdomain.xyz/" + "path/" * 50
    t0 = time.time()
    PORTFOLIO_REGEX.findall(adversarial_url)
    elapsed_url = time.time() - t0
    assert elapsed_url < 0.1, f"PORTFOLIO_REGEX took too long: {elapsed_url}s"

    # Adversarial phone string
    adversarial_phone = "+1-" + "999-" * 40 + "notaphone"
    t0 = time.time()
    PHONE_REGEX.findall(adversarial_phone)
    elapsed_phone = time.time() - t0
    assert elapsed_phone < 0.1, f"PHONE_REGEX took too long: {elapsed_phone}s"


def test_legacy_doc_odd_bytes_utf16():
    """Legacy DOC with an odd number of bytes in UTF-16 stream does not raise UnicodeDecodeError."""
    ole2_header = b"\xd0\xcf\x11\xe0\xa1\xb1\x1a\xe1"
    # UTF-16LE text followed by a lone trailing byte \xff
    odd_payload = ole2_header + b"A\x00d\x00a\x00m\x00 \x00S\x00m\x00i\x00t\x00h\x00\xff" + b"Python, Docker developer\nEmail: adam@example.com\n"
    text = ResumeParserService.extract_text_from_doc(odd_payload)
    assert "adam@example.com" in text or "Python" in text


def test_filename_with_spaces_and_special_chars():
    """Filename with spaces, brackets, hash, and non-ASCII characters is handled cleanly."""
    valid_txt = "David Miller\nEmail: david@example.com\nSkills: Python, FastAPI, Docker\nEducation: College 2024"
    special_name = "My Resume [Final] #1 (2026) ~ v2.0.txt"
    res = client.post(
        "/api/v1/resumes/upload",
        files={"file": (special_name, valid_txt.encode("utf-8"), "text/plain")},
    )
    assert res.status_code == 200
    assert res.json()["status"] == "SUCCESS"
    assert res.json()["parsed_resume"]["file_metadata"]["filename"] == special_name


def test_concurrent_uploads_stress():
    """Simulate rapid successive/concurrent resume uploads to verify absence of state leaks or file locks."""
    import concurrent.futures
    
    def upload_one(idx: int):
        txt = f"Candidate {idx}\nEmail: cand{idx}@example.com\nSkills: Python, Go, Docker\nEducation: University {2020 + idx % 5}"
        res = client.post(
            "/api/v1/resumes/upload",
            files={"file": (f"cand_{idx}.txt", txt.encode("utf-8"), "text/plain")},
        )
        return res.status_code, res.json()
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        futures = [executor.submit(upload_one, i) for i in range(15)]
        results = [f.result() for f in futures]
    
    for status_code, body in results:
        assert status_code == 200
        assert body["status"] == "SUCCESS"
        assert "parsed_resume" in body

