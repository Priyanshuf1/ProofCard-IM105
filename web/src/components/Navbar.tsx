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
    <header className="sticky top-0 z-50 bg-black/75 backdrop-blur-md border-b border-[#D4AF37]/25 shadow-2xl">
      {/* Main Branding Bar */}
      <div className="px-4 sm:px-8 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          {/* ProofCard Emblem */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B1E1E] to-black border border-[#D4AF37]/50 flex items-center justify-center shadow-[0_0_14px_rgba(212,175,55,0.3)] shrink-0">
            <span className="text-lg font-black text-[#D4AF37]">Ω</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-extrabold text-[#f7f3ee] tracking-tight font-sans">
                ProofCard
              </span>
              <span className="text-[10px] font-mono uppercase bg-[#8B1E1E]/50 border border-[#D4AF37]/40 px-2 py-0.5 rounded-full text-[#FFD166] font-semibold">
                IM-105
              </span>
            </div>
            <p className="text-[11px] text-[#C9B89A]/80 font-mono tracking-wide">
              Verified Code Intelligence & Recruiter Bias Auditing
            </p>
          </div>
        </div>

        {/* Enterprise API Modal Trigger */}
        <div className="flex items-center gap-2">
          {onOpenImatsModal && (
            <button
              onClick={onOpenImatsModal}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/60 text-[#FFD166] hover:bg-[#D4AF37]/30 transition text-xs font-semibold cursor-pointer shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>IMATS Enterprise Sandbox</span>
            </button>
          )}
        </div>
      </div>

      {/* 6-Feature Sleek Navigation Tabs */}
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
