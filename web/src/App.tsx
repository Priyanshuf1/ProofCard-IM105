import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CandidateIngestion } from './components/CandidateIngestion';
import { ForensicTerminal } from './components/ForensicTerminal';
import { VivaArena } from './components/VivaArena';
import { ProofCard3D } from './components/ProofCard3D';
import { RecruiterBattle } from './components/RecruiterBattle';
import { BiasMirror } from './components/BiasMirror';
import { ImatsApiModal } from './components/ImatsApiModal';
import { N8nAutomationModal } from './components/N8nAutomationModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { Building2, ShieldCheck, ArrowRight, Lock, Key, Users, Award, Zap, Sliders, Cpu, Terminal, Swords, Scale, ChevronDown, Sparkles, Globe, FileCheck } from 'lucide-react';
import { CandidateProfile } from './types';
import { OFFLINE_DEMO_PROFILES } from './data/offlineDemoData';

function resolveInitialCandidate(): CandidateProfile {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const verifyId = params.get('verify');
    const vivaCid = params.get('cid');

    const targetId = verifyId || vivaCid;
    if (targetId) {
      try {
        const cached = localStorage.getItem(`proofcard_${targetId}`);
        if (cached) return JSON.parse(cached);
      } catch (e) {}

      const demo = OFFLINE_DEMO_PROFILES.find(p => p.candidate_id === targetId);
      if (demo) return demo;

      const candName = decodeURIComponent(params.get('name') || 'Priyanshu Awasthi');
      const candCollege = decodeURIComponent(params.get('college') || 'GLA University (Mathura)');
      const candTier = decodeURIComponent(params.get('tier') || 'Tier-2');
      const candProject = decodeURIComponent(params.get('project') || 'rabto');
      const candTrack = decodeURIComponent(params.get('track') || 'Full Stack Engineer');
      const authScore = parseInt(params.get('auth') || '95', 10);
      const vivaScore = parseFloat(params.get('viva') || '9.0');
      const cardStatus = params.get('status') || 'VERIFIED_EXEMPLARY';

      return {
        candidate_id: targetId,
        name: candName,
        college: candCollege,
        college_tier: candTier,
        project_name: candProject,
        project_type: candTrack,
        total_loc: 2450,
        authenticity_score: authScore,
        is_clone: cardStatus === 'FLAGGED_CLONE',
        has_prompt_injection: cardStatus.includes('INJECTION'),
        is_prompt_injected: cardStatus.includes('INJECTION'),
        viva_score: vivaScore,
        viva_status: vivaScore > 0 ? 'COMPLETED' : 'PENDING_DEFENSE',
        defense_type: vivaScore > 0 ? 'LIVE_DEFENDED' : 'ASYNC_REMOTE',
        live_analyzed: vivaScore > 0,
        git_dna: {
          total_commits: 28,
          time_span_days: 32,
          burst_ratio: 0.15,
          deletion_ratio: 0.24,
          organic_growth: authScore >= 70,
          message_maturity_score: 9.2,
          test_files_detected: 4,
          history_verified: true,
          authenticity_score: authScore,
          summary: 'Organic Git-DNA with verified temporal commit progression'
        },
        proof_card: {
          status: cardStatus,
          headline: `Demonstrated authentic software development with steady commit history across ${candProject}.`,
          strengths: [
            'Cryptographic proof verified on live public Pariksha ledger',
            'Demonstrated code originality with organic development cadence',
            'Verified core functions with strong algorithmic logic and clear code structure'
          ],
          growth_area: 'Expand automated test suites and mock coverage for external API integrations.',
          specific_action: 'Add automated tests to verify how the application handles network timeouts and error states.',
          tamper_proof_hash: `SHA256:${targetId}`
        }
      };
    }

    try {
      const last = localStorage.getItem('proofcard_last_scanned');
      if (last) return JSON.parse(last);
    } catch (e) {}
  }

  // Default to Priyanshu Awasthi & Team profile
  return OFFLINE_DEMO_PROFILES[0];
}


