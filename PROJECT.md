# Project: ProofCard Backend Modernization (IM-105)

## Architecture
ProofCard is a high-assurance developer talent verification and proof-of-work platform built on FastAPI (Python 3.11). The architecture integrates automated AST complexity analysis, MOSS-style token winnowing plagiarism detection, Git commit forensic cadence auditing, interactive AI/offline Viva verification, multimodal resume ingestion, and candidate-job alignment into an authentic 100-mark holistic evaluation system.

### Core Data Flow
1. **Ingestion Layer (R1)**:
   - Candidates upload resumes (PDF, DOCX, DOC, TXT) via `/api/v1/resumes/upload`.
   - Companies supply an enterprise Sandbox API key to ingest candidate batches via `/api/v1/sandbox/bulk-ingest` and `/api/v1/sandbox/resumes/batch`.
   - Raw documents are normalized and structured into `ParsedResume` profiles.
2. **AI Segregation & Job Requirement Matching Layer (R2)**:
   - Candidates are segregated into `TECHNICAL` and `NON_TECHNICAL` streams via `GeminiAgentService` with strict live API key resolution (request -> header -> env var).
   - Enterprise job descriptions with 6 key dimensions are entered via `/api/v1/jobs`.
   - Multi-dimensional comparison evaluates candidates against JDs, calculating weighted alignment percentage (0-100%), skill match/gap breakdown, and fit verdicts.
3. **Forensic Repository & Live Site Inspection Layer (R3)**:
   - `RepoUrlExtractor` extracts Git repositories (GitHub, GitLab, Bitbucket) and live deployment URLs (Vercel, Netlify, Render, etc.).
   - `ForensicRepoCloner` performs shallow blobless cloning (`--filter=blob:none --depth=50`) with strict 15s timeouts, 150MB limits, Windows-safe cleanup, and automatic local fallback to `cohort_400.json` / `demo_profiles.json` for offline automated tests.
   - `LiveSiteInspector` conducts async HTTP/SSL checks, latency measurement, semantic HTML DOM parsing, viewport detection, and a11y scoring.
4. **100-Mark Holistic Evaluation Engine (R4)**:
   - Orchestrates 8 distinct, non-overlapping evaluation categories totaling exactly 100 marks:
     - Category A (10 Marks): Resume Appearance & Formatting (multimodal/layout parsing)
     - Category B (15 Marks): Projects & Individual Weightage (AST complexity depth, stack relevance, completeness)
     - Category C (20 Marks): Originality & Manual Implementation (AST, MOSS winnowing vs `tutorial_fingerprints.json`, Git-DNA, AI boilerplate detection)
     - Category D (10 Marks): Viva Evaluation (direct 1:1 mapping of existing `VivaEngine` 0-10 score)
     - Category E (10 Marks): Live Website Evaluation (HTTP status, SSL, latency, semantic DOM, viewport, a11y)
     - Category F1 (15 Marks): Job Requirement & Skill Alignment (`JDMatcher` + verified skills)
     - Category F2 (10 Marks): Code Architecture & Structural Quality (McCabe complexity, layer separation, tests)
     - Category F3 (10 Marks): Git Discipline & Development Rigor (`CommitForensics` cadence, messages, refactor ratio)
5. **Compatibility & Verification Layer (R5)**:
   - All existing endpoints, viva scoring, and AST analysis methods remain 100% unbroken with zero signature drift.

