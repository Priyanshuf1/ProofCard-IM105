"""
backend/routers/grading.py
100-Mark AI Holistic Evaluation Engine Router for ProofCard (IM-105).
Synthesizes candidate evaluation across all 8 rubric categories:
A: Resume Formatting (10)
B: Projects & Individual Weightage (15)
C: Originality AST/MOSS/Git-DNA (20)
D: Viva Evaluation (10)
E: Live Website Evaluation (10)
F1: Job Alignment (15)
F2: Code Architecture (10)
F3: Git Discipline (10)
Total: Exactly 100.0 Marks Maximum.
"""

from typing import Dict, Any, Optional
from fastapi import APIRouter, HTTPException, status

from backend.models.grading_schemas import (
    GradingEvaluationRequest,
    ComprehensiveEvaluation100,
)
from backend.services.grading_engine import GradingEngine

router = APIRouter(prefix="/api/v1/grading", tags=["100-Mark AI Grading Engine"])


@router.post(
    "/evaluate",
    response_model=ComprehensiveEvaluation100,
    summary="Evaluate Candidate with 100-Mark Rubric",
    description="Synthesizes candidate evaluation across all 8 distinct categories totaling exactly 100.0 marks.",
)
def evaluate_candidate_100_marks(payload: GradingEvaluationRequest):
    """
    Evaluates candidate across all 8 categories:
    A: Formatting (10), B: Projects (15), C: Originality (20), D: Viva (10),
    E: Live Website (10), F1: Alignment (15), F2: Architecture (10), F3: Git Discipline (10).
    """
    try:
        report = GradingEngine.calculate_100_marks(
            candidate_data=payload.candidate_data,
            job_data=payload.job_data,
            viva_score=payload.viva_score,
            repo_url=payload.repo_url,
            live_url=payload.live_url,
        )
        return report
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"100-mark evaluation failed: {str(exc)}",
        )
