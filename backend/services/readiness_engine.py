from typing import Any, Dict, List


class ReadinessEngine:
    """Convert verified gaps into assessable employment-readiness work.

    This is deliberately deterministic: a recommendation must be explainable
    and reproducible rather than an opaque generative answer. Every task has a
    required artifact and a measurable acceptance condition.
    """

    @staticmethod
    def build_plan(
        *,
        skill_evidence: Dict[str, List[str]] | None = None,
        complex_functions: List[Dict[str, Any]] | None = None,
        git_dna: Dict[str, Any] | None = None,
        viva_questions: List[Dict[str, Any]] | None = None,
        matched_tutorial: Dict[str, Any] | None = None,
        analysis_status: str = "VERIFICATION_INCOMPLETE",
        target_skills: List[str] | None = None,
    ) -> Dict[str, Any]:
        evidence = skill_evidence or {}
        functions = complex_functions or []
        git = git_dna or {}
        questions = viva_questions or []
        targets = list(dict.fromkeys(target_skills or []))
        gaps: List[Dict[str, Any]] = []

        if matched_tutorial and matched_tutorial.get("similarity_score", 0) > 0:
            gaps.append({
                "id": "originality-rebuild",
                "priority": "critical",
                "skill": "Code ownership",
                "reason": "A verified source overlap was found; ownership must be demonstrated with an independent implementation.",
                "task": "Re-implement one matched module without copying the upstream structure.",
                "artifact": "A new commit, tests, and a short design explanation.",
                "acceptance": "The replacement passes the same behavioral cases while normalized source overlap falls below the review threshold.",
            })

        if not git.get("history_verified"):
            gaps.append({
                "id": "history-evidence",
                "priority": "high",
                "skill": "Development ownership",
                "reason": "A source snapshot cannot establish development progression.",
                "task": "Submit the repository with its verifiable Git history or a signed export.",
                "artifact": "Commit history with timestamps, authorship, and repository identity.",
                "acceptance": "At least one valid history analysis completes without synthetic metrics.",
            })

        if not evidence.get("testing"):
            gaps.append({
                "id": "boundary-tests",
                "priority": "high",
                "skill": "Testing",
                "reason": "No test-file evidence was found in the analyzed source.",
                "task": "Add tests for success, invalid input, timeout, and dependency failure paths.",
                "artifact": "Runnable test files and their output.",
                "acceptance": "Tests cover the highest-complexity function and pass in a clean environment.",
            })

        if functions:
            target = max(functions, key=lambda item: item.get("complexity", 0))
            gaps.append({
                "id": "ownership-defense",
                "priority": "medium",
                "skill": "Technical explanation",
                "reason": f"The highest observed control-flow complexity is {target.get('complexity', 0)} in {target.get('function_name', 'the target function')}.",
                "task": "Complete a live defense and explain one failure mode, trade-off, and test boundary for that function.",
                "artifact": "A recorded answer or transcript linked to the exact function and line.",
                "acceptance": "All generated viva questions are answered with the required concepts demonstrated.",
            })
        elif not questions:
            gaps.append({
                "id": "source-depth",
                "priority": "medium",
                "skill": "Source depth",
                "reason": "No complex source function was available for a code-ownership defense.",
                "task": "Submit analyzable source files for the target role.",
                "artifact": "Source files with line-level provenance.",
                "acceptance": "At least one non-trivial function is retrieved and independently parsed.",
            })

        for skill in targets:
            if skill.lower() not in {key.lower() for key in evidence}:
                gaps.append({
                    "id": f"skill-{skill.lower().replace(' ', '-')}",
                    "priority": "medium",
                    "skill": skill,
                    "reason": "No supporting file evidence was returned for this target skill.",
                    "task": f"Add a small role-specific implementation demonstrating {skill}.",
                    "artifact": f"A source file, test, and explanation for {skill}.",
                    "acceptance": f"The implementation is retrieved and the {skill} evidence is linked to the final report.",
                })

        if not gaps:
            gaps.append({
                "id": "stretch-reliability",
                "priority": "low",
                "skill": "Production readiness",
                "reason": "Core evidence is present; the next useful signal is resilience under realistic failure.",
                "task": "Add a load or failure-injection test for the most important workflow.",
                "artifact": "Benchmark output and a brief trade-off explanation.",
                "acceptance": "The system reports a reproducible baseline and behavior under failure.",
            })

        readiness = "READY_FOR_REVIEW" if analysis_status == "COMPLETED" and git.get("history_verified") else "EVIDENCE_INCOMPLETE"
        return {
            "version": "readiness-v1",
            "status": readiness,
            "decision_use": "development_guidance_only",
            "message": "These tasks close measurable evidence gaps; they are not a replacement for human hiring judgment.",
            "gaps": gaps[:8],
            "next_reassessment": "Re-run source, history, and defense checks after the candidate submits the listed artifacts.",
            "evidence_basis": {
                "skills_with_files": sorted(evidence),
                "complex_functions": len(functions),
                "viva_questions": len(questions),
                "history_verified": bool(git.get("history_verified")),
                "analysis_status": analysis_status,
            },
        }
