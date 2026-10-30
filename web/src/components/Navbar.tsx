import React, { useState } from 'react';
import { 
  Terminal, 
  Cpu, 
  Award, 
  Swords, 
  Scale, 
  Zap, 
  Lock, 
  ArrowRight, 
  HelpCircle, 
  Menu, 
  X 
} from 'lucide-react';
import { CandidateProfile } from '../types';

interface NavbarProps {
  activeSection: string;
  onNavigateToSection: (sectionId: string) => void;
  onOpenImatsModal?: () => void;
  onOpenN8nModal?: () => void;
  currentCandidate?: CandidateProfile | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigateToSection,
  onOpenImatsModal,
  currentCandidate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isVivaBlocked = Boolean(
    currentCandidate?.viva_blocked ?? (
      (currentCandidate?.anomaly_score || 0) > 30 || 
      currentCandidate?.is_prompt_injected || 
      currentCandidate?.security_scan?.is_prompt_injected || 
      currentCandidate?.is_clone
    )
  );

  const navLinks = [
    { id: 'hero', label: 'Overview', icon: null },
    { id: 'scanner', label: '01 Scanner', icon: Cpu },
    { id: 'terminal', label: '02 Code Analysis', icon: Terminal },
    { id: 'viva', label: '03 Viva', icon: Zap, isLocked: isVivaBlocked },
    { id: 'proofcard', label: '04 ProofCard', icon: Award },
    { id: 'battle', label: '05 Comparison', icon: Swords },
    { id: 'bias', label: '06 Bias Rate', icon: Scale },
  ];

  const handleNavClick = (id: string) => {
    onNavigateToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="glb-site-header">
      <div className="flex items-center justify-between px-4 sm:px-6 py-2.5">
        {/* Pariksha Brand & Logo */}
        <div 
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img 
            src="/pariksha-logo.jpg" 
            alt="Pariksha Logo" 
            className="h-9 w-9 rounded-full object-cover shadow-[0_2px_10px_rgba(226,0,1,0.25)] shrink-0 border border-[#fbbf24]/50 group-hover:scale-105 transition-transform" 
          />
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-[#111827] tracking-tight font-sans">
              Pariksha
            </span>
            <span className="badge-pill-red hidden sm:inline-flex text-[10px] py-0.5 px-2">
              v2.5 LIVE
            </span>
          </div>
        </div>

        {/* Desktop Smooth Navigation Pill Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-gray-100/80 rounded-full px-2.5 py-1.5 border border-gray-200">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#e20001] text-white shadow-[0_2px_12px_rgba(226,0,1,0.35)]'
                    : 'text-[#4b5563] hover:text-[#111827] hover:bg-white/80'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5 opacity-80" />}
                <span>{link.label}</span>
                {link.isLocked && (
                  <Lock className="w-2.5 h-2.5 text-amber-500 ml-0.5" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2.5">
          {onOpenImatsModal && (
            <button
              onClick={onOpenImatsModal}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-gray-200 text-[#111827] hover:border-[#e20001] hover:text-[#e20001] transition text-xs font-bold cursor-pointer shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-[#e20001]" />
              <span>IMATS API</span>
            </button>
          )}

          <button
            onClick={() => handleNavClick('scanner')}
            className="glb-call-btn"
          >
            <span>Scan Code</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-full bg-gray-100 text-[#4b5563] hover:text-[#111827] border border-gray-200"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-gray-200 bg-white/95 backdrop-blur-xl px-4 py-4 rounded-b-3xl shadow-xl">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold transition text-left ${
                    isActive
                      ? 'bg-[#e20001] text-white shadow-md'
                      : 'bg-gray-50 text-[#4b5563] hover:bg-gray-100 hover:text-[#111827]'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
                  <span className="truncate">{link.label}</span>
                  {link.isLocked && <Lock className="w-2.5 h-2.5 text-amber-500 ml-auto shrink-0" />}
                </button>
              );
            })}
          </div>
          {onOpenImatsModal && (
            <button
              onClick={() => {
                onOpenImatsModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-50 border border-amber-300 text-[#4b5563] text-xs font-bold"
            >
              <Zap className="w-4 h-4" />
              <span>Open IMATS Enterprise API Webhooks</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
