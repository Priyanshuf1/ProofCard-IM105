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
  X,
  LogOut,
  Shield,
  Layers,
  GraduationCap,
  Building2
} from 'lucide-react';
import { CandidateProfile } from '../types';

interface NavbarProps {
  activeSection: string;
  onNavigateToSection: (sectionId: string) => void;
  onOpenImatsModal?: () => void;
  onOpenN8nModal?: () => void;
  currentCandidate?: CandidateProfile | null;
  portalMode: 'candidate' | 'admin';
  onSwitchPortal: (mode: 'candidate' | 'admin') => void;
  isAdminAuthenticated: boolean;
  onAdminLogout: () => void;
}

interface NavLinkItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }> | null;
  isLocked?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigateToSection,
  onOpenImatsModal,
  currentCandidate,
  portalMode,
  onSwitchPortal,
  isAdminAuthenticated,
  onAdminLogout
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

  const candidateNavLinks: NavLinkItem[] = [
    { id: 'hero', label: 'Overview', icon: null },
    { id: 'scanner', label: '01 Submit Code / Resume', icon: Cpu },
    { id: 'viva', label: '02 Live Viva Defense', icon: Zap, isLocked: isVivaBlocked },
    { id: 'proofcard', label: '03 My ProofCard', icon: Award },
  ];

  const adminNavLinks: NavLinkItem[] = [
    { id: 'admin-home', label: 'Overview', icon: null },
    { id: 'admin-triage', label: '01 Candidate Triage', icon: Cpu },
    { id: 'terminal', label: '02 Code Forensics', icon: Terminal },
    { id: 'battle', label: '03 Recruiter Battle', icon: Swords },
    { id: 'bias', label: '04 Bias Mirror', icon: Scale },
  ];

  const currentNavLinks = portalMode === 'candidate' ? candidateNavLinks : adminNavLinks;

  const handleNavClick = (id: string) => {
    onNavigateToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="glb-site-header">
      <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 gap-2 sm:gap-4">
        {/* Pariksha Brand & Logo */}
        <div 
          onClick={() => handleNavClick(portalMode === 'candidate' ? 'hero' : 'admin-home')}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
        >
          <img 
            src="/pariksha-logo.jpg" 
            alt="Pariksha Logo" 
            className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover shadow-[0_2px_10px_rgba(226,0,1,0.25)] shrink-0 border border-[#fbbf24]/50 group-hover:scale-105 transition-transform" 
          />
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-lg sm:text-xl font-black text-[#111827] tracking-tight font-sans">
              Pariksha
            </span>
            <span className={`hidden sm:inline-flex text-[10px] font-mono font-bold py-0.5 px-2 rounded-full border ${
              portalMode === 'admin' 
                ? 'bg-amber-50 text-amber-700 border-amber-200' 
                : 'bg-red-50 text-[#e20001] border-red-200'
            }`}>
              {portalMode === 'admin' ? 'ADMIN CONSOLE' : 'STUDENT PORTAL'}
            </span>
          </div>
        </div>

        {/* Portal Switcher (Center Segmented Toggle) */}
        <div className="flex items-center p-1 bg-gray-100/90 rounded-full border border-gray-200 shadow-inner">
          <button
            type="button"
            onClick={() => onSwitchPortal('candidate')}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              portalMode === 'candidate'
                ? 'bg-white text-[#111827] shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#e20001]" />
            <span className="hidden xs:inline">Student Portal</span>
            <span className="xs:hidden">Student</span>
          </button>

          <button
            type="button"
            onClick={() => onSwitchPortal('admin')}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              portalMode === 'admin'
                ? 'bg-[#e20001] text-white shadow-sm'
                : 'text-gray-500 hover:text-[#e20001]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Enterprise Admin</span>
            <span className="xs:hidden">Admin</span>
            {isAdminAuthenticated ? (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            ) : (
              <Lock className="w-2.5 h-2.5 opacity-70" />
            )}
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-gray-100/80 rounded-full px-2.5 py-1.5 border border-gray-200">
          {currentNavLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
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
        <div className="flex items-center gap-2">
          {portalMode === 'admin' && isAdminAuthenticated && onOpenImatsModal && (
            <button
              onClick={onOpenImatsModal}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-[#111827] hover:border-[#e20001] hover:text-[#e20001] transition text-xs font-bold cursor-pointer shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-[#e20001]" />
              <span>IMATS Sandbox</span>
            </button>
          )}

          {portalMode === 'admin' && isAdminAuthenticated && (
            <button
              onClick={onAdminLogout}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 transition text-xs font-bold cursor-pointer shadow-sm"
              title="Logout from Admin Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          )}

          {portalMode === 'candidate' && (
            <button
              onClick={() => handleNavClick('scanner')}
              className="glb-call-btn hidden sm:inline-flex"
            >
              <span>Submit Code</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-gray-100 text-[#4b5563] hover:text-[#111827] border border-gray-200 cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-xl px-4 py-4 rounded-b-3xl shadow-xl space-y-3">
          <div className="flex items-center justify-between p-2 bg-gray-100 rounded-xl mb-2">
            <span className="text-xs font-bold text-gray-600">Active Mode:</span>
            <span className="text-xs font-bold font-mono text-[#e20001]">
              {portalMode === 'candidate' ? '🎓 Student Portal' : '🏢 Enterprise Admin'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {currentNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
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

          {portalMode === 'admin' && isAdminAuthenticated && (
            <div className="pt-2 border-t border-gray-200 flex flex-col gap-2">
              {onOpenImatsModal && (
                <button
                  onClick={() => {
                    onOpenImatsModal();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-50 border border-amber-300 text-[#4b5563] text-xs font-bold cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-amber-600" />
                  <span>Open IMATS Enterprise API</span>
                </button>
              )}
              <button
                onClick={() => {
                  onAdminLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout from Admin Session</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
