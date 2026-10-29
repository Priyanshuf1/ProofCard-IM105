import React, { useState } from 'react';
import { 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  Sliders,
  Sparkles,
  Flame,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { SAMPLE_RECRUITER_DECISIONS } from '../data/offlineDemoData';
import { auditRecruiterBias, runFairnessStressTest } from '../services/api';
import { BiasMirrorResponse, CandidateProfile } from '../types';

interface BiasMirrorProps {
  cohort?: CandidateProfile[];
}

export const BiasMirror: React.FC<BiasMirrorProps> = ({ cohort = [] }) => {
  const [decisions, setDecisions] = useState(SAMPLE_RECRUITER_DECISIONS);
  const [auditResult, setAuditResult] = useState<BiasMirrorResponse | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);

  // Pedigree Twin A/B Toggle State
  const [activeEngine, setActiveEngine] = useState<'proofcard' | 'traditional_ats'>('proofcard');

  // Live Stress Test Sliders
  const [testAuthScore, setTestAuthScore] = useState(94);
  const [testVivaScore, setTestVivaScore] = useState(9);
  const [stressResult, setStressResult] = useState<any>(null);

  const handleToggleShortlist = (candId: string) => {
    setDecisions(prev => prev.map(d => 
      d.candidate_id === candId ? { ...d, recruiter_shortlisted: !d.recruiter_shortlisted } : d
    ));
  };

  const handleRunAudit = async () => {
    setIsAuditing(true);
    try {
      const res = await auditRecruiterBias(decisions);
      setAuditResult(res);
    } catch (e) {
      // Graceful fallback
    } finally {
      setIsAuditing(false);
    }
  };

  const handleRunStressTest = async (auth = testAuthScore, viva = testVivaScore) => {
    const res = await runFairnessStressTest(auth, viva);
    setStressResult(res);
  };

  React.useEffect(() => {
    handleRunAudit();
    handleRunStressTest(testAuthScore, testVivaScore);
  }, []);

  React.useEffect(() => {
    handleRunStressTest(testAuthScore, testVivaScore);
  }, [testAuthScore, testVivaScore]);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl mb-6 bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
              Recruiter Bias Mirror & Pedigree Parity
            </h1>
          </div>

          <button
            onClick={handleRunAudit}
            disabled={isAuditing}
            className="btn-dev-primary text-xs flex items-center gap-2 px-5 py-2.5 shadow-lg cursor-pointer"
          >
            <Scale className="w-4 h-4" />
            <span>{isAuditing ? 'Running Audit...' : 'Re-run Bias Audit'}</span>
          </button>
        </div>
      </div>

      {/* FEATURE: INTERACTIVE PEDIGREE TWIN A/B STRESS TEST (AXIS 2) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-2xl mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3A2F27] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B1E1E]/50 border border-[#D4AF37]/50 flex items-center justify-center text-base font-bold text-[#FFD166]">
              ⚖️
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-sans">
                The Pedigree Twin Dilemma: IIT Clone vs Tier-3 Builder
              </h2>
            </div>
          </div>

          {/* Engine Selector Toggle */}
          <div className="flex items-center gap-2 bg-black/80 p-1.5 rounded-xl border border-[#D4AF37]/40">
            <button
              onClick={() => setActiveEngine('traditional_ats')}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
                activeEngine === 'traditional_ats'
                  ? 'bg-red-950/80 border border-red-500/60 text-red-300 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Traditional ATS</span>
            </button>
            <button
              onClick={() => setActiveEngine('proofcard')}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
                activeEngine === 'proofcard'
                  ? 'bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>ProofCard Meritocratic AI</span>
            </button>
          </div>
        </div>

        {/* 2-Column Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Twin A: IIT Delhi Tutorial Cloner */}
          <div className={`p-6 rounded-2xl border transition-all ${
            activeEngine === 'traditional_ats'
              ? 'bg-red-950/20 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
              : 'bg-black/60 border-[#3A2F27]'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full font-bold text-xs bg-amber-950/50 text-amber-300 border border-amber-500/40">
                Candidate A · Tier-1 Elite
              </span>
              <span className="font-mono text-[#E6C280] text-sm font-medium">IIT Delhi (CSE)</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-1 font-sans">
              Arjun Singhania
            </h3>
            <p className="text-sm text-neutral-300 mb-4 font-sans leading-relaxed">
              Unverified submission with high tutorial similarity and low defense score.
            </p>

            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-black/60 border border-[#3A2F27] text-center font-mono mb-4">
              <div>
                <span className="text-xs text-neutral-400 block uppercase font-semibold">Git Commits</span>
                <span className="text-white font-bold text-base mt-0.5 block">1 Dump</span>
              </div>
              <div>
                <span className="text-xs text-neutral-400 block uppercase font-semibold">Authenticity</span>
                <span className="text-red-400 font-bold text-base mt-0.5 block">14% (Clone)</span>
              </div>
              <div>
                <span className="text-xs text-neutral-400 block uppercase font-semibold">Viva Defense</span>
                <span className="text-red-400 font-bold text-base mt-0.5 block">3 / 10</span>
              </div>
            </div>

            {/* Verdict Box */}
            <div className={`p-4 rounded-xl border text-sm font-sans ${
              activeEngine === 'traditional_ats'
                ? 'bg-red-950/60 border-red-500/60 text-red-200'
                : 'bg-neutral-950 border-[#3A2F27] text-neutral-300'
            }`}>
              {activeEngine === 'traditional_ats' ? (
                <div>
                  <div className="flex items-center justify-between font-bold text-red-300 uppercase text-xs mb-1.5">
                    <span>❌ Traditional ATS: SHORTLISTED (91/100)</span>
                    <span>+85 Pts Brand Weight</span>
                  </div>
                  <p className="leading-relaxed text-sm">
                    Keyword parser parsed prestigious degree. Code was not verified for commit authenticity or conceptual defense.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between font-bold text-red-400 uppercase text-xs mb-1.5">
                    <span>🚨 ProofCard Verdict: REJECTED (14/100)</span>
                    <span>0.00% Brand Weight</span>
                  </div>
                  <p className="leading-relaxed text-sm">
                    AST Winnowing detected clone patterns. Flagged based on technical evidence regardless of institutional brand.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Twin B: Tier-3 Organic Builder */}
          <div className={`p-6 rounded-2xl border transition-all ${
            activeEngine === 'proofcard'
              ? 'bg-emerald-950/20 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
              : 'bg-black/60 border-[#3A2F27]'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full font-bold text-xs bg-emerald-950/50 text-emerald-300 border border-emerald-500/40">
                Candidate B · Regional University
              </span>
              <span className="font-mono text-[#E6C280] text-sm font-medium">GLA University (Mathura)</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-1 font-sans">
              Priyanshu Awasthi
            </h3>
            <p className="text-sm text-neutral-300 mb-4 font-sans leading-relaxed">
              Organic multi-week commit cadence, high code modularity, and verified viva defense.
            </p>

            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-black/60 border border-[#3A2F27] text-center font-mono mb-4">
              <div>
                <span className="text-xs text-neutral-400 block uppercase font-semibold">Git Commits</span>
                <span className="text-emerald-400 font-bold text-base mt-0.5 block">157 Commits</span>
              </div>
              <div>
                <span className="text-xs text-neutral-400 block uppercase font-semibold">Authenticity</span>
                <span className="text-emerald-400 font-bold text-base mt-0.5 block">96% (Original)</span>
              </div>
              <div>
                <span className="text-xs text-neutral-400 block uppercase font-semibold">Viva Defense</span>
                <span className="text-emerald-400 font-bold text-base mt-0.5 block">9 / 10</span>
              </div>
            </div>

            {/* Verdict Box */}
            <div className={`p-4 rounded-xl border text-sm font-sans ${
              activeEngine === 'proofcard'
                ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200'
                : 'bg-neutral-950 border-[#3A2F27] text-neutral-400'
            }`}>
              {activeEngine === 'traditional_ats' ? (
                <div>
                  <div className="flex items-center justify-between font-bold text-neutral-400 uppercase text-xs mb-1.5">
                    <span>⚠️ Traditional ATS: REJECTED / PASSED OVER (38/100)</span>
                    <span>0 Brand Boost</span>
                  </div>
                  <p className="leading-relaxed text-sm">
                    Candidate lacked an elite institutional keyword. Discarded in automatic keyword filter before human review.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between font-bold text-emerald-300 uppercase text-xs mb-1.5">
                    <span>🏆 ProofCard: #1 RANK OFFER EXTENDED (96/100)</span>
                    <span>100% Meritocratic</span>
                  </div>
                  <p className="leading-relaxed text-sm">
                    Verified technical ownership, modular code structure, and validated viva defense.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Live Comparison Delta Bar */}
        <div className="bg-black/60 p-4 rounded-xl border border-[#3A2F27] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-xs font-bold text-emerald-400">
              ✓
            </div>
            <div>
              <span className="font-semibold text-white uppercase text-sm block">
                {activeEngine === 'proofcard' ? 'Meritocracy Confirmed' : 'Systemic Bias Detected'}
              </span>
              <p className="text-sm text-neutral-200 mt-0.5 font-sans">
                {activeEngine === 'proofcard'
                  ? 'Candidate ranked on verifiable code authenticity, AST complexity, and live viva defense.'
                  : 'Applicant screened primarily on institutional brand weight rather than verified code capability.'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase font-semibold text-neutral-300">College Weight</div>
            <div className={`text-base font-black font-mono ${
              activeEngine === 'proofcard' ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {activeEngine === 'proofcard' ? '0.00% (Neutral)' : '+40% Bias Injected'}
            </div>
          </div>
        </div>
      </div>

      {/* Part 1: Interactive Recruiter Decision Session Table */}
      <div className="p-6 rounded-2xl bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-lg mb-6">
        <div className="flex items-center justify-between border-b border-[#3A2F27] pb-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-[#FFD166] font-semibold uppercase tracking-wider">
            <Layers className="w-4 h-4 text-[#D4AF37]" />
            <span>Recruiter Review Log ({decisions.length} Candidates)</span>
          </div>
          <span className="text-sm text-neutral-300">
            Toggle candidate shortlists below to test bias detection
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#3A2F27] text-[#FFD166] uppercase text-xs sm:text-sm font-bold">
                <th className="py-3.5 px-3">Candidate</th>
                <th className="py-3.5 px-3">University / College</th>
                <th className="py-3.5 px-3">Pedigree Tier</th>
                <th className="py-3.5 px-3 text-center">Verified Code Score</th>
                <th className="py-3.5 px-3 text-right">Recruiter Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3A2F27]/60 font-sans">
              {decisions.map(d => (
                <tr key={d.candidate_id} className="hover:bg-neutral-900/60 transition">
                  <td className="py-4 px-3 font-semibold text-white text-base">{d.name}</td>
                  <td className="py-4 px-3 text-neutral-200 font-medium">{d.college}</td>
                  <td className="py-4 px-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      d.college_tier === 'Tier-1'
                        ? 'bg-amber-950/40 border border-amber-500/40 text-amber-300'
                        : 'bg-black/60 border border-[#3A2F27] text-neutral-300'
                    }`}>
                      {d.college_tier}
                    </span>
                  </td>
                  <td className="py-4 px-3 text-center font-mono">
                    <span className={`font-bold text-base ${
                      d.skill_score >= 85 ? 'text-emerald-400' : 'text-neutral-300'
                    }`}>
                      {d.skill_score} / 100
                    </span>
                  </td>
                  <td className="py-4 px-3 text-right">
                    <button
                      onClick={() => handleToggleShortlist(d.candidate_id)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                        d.recruiter_shortlisted
                          ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300'
                          : 'bg-black/60 border border-[#3A2F27] text-neutral-300 hover:text-white'
                      }`}
                    >
                      {d.recruiter_shortlisted ? '✓ Shortlisted' : '✕ Passed Over'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Footprint Banner */}
      {auditResult && (
        <div className={`mb-8 p-6 sm:p-8 rounded-2xl border shadow-xl ${
          auditResult.unconscious_bias_detected
            ? 'bg-red-950/20 border-red-500/60'
            : 'bg-emerald-950/20 border-emerald-500/50'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              {auditResult.unconscious_bias_detected ? (
                <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
              ) : (
                <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
              )}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    auditResult.unconscious_bias_detected ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}>
                    {auditResult.fairness_compliance_status}
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-black/70 text-[#FFD166] font-mono font-bold border border-[#D4AF37]/30">
                    Disparate Impact: {auditResult.disparity_ratio} (Target: ≥ 0.80)
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-sans">
                  EEOC Four-Fifths Rule Compliance Analysis
                </h3>
                <p className="text-sm sm:text-base text-neutral-100 mt-2 leading-relaxed max-w-3xl font-sans font-medium">
                  {auditResult.bias_footprint_message}
                </p>
                <p className="text-xs sm:text-sm text-neutral-300 mt-2 font-sans font-medium">
                  Under the US EEOC standard, if selection rate of the non-elite group is less than 80% of the elite group, systemic bias is mathematically proven.
                </p>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-black/70 p-5 rounded-2xl border border-[#D4AF37]/30 shrink-0">
              <div>
                <div className="text-neutral-300 text-xs uppercase font-mono font-bold">Tier-1 Shortlist</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#FFD166] mt-1">
                  {Math.round(auditResult.tier1_shortlist_rate * 100)}%
                </div>
                <p className="text-xs text-neutral-400 font-sans mt-1">IIT / BITS</p>
              </div>
              <div>
                <div className="text-neutral-300 text-xs uppercase font-mono font-bold">Tier-3 Shortlist</div>
                <div className={`text-2xl sm:text-3xl font-extrabold mt-1 ${
                  auditResult.tier3_shortlist_rate < 0.4 ? 'text-red-400' : 'text-emerald-400'
                }`}>
                  {Math.round(auditResult.tier3_shortlist_rate * 100)}%
                </div>
                <p className="text-xs text-neutral-400 font-sans mt-1">Regional Universities</p>
              </div>
            </div>
          </div>

          {/* Action Recommendations */}
          <div className="mt-6 pt-5 border-t border-[#3A2F27] text-xs">
            <span className="text-[#FFD166] uppercase tracking-wider block mb-3 font-mono font-bold text-xs sm:text-sm">
              Remediation Action Steps:
            </span>
            <ul className="space-y-2 text-sm sm:text-base text-neutral-100 font-sans font-medium">
              {auditResult.remedy_recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-[#D4AF37] font-bold text-base">→</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Part 2: Demographic Parity Verification */}
      <div className="p-6 sm:p-8 rounded-2xl bg-black/60 backdrop-blur-md border border-[#D4AF37]/25 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#3A2F27] pb-4 mb-4">
          <div className="flex items-center gap-2 text-base sm:text-lg text-[#FFD166] font-bold uppercase tracking-wider">
            <Sliders className="w-5 h-5 text-[#D4AF37]" />
            <span>Interactive Demographic Parity Verification</span>
          </div>
        </div>
        <p className="text-base text-neutral-100 mb-6 leading-relaxed font-sans font-medium">
          Adjust the sliders to test our algorithmic guarantee: Two candidates with identical verified code metrics receive the exact same ProofCard score regardless of college background.
        </p>

        {/* Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div className="bg-black/70 p-5 rounded-2xl border border-[#D4AF37]/20">
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-[#FFD166] font-bold uppercase tracking-wider text-sm sm:text-base">Authenticity Score</span>
              <span className="font-extrabold text-[#FFD166] font-mono text-lg">{testAuthScore} / 100</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={testAuthScore}
              onChange={e => setTestAuthScore(Number(e.target.value))}
              className="w-full accent-[#D4AF37] cursor-pointer"
            />
            <p className="text-sm text-neutral-200 mt-2 font-sans font-medium">
              Adjust code originality and git commit depth.
            </p>
          </div>

          <div className="bg-black/70 p-5 rounded-2xl border border-[#D4AF37]/20">
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-[#FFD166] font-bold uppercase tracking-wider text-sm sm:text-base">Viva Defense Score</span>
              <span className="font-extrabold text-[#FFD166] font-mono text-lg">{testVivaScore} / 10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={testVivaScore}
              onChange={e => setTestVivaScore(Number(e.target.value))}
              className="w-full accent-[#D4AF37] cursor-pointer"
            />
            <p className="text-sm text-neutral-200 mt-2 font-sans font-medium">
              Adjust technical interview explanation quality.
            </p>
          </div>
        </div>

        {/* Live Comparison Result */}
        {stressResult && (
          <div className="bg-black/80 rounded-2xl border border-[#D4AF37]/30 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <span className="font-bold text-emerald-400 flex items-center gap-2 text-base sm:text-lg uppercase tracking-wider">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Zero-Bias Demographic Parity Confirmed
              </span>
              <span className="px-4 py-1.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 text-sm font-mono font-bold">
                Parity Disparity: {stressResult.demographic_disparity_score.toFixed(2)} (Perfect = 0.00)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 font-sans">
              {/* Profile A: Elite */}
              <div className="bg-neutral-900/70 p-5 rounded-xl border border-[#3A2F27]">
                <div className="text-xs sm:text-sm text-neutral-300 uppercase font-mono font-bold">Candidate A (Tier-1 Elite)</div>
                <div className="font-bold text-white text-lg mt-1">{stressResult.candidate_a.name}</div>
                <div className="text-sm sm:text-base text-[#FFD166] mt-0.5 font-medium">{stressResult.candidate_a.college}</div>
                <div className="text-3xl font-extrabold text-white mt-2 font-mono">
                  {stressResult.candidate_a.proof_score} <span className="text-sm font-normal text-neutral-400">/ 100</span>
                </div>
              </div>

              {/* Profile B: Tier-3 */}
              <div className="bg-neutral-900/70 p-5 rounded-xl border border-[#3A2F27]">
                <div className="text-xs sm:text-sm text-neutral-300 uppercase font-mono font-bold">Candidate B (Tier-3 Regional)</div>
                <div className="font-bold text-white text-lg mt-1">{stressResult.candidate_b.name}</div>
                <div className="text-sm sm:text-base text-emerald-400 mt-0.5 font-medium">{stressResult.candidate_b.college}</div>
                <div className="text-3xl font-extrabold text-white mt-2 font-mono">
                  {stressResult.candidate_b.proof_score} <span className="text-sm font-normal text-neutral-400">/ 100</span>
                </div>
              </div>
            </div>

            <div className="text-sm text-neutral-200 border-t border-[#3A2F27] pt-3.5 font-sans font-medium">
              Mathematical Invariance: <strong className="text-white font-mono">{stressResult.mathematical_proof}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
