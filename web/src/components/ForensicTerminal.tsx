import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck,
  ShieldAlert,
  Lock, 
  AlertTriangle, 
  GitCommit, 
  Terminal, 
  Code, 
  ArrowRight, 
  Flame, 
  CheckCircle2, 
  Clock, 
  Users, 
  ExternalLink,
  GitFork,
  Link2
} from 'lucide-react';
import { CandidateProfile } from '../types';

interface ForensicTerminalProps {
  candidate: CandidateProfile | null;
  onNavigateToTab: (tab: string) => void;
  onSelectCandidate?: (candidate: CandidateProfile) => void;
  cohort?: CandidateProfile[];
}

export const ForensicTerminal: React.FC<ForensicTerminalProps> = ({ 
  candidate, 
  onNavigateToTab,
  onSelectCandidate,
  cohort = []
}) => {
  const [activeCodeTab, setActiveCodeTab] = useState(0);
  const [selectedClusterId, setSelectedClusterId] = useState<string | null>(null);

  // High-Tech Empty State if no candidate has been ingested yet
  if (!candidate) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="p-8 sm:p-12 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-50 border border-gray-200 flex items-center justify-center">
            <Terminal className="w-8 h-8 text-[#4b5563]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 font-sans">
            No Candidate Scanned Yet
          </h2>
          <p className="text-sm text-gray-600 max-w-md mx-auto mb-6">
            Paste a public GitHub link or upload a code ZIP in the Scanner tab to inspect commit history, clone detection, and code quality.
          </p>
          <button
            onClick={() => onNavigateToTab('ingestion')}
            className="btn-primary text-xs flex items-center gap-2 px-6 py-3.5 mx-auto shadow-lg cursor-pointer font-bold"
          >
            <span>Go to Code Scanner</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const gitDna = candidate.git_dna || {
    total_commits: 0,
    time_span_days: 0,
    burst_ratio: 0,
    deletion_ratio: 0,
    organic_growth: false,
    message_maturity_score: 0,
    test_files_detected: 0,
    authenticity_score: candidate.authenticity_score || 0,
    summary: 'No Git commit history recorded for this candidate.'
  };

  const complexFuncs = candidate.complex_functions || [];



  // Enterprise Anomaly & Plagiarism Viva Gating (Threshold: 30%)

  const cloneScore = candidate.is_clone 

    ? Math.round((candidate.matched_tutorial?.similarity_score || 0.7) * 100) 

    : 0;

  const authenticityScore = candidate.authenticity_score ?? 100;

  const anomalyScore = Math.max(

    cloneScore,

    100 - authenticityScore,

    (candidate.is_prompt_injected || candidate.security_scan?.is_prompt_injected) ? 90 : 0,

    candidate.anomaly_score || 0

  );

  const isVivaBlocked = Boolean(

    candidate.viva_blocked ?? (

      anomalyScore > 30 || 

      candidate.is_prompt_injected || 

      candidate.security_scan?.is_prompt_injected || 

      candidate.is_clone

    )

  );

  // Dynamic Plagiarism Clusters computed from cohort
  const dynamicClusters = useMemo(() => {
    const map = new Map<string, {
      id: string;
      name: string;
      sourceUrl: string;
      author: string;
      originType: string;
      candidates: CandidateProfile[];
      similaritySum: number;
    }>();

    cohort.forEach((cand) => {
      if (cand.is_clone && cand.matched_tutorial) {
        const tut = cand.matched_tutorial;
        const key = tut.name || 'External Online Repository';
        const existing = map.get(key) || {
          id: tut.id || key.toLowerCase().replace(/[^a-z0-9]/g, '_'),
          name: tut.name,
          sourceUrl: tut.source_url || tut.youtube_url || 'https://github.com',
          author: tut.author || 'Open Source Author',
          originType: tut.origin_type || 'GLOBAL_ORIGIN',
          candidates: [],
          similaritySum: 0
        };
        existing.candidates.push(cand);
        existing.similaritySum += (tut.similarity_score || 0.88);
        map.set(key, existing);
      }
    });

    const result = Array.from(map.values()).map((c) => {
      const avgPct = Math.round((c.similaritySum / Math.max(c.candidates.length, 1)) * 100);
      return {
        id: c.id,
        name: c.name,
        sourceUrl: c.sourceUrl,
        author: c.author,
        originType: c.originType,
        count: c.candidates.length,
        similarityPct: avgPct,
        similarity: `${avgPct}% Code Match`,
        candidates: c.candidates
      };
    });

    return result.sort((a, b) => b.count - a.count);
  }, [cohort]);

  const activeCluster = dynamicClusters.find(c => c.id === selectedClusterId);
  const totalClonesCount = cohort.filter(c => c.is_clone).length;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      {/* Cohort Plagiarism Radar */}
      {cohort.length > 0 && dynamicClusters.length > 0 && (
        <div className="p-5 sm:p-6 rounded-2xl mb-6 bg-white border border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold text-red-700 font-sans tracking-wide">
                Cohort Copied Tutorial Radar ({totalClonesCount} Clones Detected)
              </span>
            </div>
            <span className="text-xs font-mono text-[#4b5563] bg-white px-3 py-1 rounded-full border border-gray-200">
              Cross-Candidate Clone Engine
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {dynamicClusters.map((c) => {
              const isSelected = selectedClusterId === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedClusterId(isSelected ? null : c.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'border-[#e20001] bg-red-100 shadow-md' 
                      : 'bg-gray-50 border-red-500/40 hover:border-red-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm font-bold text-[#111827] truncate max-w-[170px]" title={c.name}>
                      {c.name}
                    </span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-gray-100 border border-red-500/50 text-red-700">
                      {c.count} {c.count === 1 ? 'Candidate' : 'Candidates'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 font-sans mb-2">
                    <span className="truncate max-w-[120px]">{c.author}</span>
                    <span className="text-red-700 font-mono font-bold">{c.similarity}</span>
                  </div>

                  <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-red-500 h-full"
                      style={{ width: `${c.similarityPct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          {activeCluster && (
            <div className="mt-4 p-4 rounded-xl bg-red-950/40 border border-red-500/60 animate-in fade-in">
              <div className="flex items-center justify-between mb-3 border-b border-red-900/50 pb-2">
                <div>
                  <span className="text-xs text-red-700 font-bold uppercase tracking-wider block">
                    Copied Tutorial Source:
                  </span>
                  <span className="text-sm font-bold text-[#111827]">
                    {activeCluster.name} by {activeCluster.author}
                  </span>
                </div>
                <a
                  href={activeCluster.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5 font-bold"
                >
                  <span>Open Source Repository</span>
                  <ExternalLink className="w-3 h-3 text-[#4b5563]" />
                </a>
              </div>

              <span className="text-xs text-[#4b5563] font-bold block mb-2">
                Copied By {activeCluster.candidates.length} Candidate(s):
              </span>
              <div className="flex flex-wrap gap-2">
                {activeCluster.candidates.map((cand) => (
                  <button
                    key={cand.candidate_id}
                    onClick={() => {
                      if (onSelectCandidate) onSelectCandidate(cand);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition cursor-pointer flex items-center gap-2 ${
                      cand.candidate_id === candidate.candidate_id
                        ? 'bg-red-800 text-white border border-red-400 font-bold'
                        : 'bg-white text-red-200 border border-red-900 hover:border-red-500'
                    }`}
                  >
                    <span>{cand.name}</span>
                    <span className="text-[10px] text-red-700">({cand.college})</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Candidate Profile Header Card */}
      <div className="p-6 rounded-2xl mb-6 bg-white border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${
              (candidate.is_prompt_injected || candidate.security_scan?.is_prompt_injected)
                ? 'bg-red-950/80 border-red-500 text-red-700 shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                : candidate.authenticity_score >= 80 
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-700' 
                : candidate.is_clone 
                ? 'bg-red-950/60 border-red-500/50 text-red-700' 
                : 'bg-amber-950/60 border-amber-500/50 text-amber-700'
            }`}>
              {(candidate.is_prompt_injected || candidate.security_scan?.is_prompt_injected) ? (
                <ShieldAlert className="w-8 h-8 text-red-700 animate-pulse" />
              ) : candidate.authenticity_score >= 80 ? (
                <ShieldCheck className="w-8 h-8" />
              ) : candidate.is_clone ? (
                <AlertTriangle className="w-8 h-8" />
              ) : (
                <Code className="w-8 h-8" />
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-2xl font-extrabold text-[#111827] font-sans tracking-tight">
                  {candidate.name}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono border ${
                  (candidate.is_prompt_injected || candidate.security_scan?.is_prompt_injected)
                    ? 'bg-red-950 text-red-200 border-red-500 shadow-sm'
                    : candidate.authenticity_score >= 80
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                    : candidate.is_clone
                    ? 'bg-red-950 text-red-700 border-red-600'
                    : 'bg-amber-950 text-amber-300 border-amber-600'
                }`}>
                  {(candidate.is_prompt_injected || candidate.security_scan?.is_prompt_injected)
                    ? `${candidate.authenticity_score}% Authenticity (Prompt Injected)`
                    : `${candidate.authenticity_score}% Authenticity`}
                </span>
                {candidate.is_fork && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-amber-950 text-amber-300 border border-amber-600 flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5" />
                    <span>Forked Repository</span>
                  </span>
                )}
              </div>

              <div className="text-xs text-[#4b5563] flex flex-wrap items-center gap-2 font-mono">
                <span>{candidate.college}</span>
                <span>•</span>
                <span className="text-[#111827] font-sans font-medium">{candidate.project_type || 'Software Project'}</span>
                {candidate.repo_url && (
                  <>
                    <span>•</span>
                    <a
                      href={candidate.repo_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#4b5563] hover:underline flex items-center gap-1"
                    >
                      <span>{candidate.repo_url.replace('https://github.com/', '')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3 self-end md:self-center">
            {cohort.length > 0 && onSelectCandidate && (
              <select
                value={candidate.candidate_id}
                onChange={(e) => {
                  const selected = cohort.find(c => c.candidate_id === e.target.value);
                  if (selected) onSelectCandidate(selected);
                }}
                className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-[#4b5563] font-mono focus:outline-none cursor-pointer max-w-[200px]"
              >
                <option value={candidate.candidate_id}>
                  {candidate.name} ({candidate.authenticity_score}%)
                </option>
                {cohort.filter(c => c.candidate_id !== candidate.candidate_id).map((c) => (
                  <option key={c.candidate_id} value={c.candidate_id}>
                    {c.name} ({c.authenticity_score}%)
                  </option>
                ))}
              </select>
            )}

            {isVivaBlocked ? (
              <button
                onClick={() => onNavigateToTab('viva')}
                className="px-4 py-2.5 rounded-xl bg-red-950/80 border border-red-500 text-red-200 text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg hover:bg-red-900 cursor-pointer shrink-0"
                title="Click to view why Viva is restricted"
              >
                <Lock className="w-3.5 h-3.5 text-red-700" />
                <span>Viva Locked ({anomalyScore}% Anomaly)</span>
              </button>
            ) : (
              <button
                onClick={() => onNavigateToTab('viva')}
                className="btn-primary text-xs flex items-center gap-2 px-5 py-2.5 shadow-lg cursor-pointer shrink-0 font-bold"
              >
                <span>Go to Live Viva</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Adversarial Prompt Injection Security Banner */}

      {(candidate.is_prompt_injected || candidate.security_scan?.is_prompt_injected || candidate.proof_card?.status === 'FLAGGED_PROMPT_INJECTION') && (

        <div className="mb-6 bg-red-950/70 border-2 border-red-500 rounded-2xl p-5 shadow-2xl backdrop-blur-md animate-in fade-in">

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">

            <div className="flex items-start gap-3.5">

              <div className="w-11 h-11 rounded-xl bg-red-900 border border-red-400 flex items-center justify-center text-red-100 shrink-0 mt-0.5 shadow-lg">

                <ShieldAlert className="w-6 h-6 text-red-200" />

              </div>

              <div className="flex-1">

                <div className="flex flex-wrap items-center gap-2 mb-1.5">

                  <span className="text-xs font-black text-white px-2.5 py-0.5 rounded-full bg-red-600 border border-red-400 uppercase tracking-wider">

                    CRITICAL SECURITY ALERT

                  </span>

                  <span className="text-xs font-mono font-bold text-red-200 bg-white px-2.5 py-0.5 rounded-full border border-red-500/50">

                    IM-105 Adversarial Prompt Injection Shield

                  </span>

                  <span className="text-xs font-mono text-[#4b5563] bg-white px-2 py-0.5 rounded-full border border-gray-200">

                    {candidate.security_scan?.findings_count || 1} Injection Payload(s) Intercepted

                  </span>

                </div>



                <h3 className="text-lg font-black text-white font-sans tracking-wide">

                  Adversarial Prompt Injection Directives Detected

                </h3>



                <p className="text-xs text-red-200 mt-1 font-sans leading-relaxed">

                  This repository contains active prompt injection directives embedded in code comments and documentation attempting to override AI evaluation rubrics, bypass automated checks, or force 10/10 scores. Pariksha's AST and security isolation shield neutralized and quarantined these vectors.

                </p>



                {/* Quarantined Injection Findings */}

                {candidate.security_scan?.findings && candidate.security_scan.findings.length > 0 && (

                  <div className="mt-3 space-y-2">

                    <span className="text-[11px] font-bold uppercase text-[#4b5563] tracking-wider block">

                      Quarantined Injection Payloads:

                    </span>

                    <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1">

                      {candidate.security_scan.findings.slice(0, 5).map((f, i) => (

                        <div key={i} className="p-2.5 rounded-lg bg-red-50 border border-red-500/40 font-mono text-xs text-[#111827] flex flex-col gap-1">

                          <div className="flex items-center justify-between text-[11px]">

                            <span className="text-red-700 font-bold">{f.file}:{f.line_number}</span>

                            <span className="px-1.5 py-0.2 rounded bg-red-950 text-red-700 border border-red-600 text-[10px] uppercase font-bold">

                              {f.category}

                            </span>

                          </div>

                          <div className="text-neutral-300 text-[11px] truncate" title={f.snippet}>

                            "{f.snippet}"

                          </div>

                        </div>

                      ))}

                    </div>

                  </div>

                )}

              </div>

            </div>



            <button

              onClick={() => onNavigateToTab('viva')}

              className="btn-primary text-xs px-4 py-2.5 flex items-center gap-1.5 shrink-0 self-start font-bold shadow-lg"

            >

              <span>Cross-Examine in Viva</span>

              <ArrowRight className="w-3.5 h-3.5" />

            </button>

          </div>

        </div>

      )}



      {/* Copied Code Warning Banner if Clone */}
      {candidate.is_clone && candidate.matched_tutorial && (
        <div className="mb-6 bg-red-950/50 border border-red-500/70 rounded-2xl p-5 shadow-2xl backdrop-blur-md animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-900/60 border border-red-500/60 flex items-center justify-center text-red-200 shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5 text-red-700" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-red-700 uppercase tracking-wider">
                    Plagiarism Detected
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-900 border border-red-600 text-white font-mono font-bold">
                    {Math.round(candidate.matched_tutorial.similarity_score * 100)}% Copied Code
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">
                  Matched Source: {candidate.matched_tutorial.name}
                </h3>

                <p className="text-xs text-red-200 mt-1 font-sans leading-relaxed">
                  {candidate.matched_tutorial.verdict}
                </p>

                {/* Matched files */}
                {candidate.matched_tutorial.matched_files && candidate.matched_tutorial.matched_files.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase text-[#4b5563]">
                      Matching Files:
                    </span>
                    {candidate.matched_tutorial.matched_files.map((f, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white border border-red-500/40 text-red-200 text-[10px] font-mono">
                        {f}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Direct Link to Source */}
            {(candidate.matched_tutorial.source_url || candidate.matched_tutorial.youtube_url) && (
              <a
                href={candidate.matched_tutorial.source_url || candidate.matched_tutorial.youtube_url}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary text-xs px-3.5 py-2 flex items-center gap-1.5 shrink-0 self-start font-bold"
              >
                <Link2 className="w-3.5 h-3.5 text-[#4b5563]" />
                <span>View Original Source</span>
                <ExternalLink className="w-3 h-3 text-gray-600" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* 4 Core Git History Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="p-4 rounded-xl bg-white backdrop-blur-md border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between text-gray-600 text-xs sm:text-sm mb-1.5">
            <span className="font-bold uppercase tracking-wider text-xs sm:text-sm text-[#4b5563]">Total Commits</span>
            <GitCommit className="w-4 h-4 text-[#4b5563]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#111827] font-mono">
            {gitDna.total_commits === 0 ? '0 (Archive)' : gitDna.total_commits}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white backdrop-blur-md border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between text-gray-600 text-xs sm:text-sm mb-1.5">
            <span className="font-bold uppercase tracking-wider text-xs sm:text-sm text-[#4b5563]">Days Developed</span>
            <Clock className="w-4 h-4 text-[#4b5563]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#111827] font-mono">
            {gitDna.total_commits === 0 
              ? `${gitDna.time_span_days || 1} day(s)` 
              : `${gitDna.time_span_days} days`}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white backdrop-blur-md border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between text-gray-600 text-xs sm:text-sm mb-1.5">
            <span className="font-bold uppercase tracking-wider text-xs sm:text-sm text-[#4b5563]">Commit Velocity</span>
            <Flame className="w-4 h-4 text-[#4b5563]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#111827] font-mono">
            {gitDna.total_commits === 0 ? 'N/A' : `${Math.round(gitDna.burst_ratio * 100)}%`}
          </div>
          <span className="text-[10px] text-gray-500 mt-1 block">1-hour burst ratio</span>
        </div>

        <div className="p-4 rounded-xl bg-white backdrop-blur-md border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between text-gray-600 text-xs sm:text-sm mb-1.5">
            <span className="font-bold uppercase tracking-wider text-xs sm:text-sm text-[#4b5563]">Code Rewritten</span>
            <Code className="w-4 h-4 text-[#4b5563]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#111827] font-mono">
            {gitDna.total_commits === 0 ? 'N/A' : `${Math.round(gitDna.deletion_ratio * 100)}%`}
          </div>
          <span className="text-[10px] text-gray-500 mt-1 block">Refactor deletion ratio</span>
        </div>
      </div>

      {/* Key Code Functions */}
      <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4 text-sm font-sans text-gray-800">
          <span className="font-bold uppercase tracking-wider text-[#4b5563] flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#4b5563]" />
            <span>Key Functions Extracted from Code</span>
          </span>
          <span className="font-mono text-xs sm:text-sm text-gray-800 font-bold">
            {complexFuncs.length} Functions Identified
          </span>
        </div>

        {complexFuncs.length > 0 ? (
          <>
            {/* Function Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {complexFuncs.map((f, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCodeTab(i)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs transition cursor-pointer flex items-center gap-2 ${
                    activeCodeTab === i
                      ? 'bg-[#e20001] text-white border border-[#e20001]'
                      : 'bg-gray-50 text-gray-600 border border-gray-200 hover:border-gray-200'
                  }`}
                >
                  <span>{f.function_name}()</span>
                  <span className="px-1.5 py-0.2 rounded bg-white text-[10px] text-[#4b5563] font-bold">
                    Complexity: {f.complexity}
                  </span>
                </button>
              ))}
            </div>

            {/* Code Snippet Box */}
            {complexFuncs[activeCodeTab] && (
              <div className="rounded-xl overflow-hidden border border-gray-300 bg-[#f8fafc]">
                <div className="bg-gray-100 px-4 py-2.5 border-b border-gray-200 flex items-center justify-between text-xs font-mono text-[#111827] font-bold">
                  <span>{complexFuncs[activeCodeTab].file}:{complexFuncs[activeCodeTab].line_number}</span>
                  <span className="text-[#e20001] font-bold">Verified Code Snippet</span>
                </div>
                <pre className="p-4 text-xs text-[#111827] font-mono font-semibold overflow-x-auto leading-relaxed bg-[#f8fafc]">
                  <code className="text-[#111827] font-semibold">{complexFuncs[activeCodeTab].snippet}</code>
                </pre>
              </div>
            )}
          </>
        ) : (
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-center text-xs text-gray-600">
            No complex logic functions extracted for this repository.
          </div>
        )}
      </div>
    </div>
  );
};
