import React from 'react';
import { 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  Award, 
  Swords, 
  Scale, 
  Zap,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  onSelectDemoProfile: (index: number) => void;
  onOpenImatsModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isDemoMode,
  setIsDemoMode,
  onSelectDemoProfile,
  onOpenImatsModal,
}) => {
  const features = [
    {
      id: 'ingestion',
      step: '01',
      name: 'Code Ingestion & Scanner',
      desc: 'Upload a project ZIP or scan a GitHub profile to inspect raw source code.',
      icon: Cpu,
    },
    {
      id: 'terminal',
      step: '02',
      name: 'Authenticity & Clone Radar',
      desc: 'Detects copy-pasted YouTube tutorials, commit rhythms, and AI-generated code.',
      icon: Terminal,
    },
    {
      id: 'viva',
      step: '03',
      name: 'Live Code Viva Interview',
      desc: 'Tests conceptual understanding with 3 sharp questions pulled directly from hard code.',
      icon: Zap,
    },
    {
      id: 'proofcard',
      step: '04',
      name: '3D Holographic ProofCard',
      desc: 'Tamper-proof digital credential with verified skills, QR verification, and mentorship plan.',
      icon: Award,
    },
    {
      id: 'battle',
      step: '05',
      name: 'Recruiter Battle Arena',
      desc: 'Compares candidates side-by-side against job requirements to prove who can actually build.',
      icon: Swords,
    },
    {
      id: 'bias-mirror',
      step: '06',
      name: 'Equal Opportunity Audit',
      desc: 'Guarantees hiring decisions are based strictly on code quality, not college brand names.',
      icon: Scale,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-md border-b border-[#D4AF37]/25 shadow-2xl">
      {/* Top Banner - Authentic Deviathon GLA University Official Header */}
      <div className="bg-black/70 border-b border-[#D4AF37]/15 px-4 sm:px-8 py-2 text-xs text-[#E6C280]/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Flame dot */}
          <span className="w-2.5 h-2.5 rounded-full bg-[#E85D04] shadow-[0_0_8px_#E85D04] animate-pulse"></span>
          <span className="font-warrior font-bold text-white tracking-widest text-[11px] uppercase">
            GLA UNIVERSITY MATHURA (NAAC A+)
          </span>
          <span className="text-[#D4AF37]/30">|</span>
          <span className="text-[#E6C280] font-semibold text-[11px]">
            DEPARTMENT OF COMPUTER ENGINEERING AND APPLICATIONS & DATUM
          </span>
          <span className="text-[#D4AF37]/30 hidden md:inline">|</span>
          <span className="text-[#f7f3ee]/70 text-[11px] hidden md:inline font-mono">
            Problem Statement: IM-105 · "Proof of skill, not a template resume" (Integraminds AI Frontier)
          </span>
        </div>

        {/* Quick Candidate Preset Pills */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#D4AF37] font-warrior font-bold uppercase tracking-wider">Test Candidates:</span>
          <button 
            onClick={() => onSelectDemoProfile(0)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B1E1E]/40 border border-[#D4AF37]/60 text-[#FFD166] hover:bg-[#8B1E1E]/70 transition text-xs font-semibold cursor-pointer shadow-sm"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>⚡ Data_SIH (157 Commits)</span>
          </button>
          <button 
            onClick={() => onSelectDemoProfile(1)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 border border-[#3A2F27] text-[#C9B89A] hover:border-[#D4AF37] hover:text-[#F5E9C7] transition text-xs font-medium cursor-pointer"
          >
            <span>Priyanshu (Insta GUI)</span>
          </button>
          <button 
            onClick={() => onSelectDemoProfile(2)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/40 border border-red-700/50 text-red-300 hover:bg-red-900/40 transition text-xs font-medium cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span>Tutorial Clone (Flagged 89%)</span>
          </button>

          {onOpenImatsModal && (
            <button
              onClick={onOpenImatsModal}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#FFD166] hover:bg-[#D4AF37]/40 transition text-xs font-warrior font-bold cursor-pointer shadow-[0_0_10px_rgba(212,175,55,0.3)] ml-2"
            >
              <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>⚡ IMATS Enterprise API</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Hackathon Branding Bar with Official Deviathon Logo */}
      <div className="px-4 sm:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Deviathon Omega & Flaming Sword Emblem */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B1E1E] to-black border border-[#D4AF37]/50 flex items-center justify-center shadow-[0_0_16px_rgba(212,175,55,0.35)] shrink-0 relative overflow-hidden group">
            <span className="text-xl font-black text-[#D4AF37]">Ω</span>
            <span className="absolute inset-0 flex items-center justify-center text-xs text-[#FFD166] opacity-90 font-mono font-bold">🗡️</span>
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-deviathon text-2xl sm:text-3xl font-extrabold text-[#f7f3ee] tracking-widest drop-shadow-[0_2px_12px_rgba(212,175,55,0.4)]">
                DEVIATHON
              </span>
              <span className="parchment-pill">
                2026
              </span>
              <span className="text-[11px] text-[#D4AF37] font-warrior hidden sm:inline font-bold">
                29 - 31 OCT 2026
              </span>
            </div>
            <p className="text-xs text-[#E6C280]/70 font-warrior font-medium mt-0.5 tracking-wider">
              नवोन्मेषः | सङ्केतलेखनम् | विजयः &nbsp;·&nbsp; <span className="text-white font-sans font-semibold">ProofCard Talent Intelligence</span>
            </p>
          </div>
        </div>

        {/* Hackathon Callouts */}
        <div className="hidden lg:flex items-center gap-3 text-xs font-warrior text-[#E6C280]/90">
          <div className="px-3 py-1.5 rounded-lg bg-black/60 border border-[#D4AF37]/30 flex items-center gap-2">
            <span className="text-[#D4AF37] font-bold">&lt; BUILD &gt;</span>
            <span className="text-neutral-300">INNOVATE</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-black/60 border border-[#D4AF37]/30 flex items-center gap-2">
            <span className="text-[#D4AF37] font-bold">&lt; CODE &gt;</span>
            <span className="text-neutral-300">CREATE</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-black/60 border border-[#D4AF37]/30 flex items-center gap-2">
            <span className="text-[#D4AF37] font-bold">&lt; CONQUER &gt;</span>
            <span className="text-neutral-300">THE FUTURE</span>
          </div>
        </div>
      </div>

      {/* 6-Feature Sleek Navigation Tabs without Bloated Text */}
      <div className="border-t border-[#D4AF37]/20 bg-black/60 backdrop-blur-md px-4 sm:px-8 py-2 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          {features.map((feat) => {
            const Icon = feat.icon;
            const isActive = activeTab === feat.id;
            return (
              <button
                key={feat.id}
                onClick={() => setActiveTab(feat.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer border text-xs font-semibold ${
                  isActive
                    ? 'bg-[#8B1E1E] text-white border-[#D4AF37] shadow-[0_0_14px_rgba(212,175,55,0.4)]'
                    : 'bg-black/50 text-[#C9B89A] border-[#3A2F27] hover:border-[#D4AF37]/60 hover:text-[#F5E9C7]'
                }`}
              >
                <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-[#D4AF37] text-black' : 'bg-[#2A241B] text-[#D4AF37]'
                }`}>
                  {feat.step}
                </span>
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D4AF37]' : 'text-[#C9B89A]'}`} />
                <span className="font-warrior tracking-wide">{feat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
