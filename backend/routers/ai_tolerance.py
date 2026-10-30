"""
AI Tolerance & Enterprise Prompting Policy Gate — Pariksha Platform
Enforces company-defined AI prompting templates and maximum AI-assisted code thresholds.
"""
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import logging

logger = logging.getLogger("ai_tolerance")
router = APIRouter(prefix="/api/ai-tolerance", tags=["AI Tolerance Gate"])

COMPANY_PROMPTING_TEMPLATES = [
    {
        "id": "strict-core-logic",
        "name": "Strict Human Core (FinTech / High-Assurance)",
        "max_ai_limit_percent": 20.0,
        "max_ai_percentage": 20.0,
        "description": "AI permitted only for syntax lookups and standard test fixtures. Core business logic and algorithmic structures must be 100% human-authored.",
        "allowed_categories": ["Boilerplate", "Unit Test Syntax", "Docstrings"],
        "prohibited_categories": ["Core Algorithms", "Security Guards", "State Machines"],
        "penalty_action": "FLAG_HUMAN_INTERVIEW_MANDATORY"
    },
    {
        "id": "balanced-copilot",
        "name": "Balanced Copilot (Standard SaaS / Product Engineering)",
        "max_ai_limit_percent": 35.0,
        "max_ai_percentage": 35.0,
        "description": "Permits standard Copilot/ChatGPT scaffolding, UI templates, and CRUD operations up to 35%. Candidate must explain architectural trade-offs.",
        "allowed_categories": ["Scaffolding", "CSS/Tailwind Styling", "CRUD Routes", "Documentation"],
        "prohibited_categories": ["System Architecture", "Prompt Injection Bypasses", "Unverified Code Dumps"],
        "penalty_action": "PROMPT_FOR_ARCHITECTURAL_DEFENSE"
    },
    {
        "id": "ai-native-builder",
        "name": "AI-Native Builder (Speed & Modern AI Workflows)",
        "max_ai_limit_percent": 50.0,
        "max_ai_percentage": 50.0,
        "description": "Encourages prompt-engineering speed up to 50% AI assistance. Requires candidate to document prompt constraints and verify edge cases.",
        "allowed_categories": ["Full Functions with Review", "Refactoring", "API Integration", "Data Mappings"],
        "prohibited_categories": ["Hallucinated Dependencies", "Unchecked Secret Keys"],
        "penalty_action": "REQUIRE_LIVE_DEBUGGING_SAMPLE"
    }
]


class ToleranceCheckRequest(BaseModel):
    answer_text: Optional[str] = None
    text: Optional[str] = None
    tolerance_percent: Optional[float] = None
    company_limit_percent: Optional[float] = None
    template_id: Optional[str] = "balanced-copilot"
    candidate_name: Optional[str] = None
    question_index: Optional[int] = None
    prompt_context: Optional[str] = None

    def get_text(self) -> str:
        return self.answer_text or self.text or ""

    def get_limit(self, default_val: float) -> float:
        if self.tolerance_percent is not None and self.tolerance_percent > 0:
            return self.tolerance_percent
        if self.company_limit_percent is not None and self.company_limit_percent > 0:
            return self.company_limit_percent
        return default_val


class ToleranceCheckResult(BaseModel):
    ai_probability_percent: float
    tolerance_percent: float
    template_id: str
    template_name: str
    exceeded: bool
    excess_percent: float
    verdict: str  # "PASS" | "WARN" | "FAIL"
    badge: str
    badge_color: str
    message: str
    classification: str
    template_rules: Dict[str, Any]
    passes_policy: Optional[bool] = None
    ai_percentage: Optional[float] = None
    excess_percentage: Optional[float] = None


@router.get("/templates")
def get_prompting_templates():
    """Return available company AI prompting templates."""
    return {
        "status": "success",
        "templates": COMPANY_PROMPTING_TEMPLATES,
        "default_template_id": "balanced-copilot"
    }


@router.post("/check", response_model=ToleranceCheckResult)
async def check_ai_tolerance(req: ToleranceCheckRequest):
    """
    Check if code or viva defense answer exceeds company's AI tolerance limit
    and conforms to the chosen company prompting template.
    """
    from backend.services.ai_detector import AIDetector
    
    template = next((t for t in COMPANY_PROMPTING_TEMPLATES if t["id"] == req.template_id), COMPANY_PROMPTING_TEMPLATES[1])
    active_limit = req.get_limit(template["max_ai_limit_percent"])

    detector = AIDetector()
    result = detector.detect(req.get_text())
    
    ai_prob = result.get("ai_probability")
    classification = result.get("classification", "insufficient_text")
    
    if ai_prob is None:
        return ToleranceCheckResult(
            ai_probability_percent=0.0,
            tolerance_percent=active_limit,
            template_id=template["id"],
            template_name=template["name"],
            exceeded=False,
            excess_percent=0.0,
            verdict="UNKNOWN",
            badge="— Insufficient Text",
            badge_color="gray",
            message="Submission text is too concise to reliably calculate stylometric AI footprint.",
            classification=classification,
            template_rules=template,
            passes_policy=True,
            ai_percentage=0.0,
            excess_percentage=0.0
        )
    
    ai_pct = round(ai_prob * 100, 1)
    exceeded = ai_pct > active_limit
    excess_pct = round(max(0.0, ai_pct - active_limit), 1)
    
    if not exceeded and ai_pct <= active_limit * 0.6:
        verdict = "PASS"
        badge = f"✓ Human Authored ({ai_pct}%)"
        badge_color = "emerald"
        message = f"Compliant with {template['name']}. Detected AI assistance ({ai_pct}%) is well below the {active_limit}% company limit."
    elif not exceeded:
        verdict = "WARN"
        badge = f"⚠ Within Template ({ai_pct}%)"
        badge_color = "amber"
        message = f"AI assistance detected at {ai_pct}%. Permitted under {template['name']}, but near the {active_limit}% threshold."
    else:
        verdict = "FAIL"
        badge = f"🚨 AI Exceeded (+{excess_pct}%)"
        badge_color = "red"
        message = f"POLICY VIOLATION: AI content ({ai_pct}%) exceeds {template['name']} ceiling of {active_limit}% by +{excess_pct}%. Candidate must prove hands-on code authorship during technical defense."
    
    return ToleranceCheckResult(
        ai_probability_percent=ai_pct,
        tolerance_percent=active_limit,
        template_id=template["id"],
        template_name=template["name"],
        exceeded=exceeded,
        excess_percent=excess_pct,
        verdict=verdict,
        badge=badge,
        badge_color=badge_color,
        message=message,
        classification=classification,
        template_rules=template,
        passes_policy=not exceeded,
        ai_percentage=ai_pct,
        excess_percentage=excess_pct
    )
