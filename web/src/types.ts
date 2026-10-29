export interface ComplexFunction {
  file: string;
  function_name: string;
  complexity: number;
  line_number: number;
  snippet: string;
}

export interface MatchedTutorial {
  id: string;
  name: string;
  youtube_url?: string;
  source_url?: string;
  uploaded?: string;
  similarity_score: number;
  matched_files: string[];
  author?: string;
  origin_type?: string;
  verdict: string;
}


export interface GitDnaMetrics {
  total_commits: number;
  time_span_days: number;
  burst_ratio: number;
  deletion_ratio: number;
  organic_growth: boolean;
  message_maturity_score: number;
  test_files_detected: number;
  history_verified?: boolean;
  authenticity_score?: number;
  summary?: string;
}

export interface VivaQuestion {
  question_id: string;
  function_name: string;
  file: string;
  line_number: number;
  question: string;
  expected_concepts: string[];
  difficulty: string;
  mock_answer?: string;
  score?: number;
  feedback?: string;
}

export interface ProofCardContent {
  status: string;
  headline: string;
  strengths?: string[];
  growth_area?: string;
  specific_action?: string;
  tamper_proof_hash: string;
  human_readable_reason?: string;
}

export interface AssessmentResults {
  coding_score?: number;
  code_score?: number;
  aptitude_score?: number;
  problem_solving_score?: number;
  composite_assessment?: number;
}

export interface CandidateProfile {
  candidate_id: string;
  name: string;
  anonymised_name?: string;
  college: string;
  college_tier?: string;
  repo_url?: string;
  project_name?: string;
  project_type: string;
  total_loc: number;
  authenticity_score: number;
  is_clone: boolean;
  matched_tutorial?: MatchedTutorial | null;
  git_dna: GitDnaMetrics;
  complex_functions?: ComplexFunction[];
  viva_questions?: VivaQuestion[];
  viva_score: number;
  proof_card: ProofCardContent;
  consent_recorded?: boolean;
  consent_verified?: boolean;
  consent_status?: string;
  consent_timestamp?: string;
  [key: string]: any;
  detected_files?: string[];
  structural_token_sequence?: string;
  candidate_name?: string;
  detected_stack?: string;
  available_repos?: string[];
  live_analyzed?: boolean;
  analysis_status?: string;
  analysis_confidence?: number;
  skill_evidence?: Record<string, string[]>;
  readiness_plan?: {
    status: string;
    decision_use?: string;
    message?: string;
    gaps: Array<{ id: string; priority: string; skill: string; reason: string; task: string; artifact: string; acceptance: string }>;
    next_reassessment?: string;
  };
  verified_skills?: string[];
  assessment_results?: AssessmentResults;
  deployment_contract?: DeploymentContract;
}

export interface DeploymentCompetency {
  id: string;
  name: string;
  state: 'OBSERVED_IN_SOURCE' | 'NOT_OBSERVED';
  source_files: string[];
  next_proof: string;
}

export interface DeploymentContract {
  version: string;
  contract_id: string;
  contract_hash: string;
  candidate_id?: string;
  role_title: string;
  status: 'READY_FOR_WORK_SAMPLE' | 'EVIDENCE_INCOMPLETE';
  decision_use: string;
  summary: string;
  competencies: DeploymentCompetency[];
  work_sample: {
    status: 'NOT_STARTED';
    brief: string;
    required_evidence: string[];
    acceptance: string;
  };
  outcome_checkpoints: Array<{
    checkpoint: string;
    status: 'NOT_RECORDED';
    required_evidence: string;
  }>;
  calibration: {
    status: 'AWAITING_WORKPLACE_OUTCOMES';
    assessment_prediction: 'NOT_COMPARED';
    time_to_productivity: 'NOT_RECORDED';
    message: string;
  };
  evidence_basis: {
    source_files: string[];
    history_verified: boolean;
    complex_functions: number;
    viva_questions: number;
    analysis_status: string;
  };
}

export interface BattleCandidateResult {
  candidate_id: string;
  name: string;
  college: string;
  authenticity_score: number;
  jd_match_pct: number;
  viva_score: number;
  composite_score: number;
  verified_skills: string[];
  missing_skills: string[];
  has_tests: boolean;
  is_clone?: boolean;
}

export interface BattleResponse {
  status: string;
  winner_id: string;
  winner_name: string;
  diff_pts: number;
  rationale: string;
  battle_matrix: BattleCandidateResult[];
}

export interface RecruiterDecision {
  candidate_id: string;
  name: string;
  college: string;
  college_tier: string;
  skill_score: number;
  recruiter_shortlisted: boolean;
}

export interface BiasMirrorResponse {
  total_reviewed: number;
  tier1_shortlist_rate: number;
  tier3_shortlist_rate: number;
  disparity_ratio: number;
  unconscious_bias_detected: boolean;
  bias_footprint_message: string;
  fairness_compliance_status: string;
  remedy_recommendations: string[];
}

export interface CloneCluster {
  id?: string;
  tutorial_name: string;
  source_url?: string;
  author?: string;
  origin_type?: string;
  count: number;
  similarity: string;
  similarity_pct?: number;
  sample_candidates?: string[];
  candidates?: CandidateProfile[];
}

export interface BatchIngestionStats {
  total_candidates: number;
  authentic_builders_count: number;
  clones_flagged_count: number;
  dead_dumps_count: number;
  hours_saved: number;
  clone_clusters: CloneCluster[];
  cohort: CandidateProfile[];
}
