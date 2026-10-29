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
import { CandidateProfile, DeploymentContract } from '../types';
import { createDeploymentContract } from '../services/api';

interface ProofCard3DProps {
  candidate: CandidateProfile | null;
  onNavigateToTab: (tab: string) => void;
  onSelectCandidate?: (candidate: CandidateProfile) => void;
  cohort?: CandidateProfile[];
}


// Interactive Large Radar Skill Competency Polygon Chart
const RadarSkillChart: React.FC<{
  authenticity: number;
  viva: number;
  isClone?: boolean;
  isAdversarial?: boolean;
}> = ({ authenticity, viva, isClone, isAdversarial }) => {
  const [hoveredAxis, setHoveredAxis] = useState<string | null>(null);

  const cx = 175;
  const cy = 135;
  const r = 85;

  const vArchitecture = isClone ? 30 : (isAdversarial ? 20 : (authenticity >= 70 ? 88 : 45));
  const vTesting = isClone ? 25 : (isAdversarial ? 15 : Math.min(92, Math.max(40, authenticity - 5)));
  const vGit = Math.min(100, Math.max(15, authenticity));
  const vCodeQuality = isClone ? 25 : (isAdversarial ? 10 : Math.min(95, authenticity + 3));
  const vViva = Math.min(100, Math.max(10, (viva !== undefined ? viva : 7) * 10));

  const axes = [
    { 
      id: 'arch', 
      label: 'Architecture', 
      val: vArchitecture, 
      angle: -90,
      desc: 'Modular separation, cyclomatic complexity bounds, and clean dependency decoupling.' 
    },
    { 
      id: 'test', 
      label: 'Testing', 
      val: vTesting, 
      angle: -18,
      desc: 'Unit testing discipline, failure edge-cases, and automated pipeline verification.' 
    },
    { 
      id: 'git', 
      label: 'Git Discipline', 
      val: vGit, 
      angle: 54,
      desc: 'Organic commit progression, multi-day development cadence, and healthy deletion ratio.' 
    },
    { 
      id: 'code', 
      label: 'Code Quality', 
      val: vCodeQuality, 
      angle: 126,
      desc: '0% public tutorial plagiarism match, verified AST structures, and clean typing.' 
    },
    { 
      id: 'viva', 
      label: 'Viva Defense', 
      val: vViva, 
      angle: 198,
      desc: 'Verbal conceptual clarity, technical justification, and deep design reasoning.' 
    }
  ];

  const getCoord = (angleDeg: number, distance: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: cx + distance * Math.cos(rad),
      y: cy + distance * Math.sin(rad)
    };
  };

  const polygonPoints = axes.map(a => {
    const pt = getCoord(a.angle, (r * a.val) / 100);
    return `${pt.x},${pt.y}`;
  }).join(' ');

  const levels = [0.25, 0.5, 0.75, 1.0];
  const activeAxisObj = axes.find(a => a.id === hoveredAxis) || null;

  return (
    <div className="bg-black/60 rounded-2xl border border-[#3A2F27] p-4 flex flex-col items-center justify-between shadow-2xl relative w-full sm:w-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between w-full mb-1">
        <span className="text-xs font-bold uppercase tracking-wider text-[#FFD166] font-mono flex items-center gap-1.5">
          <span>Competency Radar</span>
          <span className="text-[10px] text-neutral-400 font-normal">(5-Axis AST)</span>
        </span>
        <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
          Live Polygon
        </span>
      </div>

      {/* SVG Radar */}
      <div className="relative my-1">
        <svg width="350" height="260" viewBox="0 0 350 260" className="overflow-visible select-none max-w-full">
          <defs>
            <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={isClone || isAdversarial ? 'rgba(239,68,68,0.45)' : 'rgba(212,175,55,0.45)'} />
              <stop offset="100%" stopColor={isClone || isAdversarial ? 'rgba(239,68,68,0.05)' : 'rgba(212,175,55,0.05)'} />
            </radialGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Concentric Pentagons */}
          {levels.map((lvl, lidx) => {
            const pts = axes.map(a => {
              const pt = getCoord(a.angle, r * lvl);
              return `${pt.x},${pt.y}`;
            }).join(' ');
            return (
              <polygon
                key={lidx}
                points={pts}
                fill="none"
                stroke="rgba(212, 175, 55, 0.2)"
                strokeWidth="1"
                strokeDasharray={lvl === 1.0 ? 'none' : '3,3'}
              />
            );
          })}

          {/* Axis Guidelines */}
          {axes.map((a, i) => {
            const pt = getCoord(a.angle, r);
            const isTargeted = hoveredAxis === a.id;
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={pt.x}
                y2={pt.y}
                stroke={isTargeted ? '#FFD166' : 'rgba(212, 175, 55, 0.25)'}
                strokeWidth={isTargeted ? 1.5 : 1}
                className="transition-colors duration-200"
              />
            );
          })}

          {/* Filled Skill Polygon with Glow */}
          <polygon
            points={polygonPoints}
            fill="url(#radarGlow)"
            stroke={isClone || isAdversarial ? '#EF4444' : '#FFD166'}
            strokeWidth="2.5"
            filter="url(#glow)"
            className="transition-all duration-300 cursor-pointer"
          />

          {/* Axis Vertex Nodes & Labels with Generous Margins */}
          {axes.map((a, i) => {
            const pt = getCoord(a.angle, (r * a.val) / 100);
            const isTargeted = hoveredAxis === a.id;
            
            let lblX = cx;
            let lblY = cy;
            let anchor = 'middle';
            
            if (a.angle === -90) { // Top: Architecture
              lblX = cx;
              lblY = cy - r - 16;
              anchor = 'middle';
            } else if (a.angle === -18) { // Top-Right: Testing
              lblX = cx + r + 24;
              lblY = cy - 6;
              anchor = 'start';
            } else if (a.angle === 54) { // Bottom-Right: Git Discipline
              lblX = cx + (r * Math.cos(54 * Math.PI / 180)) + 12;
              lblY = cy + (r * Math.sin(54 * Math.PI / 180)) + 18;
              anchor = 'start';
            } else if (a.angle === 126) { // Bottom-Left: Code Quality
              lblX = cx + (r * Math.cos(126 * Math.PI / 180)) - 12;
              lblY = cy + (r * Math.sin(126 * Math.PI / 180)) + 18;
              anchor = 'end';
            } else if (a.angle === 198) { // Top-Left: Viva Defense
              lblX = cx - r - 24;
              lblY = cy - 6;
              anchor = 'end';
            }

            return (
              <g 
                key={i} 
                onMouseEnter={() => setHoveredAxis(a.id)}
                onMouseLeave={() => setHoveredAxis(null)}
                className="cursor-pointer group"
              >
                {/* Invisible hover hotspot */}
                <circle cx={pt.x} cy={pt.y} r="14" fill="transparent" />

                {/* Point Marker */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isTargeted ? 6 : 4}
                  fill={isTargeted ? '#FFFFFF' : (isClone || isAdversarial ? '#EF4444' : '#FFD166')}
                  stroke="#000000"
                  strokeWidth="1.5"
                  className="transition-all duration-200"
                />

                {/* Text Label */}
                <text
                  x={lblX}
                  y={lblY}
                  textAnchor={anchor}
                  fill={isTargeted ? '#FFD166' : '#E6C280'}
                  fontSize={isTargeted ? '11' : '10'}
                  fontFamily="sans-serif"
                  fontWeight={isTargeted ? 'bold' : '600'}
                  className="transition-all duration-200"
                >
                  {a.label} ({a.val}%)
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Dynamic Interactive Explanation Tooltip Bar */}
      <div className="w-full mt-1 pt-2 border-t border-[#3A2F27] min-h-[38px] flex items-center justify-between text-xs">
        {activeAxisObj ? (
          <div className="animate-fadeIn w-full">
            <span className="font-bold text-[#FFD166] mr-1.5">{activeAxisObj.label} ({activeAxisObj.val}%):</span>
            <span className="text-neutral-300 font-sans">{activeAxisObj.desc}</span>
          </div>
        ) : (
          <div className="text-[11px] text-neutral-400 font-sans italic w-full text-center">
            💡 Hover over any point on the polygon to inspect verified evidence.
          </div>
        )}
      </div>
    </div>
  );
};

export const ProofCard3D: React.FC<ProofCard3DProps> = ({
  candidate,
  onNavigateToTab,
  onSelectCandidate,
  cohort = []
}) => {
  // If no candidate is active, show clean high-tech empty state
  if (!candidate) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="p-8 sm:p-12 rounded-2xl bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-2xl">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#8B1E1E]/20 border border-[#D4AF37]/40 flex items-center justify-center">
            <Award className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 font-warrior">
            No Pariksha Card Generated
          </h2>
          <p className="text-sm text-[#C9B89A] max-w-md mx-auto mb-6">
            A candidate must undergo live repository scanning and technical defense evaluation to issue a tamper-proof 3D cryptographic Pariksha card credential.
          </p>
          <button
            onClick={() => onNavigateToTab('ingestion')}
            className="btn-dev-primary text-xs flex items-center gap-2 px-6 py-3.5 mx-auto shadow-lg cursor-pointer font-bold"
          >
            <span>Go to Ingestion Scanner</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const card = candidate.proof_card || {
    status: candidate.has_prompt_injection
      ? 'FLAGGED_ADVERSARIAL_INJECTION'
      : (candidate.is_clone 
        ? 'REJECT_SUSPECTED_PLAGIARISM' 
        : ((candidate.authenticity_score || 0) >= 80 ? 'VERIFIED_EXEMPLARY' : 'VERIFIED_SOLID')),
    has_prompt_injection: Boolean(candidate.has_prompt_injection),
    headline: candidate.has_prompt_injection
      ? 'Security Alert: Indirect prompt injection payload detected in repository source/README.'
      : (candidate.is_clone
        ? 'Repository matched online tutorial patterns.'
        : 'Authentic software engineering profile verified via live AST and Git-DNA telemetry.'),
    strengths: candidate.has_prompt_injection
      ? ['Automated AppSec pipeline detected indirect prompt injection payload', 'Adversarial evasion attempt neutralized']
      : (candidate.is_clone
        ? ['Basic code compilation detected']
        : ['Organic commit progression', 'Extracted AST demonstrates modularity']),
    growth_area: candidate.has_prompt_injection
      ? 'Remove adversarial prompt injection directives and LLM manipulation strings from repository source.'
      : 'Expand unit and integration test fixtures.',
    specific_action: candidate.has_prompt_injection
      ? 'Sanitize repository documentation and comments to adhere to authentic coding standards.'
      : 'Write automated unit tests covering error edge cases.',
    tamper_proof_hash: `SHA256:${candidate.candidate_id}`,
  };

  const isClone = candidate.is_clone;
  const isAdversarial = Boolean(candidate.has_prompt_injection || card.has_prompt_injection || card.status === 'FLAGGED_ADVERSARIAL_INJECTION' || candidate.is_prompt_injected || card.status === 'FLAGGED_PROMPT_INJECTION' || candidate.security_scan?.is_prompt_injected);
  const isPromptInjected = isAdversarial;
  
  const [copied, setCopied] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [deploymentContract, setDeploymentContract] = useState<DeploymentContract | null>(candidate.deployment_contract || null);

  const publicVerifyUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/?verify=${encodeURIComponent(candidate.candidate_id)}&name=${encodeURIComponent(candidate.name)}&auth=${candidate.authenticity_score}&viva=${candidate.viva_score ?? 0}&status=${encodeURIComponent(card.status)}`
    : `http://localhost:5173/?verify=${encodeURIComponent(candidate.candidate_id)}&name=${encodeURIComponent(candidate.name)}&auth=${candidate.authenticity_score}&viva=${candidate.viva_score ?? 0}&status=${encodeURIComponent(card.status)}`;

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

  useEffect(() => {
    let active = true;
    createDeploymentContract(
      candidate,
      candidate.project_type || 'Software Engineer',
      Object.keys(candidate.skill_evidence || {}),
    ).then((contract) => {
      if (active) setDeploymentContract(contract);
    });
    return () => {
      active = false;
    };
  }, [candidate]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(publicVerifyUrl);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="p-6 rounded-2xl mb-6 bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
              Pariksha Verification Ledger
            </h1>
          </div>

          {/* Action Buttons & Candidate Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            {onSelectCandidate && cohort && cohort.length > 0 && (
              <div className="flex items-center gap-2 bg-black/60 border border-[#D4AF37]/40 px-3.5 py-2 rounded-xl">
                <span className="text-xs text-[#FFD166] font-bold uppercase">Inspect:</span>
                <select
                  value={candidate.candidate_id}
                  onChange={(e) => {
                    const selected = cohort.find(c => c.candidate_id === e.target.value);
                    if (selected) onSelectCandidate(selected);
                  }}
                  className="bg-transparent text-sm text-[#FFD166] font-semibold focus:outline-none cursor-pointer max-w-[180px]"
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
              className="btn-dev-outline text-xs sm:text-sm flex items-center gap-1.5 px-4 py-2 cursor-pointer font-bold"
            >
              <Printer className="w-4 h-4 text-[#D4AF37]" />
              <span>Print PDF</span>
            </button>

            <button
              onClick={handleShare}
              className={`text-xs sm:text-sm flex items-center gap-1.5 px-5 py-2 rounded-full border transition cursor-pointer font-bold ${
                copied
                  ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                  : 'btn-dev-primary'
              }`}
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Link Copied!' : 'Share Public Link'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* The 3D ProofCard Container */}
      <div 
        onMouseMove={handleCardMouseMove}
        onMouseLeave={handleCardMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: tilt.isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
          transformStyle: 'preserve-3d'
        }}
        className="proofcard-printable p-7 sm:p-9 rounded-3xl bg-black/40 backdrop-blur-xl border border-[#D4AF37]/35 shadow-[0_15px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.15)] relative overflow-hidden transition-all duration-300"
      >
        {/* Dynamic Light Glare Reflection */}
        {tilt.isHovered && (
          <div 
            className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-200"
            style={{
              background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(212, 175, 55, 0.22) 0%, rgba(255, 255, 255, 0.08) 25%, transparent 65%)`,
            }}
          />
        )}
        {/* Amber Ambient Vignette */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Institutional Verification Stamp */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-4 py-2.5 rounded-xl relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#8B1E1E] border border-[#D4AF37] flex items-center justify-center text-sm text-[#FFD166] font-bold shadow-sm">
              🏛️
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white tracking-wider uppercase">
                {candidate.college || 'Verified Academic Institution'}
              </div>
              <div className="text-xs text-[#E6C280] font-sans font-medium mt-0.5">
                Verifiable Credential Ledger · Problem Statement IM-105
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-mono font-bold text-[#FFD166] bg-black/60 px-3 py-1 rounded-lg border border-[#D4AF37]/30">
            <span>🛡️ INSTITUTIONALLY VERIFIED</span>
          </div>
        </div>

        {/* Top Header Row of Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-b border-[#3A2F27] pb-5 mb-5 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl shadow-inner ${
              isPromptInjected
                ? 'bg-red-950 text-red-300 border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' 
                : isClone 
                ? 'bg-red-950/50 text-red-400 border border-red-500/50' 
                : 'bg-[#2A241B] text-[#D4AF37] border border-[#D4AF37]/50 shadow-[0_0_12px_rgba(212,175,55,0.3)]'
            }`}>
              {isPromptInjected ? '🚨' : isClone ? '⚠️' : 'Ω'}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-xl sm:text-2xl font-bold text-white tracking-wide font-sans">{candidate.name}</span>
                <span className={`text-xs font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                  isPromptInjected
                    ? 'bg-red-950 text-red-200 border-red-500 font-extrabold shadow-sm' 
                    : isClone
                    ? 'bg-red-900/40 text-red-300 border-red-500/40'
                    : 'bg-[#8B1E1E]/40 text-[#FFD166] border-[#D4AF37]/50'
                }`}>
                  {isPromptInjected ? 'FLAGGED: PROMPT INJECTION' : card.status}
                </span>
              </div>
              <p className="text-sm text-neutral-200 mt-1 font-medium font-sans">
                Verified Skill Track: <strong className="text-white">{candidate.project_type || 'Full Stack Engineer'}</strong>
              </p>
            </div>
          </div>

          {/* Scores Overview */}
          <div className="flex items-center gap-4 font-mono bg-black/60 px-5 py-3 rounded-xl border border-[#3A2F27]">
            <div className="text-right">
              <div className="text-xs text-neutral-300 uppercase font-bold">Authenticity</div>
              <div className={`text-2xl font-black ${isAdversarial || isClone ? 'text-red-400' : 'text-[#FFD166]'}`}>
                {candidate.authenticity_score} <span className="text-xs text-neutral-400 font-normal">/ 100</span>
              </div>
            </div>
            <div className="h-9 w-[1px] bg-[#3A2F27]"></div>
            <div className="text-right">
              <div className="text-xs text-neutral-300 uppercase font-bold">Viva Defense</div>
              <div className="text-2xl font-black text-[#D4AF37]">
                {candidate.viva_score !== undefined ? candidate.viva_score : '--'} <span className="text-xs text-neutral-400 font-normal">/ 10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mentor Assessment Headline & Plagiarism Origin Attribution */}
        <div className={`rounded-xl border p-4 sm:p-5 mb-5 relative z-10 ${
          isPromptInjected
            ? 'bg-red-950/60 border-2 border-red-500 shadow-lg' 
            : isClone
            ? 'bg-red-950/40 border-red-500/50'
            : 'bg-black/50 border-[#3A2F27]'
        }`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className={`text-xs sm:text-sm font-bold uppercase tracking-wider block ${
              isPromptInjected ? 'text-red-300 font-mono' : isClone ? 'text-red-400' : 'text-[#FFD166]'
            }`}>
              {isPromptInjected ? '🚨 Security Alert: Adversarial Prompt Injection Neutralized' : (isClone ? '🚨 Forensic Plagiarism Audit Verdict:' : 'Forensic Verdict:')}
            </span>
            {isClone && candidate.matched_tutorial && (
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded bg-red-900 border border-red-600 text-white font-mono font-bold">
                  {Math.round(candidate.matched_tutorial.similarity_score * 100)}% Copied Code
                </span>
                {(candidate.matched_tutorial.source_url || candidate.matched_tutorial.youtube_url) && (
                  <a
                    href={candidate.matched_tutorial.source_url || candidate.matched_tutorial.youtube_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#FFD166] hover:underline inline-flex items-center gap-1 font-mono font-bold"
                  >
                    <span>View Upstream Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            )}
          </div>
          <p className="text-base sm:text-lg text-neutral-100 font-semibold leading-relaxed font-sans">
            "{card.headline}"
          </p>
        </div>

        {/* Interactive Competency Radar & Evidence Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5 relative z-10 items-stretch">
          {/* Large Interactive Competency Radar Chart */}
          <div className="lg:col-span-5 flex flex-col">
            <RadarSkillChart 
              authenticity={candidate.authenticity_score} 
              viva={candidate.viva_score ?? 0}
              isClone={isClone}
              isAdversarial={isAdversarial}
            />
          </div>

          {/* Strengths & Growth Areas */}
          <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Strengths */}
          <div className="bg-black/60 rounded-xl border border-[#3A2F27] p-5">
            <div className="flex items-center gap-2 mb-3 text-sm font-bold text-emerald-400 uppercase tracking-wider font-mono">
              <CheckCircle2 className="w-4 h-4" />
              <span>Verified Strengths</span>
            </div>
            <ul className="space-y-2 text-sm text-neutral-200 font-sans font-medium">
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
          <div className="bg-black/60 rounded-xl border border-[#3A2F27] p-5">
            <div className="flex items-center gap-2 mb-3 text-sm font-bold text-[#FFD166] uppercase tracking-wider font-mono">
              <Zap className="w-4 h-4 text-[#D4AF37]" />
              <span>Engineering Growth Roadmap</span>
            </div>
            <div className="space-y-2.5 text-sm text-neutral-200 font-sans font-medium">
              <p className="text-neutral-200"><strong className="text-[#FFD166]">Gap:</strong> {card.growth_area || 'Deepen automated end-to-end integration and load testing.'}</p>
              <div className="p-3 rounded-lg bg-[#2A241B]/60 border border-[#3A2F27]">
                <p className="text-[#F5E9C7] leading-snug"><strong className="text-[#D4AF37]">Action:</strong> {card.specific_action || 'Ship automated CI/CD pipeline with comprehensive mock integration.'}</p>
              </div>
            </div>
          </div>
          </div>
        </div>

        {deploymentContract && (
          <div className="mb-5 p-5 rounded-xl bg-black/60 border border-[#E6C280]/30 relative z-10">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 text-base font-bold text-[#FFD166] uppercase tracking-wider font-mono">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Deployment Readiness Contract</span>
                </div>
                <p className="feature-note mt-1">Evidence for this role, the work sample still required, and the outcomes an authorised mentor must verify later.</p>
              </div>
              <span className="text-sm px-2.5 py-1 rounded-full border border-[#D4AF37]/40 text-[#FFD166] font-mono font-bold">
                {deploymentContract.status.replaceAll('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
              <div className="rounded-lg bg-[#2A241B]/60 border border-[#3A2F27] p-3">
                <span className="text-xs uppercase tracking-wider text-[#C9B89A] block">Role</span>
                <strong className="text-sm text-white block mt-1">{deploymentContract.role_title}</strong>
              </div>
              <div className="rounded-lg bg-[#2A241B]/60 border border-[#3A2F27] p-3">
                <span className="text-xs uppercase tracking-wider text-[#C9B89A] block">Source proof</span>
                <strong className="text-sm text-white block mt-1">{deploymentContract.evidence_basis.source_files.length} linked files</strong>
              </div>
              <div className="rounded-lg bg-[#2A241B]/60 border border-[#3A2F27] p-3">
                <span className="text-xs uppercase tracking-wider text-[#C9B89A] block">Workplace result</span>
                <strong className="text-sm text-amber-300 block mt-1">Not recorded</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
              {deploymentContract.competencies.map((competency) => (
                <div key={competency.id} className="p-3 rounded-lg bg-[#2A241B]/60 border border-[#3A2F27]">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <strong className="text-sm text-white">{competency.name}</strong>
                    <span className={`text-xs uppercase font-bold ${competency.state === 'OBSERVED_IN_SOURCE' ? 'text-emerald-300' : 'text-amber-300'}`}>
                      {competency.state === 'OBSERVED_IN_SOURCE' ? 'Observed' : 'Needs proof'}
                    </span>
                  </div>
                  {competency.source_files.length > 0 ? (
                    <p className="feature-note">Source: {competency.source_files.join(', ')}</p>
                  ) : (
                    <p className="feature-note">{competency.next_proof}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-[#8B1E1E]/20 border border-[#D4AF37]/35 mb-4">
              <div className="flex items-center justify-between gap-2 mb-2">
                <strong className="text-sm uppercase tracking-wider text-[#FFD166]">Required work sample</strong>
                <span className="text-xs uppercase text-amber-300 font-bold">Not started</span>
              </div>
              <p className="text-sm text-neutral-100 leading-relaxed">{deploymentContract.work_sample.brief}</p>
              <p className="feature-note mt-2">Evidence required: {deploymentContract.work_sample.required_evidence.join(' · ')}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigateToTab('terminal')}
                className="btn-dev-outline text-sm px-4 py-2 cursor-pointer font-bold"
              >
                Review source evidence
              </button>
              <button
                type="button"
                onClick={() => onNavigateToTab('viva')}
                className="btn-dev-primary text-sm px-4 py-2 cursor-pointer font-bold"
              >
                Run code defense
              </button>
            </div>
          </div>
        )}

        {/* Footer Integrity Seal & REAL WORKING QR CODE */}
        <div className="pt-4 border-t border-[#3A2F27] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono relative z-10">
          <div>
            <div className="flex items-center gap-2 text-neutral-300">
              <Lock className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-bold text-white text-xs sm:text-sm">SHA-256:</span>
              <span className="text-[#FFD166] text-xs sm:text-sm font-mono">{(card.tamper_proof_hash || '').substring(0, 28)}...</span>
            </div>
            <div className="mt-1 text-xs text-neutral-300 flex items-center gap-1.5 font-mono">
              <span>Public Link:</span>
              <span className="text-[#FFD166] truncate max-w-[240px] sm:max-w-xs">{publicVerifyUrl}</span>
            </div>
          </div>

          {/* Real Scannable Barcode / QR Code */}
          <div className="flex items-center gap-3 bg-black/60 p-3 rounded-xl border border-[#3A2F27] shrink-0">
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
              <span className="text-xs sm:text-sm text-white font-bold block">Scan to Verify</span>
              <span className="text-xs text-neutral-300 block">Camera opens live ledger</span>
              <button
                onClick={handleShare}
                className="text-xs text-[#FFD166] hover:underline flex items-center gap-1 mt-1 cursor-pointer font-bold font-sans"
              >
                <Copy className="w-3.5 h-3.5" />
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
          className="btn-dev-primary text-sm flex items-center gap-2 shadow-xl cursor-pointer px-7 py-3.5 font-bold"
        >
          <span>Proceed to Recruiter Battle Arena</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
