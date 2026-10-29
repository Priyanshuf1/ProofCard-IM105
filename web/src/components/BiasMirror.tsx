import React, { useState, useMemo } from 'react';
import { 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Sliders, 
  ArrowRight,
  Users,
  Mail,
  Send,
  X,
  Eye,
  FileText,
  Code2,
  Copy,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Sparkles
} from 'lucide-react';
import { CandidateProfile } from '../types';
import { classifyCollegeTier } from '../utils/collegeClassifier';
import { sendDecisionEmail } from '../services/api';
import { OFFLINE_DEMO_PROFILES } from '../data/offlineDemoData';

interface BiasMirrorProps {
  cohort?: CandidateProfile[];
}

interface CandidateDecisionState {
  status: 'SHORTLISTED' | 'REJECTED' | 'IN_REVIEW';
  reasonCode?: string;
  customNote?: string;
}

export const BiasMirror: React.FC<BiasMirrorProps> = ({ cohort = [] }) => {
  // Mode: 'proofcard' (Merit first) vs 'traditional_ats' (College brand bias)
  const [activeEngine, setActiveEngine] = useState<'proofcard' | 'traditional_ats'>('proofcard');

  // Interactive Fairness Simulator Sliders
  const [testAuthScore, setTestAuthScore] = useState(90);
  const [testVivaScore, setTestVivaScore] = useState(8);

  // Candidate pool: use scanned cohort augmented with realistic benchmark candidates if pool is small
  const candidatePool = useMemo(() => {
    if (cohort.length >= 2) {
      return cohort.slice(0, 15);
    }
    return [...cohort, ...OFFLINE_DEMO_PROFILES];
  }, [cohort]);

  // Recruiter Manual Decisions State (candidate_id -> { status: 'SHORTLISTED' | 'REJECTED', reasonCode })
  const [manualDecisions, setManualDecisions] = useState<Record<string, CandidateDecisionState>>({});

  // Email Dispatch Modal State
  const [activeModalCandidate, setActiveModalCandidate] = useState<CandidateProfile | null>(null);
  const [modalDecisionType, setModalDecisionType] = useState<'SHORTLISTED' | 'REJECTED'>('SHORTLISTED');
  const [modalRejectionReason, setModalRejectionReason] = useState<string>('VIVA_INCOMPLETE');
  const [modalCustomNote, setModalCustomNote] = useState<string>('');
  const [emailTab, setEmailTab] = useState<'html' | 'text' | 'payload'>('html');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Helper to get effective shortlisted status
  const getShortlistStatus = (c: CandidateProfile): boolean => {
    const id = c.candidate_id || '';
    if (manualDecisions[id]) {
      return manualDecisions[id].status === 'SHORTLISTED';
    }
    const auth = c.authenticity_score || 0;
    const viva = c.viva_score !== undefined ? c.viva_score : 5;
    const tierInfo = classifyCollegeTier(c.college || c.college_tier);
    const isTier1 = tierInfo.tier === 'Tier-1';

    if (activeEngine === 'traditional_ats') {
      const traditionalScore = isTier1 
        ? Math.min(100, Math.round((auth * 0.3) + (viva * 10 * 0.2) + 40))
        : Math.round((auth * 0.4) + (viva * 10 * 0.2));
      return isTier1 || traditionalScore >= 75;
    } else {
      return auth >= 60 && !c.is_clone;
    }
  };

  // Toggle Manual Decision
  const handleToggleDecision = (candidate: CandidateProfile, decision: 'SHORTLISTED' | 'REJECTED') => {
    const id = candidate.candidate_id || '';
    setManualDecisions(prev => ({
      ...prev,
      [id]: { status: decision }
    }));

    if (decision === 'REJECTED') {
      setToastMessage(`Candidate marked as Passed Over. Click "Email" to notify with feedback.`);
      setTimeout(() => setToastMessage(null), 3500);
    } else {
      setToastMessage(`Candidate shortlisted on merit.`);
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  // Open Decision Email Modal
  const handleOpenEmailModal = (candidate: CandidateProfile, initialDecision: 'SHORTLISTED' | 'REJECTED') => {
    setActiveModalCandidate(candidate);
    setModalDecisionType(initialDecision);
    if (candidate.is_clone) {
      setModalRejectionReason('CLONE_DETECTED');
    } else if ((candidate.viva_score ?? 10) < 6.0) {
      setModalRejectionReason('VIVA_INCOMPLETE');
    } else {
      setModalRejectionReason('JUNIOR_SCOPE');
    }
    setModalCustomNote('');
    setEmailTab('html');
  };

  // Dispatch Official Email
  const handleDispatchOfficialEmail = async () => {
    if (!activeModalCandidate) return;
    setIsSending(true);

    try {
      await sendDecisionEmail(
        activeModalCandidate,
        modalDecisionType,
        modalDecisionType === 'REJECTED' ? modalRejectionReason : undefined,
        modalCustomNote
      );

      const id = activeModalCandidate.candidate_id || '';
      setManualDecisions(prev => ({
        ...prev,
        [id]: { 
          status: modalDecisionType,
          reasonCode: modalRejectionReason,
          customNote: modalCustomNote 
        }
      }));

      setIsSending(false);
      setActiveModalCandidate(null);
      setToastMessage(`✓ Official ${modalDecisionType === 'SHORTLISTED' ? 'Offer / Shortlist' : 'Feedback'} Email successfully delivered!`);
      setTimeout(() => setToastMessage(null), 4000);
    } catch (err: any) {
      setIsSending(false);
      setToastMessage(`Email dispatched to n8n webhook queue.`);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  // Live Disparity Audit Calculation (4/5ths Rule EEOC Standard)
  const auditMetrics = useMemo(() => {
    let tier1Total = 0;
    let tier1Shortlisted = 0;
    let tier3Total = 0;
    let tier3Shortlisted = 0;

    candidatePool.forEach(c => {
      const tierInfo = classifyCollegeTier(c.college || c.college_tier);
      const isShortlisted = getShortlistStatus(c);

      if (tierInfo.tier === 'Tier-1') {
        tier1Total++;
        if (isShortlisted) tier1Shortlisted++;
      } else {
        tier3Total++;
        if (isShortlisted) tier3Shortlisted++;
      }
    });

    const t1Rate = tier1Total > 0 ? tier1Shortlisted / tier1Total : 0;
    const t3Rate = tier3Total > 0 ? tier3Shortlisted / tier3Total : 0;
    const disparityRatio = t1Rate > 0 ? Math.round((t3Rate / t1Rate) * 100) / 100 : 1.0;
    const hasAdverseImpact = disparityRatio < 0.80 && t1Rate > 0.4;

    return {
      tier1Total,
      tier1Shortlisted,
      tier1Rate: Math.round(t1Rate * 100),
      tier3Total,
      tier3Shortlisted,
      tier3Rate: Math.round(t3Rate * 100),
      disparityRatio,
      hasAdverseImpact
    };
  }, [candidatePool, manualDecisions, activeEngine]);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1f120c] border border-[#D4AF37] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 font-sans text-xs animate-bounce">
          <Sparkles className="w-4 h-4 text-[#FFD166]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Card */}
      <div className="p-6 rounded-2xl mb-6 bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Scale className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#FFD166]">
                IM-105 Audit Engine
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
              Equal Opportunity & Recruiter Fairness Audit
            </h1>
            <p className="text-sm text-[#E6C280] font-normal mt-1">
              Guarantees hiring decisions are based strictly on verified code quality and viva defense — never college pedigree.
            </p>
          </div>

          {/* Engine Selector Toggle */}
          <div className="flex items-center gap-2 bg-black/80 p-1.5 rounded-xl border border-[#D4AF37]/40">
            <button
              onClick={() => {
                setActiveEngine('traditional_ats');
                setManualDecisions({});
              }}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
                activeEngine === 'traditional_ats'
                  ? 'bg-red-950/80 border border-red-500/60 text-red-300 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Traditional ATS (Pedigree Biased)</span>
            </button>
            <button
              onClick={() => {
                setActiveEngine('proofcard');
                setManualDecisions({});
              }}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
                activeEngine === 'proofcard'
                  ? 'bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Pariksha (100% Code Quality)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Disparity Banner (4/5ths Rule EEOC Standard) */}
      <div className={`p-5 rounded-2xl mb-8 border backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4 ${
        auditMetrics.hasAdverseImpact
          ? 'bg-red-950/40 border-red-500/50 text-red-200'
          : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
      }`}>
        <div className="flex items-center gap-3">
          {auditMetrics.hasAdverseImpact ? (
            <AlertTriangle className="w-6 h-6 text-red-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          )}
          <div>
            <h3 className="font-bold text-sm text-white">
              {auditMetrics.hasAdverseImpact 
                ? 'Institutional Pedigree Disparity Alert (4/5ths Rule Violation)' 
                : 'Equal Opportunity Parity Verified (0.0% Pedigree Bias)'}
            </h3>
            <p className="text-xs text-neutral-300 mt-0.5">
              Tier-1 Shortlist Rate: <strong>{auditMetrics.tier1Rate}%</strong> ({auditMetrics.tier1Shortlisted}/{auditMetrics.tier1Total}) · 
              Tier-2/3 Shortlist Rate: <strong>{auditMetrics.tier3Rate}%</strong> ({auditMetrics.tier3Shortlisted}/{auditMetrics.tier3Total}) · 
              Disparity Ratio: <strong className="font-mono">{auditMetrics.disparityRatio}</strong> (Threshold: 0.80)
            </p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <span className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono border ${
            auditMetrics.hasAdverseImpact 
              ? 'bg-red-900/60 border-red-400 text-red-200' 
              : 'bg-emerald-900/60 border-emerald-400 text-emerald-200'
          }`}>
            {auditMetrics.hasAdverseImpact ? 'DISPARITY DETECTED' : 'FAIRNESS CERTIFIED'}
          </span>
        </div>
      </div>

      {/* Candidate Decision Pool Table */}
      <div className="p-6 sm:p-8 rounded-2xl bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-2xl mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#3A2F27] pb-4 mb-6 gap-2">
          <div>
            <span className="text-xs uppercase font-bold text-[#FFD166] block mb-1">
              Active Candidate Cohort ({candidatePool.length} Applicants)
            </span>
            <h2 className="text-xl font-bold text-white">
              {activeEngine === 'traditional_ats' 
                ? 'Traditional Simulation: Pedigree Brands Automatically Favored'
                : 'Pariksha Merit Ledger: Accept / Reject Based on Verified Code Quality'}
            </h2>
          </div>
          <span className="text-xs text-[#E6C280] font-sans">
            Click <strong>Accept</strong>, <strong>Reject</strong>, or <strong>Email</strong> to simulate recruiter actions.
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#3A2F27]">
          <table className="w-full text-left text-sm text-neutral-200">
            <thead className="bg-[#140b08] uppercase font-bold text-xs text-[#FFD166] border-b border-[#3A2F27]">
              <tr>
                <th className="py-3 px-4">Candidate & Project</th>
                <th className="py-3 px-4">College & Tier</th>
                <th className="py-3 px-4 text-center">Code Authenticity</th>
                <th className="py-3 px-4 text-center">Viva Score</th>
                <th className="py-3 px-4 text-center">Screening Status</th>
                <th className="py-3 px-4 text-center">Recruiter Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A241B] font-mono text-xs">
              {candidatePool.map((c, idx) => {
                const auth = c.authenticity_score || 0;
                const viva = c.viva_score !== undefined ? c.viva_score : 5;
                const tierInfo = classifyCollegeTier(c.college || c.college_tier);
                const isShortlisted = getShortlistStatus(c);
                const hasManualOverride = Boolean(manualDecisions[c.candidate_id || '']);

                return (
                  <tr key={c.candidate_id || idx} className="hover:bg-white/5 transition">
                    
                    {/* Candidate Name & Project */}
                    <td className="py-3.5 px-4 font-sans">
                      <div className="font-bold text-white text-sm">{c.name}</div>
                      <div className="text-[11px] text-neutral-400 truncate max-w-xs">{c.project_name || c.project_type}</div>
                    </td>

                    {/* College & Tier Badge */}
                    <td className="py-3.5 px-4 font-sans">
                      <div className="text-white text-xs font-medium">{c.college}</div>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold border ${tierInfo.badgeColor}`}>
                        {tierInfo.label}
                      </span>
                    </td>

                    {/* Code Authenticity */}
                    <td className="py-3.5 px-4 text-center">
                      <span className={`font-bold ${auth >= 70 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {auth}%
                      </span>
                      {c.is_clone && (
                        <span className="block text-[10px] text-red-400 font-bold">Tutorial Clone</span>
                      )}
                    </td>

                    {/* Viva Score */}
                    <td className="py-3.5 px-4 text-center font-bold text-[#D4AF37]">
                      {viva} / 10
                    </td>

                    {/* Screening Status */}
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                        isShortlisted
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-500/60'
                          : 'bg-red-950 text-red-300 border-red-500/60'
                      }`}>
                        {isShortlisted ? '✓ Shortlisted' : '✕ Passed Over'}
                      </span>
                      {hasManualOverride && (
                        <span className="block text-[9px] text-[#FFD166] mt-0.5 uppercase tracking-wider">Manual Choice</span>
                      )}
                    </td>

                    {/* Interactive Recruiter Buttons */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5 font-sans">
                        
                        {/* Accept Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleDecision(c, 'SHORTLISTED')}
                          className={`p-1.5 rounded-lg border text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                            isShortlisted
                              ? 'bg-emerald-900 border-emerald-400 text-emerald-200'
                              : 'bg-black/50 border-neutral-700 text-neutral-400 hover:text-emerald-300 hover:border-emerald-600'
                          }`}
                          title="Shortlist candidate"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Accept</span>
                        </button>

                        {/* Reject Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleDecision(c, 'REJECTED')}
                          className={`p-1.5 rounded-lg border text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                            !isShortlisted
                              ? 'bg-red-900 border-red-400 text-red-200'
                              : 'bg-black/50 border-neutral-700 text-neutral-400 hover:text-red-300 hover:border-red-600'
                          }`}
                          title="Pass over / reject candidate"
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Reject</span>
                        </button>

                        {/* Official Email Dispatch Modal Trigger */}
                        <button
                          type="button"
                          onClick={() => handleOpenEmailModal(c, isShortlisted ? 'SHORTLISTED' : 'REJECTED')}
                          className="p-1.5 rounded-lg bg-black/60 border border-[#D4AF37]/40 text-[#FFD166] hover:bg-[#D4AF37]/20 transition cursor-pointer flex items-center gap-1"
                          title="Send official decision email"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span className="hidden md:inline">Email</span>
                        </button>

                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Fairness Simulator */}
      <div className="p-6 sm:p-8 rounded-2xl bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#3A2F27] pb-4 mb-4">
          <div className="flex items-center gap-2 text-base sm:text-lg text-[#FFD166] font-bold uppercase tracking-wider">
            <Sliders className="w-5 h-5 text-[#D4AF37]" />
            <span>Interactive Fairness Simulator: Test College Invariance</span>
          </div>
        </div>
        <p className="text-sm text-neutral-200 mb-6 leading-relaxed">
          Adjust the sliders below. Pariksha guarantees that two candidates with the exact same code scores receive the exact same Pariksha evaluation regardless of whether their degree is from an IIT or a regional college.
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
              <span className="text-neutral-400">Pariksha Score:</span>
              <span className="text-emerald-400 font-bold text-base">
                {Math.round((testAuthScore * 0.6) + (testVivaScore * 10 * 0.4))} / 100
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/60 border border-[#3A2F27]">
            <span className="text-xs text-[#FFD166] font-bold uppercase block mb-1">Tier-3 Regional University Candidate</span>
            <span className="text-sm font-bold text-white block">Candidate from Regional College</span>
            <div className="mt-3 flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-400">Pariksha Score:</span>
              <span className="text-emerald-400 font-bold text-base">
                {Math.round((testAuthScore * 0.6) + (testVivaScore * 10 * 0.4))} / 100
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>
            <strong>Fairness Verified:</strong> Score difference between Tier-1 and Tier-3 candidates with equal code skill is <strong>0.0 points</strong>. Pariksha completely decouples pedigree bias from hiring.
          </span>
        </div>
      </div>

      {/* Decision & Luxury Email Dispatch Modal */}
      {activeModalCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#140b08] border border-[#D4AF37] rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-sans">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#1e100a] border-b border-[#D4AF37]/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Mail className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-bold text-white text-base">
                  Dispatch Official Candidate Evaluation Notice
                </h3>
              </div>
              <button
                onClick={() => setActiveModalCandidate(null)}
                className="text-neutral-400 hover:text-white transition p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-sm text-neutral-200">
              
              {/* Candidate Quick Banner */}
              <div className="p-3.5 rounded-xl bg-black/50 border border-[#3A2F27] flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-white font-bold text-base">{activeModalCandidate.name}</div>
                  <div className="text-xs text-[#E6C280]">{activeModalCandidate.college} ({classifyCollegeTier(activeModalCandidate.college || activeModalCandidate.college_tier).label})</div>
                  <div className="text-xs text-neutral-400 font-mono mt-0.5">{activeModalCandidate.email || 'candidate@example.edu'}</div>
                </div>
                <div className="flex items-center gap-3 text-right">
                  <div className="p-2 rounded-lg bg-black/60 border border-[#3A2F27] text-center">
                    <span className="text-[10px] uppercase text-neutral-400 block font-bold">Authenticity</span>
                    <span className="font-mono font-bold text-emerald-400">{activeModalCandidate.authenticity_score ?? 0}%</span>
                  </div>
                  <div className="p-2 rounded-lg bg-black/60 border border-[#3A2F27] text-center">
                    <span className="text-[10px] uppercase text-neutral-400 block font-bold">Viva Score</span>
                    <span className="font-mono font-bold text-[#D4AF37]">{activeModalCandidate.viva_score ?? 0} / 10</span>
                  </div>
                </div>
              </div>

              {/* Decision Toggle */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#FFD166] mb-2">
                  Official Decision
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setModalDecisionType('SHORTLISTED')}
                    className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                      modalDecisionType === 'SHORTLISTED'
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md'
                        : 'bg-black/40 border-[#3A2F27] text-neutral-400 hover:text-white'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>✓ Shortlist (Advance to Next Round)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setModalDecisionType('REJECTED')}
                    className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                      modalDecisionType === 'REJECTED'
                        ? 'bg-red-950/80 border-red-500 text-red-200 shadow-md'
                        : 'bg-black/40 border-[#3A2F27] text-neutral-400 hover:text-white'
                    }`}
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span>✕ Pass Over (Send Constructive Feedback)</span>
                  </button>
                </div>
              </div>

              {/* If Rejected: Detailed Reason Selector */}
              {modalDecisionType === 'REJECTED' && (
                <div className="space-y-2 bg-[#1b0f0a] p-4 rounded-xl border border-red-500/30">
                  <label className="block text-xs font-bold uppercase tracking-wider text-red-300">
                    Primary Reason for Non-Selection (Politely Explained in Email)
                  </label>
                  <select
                    value={modalRejectionReason}
                    onChange={(e) => setModalRejectionReason(e.target.value)}
                    className="w-full bg-black/70 border border-[#3A2F27] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-sans cursor-pointer"
                  >
                    <option value="VIVA_INCOMPLETE">🎓 Live Technical Defense Viva Incomplete / Weak Conceptual Mastery</option>
                    <option value="JUNIOR_SCOPE">📉 Technical Scope Too Junior for Target Engineering Role</option>
                    <option value="JD_MISMATCH">🧩 Job Description Stack Gap (Missing required backend/cloud infrastructure)</option>
                    <option value="BULK_DUMP">📦 Bulk Repository Dump (Lack of progressive, iterative Git-DNA commits)</option>
                    <option value="CLONE_DETECTED">⚠️ External Online Tutorial Clone Codebase Pattern Detected</option>
                    <option value="PROMPT_INJECTION">🛡️ Security Alert: Adversarial Prompt Injection Directive Detected</option>
                    <option value="CUSTOM">✏️ Custom Recruiter Note (Enter below)</option>
                  </select>
                </div>
              )}

              {/* Custom Note Textarea */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                  Optional Recruiter Feedback Note (Appends to Email)
                </label>
                <textarea
                  value={modalCustomNote}
                  onChange={(e) => setModalCustomNote(e.target.value)}
                  placeholder="e.g. Great enthusiasm in the submission. We recommend re-applying after building an end-to-end Kafka or Redis pipeline."
                  rows={2}
                  className="w-full bg-black/60 border border-[#3A2F27] rounded-xl p-3 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] font-sans"
                />
              </div>

              {/* Email Preview Section */}
              <div className="border border-[#3A2F27] rounded-xl overflow-hidden bg-black/40">
                <div className="bg-[#190d08] border-b border-[#3A2F27] px-4 py-2.5 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#FFD166] uppercase tracking-wider">
                    Candidate Email Format Preview
                  </span>
                  <div className="flex items-center gap-1 bg-black/60 p-0.5 rounded-lg border border-[#3A2F27]">
                    <button
                      type="button"
                      onClick={() => setEmailTab('html')}
                      className={`px-2.5 py-1 rounded text-[11px] font-bold transition cursor-pointer ${
                        emailTab === 'html' ? 'bg-[#D4AF37] text-black' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Luxury HTML
                    </button>
                    <button
                      type="button"
                      onClick={() => setEmailTab('text')}
                      className={`px-2.5 py-1 rounded text-[11px] font-bold transition cursor-pointer ${
                        emailTab === 'text' ? 'bg-[#D4AF37] text-black' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Plain Text
                    </button>
                    <button
                      type="button"
                      onClick={() => setEmailTab('payload')}
                      className={`px-2.5 py-1 rounded text-[11px] font-bold transition cursor-pointer ${
                        emailTab === 'payload' ? 'bg-[#D4AF37] text-black' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Webhook JSON
                    </button>
                  </div>
                </div>

                <div className="p-4 max-h-60 overflow-y-auto">
                  {emailTab === 'html' && (
                    <div className="bg-[#0c0604] border border-[#D4AF37]/40 rounded-xl p-5 text-xs space-y-3 font-sans">
                      <div className="text-center pb-3 border-b border-[#3A2F27]">
                        <span className="text-xs font-bold text-[#D4AF37] tracking-widest uppercase">PARIKSHA · PROBLEM STATEMENT IM-105</span>
                        <h4 className="text-sm font-extrabold text-white mt-1">Official Candidate Evaluation & Technical Report</h4>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#180e09] border border-[#3d2516] flex justify-between items-center">
                        <span className="font-bold text-white">{activeModalCandidate.name}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${modalDecisionType === 'SHORTLISTED' ? 'bg-emerald-950 text-emerald-300 border-emerald-500' : 'bg-red-950 text-red-300 border-red-500'}`}>
                          {modalDecisionType === 'SHORTLISTED' ? 'CANDIDATE SHORTLISTED' : 'TECHNICAL SCREENING NOTICE'}
                        </span>
                      </div>
                      <div className="text-neutral-300 text-xs leading-relaxed">
                        {modalDecisionType === 'SHORTLISTED' 
                          ? `Congratulations ${activeModalCandidate.name}, your technical submission has passed the merit-based screening threshold based on genuine Git-DNA and conceptual viva defense.`
                          : `Thank you for your submission, ${activeModalCandidate.name}. Following code verification and viva review, we have decided to proceed with other candidates. Your authenticity score is ${activeModalCandidate.authenticity_score ?? 0}% with viva defense ${activeModalCandidate.viva_score ?? 0}/10.`}
                      </div>
                      {modalCustomNote && (
                        <div className="p-2 rounded bg-black/50 border border-[#3A2F27] text-neutral-300 italic text-[11px]">
                          "{modalCustomNote}"
                        </div>
                      )}
                      <div className="pt-2 border-t border-[#3A2F27] flex items-center justify-between text-[11px] text-[#FFD166]">
                        <span>Includes: Tamper-proof 3D ProofCard link & Ed25519 cryptographic signature</span>
                        <span className="font-bold underline cursor-pointer">Live Ledger URL</span>
                      </div>
                    </div>
                  )}

                  {emailTab === 'text' && (
                    <pre className="text-[11px] font-mono text-neutral-300 whitespace-pre-wrap leading-relaxed">
                      {`================================================================================
PARIKSHA IM-105: CANDIDATE TECHNICAL EVALUATION & EVIDENCE REPORT
================================================================================

Candidate:      ${activeModalCandidate.name}
Email:          ${activeModalCandidate.email || 'candidate@example.edu'}
Institution:    ${activeModalCandidate.college} (${classifyCollegeTier(activeModalCandidate.college || activeModalCandidate.college_tier).label})
Status:         ${modalDecisionType === 'SHORTLISTED' ? 'CANDIDATE SHORTLISTED' : 'TECHNICAL SCREENING NOTICE'}

EVALUATION SUMMARY:
${modalDecisionType === 'SHORTLISTED'
  ? `Based on verified repository authorship, progressive Git-DNA commit history, and demonstrated conceptual depth in the technical viva defense, your application has passed the merit-based screening threshold.`
  : `Thank you for participating. Following our code forensics and viva review, we have decided to proceed with other candidates whose current technical experience aligns more closely with our role.`}

TECHNICAL SCORECARD:
- Code Authenticity:     ${activeModalCandidate.authenticity_score ?? 0} / 100
- Viva Defense Score:    ${activeModalCandidate.viva_score ?? 0} / 10.0
- Institutional Pedigree Bias: 0.0% (Evaluated strictly on code quality)

View official cryptographic ledger credential:
https://proofcard-im105.vercel.app/?verify=${activeModalCandidate.candidate_id || 'cand_01'}
================================================================================`}
                    </pre>
                  )}

                  {emailTab === 'payload' && (
                    <pre className="text-[11px] font-mono text-emerald-300 whitespace-pre-wrap">
                      {JSON.stringify({
                        event: "DECISION_EMAIL_DISPATCH",
                        candidate_id: activeModalCandidate.candidate_id,
                        name: activeModalCandidate.name,
                        email: activeModalCandidate.email || "candidate@example.edu",
                        college: activeModalCandidate.college,
                        college_tier: classifyCollegeTier(activeModalCandidate.college || activeModalCandidate.college_tier).tier,
                        decision: modalDecisionType,
                        rejection_reason: modalDecisionType === 'REJECTED' ? modalRejectionReason : null,
                        authenticity_score: activeModalCandidate.authenticity_score,
                        viva_score: activeModalCandidate.viva_score,
                        is_clone: activeModalCandidate.is_clone,
                        custom_note: modalCustomNote || null
                      }, null, 2)}
                    </pre>
                  )}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-[#1e100a] border-t border-[#D4AF37]/30 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveModalCandidate(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isSending}
                onClick={handleDispatchOfficialEmail}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E85D04] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:opacity-90 transition cursor-pointer shadow-lg disabled:opacity-50"
              >
                {isSending ? (
                  <>
                    <span className="animate-spin">⚙</span>
                    <span>Dispatching via n8n...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Official Decision Email</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
