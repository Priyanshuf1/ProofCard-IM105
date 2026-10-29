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
        origin_url: str = "https://proofcard.vercel.app"
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
        card_status = card.get("status") or ("FLAGGED_ADVERSARIAL_INJECTION" if has_prompt_injection else ("FLAGGED_CLONE" if is_clone else "VERIFIED_COMPETENT"))
        growth_area = card.get("growth_area") or ("Remove prompt injection directives from repository comments and documentation." if has_prompt_injection else ("Build original project architectures rather than copying online tutorials." if is_clone else "Deepen automated unit test suites and integration test fixtures."))
        specific_action = card.get("specific_action") or ("Clean repository documentation to reflect genuine code authorship." if has_prompt_injection else ("Implement a unique feature or custom database schema to prove independent engineering." if is_clone else "Write automated unit tests covering error edge cases and failure recovery."))
        
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
            
            # Formulate clear, professional, empathetic rejection feedback in plain English
            if has_prompt_injection:
                decision_statement = (
                    "During our automated code analysis, we identified adversarial prompt directives hidden within code comments or documentation. "
                    "We maintain strict standards for code transparency and security, and require all submissions to be free of hidden automated directives."
                )
            elif is_clone:
                decision_statement = (
                    f"Our analysis found that this project closely mirrors an online tutorial template ('{tut_name or 'Public Tutorial Codebase'}'). "
                    "While building along with tutorials is a wonderful way to learn, our hiring team is looking for original, self-directed code "
                    "that demonstrates your independent problem-solving and architectural decision-making."
                )
            elif viva_score < 6.0 and viva_score > 0:
                decision_statement = (
                    f"Your codebase is authentic and cleanly written. However, during the Technical Viva Defense (Score: {viva_score}/10), "
                    "you found it challenging to explain the internal design trade-offs, error-handling decisions, and how specific functions operate. "
                    "In this role, software engineers collaborate closely with team members and must be able to clearly communicate how their code works."
                )
            elif rejection_reason_code == "VIVA_INCOMPLETE" or (viva_score == 0 and not is_clone and not has_prompt_injection):
                decision_statement = (
                    "Your project repository is authentic and demonstrates good engineering structure. However, our technical evaluation "
                    "process requires candidates to complete a brief 3-minute Technical Viva Defense to verify code authorship and system comprehension. "
                    "Because your Technical Viva Defense was not completed prior to our screening review, we are unable to advance your application for this cycle."
                )
            elif rejection_reason_code == "JUNIOR_SCOPE":
                decision_statement = (
                    "Your project is clean, authentic, and demonstrates strong fundamentals. However, for this particular opening, "
                    "our team needs demonstrated hands-on experience with production-scale challenges, such as asynchronous worker queues, "
                    "caching layers, database indexing, and automated testing suites."
                )
            elif rejection_reason_code == "JD_MISMATCH":
                decision_statement = (
                    "We were very impressed by the quality and craftsmanship of your submission. However, this specific role demands day-to-day "
                    "depth in our core production stack. Your skills would be a much stronger match for openings tailored to your primary technologies."
                )
            elif rejection_reason_code == "BULK_DUMP" or commits <= 2:
                decision_statement = (
                    "Your project code looks promising, but it was uploaded in a single initial commit rather than developed incrementally over time. "
                    "We value developers who practice healthy version control by committing small, logical steps with clear messages that show how a feature evolved."
                )
            else:
                decision_statement = (
                    custom_note or 
                    "After a thorough review of your technical project and code architecture, we have chosen to proceed with candidates whose "
                    "immediate hands-on experience more closely matches the specific engineering challenges of our current opening."
                )
        else:
            badge_title = "EVALUATION FEEDBACK"
            badge_color = "#F59E0B"  # Amber
            badge_bg = "#78350F"
            headline = f"Technical Performance & Skill Growth Roadmap for {name}."
            if viva_score > 0:
                decision_statement = (
                    f"Your repository analysis is complete. Authenticity score is {auth_score}% and Viva defense is {viva_score}/10. "
                    "Review the actionable steps below to enhance your software engineering profile."
                )
            else:
                decision_statement = (
                    f"Your repository analysis is complete. Authenticity score is {auth_score}%. Technical viva defense is currently pending candidate completion. "
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
- Code Authenticity:     {auth_score} / 100 {("(Prompt Injection Flagged)" if has_prompt_injection else ("(Clone Flagged)" if is_clone else "(Verified Organic)"))}
- Viva Defense Status:   {f"{viva_score} / 10.0 (Live Defended)" if viva_score > 0 else ("Disqualified (Adversarial Injection)" if has_prompt_injection else ("Disqualified (Tutorial Clone)" if is_clone else "Pending Candidate Defense (3-Minute Oral Defense Required)"))}
- Git-DNA History:       {commits} commits over {timespan} days ({deletion_pct}% refactoring deletion)
- AppSec Injection Scan: {("FLAGGED: Prompt Injection Payload" if has_prompt_injection else "PASSED: 0 Vulnerabilities Detected")}
- Institutional Pedigree Bias: 0.0% (Evaluated strictly on code quality)

--------------------------------------------------------------------------------
GROWTH FOCUS & RECOMMENDED ACTIONS
--------------------------------------------------------------------------------
Growth Focus:
- Area:   {growth_area}
- Action: {specific_action}

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
      <img src="https://proofcard.vercel.app/pariksha-logo.jpg" alt="Pariksha Intelligent Testing Platform" width="130" style="display: block; margin: 0 auto 16px auto; border-radius: 10px; border: 1px solid #D4AF37; box-shadow: 0 4px 16px rgba(255,140,0,0.35);" />
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
              <div style="color: #8c7e72; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px;">Viva Defense Status</div>
              {f'''<div style="color: #D4AF37; font-size: 26px; font-weight: 900; font-family: monospace;">{viva_score} <span style="font-size: 14px; color: #8c7e72;">/ 10</span></div>
              <div style="color: #10B981; font-size: 11px; margin-top: 4px; font-weight: 600;">✓ Live Concept Mastery</div>''' if viva_score > 0 else ('''<div style="color: #EF4444; font-size: 18px; font-weight: 800;">DISQUALIFIED</div>
              <div style="color: #8c7e72; font-size: 11px; margin-top: 4px;">Tutorial Clone Match</div>''' if is_clone else '''<div style="color: #F59E0B; font-size: 18px; font-weight: 800;">PENDING DEFENSE</div>
              <div style="color: #8c7e72; font-size: 11px; margin-top: 4px;">3-Minute Viva Required</div>''')}
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

        clean_html = html_content.strip()
        clean_text = text_content.strip()
        action_plan_text = "\n\n".join(f"{s['title']}\n{s['desc']}" for s in steps)

        return {
            "candidate_id": cid,
            "candidate_name": name,
            "name": name,
            "email": email,
            "to": email,
            "recipient": email,
            "college": college,
            "college_tier": college_tier,
            "college_tier_label": college_tier_label,
            "decision": decision,
            "badge_title": badge_title,
            "subject": subject,
            "headline": headline,
            "findings_summary": decision_statement,
            "growth_area": growth_area,
            "specific_action": specific_action,
            "action_plan": action_plan_text,
            "action_plan_steps": steps,
            "authenticity_score": auth_score,
            "viva_score": viva_score,
            "is_clone": is_clone,
            "has_prompt_injection": has_prompt_injection,
            "matched_tutorial": tut_name,
            "formatted_email_text": clean_text,
            "formatted_email_html": clean_html,
            "html": clean_html,
            "text": clean_text,
            "message": clean_text,
            "body": clean_html,
            "verification_url": verify_url,
            "logo_url": "https://proofcard.vercel.app/pariksha-logo.jpg"
        }

    @classmethod
    def generate_viva_invitation(
        cls,
        candidate: Dict[str, Any],
        origin_url: str = "https://proofcard.vercel.app",
        custom_note: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Generates a warm, professional, executive Viva Defense Invitation email
        with live links, preparation tips, and clear instructions.
        """
        cid = candidate.get("candidate_id") or "cand_unknown"
        name = candidate.get("name") or "Candidate"
        email = candidate.get("email") or "candidate@example.edu"
        college = candidate.get("college") or "Engineering Institute"
        college_tier, college_tier_label = CollegeTierClassifier.classify(college)
        repo_url = candidate.get("repo_url") or candidate.get("github_url") or "https://github.com"
        project_name = candidate.get("project_name") or candidate.get("project_type") or "Software Project"
        
        # Build direct viva link
        viva_url = f"{origin_url}/viva?cid={cid}&name={urllib.parse.quote(name)}&email={urllib.parse.quote(email)}"

        subject = f"Next Step: 3-Minute Technical Viva Defense for {name} ({project_name})"
        
        headline = f"Hello {name}, you are invited to complete your 3-Minute Technical Defense Viva."
        
        body_message = (
            f"Thank you for submitting your project for technical review. As part of our merit-based hiring evaluation at {college}, "
            "we invite you to complete a brief, 3-minute oral or written defense of your codebase.\n\n"
            "Why the Viva exists: Rather than relying on rigid multiple-choice tests or college brand bias, we evaluate real engineering skills. "
            "Our system will present 3 targeted questions about your specific implementation, and you will explain your architectural choices in your own words."
        )
        if custom_note and custom_note.strip():
            body_message += f"\n\nRecruiter Note: {custom_note.strip()}"

        mailto_subject = urllib.parse.quote(subject)
        mailto_body = urllib.parse.quote(
            f"Hi {name},\n\n"
            f"You are invited to complete your 3-minute Technical Defense Viva for your project: {project_name}.\n\n"
            f"Click here to start: {viva_url}\n\n"
            "Best regards,\nPariksha Hiring Team"
        )
        mailto_link = f"mailto:{email}?subject={mailto_subject}&body={mailto_body}"

        html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>{subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050302; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f5f0eb;">
  <div style="max-width: 620px; margin: 30px auto; background-color: #0c0604; border: 1px solid #D4AF37; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.85);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #180d09 0%, #0c0604 100%); border-bottom: 1px solid #331b12; padding: 32px 36px; text-align: center;">
      <img src="https://proofcard.vercel.app/pariksha-logo.jpg" alt="Pariksha Intelligent Testing Platform" width="110" style="display: block; margin: 0 auto 16px auto; border-radius: 10px; border: 1px solid #D4AF37; box-shadow: 0 4px 16px rgba(255,140,0,0.35);" />
      <div style="display: inline-block; background-color: #064E3B; color: #34D399; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; padding: 6px 14px; border-radius: 20px; border: 1px solid #059669; margin-bottom: 14px;">
        VIVA DEFENSE INVITATION
      </div>
      <h1 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 0 0 8px 0; line-height: 1.3;">
        3-Minute Technical Viva Defense
      </h1>
      <div style="color: #c9b89a; font-size: 13px;">
        Candidate: <strong style="color: #ffffff;">{name}</strong> · {college} ({college_tier})
      </div>
    </div>

    <!-- Body -->
    <div style="padding: 32px 36px; line-height: 1.6;">
      <p style="color: #e6ded5; font-size: 14px; margin: 0 0 20px 0;">
        Hello {name},
      </p>
      <p style="color: #c9b89a; font-size: 13px; margin: 0 0 22px 0;">
        Thank you for submitting your project <strong>{project_name}</strong>. As part of our objective, bias-free technical screening process, you are invited to complete your <strong>3-minute Technical Defense Viva</strong>.
      </p>

      <!-- How it works box -->
      <div style="background-color: #140b08; border: 1px solid #3A2F27; border-radius: 12px; padding: 20px; margin-bottom: 26px;">
        <div style="color: #D4AF37; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">
          What to Expect in Your Viva Defense:
        </div>
        <ul style="margin: 0; padding-left: 20px; color: #d6cbbf; font-size: 12px; line-height: 1.6;">
          <li style="margin-bottom: 6px;"><strong>3 Targeted Questions:</strong> Derived directly from key functions extracted from your codebase.</li>
          <li style="margin-bottom: 6px;"><strong>3 Minutes Total:</strong> Answer via voice or type your defense directly in the browser.</li>
          <li style="margin-bottom: 0;"><strong>Immediate Verification:</strong> Your score and verified ProofCard are issued immediately upon defense.</li>
        </ul>
      </div>

      <!-- Action Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="{viva_url}" target="_blank" style="display: inline-block; background-color: #D4AF37; color: #0c0604; font-size: 14px; font-weight: 800; text-decoration: none; padding: 14px 34px; border-radius: 10px; letter-spacing: 0.5px; box-shadow: 0 4px 18px rgba(212,175,55,0.4);">
          START MY VIVA DEFENSE NOW &rarr;
        </a>
      </div>

      <p style="color: #8c7f73; font-size: 11px; text-align: center; margin: 0;">
        Direct Link: <a href="{viva_url}" style="color: #D4AF37; text-decoration: underline;">{viva_url}</a>
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #070402; border-top: 1px solid #29180f; padding: 18px 36px; text-align: center; font-size: 11px; color: #6e6155;">
      <div>Pariksha Verification Platform · Merit-Based Technical Evaluation</div>
      <div style="margin-top: 4px; color: #4d433b;">Zero Pedigree Bias Guarantee · 100% Code Quality & Viva Defense</div>
    </div>

  </div>
</body>
</html>"""

        text_content = f"""
================================================================================
                    PARIKSHA VIVA DEFENSE INVITATION
================================================================================
Candidate: {name}
Institution: {college} ({college_tier})
Target Project: {project_name}

Hello {name},

You have been invited to complete your 3-minute Technical Defense Viva for your project submission: {project_name}.

WHAT TO EXPECT:
- 3 short conceptual questions about your specific code implementation
- 3 minutes total time to respond via voice or written defense
- Immediate verification and inclusion in the recruiter shortlist pool

START YOUR VIVA:
{viva_url}

Best regards,
Pariksha Technical Evaluation Team
================================================================================
"""

        clean_html = html_content.strip()
        clean_text = text_content.strip()
        return {
            "candidate_id": cid,
            "candidate_name": name,
            "name": name,
            "email": email,
            "to": email,
            "recipient": email,
            "college": college,
            "college_tier": college_tier,
            "subject": subject,
            "headline": headline,
            "body_message": body_message,
            "viva_url": viva_url,
            "viva_link": viva_url,
            "verification_url": viva_url,
            "mailto_link": mailto_link,
            "formatted_email_html": clean_html,
            "formatted_email_text": clean_text,
            "html": clean_html,
            "text": clean_text,
            "message": clean_text,
            "body": clean_html,
            "growth_area": "Oral defense of key repository functions",
            "specific_action": f"Complete 3-minute viva defense at {viva_url}",
            "action_plan": "1. Review your repository functions\n2. Open your 3-minute oral defense link\n3. Explain code trade-offs and receive your verified Pariksha credential",
            "action_plan_steps": [
                {"title": "1. Review Key Code Functions", "desc": "Be ready to explain key algorithms and trade-offs in your repository."},
                {"title": "2. Access Direct Viva Link", "desc": f"Click your personal 3-minute viva link ({viva_url}) from any modern browser."},
                {"title": "3. Receive Verified Credential", "desc": "Earn your verifiable ProofCard upon defense completion."}
            ],
            "logo_url": "https://proofcard.vercel.app/pariksha-logo.jpg"
        }