---

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Multi-Format Resume Parsing | Ingest and parse PDF, DOCX, DOC, and TXT resumes into structured text | M1 | Survey (R1) |
| 2 | Structured Candidate Profile Extraction | Extract contact details, education, experience, projects, skills, and links | M1 | Survey (R1) |
| 3 | Sandbox API Enterprise Authentication | Validate `X-Sandbox-API-Key` header / body key against authorized registry | M1 | Survey (R1) |
| 4 | Bulk Candidate Data Ingestion | Bulk ingest batches of candidate profiles and resumes (up to 500) with error isolation | M1 | Survey (R1) |
| 5 | Multi-File Resume Batch Upload | Multipart batch upload of resumes linked to enterprise company and job ID | M1 | Survey (R1) |
| 6 | Strict Gemini API Key Enforcement | Validate key via request body, header (`x-gemini-api-key`), or env; return 401 if missing | M2 | Survey (R2) |
| 7 | Gemini AI Stream Segregation | Classify candidates into TECHNICAL or NON_TECHNICAL stream with confidence & reasoning | M2 | Survey (R2) |
| 8 | Simultaneous Job Requirement Input | Store enterprise JDs with responsibilities, tech/soft skills, qualifications, experience | M2 | Survey (R2) |
| 9 | AI Job Requirement Comparison Engine | Compare candidate against JD across 5 dimensions, generating 0-100% alignment & skill gap | M2 | Survey (R2) |
| 10 | Public Repository URL Extraction | Extract GitHub, GitLab, Bitbucket, and Codeberg repository URLs from resume text | M3 | Survey (R3) |
| 11 | Live Deployment URL Extraction | Extract Vercel, Netlify, Render, Heroku, GitHub Pages, and custom web URLs | M3 | Survey (R3) |
| 12 | Secure Forensic Repository Cloner | Blobless shallow cloning with 15s timeout, 150MB limit, and Windows-safe temp cleanup | M3 | Survey (R3) |
| 13 | Local Sample Repository Fallback | Automatic fallback to `cohort_400.json` / `demo_profiles.json` fixtures during test runs | M3 | Survey (R3) |
| 14 | Live Website Inspection Engine | Async HTTP status, SSL validity, load latency, semantic DOM, viewport, and a11y audit | M3 | Survey (R3) |
| 15 | Category A: Formatting Grading (10M) | Score visual layout, readability, typography, and structure via multimodal/regex | M4 | Survey (R4) |
| 16 | Category B: Projects Grading (15M) | Score project count, complexity depth, modern stack relevance, and completeness | M4 | Survey (R4) |
| 17 | Category C: Originality Grading (20M) | Score MOSS winnowing vs clone fingerprints (8M), AST uniqueness (5M), manual code (4M), attribution (3M) | M4 | Survey (R4) |
| 18 | Category D: Viva Integration (10M) | Seamless 1:1 integration of existing `VivaEngine` 0-10 conceptual score into rubric | M4 | Survey (R4) |
| 19 | Category E: Live Website Grading (10M)| Score HTTP (3M), latency (2M), semantic DOM (2M), viewport (2M), a11y (1M) | M4 | Survey (R4) |
| 20 | Category F1: Job Alignment (15M) | Score required skills match (8M), preferred skills (4M), domain relevance (3M) | M4 | Survey (R4) |
| 21 | Category F2: Architecture Quality (10M) | Score cyclomatic complexity (3M), modularity (3M), testing rigor (2M), error handling (2M) | M4 | Survey (R4) |
| 22 | Category F3: Git Discipline (10M) | Score commit cadence (3M), message maturity (3M), refactor ratio (2M), author consistency (2M) | M4 | Survey (R4) |
| 23 | 100-Mark Comprehensive Grading API | Synthesize all 8 categories into exact 100-mark report with grade, hash, and feedback | M4 | Survey (R4) |
| 24 | Viva & AST Interface Compatibility | Preserve existing `VivaEngine` and `ASTAnalyzer` public interfaces without regression | M4 | Survey (R5) |
| 25 | E2E Test Suite (Tiers 1-4) | Comprehensive opaque-box test suite covering all features, boundaries, and scenarios | E2E Track | Survey (E2E) |
| 26 | Final E2E Pass & Coverage Hardening | 100% pass on Tiers 1-4 + Tier 5 adversarial coverage hardening | M5 | Survey (Final) |

---

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Resume Ingestion & Sandbox Bulk Upload | Multi-format parser (PDF, DOCX, DOC, TXT), structured `ParsedResume`, Sandbox API key auth, bulk ingestion & multi-file endpoints | none | DONE |
| M2 | Gemini AI Segregation & Job Comparison | Strict Gemini API key resolution (401 on missing), TECHNICAL vs NON_TECHNICAL segregation, Job requirement storage & multi-dimensional comparison | M1 | DONE |
| M3 | Public Projects & Forensic Repository Inspector | Git and live deployment URL extraction, secure shallow cloning with timeouts/limits, test fixture fallback, live website DOM/SSL/latency audit | M1 | DONE |
| M4 | 100-Mark AI Evaluation Engine | Synthesis of all 8 grading categories (A:10, B:15, C:20, D:10, E:10, F1:15, F2:10, F3:10) totaling 100 marks, preserving existing Viva/AST interfaces | M1, M2, M3 | DONE |
| M5 | Final Milestone: E2E Verification & Adversarial Hardening | Phase 1: Pass 100% of E2E test suite (Tiers 1-4). Phase 2: Tier 5 adversarial coverage hardening via Challenger loop | M4, TEST_READY | DONE |

*Parallel Track*:
| Track | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| E2E | E2E Testing Track | Independent requirement-driven test infra, test cases (Tiers 1-4), publishing `TEST_READY.md` | none | DONE |

---

## Interface Contracts

