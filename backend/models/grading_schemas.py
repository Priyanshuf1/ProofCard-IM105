"""
backend/models/grading_schemas.py
Pydantic schemas for the ProofCard 100-Mark AI Holistic Evaluation Engine.
Enforces exact non-overlapping rubrics across all 8 evaluation categories:
Category A: Resume Appearance and Formatting (10 Marks)
Category B: Projects and Their Individual Weightage (15 Marks)
Category C: Originality and Manual Implementation (20 Marks)
Category D: Viva Evaluation (10 Marks)
Category E: Live Website Evaluation (10 Marks)
Category F1: Job Requirement & Skill Alignment (15 Marks)
Category F2: Code Architecture & Structural Quality (10 Marks)
Category F3: Git Discipline & Development Rigor (10 Marks)
Total: Exactly 100 Marks Maximum.
"""

from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field


# ---------------------------------------------------------------------------
# Category A: Resume Appearance and Formatting (10 Marks)
# ---------------------------------------------------------------------------

class CategoryAScore(BaseModel):
    model_config = {"extra": "allow"}
    section_structure_score: float = Field(..., ge=0.0, le=3.0, description="Section structure and flow (0-3)")
    typography_readability_score: float = Field(..., ge=0.0, le=3.0, description="Typography and readability (0-3)")
    professional_layout_score: float = Field(..., ge=0.0, le=2.0, description="Professional layout and contact integrity (0-2)")
    density_length_score: float = Field(..., ge=0.0, le=2.0, description="Information density and length balance (0-2)")
    total: float = Field(..., ge=0.0, le=10.0, description="Category A total score (Max 10)")
    feedback: str = Field(..., description="Assessment feedback on formatting and presentation")


# ---------------------------------------------------------------------------
# Category B: Projects and Their Individual Weightage (15 Marks)
# ---------------------------------------------------------------------------

class ProjectDetailScore(BaseModel):
    model_config = {"extra": "allow"}
    project_name: str
    repo_url: Optional[str] = None
    live_url: Optional[str] = None
    complexity_score: float = Field(..., ge=0.0, le=5.0)
    relevance_score: float = Field(..., ge=0.0, le=4.0)
    implementation_score: float = Field(..., ge=0.0, le=3.0)
    total_project_score: float = Field(..., ge=0.0, le=12.0)
    detected_stack: List[str] = Field(default_factory=list)
    has_tests: bool = False


class CategoryBScore(BaseModel):
    model_config = {"extra": "allow"}
    project_count: int
    breadth_score: float = Field(..., ge=0.0, le=3.0)
    complexity_depth_score: float = Field(..., ge=0.0, le=5.0)
    modern_stack_score: float = Field(..., ge=0.0, le=4.0)
    completeness_score: float = Field(..., ge=0.0, le=3.0)
    projects: List[ProjectDetailScore] = Field(default_factory=list)
    total: float = Field(..., ge=0.0, le=15.0, description="Category B total score (Max 15)")
    feedback: str


# ---------------------------------------------------------------------------
# Category C: Originality and Manual Implementation (20 Marks)
# ---------------------------------------------------------------------------

class CategoryCScore(BaseModel):
    model_config = {"extra": "allow"}
    winnowing_moss_score: float = Field(..., ge=0.0, le=8.0, description="MOSS Winnowing check against tutorial fingerprints (0-8)")
    ast_uniqueness_score: float = Field(..., ge=0.0, le=5.0, description="Structural AST uniqueness (0-5)")
    manual_vs_ai_score: float = Field(..., ge=0.0, le=4.0, description="Manual code evidence vs AI boilerplate (0-4)")
    attribution_transparency_score: float = Field(..., ge=0.0, le=3.0, description="Upstream attribution & original authorship (0-3)")
    is_clone: bool = False
    matched_tutorial: Optional[Dict[str, Any]] = None
    total: float = Field(..., ge=0.0, le=20.0, description="Category C total score (Max 20)")
    feedback: str


# ---------------------------------------------------------------------------
# Category D: Viva Evaluation (10 Marks)
# ---------------------------------------------------------------------------

