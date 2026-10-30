# ProofCard (IM-105) — Dual Track E2E Test Suite Infrastructure (`TEST_INFRA.md`)

## 1. Overview & Test Architecture

This document establishes the authoritative test infrastructure, test case catalog, and execution protocol for **ProofCard (Deviathon 2.0 / IM-105 Integraminds)**.

ProofCard employs an **Opaque-Box E2E Testing** strategy covering both technical engineering tracks (AST cyclomatic complexity, Git-DNA burst metrics, Winnowing tutorial clone detection, prompt injection quarantining) and non-technical business tracks (MBA/BBA classification, market diagnostic viva defense, case scoring, and deployment readiness contracts).

### Test Engine Specification
- **Framework**: `pytest 9.1.1` + `Starlette/FastAPI TestClient`
- **Python Runtime**: `Python 3.13.6` (Windows x64)
- **Primary Test Suite**: `backend/tests/test_e2e_suite.py`
- **Execution Target**: FastAPI Application (`backend.main:app`)
- **Isolation Principle**: All tests are fully self-contained, deterministic, offline-capable, and independent of external API connectivity or execution order.

---

## 2. Feature Inventory Matrix (11 Features)

| Feature ID | Feature Name | Description | Key Endpoint / Module | Authoritative Contract |
|------------|--------------|-------------|------------------------|-------------------------|
| **F1** | Priyanshu Resume Parsing | Parse PDF/DOCX resumes with contact, college, skills, projects, and role extraction | `POST /api/resume/parse` | `ResumeParseResult` schema, `parse_confidence` ≥ 0.65 |
| **F2** | Non-Tech MBA/BBA Track | Classification, business viva synthesis (`viva_biz_1..3`), expected concepts, and scorecard generation | `POST /api/resume/parse`, `POST /api/viva/evaluate-single` | `role_type = "Business/MBA"`, concepts list |
| **F3** | Batch CSV Ingestion & Queuing | Parse multi-candidate CSV (header or positional), normalize URLs, queue candidates | `POST /api/batch/ingest-csv` | `status = "PENDING_FORENSIC_ANALYSIS"` |
| **F4** | Batch Forensic Evaluation & Auto-Shortlist | Evaluate cohorts for clones, velocity, and injection; rank candidates with cutoffs | `POST /api/batch/evaluate-cohort`, `POST /api/batch/auto-shortlist` | Composite merit ranking, cutoff filters |
| **F5** | Enterprise AI Prompting Policy & Tolerance Gate | Enforce 3 enterprise templates (`strict-core-logic`, `balanced-copilot`, `ai-native-builder`) | `GET /api/ai-tolerance/templates`, `POST /api/ai-tolerance/check` | `PASS` / `WARN` / `FAIL`, excess percentage |
| **F6** | Anomaly Screening Gate (30% Max Anomaly) | Restrict viva defense access when anomaly > 30% or clone/injection is flagged | `backend/routers/batch_operations.py`, `backend/routers/github_analysis.py` | `viva_blocked = True`, `viva_status` blocked |
| **F7** | Live URL Detection & Health Check | Extract and verify live portfolio/project URLs with automated health checking | `GET /health`, `GET /api/health`, `GET /api`, `POST /api/deployment/contract` | Uptime 100%, valid URL scheme normalization |
| **F8** | Viva Defense Voice & Rubric Scoring | Interactive timed defense with 0-10 calibrated rubric scoring | `POST /api/viva/evaluate-single`, `POST /api/viva/submit-session` | Score range 0-10, concepts demonstrated/missing |
| **F9** | Plagiarism & Indirect Prompt Injection Quarantining | Quarantine prompt injections in comments/READMEs and tutorial clones via Winnowing fingerprints | `backend/services/injection_scanner.py`, `backend/services/tutorial_matcher.py` | `CRITICAL` severity flags, `FLAGGED_ADVERSARIAL_INJECTION` |
| **F10** | Luxury Decision Email & n8n Webhook Dispatch | Format responsive HTML/text decision notifications and dispatch asynchronously to n8n | `POST /api/webhooks/send-decision-email`, `POST /api/webhooks/send-viva-invitation` | `delivered = True/False`, rich HTML template |
| **F11** | Full Test Suite Pass & CI/Build Hardening | Cryptographic verification, Ed25519 signing, error status codes, and test suite stability | `GET /api/proofcard/public-key`, `POST /api/proofcard/verify-signature` | Asymmetric signature verification, clean status |

