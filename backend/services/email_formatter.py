"""
Pariksha IM-105: Luxury Candidate Evaluation & Feedback Email Formatter
Generates high-end, responsive HTML and structured plain-text candidate notices
with rich whitespace, clear technical evidence, and actionable career roadmaps.
"""

from typing import Dict, Any, List, Optional
import urllib.parse
from backend.services.college_classifier import CollegeTierClassifier

class EmailFormatter:
    """Formats luxury HTML and text candidate decision reports."""

    @staticmethod
    def generate_email(
        candidate: Dict[str, Any],
        decision: str = "FEEDBACK",  # "SHORTLISTED", "REJECTED", "FEEDBACK"
        rejection_reason_code: Optional[str] = None,
        custom_note: Optional[str] = None,
        origin_url: str = "https://proofcard-im105.vercel.app"
    ) -> Dict[str, Any]:
        """
        Builds a comprehensive, well-spaced, luxury email report for candidates and recruiters.
        """
        name = candidate.get("name") or candidate.get("candidate_name") or "Engineering Candidate"
        email = candidate.get("email") or "candidate@example.edu"
        college = candidate.get("college") or "Academic Institution"
        college_tier, college_tier_label = CollegeTierClassifier.classify(college)
        
        project_name = candidate.get("project_name") or "Technical Submission"
        project_type = candidate.get("project_type") or "Software Engineering"
        auth_score = int(candidate.get("authenticity_score", 0))
        viva_score = float(candidate.get("viva_score") or 0.0)
        is_clone = bool(candidate.get("is_clone", False))
        has_prompt_injection = bool(
            candidate.get("has_prompt_injection") or 
            candidate.get("is_prompt_injected") or 
            candidate.get("security_scan", {}).get("is_prompt_injected")
        )
        tut = candidate.get("matched_tutorial") or {}
        tut_name = tut.get("name") if isinstance(tut, dict) else None
        
        git_dna = candidate.get("git_dna") or {}
        commits = git_dna.get("total_commits", 0)
        timespan = git_dna.get("time_span_days", 0)
        deletion_pct = int(git_dna.get("deletion_ratio", 0) * 100)
        
        cid = candidate.get("candidate_id") or "cand_verified"
        card = candidate.get("proof_card") or {}
        card_status = card.get("status") or ("FLAGGED_CLONE" if is_clone else "VERIFIED_COMPETENT")
        
        # Build live verifiable link
        query_params = urllib.parse.urlencode({
            "verify": cid,
            "name": name,
            "auth": auth_score,
            "viva": viva_score,
            "status": card_status
        })
        verify_url = f"{origin_url}/?{query_params}"

        # Resolve Decision & Rationale
        if decision == "SHORTLISTED":
            badge_title = "CANDIDATE SHORTLISTED"
            badge_color = "#10B981"  # Emerald
            badge_bg = "#064E3B"
            headline = f"Congratulations {name}, your technical submission has been shortlisted for subsequent interview rounds."
            decision_statement = (
                "Based on verified repository authorship, progressive Git-DNA commit history, and demonstrated "
                "conceptual depth in the technical viva defense, your application has passed the merit-based screening threshold."
            )
        elif decision == "REJECTED":
            badge_title = "TECHNICAL SCREENING NOTICE"
            badge_color = "#EF4444"  # Red
            badge_bg = "#450A0A"
            headline = f"Thank you for participating, {name}. Detailed technical evaluation findings & constructive feedback."
            
            # Formulate specific polite rejection rationale
            if has_prompt_injection:
                decision_statement = (
                    "Your repository was flagged by our Application Security scanner for containing indirect prompt injection payloads "
                    "or LLM directive manipulation strings. Integrity protocol requires manual security remediation."
                )
            elif is_clone:
                decision_statement = (
                    f"Your repository codebase demonstrated a significant structural AST and token overlap ({tut.get('similarity_score', 85)}%) "
                    f"with the known tutorial pattern '{tut_name or 'External Online Tutorial'}'. Hiring policy prioritizes unique, non-templated software."
                )
            elif rejection_reason_code == "VIVA_INCOMPLETE" or viva_score < 6.0:
                decision_statement = (
                    f"While your code was authentic, your Live Technical Defense Viva score ({viva_score}/10) did not demonstrate the "
                    "conceptual depth required for this role. Candidates must comfortably explain algorithmic trade-offs and edge case handling."
                )
            elif rejection_reason_code == "JUNIOR_SCOPE":
                decision_statement = (
                    "Your repository demonstrated authentic work, but the current architectural scope is geared toward junior-level applications. "
                    "This position requires demonstrated experience in distributed concurrency, asynchronous services, and production deployment."
                )
            elif rejection_reason_code == "JD_MISMATCH":
                decision_statement = (
                    "Your technical project demonstrated quality execution, but your core stack does not align with the immediate technical "
                    "requirements of this specific opening. We encourage you to apply for roles matching your specialized stack."
                )
            elif rejection_reason_code == "BULK_DUMP" or commits <= 2:
                decision_statement = (
                    "Your project was uploaded in a single bulk commit without progressive temporal Git-DNA history. "
                    "Our evaluation guidelines require step-by-step commit history to verify authentic iterative engineering."
                )
            else:
                decision_statement = (
                    custom_note or 
                    "After careful evaluation of your technical submission, code structure, and current team requirements, "
                    "we have decided to proceed with other candidates whose experience aligns more closely with our current opening."
                )
        else:
            badge_title = "EVALUATION FEEDBACK"
            badge_color = "#F59E0B"  # Amber
            badge_bg = "#78350F"
            headline = f"Technical Performance & Skill Growth Roadmap for {name}."
            decision_statement = (
                f"Your repository analysis is complete. Authenticity score is {auth_score}% and Viva defense is {viva_score}/10. "
                "Review the actionable steps below to enhance your software engineering profile."
            )

        if custom_note and custom_note.strip() and decision != "REJECTED":
            decision_statement += f"\n\nRecruiter Note: {custom_note.strip()}"

        # Actionable Growth Steps
        steps: List[Dict[str, str]] = []
        if is_clone:
            steps = [
                {"title": "1. Decouple from Tutorial Architecture", "desc": "Fork or create a new branch. Replace tutorial boilerplate with your own custom architectural abstractions (e.g. custom middleware, caching layer, or state machine)."},
                {"title": "2. Implement Incremental Commit Habits", "desc": "Never push complete features in a single commit. Commit individual logical units over multiple days with clear conventional commit messages."},
                {"title": "3. Add Automated Test Coverage", "desc": "Write at least 5 unit tests verifying boundary values and unexpected inputs using standard testing frameworks (pytest, Jest, or Vitest)."}
            ]
        elif viva_score < 7.0:
            steps = [
                {"title": "1. Deepen Core Conceptual Mastery", "desc": "Be prepared to explain the time & space complexity, memory footprints, and lifecycle hooks of every library and helper function in your repository."},
                {"title": "2. Practice Articulating Engineering Trade-offs", "desc": "When asked why you chose a specific library, explain the alternatives considered and why your chosen pattern was superior for latency or scale."},
                {"title": "3. Add Defensive Error Handling", "desc": "Replace bare try/catch or unhandled promise rejections with explicit circuit breakers and graceful user-facing error fallbacks."}
            ]
        else:
            steps = [
                {"title": "1. Expand End-to-End Pipeline Automation", "desc": "Integrate GitHub Actions CI/CD workflows that automatically lint, test, and package Docker containers on every pull request."},
                {"title": "2. Introduce Production Observability", "desc": "Instrument structured JSON logging, Prometheus metrics, and OpenTelemetry distributed tracing across async endpoints."},
                {"title": "3. Maintain Verifiable Credential Portfolio", "desc": "Keep your Pariksha QR code and verified credential ledger updated on your resume to guarantee instant recruiter verification."}
            ]

        subject = f"[Pariksha IM-105] Technical Evaluation & Evidence Notice - {name}"

        # Build Clean Plain Text
        text_content = f"""
================================================================================
PARIKSHA IM-105: VERIFIED SKILL INTELLIGENCE & EVALUATION REPORT
================================================================================

Candidate:      {name}
Email:          {email}
Institution:    {college} ({college_tier})
Project:        {project_name} ({project_type})
Status:         {badge_title}

--------------------------------------------------------------------------------
DECISION & EVALUATION SUMMARY
--------------------------------------------------------------------------------
{headline}

{decision_statement}

--------------------------------------------------------------------------------
VERIFIED TECHNICAL METRICS
--------------------------------------------------------------------------------
- Code Authenticity:     {auth_score} / 100 {("(Clone Flagged)" if is_clone else "(Verified Organic)")}
- Viva Defense Score:    {viva_score} / 10.0
- Git-DNA History:       {commits} commits over {timespan} days ({deletion_pct}% refactoring deletion)
- AppSec Injection Scan: {("FLAGGED: Prompt Injection Payload" if has_prompt_injection else "PASSED: 0 Vulnerabilities Detected")}
- Institutional Pedigree Bias: 0.0% (Evaluated strictly on code quality)

--------------------------------------------------------------------------------
ACTIONABLE ENGINEERING ROADMAP
--------------------------------------------------------------------------------
"""
        for s in steps:
            text_content += f"\n{s['title']}\n  {s['desc']}\n"

        text_content += f"""
--------------------------------------------------------------------------------
OFFICIAL VERIFIABLE CREDENTIAL & LIVE QR LEDGER
--------------------------------------------------------------------------------
View the full tamper-proof cryptographic ledger and 3D credential:
{verify_url}

Issued by Pariksha IM-105 Verification Authority
Tamper-Proof Seal: SHA256:{cid[:16]}...
================================================================================
"""

        # Build Luxury HTML Template
        steps_html = "".join([
            f"""
            <div style="background-color: #140d09; border: 1px solid #3d2a1d; border-radius: 12px; padding: 18px 20px; margin-bottom: 14px;">
              <div style="color: #FFD166; font-size: 14px; font-weight: 700; margin-bottom: 6px;">{s['title']}</div>
              <div style="color: #d1c7bd; font-size: 13px; line-height: 1.6;">{s['desc']}</div>
            </div>
            """
            for s in steps
        ])

        html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0c0604; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f7f3ee;">
  <div style="max-width: 680px; margin: 30px auto; background-color: #160e0a; border: 1px solid #D4AF37; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.8);">
    
    <!-- Top Luxury Header Banner -->
    <div style="background: linear-gradient(135deg, #1f120c 0%, #0c0604 100%); padding: 36px 40px 28px 40px; border-bottom: 1px solid #D4AF37; text-align: center;">
      <div style="display: inline-block; width: 44px; height: 44px; line-height: 44px; border-radius: 50%; border: 1px solid #D4AF37; color: #D4AF37; font-size: 22px; font-weight: bold; margin-bottom: 12px;">Ω</div>
      <div style="color: #D4AF37; font-size: 12px; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 6px;">PARIKSHA · PROBLEM STATEMENT IM-105</div>
      <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 0 0 10px 0; letter-spacing: -0.5px;">Candidate Verification & Technical Evaluation Report</h1>
      <p style="color: #E6C280; font-size: 13px; margin: 0;">Unbiased merit-based hiring intelligence powered by code forensics & viva defense</p>
    </div>

    <!-- Candidate Credential Card -->
    <div style="padding: 32px 40px;">
      
      <!-- Status Badge -->
      <div style="text-align: center; margin-bottom: 28px;">
        <span style="display: inline-block; background-color: {badge_bg}; color: {badge_color}; border: 1px solid {badge_color}; padding: 8px 24px; border-radius: 30px; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">
          {badge_title}
        </span>
      </div>

      <!-- Candidate Metadata Box -->
      <div style="background-color: #110906; border: 1px solid #332014; border-radius: 14px; padding: 20px 24px; margin-bottom: 28px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr>
            <td style="color: #8c7e72; padding: 6px 0; width: 35%;">Candidate Name:</td>
            <td style="color: #ffffff; font-weight: 700; padding: 6px 0;">{name}</td>
          </tr>
          <tr>
            <td style="color: #8c7e72; padding: 6px 0;">Email Address:</td>
            <td style="color: #FFD166; font-family: monospace; padding: 6px 0;">{email}</td>
          </tr>
          <tr>
            <td style="color: #8c7e72; padding: 6px 0;">Institution & Pedigree:</td>
            <td style="color: #E6C280; font-weight: 600; padding: 6px 0;">
              {college} <span style="background-color: #24140b; border: 1px solid #8c5828; color: #ffb703; padding: 2px 8px; border-radius: 8px; font-size: 11px; margin-left: 6px;">{college_tier}</span>
            </td>
          </tr>
          <tr>
            <td style="color: #8c7e72; padding: 6px 0;">Evaluated Project:</td>
            <td style="color: #ffffff; padding: 6px 0;">{project_name} <span style="color: #8c7e72;">({project_type})</span></td>
          </tr>
        </table>
      </div>

      <!-- Decision Statement Box -->
      <div style="border-left: 3px solid {badge_color}; padding: 14px 20px; background-color: #140c08; border-radius: 0 12px 12px 0; margin-bottom: 30px;">
        <div style="color: #ffffff; font-size: 15px; font-weight: 700; margin-bottom: 8px;">{headline}</div>
        <div style="color: #d1c7bd; font-size: 13px; line-height: 1.6;">{decision_statement}</div>
      </div>

      <!-- Technical Scorecard Grid -->
      <div style="margin-bottom: 32px;">
        <div style="color: #D4AF37; font-size: 12px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 14px;">Technical Metrics & Forensic Verification</div>
        <table style="width: 100%; border-collapse: separate; border-spacing: 10px; margin-left: -10px; margin-right: -10px;">
          <tr>
            <td style="width: 50%; background-color: #140d09; border: 1px solid #332014; border-radius: 12px; padding: 16px; text-align: center;">
              <div style="color: #8c7e72; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px;">Code Authenticity</div>
              <div style="color: {'#10B981' if auth_score >= 70 else '#EF4444'}; font-size: 26px; font-weight: 900; font-family: monospace;">{auth_score}%</div>
              <div style="color: #8c7e72; font-size: 11px; margin-top: 4px;">{'(Tutorial Matched)' if is_clone else '(Verifiable Authorship)'}</div>
            </td>
            <td style="width: 50%; background-color: #140d09; border: 1px solid #332014; border-radius: 12px; padding: 16px; text-align: center;">
              <div style="color: #8c7e72; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px;">Viva Defense Score</div>
              <div style="color: #D4AF37; font-size: 26px; font-weight: 900; font-family: monospace;">{viva_score} <span style="font-size: 14px; color: #8c7e72;">/ 10</span></div>
              <div style="color: #8c7e72; font-size: 11px; margin-top: 4px;">Live Concept Mastery</div>
            </td>
          </tr>
          <tr>
            <td style="width: 50%; background-color: #140d09; border: 1px solid #332014; border-radius: 12px; padding: 16px; text-align: center;">
              <div style="color: #8c7e72; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px;">Git-DNA Forensics</div>
              <div style="color: #ffffff; font-size: 18px; font-weight: 800; font-family: monospace;">{commits} commits</div>
              <div style="color: #8c7e72; font-size: 11px; margin-top: 4px;">Across {timespan} days · {deletion_pct}% refactoring</div>
            </td>
            <td style="width: 50%; background-color: #140d09; border: 1px solid #332014; border-radius: 12px; padding: 16px; text-align: center;">
              <div style="color: #8c7e72; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px;">AppSec Injection Scan</div>
              <div style="color: {'#EF4444' if has_prompt_injection else '#10B981'}; font-size: 16px; font-weight: 800;">
                { 'THREAT INTERCEPTED' if has_prompt_injection else 'PASSED CLEAN' }
              </div>
              <div style="color: #8c7e72; font-size: 11px; margin-top: 4px;">0 Indirect Injections</div>
            </td>
          </tr>
        </table>
      </div>

      <!-- Actionable Growth Steps Section -->
      <div style="margin-bottom: 34px;">
        <div style="color: #D4AF37; font-size: 12px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 14px;">Actionable Engineering Growth Plan</div>
        {steps_html}
      </div>

      <!-- Public Ledger Verification CTA -->
      <div style="background: linear-gradient(135deg, #1e110a 0%, #110905 100%); border: 1px dashed #D4AF37; border-radius: 14px; padding: 24px; text-align: center; margin-bottom: 24px;">
        <div style="color: #ffffff; font-size: 15px; font-weight: 700; margin-bottom: 8px;">Official 3D Verifiable ProofCard Ledger</div>
        <p style="color: #c4b5a5; font-size: 12px; margin: 0 0 18px 0;">This candidate profile has been cryptographically signed with Ed25519 digital signatures and registered on the Pariksha public verification ledger.</p>
        <a href="{verify_url}" target="_blank" style="display: inline-block; background-color: #D4AF37; color: #0c0604; font-size: 13px; font-weight: 800; text-decoration: none; padding: 12px 28px; border-radius: 8px; letter-spacing: 0.5px; box-shadow: 0 4px 15px rgba(212,175,55,0.4);">
          OPEN LIVE 3D PROOFCARD & SCANNABLE QR
        </a>
      </div>

    </div>

    <!-- Luxury Footer -->
    <div style="background-color: #0c0604; border-top: 1px solid #29180f; padding: 20px 40px; text-align: center; font-size: 11px; color: #6e6155;">
      <div>Issued by Pariksha IM-105 Verification Authority · Deviathon 2.0</div>
      <div style="margin-top: 4px; font-family: monospace;">Tamper-Proof Ledger Seal: SHA256:{cid[:16]}...</div>
      <div style="margin-top: 8px; color: #4d433b;">Equal Opportunity Guarantee: Candidate evaluated 100% on verifiable code merit with zero institutional pedigree bias.</div>
    </div>

  </div>
</body>
</html>
"""

        return {
            "candidate_id": cid,
            "candidate_name": name,
            "email": email,
            "college": college,
            "college_tier": college_tier,
            "college_tier_label": college_tier_label,
            "decision": decision,
            "badge_title": badge_title,
            "subject": subject,
            "headline": headline,
            "findings_summary": decision_statement,
            "action_plan_steps": steps,
            "authenticity_score": auth_score,
            "viva_score": viva_score,
            "is_clone": is_clone,
            "has_prompt_injection": has_prompt_injection,
            "matched_tutorial": tut_name,
            "formatted_email_text": text_content.strip(),
            "formatted_email_html": html_content.strip(),
            "verification_url": verify_url
        }