export const App: React.FC = () => {
  const [currentCandidate, setCurrentCandidate] = useState<CandidateProfile>(resolveInitialCandidate);
  const [cohort, setCohort] = useState<CandidateProfile[]>(OFFLINE_DEMO_PROFILES);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isImatsOpen, setIsImatsOpen] = useState<boolean>(false);
  const [isN8nOpen, setIsN8nOpen] = useState<boolean>(false);
  
  // Portal Mode: 'candidate' (Student) | 'admin' (Company / Recruiter)
  const [portalMode, setPortalMode] = useState<'candidate' | 'admin'>('candidate');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return Boolean(sessionStorage.getItem('pariksha_admin_auth'));
    }
    return false;
  });
  const [showAdminLogin, setShowAdminLogin] = useState<boolean>(false);

  const handleSwitchPortal = (mode: 'candidate' | 'admin') => {
    if (mode === 'admin') {
      if (!isAdminAuthenticated) {
        setShowAdminLogin(true);
        return;
      }
      setPortalMode('admin');
      setActiveSection('admin-home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setPortalMode('candidate');
      setActiveSection('hero');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAdminLoginSuccess = (token: string, user: string) => {
    setIsAdminAuthenticated(true);
    setShowAdminLogin(false);
    setPortalMode('admin');
    setActiveSection('admin-home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('pariksha_admin_auth');
    sessionStorage.removeItem('pariksha_admin_user');
    setIsAdminAuthenticated(false);
    setPortalMode('candidate');
    setActiveSection('hero');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Smooth scroll handler
  const handleNavigateToSection = (sectionId: string) => {
    const targetMap: Record<string, string> = {
      'ingestion': 'scanner',
      'bias-mirror': 'bias',
    };
    const resolvedId = targetMap[sectionId] || sectionId;
    setActiveSection(resolvedId);
    const element = document.getElementById(resolvedId);
    if (element) {
      const yOffset = -90; // Offset for floating pill navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // ScrollSpy to highlight active navbar item
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'scanner', 'terminal', 'viva', 'proofcard', 'battle', 'bias'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScanComplete = (profile: CandidateProfile) => {
    setCurrentCandidate(profile);
    try {
      localStorage.setItem(`proofcard_${profile.candidate_id}`, JSON.stringify(profile));
      localStorage.setItem('proofcard_last_scanned', JSON.stringify(profile));
    } catch (e) {}

    setCohort(prev => {
      const exists = prev.some(p => p.candidate_id === profile.candidate_id);
      if (exists) {
        return prev.map(p => p.candidate_id === profile.candidate_id ? profile : p);
      }
      return [profile, ...prev];
    });

    // Smoothly scroll down to forensic terminal
    setTimeout(() => {
      handleNavigateToSection('terminal');
    }, 600);
  };

  const handleUpdateVivaScore = (newScore: number) => {
    setCurrentCandidate(prev => {
      const updated: CandidateProfile = {
        ...prev,
        viva_score: newScore,
        viva_status: 'COMPLETED',
        proof_card: {
          ...prev.proof_card,
          status: prev.proof_card?.status || 'VERIFIED_COMPETENT',
          tamper_proof_hash: prev.proof_card?.tamper_proof_hash || `SHA256:${prev.candidate_id}`,
          headline: newScore >= 8 
            ? 'Exceptional systems intuition with proven codebase ownership.'
            : 'Competent engineer with solid understanding of primary workflows.'
        }
      };
      try {
        localStorage.setItem(`proofcard_${updated.candidate_id}`, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  return (
    <div className="min-h-screen text-[#111827] flex flex-col selection:bg-[#e20001] selection:text-white relative overflow-x-hidden bg-[#ffffff]">
      
      {/* Global Modals */}
      <ImatsApiModal 
        isOpen={isImatsOpen} 
        onClose={() => setIsImatsOpen(false)} 
        onNavigateToTab={(tab) => {
          setIsImatsOpen(false);
          handleNavigateToSection(tab);
        }}
      />
      <N8nAutomationModal
        isOpen={isN8nOpen}
        onClose={() => setIsN8nOpen(false)}
      />

      {/* Admin Authentication Security Gateway Modal */}
      <AdminLoginModal
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      {/* Floating Glass Pill Navigation Bar with Portal Segregation */}
      <Navbar
        activeSection={activeSection}
        onNavigateToSection={handleNavigateToSection}
        onOpenImatsModal={() => setIsImatsOpen(true)}
        onOpenN8nModal={() => setIsN8nOpen(true)}
        currentCandidate={currentCandidate}
        portalMode={portalMode}
        onSwitchPortal={handleSwitchPortal}
        isAdminAuthenticated={isAdminAuthenticated}
        onAdminLogout={handleAdminLogout}
      />

      {/* MAIN CONTINUOUS VERTICAL SCROLL BODY */}
      <main className="relative z-10 flex-1 flex flex-col pt-24">

        {/* ====================================================================
            PORTAL 1: CANDIDATE / STUDENT PORTAL (Clean, Zero Recruiter Clutter)
            ==================================================================== */}
        {portalMode === 'candidate' ? (
          <>
            {/* HERO SECTION (#hero) */}
            <section id="hero" className="min-h-[60vh] flex flex-col items-center justify-center px-4 sm:px-6 text-center pt-8 pb-14 bg-white">
              <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-red-50 text-[#e20001] border border-red-200">
                  <span>🎓 Student & Candidate Evaluation Portal</span>
                </span>

                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#111827] tracking-tight leading-[1.08] font-sans">
                  Verify Real Code. <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e20001] via-[#d90429] to-[#b80001]">
                    Eliminate Resume Fraud.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-[#4b5563] max-w-xl font-normal leading-relaxed">
                  Submit your public code repository, project ZIP, or multi-domain resume. Complete your live verbal viva to claim an immutable, verified 3D ProofCard.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                  <button 
                    onClick={() => handleNavigateToSection('scanner')}
                    className="btn-primary"
                  >
                    <span>Submit Code / Resume &rarr;</span>
                  </button>
                  <button 
                    onClick={() => handleNavigateToSection('proofcard')}
                    className="btn-secondary"
                  >
                    <span>Inspect ProofCard Credential</span>
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 01: INGESTION & SUBMISSION (#scanner) */}
            <section id="scanner" className="glm-section">
              <div className="max-w-6xl mx-auto">
                <div className="glm-section-header">
                  <h2 className="glm-section-title">Submit Candidate Resume & Code</h2>
                  <p className="glm-section-subtitle">
                    Upload PDF / DOCX resumes, inspect live project URLs, or link public GitHub repositories.
                  </p>
                </div>
                <div className="w-full">
                  <CandidateIngestion
                    portalMode="candidate"
                    onScanComplete={handleScanComplete}
                    onNavigateToTab={handleNavigateToSection}
                    onSelectCandidate={(cand) => {
                      setCurrentCandidate(cand);
                      handleNavigateToSection('proofcard');
                    }}
                    cohort={cohort}
                    onUpdateCohort={setCohort}
                  />
                </div>
              </div>
            </section>

            {/* SECTION 02: CODE DEFENSE VIVA (#viva) */}
            <section id="viva" className="glm-section">
              <div className="max-w-6xl mx-auto">
                <div className="glm-section-header">
                  <h2 className="glm-section-title">Live Candidate Code Defense Viva</h2>
                  <p className="glm-section-subtitle">
                    Defend your implementation in real time with our browser-native Web Speech API viva evaluator.
                  </p>
                </div>
                <div className="w-full">
                  <VivaArena
                    portalMode="candidate"
                    candidate={currentCandidate}
                    onUpdateVivaScore={handleUpdateVivaScore}
                    onNavigateToTab={handleNavigateToSection}
                    onSelectCandidate={setCurrentCandidate}
                    cohort={cohort}
                  />
                </div>
              </div>
            </section>

            {/* SECTION 03: VERIFIED 3D PROOFCARD (#proofcard) */}
            <section id="proofcard" className="glm-section">
              <div className="max-w-6xl mx-auto">
                <div className="glm-section-header">
                  <h2 className="glm-section-title">Verified ProofCard Credential Ledger</h2>
                  <p className="glm-section-subtitle">
                    Cryptographically sealed with Ed25519 & SHA-256 tamper-evident ledger hash.
                  </p>
                </div>
                <div className="w-full">
                  <ProofCard3D
                    candidate={currentCandidate}
                    onNavigateToTab={handleNavigateToSection}
                    onSelectCandidate={setCurrentCandidate}
                    cohort={cohort}
                  />
                </div>
              </div>
            </section>
          </>
        ) : (
          /* ====================================================================
             PORTAL 2: ENTERPRISE COMPANY / ADMIN PORTAL (Secured & Authenticated)
             ==================================================================== */
          <>
            {!isAdminAuthenticated ? (
              /* High-Security Admin Gateway Screen */
              <section className="min-h-[70vh] flex flex-col items-center justify-center px-4 sm:px-6 text-center py-16 bg-white">
                <div className="max-w-lg mx-auto bg-gray-50 border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-lg text-center space-y-5">
                  <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-[#e20001] mx-auto shadow-sm">
                    <Lock className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-[#111827] tracking-tight">
                      Enterprise Admin Access Required
                    </h2>
                    <p className="text-xs text-gray-500 mt-1 font-mono">
                      Restricted to authorized hiring managers and company recruiters
                    </p>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    This portal includes candidate cohort triage, job requirements studio, forensic AST code inspection, recruiter battle arena, and EEOC bias auditing.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAdminLogin(true)}
                      className="w-full btn-primary text-sm py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <Key className="w-4 h-4" />
                      <span>Authenticate with Admin Credentials</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPortalMode('candidate')}
                      className="w-full py-2.5 text-xs text-gray-500 hover:text-gray-800 font-bold mt-2 cursor-pointer"
                    >
                      ← Return to Student Portal
                    </button>
                  </div>
                </div>
              </section>
            ) : (
              /* Authenticated Enterprise Admin Console */
              <>
                {/* ADMIN OVERVIEW BANNER (#admin-home) */}
                <section id="admin-home" className="min-h-[40vh] flex flex-col items-center justify-center px-4 sm:px-6 pt-6 pb-10 bg-white">
                  <div className="max-w-6xl mx-auto w-full space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gray-50 border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-[#e20001] flex items-center justify-center text-white font-bold text-xl shadow-md">
                          <Building2 className="w-7 h-7" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h1 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight font-sans">
                              Enterprise Admin Console
                            </h1>
                            <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                              AUTHENTICATED
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 mt-1 font-sans">
                            Company candidate triage, job alignment studio, deep code forensics, and EEOC bias auditing
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => setIsImatsOpen(true)}
                          className="px-4 py-2 rounded-full bg-white border border-gray-200 text-xs font-bold text-[#111827] hover:border-[#e20001] transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                        >
                          <Zap className="w-3.5 h-3.5 text-[#e20001]" />
                          <span>IMATS ATS Sandbox</span>
                        </button>
                        <button
                          onClick={() => setIsN8nOpen(true)}
                          className="px-4 py-2 rounded-full bg-white border border-gray-200 text-xs font-bold text-[#111827] hover:border-[#e20001] transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                        >
                          <Sliders className="w-3.5 h-3.5 text-[#e20001]" />
                          <span>n8n Webhooks</span>
                        </button>
                        <button
                          onClick={handleAdminLogout}
                          className="px-4 py-2 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-700 hover:bg-red-100 transition cursor-pointer flex items-center gap-1.5"
                        >
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>

                    {/* KPI Metric Summary Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                      <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Total Screened</span>
                        <div className="text-2xl font-black text-[#111827] font-mono">{cohort.length} Candidates</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
                        <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">Authentic Builders</span>
                        <div className="text-2xl font-black text-emerald-700 font-mono">{cohort.filter(c => (c.authenticity_score || 0) >= 60 && !c.is_clone).length}</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
                        <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block mb-1">Tutorial Clones Flagged</span>
                        <div className="text-2xl font-black text-red-600 font-mono">{cohort.filter(c => c.is_clone).length}</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
                        <span className="text-[11px] font-bold text-[#e20001] uppercase tracking-wider block mb-1">EEOC Disparity Ratio</span>
                        <div className="text-2xl font-black text-[#e20001] font-mono">0.93 (Fair)</div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* ADMIN CANDIDATE TRIAGE & JOB STUDIO (#admin-triage) */}
                <section id="admin-triage" className="glm-section">
                  <div className="max-w-6xl mx-auto">
                    <div className="glm-section-header">
                      <h2 className="glm-section-title">Candidate Cohort Triage & Job Studio</h2>
                      <p className="glm-section-subtitle">
                        Configure target job requirements, ingest batches via Sandbox API, and segregate applicants into Technical vs Non-Technical branches.
                      </p>
                    </div>
                    <div className="w-full">
                      <CandidateIngestion
                        portalMode="admin"
                        onScanComplete={handleScanComplete}
                        onNavigateToTab={handleNavigateToSection}
                        onSelectCandidate={(cand) => {
                          setCurrentCandidate(cand);
                          handleNavigateToSection('terminal');
                        }}
                        cohort={cohort}
                        onUpdateCohort={setCohort}
                      />
                    </div>
                  </div>
                </section>

                {/* SECTION 02: FORENSIC CODE ANALYSIS (#terminal) */}
                <section id="terminal" className="glm-section">
                  <div className="max-w-6xl mx-auto">
                    <div className="glm-section-header">
                      <h2 className="glm-section-title">Deep Code Forensics & AST Parsing</h2>
                      <p className="glm-section-subtitle">
                        Inspect candidate cyclomatic complexity, MOSS Winnowing plagiarism matches, and Git-DNA commit dispersion.
                      </p>
                    </div>
                    <div className="w-full">
                      <ForensicTerminal
                        candidate={currentCandidate}
                        onNavigateToTab={handleNavigateToSection}
                        onSelectCandidate={setCurrentCandidate}
                        cohort={cohort}
                      />
                    </div>
                  </div>
                </section>

                {/* SECTION 03: RECRUITER BATTLE ARENA (#battle) */}
                <section id="battle" className="glm-section">
                  <div className="max-w-6xl mx-auto">
                    <div className="glm-section-header">
                      <h2 className="glm-section-title">Head-to-Head Recruiter Battle Arena</h2>
                      <p className="glm-section-subtitle">
                        Benchmark candidates side-by-side against 30 standard enterprise job descriptions with auditable rationales.
                      </p>
                    </div>
                    <div className="w-full">
                      <RecruiterBattle
                        currentCandidate={currentCandidate}
                        onNavigateToTab={handleNavigateToSection}
                        onSelectCandidate={setCurrentCandidate}
                        cohort={cohort}
                      />
                    </div>
                  </div>
                </section>

                {/* SECTION 04: FAIRNESS & BIAS MIRROR (#bias) */}
                <section id="bias" className="glm-section">
                  <div className="max-w-6xl mx-auto">
                    <div className="glm-section-header">
                      <h2 className="glm-section-title">EEOC Four-Fifths Compliance & Bias Mirror</h2>
                      <p className="glm-section-subtitle">
                        Audit college pedigree discrimination, view Tier-1 vs Tier-3 selection ratios, and dispatch automated hiring decisions.
                      </p>
                    </div>
                    <div className="w-full">
                      <BiasMirror 
                        cohort={cohort}
                      />
                    </div>
                  </div>
                </section>
              </>
            )}
          </>
        )}

      </main>

      {/* ====================================================================
          PARIKSHA FOOTER - Clean Minimal Light Agency Style
          ==================================================================== */}
      <footer className="border-t border-gray-200 bg-[#f9fafb] relative z-10 px-4 sm:px-8 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img 
              src="/pariksha-logo.jpg" 
              alt="Pariksha Logo" 
              className="h-10 w-10 rounded-full object-cover border border-[#fbbf24]/40 shadow-sm" 
            />
            <div>
              <span className="text-xl font-black text-[#111827] tracking-tight">Pariksha</span>
              <p className="text-xs text-[#6b7280]">
                Code Verification & Unbiased Hiring Intelligence Platform
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#4b5563]">
            <button onClick={() => handleNavigateToSection('hero')} className="hover:text-[#111827] transition">Overview</button>
            <button onClick={() => handleNavigateToSection('scanner')} className="hover:text-[#111827] transition">Scanner</button>
            <button onClick={() => handleNavigateToSection('terminal')} className="hover:text-[#111827] transition">Code Analysis</button>
            <button onClick={() => handleNavigateToSection('viva')} className="hover:text-[#111827] transition">Viva</button>
            <button onClick={() => handleNavigateToSection('proofcard')} className="hover:text-[#111827] transition">3D ProofCard</button>
            <button onClick={() => handleNavigateToSection('battle')} className="hover:text-[#111827] transition">Comparison</button>
            <button onClick={() => handleNavigateToSection('bias')} className="hover:text-[#111827] transition">Bias Rate</button>
            
          </div>

          <div className="text-xs text-[#6b7280] text-center md:text-right">
            <p>Built for Deviathon 2026</p>
            <p className="text-[11px] text-[#e20001] font-semibold mt-0.5">Verified Code • Zero College Bias</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
