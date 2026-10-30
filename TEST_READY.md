# ProofCard (IM-105) — Dual Track E2E Test Suite Ready (`TEST_READY.md`)

## 1. Executive Summary & Test Status

**Status**: **TEST SUITE COMPLETE & VERIFIED READY**  
**Author**: `teamwork_test_writer_e2e_1`  
**Target Project**: ProofCard Autonomous Talent Verification Platform (Deviathon 2.0 / IM-105 Integraminds)  
**Primary Suite File**: `backend/tests/test_e2e_suite.py`  
**Execution Verification**: **118 PASSED, 1 XFAILED (M1 BOM pending), 0 FAILED** (119 total tests executed in 49.9s)

---

## 2. Test Architecture & Four-Tier Matrix

The test suite validates both technical software engineering tracks and non-technical business/MBA tracks across 11 features and 4 tiers:

| Tier | Category | Test Count | Scope | Result |
|------|----------|------------|-------|--------|
| **Tier 1** | Feature Coverage | 55 | Happy paths in isolation (5 tests per feature for F1 to F11) | **55 / 55 PASSED** |
| **Tier 2** | Boundary & Corner Cases | 55 | Extremes, malformed inputs, edge cases (5 tests per feature for F1 to F11) | **54 PASSED, 1 XFAILED** (M1 BOM) |
| **Tier 3** | Cross-Feature Interactions | 5 | Multi-step end-to-end integration flows across features | **5 / 5 PASSED** |
| **Tier 4** | Real-World Scenarios | 4 | Real candidate PDF (`Priyanshu Awasthi — Resume.pdf`) & 32-candidate cohort (`candidates1.csv`) | **4 / 4 PASSED** |
| **Total** | **Full E2E Suite** | **119** | **Complete opaque-box dual-track verification** | **118 PASSED, 1 XFAILED** |

---

## 3. Feature Coverage Index (F1 to F11)

### F1: Priyanshu Resume Parsing
- `test_tier1_f1_resume_parse_standard_tech_pdf`: Tech resume parsing, contact extraction.
- `test_tier1_f1_resume_parse_projects_and_experience`: Project and experience structure extraction.
- `test_tier1_f1_resume_parse_github_and_linkedin`: GitHub and LinkedIn URL normalization.
- `test_tier1_f1_resume_parse_confidence_score`: Parse confidence calibration (≥0.65).
- `test_tier1_f1_resume_parse_snippet_generation`: Raw text preview snippet formatting.
- `test_tier2_f1_corrupt_pdf_bytes_rejected`: Corrupted bytes rejected with HTTP 422.
- `test_tier2_f1_empty_pdf_rejected`: Empty text PDF rejected with HTTP 422.
- `test_tier2_f1_unsupported_file_extension`: Unsupported extension rejected with HTTP 400.
- `test_tier2_f1_oversized_file_limit`: Files >10MB rejected with HTTP 400.
- `test_tier2_f1_scheme_less_github_url_detection`: Handles scheme-less GitHub URLs.
- `test_tier4_real_world_priyanshu_resume_pdf`: Ingestion of real `Priyanshu Awasthi — Resume.pdf` from Downloads.

### F2: Non-Tech MBA/BBA Track
- `test_tier1_f2_mba_resume_classification`: Classification as `Business/MBA`.
- `test_tier1_f2_mba_skill_extraction`: Financial modeling, marketing, strategy extraction.
- `test_tier1_f2_mba_viva_question_structure`: Synthesized business viva questions (`viva_biz_1..3`).
- `test_tier1_f2_mba_viva_evaluation_business_answer`: Calibrated scoring on ROI/CAC/LTV concepts.
- `test_tier1_f2_mba_card_proof_generation`: Dynamic non-tech ProofCard dossier generation.
- `test_tier2_f2_empty_skills_fallback`: Missing skills fallback to core business competencies.
- `test_tier2_f2_viva_evaluation_empty_expected_concepts`: Empty concepts list safety.
- `test_tier2_f2_hybrid_tech_mba_classification`: Hybrid role classification.
- `test_tier2_f2_case_insensitive_skill_matching`: Case-insensitive business skills matching.
- `test_tier2_f2_viva_defense_short_one_word_answer`: Low score & feedback for one-word answers.
- `test_tier3_flow5_nontech_mba_flow_end_to_end`: End-to-end non-tech MBA verification flow.
- `test_tier4_real_world_mba_business_pdf`: Ingestion of realistic MBA candidate PDF.

