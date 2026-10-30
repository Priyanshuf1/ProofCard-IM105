"""
ProofCard-IM105 E2E Test Suite Fixtures & Harness
=================================================
Provides opaque-box test fixtures, synthetic multi-format resume generators
(PDF, DOCX, DOC, TXT), FastAPI TestClient harness, auth fixtures, and mock
candidate/job payloads for Tiers 1-4.
"""

import io
import os
import sys
import importlib
from pathlib import Path
from typing import Dict, Any, List, Optional
import pytest
from fastapi.testclient import TestClient
import httpx
from docx import Document

# 1. Path Setup: ensure project root is always at head of sys.path
PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

# Set test environment variables
os.environ.setdefault("SANDBOX_API_KEYS", "sandbox_key_deviathon_2026,imats_sandbox_live_key_99")
os.environ.setdefault("GEMINI_API_KEY", "mock_gemini_test_api_key_valid")
os.environ.setdefault("PROOFCARD_INTEGRITY_MODE", "development")

# Import the main FastAPI application
from backend.main import app


# 2. Dynamic Router Auto-Mount for Progressive Milestone Testability
# As workers implement M1-M4 routers in backend/routers, automatically attach them
_ROUTER_CANDIDATES = [
    ("resumes", "/api/v1/resumes"),
    ("sandbox", "/api/v1/sandbox"),
    ("gemini_ai", "/api/v1/gemini"),
    ("jobs", "/api/v1/jobs"),
    ("forensics", "/api/v1/forensics"),
    ("grading", "/api/v1/grading"),
]

for mod_name, default_prefix in _ROUTER_CANDIDATES:
    try:
        mod = importlib.import_module(f"backend.routers.{mod_name}")
        if hasattr(mod, "router"):
            router_obj = getattr(mod, "router")
            # Check if this router or its routes are already mounted
            already_mounted = False
            for route in app.routes:
                if hasattr(route, "path") and route.path.startswith(default_prefix):
                    already_mounted = True
                    break
            if not already_mounted:
                app.include_router(router_obj)
    except (ImportError, AttributeError):
        pass


def is_route_mounted(path_prefix: str) -> bool:
    """Check if any endpoint matching path_prefix is registered in FastAPI app, traversing nested routers."""
    def _matches(route_obj) -> bool:
        if hasattr(route_obj, "path") and isinstance(route_obj.path, str) and route_obj.path.startswith(path_prefix):
            return True
        if hasattr(route_obj, "original_router"):
            orig = getattr(route_obj, "original_router")
            if hasattr(orig, "prefix") and isinstance(orig.prefix, str) and orig.prefix.startswith(path_prefix):
                return True
            for sub in getattr(orig, "routes", []):
                if _matches(sub):
                    return True
        if hasattr(route_obj, "router"):
            r = getattr(route_obj, "router")
            if hasattr(r, "prefix") and isinstance(r.prefix, str) and r.prefix.startswith(path_prefix):
                return True
            for sub in getattr(r, "routes", []):
                if _matches(sub):
                    return True
        for sub in getattr(route_obj, "routes", []):
            if _matches(sub):
                return True
        sub_app = getattr(route_obj, "app", None)
        if sub_app and hasattr(sub_app, "routes"):
            for sub in sub_app.routes:
                if _matches(sub):
                    return True
        return False

    for route in app.routes:
        if _matches(route):
            return True
    return False


def require_route(path_prefix: str, feature_desc: str = ""):
    """Pytest skip helper for progressive testability if milestone router is not yet mounted."""
    if not is_route_mounted(path_prefix):
        pytest.skip(
            f"Progressive testability: Endpoint '{path_prefix}' ({feature_desc}) "
            f"not yet mounted in backend.main. Will execute once milestone router is mounted."
        )


# ---------------------------------------------------------------------------
# 3. Synthetic Multi-Format Document Generators
# ---------------------------------------------------------------------------

def create_synthetic_pdf(text: str = "Candidate Resume", num_pages: int = 1) -> bytes:
    """Generate a syntactically valid PDF binary stream containing readable text."""
    # Build clean PDF objects with text stream
    sanitized_text = text.replace("(", r"\(").replace(")", r"\)").replace("\r", " ").replace("\n", " ")
    stream_content = f"BT /F1 12 Tf 50 700 Td ({sanitized_text[:500]}) Tj ET\n"
    stream_len = len(stream_content)

    pdf_template = (
        f"%PDF-1.4\n"
        f"1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n"
        f"2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj\n"
        f"3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] "
        f"/Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj\n"
        f"4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj\n"
        f"5 0 obj << /Length {stream_len} >> stream\n"
        f"{stream_content}"
        f"endstream\n"
        f"endobj\n"
        f"xref\n"
        f"0 6\n"
        f"0000000000 65535 f \n"
        f"0000000010 00000 n \n"
        f"0000000060 00000 n \n"
        f"0000000117 00000 n \n"
        f"0000000240 00000 n \n"
        f"0000000315 00000 n \n"
        f"trailer << /Size 6 /Root 1 0 R >>\n"
        f"startxref\n"
        f"450\n"
        f"%%EOF\n"
    )
    return pdf_template.encode("latin-1")