class CategoryDScore(BaseModel):
    model_config = {"extra": "allow"}
    viva_status: str = Field("COMPLETED", description="'COMPLETED', 'PENDING', or 'EXEMPT'")
    viva_average_10: float = Field(..., ge=0.0, le=10.0, description="Raw average viva score (0-10)")
    questions_evaluated: int = Field(0, description="Number of viva questions answered")
    total: float = Field(..., ge=0.0, le=10.0, description="Category D total score (Max 10)")
    feedback: str


# ---------------------------------------------------------------------------
# Category E: Live Website Evaluation (10 Marks)
# ---------------------------------------------------------------------------

class CategoryEScore(BaseModel):
    model_config = {"extra": "allow"}
    has_live_deployment: bool = False
    audit: Optional[Dict[str, Any]] = None
    total: float = Field(..., ge=0.0, le=10.0, description="Category E total score (Max 10)")
    feedback: str


# ---------------------------------------------------------------------------
# Category F: Additional Parameters (35 Marks Total)
# ---------------------------------------------------------------------------

class CategoryF1Score(BaseModel):
    model_config = {"extra": "allow"}
    required_skills_match: float = Field(..., ge=0.0, le=8.0)
    preferred_skills_match: float = Field(..., ge=0.0, le=4.0)
    domain_relevance: float = Field(..., ge=0.0, le=3.0)
    verified_skills: List[str] = Field(default_factory=list)
    missing_skills: List[str] = Field(default_factory=list)
    total: float = Field(..., ge=0.0, le=15.0, description="F1 Job Alignment total (Max 15)")


class CategoryF2Score(BaseModel):
    model_config = {"extra": "allow"}
    cyclomatic_maintainability: float = Field(..., ge=0.0, le=3.0)
    modularity_separation: float = Field(..., ge=0.0, le=3.0)
    automated_testing_rigor: float = Field(..., ge=0.0, le=2.0)
    defensive_error_handling: float = Field(..., ge=0.0, le=2.0)
    total: float = Field(..., ge=0.0, le=10.0, description="F2 Code Architecture total (Max 10)")


class CategoryF3Score(BaseModel):
    model_config = {"extra": "allow"}
    commit_frequency_cadence: float = Field(..., ge=0.0, le=3.0)
    message_maturity: float = Field(..., ge=0.0, le=3.0)
    refactoring_deletion_ratio: float = Field(..., ge=0.0, le=2.0)
    author_consistency_branching: float = Field(..., ge=0.0, le=2.0)
    total: float = Field(..., ge=0.0, le=10.0, description="F3 Git Discipline total (Max 10)")


class CategoryFScore(BaseModel):
    model_config = {"extra": "allow"}
    f1_job_alignment: CategoryF1Score
    f2_architecture: CategoryF2Score
    f3_git_discipline: CategoryF3Score
    total: float = Field(..., ge=0.0, le=35.0, description="Category F total score (Max 35)")


# ---------------------------------------------------------------------------
# Comprehensive 100-Mark Synthesis
# ---------------------------------------------------------------------------

class ComprehensiveEvaluation100(BaseModel):
    model_config = {"extra": "allow"}
    candidate_id: str
    candidate_name: str
    total_score: float = Field(..., ge=0.0, le=100.0, description="Final combined score out of exactly 100")
    grade: str = Field(..., description="A+ (>=90), A (>=80), B (>=65), C (>=50), D (<50)")
    category_a_formatting: CategoryAScore       # 10 Marks
    category_b_projects: CategoryBScore         # 15 Marks
    category_c_originality: CategoryCScore       # 20 Marks
    category_d_viva: CategoryDScore             # 10 Marks
    category_e_live_website: CategoryEScore     # 10 Marks
    category_f_additional: CategoryFScore       # 35 Marks (F1: 15, F2: 10, F3: 10)
    summary: str
    strengths: List[str] = Field(default_factory=list)
    growth_areas: List[str] = Field(default_factory=list)
    tamper_proof_hash: str


class GradingEvaluationRequest(BaseModel):
    model_config = {"extra": "allow"}
    candidate_data: Dict[str, Any] = Field(..., description="Parsed or structured candidate profile")
    job_data: Optional[Dict[str, Any]] = Field(None, description="Target job description")
    viva_score: Optional[float] = Field(None, description="Candidate viva score out of 10")
    repo_url: Optional[str] = Field(None, description="Optional primary Git repository URL")
    live_url: Optional[str] = Field(None, description="Optional live deployed application URL")