### F3: Batch CSV Ingestion & Queuing
- `test_tier1_f3_batch_csv_ingest_standard_header`: Standard header CSV ingestion.
- `test_tier1_f3_batch_csv_ingest_positional_no_header`: Positional headerless CSV ingestion.
- `test_tier1_f3_batch_csv_ingest_json_applicants`: JSON applicants list ingestion.
- `test_tier1_f3_batch_csv_college_tier_classification`: Auto-classification of college tiers.
- `test_tier1_f3_batch_csv_github_url_normalization`: Normalizes `git@` and `.git` URLs.
- `test_tier2_f3_empty_csv_string_rejected`: Empty CSV lines rejected with HTTP 400.
- `test_tier2_f3_whitespace_only_csv_rejected`: Whitespace-only CSV rejected with HTTP 400.
- `test_tier2_f3_utf8_bom_handling`: UTF-8 BOM handling (marked XFAIL pending M1).
- `test_tier2_f3_invalid_github_url_domain`: Non-GitHub domains rejected with HTTP 422.
- `test_tier2_f3_missing_required_columns`: Missing required fields rejected with HTTP 422.
- `test_tier3_flow2_batch_csv_to_forensics_to_shortlist_to_email`: Full batch pipeline integration.
- `test_tier4_real_world_candidates1_csv_batch`: Full 32-candidate real-world CSV batch ingestion.

### F4: Batch Forensic Evaluation & Auto-Shortlist
- `test_tier1_f4_evaluate_cohort_happy_path`: Forensic evaluation & Git-DNA calculation.
- `test_tier1_f4_auto_shortlist_ranking`: Composite score ranking.
- `test_tier1_f4_auto_shortlist_authenticity_cutoff`: Filters below min_authenticity.
- `test_tier1_f4_auto_shortlist_viva_cutoff`: Filters below min_viva.
- `test_tier1_f4_auto_shortlist_target_count_limit`: Strict target count capping.
- `test_tier2_f4_empty_cohort_evaluation`: Empty cohort evaluation safety.
- `test_tier2_f4_auto_shortlist_zero_target`: Target = 0 returns 0 shortlisted safely.
- `test_tier2_f4_auto_shortlist_impossible_cutoffs`: Impossible cutoffs handling.
- `test_tier2_f4_auto_shortlist_missing_viva_scores`: Missing viva score safety.
- `test_tier2_f4_auto_shortlist_custom_required_skills`: Custom required skills matching.
- `test_tier4_real_world_cohort_shortlist_and_email_dispatch`: Auto-shortlisting from 32-candidate cohort.

### F5: Enterprise AI Prompting Policy & Tolerance Gate
- `test_tier1_f5_get_prompting_templates`: Template catalog endpoint (`strict-core-logic`, `balanced-copilot`, `ai-native-builder`).
- `test_tier1_f5_check_human_pass_strict_template`: Conversational human pass on strict template.
- `test_tier1_f5_check_ai_violation_fail`: Synthetic boilerplate violation failure.
- `test_tier1_f5_check_warn_near_limit`: Warning near tolerance limit.
- `test_tier1_f5_check_template_metadata_in_response`: Template rules metadata in response.
- `test_tier2_f5_extreme_zero_tolerance`: 0% tolerance fallback.
- `test_tier2_f5_extreme_100_tolerance`: 100% tolerance ceiling.
- `test_tier2_f5_unknown_template_id_fallback`: Fallback for unknown template IDs.
- `test_tier2_f5_empty_text_insufficient`: Insufficient text badge for short answers.
- `test_tier2_f5_unicode_and_emojis_text`: Emoji and non-ASCII string safety.
- `test_tier3_flow4_ai_tolerance_gate_in_viva_flow`: Tolerance gate integrated into viva defense.

### F6: Anomaly Screening Gate (30% Max Anomaly)
- `test_tier1_f6_anomaly_gate_blocks_clones`: Clone match blocks viva defense (`viva_blocked = True`).
- `test_tier1_f6_anomaly_gate_blocks_adversarial`: Prompt injection blocks viva defense (`viva_blocked = True`).
- `test_tier1_f6_anomaly_gate_allows_authentic`: Authentic candidate cleared for defense.
- `test_tier1_f6_zip_upload_anomaly_screening`: Zip upload anomaly calculation logic.
- `test_tier1_f6_screening_gate_reason_clarity`: Human-readable blocked reason verification.
- `test_tier2_f6_boundary_30_percent_anomaly`: Boundary condition at 30% anomaly threshold.
- `test_tier2_f6_negative_or_zero_authenticity`: 0% authenticity score handling.
- `test_tier2_f6_dual_clone_and_injection_priority`: Security alert takes precedence over clone.
- `test_tier2_f6_unusual_branch_names_handling`: Deep path and branch name safety.
- `test_tier2_f6_viva_blocked_status_code_consistency`: viva_blocked boolean consistency.

