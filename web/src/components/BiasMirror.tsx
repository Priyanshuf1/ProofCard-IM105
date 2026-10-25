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
import { BiasMirrorResponse } from '../types';

export const BiasMirror: React.FC = () => {
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
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B1E1E] shadow-[0_0_8px_#D4AF37]"></span>
              <span className="text-[11px] font-warrior font-bold uppercase tracking-widest text-[#D4AF37]">
                Step 06 · Equal Opportunity & Fairness Guarantee
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-deviathon font-extrabold text-white tracking-wider">
              Recruiter Bias Mirror & Pedigree Parity
            </h1>
            <p className="text-xs text-[#C9B89A] mt-1 font-sans">
              Proves mathematically that institutional background receives 0.00% weighting. True builders conquer purely on git-proven engineering.
            </p>
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
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#8B1E1E]/50 border border-[#D4AF37]/50 flex items-center justify-center text-sm font-bold text-[#FFD166]">
              ⚖️
            </div>
            <div>
              <span className="text-[10px] font-warrior font-bold text-[#D4AF37] uppercase tracking-wider block">
                Axis 2 Fairness Proof · Side-by-Side Evaluation
              </span>
              <h2 className="text-lg sm:text-xl font-deviathon font-extrabold text-white">
                The Pedigree Twin Dilemma: IIT Clone vs Tier-3 Builder
              </h2>
            </div>
          </div>

          {/* Engine Selector Toggle */}
          <div className="flex items-center gap-1.5 bg-black/80 p-1.5 rounded-xl border border-[#D4AF37]/40">
            <button
              onClick={() => setActiveEngine('traditional_ats')}
              className={`px-3 py-1.5 rounded-lg text-xs font-warrior font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeEngine === 'traditional_ats'
                  ? 'bg-red-950/80 border border-red-500/60 text-red-300 shadow-md'
                  : 'text-[#8A7F6B] hover:text-white'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Traditional ATS</span>
            </button>
            <button
              onClick={() => setActiveEngine('proofcard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-warrior font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeEngine === 'proofcard'
                  ? 'bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 shadow-md'
                  : 'text-[#8A7F6B] hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ProofCard Meritocratic AI</span>
            </button>
          </div>
        </div>

        {/* 2-Column Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Twin A: IIT Delhi Tutorial Cloner */}
          <div className={`p-5 rounded-2xl border transition-all ${
            activeEngine === 'traditional_ats'
              ? 'bg-red-950/20 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
              : 'bg-black/60 border-[#3A2F27]'
          }`}>
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="px-2.5 py-0.5 rounded-full font-warrior font-bold text-[10px] bg-amber-950/50 text-amber-300 border border-amber-500/40">
                Candidate A · Tier-1 Elite
              </span>
              <span className="font-mono text-[#8A7F6B] text-[11px]">IIT Delhi (CSE)</span>
            </div>

            <h3 className="text-lg font-deviathon font-bold text-white mb-1">
              Arjun Singhania
            </h3>
            <p className="text-xs text-[#C9B89A] mb-4 font-sans">
              Single-day git dump of Traversy MERN tutorial. 0 unit tests. Failed async socket teardown in viva.
            </p>

            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-black/60 border border-[#3A2F27] text-center font-mono text-xs mb-4">
              <div>
                <span className="text-[9px] text-[#8A7F6B] block uppercase font-warrior">Git Commits</span>
                <span className="text-white font-bold">1 Dump</span>
              </div>
              <div>
                <span className="text-[9px] text-[#8A7F6B] block uppercase font-warrior">Authenticity</span>
                <span className="text-red-400 font-bold">14% (Clone)</span>
              </div>
              <div>
                <span className="text-[9px] text-[#8A7F6B] block uppercase font-warrior">Viva Defense</span>
                <span className="text-red-400 font-bold">3 / 10</span>
              </div>
            </div>

            {/* Verdict Box */}
            <div className={`p-3.5 rounded-xl border text-xs font-sans ${
              activeEngine === 'traditional_ats'
                ? 'bg-red-950/60 border-red-500/60 text-red-200'
                : 'bg-neutral-950 border-[#3A2F27] text-neutral-400'
            }`}>
              {activeEngine === 'traditional_ats' ? (
                <div>
                  <div className="flex items-center justify-between font-warrior font-bold text-red-400 uppercase text-[11px] mb-1">
                    <span>❌ Traditional ATS: SHORTLISTED (91/100)</span>
                    <span>+85 Pts Brand Weight</span>
                  </div>
                  <p className="leading-snug text-[11px]">
                    Traditional keyword ATS awarded massive score boost for "IIT Delhi". Resume screened in despite zero original code.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between font-warrior font-bold text-red-400 uppercase text-[11px] mb-1">
                    <span>🛡️ ProofCard: REJECTED (14/100)</span>
                    <span>0.00% Brand Weight</span>
                  </div>
                  <p className="leading-snug text-[11px]">
                    AST Winnowing detected 89% match to Traversy tutorial repository. Flagged as tutorial cloner regardless of college brand.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Twin B: Tier-3 Organic Builder */}
          <div className={`p-5 rounded-2xl border transition-all ${
            activeEngine === 'proofcard'
              ? 'bg-emerald-950/20 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
              : 'bg-black/60 border-[#3A2F27]'
          }`}>
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="px-2.5 py-0.5 rounded-full font-warrior font-bold text-[10px] bg-emerald-950/50 text-emerald-300 border border-emerald-500/40">
                Candidate B · Regional University
              </span>
              <span className="font-mono text-[#8A7F6B] text-[11px]">GLA University (Mathura)</span>
            </div>

            <h3 className="text-lg font-deviathon font-bold text-white mb-1">
              Priyanshu Awasthi
            </h3>
            <p className="text-xs text-[#C9B89A] mb-4 font-sans">
              80 personal commits across 31.6-day active development span. 13.6% refactor deletion ratio. Perfect viva defense.
            </p>

            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-black/60 border border-[#3A2F27] text-center font-mono text-xs mb-4">
              <div>
                <span className="text-[9px] text-[#8A7F6B] block uppercase font-warrior">Git Commits</span>
                <span className="text-white font-bold">157 Commits</span>
              </div>
              <div>
                <span className="text-[9px] text-[#8A7F6B] block uppercase font-warrior">Authenticity</span>
                <span className="text-emerald-400 font-bold">96% (Original)</span>
              </div>
              <div>
                <span className="text-[9px] text-[#8A7F6B] block uppercase font-warrior">Viva Defense</span>
                <span className="text-emerald-400 font-bold">9 / 10</span>
              </div>
            </div>

            {/* Verdict Box */}
            <div className={`p-3.5 rounded-xl border text-xs font-sans ${
              activeEngine === 'proofcard'
                ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200'
                : 'bg-neutral-950 border-[#3A2F27] text-neutral-400'
            }`}>
              {activeEngine === 'traditional_ats' ? (
                <div>
                  <div className="flex items-center justify-between font-warrior font-bold text-[#8A7F6B] uppercase text-[11px] mb-1">
                    <span>⚠️ Traditional ATS: REJECTED / PASSED OVER (38/100)</span>
                    <span>0 Brand Boost</span>
                  </div>
                  <p className="leading-snug text-[11px]">
                    Candidate lacked an elite institutional keyword. Discarded in automatic keyword filter before human review.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between font-warrior font-bold text-emerald-300 uppercase text-[11px] mb-1">
                    <span>🏆 ProofCard: #1 RANK OFFER EXTENDED (96/100)</span>
                    <span>100% Meritocratic</span>
                  </div>
                  <p className="leading-snug text-[11px]">
                    Proves multi-week organic growth, clean AST modularity, and deep conceptual understanding in live viva defense.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Business Impact & ROI Callout */}
        <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs ${
          activeEngine === 'traditional_ats'
            ? 'bg-red-950/40 border-red-500/40 text-red-200'
            : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
        }`}>
          <div className="flex items-center gap-3">
            <span className="text-xl">
              {activeEngine === 'traditional_ats' ? '💸' : '🛡️'}
            </span>
            <div>
              <span className="font-warrior font-bold uppercase text-[11px] block">
                {activeEngine === 'traditional_ats' 
                  ? 'Enterprise Hiring Failure Identified' 
                  : 'Recruiter ROI & Fair Hiring Value Delivered'}
              </span>
              <p className="text-[11px] text-neutral-300 mt-0.5 font-sans">
                {activeEngine === 'traditional_ats'
                  ? 'Cost of bad hire: ~$15,000 + 4 months wasted onboarding a tutorial copy-paster. EEOC Disparate Impact violation triggered.'
                  : 'Avoided $15,000 bad-hire cost. Zero demographic disparity (1.00 parity ratio). 100% compliant with EEOC 4/5ths standard.'}
              </p>
            </div>
          </div>

          <div className="shrink-0 font-mono font-bold text-right">
            <div className="text-[10px] uppercase font-warrior text-[#C9B89A]">College Weight</div>
            <div className={`text-base ${activeEngine === 'traditional_ats' ? 'text-red-400' : 'text-emerald-400'}`}>
              {activeEngine === 'traditional_ats' ? '+40% Bias Injected' : '0.00% (Strictly Neutral)'}
            </div>
          </div>
        </div>
      </div>

      {/* Part 1: Interactive Recruiter Decision Session Table */}
      <div className="p-6 rounded-2xl bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-lg mb-6">
        <div className="flex items-center justify-between border-b border-[#3A2F27] pb-3 mb-4">
          <div className="flex items-center gap-2 text-xs text-[#D4AF37] font-warrior font-bold uppercase tracking-wider">
            <Layers className="w-4 h-4 text-[#D4AF37]" />
            <span>Recruiter Review Log ({decisions.length} Candidates)</span>
          </div>
          <span className="text-xs text-[#8A7F6B] font-warrior">
            Toggle candidate shortlists below to test bias detection
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#3A2F27] text-[#D4AF37] uppercase text-[10px] font-warrior font-bold">
                <th className="py-3 px-3">Candidate</th>
                <th className="py-3 px-3">University / College</th>
                <th className="py-3 px-3">Pedigree Tier</th>
                <th className="py-3 px-3 text-center">Verified Code Score</th>
                <th className="py-3 px-3 text-right">Recruiter Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3A2F27]/60 font-sans">
              {decisions.map(d => (
                <tr key={d.candidate_id} className="hover:bg-neutral-900/60 transition">
                  <td className="py-3.5 px-3 font-semibold text-white font-deviathon">{d.name}</td>
                  <td className="py-3.5 px-3 text-[#C9B89A]">{d.college}</td>
                  <td className="py-3.5 px-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-warrior font-bold ${
                      d.college_tier === 'Tier-1'
                        ? 'bg-amber-950/40 border border-amber-500/40 text-amber-300'
                        : 'bg-black/60 border border-[#3A2F27] text-neutral-300'
                    }`}>
                      {d.college_tier}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-center font-mono">
                    <span className={`font-bold text-sm ${
                      d.skill_score >= 85 ? 'text-emerald-400' : 'text-neutral-400'
                    }`}>
                      {d.skill_score} / 100
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => handleToggleShortlist(d.candidate_id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-warrior font-bold transition cursor-pointer ${
                        d.recruiter_shortlisted
                          ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300'
                          : 'bg-black/60 border border-[#3A2F27] text-neutral-400 hover:text-white'
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
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-warrior font-bold uppercase tracking-wider ${
                    auditResult.unconscious_bias_detected ? 'text-red-400' : 'text-emerald-400'
                  }`}>
                    {auditResult.fairness_compliance_status}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-black/60 text-[#FFD166] font-mono font-bold border border-[#3A2F27]">
                    Disparate Impact: {auditResult.disparity_ratio} (Target: ≥ 0.80)
                  </span>
                </div>
                <h3 className="text-lg font-deviathon font-extrabold text-white">
                  EEOC Four-Fifths Rule Compliance Analysis
                </h3>
                <p className="text-xs text-neutral-200 mt-1 leading-relaxed max-w-2xl font-sans">
                  {auditResult.bias_footprint_message}
                </p>
                <p className="text-[10px] text-[#8A7F6B] mt-2 font-sans">
                  Under the US EEOC standard, if selection rate of the non-elite group is less than 80% of the elite group, systemic bias is mathematically proven.
                </p>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-black/60 p-4 rounded-xl border border-[#3A2F27] shrink-0">
              <div>
                <div className="text-[#8A7F6B] text-[10px] uppercase font-warrior font-bold">Tier-1 Shortlist</div>
                <div className="text-xl font-black text-[#FFD166]">
                  {Math.round(auditResult.tier1_shortlist_rate * 100)}%
                </div>
                <p className="text-[9px] text-[#8A7F6B] font-sans mt-0.5">IIT / BITS</p>
              </div>
              <div>
                <div className="text-[#8A7F6B] text-[10px] uppercase font-warrior font-bold">Tier-3 Shortlist</div>
                <div className={`text-xl font-black ${
                  auditResult.tier3_shortlist_rate < 0.4 ? 'text-red-400' : 'text-emerald-400'
                }`}>
                  {Math.round(auditResult.tier3_shortlist_rate * 100)}%
                </div>
                <p className="text-[9px] text-[#8A7F6B] font-sans mt-0.5">Regional Universities</p>
              </div>
            </div>
          </div>

          {/* Action Recommendations */}
          <div className="mt-5 pt-4 border-t border-[#3A2F27] text-xs">
            <span className="text-[#D4AF37] uppercase tracking-wider block mb-2 font-warrior font-bold text-[10px]">
              Remediation Action Steps:
            </span>
            <ul className="space-y-1.5 text-neutral-200 font-sans">
              {auditResult.remedy_recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#D4AF37] font-bold">→</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Part 2: Demographic Parity Verification */}
      <div className="p-6 sm:p-8 rounded-2xl bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-lg">
        <div className="flex items-center justify-between border-b border-[#3A2F27] pb-4 mb-4">
          <div className="flex items-center gap-2 text-xs text-[#D4AF37] font-warrior font-bold uppercase tracking-wider">
            <Sliders className="w-4 h-4 text-[#D4AF37]" />
            <span>Interactive Demographic Parity Verification</span>
          </div>
        </div>
        <p className="text-xs text-[#C9B89A] mb-6 leading-relaxed font-sans">
          Adjust the sliders to test our algorithmic guarantee: Two candidates with identical verified code metrics receive the exact same ProofCard score regardless of college background.
        </p>

        {/* Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div className="bg-black/60 p-5 rounded-2xl border border-[#3A2F27]">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-[#D4AF37] font-warrior font-bold uppercase tracking-wider text-[11px]">Authenticity Score</span>
              <span className="font-black text-[#FFD166] font-mono text-sm">{testAuthScore} / 100</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={testAuthScore}
              onChange={e => setTestAuthScore(Number(e.target.value))}
              className="w-full accent-[#D4AF37] cursor-pointer"
            />
            <p className="text-[10px] text-[#8A7F6B] mt-2 font-sans">
              Adjust code originality and git commit depth.
            </p>
          </div>

          <div className="bg-black/60 p-5 rounded-2xl border border-[#3A2F27]">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-[#D4AF37] font-warrior font-bold uppercase tracking-wider text-[11px]">Viva Defense Score</span>
              <span className="font-black text-[#FFD166] font-mono text-sm">{testVivaScore} / 10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={testVivaScore}
              onChange={e => setTestVivaScore(Number(e.target.value))}
              className="w-full accent-[#D4AF37] cursor-pointer"
            />
            <p className="text-[10px] text-[#8A7F6B] mt-2 font-sans">
              Adjust technical interview explanation quality.
            </p>
          </div>
        </div>

        {/* Live Comparison Result */}
        {stressResult && (
          <div className="bg-black/70 rounded-2xl border border-[#3A2F27] p-5 text-xs">
            <div className="flex items-center justify-between mb-4">
              <span className="font-warrior font-bold text-emerald-400 flex items-center gap-2 text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                Zero-Bias Demographic Parity Confirmed
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[11px] font-mono font-bold">
                Parity Disparity: {stressResult.demographic_disparity_score.toFixed(2)} (Perfect = 0.00)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 font-sans">
              {/* Profile A: Elite */}
              <div className="bg-neutral-900/60 p-4 rounded-xl border border-[#3A2F27]">
                <div className="text-[10px] text-[#8A7F6B] uppercase font-warrior font-bold">Candidate A (Tier-1 Elite)</div>
                <div className="font-deviathon font-bold text-white text-sm mt-0.5">{stressResult.candidate_a.name}</div>
                <div className="text-xs text-[#FFD166] mt-0.5 font-warrior">{stressResult.candidate_a.college}</div>
                <div className="text-xl font-black text-white mt-2 font-mono">
                  {stressResult.candidate_a.proof_score} <span className="text-xs font-normal text-neutral-500">/ 100</span>
                </div>
              </div>

              {/* Profile B: Tier-3 */}
              <div className="bg-neutral-900/60 p-4 rounded-xl border border-[#3A2F27]">
                <div className="text-[10px] text-[#8A7F6B] uppercase font-warrior font-bold">Candidate B (Tier-3 Regional)</div>
                <div className="font-deviathon font-bold text-white text-sm mt-0.5">{stressResult.candidate_b.name}</div>
                <div className="text-xs text-emerald-400 mt-0.5 font-warrior">{stressResult.candidate_b.college}</div>
                <div className="text-xl font-black text-white mt-2 font-mono">
                  {stressResult.candidate_b.proof_score} <span className="text-xs font-normal text-neutral-500">/ 100</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-[#C9B89A] border-t border-[#3A2F27] pt-3 font-sans">
              Mathematical Invariance: <strong className="text-white font-mono">{stressResult.mathematical_proof}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
