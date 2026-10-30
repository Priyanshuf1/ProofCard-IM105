# E2E Test Infra: ProofCard-IM105

## Test Philosophy
- Opaque-box, requirement-driven. Derived from `ORIGINAL_REQUEST.md` and user-facing API contracts.
- Independent of internal module implementation.
- Methodology: Category-Partition + Boundary Value Analysis (BVA) + Pairwise Combinatorial Testing + Real-World Workload Testing.
- Progressive testability: Tiers 1-4 execute cleanly and provide deterministic pass/fail signals.

## Feature Inventory & Test Coverage Matrix
| # | Feature | Source (Requirement) | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
|---|---------|----------------------|:------:|:------:|:------:|:------:|
| 1 | Multi-Format Resume Parsing (PDF/DOCX/DOC/TXT) | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ | ✓ |
| 2 | Structured Candidate Profile Extraction | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ | ✓ |
| 3 | Sandbox API Enterprise Authentication | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ | ✓ |
| 4 | Bulk Candidate Ingestion (JSON batch) | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ | ✓ |
| 5 | Multi-File Resume Batch Upload | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ | ✓ |
| 6 | Strict Gemini API Key Validation | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 7 | Gemini AI Stream Segregation (Tech vs Non-Tech) | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 8 | Simultaneous Job Requirement Input | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 9 | AI Job Requirement Comparison & Gap Breakdown | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 10 | Public Repository & Live Deployment URL Extraction | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ | ✓ |
| 11 | Forensic Repository Cloner & Local Fallback | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ | ✓ |
| 12 | Live Website HTTP/DOM/Viewport/a11y Inspector | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ | ✓ |
| 13 | 100-Mark Grading Engine (All 8 Categories) | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ | ✓ |
| 14 | Existing Viva & AST Interface Compatibility | ORIGINAL_REQUEST §R5 | 5 | 5 | ✓ | ✓ |

## Test Architecture
- **Test Runner**: Pytest invoking FastAPI `TestClient(app)` or `httpx.AsyncClient(app=app, base_url="http://test")`.
- **Location**: `tests/e2e/`
- **Pass/Fail Semantics**: Standard exit code 0, all assertions pass.
- **Directories**:
  - `tests/e2e/conftest.py`: Fixtures, mock clients, test payload generators.
  - `tests/e2e/test_tier1_features.py`: Happy-path feature verification in isolation (≥ 5 per feature).
  - `tests/e2e/test_tier2_boundaries.py`: Boundary values, extremes, empty inputs, huge files, missing keys (≥ 5 per feature).
  - `tests/e2e/test_tier3_cross_feature.py`: Pairwise feature interactions (ingestion -> segregation -> grading; job creation -> candidate comparison).
  - `tests/e2e/test_tier4_scenarios.py`: Full end-to-end recruitment pipelines (e.g. 50 candidate cohort ingestion, JD alignment, viva defense, repo forensics, final 100-mark report).

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | Campus Hiring Drive | Bulk upload of 30 fresher resumes, automatic segregation, batch comparison against Python Backend JD, 100-mark report generation | High |
| 2 | Lateral Senior Hire with Active Repos & Live Apps | Single resume with GitHub repo & live Vercel app, forensic repo clone inspection, live website DOM audit, Viva evaluation | High |
| 3 | Non-Technical Product & Marketing Cohort Ingestion | Bulk ingestion of non-technical candidates, Gemini segregation to Non-Technical branch, matching against PM job description | Medium |
| 4 | Security & Fraud Screening (Plagiarized Portfolio) | Resume citing cloned YouTube tutorial repo, forensic AST winnowing detection, viva score integration, zero-tolerance penalty | High |
| 5 | Enterprise Sandbox Partner Sync | Company connecting via Sandbox API key, streaming batches, verifying error isolation on corrupted files, querying batch status | Medium |

## Coverage Thresholds
- Tier 1: ≥ 70 test cases (5 × 14 features)
- Tier 2: ≥ 70 test cases (5 × 14 features)
- Tier 3: ≥ 14 cross-feature interaction test cases
- Tier 4: ≥ 5 realistic application scenario workflows
- Total Target: ≥ 160 test cases