def create_synthetic_docx(text: str, tables: Optional[List[List[str]]] = None) -> bytes:
    """Generate a fully valid Microsoft Word (.docx) binary package using python-docx."""
    doc = Document()
    lines = text.strip().split("\n")
    if lines:
        doc.add_heading(lines[0], level=1)
        for line in lines[1:]:
            if line.strip():
                doc.add_paragraph(line)

    if tables:
        for t_data in tables:
            if t_data:
                table = doc.add_table(rows=1, cols=len(t_data[0]))
                hdr_cells = table.rows[0].cells
                for i, col_name in enumerate(t_data[0]):
                    hdr_cells[i].text = str(col_name)
                for row_data in t_data[1:]:
                    row_cells = table.add_row().cells
                    for i, val in enumerate(row_data):
                        row_cells[i].text = str(val)

    buf = io.BytesIO()
    doc.save(buf)
    return buf.getvalue()


def create_synthetic_doc(text: str) -> bytes:
    """Generate a synthetic legacy Microsoft Word (.doc) OLE2 binary stream."""
    ole2_magic = b"\xd0\xcf\x11\xe0\xa1\xb1\x1a\xe1"
    header_padding = b"\x00" * 504
    doc_marker = b"Word.Document.8\x00\x00\x00\x00WordDocument\x00"
    content_ascii = text.encode("utf-8")
    content_utf16 = text.encode("utf-16le")
    return ole2_magic + header_padding + doc_marker + content_ascii + b"\x00\x00" + content_utf16


def create_synthetic_txt(text: str) -> bytes:
    """Generate UTF-8 encoded text resume bytes."""
    return text.encode("utf-8")


# ---------------------------------------------------------------------------
# 4. Standard Client Fixtures
# ---------------------------------------------------------------------------

@pytest.fixture(scope="session")
def client() -> TestClient:
    """Synchronous FastAPI TestClient fixture."""
    return TestClient(app)


@pytest.fixture(scope="session")
def app_instance():
    """Return the FastAPI app instance."""
    return app


# ---------------------------------------------------------------------------
# 5. Auth Header Fixtures
# ---------------------------------------------------------------------------

@pytest.fixture
def sandbox_auth_headers() -> Dict[str, str]:
    """Valid enterprise Sandbox API key header."""
    return {"X-Sandbox-API-Key": "sandbox_key_deviathon_2026"}


@pytest.fixture
def gemini_auth_headers() -> Dict[str, str]:
    """Valid Gemini API key header."""
    return {"x-gemini-api-key": "mock_gemini_test_api_key_valid"}


@pytest.fixture
def all_auth_headers(sandbox_auth_headers, gemini_auth_headers) -> Dict[str, str]:
    """Combined headers for requests needing both Sandbox and Gemini keys."""
    headers = {}
    headers.update(sandbox_auth_headers)
    headers.update(gemini_auth_headers)
    return headers


# ---------------------------------------------------------------------------
# 6. Sample Candidate Payloads & Raw Text Resumes
# ---------------------------------------------------------------------------

@pytest.fixture
def technical_resume_text() -> str:
    return (
        "Dev Sharma\n"
        "Email: dev.sharma@example.com | Phone: +91 9876543210\n"
        "GitHub: https://github.com/devsharma/proofcard-backend\n"
        "Portfolio: https://devsharma-portfolio.vercel.app\n"
        "LinkedIn: https://linkedin.com/in/devsharma\n\n"
        "Education:\n"
        "B.Tech in Computer Science and Engineering, IIT Delhi (2020 - 2024), CGPA: 8.9/10\n\n"
        "Experience:\n"
        "Software Engineering Intern at CloudScale Technologies (Jan 2024 - Jun 2024)\n"
        "- Developed high-throughput microservices using Python, FastAPI, and PostgreSQL.\n"
        "- Implemented Redis caching reducing latency by 45%.\n"
        "- Automated CI/CD deployments using Docker and GitHub Actions.\n\n"
        "Projects:\n"
        "1. Distributed Task Queue Engine (https://github.com/devsharma/task-queue)\n"
        "   - Async task executor supporting priority queues and worker auto-scaling.\n"
        "   - Deployed live at: https://taskqueue-demo.onrender.com\n"
        "2. AST Forensic Code Auditor (https://github.com/devsharma/code-auditor)\n"
        "   - Python AST complexity analyzer and Winnowing algorithm detector.\n\n"
        "Technical Skills:\n"
        "Languages: Python, Go, TypeScript, SQL\n"
        "Frameworks: FastAPI, Django, React, Pytest\n"
        "Databases & Tools: PostgreSQL, Redis, Docker, Git, Linux, Kubernetes"
    )


