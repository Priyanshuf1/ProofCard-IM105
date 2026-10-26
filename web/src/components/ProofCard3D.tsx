import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Share2, 
  Printer, 
  CheckCircle2, 
  ArrowRight,
  Lock,
  Zap,
  Sparkles,
  Award,
  AlertTriangle,
  Copy,
  ExternalLink
} from 'lucide-react';
import QRCode from 'qrcode';
import { CandidateProfile } from '../types';
import { CAMPUS_COHORT_100 } from '../data/cohortData';

interface ProofCard3DProps {
  candidate: CandidateProfile;
  onNavigateToTab: (tab: string) => void;
  onSelectCandidate?: (candidate: CandidateProfile) => void;
  cohort?: CandidateProfile[];
}

export const ProofCard3D: React.FC<ProofCard3DProps> = ({
  candidate,
  onNavigateToTab,
  onSelectCandidate,
  cohort = CAMPUS_COHORT_100
}) => {

  const card = candidate.proof_card || {
    status: 'VERIFIED_COMPETENT',
    headline: 'High-confidence authentic engineering signal.',
    strengths: [
      'Genuine iterative commits over a multi-week span',
      'Extracted AST demonstrates clean modularity'
    ],
    growth_area: 'Add automated integration tests with mock fixtures.',
    specific_action: 'Write unit tests covering boundary error edge cases.',
    tamper_proof_hash: 'SHA256:verified_demo_hash_9921',
  };

  const isClone = candidate.is_clone;
  const [copied, setCopied] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  const publicVerifyUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/?verify=${candidate.candidate_id}`
    : `http://localhost:5173/?verify=${candidate.candidate_id}`;

  useEffect(() => {
    // Generate real, high-resolution scannable QR code
    QRCode.toDataURL(publicVerifyUrl, {
      width: 128,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    })
      .then((url: string) => setQrCodeDataUrl(url))
      .catch((err: any) => console.error('QR Generation Error:', err));
  }, [candidate.candidate_id, publicVerifyUrl]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(publicVerifyUrl);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Header - Glassmorphic Deviathon Theme */}
      <div className="p-6 rounded-2xl mb-6 bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#D4AF37]">
                Tamper-Evident Credential
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
              ProofCard Verification Ledger
            </h1>
          </div>

          {/* Action Buttons & Candidate Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            {onSelectCandidate && cohort && cohort.length > 0 && (
              <div className="flex items-center gap-1.5 bg-black/60 border border-[#D4AF37]/40 px-3 py-1.5 rounded-xl">
                <span className="text-[10px] text-[#D4AF37] font-warrior font-bold uppercase">Inspect:</span>
                <select
                  value={candidate.candidate_id}
                  onChange={(e) => {
                    const selected = cohort.find(c => c.candidate_id === e.target.value);
                    if (selected) onSelectCandidate(selected);
                  }}
                  className="bg-transparent text-xs text-[#FFD166] font-semibold focus:outline-none cursor-pointer max-w-[160px]"
                >
                  <option value={candidate.candidate_id} className="bg-neutral-900 text-white">
                    {candidate.name} ({candidate.authenticity_score}%)
                  </option>
                  {cohort.filter(c => c.candidate_id !== candidate.candidate_id).slice(0, 15).map(c => (
                    <option key={c.candidate_id} value={c.candidate_id} className="bg-neutral-900 text-white">
                      {c.name} · {c.college.split(' ')[0]} ({c.authenticity_score}%)
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={() => window.print()}
              className="btn-dev-outline text-xs flex items-center gap-1.5 px-4 py-2 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Print PDF</span>
            </button>

            <button
              onClick={handleShare}
              className={`text-xs flex items-center gap-1.5 px-4 py-2 rounded-full border transition cursor-pointer font-warrior font-bold ${
                copied
                  ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                  : 'btn-dev-primary'
              }`}
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied!' : 'Share Public Link'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* The 3D ProofCard Container */}
      <div className="p-7 sm:p-9 rounded-3xl bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-2xl relative overflow-hidden">
        {/* Amber Ambient Vignette */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Institutional Verification Stamp - GLA University NAAC A+ */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-4 py-2 rounded-xl relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#8B1E1E] border border-[#D4AF37] flex items-center justify-center text-xs text-[#FFD166] font-bold shadow-sm">
              🏛️
            </div>
            <div>
              <div className="text-[10px] font-warrior font-bold text-white tracking-widest uppercase">
                GLA University Mathura · NAAC A+ Accredited
              </div>
              <div className="text-[9px] text-[#C9B89A] font-sans">
                Official Deviathon 2.0 Hackathon Credential Ledger · Problem Statement IM-105
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#FFD166] bg-black/60 px-2.5 py-1 rounded-lg border border-[#D4AF37]/30">
            <span>🛡️ INSTITUTIONALLY VERIFIED</span>
          </div>
        </div>


        {/* Top Header Row of Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-b border-[#3A2F27] pb-5 mb-5 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl shadow-inner ${
              isClone 
                ? 'bg-red-950/50 text-red-400 border border-red-500/50' 
                : 'bg-[#2A241B] text-[#D4AF37] border border-[#D4AF37]/50 shadow-[0_0_12px_rgba(212,175,55,0.3)]'
            }`}>
              {isClone ? '⚠️' : 'Ω'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-deviathon font-extrabold text-white tracking-wide">{candidate.name}</span>
                <span className={`text-[10px] font-warrior font-bold uppercase px-2 py-0.5 rounded-full border ${
                  isClone
                    ? 'bg-red-900/40 text-red-300 border-red-500/40'
                    : 'bg-[#8B1E1E]/40 text-[#FFD166] border-[#D4AF37]/50'
                }`}>
                  {card.status}
                </span>
              </div>
              <p className="text-xs text-[#C9B89A] mt-0.5">
                Verified Skill Track: <strong className="text-white">{candidate.project_type || 'Full Stack Engineer'}</strong>
              </p>
            </div>
          </div>

          {/* Scores Overview */}
          <div className="flex items-center gap-4 font-mono bg-black/60 px-4 py-2.5 rounded-xl border border-[#3A2F27]">
            <div className="text-right">
              <div className="text-[10px] text-[#8A7F6B] uppercase font-warrior font-bold">Authenticity</div>
              <div className={`text-xl font-black ${isClone ? 'text-red-400' : 'text-[#FFD166]'}`}>
                {candidate.authenticity_score} <span className="text-xs text-[#8A7F6B] font-normal">/ 100</span>
              </div>
            </div>
            <div className="h-8 w-[1px] bg-[#3A2F27]"></div>
            <div className="text-right">
              <div className="text-[10px] text-[#8A7F6B] uppercase font-warrior font-bold">Viva Defense</div>
              <div className="text-xl font-black text-[#D4AF37]">
                {candidate.viva_score} <span className="text-xs text-[#8A7F6B] font-normal">/ 10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mentor Assessment Headline & Plagiarism Origin Attribution */}
        <div className={`rounded-xl border p-4 mb-5 relative z-10 ${
          isClone
            ? 'bg-red-950/40 border-red-500/50'
            : 'bg-black/50 border-[#3A2F27]'
        }`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
            <span className={`text-[10px] font-warrior font-bold uppercase tracking-wider block ${
              isClone ? 'text-red-400' : 'text-[#D4AF37]'
            }`}>
              {isClone ? '🚨 Forensic Plagiarism Audit Verdict:' : 'Forensic Verdict:'}
            </span>
            {isClone && candidate.matched_tutorial && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-red-900 border border-red-600 text-white font-mono font-bold">
                  {Math.round(candidate.matched_tutorial.similarity_score * 100)}% Copied Code
                </span>
                {(candidate.matched_tutorial.source_url || candidate.matched_tutorial.youtube_url) && (
                  <a
                    href={candidate.matched_tutorial.source_url || candidate.matched_tutorial.youtube_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-[#FFD166] hover:underline inline-flex items-center gap-1 font-mono"
                  >
                    <span>View Upstream Source</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            )}
          </div>
          <p className="text-xs sm:text-sm text-neutral-200 font-semibold leading-relaxed font-sans">
            "{card.headline}"
          </p>
        </div>


        {/* 2-Column: Strengths & Growth Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 relative z-10">
          {/* Strengths */}
          <div className="bg-black/50 rounded-xl border border-[#3A2F27] p-4">
            <div className="flex items-center gap-1.5 mb-2.5 text-xs font-warrior font-bold text-emerald-400 uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified Strengths</span>
            </div>
            <ul className="space-y-1.5 text-xs text-neutral-300 font-sans">
              {(card.strengths && card.strengths.length > 0 ? card.strengths : [
                'Demonstrated code originality with organic development cadence',
                'Solid architecture and cyclomatic complexity defense',
                'Tamper-proof cryptographic commit ledger verification'
              ]).map((str, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span className="leading-snug">{str}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Growth Area & Action */}
          <div className="bg-black/50 rounded-xl border border-[#3A2F27] p-4">
            <div className="flex items-center gap-1.5 mb-2.5 text-xs font-warrior font-bold text-[#D4AF37] uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Engineering Growth Roadmap</span>
            </div>
            <div className="space-y-2 text-xs text-neutral-300 font-sans">
              <p className="text-neutral-300"><strong className="text-[#C9B89A]">Gap:</strong> {card.growth_area || 'Deepen automated end-to-end integration and load testing.'}</p>
              <div className="p-2.5 rounded-lg bg-[#2A241B]/60 border border-[#3A2F27]">
                <p className="text-[#F5E9C7] leading-snug"><strong className="text-[#D4AF37]">Action:</strong> {card.specific_action || 'Ship automated CI/CD pipeline with comprehensive mock integration.'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Human-Readable Recruiter Explanation (Guardrail 1) */}
        {card.human_readable_reason && (
          <div className="mb-5 p-3.5 rounded-xl bg-amber-950/25 border border-[#D4AF37]/35 relative z-10 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-1 text-[11px] font-warrior font-bold text-[#FFD166] uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>IM-105 Human-Readable Ranking Rationale</span>
            </div>
            <p className="text-xs text-[#E6C280] font-sans leading-relaxed">
              {card.human_readable_reason}
            </p>
          </div>
        )}

        {/* Footer Integrity Seal & REAL WORKING QR CODE */}
        <div className="pt-4 border-t border-[#3A2F27] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono relative z-10">
          <div>
            <div className="flex items-center gap-2 text-[#C9B89A]">
              <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-warrior font-bold text-white">SHA-256:</span>
              <span className="text-[#FFD166]">{card.tamper_proof_hash.substring(0, 28)}...</span>
            </div>
            <div className="mt-1 text-[11px] text-[#8A7F6B] flex items-center gap-1 font-mono">
              <span>Public Link:</span>
              <span className="text-[#D4AF37] truncate max-w-[240px] sm:max-w-xs">{publicVerifyUrl}</span>
            </div>
          </div>

          {/* Real Scannable Barcode / QR Code */}
          <div className="flex items-center gap-3 bg-black/60 p-2.5 rounded-xl border border-[#3A2F27] shrink-0">
            {qrCodeDataUrl ? (
              <img 
                src={qrCodeDataUrl} 
                alt="Verifiable Credential QR Code" 
                className="w-16 h-16 rounded-lg bg-white p-1 shadow-sm"
              />
            ) : (
              <div className="w-16 h-16 rounded-lg bg-white/10 animate-pulse" />
            )}
            <div>
              <span className="text-xs text-white font-warrior font-bold block">Scan to Verify</span>
              <span className="text-[10px] text-[#8A7F6B] block">Camera opens live ledger</span>
              <button
                onClick={handleShare}
                className="text-[10px] text-[#D4AF37] hover:underline flex items-center gap-1 mt-1 cursor-pointer font-sans"
              >
                <Copy className="w-3 h-3" />
                <span>Copy Link</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation CTA to Recruiter Battle */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => onNavigateToTab('battle')}
          className="btn-dev-primary text-xs flex items-center gap-2 shadow-xl cursor-pointer px-6 py-3"
        >
          <span>Proceed to Recruiter Battle Arena</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