---

## 3. Four-Tier Test Case Design Matrix

### Tier 1: Feature Coverage (55 Tests — ≥5 per feature)
- **F1 (5 tests)**: Standard tech PDF parsing, projects/experience extraction, GitHub/LinkedIn URL extraction, confidence score verification, raw text preview snippet.
- **F2 (5 tests)**: MBA/BBA classification, business skill detection, business viva question schema, business viva evaluation, non-tech proofcard generation.
- **F3 (5 tests)**: CSV ingestion with standard headers, positional CSV ingestion, JSON applicants ingestion, college tier classification, GitHub URL normalization.
- **F4 (5 tests)**: Cohort forensic evaluation, auto-shortlist ranking, authenticity cutoff filter, viva cutoff filter, target count limits.
- **F5 (5 tests)**: Template catalog retrieval, human pass on strict template, AI violation failure, warning near limit, template policy metadata inspection.
- **F6 (5 tests)**: Clone viva blocking, adversarial injection blocking, authentic candidate viva clearance, zip upload anomaly screening, human-readable block reasons.
- **F7 (5 tests)**: Root `/health` check, `/api/health` check, `/api` root metadata, live portfolio URL extraction, deployment readiness contract creation.
- **F8 (5 tests)**: Single answer rubric evaluation, 0-10 score range bounds, session batch scoring, exemplary feedback threshold (≥8), weak feedback threshold (<4).
- **F9 (5 tests)**: Directive override detection, score manipulation detection, roleplay jailbreak detection, clean code pass, tutorial clone signature matching.
- **F10 (5 tests)**: n8n config get/update, shortlisted decision email generation, rejection decision email generation, viva invitation dispatch, test ping dispatch.
- **F11 (5 tests)**: Ed25519 public key endpoint, cryptographic signature verification, demo profiles schema, dynamic candidate signing, HTTP error response formatting.

### Tier 2: Boundary & Corner Cases (55 Tests — ≥5 per feature)
- **F1 (5 tests)**: Corrupted PDF bytes (422), empty/zero-page PDF (422), unsupported file extension (400), oversized file >10MB (400), scheme-less URL extraction.
- **F2 (5 tests)**: Empty skills list fallback, empty `expected_concepts` evaluation safety, hybrid tech-MBA classification, case-insensitive business skills, single-word defense answers.
- **F3 (5 tests)**: Empty CSV text string (400), whitespace-only CSV (400), UTF-8 BOM (`\ufeff`) stripping, invalid non-GitHub domain (422), missing required columns (422).
- **F4 (5 tests)**: Empty cohort evaluation list, target count = 0 handling, impossible cutoffs (min_auth 100 / min_viva 10), None viva score safety, custom required skills match.
- **F5 (5 tests)**: Tolerance 0.0% fallback, tolerance 100.0% ceiling, unknown template ID fallback, empty text insufficient rating, unicode/emoji input safety.
- **F6 (5 tests)**: Exact 30% boundary threshold test, 0% authenticity score handling, dual clone + injection priority, unusual branch names, status code consistency.
- **F7 (5 tests)**: Scheme-less live portfolio URL extraction, path traversal attempt rejection (`../../`), git@ URL normalization, sub-50ms health check latency, URL query param stripping.
- **F8 (5 tests)**: 10,000+ character viva answer, empty session answers list, special characters & script tags in answer, offline deterministic fallback without API key, zero functions list.
- **F9 (5 tests)**: Commit message prompt injection detection, mixed-case obfuscated injection, HTML comment injection, token delimiter start/end detection, safe programming keywords non-flagging.
- **F10 (5 tests)**: Missing candidate email fallback, empty candidate strengths fallback, offline n8n webhook error resilience, custom invitation note escaping, standard rejection reason code formatting.
- **F11 (5 tests)**: Tampered signature rejection, missing payload validation (400), nonexistent candidate ID dynamic generation, HTTP 405 Method Not Allowed, HTTP 404 Route Not Found.