@pytest.fixture
def non_technical_resume_text() -> str:
    return (
        "Priya Patel\n"
        "Email: priya.patel@example.com | Phone: +91 9123456789\n"
        "LinkedIn: https://linkedin.com/in/priyapatel-pm\n"
        "Portfolio: https://priyapatel.notion.site/portfolio\n\n"
        "Education:\n"
        "MBA in Technology Management, IIM Ahmedabad (2022 - 2024)\n"
        "B.A. in Economics & Statistics, Delhi University (2018 - 2021)\n\n"
        "Professional Experience:\n"
        "Associate Product Manager at FinTech Innovations (Jul 2024 - Present)\n"
        "- Led cross-functional teams of 12 engineers and designers to launch merchant onboarding flow.\n"
        "- Authored PRDs, user stories, customer journey maps, and sprint backlogs.\n"
        "- Increased 30-day user retention by 28% through data-driven feature prioritization.\n"
        "- Conducted 50+ qualitative user interviews and usability testing sessions.\n\n"
        "Skills:\n"
        "Product Management, Agile & Scrum, PRD Authoring, Wireframing, User Research, "
        "A/B Testing, Roadmapping, Stakeholder Management, Data Analytics (Mixpanel, Google Analytics)"
    )


@pytest.fixture
def clone_suspect_resume_text() -> str:
    return (
        "Rohan Gupta\n"
        "Email: rohan.gupta@example.com | Phone: +91 9988776655\n"
        "GitHub: https://github.com/rohangupta/mern-spotify-clone\n\n"
        "Education:\n"
        "B.E. in Information Technology, ABC College of Engineering (2020 - 2024)\n\n"
        "Projects:\n"
        "1. Spotify Fullstack Clone (https://github.com/rohangupta/mern-spotify-clone)\n"
        "   - Complete music streaming clone with React, Node.js, Express, MongoDB.\n"
        "   - Authentication, audio player, playlist management.\n"
        "2. Netflix Video Streaming App (https://github.com/rohangupta/netflix-clone-mern)\n"
        "   - Clone following tutorial with TMDB API integration.\n\n"
        "Skills:\n"
        "JavaScript, React, Node.js, Express, MongoDB, HTML, CSS"
    )


@pytest.fixture
def sample_candidate_data(technical_resume_text) -> Dict[str, Any]:
    """Structured candidate dictionary matching ParsedResume model."""
    return {
        "candidate_id": "cand_dev_001",
        "name": "Dev Sharma",
        "email": "dev.sharma@example.com",
        "phone": "+91 9876543210",
        "college": "IIT Delhi",
        "college_tier": "Tier 1",
        "github_url": "https://github.com/devsharma/proofcard-backend",
        "portfolio_url": "https://devsharma-portfolio.vercel.app",
        "linkedin_url": "https://linkedin.com/in/devsharma",
        "verified_skills": ["Python", "FastAPI", "PostgreSQL", "Docker", "Redis", "pytest"],
        "project_type": "Python Backend / FastAPI",
        "primary_language": "Python",
        "total_loc": 4850,
        "resume_raw_text": technical_resume_text
    }


@pytest.fixture
def sample_job_description() -> Dict[str, Any]:
    """Standard enterprise job description matching job_descriptions_30.json."""
    return {
        "job_id": "jd_backend_01",
        "title": "Python Backend & Microservices Engineer",
        "department": "Engineering",
        "domain": "Backend",
        "experience_level": "Fresher / Campus Graduate (0-1 Years)",
        "relevant_experience": "0-1 Years",
        "description": "Develop and maintain robust, scalable FastAPI microservices and PostgreSQL data models.",
        "responsibilities": [
            "Design and build RESTful APIs using Python and FastAPI",
            "Optimize PostgreSQL queries and database schemas",
            "Write comprehensive automated tests with pytest",
            "Participate in code reviews and architectural discussions"
        ],
        "technical_skills": ["Python", "FastAPI", "PostgreSQL", "Docker", "pytest"],
        "non_technical_skills": ["Problem Solving", "System Design Communication", "Team Collaboration"],
        "educational_qualifications": ["B.Tech / B.E. in Computer Science, IT, or related technical field"],
        "eligibility_criteria": ["Minimum 60% aggregate or equivalent CGPA", "Available for immediate full-time employment"]
    }


@pytest.fixture
def sample_pm_job_description() -> Dict[str, Any]:
    """Product Manager job description."""
    return {
        "job_id": "jd_pm_02",
        "title": "Associate Product Manager",
        "department": "Product",
        "domain": "Product Management",
        "experience_level": "Fresher / Campus Graduate (0-1 Years)",
        "relevant_experience": "0-1 Years",
        "description": "Drive product discovery, define user requirements, and collaborate with engineering on delivery.",
        "responsibilities": [
            "Author high-quality Product Requirement Documents (PRDs)",
            "Conduct customer interviews and extract quantitative insights",
            "Prioritize sprint backlogs and track feature KPIs"
        ],
        "technical_skills": ["Data Analysis", "SQL Basics", "Wireframing"],
        "non_technical_skills": ["Product Sense", "User Empathy", "Agile Leadership", "Stakeholder Communication"],
        "educational_qualifications": ["Bachelors or Masters degree in Business, Management, or Engineering"],
        "eligibility_criteria": ["Strong written and verbal communication"]
    }
