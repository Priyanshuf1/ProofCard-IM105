from typing import List, Optional, Dict, Any, Union
from pydantic import BaseModel, Field

class ConsentRequest(BaseModel):
    candidate_id: str
    github_handle: Optional[str] = None
    consent_granted: bool
    email: Optional[str] = None

class IngestionURLRequest(BaseModel):
    github_url: str
    candidate_name: Optional[str] = "Anonymous Candidate"
    college: Optional[str] = "Affiliated Engineering Institute"
    consent_granted: bool = True
    github_token: Optional[str] = None
    target_subpath: Optional[str] = None
    email: Optional[str] = None

class ComplexFunction(BaseModel):
    file: str
    function_name: str
    complexity: int
    line_number: int
    snippet: str

class MatchedTutorial(BaseModel):
    id: str
    name: str
    youtube_url: str
    uploaded: str
    similarity_score: float
    matched_files: List[str]
    verdict: str

class GitDnaMetrics(BaseModel):
    total_commits: int
    time_span_days: int
    burst_ratio: float
    deletion_ratio: float
    organic_growth: bool
    message_maturity_score: int
    test_files_detected: int
    history_verified: Optional[bool] = None

class VivaQuestion(BaseModel):
    question_id: str
    function_name: str
    file: str
    line_number: int
    question: str
    expected_concepts: List[str]
    difficulty: str

class VivaAnswerSubmission(BaseModel):
    question_id: str
    candidate_answer: str

class VivaEvaluationResult(BaseModel):
    question_id: str
    score: int
    concepts_demonstrated: List[str]
    concepts_missing: List[str]
    feedback: str
    passed: bool

class VivaSessionResult(BaseModel):
    candidate_id: str
    total_score: int
    max_score: int
    evaluations: List[VivaEvaluationResult]
    overall_feedback: str

class ProofCardData(BaseModel):
    candidate_id: str
    name: str
    college: str
    authenticity_score: int
    viva_score: int
    status: str
    headline: str
    strengths: List[str]
    growth_area: str
    specific_action: str
    tamper_proof_hash: str
    qr_verification_url: str
    is_clone: bool
    matched_tutorial: Optional[MatchedTutorial] = None
    email: Optional[str] = None

class JDParsingRequest(BaseModel):
    job_title: str
    job_description: str

class CandidateBattleProfile(BaseModel):
    candidate_id: str
    name: str
    college: str
    authenticity_score: Union[int, float]
    detected_files: List[str] = Field(default_factory=list)
    viva_score: Union[int, float]
    project_type: Optional[str] = "Fullstack"
    is_clone: bool = False
    analysis_status: Optional[str] = "COMPLETED"
    analysis_confidence: Optional[float] = None
    skill_evidence: Dict[str, List[str]] = Field(default_factory=dict)
    email: Optional[str] = None

class BattleRequest(BaseModel):
    job_requirements: List[str]
    candidates: List[CandidateBattleProfile]

class BattleCandidateResult(BaseModel):
    candidate_id: str
    name: str
    college: str
    authenticity_score: int
    jd_match_pct: int
    viva_score: Union[int, float]
    composite_score: int
    verified_skills: List[str]
    missing_skills: List[str]
    has_tests: bool
    is_clone: Optional[bool] = False
    email: Optional[str] = None

class BattleResponse(BaseModel):
    status: str
    winner_id: str
    winner_name: str
    diff_pts: int
    rationale: str
    battle_matrix: List[BattleCandidateResult]

class RecruiterDecision(BaseModel):
    candidate_id: str
    name: str
    college: str
    college_tier: str  # "Tier-1" or "Tier-3 / Non-Elite"
    skill_score: int   # 0 - 100
    recruiter_shortlisted: bool

class BiasMirrorRequest(BaseModel):
    recruiter_id: Optional[str] = "recruiter_eval_01"
    session_decisions: List[RecruiterDecision]

class BiasMirrorResponse(BaseModel):
    total_reviewed: int
    tier1_shortlist_rate: float
    tier3_shortlist_rate: float
    disparity_ratio: float
    unconscious_bias_detected: bool
    bias_footprint_message: str
    fairness_compliance_status: str
    remedy_recommendations: List[str]