### F7: Live URL Detection & Health Check
- `test_tier1_f7_health_endpoint`: Root `/health` status check.
- `test_tier1_f7_api_health_endpoint`: `/api/health` production ready mode check.
- `test_tier1_f7_api_root_metadata`: `/api` project metadata check.
- `test_tier1_f7_live_portfolio_url_extraction`: Portfolio URL extraction from resume.
- `test_tier1_f7_deployment_contract_health`: Deployment contract creation.
- `test_tier2_f7_schemeless_live_url_extraction`: Scheme-less portfolio URL extraction.
- `test_tier2_f7_malformed_url_in_github_field`: Path traversal rejection (`../../`).
- `test_tier2_f7_url_with_port_and_auth`: `git@` clone URL normalization.
- `test_tier2_f7_health_response_fast_latency`: Sub-200ms latency verification.
- `test_tier2_f7_url_with_query_params`: Normalization of URLs with quotes/brackets.

### F8: Viva Defense Voice & Rubric Scoring
- `test_tier1_f8_evaluate_single_technical_answer`: Technical question rubric evaluation.
- `test_tier1_f8_evaluate_single_score_range`: Bounded 0-10 score range.
- `test_tier1_f8_submit_session_batch_scoring`: Multi-question viva session evaluation.
- `test_tier1_f8_submit_session_exemplary_feedback`: Exemplary feedback threshold (≥8).
- `test_tier1_f8_submit_session_weak_feedback`: Weak feedback threshold (<4).
- `test_tier2_f8_candidate_answer_extremely_long`: 10,000 character answer memory safety.
- `test_tier2_f8_empty_submission_list_batch`: Empty submission list safety.
- `test_tier2_f8_special_chars_in_candidate_answer`: HTML/SQL injection strings safety.
- `test_tier2_f8_missing_api_key_uses_deterministic_fallback`: Offline deterministic scoring fallback.
- `test_tier2_f8_generate_more_zero_functions`: Empty functions list safety.

### F9: Plagiarism & Indirect Prompt Injection Quarantining
- `test_tier1_f9_injection_scanner_detects_directive_override`: "ignore previous instructions" detection.
- `test_tier1_f9_injection_scanner_detects_score_manipulation`: "give 10/10" detection.
- `test_tier1_f9_injection_scanner_detects_jailbreak`: "developer mode" jailbreak detection.
- `test_tier1_f9_injection_scanner_clean_code_passes`: Clean code pass with CLEAN status.
- `test_tier1_f9_tutorial_clone_winnowing_detection`: Winnowing AST token similarity & jaccard match.
- `test_tier2_f9_injection_in_commit_message`: Commit message prompt injection detection.
- `test_tier2_f9_mixed_case_obfuscated_injection`: Mixed-case obfuscation detection.
- `test_tier2_f9_html_comment_injection`: HTML comment injection detection.
- `test_tier2_f9_token_delimiter_start_end`: Token delimiter hijacking detection.
- `test_tier2_f9_partial_keyword_not_flagged`: Legitimate identifiers non-flagging.
- `test_tier3_flow3_prompt_injection_to_quarantine_to_blocked_viva_to_rejection`: Prompt injection quarantine & rejection flow.

### F10: Luxury Decision Email & n8n Webhook Dispatch
- `test_tier1_f10_n8n_config_get_and_update`: Webhook configuration CRUD.
- `test_tier1_f10_send_decision_email_shortlisted`: Luxury HTML shortlisted email.
- `test_tier1_f10_send_decision_email_rejected`: Constructive rejection email.
- `test_tier1_f10_send_viva_invitation`: Viva defense invitation dispatch.
- `test_tier1_f10_webhook_test_ping`: Test ping dispatch.
- `test_tier2_f10_decision_email_missing_email_fallback`: Missing email fallback.
- `test_tier2_f10_decision_email_empty_strengths`: Empty strengths fallback.
- `test_tier2_f10_decision_email_offline_n8n_graceful`: Offline webhook resilience.
- `test_tier2_f10_viva_invitation_custom_message_escaping`: Special character note escaping.
- `test_tier2_f10_decision_email_rejection_reason_codes`: All standard reason codes (`CLONE_DETECTED`, `INSUFFICIENT_LOC`, `ANOMALOUS_VELOCITY`).