### 1. Ingestion (`resume_parser.py` & `sandbox_service.py`) ↔ System
- `ResumeParserService.parse_document(filename: str, content: bytes) -> str`
- `ResumeParserService.extract_structured_candidate(raw_text: str, filename: Optional[str], candidate_id: Optional[str], gemini_api_key: Optional[str]) -> ParsedResume`
- `SandboxIngestionService.verify_api_key(api_key: Optional[str]) -> bool`
- `SandboxIngestionService.process_bulk_batch(request: SandboxBulkIngestRequest, api_key: str) -> SandboxBulkIngestResponse`

### 2. Gemini AI Agent (`gemini_agent.py`) ↔ Routers
- `GeminiAgentService.resolve_api_key(request_key: Optional[str], header_key: Optional[str], env_key: Optional[str]) -> str` (raises 401 if missing)
- `GeminiAgentService.segregate_candidate(candidate_data: Dict[str, Any], api_key: str) -> CandidateSegregationResult`
- `GeminiAgentService.compare_resume_to_job(candidate_data: Dict[str, Any], job_data: Dict[str, Any], api_key: str) -> CandidateJobComparisonResult`

### 3. Forensic Cloner & Live Inspector (`forensic_cloner.py` & `live_site_inspector.py`) ↔ System
- `RepoUrlExtractor.extract_urls(text: str) -> Dict[str, List[str]]` (returns `{"git_repos": [...], "live_deployments": [...]}`)
- `ForensicRepoCloner.clone_and_inspect(repo_url: str, test_mode: bool = False) -> Dict[str, Any]` (returns telemetry or local fixture)
- `LiveSiteInspector.audit_url(url: str, timeout: float = 8.0) -> LiveWebsiteAudit`

### 4. 100-Mark Grading Engine (`grading_engine.py`) ↔ System
- `GradingEngine.calculate_100_marks(candidate_data: Dict[str, Any], job_data: Optional[Dict[str, Any]], resume_raw_text: str, viva_score: Optional[float], live_audit: Optional[LiveWebsiteAudit], repo_telemetry: Optional[Dict[str, Any]]) -> ComprehensiveEvaluation100`
- Guarantees:
  - `total_score == sum(category_totals) == 100.0 max`
  - Zero modification to `VivaEngine` or `ASTAnalyzer` function signatures.

---

## Code Layout
```
backend/
├── data/                             # Reference datasets (cohort_400, job_descriptions_30, etc.)
├── models/
│   ├── __init__.py
│   ├── schemas.py                    # Core schemas (extended with clean re-exports)
│   ├── resume_schemas.py             # R1 Pydantic models (ParsedResume, CandidateContact, etc.)
│   ├── gemini_schemas.py             # R2 Pydantic models (Segregation, JobRequirements, Comparison)
│   └── grading_schemas.py            # R4 Pydantic models (Category A-F, ComprehensiveEvaluation100)
├── routers/
│   ├── resumes.py                    # R1 resume upload endpoints (/api/v1/resumes)
│   ├── sandbox.py                    # R1 Sandbox API bulk ingestion (/api/v1/sandbox)
│   ├── gemini_ai.py                  # R2 candidate segregation and comparison (/api/v1/gemini)
│   ├── jobs.py                       # R2 job requirements CRUD (/api/v1/jobs)
│   ├── forensics.py                  # R3 URL extraction and forensic cloning (/api/v1/forensics)
│   ├── grading.py                    # R4 100-mark evaluation endpoints (/api/v1/grading)
│   └── [existing routers...]         # Unbroken existing routes
├── services/
│   ├── resume_parser.py              # Multi-format document parser
│   ├── sandbox_service.py            # Sandbox API bulk ingestion service
│   ├── gemini_agent.py               # Gemini AI agent service
│   ├── repo_extractor.py             # Regex URL & live site extractor
│   ├── forensic_cloner.py            # Secure repo cloner with test fallback
│   ├── live_site_inspector.py        # Async HTTP & DOM inspector
│   ├── grading_engine.py             # 100-mark rubric calculation engine
│   └── [existing services...]        # Unbroken viva_engine, ast_analyzer, etc.
├── tests/
│   ├── test_resume_ingestion.py      # M1 unit/integration tests
│   ├── test_sandbox_bulk.py          # M1 Sandbox bulk ingestion tests
│   ├── test_gemini_segregation.py    # M2 segregation & job comparison tests
│   ├── test_forensic_cloning.py      # M3 URL extraction, cloning & live site tests
│   ├── test_100_mark_grading.py      # M4 100-mark grading engine tests
│   └── [existing tests...]           # Unbroken 86 existing tests
├── main.py                           # App entry point with new router mounts
tests/
└── e2e/                              # Dual-track opaque-box E2E test suite (Tiers 1-4)
    ├── conftest.py
    ├── test_runner.py
    ├── test_tier1_features.py
    ├── test_tier2_boundaries.py
    ├── test_tier3_cross_feature.py
    └── test_tier4_scenarios.py
```
