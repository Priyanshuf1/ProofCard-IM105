# Project: ProofCard (IM-105)

## Architecture
ProofCard is an autonomous talent verification platform that forensically audits software and non-technical talent through repository AST cyclomatic complexity analysis, temporal Git-DNA metrics, Winnowing tutorial clone detection, statistical stylometric AI detection, automated Viva defense with speech-to-text, 3D ProofCard credentials with canonical QR verification, and automated decision email dispatch via n8n webhooks.

- **Backend**: FastAPI 0.110.0 (Python 3.13), Pydantic v2, PyMuPDF + pypdf, Winnowing AST matcher, Starlette test client, Uvicorn. Entry point: `backend/main.py` and Vercel serverless entry `api/index.py`.
- **Frontend**: Vite 8.3.4 + React 19.3.1 + TypeScript 6.0.3 + Tailwind CSS v4.3.3 + Three.js 0.186.1 + GSAP 3.15.0. Output: `web/dist/`.
- **Deployment**: Vercel Serverless (`https://proofcard.vercel.app`), multi-stage Dockerfile, and GitHub Actions CI.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Priyanshu Resume Parsing | Parse `Priyanshu Awasthi — Resume.pdf` from Downloads with full contact, education, skills, and projects extraction | M3 | survey |
| 2 | Non-Tech MBA/BBA Track | Classification, business viva synthesis (`viva_biz_1..3`), and scorecard generation for non-tech candidates | M2 | survey |
| 3 | Batch CSV Ingestion & Queuing | Parse `candidates1.csv` (32 candidates), normalize URLs, queue as `PENDING_FORENSIC_ANALYSIS` | M1 | survey |
| 4 | Batch Forensic Evaluation & Auto-Shortlist | Evaluate candidate cohorts for clones, injection, and organic velocity; rank top talent with cutoffs | M3 | survey |
| 5 | Enterprise AI Prompting Policy & Tolerance Gate | Enforce 3 enterprise templates (`strict-core-logic`, `balanced-copilot`, `ai-native-builder`) via burstiness/N-gram AI detector | M3 | survey |
| 6 | Anomaly Screening Gate (30% Max Anomaly) | Restrict viva defense access when anomaly score > 30% or clone/injection is flagged | M2 | survey |
| 7 | Live URL Detection & Health Check | Extract and verify live portfolio/project URLs with automated health checking | M1 | survey |
| 8 | Viva Defense Voice & Rubric Scoring | Interactive timed oral/text defense with Web Speech API and 0-10 calibrated rubric scoring | M3 | survey |
| 9 | Plagiarism & Indirect Prompt Injection Quarantining | Quarantine prompt injections in comments/READMEs and tutorial clones via Winnowing fingerprints | M1 | survey |
| 10 | Luxury Decision Email & n8n Webhook Dispatch | Format responsive HTML/text decision notifications and dispatch asynchronously to n8n | M3 | survey |
| 11 | Full Test Suite Pass & CI/Build Hardening | 100% backend tests passing (118+ tests), clean Vite production build, and Vercel deployment check | M4 | survey |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Backend Fixes & Core Engine Stability | Fix batch ingestion status bug (`batch_operations.py`), fix resume regex scheme-less URL extraction and newline college cleanup (`resume_parser.py`), strip UTF-8 BOM (`api/index.py`), sync `requirements.txt` dependencies, add live URL validation & SSRF/CGNAT defense | none | DONE |
| M2 | Frontend Integration & Non-Tech Track Fixes | Fix `CandidateIngestion.tsx` synthesized non-tech viva questions (add `expected_concepts` & `question_id`), prevent API 422 & undefined concept iteration crash, ensure clean Vite build | M1 | DONE |
| M3 | End-to-End Real Ingestion & Verification | Ingest & verify Priyanshu Awasthi resume, generate & test non-tech MBA candidate resume, ingest & evaluate `candidates1.csv` batch cohort, verify AI tolerance gate & 30% anomaly gate, test live URL & viva defense, test email dispatch | M2 | IN_PROGRESS |
| M4 | Final Milestone: 100% E2E Test Suite Pass & Production Build | Pass 100% of Tiers 1-4 E2E tests published in TEST_READY.md, complete Tier 5 adversarial coverage hardening, verify full backend pytest suite (all 118+ tests) and frontend production build | M3 | PLANNED |

## Interface Contracts
### `POST /api/resume/parse`
- Input: `multipart/form-data` with `file: UploadFile` (PDF/DOCX)
- Output: `ResumeParseResult` schema:
  - `name`: str
  - `email`: str
  - `college`: str
  - `github_url`: Optional[str] (must accept `github.com/...` with or without `https://`)
  - `linkedin_url`: Optional[str]
  - `live_url`: Optional[str]
  - `skills`: List[str]
  - `projects`: List[dict]
  - `experience`: List[dict]
  - `role_type`: str (`Software Engineer` | `Business/MBA` | `Product Manager` | `Designer` | `Data Scientist`)
  - `parse_confidence`: float

### `POST /api/batch/ingest-csv`
- Input: `{"csv_text": str}`
- Output: `{"total_candidates": int, "cohort": List[Dict]}`
- Contract: Every candidate without explicit adversarial injection payloads enters with `analysis_status = "PENDING_FORENSIC_ANALYSIS"`. Do NOT mark status `COMPLETED` based on repository URL substrings (`clone`, `netflix`, `traversy`).

### `CandidateIngestion.tsx` <-> `VivaArena.tsx` / `POST /api/viva/evaluate-single`
- Synthesized non-tech viva questions MUST provide:
  - `question_id`: str (e.g. `'viva_biz_1'`)
  - `question`: str
  - `expected_concepts`: List[str] (e.g. `['roi', 'metrics', 'attribution', 'conversion']`)
  - `difficulty`: str
- `evaluateVivaAnswer` must not throw on undefined concept lists.

### `POST /api/ai-tolerance/check`
- Input: `{"answer_text": str, "tolerance_percent": float, "template_id": str}`
- Output: `{"ai_probability_percent": float, "exceeded": bool, "excess_percent": float, "verdict": str ("PASS" | "WARN" | "FAIL"), "badge": str}`

## Code Layout
- `backend/`: FastAPI backend service
  - `backend/routers/`: Endpoint routers (`resume_parser.py`, `batch_operations.py`, `ai_tolerance.py`, `viva.py`, `deployment.py`, `webhooks.py`, etc.)
  - `backend/services/`: Core forensic & scoring engines (`ast_analyzer.py`, `tutorial_matcher.py`, `commit_forensics.py`, `viva_engine.py`, `ai_detector.py`, `injection_scanner.py`, `n8n_service.py`, `email_formatter.py`)
  - `backend/tests/`: Primary backend pytest suite (105 tests)
- `tests/`: Root test suite (13 tests)
- `web/`: Frontend React + Vite application
  - `web/src/components/`: UI components (`CandidateIngestion.tsx`, `VivaArena.tsx`, `ProofCard3D.tsx`, `ForensicTerminal.tsx`, `N8nAutomationModal.tsx`)
  - `web/src/services/api.ts`: API client and offline fallback evaluators
  - `web/src/utils/urlHelper.ts`: Deep-link QR and public verify URL generator
- `api/index.py`: Vercel serverless entry point
- `vercel.json`: Vercel configuration