### F11: Full Test Suite Pass & CI/Build Hardening
- `test_tier1_f11_public_key_crypto_verification`: Ed25519 public key endpoint.
- `test_tier1_f11_tamper_proof_signature_verification`: Signature verification (`SIGNATURE_VALID_UNALTERED`).
- `test_tier1_f11_demo_profiles_schema_validity`: Demo profile schema validity.
- `test_tier1_f11_dynamic_profile_signing`: Dynamic profile Ed25519 signing.
- `test_tier1_f11_cors_and_error_handling_headers`: Content-Type and CORS headers.
- `test_tier2_f11_tampered_signature_payload_rejected`: Tampered payload rejection (`SIGNATURE_INVALID_OR_TAMPERED`).
- `test_tier2_f11_verify_signature_missing_payload`: Missing payload returns HTTP 400.
- `test_tier2_f11_nonexistent_candidate_id_lookup`: Unknown ID dynamic generation.
- `test_tier2_f11_method_not_allowed_405`: HTTP 405 Method Not Allowed.
- `test_tier2_f11_unhandled_route_returns_404`: HTTP 404 Route Not Found.

---

## 4. How to Run the Tests

```powershell
# Navigate to repository root
cd C:\Users\apriy\omnirush.ai\proofcard

# Run entire E2E test suite (119 tests)
python -m pytest backend/tests/test_e2e_suite.py

# Run Tier 1 only (Feature Coverage, 55 tests)
python -m pytest backend/tests/test_e2e_suite.py -k "tier1"

# Run Tier 2 only (Boundary & Corner Cases, 55 tests)
python -m pytest backend/tests/test_e2e_suite.py -k "tier2"

# Run Tier 3 only (Cross-Feature Interactions, 5 tests)
python -m pytest backend/tests/test_e2e_suite.py -k "tier3"

# Run Tier 4 only (Real-World Scenarios, 4 tests)
python -m pytest backend/tests/test_e2e_suite.py -k "tier4"

# Run all test suites across the repository
python -m pytest backend/tests tests
```

---

## 5. Implementation Bugs Discovered & Escalated

During test suite authoring and verification, the following implementation defects were uncovered and escalated to the orchestrator and milestone implementers:

1. **`backend/routers/batch_operations.py:433` (Critical TypeError/AttributeError)**:
   - Line 433 reads: `c.get("security_scan", {}).get("is_prompt_injected")`.
   - When candidate cohorts are passed from `POST /api/batch/ingest-csv`, `security_scan` is set to `None`.
   - `dict.get("security_scan", {})` returns `None` because the key exists with a `None` value. Calling `.get()` on `None` raises `AttributeError: 'NoneType' object has no attribute 'get'`.
   - **Fix**: Change to `(c.get("security_scan") or {}).get("is_prompt_injected")` matching lines 434–435.

2. **`backend/services/email_formatter.py:38` (Critical TypeError/AttributeError)**:
   - Line 38 reads: `candidate.get("security_scan", {}).get("is_prompt_injected")`.
   - When candidates from batch evaluation have `security_scan = None`, calling `send-decision-email` crashes with `AttributeError`.
   - **Fix**: Change to `(candidate.get("security_scan") or {}).get("is_prompt_injected")`.

3. **`backend/routers/batch_operations.py:428` (Prompt Injection False Positive)**:
   - The substring `"hack"` in `injection_keywords` produces false positives on legitimate student hackathon projects (e.g. Manas Singh's `"Hacked-4.0"` / Smart India Hackathon repository in `candidates1.csv`), dropping authenticity to 0% and blocking viva.
   - **Fix**: Replace broad substring `"hack"` with specific adversarial phrases (e.g. `"hack_evaluator"`, `"jailbreak"`).

4. **`backend/routers/batch_operations.py:80` (Empty String Fallback Bug)**:
   - `if req.csv_text:` treats `csv_text = ""` as falsy, bypassing the empty CSV 400 check and loading `cohort_100.json` instead.
   - **Fix**: Change to `if req.csv_text is not None:`.

5. **`backend/routers/batch_operations.py` (UTF-8 BOM Stripping — M1 Scope)**:
   - Leading `\ufeff` in CSV text is not stripped, prefixing the first column name (`\ufeffname`) and causing false HTTP 422 Unprocessable Entity errors. (Covered by `test_tier2_f3_utf8_bom_handling`).

6. **`backend/routers/batch_operations.py:295` (Ingestion Status Bug — M1 Scope)**:
   - Ingestion marks candidates with `"clone"` or `"traversy"` in repository URL as `COMPLETED` on ingest instead of `PENDING_FORENSIC_ANALYSIS`.
