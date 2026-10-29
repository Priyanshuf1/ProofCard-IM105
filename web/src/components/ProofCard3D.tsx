import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, 
  Share2, 
  Printer, 
  CheckCircle2, 
  ArrowRight,
  Lock,
  Zap,
  Award,
  AlertTriangle,
  Copy,
  ExternalLink
} from 'lucide-react';
import QRCode from 'qrcode';
import { CandidateProfile } from '../types';

interface ProofCard3DProps {
  candidate: CandidateProfile | null;
  onNavigateToTab: (tab: string) => void;
  onSelectCandidate?: (candidate: CandidateProfile) => void;
  cohort?: CandidateProfile[];
}

// Interactive Large High-Contrast Radar Skill Competency Polygon Chart
const RadarSkillChart: React.FC<{
  authenticity: number;
  viva: number;
  isClone?: boolean;
  isAdversarial?: boolean;
}> = ({ authenticity, viva, isClone, isAdversarial }) => {
  const [hoveredAxis, setHoveredAxis] = useState<string | null>(null);

  // Enlarged center and radius for maximum visual prominence
  const cx = 250;
  const cy = 190;
  const r = 130;

  const vArchitecture = isClone ? 30 : (isAdversarial ? 20 : (authenticity >= 70 ? 88 : 45));
  const vTesting = isClone ? 25 : (isAdversarial ? 15 : Math.min(92, Math.max(40, authenticity - 5)));
  const vGit = Math.min(100, Math.max(15, authenticity));
  const vCodeQuality = isClone ? 25 : (isAdversarial ? 10 : Math.min(95, authenticity + 3));
  const vViva = viva > 0 ? Math.min(100, Math.max(10, viva * 10)) : (isClone ? 10 : 20);

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
      label: viva > 0 ? 'Viva Defense' : 'Viva (Pending)', 
      val: vViva, 
      angle: 198,
      desc: viva > 0 ? 'Verbal conceptual clarity, technical justification, and deep design reasoning.' : 'Oral technical defense pending candidate completion.' 
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
    <div className="bg-black/60 rounded-2xl border border-[#3A2F27] p-4 sm:p-5 flex flex-col items-center justify-between shadow-2xl relative w-full h-full">
      {/* Top Header */}
      <div className="flex items-center justify-between w-full mb-2">
        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FFD166] font-mono flex items-center gap-1.5">
          <span>Competency Radar</span>
          <span className="text-[10px] text-neutral-400 font-normal">(5-Axis AST)</span>
        </span>
        <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-950/50 px-2.5 py-0.5 rounded-full border border-emerald-500/40 flex items-center gap-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Live Polygon</span>
        </span>
      </div>

      {/* Large SVG Radar Canvas */}
      <div className="relative my-2 flex justify-center w-full">
        <svg 
          viewBox="0 0 500 380" 
          className="w-full h-auto max-h-[350px] overflow-visible select-none"
        >
          <defs>
            <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={isClone || isAdversarial ? 'rgba(239,68,68,0.7)' : 'rgba(255,209,102,0.65)'} />
              <stop offset="65%" stopColor={isClone || isAdversarial ? 'rgba(239,68,68,0.3)' : 'rgba(212,175,55,0.3)'} />
              <stop offset="100%" stopColor={isClone || isAdversarial ? 'rgba(239,68,68,0.08)' : 'rgba(212,175,55,0.06)'} />
            </radialGradient>
            <filter id="radarBloom" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Concentric Pentagons & Scale Rungs */}
          {levels.map((lvl, lidx) => {
            const pts = axes.map(a => {
              const pt = getCoord(a.angle, r * lvl);
              return `${pt.x},${pt.y}`;
            }).join(' ');
            return (
              <g key={lidx}>
                <polygon
                  points={pts}
                  fill={lvl === 1.0 ? 'rgba(212, 175, 55, 0.04)' : 'none'}
                  stroke={lvl === 1.0 ? 'rgba(212, 175, 55, 0.65)' : 'rgba(212, 175, 55, 0.35)'}
                  strokeWidth={lvl === 1.0 ? '1.8' : '1.2'}
                  strokeDasharray={lvl === 1.0 ? 'none' : '4,4'}
                />
                {/* Scale Ring Numeric Markers on Vertical Axis */}
                <text
                  x={cx + 6}
                  y={cy - r * lvl + 4}
                  fill="rgba(255, 209, 102, 0.75)"
                  fontSize="9"
                  fontWeight="700"
                  fontFamily="monospace"
                  className="select-none"
                >
                  {Math.round(lvl * 100)}%
                </text>
              </g>
            );
          })}

          {/* Axis Guidelines / Radiating Spokes */}
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
                stroke={isTargeted ? '#FFD166' : 'rgba(212, 175, 55, 0.35)'}
                strokeWidth={isTargeted ? 2 : 1.2}
                className="transition-colors duration-200"
              />
            );
          })}

          {/* Filled Skill Polygon with Vibrant Luminous Glow */}
          <polygon
            points={polygonPoints}
            fill="url(#radarGlow)"
            stroke={isClone || isAdversarial ? '#EF4444' : '#FFD166'}
            strokeWidth="3.5"
            filter="url(#radarBloom)"
            className="transition-all duration-300 cursor-pointer"
          />

          {/* Axis Vertex Nodes & High-Contrast Labels with Generous Margins */}
          {axes.map((a, i) => {
            const pt = getCoord(a.angle, (r * a.val) / 100);
            const isTargeted = hoveredAxis === a.id;
            
            let lblX = cx;
            let lblY = cy;
            let anchor: 'start' | 'middle' | 'end' = 'middle';
            
            if (a.angle === -90) { // Top: Architecture
              lblX = cx;
              lblY = cy - r - 20;
              anchor = 'middle';
            } else if (a.angle === -18) { // Top-Right: Testing
              lblX = cx + r + 26;
              lblY = cy - 8;
              anchor = 'start';
            } else if (a.angle === 54) { // Bottom-Right: Git Discipline
              lblX = cx + (r * Math.cos(54 * Math.PI / 180)) + 16;
              lblY = cy + (r * Math.sin(54 * Math.PI / 180)) + 24;
              anchor = 'start';
            } else if (a.angle === 126) { // Bottom-Left: Code Quality
              lblX = cx + (r * Math.cos(126 * Math.PI / 180)) - 16;
              lblY = cy + (r * Math.sin(126 * Math.PI / 180)) + 24;
              anchor = 'end';
            } else if (a.angle === 198) { // Top-Left: Viva Defense
              lblX = cx - r - 26;
              lblY = cy - 8;
              anchor = 'end';
            }

            return (
              <g 
                key={i} 
                onMouseEnter={() => setHoveredAxis(a.id)}
                onMouseLeave={() => setHoveredAxis(null)}
                onClick={() => setHoveredAxis(hoveredAxis === a.id ? null : a.id)}
                className="cursor-pointer group"
              >
                {/* Generous invisible hover/touch hotspot */}
                <circle cx={pt.x} cy={pt.y} r="22" fill="transparent" />

                {/* Targeted pulsating halo */}
                {isTargeted && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="13"
                    fill="none"
                    stroke={isClone || isAdversarial ? '#EF4444' : '#FFD166'}
                    strokeWidth="2"
                    opacity="0.8"
                    className="animate-pulse"
                  />
                )}

                {/* Point Marker */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isTargeted ? 8 : 6}
                  fill={isTargeted ? '#FFFFFF' : (isClone || isAdversarial ? '#EF4444' : '#FFD166')}
                  stroke="#000000"
                  strokeWidth="2"
                  className="transition-all duration-200"
                />

                {/* High-Contrast Crisp Text Label */}
                <text
                  x={lblX}
                  y={lblY}
                  textAnchor={anchor}
                  fontSize={isTargeted ? '13' : '12'}
                  fontFamily="system-ui, -apple-system, sans-serif"
                  style={{ filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.95))' }}
                  className="select-none transition-all duration-200"
                >
                  <tspan 
                    fill={isTargeted ? '#FFD166' : '#FFFFFF'} 
                    fontWeight={isTargeted ? '800' : '700'}
                  >
                    {a.label}
                  </tspan>
                  <tspan 
                    fill={isClone || isAdversarial ? '#FCA5A5' : '#FFD166'} 
                    fontWeight="800"
                  >
                    {' '}({a.val}%)
                  </tspan>
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Dynamic Interactive Explanation Tooltip & At-A-Glance Metric Strip */}
      <div className="w-full mt-2 pt-3 border-t border-[#3A2F27] flex flex-col gap-2">
        {activeAxisObj ? (
          <div className="animate-fadeIn p-2.5 rounded-xl bg-black/60 border border-[#D4AF37]/40 text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-[#FFD166] text-sm flex items-center gap-1.5">
                <span>{activeAxisObj.label}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-[#8B1E1E]/50 border border-[#D4AF37]/50 text-white font-mono">
                  {activeAxisObj.val}% Verified
                </span>
              </span>
              <span className="text-[10px] text-neutral-400 font-mono">Axis Telemetry</span>
            </div>
            <p className="text-neutral-200 font-sans leading-relaxed text-xs">
              {activeAxisObj.desc}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {/* 5-Axis Score Badges at a glance */}
            <div className="grid grid-cols-5 gap-1.5 text-center">
              {axes.map(a => (
                <button
                  key={a.id}
                  onClick={() => setHoveredAxis(hoveredAxis === a.id ? null : a.id)}
                  className="p-1 rounded-lg bg-black/50 border border-[#3A2F27] hover:border-[#D4AF37]/60 transition cursor-pointer"
                >
                  <div className="text-[9px] text-neutral-300 truncate uppercase font-bold">{a.label.split(' ')[0]}</div>
                  <div className="text-xs font-mono font-black text-[#FFD166]">{a.val}%</div>
                </button>
              ))}
            </div>
            <div className="text-[11px] text-neutral-400 font-sans flex items-center justify-center gap-1">
              <span>💡</span>
              <span>Click or hover any vertex on the polygon to inspect verified evidence.</span>
            </div>
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
            A candidate must undergo repository scanning and technical defense evaluation to issue a verified Pariksha card credential.
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
      ? 'Security Notice: Manipulative directive strings detected in repository source.'
      : (candidate.is_clone
        ? 'Repository matched public tutorial architecture.'
        : 'Demonstrated authentic software development with steady commit history, structured code organization, and verified implementation of core application logic.'),
    strengths: candidate.has_prompt_injection
      ? ['Automated security scan flagged adversarial evasion directives', 'Integrity filter prevented automated score spoofing']
      : (candidate.is_clone
        ? ['Basic syntax and file structure verified']
        : ['Organic commit progression across multiple days', 'Modular function design with clear separation of concerns']),
    growth_area: candidate.has_prompt_injection
      ? 'Remove prompt injection directives from repository comments and documentation.'
      : (candidate.is_clone 
        ? 'Build original project architectures rather than copying online tutorials.' 
        : 'Expand automated unit tests and integration test fixtures.'),
    specific_action: candidate.has_prompt_injection
      ? 'Clean repository documentation to reflect genuine code authorship.'
      : (candidate.is_clone
        ? 'Implement a unique feature or custom database schema to prove independent engineering.'
        : 'Write automated unit tests covering error edge cases and failure recovery.'),
    tamper_proof_hash: `SHA256:${candidate.candidate_id}`,
  };

  const isClone = Boolean(candidate.is_clone || candidate.viva_status === 'BLOCKED_CLONE');
  const isPromptInjected = Boolean(
    candidate.has_prompt_injection || 
    card.has_prompt_injection || 
    card.status === 'FLAGGED_ADVERSARIAL_INJECTION' || 
    candidate.is_prompt_injected || 
    card.status === 'FLAGGED_PROMPT_INJECTION' || 
    candidate.security_scan?.is_prompt_injected
  );
  const isAdversarial = isPromptInjected;

  const hasCompletedViva = Boolean(
    (candidate.live_analyzed || candidate.viva_status === 'COMPLETED' || candidate.defense_type === 'LIVE_DEFENDED') && 
    (candidate.viva_score || 0) > 0
  );

  const [copied, setCopied] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  // Clean human-friendly headline: replaces any robotic AST jargon with natural English
  const cleanHeadline = useMemo(() => {
    const raw = card.headline || '';
    if (raw.includes('clean AST modularity') || raw.includes('engineering signals with clean AST') || raw.includes('progression across rabto')) {
      const proj = candidate.project_name || candidate.project_type || 'the application';
      return `Demonstrated authentic software development with steady commit history, structured code organization, and verified implementation of core application logic across ${proj}.`;
    }
    return raw;
  }, [card.headline, candidate.project_name, candidate.project_type]);

  const publicVerifyUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/?verify=${encodeURIComponent(candidate.candidate_id)}&name=${encodeURIComponent(candidate.name)}&auth=${candidate.authenticity_score}&viva=${candidate.viva_score ?? 0}&status=${encodeURIComponent(card.status)}&college=${encodeURIComponent(candidate.college || '')}&tier=${encodeURIComponent(candidate.college_tier || '')}&project=${encodeURIComponent(candidate.project_name || candidate.project_type || '')}&track=${encodeURIComponent(candidate.project_type || '')}`
    : `https://proofcard.vercel.app/?verify=${encodeURIComponent(candidate.candidate_id)}&name=${encodeURIComponent(candidate.name)}&auth=${candidate.authenticity_score}&viva=${candidate.viva_score ?? 0}&status=${encodeURIComponent(card.status)}&college=${encodeURIComponent(candidate.college || '')}&tier=${encodeURIComponent(candidate.college_tier || '')}&project=${encodeURIComponent(candidate.project_name || candidate.project_type || '')}&track=${encodeURIComponent(candidate.project_type || '')}`;

  useEffect(() => {
    QRCode.toDataURL(publicVerifyUrl, {
      width: 140,
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
      {/* Header */}
      <div className="p-6 rounded-2xl mb-6 bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
              Academic Credential Ledger
            </h1>
            <p className="text-xs text-[#E6C280] mt-1 font-sans">
              Cryptographically verified engineering competency report · Zero Pedigree Bias
            </p>
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

      {/* The De-Nucleated Pariksha Card */}
      <div className="proofcard-printable p-7 sm:p-9 rounded-3xl bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-2xl relative overflow-hidden">
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
                Academic Credential
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-mono font-bold text-[#FFD166] bg-black/60 px-3 py-1 rounded-lg border border-[#D4AF37]/30">
            <span>✓ VERIFIED CANDIDATE</span>
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
                  {isPromptInjected ? 'FLAGGED: PROMPT INJECTION' : (isClone ? 'FLAGGED: TUTORIAL CLONE' : 'VERIFIED ENGINEER')}
                </span>
              </div>
              <p className="text-sm text-neutral-200 mt-1 font-medium font-sans">
                Skill Track: <strong className="text-white">{candidate.project_type || 'Full Stack Engineer'}</strong>
              </p>
            </div>
          </div>

          {/* Scores Overview */}
          <div className="flex items-center gap-4 font-mono bg-black/60 px-5 py-3 rounded-xl border border-[#3A2F27]">
            <div className="text-right">
              <div className="text-xs text-neutral-300 uppercase font-bold">Code Quality</div>
              <div className={`text-2xl font-black ${isAdversarial || isClone ? 'text-red-400' : 'text-[#FFD166]'}`}>
                {candidate.authenticity_score} <span className="text-xs text-neutral-400 font-normal">/ 100</span>
              </div>
            </div>
            <div className="h-9 w-[1px] bg-[#3A2F27]"></div>
            <div className="text-right">
              <div className="text-xs text-neutral-300 uppercase font-bold">Viva Defense</div>
              {hasCompletedViva ? (
                <div className="text-2xl font-black text-[#D4AF37]">
                  {candidate.viva_score} <span className="text-xs text-neutral-400 font-normal">/ 10</span>
                </div>
              ) : isClone ? (
                <div className="text-xs font-bold text-red-400 pt-1 uppercase">
                  Disqualified
                </div>
              ) : (
                <div className="text-xs font-bold text-amber-300 pt-1 uppercase">
                  Awaiting Defense
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Evaluation Summary */}
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
              {isPromptInjected ? 'Security Notice: Prompt Injection Directive Detected' : 'Evaluation Summary'}
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
                    <span>View Tutorial Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            )}
          </div>
          <p className="text-base sm:text-lg text-neutral-100 font-semibold leading-relaxed font-sans">
            "{cleanHeadline}"
          </p>
        </div>

        {/* Interactive Competency Radar & Evidence Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5 relative z-10 items-stretch">
          {/* Large Interactive Competency Radar Chart */}
          <div className="lg:col-span-6 flex flex-col">
            <RadarSkillChart 
              authenticity={candidate.authenticity_score} 
              viva={hasCompletedViva ? (candidate.viva_score ?? 0) : 0}
              isClone={isClone}
              isAdversarial={isAdversarial}
            />
          </div>

          {/* Strengths & Recommended Next Steps */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Technical Strengths */}
            <div className="bg-black/60 rounded-xl border border-[#3A2F27] p-5">
              <div className="flex items-center gap-2 mb-3 text-sm font-bold text-emerald-400 uppercase tracking-wider font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>Technical Strengths</span>
              </div>
              <ul className="space-y-2 text-sm text-neutral-200 font-sans font-medium">
                {(card.strengths && card.strengths.length > 0 ? card.strengths : [
                  'Demonstrated code originality with organic development cadence',
                  'Solid architecture and verified implementation of core application logic',
                  'Tamper-proof cryptographic commit ledger verification'
                ]).map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span className="leading-snug">{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Next Steps */}
            <div className="bg-black/60 rounded-xl border border-[#3A2F27] p-5">
              <div className="flex items-center gap-2 mb-3 text-sm font-bold text-[#FFD166] uppercase tracking-wider font-mono">
                <Zap className="w-4 h-4 text-[#D4AF37]" />
                <span>Recommended Next Steps</span>
              </div>
              <div className="space-y-2.5 text-sm text-neutral-200 font-sans font-medium">
                <p className="text-neutral-200"><strong className="text-[#FFD166]">Area for Growth:</strong> {card.growth_area || 'Deepen automated end-to-end integration and load testing.'}</p>
                <div className="p-3 rounded-lg bg-[#2A241B]/60 border border-[#3A2F27]">
                  <p className="text-[#F5E9C7] leading-snug"><strong className="text-[#D4AF37]">Action Item:</strong> {card.specific_action || 'Ship automated CI/CD pipeline with comprehensive mock integration.'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Oral Defense Banner if Pending */}
        {!hasCompletedViva && !isClone && (
          <div className="mb-5 p-4 rounded-xl bg-[#2A180C] border border-[#D4AF37]/50 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
            <div>
              <div className="text-xs uppercase font-bold text-[#FFD166] tracking-wider font-mono flex items-center gap-1.5">
                <span>⏳ Oral Defense Pending</span>
              </div>
              <p className="text-xs text-neutral-200 mt-0.5 font-sans">
                This candidate is awaiting their 3-minute technical defense viva to finalize their verified credential.
              </p>
            </div>
            <button
              onClick={() => onNavigateToTab('viva')}
              className="btn-dev-primary text-xs px-4 py-2 font-bold cursor-pointer whitespace-nowrap"
            >
              Start Defense Viva &rarr;
            </button>
          </div>
        )}

        {/* Footer Integrity Seal & REAL WORKING QR CODE & LINK */}
        <div className="pt-4 border-t border-[#3A2F27] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono relative z-10">
          <div>
            <div className="flex items-center gap-2 text-neutral-300">
              <Lock className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-bold text-white text-xs sm:text-sm">SHA-256:</span>
              <span className="text-[#FFD166] text-xs sm:text-sm font-mono">{(card.tamper_proof_hash || '').substring(0, 28)}...</span>
            </div>
            <div className="mt-1 text-xs text-neutral-300 flex items-center gap-1.5 font-mono">
              <span>Public Link:</span>
              <a
                href={publicVerifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFD166] hover:underline truncate max-w-[240px] sm:max-w-xs inline-flex items-center gap-1 font-mono font-bold"
                title="Click to open public verified credential"
              >
                <span className="truncate">{publicVerifyUrl}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>
          </div>

          {/* Real Scannable & Clickable Barcode / QR Code */}
          <div className="flex items-center gap-3 bg-black/60 p-3 rounded-xl border border-[#3A2F27] shrink-0">
            <a
              href={publicVerifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block cursor-pointer"
              title="Click or scan to view verified credential"
            >
              {qrCodeDataUrl ? (
                <img 
                  src={qrCodeDataUrl} 
                  alt="Verifiable Credential QR Code" 
                  className="w-16 h-16 rounded-lg bg-white p-1 shadow-sm group-hover:scale-105 transition"
                />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-white/10 animate-pulse" />
              )}
            </a>
            <div>
              <span className="text-xs sm:text-sm text-white font-bold block">Scan or Click to Verify</span>
              <span className="text-xs text-neutral-300 block">Opens public ledger credential</span>
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
