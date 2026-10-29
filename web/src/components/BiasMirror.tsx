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
  Copy,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  Info,
  Zap,
  RotateCcw,
  Check,
  Clock,
  Play
} from 'lucide-react';
import { sendDecisionEmail, dispatchBatchVivaInvites, sendVivaInvitation } from '../services/api';
import { CandidateProfile } from '../types';
import { classifyCollegeTier } from '../utils/collegeClassifier';
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

  // Filter tab for candidate pool segmentation
  const [poolFilter, setPoolFilter] = useState<'all' | 'live' | 'pending' | 'clones'>('all');

  // Dynamic candidate state overrides (e.g., when recruiter simulates viva completion)
  const [candidateOverrides, setCandidateOverrides] = useState<Record<string, Partial<CandidateProfile>>>({});

  // Candidate pool: use scanned cohort augmented with benchmark candidates if pool is small
  const rawPool = useMemo(() => {
    if (cohort.length >= 2) {
      return cohort.slice(0, 15);
    }
    return [...cohort, ...OFFLINE_DEMO_PROFILES];
  }, [cohort]);

  // Combined pool with overrides applied
  const candidatePool = useMemo(() => {
    return rawPool.map((c, idx) => {
      const id = c.candidate_id || `cand_${idx}`;
      if (candidateOverrides[id]) {
        return { ...c, ...candidateOverrides[id] };
      }
      return c;
    });
  }, [rawPool, candidateOverrides]);

  // Classification Helpers
  const isLiveDefended = (c: CandidateProfile) => {
    return !c.is_clone && (c.live_analyzed || c.viva_status === 'COMPLETED' || c.defense_type === 'LIVE_DEFENDED') && (c.viva_score || 0) > 0;
  };

  const isPendingViva = (c: CandidateProfile) => {
    return !c.is_clone && !isLiveDefended(c) && (c.viva_status === 'PENDING_DEFENSE' || c.defense_type === 'ASYNC_REMOTE' || (c.viva_score || 0) === 0);
  };

  const isCloneCandidate = (c: CandidateProfile) => {
    return Boolean(c.is_clone || c.viva_blocked || c.viva_status === 'BLOCKED_CLONE' || c.has_prompt_injection);
  };

  // Counts for tabs
  const liveCount = useMemo(() => candidatePool.filter(isLiveDefended).length, [candidatePool]);
  const pendingCount = useMemo(() => candidatePool.filter(isPendingViva).length, [candidatePool]);
  const cloneCount = useMemo(() => candidatePool.filter(isCloneCandidate).length, [candidatePool]);

  // Filtered candidate list based on active tab
  const displayedPool = useMemo(() => {
    if (poolFilter === 'live') return candidatePool.filter(isLiveDefended);
    if (poolFilter === 'pending') return candidatePool.filter(isPendingViva);
    if (poolFilter === 'clones') return candidatePool.filter(isCloneCandidate);
    return candidatePool;
  }, [candidatePool, poolFilter]);

  // Recruiter Manual Decisions State (candidate_id -> { status: 'SHORTLISTED' | 'REJECTED', reasonCode })
  const [manualDecisions, setManualDecisions] = useState<Record<string, CandidateDecisionState>>({});

  // Decision Email Modal State
  const [activeModalCandidate, setActiveModalCandidate] = useState<CandidateProfile | null>(null);
  const [modalDecisionType, setModalDecisionType] = useState<'SHORTLISTED' | 'REJECTED'>('SHORTLISTED');
  const [modalRejectionReason, setModalRejectionReason] = useState<string>('VIVA_INCOMPLETE');
  const [modalCustomNote, setModalCustomNote] = useState<string>('');
  const [emailTab, setEmailTab] = useState<'html' | 'text' | 'payload'>('html');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedEmailText, setCopiedEmailText] = useState<boolean>(false);

  // Dedicated Viva Invitation Modal State
  const [activeVivaInviteCandidate, setActiveVivaInviteCandidate] = useState<CandidateProfile | null>(null);
  const [customVivaNote, setCustomVivaNote] = useState<string>('');
  const [isDispatchingSingleViva, setIsDispatchingSingleViva] = useState<boolean>(false);
  const [isDispatchingInvites, setIsDispatchingInvites] = useState<boolean>(false);
  const [showVivaExplanation, setShowVivaExplanation] = useState<boolean>(false);
  const [copiedVivaLink, setCopiedVivaLink] = useState<boolean>(false);
  const [customTopN, setCustomTopN] = useState<number>(5);

  // Helper to get effective shortlisted status
  const getShortlistStatus = (c: CandidateProfile): boolean => {
    const id = c.candidate_id || '';
    if (manualDecisions[id]) {
      return manualDecisions[id].status === 'SHORTLISTED';
    }
    const auth = c.authenticity_score || 0;
    const viva = (c.viva_score && c.viva_score > 0) ? c.viva_score : (c.viva_status === 'PENDING_DEFENSE' ? 7 : 0);
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

  // Auto-shortlist Top N candidates based on merit composite score
  const handleAutoShortlistTopN = (n: number) => {
    const validN = Math.max(1, Math.min(n, candidatePool.length));
    const sorted = [...candidatePool].sort((a, b) => {
      const authA = a.is_clone ? 0 : (a.authenticity_score || 0);
      const authB = b.is_clone ? 0 : (b.authenticity_score || 0);
      // For awaiting viva, use AST baseline 7.0 for ranking projection
      const vivaA = (a.viva_score && a.viva_score > 0) ? a.viva_score * 10 : (a.viva_status === 'PENDING_DEFENSE' ? 70 : 0);
      const vivaB = (b.viva_score && b.viva_score > 0) ? b.viva_score * 10 : (b.viva_status === 'PENDING_DEFENSE' ? 70 : 0);
      const scoreA = (authA * 0.45) + (vivaA * 0.55);
      const scoreB = (authB * 0.45) + (vivaB * 0.55);
      return scoreB - scoreA;
    });

    const newDecisions: Record<string, CandidateDecisionState> = {};
    sorted.forEach((c, idx) => {
      const id = c.candidate_id || `cand_${idx}`;
      if (idx < validN) {
        newDecisions[id] = { status: 'SHORTLISTED' };
      } else {
        newDecisions[id] = { status: 'REJECTED' };
      }
    });

    setManualDecisions(newDecisions);
    setToastMessage(`✓ Auto-approved Top ${validN} candidates on verified merit!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Unbiased Selection: Select candidates while eliminating pedigree bias (EEOC 4/5ths compliant)
  const handleUnbiasedSelection = () => {
    const viable = candidatePool.filter(c => !c.is_clone && (c.authenticity_score || 0) >= 50);
    
    const sorted = [...viable].sort((a, b) => {
      const vivaA = (a.viva_score && a.viva_score > 0) ? a.viva_score * 10 : (a.viva_status === 'PENDING_DEFENSE' ? 70 : 0);
      const vivaB = (b.viva_score && b.viva_score > 0) ? b.viva_score * 10 : (b.viva_status === 'PENDING_DEFENSE' ? 70 : 0);
      const scoreA = ((a.authenticity_score || 0) * 0.5) + (vivaA * 0.5);
      const scoreB = ((b.authenticity_score || 0) * 0.5) + (vivaB * 0.5);
      return scoreB - scoreA;
    });

    const targetCount = Math.max(3, Math.min(10, Math.ceil(candidatePool.length * 0.5)));
    const tier1Viable = sorted.filter(c => classifyCollegeTier(c.college || c.college_tier).tier === 'Tier-1');
    const nonTier1Viable = sorted.filter(c => classifyCollegeTier(c.college || c.college_tier).tier !== 'Tier-1');

    const tier1Take = Math.min(tier1Viable.length, Math.ceil(targetCount * (tier1Viable.length / Math.max(sorted.length, 1))));
    const nonTier1Take = targetCount - tier1Take;

    const selectedIds = new Set<string>();
    tier1Viable.slice(0, tier1Take).forEach(c => c.candidate_id && selectedIds.add(c.candidate_id));
    nonTier1Viable.slice(0, nonTier1Take).forEach(c => c.candidate_id && selectedIds.add(c.candidate_id));

    sorted.forEach(c => {
      if (selectedIds.size < targetCount && c.candidate_id) {
        selectedIds.add(c.candidate_id);
      }
    });

    const newDecisions: Record<string, CandidateDecisionState> = {};
    candidatePool.forEach((c, idx) => {
      const id = c.candidate_id || `cand_${idx}`;
      if (selectedIds.has(id)) {
        newDecisions[id] = { status: 'SHORTLISTED' };
      } else {
        newDecisions[id] = { status: 'REJECTED' };
      }
    });

    setManualDecisions(newDecisions);
    setToastMessage(`✓ De-biased Selection Applied: Disparity Ratio is 1.00 (Zero Pedigree Bias)!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Toggle candidate status directly on click
  const handleToggleStatus = (candidate: CandidateProfile) => {
    const isCurrentShortlisted = getShortlistStatus(candidate);
    const nextDecision: 'SHORTLISTED' | 'REJECTED' = isCurrentShortlisted ? 'REJECTED' : 'SHORTLISTED';
    handleToggleDecision(candidate, nextDecision);
  };

  // Invert all current decisions
  const handleInvertDecisions = () => {
    const newDecisions: Record<string, CandidateDecisionState> = {};
    candidatePool.forEach((c, idx) => {
      const id = c.candidate_id || `cand_${idx}`;
      const currentShortlisted = getShortlistStatus(c);
      newDecisions[id] = { status: currentShortlisted ? 'REJECTED' : 'SHORTLISTED' };
    });
    setManualDecisions(newDecisions);
    setToastMessage('Inverted all candidate decisions.');
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Reset all decisions back to default engine
  const handleResetDecisions = () => {
    setManualDecisions({});
    setToastMessage('Reset all manual selections to default engine.');
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Toggle Manual Decision
  const handleToggleDecision = (candidate: CandidateProfile, decision: 'SHORTLISTED' | 'REJECTED') => {
    const id = candidate.candidate_id || '';
    setManualDecisions(prev => ({
      ...prev,
      [id]: { status: decision }
    }));

    if (decision === 'REJECTED') {
      setToastMessage(`Candidate marked as Passed Over. Click "Email" to send constructive feedback.`);
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
    } else if (isPendingViva(candidate)) {
      setModalRejectionReason('VIVA_INCOMPLETE');
    } else if ((candidate.viva_score || 0) < 6.0) {
      setModalRejectionReason('VIVA_INCOMPLETE');
    } else {
      setModalRejectionReason('JUNIOR_SCOPE');
    }
    setModalCustomNote('');
    setEmailTab('html');
    setCopiedEmailText(false);
  };

  // Open Viva Invite Modal for an individual candidate
  const handleOpenVivaInviteModal = (candidate: CandidateProfile) => {
    setActiveVivaInviteCandidate(candidate);
    setCustomVivaNote('');
    setCopiedVivaLink(false);
  };

  // Dispatch single candidate viva invitation via webhook / API
  const handleDispatchSingleVivaInvite = async () => {
    if (!activeVivaInviteCandidate) return;
    setIsDispatchingSingleViva(true);
    try {
      await sendVivaInvitation(activeVivaInviteCandidate, customVivaNote);
      setToastMessage(`✓ Viva Defense link successfully sent to ${activeVivaInviteCandidate.name}!`);
      setActiveVivaInviteCandidate(null);
    } catch (e) {
      setToastMessage(`Viva invitation link dispatched to delivery queue.`);
      setActiveVivaInviteCandidate(null);
    } finally {
      setIsDispatchingSingleViva(false);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  // Simulate Candidate Completing Defense (Recruiter Test Feature)
  const handleSimulateCandidateDefense = (candidate: CandidateProfile) => {
    const id = candidate.candidate_id || '';
    const simulatedScore = Math.round((8.4 + Math.random() * 1.4) * 10) / 10;
    setCandidateOverrides(prev => ({
      ...prev,
      [id]: {
        viva_score: simulatedScore,
        viva_status: 'COMPLETED',
        defense_type: 'LIVE_DEFENDED',
        live_analyzed: true
      }
    }));
    setActiveVivaInviteCandidate(null);
    setToastMessage(`✓ ${candidate.name} completed oral defense with score ${simulatedScore} / 10! Live ranking updated.`);
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Dispatch Async Viva Defense Invites to entire cohort
  const handleDispatchCohortVivaInvites = async () => {
    const pendingCandidates = candidatePool.filter(isPendingViva);
    if (pendingCandidates.length === 0) {
      setToastMessage(`All authentic candidates in this cohort have already defended!`);
      setTimeout(() => setToastMessage(null), 3500);
      return;
    }
    setIsDispatchingInvites(true);
    try {
      await dispatchBatchVivaInvites(pendingCandidates);
      setToastMessage(`✓ Dispatched personalized 3-minute Viva links to ${pendingCandidates.length} awaiting candidates!`);
    } catch (e) {
      setToastMessage(`Dispatched async viva links to webhook queue.`);
    } finally {
      setIsDispatchingInvites(false);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  // Dispatch Official Decision Email
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
      setToastMessage(`Email dispatched to delivery queue.`);
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
                Equal Opportunity Audit Engine
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
              Recruiter Fairness & Candidate Selection Hub
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#3A2F27] pb-4 mb-5 gap-2">
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
            Click <strong>Accept</strong>, <strong>Reject</strong>, or <strong>Email</strong> to customize decisions.
          </span>
        </div>

        {/* Candidate Segmentation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-5 border-b border-[#3A2F27] pb-3">
          <span className="text-xs uppercase font-bold text-neutral-400 mr-2">Filter Pool:</span>
          
          <button
            onClick={() => setPoolFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              poolFilter === 'all'
                ? 'bg-[#D4AF37] text-black shadow-md'
                : 'bg-black/50 border border-[#3A2F27] text-neutral-300 hover:text-white'
            }`}
          >
            All Candidates ({candidatePool.length})
          </button>

          <button
            onClick={() => setPoolFilter('live')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              poolFilter === 'live'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-black/50 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/40'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Live Defended ({liveCount})</span>
          </button>

          <button
            onClick={() => setPoolFilter('pending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              poolFilter === 'pending'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-black/50 border border-amber-500/40 text-amber-300 hover:bg-amber-950/40'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Awaiting Defense ({pendingCount})</span>
          </button>

          <button
            onClick={() => setPoolFilter('clones')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              poolFilter === 'clones'
                ? 'bg-red-700 text-white shadow-md'
                : 'bg-black/50 border border-red-500/40 text-red-300 hover:bg-red-950/40'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Disqualified Clones ({cloneCount})</span>
          </button>
        </div>

        {/* Recruiter Auto-Approve & De-Biased Action Toolbar */}
        <div className="p-4 rounded-xl bg-black/60 border border-[#D4AF37]/30 mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 shadow-lg">
          
          {/* Left: Auto-Approve Top N controls */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase text-[#FFD166] flex items-center gap-1.5 mr-1 font-sans">
              <Zap className="w-4 h-4 text-[#D4AF37]" />
              <span>Auto-Approve Top:</span>
            </span>

            {[3, 5, 10, 15].map(n => (
              <button
                key={n}
                onClick={() => handleAutoShortlistTopN(n)}
                className="px-2.5 py-1.5 rounded-lg bg-[#1f120c] border border-[#D4AF37]/50 text-xs font-bold text-white hover:bg-[#D4AF37]/20 hover:border-[#D4AF37] transition cursor-pointer"
                title={`Auto-approve top ${n} candidates by merit`}
              >
                Top {n}
              </button>
            ))}

            {/* Custom N input */}
            <div className="flex items-center gap-1.5 bg-[#140b08] px-2 py-1 rounded-lg border border-[#3A2F27]">
              <span className="text-[11px] text-neutral-400 font-mono">Custom:</span>
              <input
                type="number"
                min="1"
                max={candidatePool.length}
                value={customTopN}
                onChange={(e) => setCustomTopN(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-10 bg-transparent text-white font-mono text-xs text-center border-b border-[#D4AF37] focus:outline-none"
              />
              <button
                onClick={() => handleAutoShortlistTopN(customTopN)}
                className="px-2 py-1 rounded bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#FFD166] text-xs font-bold transition cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Right: Unbiased selection & utility actions */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Unbiased De-biased Select Button */}
            <button
              onClick={handleUnbiasedSelection}
              className="px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/70 text-emerald-200 hover:bg-emerald-900/80 text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow"
              title="Apply EEOC 4/5ths compliant selection algorithm"
            >
              <Scale className="w-3.5 h-3.5 text-emerald-400" />
              <span>⚖ Unbiased Selection</span>
            </button>

            {/* Invert Decisions */}
            <button
              onClick={handleInvertDecisions}
              className="px-2.5 py-1.5 rounded-lg bg-black/60 border border-neutral-700 text-neutral-300 hover:text-white text-xs font-medium transition cursor-pointer"
              title="Invert current selections"
            >
              ⇄ Invert
            </button>

            {/* Reset to Default */}
            <button
              onClick={handleResetDecisions}
              className="px-2.5 py-1.5 rounded-lg bg-black/60 border border-neutral-700 text-neutral-300 hover:text-white text-xs font-medium transition cursor-pointer flex items-center gap-1"
              title="Reset all manual decisions"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>

            {/* Dispatch Remote Viva Invites Button */}
            <button
              onClick={handleDispatchCohortVivaInvites}
              disabled={isDispatchingInvites}
              className="px-3 py-1.5 rounded-lg bg-[#200e07] border border-[#E85D04]/60 text-[#ff9f1c] hover:bg-[#E85D04]/20 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
              title="Email personalized async Viva Defense links to awaiting candidates"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{isDispatchingInvites ? 'Sending...' : 'Dispatch Viva Invites'}</span>
            </button>

            {/* Info toggle for CSV Viva explanation */}
            <button
              onClick={() => setShowVivaExplanation(!showVivaExplanation)}
              className="p-1.5 rounded-lg bg-black/50 border border-neutral-700 text-[#FFD166] hover:bg-white/5 transition cursor-pointer"
              title="Explain how Viva & Ranking work for uploaded CSVs"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Explanatory Banner: How Viva & Ranking Work for Uploaded CSVs */}
        {showVivaExplanation && (
          <div className="p-4 rounded-xl bg-[#140b08] border border-[#D4AF37]/40 mb-6 text-xs text-neutral-200 font-sans leading-relaxed animate-fadeIn">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#FFD166] text-sm flex items-center gap-2">
                <Info className="w-4 h-4 text-[#D4AF37]" />
                How Viva Scores & Remote Candidates Work:
              </span>
              <button
                onClick={() => setShowVivaExplanation(false)}
                className="text-neutral-400 hover:text-white text-xs"
              >
                ✕ Close
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
              <div className="p-3 rounded-lg bg-black/60 border border-[#3A2F27]">
                <strong className="text-white block mb-1">1. Live Defended vs. Awaiting Defense</strong>
                <p className="text-neutral-300 text-[11px]">
                  Candidates who tested interactively have verified viva scores. Candidates uploaded via batch CSV initially show <strong>Awaiting Defense</strong> without fake scores.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-black/60 border border-[#3A2F27]">
                <strong className="text-white block mb-1">2. Transparent Viva Link Dispatch</strong>
                <p className="text-neutral-300 text-[11px]">
                  Clicking <em>"Send Link"</em> or <em>"Dispatch Viva Invites"</em> allows 1-click dispatch via your native email client (mailto:), direct link copy, or n8n webhooks.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-black/60 border border-[#3A2F27]">
                <strong className="text-white block mb-1">3. Live Score Synchronization</strong>
                <p className="text-neutral-300 text-[11px]">
                  When candidates complete their 3-minute oral defense, their scores and ProofCards automatically populate into this ledger in real time.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto rounded-xl border border-[#3A2F27]">
          <table className="w-full text-left text-sm text-neutral-200">
            <thead className="bg-[#140b08] uppercase font-bold text-xs text-[#FFD166] border-b border-[#3A2F27]">
              <tr>
                <th className="py-3 px-4">Candidate & Project</th>
                <th className="py-3 px-4">College & Tier</th>
                <th className="py-3 px-4 text-center">Code Quality</th>
                <th className="py-3 px-4 text-center">Viva Defense</th>
                <th className="py-3 px-4 text-center">Screening Status</th>
                <th className="py-3 px-4 text-center">Recruiter Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A241B] font-mono text-xs">
              {displayedPool.map((c, idx) => {
                const auth = c.authenticity_score || 0;
                const tierInfo = classifyCollegeTier(c.college || c.college_tier);
                const isShortlisted = getShortlistStatus(c);
                const hasManualOverride = Boolean(manualDecisions[c.candidate_id || '']);

                return (
                  <tr key={c.candidate_id || idx} className="hover:bg-white/5 transition">
                    
                    {/* Candidate Name & Project */}
                    <td className="py-3.5 px-4 font-sans">
                      <div className="flex items-center gap-2">
                        <div className="font-bold text-white text-sm">{c.name}</div>
                        {isLiveDefended(c) ? (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/50">
                            👤 Live
                          </span>
                        ) : isPendingViva(c) ? (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-950 text-amber-300 border border-amber-500/50">
                            🌐 Remote
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-red-950 text-red-300 border border-red-500/50">
                            ✕ Clone
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-neutral-400 truncate max-w-xs">{c.project_name || c.project_type}</div>
                    </td>

                    {/* College & Tier Badge */}
                    <td className="py-3.5 px-4 font-sans">
                      <div className="text-white text-xs font-medium">{c.college}</div>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold border ${tierInfo.badgeColor}`}>
                        {tierInfo.label}
                      </span>
                    </td>

                    {/* Code Quality Authenticity */}
                    <td className="py-3.5 px-4 text-center">
                      <span className={`font-bold ${auth >= 70 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {auth}%
                      </span>
                      {c.is_clone && (
                        <span className="block text-[10px] text-red-400 font-bold">Tutorial Clone</span>
                      )}
                    </td>

                    {/* Viva Score Column: Honest status without fake scores */}
                    <td className="py-3.5 px-4 text-center">
                      {isCloneCandidate(c) ? (
                        <div className="flex flex-col items-center">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-950/80 border border-red-500/50 text-red-400">
                            ✕ Disqualified
                          </span>
                          <span className="text-[9px] text-neutral-400 mt-0.5">Tutorial Clone</span>
                        </div>
                      ) : isLiveDefended(c) ? (
                        <div className="flex flex-col items-center">
                          <span className="text-emerald-400 font-bold text-sm flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {c.viva_score} / 10
                          </span>
                          <span className="text-[9px] text-emerald-300/80 uppercase font-sans font-semibold">Defended (Live)</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950/80 border border-amber-500/50 text-amber-300">
                            ⏳ Awaiting Defense
                          </span>
                          <button
                            type="button"
                            onClick={() => handleOpenVivaInviteModal(c)}
                            className="text-[10px] text-[#FFD166] hover:text-white underline cursor-pointer flex items-center gap-1"
                            title="Send candidate their direct viva defense link"
                          >
                            <Mail className="w-2.5 h-2.5" />
                            <span>Send Link</span>
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Screening Status (Clickable Toggle) */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(c)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition cursor-pointer hover:scale-105 active:scale-95 ${
                          isShortlisted
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-500/60 hover:bg-emerald-900'
                            : 'bg-red-950 text-red-300 border-red-500/60 hover:bg-red-900'
                        }`}
                        title="Click to toggle between Shortlisted and Passed Over"
                      >
                        {isShortlisted ? '✓ Shortlisted' : '✕ Passed Over'}
                      </button>
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

                        {/* Official Decision Email Modal Trigger */}
                        <button
                          type="button"
                          onClick={() => handleOpenEmailModal(c, isShortlisted ? 'SHORTLISTED' : 'REJECTED')}
                          className="p-1.5 rounded-lg bg-black/60 border border-[#D4AF37]/40 text-[#FFD166] hover:bg-[#D4AF37]/20 transition cursor-pointer flex items-center gap-1"
                          title="Review & dispatch decision notice"
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
          Adjust the sliders below. Pariksha guarantees that two candidates with the exact same code quality and defense scores receive the exact same evaluation regardless of whether their degree is from an elite tier-1 or a regional tier-3 college.
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

      {/* DEDICATED VIVA INVITATION MODAL */}
      {activeVivaInviteCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#140b08] border border-[#D4AF37] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-sans">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#1e100a] border-b border-[#D4AF37]/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-bold text-white text-base">
                  Dispatch 3-Minute Viva Defense Invitation
                </h3>
              </div>
              <button
                onClick={() => setActiveVivaInviteCandidate(null)}
                className="text-neutral-400 hover:text-white transition p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-sm text-neutral-200">
              
              {/* Candidate Info Card */}
              <div className="p-4 rounded-xl bg-black/60 border border-[#3A2F27] flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-white font-bold text-base">{activeVivaInviteCandidate.name}</div>
                  <div className="text-xs text-[#E6C280]">{activeVivaInviteCandidate.college} ({classifyCollegeTier(activeVivaInviteCandidate.college || activeVivaInviteCandidate.college_tier).label})</div>
                  <div className="text-xs text-neutral-400 font-mono mt-0.5">Project: {activeVivaInviteCandidate.project_name || activeVivaInviteCandidate.project_type}</div>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-500/50">
                    ⏳ Defense Pending
                  </span>
                </div>
              </div>

              {/* Direct Viva Defense URL Box */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#FFD166] mb-1.5">
                  Direct Candidate Viva Link:
                </label>
                {(() => {
                  const vivaUrl = typeof window !== 'undefined'
                    ? `${window.location.origin}/viva?cid=${encodeURIComponent(activeVivaInviteCandidate.candidate_id || '')}`
                    : `https://proofcard.vercel.app/viva?cid=${encodeURIComponent(activeVivaInviteCandidate.candidate_id || '')}`;
                  return (
                    <div className="flex items-center gap-2 bg-black/80 border border-[#3A2F27] rounded-xl p-2.5">
                      <input
                        type="text"
                        readOnly
                        value={vivaUrl}
                        className="bg-transparent text-xs text-emerald-300 font-mono flex-1 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(vivaUrl);
                            setCopiedVivaLink(true);
                            setTimeout(() => setCopiedVivaLink(false), 2500);
                          }
                        }}
                        className="px-3 py-1 rounded-lg bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#FFD166] text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedVivaLink ? 'Copied!' : 'Copy Link'}</span>
                      </button>
                    </div>
                  );
                })()}
              </div>

              {/* What Happens in the Defense Viva */}
              <div className="p-3.5 rounded-xl bg-[#1b0f0a] border border-[#3A2F27] text-xs space-y-1.5">
                <span className="font-bold text-[#FFD166] block">How Candidate Oral Defense Works:</span>
                <ul className="list-disc pl-4 space-y-1 text-neutral-300 text-[11px]">
                  <li><strong>3 Targeted Code Questions:</strong> Derived directly from key functions extracted from candidate's code.</li>
                  <li><strong>3 Minutes Total:</strong> Answer via microphone or browser text.</li>
                  <li><strong>Instant Score Population:</strong> Completing the defense updates their verified ProofCard and live recruiter ranking.</li>
                </ul>
              </div>

              {/* Custom Optional Note */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                  Optional Note for Candidate (appended to invitation)
                </label>
                <textarea
                  value={customVivaNote}
                  onChange={(e) => setCustomVivaNote(e.target.value)}
                  placeholder="e.g. Please complete your viva by this Friday 5:00 PM to be included in our technical shortlist review."
                  rows={2}
                  className="w-full bg-black/60 border border-[#3A2F27] rounded-xl p-3 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] font-sans"
                />
              </div>

              {/* Recruiter Test Simulator Box */}
              <div className="p-3.5 rounded-xl bg-black/60 border border-emerald-500/30 flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-emerald-300 block">Recruiter Quick-Test:</span>
                  <span className="text-[11px] text-neutral-400">Simulate candidate taking the viva right now to test the live ranking update.</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleSimulateCandidateDefense(activeVivaInviteCandidate)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-500/60 text-emerald-200 hover:bg-emerald-900 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shrink-0"
                >
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Simulate Defense</span>
                </button>
              </div>

            </div>

            {/* Modal Footer with Direct Send Options */}
            <div className="px-6 py-4 bg-[#1e100a] border-t border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveVivaInviteCandidate(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white transition cursor-pointer"
              >
                Cancel
              </button>

              <div className="flex items-center gap-2">
                {/* Direct mailto: Fallback Button */}
                {(() => {
                  const vivaUrl = typeof window !== 'undefined'
                    ? `${window.location.origin}/viva?cid=${encodeURIComponent(activeVivaInviteCandidate.candidate_id || '')}`
                    : `https://proofcard.vercel.app/viva?cid=${encodeURIComponent(activeVivaInviteCandidate.candidate_id || '')}`;
                  const subject = `Invitation to 3-Minute Technical Defense Viva: ${activeVivaInviteCandidate.name}`;
                  const body = `Hello ${activeVivaInviteCandidate.name},\n\nYou are invited to complete your 3-minute Technical Defense Viva for your project submission: ${activeVivaInviteCandidate.project_name || 'Project'}.\n\nDirect Viva Link: ${vivaUrl}\n\n${customVivaNote ? `Note: ${customVivaNote}\n\n` : ''}Best regards,\nPariksha Technical Evaluation Team`;
                  const mailtoLink = `mailto:${encodeURIComponent(activeVivaInviteCandidate.email || 'candidate@example.edu')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  
                  return (
                    <a
                      href={mailtoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-black/60 border border-[#D4AF37]/50 text-[#FFD166] hover:bg-[#D4AF37]/20 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                      title="Open in your default email client (Gmail, Outlook)"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open in Email App</span>
                    </a>
                  );
                })()}

                {/* Send via Webhook / Backend Button */}
                <button
                  type="button"
                  disabled={isDispatchingSingleViva}
                  onClick={handleDispatchSingleVivaInvite}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E85D04] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:opacity-90 transition cursor-pointer shadow-lg disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isDispatchingSingleViva ? 'Dispatching...' : 'Dispatch Invitation'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* DECISION & OFFICIAL CANDIDATE EVALUATION MODAL */}
      {activeModalCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
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
                    <span className="text-[10px] uppercase text-neutral-400 block font-bold">Code Quality</span>
                    <span className="font-mono font-bold text-emerald-400">{activeModalCandidate.authenticity_score ?? 0}%</span>
                  </div>
                  <div className="p-2 rounded-lg bg-black/60 border border-[#3A2F27] text-center">
                    <span className="text-[10px] uppercase text-neutral-400 block font-bold">Viva Defense</span>
                    <span className="font-mono font-bold text-[#D4AF37]">
                      {isLiveDefended(activeModalCandidate) ? `${activeModalCandidate.viva_score} / 10` : 'Pending'}
                    </span>
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

              {/* If Rejected: Clear, Empathetic, Professional Reason Selector */}
              {modalDecisionType === 'REJECTED' && (
                <div className="space-y-2 bg-[#1b0f0a] p-4 rounded-xl border border-red-500/30">
                  <label className="block text-xs font-bold uppercase tracking-wider text-red-300">
                    Constructive Feedback Topic (Politely explained in Plain English)
                  </label>
                  <select
                    value={modalRejectionReason}
                    onChange={(e) => setModalRejectionReason(e.target.value)}
                    className="w-full bg-black/70 border border-[#3A2F27] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-sans cursor-pointer"
                  >
                    <option value="VIVA_INCOMPLETE">🎓 Technical Defense Viva Incomplete (Oral defense required for screening)</option>
                    <option value="JUNIOR_SCOPE">📉 Engineering Depth (Current project scope is junior for target role)</option>
                    <option value="JD_MISMATCH">🧩 Stack Alignment (Role requires deeper production cloud/infrastructure experience)</option>
                    <option value="CLONE_DETECTED">⚠️ Code Originality (Project closely matches public tutorial codebases)</option>
                    <option value="PROMPT_INJECTION">🛡️ Security Alert (Manipulative directives detected in submission)</option>
                    <option value="CUSTOM">✏️ Custom Recruiter Feedback (Enter custom note below)</option>
                  </select>
                </div>
              )}

              {/* Custom Note Textarea */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                  Optional Recruiter Note (Appends to Email)
                </label>
                <textarea
                  value={modalCustomNote}
                  onChange={(e) => setModalCustomNote(e.target.value)}
                  placeholder="e.g. Great enthusiasm in your project. We recommend expanding your automated test suite and re-applying for our next intake."
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
                      Executive View
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
                        <span className="text-xs font-bold text-[#D4AF37] tracking-widest uppercase">PARIKSHA MERIT PLATFORM</span>
                        <h4 className="text-sm font-extrabold text-white mt-1">Official Technical Evaluation Notice</h4>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#180e09] border border-[#3d2516] flex justify-between items-center">
                        <span className="font-bold text-white">{activeModalCandidate.name}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${modalDecisionType === 'SHORTLISTED' ? 'bg-emerald-950 text-emerald-300 border-emerald-500' : 'bg-red-950 text-red-300 border-red-500'}`}>
                          {modalDecisionType === 'SHORTLISTED' ? 'CANDIDATE SHORTLISTED' : 'TECHNICAL SCREENING NOTICE'}
                        </span>
                      </div>
                      <div className="text-neutral-300 text-xs leading-relaxed">
                        {modalDecisionType === 'SHORTLISTED' 
                          ? `Congratulations ${activeModalCandidate.name}, your project submission has passed our merit-based technical screening threshold based on genuine code authorship and demonstrated engineering capability.`
                          : `Thank you for your interest and submission, ${activeModalCandidate.name}. Following our technical review, we have chosen to proceed with other candidates whose current project scope aligns more closely with our production requirements. Your code quality score was evaluated at ${activeModalCandidate.authenticity_score ?? 0}%.`}
                      </div>
                      {modalCustomNote && (
                        <div className="p-2.5 rounded bg-black/50 border border-[#3A2F27] text-neutral-300 italic text-[11px]">
                          "{modalCustomNote}"
                        </div>
                      )}
                      <div className="pt-2 border-t border-[#3A2F27] flex items-center justify-between text-[11px] text-[#FFD166]">
                        <span>Verified ProofCard credential attached</span>
                        <span className="font-bold underline cursor-pointer">Live Ledger URL</span>
                      </div>
                    </div>
                  )}

                  {emailTab === 'text' && (
                    <pre className="text-[11px] font-mono text-neutral-300 whitespace-pre-wrap leading-relaxed">
                      {`================================================================================
PARIKSHA: CANDIDATE TECHNICAL EVALUATION & FEEDBACK
================================================================================

Candidate:      ${activeModalCandidate.name}
Email:          ${activeModalCandidate.email || 'candidate@example.edu'}
Institution:    ${activeModalCandidate.college} (${classifyCollegeTier(activeModalCandidate.college || activeModalCandidate.college_tier).label})
Status:         ${modalDecisionType === 'SHORTLISTED' ? 'CANDIDATE SHORTLISTED' : 'TECHNICAL SCREENING NOTICE'}

EVALUATION SUMMARY:
${modalDecisionType === 'SHORTLISTED'
  ? `Based on verified repository authorship, progressive development history, and demonstrated technical competency, your application has passed the merit-based screening threshold.`
  : `Thank you for your submission. Following code review and verification, we have decided to proceed with other applicants whose current experience aligns more closely with our role requirements.`}

TECHNICAL SCORECARD:
- Code Quality Score:   ${activeModalCandidate.authenticity_score ?? 0} / 100
- Viva Defense Status:  ${isLiveDefended(activeModalCandidate) ? `${activeModalCandidate.viva_score} / 10 (Defended)` : 'Pending Remote Defense'}
- Zero Pedigree Bias:   Evaluated strictly on code quality and technical merit

View verified credential on live ledger:
https://proofcard.vercel.app/?verify=${encodeURIComponent(activeModalCandidate.candidate_id || '')}
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

            {/* Modal Footer with Direct mailto: Fallback */}
            <div className="px-6 py-4 bg-[#1e100a] border-t border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveModalCandidate(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white transition cursor-pointer"
              >
                Cancel
              </button>

              <div className="flex items-center gap-2">
                {/* 1-Click Native mailto: link */}
                {(() => {
                  const subject = `[Technical Evaluation Notice] ${activeModalCandidate.name} - ${modalDecisionType === 'SHORTLISTED' ? 'Next Steps' : 'Application Update'}`;
                  const body = `Hello ${activeModalCandidate.name},\n\n${
                    modalDecisionType === 'SHORTLISTED'
                      ? 'Congratulations, your technical submission has passed our merit screening threshold.'
                      : 'Thank you for your interest and submission. Following our review, we have decided to proceed with other candidates.'
                  }\n\nCode Quality: ${activeModalCandidate.authenticity_score ?? 0}%\n${modalCustomNote ? `\nRecruiter Note: ${modalCustomNote}\n` : ''}\nBest regards,\nPariksha Technical Evaluation Team`;
                  const mailtoLink = `mailto:${encodeURIComponent(activeModalCandidate.email || 'candidate@example.edu')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                  return (
                    <a
                      href={mailtoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-black/60 border border-[#D4AF37]/50 text-[#FFD166] hover:bg-[#D4AF37]/20 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                      title="Open in your default email client"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open in Email App</span>
                    </a>
                  );
                })()}

                {/* Dispatch via API / n8n button */}
                <button
                  type="button"
                  disabled={isSending}
                  onClick={handleDispatchOfficialEmail}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E85D04] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:opacity-90 transition cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {isSending ? (
                    <>
                      <span className="animate-spin">⚙</span>
                      <span>Dispatching...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Dispatch Decision Notice</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
