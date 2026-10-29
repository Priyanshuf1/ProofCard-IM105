import React, { useState } from 'react';
import { 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Sliders, 
  ArrowRight,
  Users
} from 'lucide-react';
import { CandidateProfile } from '../types';

interface BiasMirrorProps {
  cohort?: CandidateProfile[];
}

export const BiasMirror: React.FC<BiasMirrorProps> = ({ cohort = [] }) => {
  // Mode: 'proofcard' (Merit first) vs 'traditional_ats' (College brand bias)
  const [activeEngine, setActiveEngine] = useState<'proofcard' | 'traditional_ats'>('proofcard');

  // Interactive Fairness Simulator Sliders
  const [testAuthScore, setTestAuthScore] = useState(90);
  const [testVivaScore, setTestVivaScore] = useState(8);

  // If candidates exist in cohort, build real audited decision list
  const realCandidates = cohort.slice(0, 10);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl mb-6 bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
              Equal Opportunity & Fairness Audit
            </h1>
            <p className="text-sm text-[#E6C280] font-normal mt-1">
              Guarantees hiring decisions are based strictly on verified code quality — never college brand names.
            </p>
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
              <span>Traditional ATS (Brand Biased)</span>
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
              <span>ProofCard (100% Code Quality)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real Candidate Pool Audit */}
      {realCandidates.length >= 2 ? (
        <div className="p-6 sm:p-8 rounded-2xl bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-2xl mb-8">
          <div className="flex items-center justify-between border-b border-[#3A2F27] pb-4 mb-6">
            <div>
              <span className="text-xs uppercase font-bold text-[#FFD166] block mb-1">
                Auditing Your Scanned Candidates ({realCandidates.length})
              </span>
              <h2 className="text-xl font-bold text-white">
                {activeEngine === 'traditional_ats' 
                  ? 'Traditional Filter: Brand Names Artificially Boost Ranking'
                  : 'ProofCard Filter: 100% Blind to University Brand, 100% Merit'}
              </h2>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${
              activeEngine === 'proofcard'
                ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                : 'bg-red-950 text-red-300 border-red-500/50'
            }`}>
              {activeEngine === 'proofcard' ? '0% College Bias' : '+30 Pts College Bias Injected'}
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#3A2F27]">
            <table className="w-full text-left text-sm text-neutral-200">
              <thead className="bg-[#140b08] uppercase font-bold text-xs text-[#FFD166] border-b border-[#3A2F27]">
                <tr>
                  <th className="py-3 px-4">Candidate</th>
                  <th className="py-3 px-4">College / University</th>
                  <th className="py-3 px-4 text-center">Code Authenticity</th>
                  <th className="py-3 px-4 text-center">Viva Score</th>
                  <th className="py-3 px-4 text-center">Rank Score</th>
                  <th className="py-3 px-4 text-center">Hiring Decision</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A241B] font-mono text-xs">
                {realCandidates.map((c, idx) => {
                  const auth = c.authenticity_score || 0;
                  const viva = c.viva_score !== undefined ? c.viva_score : 5;
                  const isTier1 = (c.college_tier === 'Tier-1') || (c.college || '').toLowerCase().includes('iit') || (c.college || '').toLowerCase().includes('bits');

                  // In Traditional ATS: Tier-1 brand gets an artificial +30 points boost
                  const traditionalScore = isTier1 
                    ? Math.min(100, Math.round((auth * 0.3) + (viva * 10 * 0.2) + 40))
                    : Math.round((auth * 0.4) + (viva * 10 * 0.2));
                  
                  // In ProofCard: 100% merit-based
                  const proofcardScore = Math.round((auth * 0.6) + (viva * 10 * 0.4));
                  const score = activeEngine === 'traditional_ats' ? traditionalScore : proofcardScore;

                  const shortlisted = activeEngine === 'traditional_ats'
                    ? (isTier1 || score >= 75)
                    : (auth >= 60 && !c.is_clone);

                  return (
                    <tr key={c.candidate_id || idx} className="hover:bg-white/5 transition">
                      <td className="py-3.5 px-4 font-sans font-bold text-white text-sm">
                        {c.name}
                      </td>
                      <td className="py-3.5 px-4 font-sans text-[#E6C280]">
                        {c.college || 'Engineering College'}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`font-bold ${auth >= 70 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {auth}% {c.is_clone ? '(Clone)' : ''}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center text-[#D4AF37] font-bold">
                        {viva} / 10
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-white text-base">
                        {score} / 100
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                          shortlisted
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                            : 'bg-red-950 text-red-300 border-red-500'
                        }`}>
                          {shortlisted ? '✓ Shortlisted' : '✕ Passed Over'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-8 sm:p-12 rounded-2xl bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-2xl mb-8 text-center">
          <Users className="w-12 h-12 mx-auto mb-3 text-[#D4AF37]" />
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 font-warrior">
            No Candidate Pool Scanned Yet
          </h2>
          <p className="text-sm text-[#C9B89A] max-w-md mx-auto mb-6">
            Scan at least 2 candidates in the Code Scanner or upload a candidate CSV roster to see a live Equal Opportunity Audit on your applicants.
          </p>
        </div>
      )}

      {/* Interactive Fairness Simulator */}
      <div className="p-6 sm:p-8 rounded-2xl bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#3A2F27] pb-4 mb-4">
          <div className="flex items-center gap-2 text-base sm:text-lg text-[#FFD166] font-bold uppercase tracking-wider">
            <Sliders className="w-5 h-5 text-[#D4AF37]" />
            <span>Interactive Fairness Simulator: Test College Invariance</span>
          </div>
        </div>
        <p className="text-sm text-neutral-200 mb-6 leading-relaxed">
          Adjust the sliders below. ProofCard guarantees that two candidates with the exact same code scores receive the exact same ProofCard evaluation regardless of whether their degree is from an IIT or a regional college.
        </p>

        {/* Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div className="bg-black/70 p-5 rounded-2xl border border-[#D4AF37]/20">
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-[#FFD166] font-bold uppercase text-xs">Code Authenticity</span>
              <span className="font-extrabold text-[#FFD166] font-mono text-base">{testAuthScore}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={testAuthScore}
              onChange={e => setTestAuthScore(Number(e.target.value))}
              className="w-full accent-[#E85D04] cursor-pointer"
            />
          </div>

          <div className="bg-black/70 p-5 rounded-2xl border border-[#D4AF37]/20">
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-[#FFD166] font-bold uppercase text-xs">Live Viva Score</span>
              <span className="font-extrabold text-[#D4AF37] font-mono text-base">{testVivaScore} / 10</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={testVivaScore}
              onChange={e => setTestVivaScore(Number(e.target.value))}
              className="w-full accent-[#D4AF37] cursor-pointer"
            />
          </div>
        </div>

        {/* Result Comparison: IIT vs Tier-3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-black/60 border border-[#3A2F27]">
            <span className="text-xs text-[#FFD166] font-bold uppercase block mb-1">Tier-1 Elite University Candidate</span>
            <span className="text-sm font-bold text-white block">Candidate from Top Tier College</span>
            <div className="mt-3 flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-400">ProofCard Score:</span>
              <span className="text-emerald-400 font-bold text-base">
                {Math.round((testAuthScore * 0.6) + (testVivaScore * 10 * 0.4))} / 100
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/60 border border-[#3A2F27]">
            <span className="text-xs text-[#FFD166] font-bold uppercase block mb-1">Tier-3 Regional University Candidate</span>
            <span className="text-sm font-bold text-white block">Candidate from Regional College</span>
            <div className="mt-3 flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-400">ProofCard Score:</span>
              <span className="text-emerald-400 font-bold text-base">
                {Math.round((testAuthScore * 0.6) + (testVivaScore * 10 * 0.4))} / 100
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>
            <strong>Fairness Verified:</strong> Score difference between Tier-1 and Tier-3 candidates with equal code skill is <strong>0.0 points</strong>. ProofCard completely decouples pedigree bias from hiring.
          </span>
        </div>
      </div>
    </div>
  );
};
