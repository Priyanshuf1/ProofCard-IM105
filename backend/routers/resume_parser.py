"""
Resume Parser Router — Pariksha Platform
Accepts PDF upload, extracts text via pymupdf, uses Gemini to parse structured candidate info.
"""
import os
import re
import json
import logging
import tempfile
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional, List

logger = logging.getLogger("resume_parser")
router = APIRouter(prefix="/api/resume", tags=["Resume Parser"])


class ResumeParseResult(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    college: Optional[str] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    live_url: Optional[str] = None
    skills: List[str] = []
    projects: List[dict] = []
    experience: List[dict] = []
    role_type: str = "Software Engineer"  # "Software Engineer" | "Designer" | "Business/MBA" | "Product Manager"
    raw_text_snippet: str = ""
    parse_confidence: float = 0.0
    source: str = "resume_pdf"


def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extract text from PDF bytes using pymupdf (fitz)."""
    try:
        import pymupdf as fitz
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()
        doc.close()
        return text.strip()
    except Exception as e:
        logger.warning(f"pymupdf extraction failed: {e}")
        return ""


def extract_text_fallback(file_bytes: bytes) -> str:
    """Fallback: extract text using pypdf."""
    try:
        import pypdf
        import io
        reader = pypdf.PdfReader(io.BytesIO(file_bytes))
        text = ""
        for page in reader.pages:
            text += (page.extract_text() or "") + "\n"
        return text.strip()
    except Exception as e:
        logger.warning(f"pypdf fallback failed: {e}")
        return ""


def extract_with_regex(text: str) -> dict:
    """Heuristic and regex fallback extraction when LLM is unavailable."""
    lines = [line.strip() for line in text.split("\n") if line.strip()]
    
    # Extract candidate name from top 3 non-empty lines
    detected_name = None
    for line in lines[:5]:
        # Filter out common header words
        low = line.lower()
        if any(h in low for h in ["resume", "curriculum", "cv", "email", "phone", "http", "github", "linkedin", "page 1"]):
            continue
        # If line has 2 to 4 capitalized words and length < 35, it is very likely the candidate's name
        words = line.split()
        if 2 <= len(words) <= 4 and len(line) < 35 and all(w[0].isupper() or w in ["de", "van", "von"] for w in words if w.isalpha()):
            detected_name = line
            break

    email_match = re.search(r'[\w.+-]+@[\w.-]+\.\w{2,}', text)

    # GitHub URL extraction: supports scheme-less (github.com/user or github.com/user/repo) and http(s)
    github_match = re.search(
        r'(?:https?://)?(?:www\.)?github\.com/[A-Za-z0-9_.-]+(?:/[A-Za-z0-9_.-]+)?',
        text,
        re.IGNORECASE
    )
    detected_github = None
    if github_match:
        raw_gh = github_match.group(0).rstrip(".,;:)'\"")
        detected_github = raw_gh if raw_gh.lower().startswith(("http://", "https://")) else f"https://{raw_gh}"

    # LinkedIn URL extraction: supports scheme-less (linkedin.com/in/...) and http(s)
    linkedin_match = re.search(
        r'(?:https?://)?(?:www\.)?linkedin\.com/in/[A-Za-z0-9_.-]+/?',
        text,
        re.IGNORECASE
    )
    detected_linkedin = None
    if linkedin_match:
        raw_li = linkedin_match.group(0).rstrip(".,;:)'\"")
        detected_linkedin = raw_li if raw_li.lower().startswith(("http://", "https://")) else f"https://{raw_li}"

    # College extraction heuristics: use horizontal whitespace [ \t] to prevent greedy newline capture of headers
    college_match = re.search(
        r'(?:EDUCATION|ACADEMICS|ACADEMIC\s+BACKGROUND|QUALIFICATIONS|COLLEGE|UNIVERSITY)?[\s:\-–—]*\b(IIT[ \t]+[A-Za-z]+|IIM[ \t]+[A-Za-z]+|BITS[ \t]+[A-Za-z]+|GLA[ \t]+University|NIT[ \t]+[A-Za-z]+|[A-Z][A-Za-z \t]+(?:University|Institute[ \t]+of[ \t]+Technology|Engineering[ \t]+College|Business\s+School))\b',
        text,
        re.IGNORECASE
    )
    detected_college = None
    if college_match:
        clean_college = college_match.group(1).strip()
        clean_college = re.sub(r'^(?:EDUCATION|ACADEMICS|QUALIFICATIONS|COLLEGE)\s+', '', clean_college, flags=re.IGNORECASE).strip()
        detected_college = clean_college

    # Live portfolio or deployed URL extraction: vercel.app, netlify.app, pages.dev, or custom domains
    detected_live_url = None
    plat_match = re.search(
        r'(?:https?://)?(?:[a-zA-Z0-9-]+\.)+(?:vercel\.app|netlify\.app|pages\.dev|onrender\.com|herokuapp\.com|github\.io)(?:/[^\s,)]*)?',
        text,
        re.IGNORECASE
    )
    if plat_match:
        raw_live = plat_match.group(0).rstrip(".,;:)'\"")
        detected_live_url = raw_live if raw_live.lower().startswith(("http://", "https://")) else f"https://{raw_live}"
    else:
        # Search for custom domain mentions in projects (e.g. alleyrich.com, globallogicmedia.com, myportfolio.dev)
        candidate_domains = re.findall(
            r'\b([a-zA-Z0-9-]+\.(?:com|org|dev|io|me|app|tech|ai|site))\b',
            text,
            re.IGNORECASE
        )
        skip_domains = {
            'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'example.com',
            'example.edu', 'example.org', 'github.com', 'linkedin.com', 'b.tech', 'm.tech', 'b.sc', 'm.sc'
        }
        for d in candidate_domains:
            d_lower = d.lower()
            if d_lower not in skip_domains and not re.search(r'[\w.+-]+@' + re.escape(d), text, re.IGNORECASE):
                detected_live_url = f"https://{d}"
                break

    # Extract skills
    skill_keywords = [
        "Python", "JavaScript", "TypeScript", "React", "Node.js", "FastAPI", "Django",
        "SQL", "MongoDB", "PostgreSQL", "Docker", "AWS", "Git", "Java", "C++", "Figma",
        "Flutter", "Firebase", "TailwindCSS", "Next.js", "Vue", "Angular", "Machine Learning",
        "Data Analysis", "Excel", "PowerPoint", "Tableau", "Marketing", "Finance", "Accounting",
        "Financial Modeling", "Strategic Planning", "Market Analysis", "Brand Strategy"
    ]
    found_skills = [s for s in skill_keywords if re.search(r'\b' + re.escape(s) + r'\b', text, re.IGNORECASE)]
    
    # Detect role type
    role_type = "Software Engineer"
    text_lower = text.lower()
    if any(k in text_lower for k in ["mba", "bba", "marketing", "finance", "accounting", "business administration", "management", "consulting"]):
        role_type = "Business/MBA"
    elif any(k in text_lower for k in ["product manager", "product management", "pm ", "roadmap", "stakeholder"]):
        role_type = "Product Manager"
    elif any(k in text_lower for k in ["figma", "ui/ux", "ux design", "graphic design", "adobe", "wireframe"]):
        role_type = "Designer"
    elif any(k in text_lower for k in ["data science", "data scientist", "machine learning engineer", "deep learning"]):
        role_type = "Data Scientist"

    return {
        "name": detected_name,
        "email": email_match.group(0) if email_match else None,
        "college": detected_college,
        "github_url": detected_github,
        "linkedin_url": detected_linkedin,
        "live_url": detected_live_url,
        "skills": found_skills[:20],
        "role_type": role_type,
    }


def parse_with_gemini(text: str) -> dict:
    """Use Gemini Flash to extract structured candidate info from resume text."""
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if not api_key:
        logger.info("No Gemini API key found, using heuristic regex fallback.")
        return {}
    
    try:
        import google.generativeai as genai
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-1.5-flash")
        
        prompt = f"""You are a resume parsing assistant. Extract structured information from this resume text and return ONLY valid JSON.

Resume Text:
{text[:4000]}

Return this exact JSON format (no markdown, no explanation):
{{
  "name": "full name or null",
  "email": "email or null",
  "college": "university/college name or null",
  "github_url": "github URL or null",
  "linkedin_url": "linkedin URL or null",
  "live_url": "any other live project/portfolio URL or null",
  "skills": ["skill1", "skill2"],
  "projects": [
    {{"name": "project name", "tech": ["tech1"], "description": "brief description", "url": "url or null"}}
  ],
  "experience": [
    {{"company": "company name", "role": "job title", "duration": "e.g. Jun 2023 - Aug 2023"}}
  ],
  "role_type": "one of: Software Engineer, Designer, Business/MBA, Product Manager, Data Scientist, Other"
}}"""
        
        response = model.generate_content(prompt)
        raw = response.text.strip()
        raw = re.sub(r'^```(?:json)?\s*', '', raw, flags=re.MULTILINE)
        raw = re.sub(r'\s*```$', '', raw, flags=re.MULTILINE)
        
        parsed = json.loads(raw)
        return parsed
    except Exception as e:
        logger.warning(f"Gemini parsing failed: {e}")
        return {}


@router.post("/parse", response_model=ResumeParseResult)
async def parse_resume(file: UploadFile = File(...)):
    """
    Parse a resume PDF/DOCX and extract structured candidate information.
    Returns auto-fill data for the candidate ingestion form.
    """
    filename = (file.filename or "").lower()
    if not (filename.endswith(".pdf") or filename.endswith(".docx") or filename.endswith(".doc")):
        raise HTTPException(status_code=400, detail="Only PDF or Word documents are supported.")
    
    file_bytes = await file.read()
    if len(file_bytes) > 10 * 1024 * 1024:  # 10MB limit
        raise HTTPException(status_code=400, detail="File too large. Maximum size is 10MB.")
    
    # Extract raw text
    raw_text = ""
    if filename.endswith(".pdf"):
        raw_text = extract_text_from_pdf(file_bytes)
        if not raw_text:
            raw_text = extract_text_fallback(file_bytes)
    elif filename.endswith((".docx", ".doc")):
        try:
            import docx
            import io
            doc = docx.Document(io.BytesIO(file_bytes))
            raw_text = "\n".join(p.text for p in doc.paragraphs)
        except Exception:
            raise HTTPException(status_code=400, detail="DOCX parsing requires python-docx. Please upload a PDF instead.")
    
    if not raw_text or len(raw_text) < 50:
        raise HTTPException(status_code=422, detail="Could not extract readable text from the file. Please ensure it is a text-based PDF (not a scanned image).")
    
    gemini_result = parse_with_gemini(raw_text)
    regex_result = extract_with_regex(raw_text)
    
    def pick(gemini_val, regex_val):
        if gemini_val and gemini_val != "null":
            return gemini_val
        return regex_val
    
    name = pick(gemini_result.get("name"), regex_result.get("name"))
    email = pick(gemini_result.get("email"), regex_result.get("email"))
    college = pick(gemini_result.get("college"), regex_result.get("college"))
    github_url = pick(gemini_result.get("github_url"), regex_result.get("github_url"))
    linkedin_url = pick(gemini_result.get("linkedin_url"), regex_result.get("linkedin_url"))
    live_url = pick(gemini_result.get("live_url"), regex_result.get("live_url"))
    skills = gemini_result.get("skills") or regex_result.get("skills", [])
    projects = gemini_result.get("projects") or []
    experience = gemini_result.get("experience") or []
    role_type = gemini_result.get("role_type") or regex_result.get("role_type", "Software Engineer")
    
    fields_found = sum([
        bool(name), bool(email), bool(college), bool(github_url or live_url),
        len(skills) > 0, len(projects) > 0
    ])
    confidence = round(fields_found / 6.0, 2)
    snippet = raw_text[:300].replace("\n", " ")
    
    logger.info(f"Resume parsed: name={name}, role={role_type}, skills={len(skills)}, confidence={confidence}")
    
    return ResumeParseResult(
        name=name,
        email=email,
        college=college,
        github_url=github_url,
        linkedin_url=linkedin_url,
        live_url=live_url,
        skills=skills[:20],
        projects=projects[:5],
        experience=experience[:5],
        role_type=role_type,
        raw_text_snippet=snippet,
        parse_confidence=max(0.65, confidence),
        source="resume_pdf"
    )