### Tier 3: Cross-Feature Interactions (5 Multi-Step Integration Flows)
1. **Flow 1 (Resume -> Viva -> ProofCard)**: Parse candidate resume, extract skills, submit viva defense answer, verify digitally signed ProofCard.
2. **Flow 2 (Batch CSV -> Forensics -> Shortlist -> Decision Email)**: Ingest multi-candidate batch CSV, run forensic cohort evaluation, auto-shortlist top authentic builders, generate luxury decision email.
3. **Flow 3 (Prompt Injection -> Quarantine -> Blocked Viva -> Disqualification Email)**: Detect adversarial prompt injection in candidate repo, quarantine injection, block viva defense, dispatch disqualification notification.
4. **Flow 4 (Enterprise AI Tolerance Gate -> Viva Defense Calibration)**: Check defense answer against enterprise AI tolerance template, penalize excessive AI generation, calibrate viva score.
5. **Flow 5 (End-to-End Non-Tech MBA Track)**: Parse MBA candidate resume, generate business viva questions, score defense on business KPIs, build deployment readiness contract.

### Tier 4: Real-World Scenarios (4 Authoritative Dataset Scenarios)
1. **Scenario 1 (Priyanshu Awasthi Real Resume PDF)**: Ingest and parse real `C:\Users\apriy\Downloads\Priyanshu Awasthi — Resume.pdf`, verifying name, email, GLA University, and skills.
2. **Scenario 2 (MBA Business Candidate Resume PDF)**: Generate and parse authentic MBA/BBA candidate resume PDF, verifying `Business/MBA` classification and financial/strategic competencies.
3. **Scenario 3 (candidates1.csv 32-Candidate Batch Ingestion & Segregation)**: Ingest all 32 candidate rows from `C:\Users\apriy\Downloads\candidates1.csv`, evaluate cohort forensics, and segregate authentic talent from tutorial clones and prompt injections.
4. **Scenario 4 (End-to-End Batch Cohort Shortlist & Luxury Email Dispatch)**: Auto-shortlist top performers from the 32-candidate batch with strict clone exclusion, verifying luxury HTML email formatting.

---

## 4. Test Execution Instructions

### Running the Complete E2E Suite
```bash
# Navigate to project root
cd C:\Users\apriy\omnirush.ai\proofcard

# Execute the comprehensive E2E test suite
python -m pytest backend/tests/test_e2e_suite.py -v
```

### Running Specific Tiers
```bash
# Run Tier 1 only
python -m pytest backend/tests/test_e2e_suite.py -k "tier1" -v

# Run Tier 2 only
python -m pytest backend/tests/test_e2e_suite.py -k "tier2" -v

# Run Tier 3 only
python -m pytest backend/tests/test_e2e_suite.py -k "tier3" -v

# Run Tier 4 only
python -m pytest backend/tests/test_e2e_suite.py -k "tier4" -v
```

### Running All Project Tests
```bash
python -m pytest backend/tests tests -v
```

---

## 5. Authoritative Expected Output Sources

1. **Resume Parsing**: `backend/routers/resume_parser.py` & `PROJECT.md` interface contract for `ResumeParseResult`.
2. **AI Tolerance**: `backend/routers/ai_tolerance.py` threshold rules (Strict: 20%, Balanced: 35%, AI-Native: 50%).
3. **Batch Ingestion**: `PROJECT.md` Contract: Candidates enter as `PENDING_FORENSIC_ANALYSIS`.
4. **Anomaly Screening**: `backend/routers/github_analysis.py` & `zip_upload.py` rule: `viva_blocked = bool(clone_pct > 30 or anomaly_pct > 30 or is_prompt_injected)`.
5. **Real-World Files**: `C:\Users\apriy\Downloads\Priyanshu Awasthi — Resume.pdf` and `C:\Users\apriy\Downloads\candidates1.csv`.
