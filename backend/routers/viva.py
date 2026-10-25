from typing import List, Optional
from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
from backend.services.viva_engine import VivaEngine

router = APIRouter(prefix="/api/viva", tags=["Dynamic Code Viva"])

class VivaSubmission(BaseModel):
    candidate_id: str
    question_id: str
    question_text: str
    expected_concepts: List[str]
    candidate_answer: str
    gemini_api_key: Optional[str] = None

class BatchVivaSubmission(BaseModel):
    candidate_id: str
    answers: List[VivaSubmission]
    gemini_api_key: Optional[str] = None

class GenerateMoreRequest(BaseModel):
    complex_functions: list
    count: int = 5

@router.post("/generate-more")
def generate_more_viva_questions(req: GenerateMoreRequest):
    engine = VivaEngine()
    questions = engine.generate_questions_for_functions(req.complex_functions, max_questions=req.count)
    return {
        "questions": questions,
        "count": len(questions)
    }

@router.post("/evaluate-single")
def evaluate_single_answer(
    submission: VivaSubmission,
    x_gemini_api_key: Optional[str] = Header(None, alias="X-Gemini-Api-Key")
):
    engine = VivaEngine()
    active_key = submission.gemini_api_key or x_gemini_api_key
    result = engine.evaluate_answer(
        question_text=submission.question_text,
        expected_concepts=submission.expected_concepts,
        candidate_answer=submission.candidate_answer,
        gemini_api_key=active_key
    )
    return {
        "candidate_id": submission.candidate_id,
        "question_id": submission.question_id,
        **result
    }

@router.post("/submit-session")
def submit_viva_session(
    batch: BatchVivaSubmission,
    x_gemini_api_key: Optional[str] = Header(None, alias="X-Gemini-Api-Key")
):
    engine = VivaEngine()
    evaluations = []
    total_score = 0
    active_key = batch.gemini_api_key or x_gemini_api_key

    for ans in batch.answers:
        key_to_use = ans.gemini_api_key or active_key
        res = engine.evaluate_answer(
            question_text=ans.question_text,
            expected_concepts=ans.expected_concepts,
            candidate_answer=ans.candidate_answer,
            gemini_api_key=key_to_use
        )
        total_score += res["score"]
        evaluations.append({
            "question_id": ans.question_id,
            **res
        })

    max_score = len(batch.answers) * 10 if batch.answers else 30
    overall_avg = round((total_score / max(len(batch.answers), 1)))

    if overall_avg >= 8:
        feedback = "Outstanding conceptual depth and architecture reasoning. Clear signal of authentic codebase ownership."
    elif overall_avg >= 6:
        feedback = "Solid technical competence. Able to explain core workflows and boundary conditions."
    elif overall_avg >= 4:
        feedback = "Borderline understanding. Missed edge-case handling and architectural rationale."
    else:
        feedback = "Weak conceptual grasp of code functionality. Indicates potential tutorial copying or reliance on boilerplate."

    return {
        "candidate_id": batch.candidate_id,
        "total_score": total_score,
        "max_score": max_score,
        "viva_average_10": overall_avg,
        "evaluations": evaluations,
        "overall_feedback": feedback
    }
