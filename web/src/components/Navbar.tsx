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
  onOpenN8nModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenImatsModal,
  onOpenN8nModal,
}) => {
  const features = [
    {
      id: 'ingestion',
      step: '01',
      name: 'Scan Code',
      desc: 'Paste a GitHub link or upload a code ZIP archive.',
      icon: Cpu,
    },
    {
      id: 'terminal',
      step: '02',
      name: 'Clone & Git Check',
      desc: 'Checks commit history, copy-paste tutorials, and code quality.',
      icon: Terminal,
    },
    {
      id: 'viva',
      step: '03',
      name: 'Code Defense Viva',
      desc: 'Candidate answers 3 technical questions based on their own code.',
      icon: Zap,
    },
    {
      id: 'proofcard',
      step: '04',
      name: 'Verified ProofCard',
      desc: 'Digital skill card with QR verification link.',
      icon: Award,
    },
    {
      id: 'battle',
      step: '05',
      name: 'Recruiter Battle',
      desc: 'Compare candidates side-by-side against job requirements.',
      icon: Swords,
    },
    {
      id: 'bias-mirror',
      step: '06',
      name: 'Fairness & Bias Audit',
      desc: 'Audits hiring fairness to eliminate college brand name bias.',
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
            <div className="flex items-center gap-2.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#f7f3ee] tracking-tight font-sans">
                ProofCard
              </span>
              <span className="text-xs font-mono uppercase bg-[#8B1E1E]/60 border border-[#D4AF37]/50 px-2.5 py-0.5 rounded-full text-[#FFD166] font-bold">
                IM-105
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#E6C280] font-mono tracking-wide mt-0.5">
              Code Verification & Unbiased Hiring Intelligence Platform
            </p>
          </div>
        </div>
      </div>

      {/* Sleek Navigation Tabs */}
      <div className="border-t border-[#D4AF37]/20 bg-black/60 backdrop-blur-md px-4 sm:px-8 py-2.5 overflow-x-auto">
        <div className="flex items-center gap-2.5 min-w-max">
          {features.map((feat) => {
            const Icon = feat.icon;
            const isActive = activeTab === feat.id;
            return (
              <button
                key={feat.id}
                onClick={() => setActiveTab(feat.id)}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-full transition-all duration-200 cursor-pointer border text-sm font-semibold ${
                  isActive
                    ? 'bg-[#8B1E1E] text-white border-[#D4AF37] shadow-[0_0_14px_rgba(212,175,55,0.4)]'
                    : 'bg-black/50 text-[#C9B89A] border-[#3A2F27] hover:border-[#D4AF37]/60 hover:text-[#F5E9C7]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-[#C9B89A]'}`} />
                <span className="font-warrior tracking-wide">{feat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
