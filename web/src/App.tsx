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
import { CandidateProfile } from './types';
import { OFFLINE_DEMO_PROFILES } from './data/offlineDemoData';
import { 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Terminal, 
  Zap, 
  Award, 
  Swords, 
  Scale, 
  ChevronDown,
  Sparkles,
  Lock,
  Globe,
  FileCheck
} from 'lucide-react';

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

      {/* Floating Glass Pill Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigateToSection={handleNavigateToSection}
        onOpenImatsModal={() => setIsImatsOpen(true)}
        onOpenN8nModal={() => setIsN8nOpen(true)}
        currentCandidate={currentCandidate}
      />

      {/* MAIN CONTINUOUS VERTICAL SCROLL BODY */}
      <main className="relative z-10 flex-1 flex flex-col pt-24">
        
        {/* ====================================================================
            HERO SECTION (#hero) - Global Logic Media Inspired Luxury Styling
            ==================================================================== */}
        <section id="hero" className="min-h-[65vh] flex flex-col items-center justify-center px-4 sm:px-6 text-center pt-10 pb-16 bg-white">
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">

            {/* Pariksha Real Product Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#111827] tracking-tight leading-[1.08] font-sans">
              Verify Real Code. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e20001] via-[#d90429] to-[#b80001]">
                Eliminate Resume Fraud.
              </span>
            </h1>

            {/* Pariksha Real Subtitle */}
            <p className="text-base sm:text-lg text-[#4b5563] max-w-xl font-normal leading-relaxed">
              Verify real code originality, interview candidates via AI viva, and eliminate hiring bias.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
              <button 
                onClick={() => handleNavigateToSection('scanner')}
                className="btn-primary"
              >
                <span>Scan Candidate Code</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleNavigateToSection('proofcard')}
                className="btn-secondary"
              >
                <span>View 3D ProofCard Ledger</span>
              </button>
            </div>
          </div>
        </section>


        {/* ====================================================================
            SECTION 01: INGESTION & RESUME PARSER (#scanner)
            ==================================================================== */}
        <section id="scanner" className="glm-section">
          <div className="max-w-6xl mx-auto">
            <div className="glm-section-header">
              <h2 className="glm-section-title">Upload Candidate Resume & Code</h2>
              <p className="glm-section-subtitle">
                Upload PDF / DOCX resumes, inspect live application URLs, paste public GitHub repos, or upload ZIP archives with real-time SSRF shield protection.
              </p>
            </div>

            <div className="w-full">
              <CandidateIngestion
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


        {/* ====================================================================
            SECTION 02: FORENSIC TERMINAL & GIT-DNA (#terminal)
            ==================================================================== */}
        <section id="terminal" className="glm-section">
          <div className="max-w-6xl mx-auto">
            <div className="glm-section-header">
              <h2 className="glm-section-title">Code & Git History Analysis</h2>
              <p className="glm-section-subtitle">
                Detect copy-pasted tutorial repos across 1,200+ signatures, examine commit timestamp cadence, burst ratios, and structural code signatures.
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


        {/* ====================================================================
            SECTION 03: CODE DEFENSE VIVA & AI GATE (#viva)
            ==================================================================== */}
        <section id="viva" className="glm-section">
          <div className="max-w-6xl mx-auto">
            <div className="glm-section-header">
              <h2 className="glm-section-title">Candidate Viva & AI Limit</h2>

            </div>

            <div className="w-full">
              <VivaArena
                candidate={currentCandidate}
                onUpdateVivaScore={handleUpdateVivaScore}
                onNavigateToTab={handleNavigateToSection}
                onSelectCandidate={setCurrentCandidate}
                cohort={cohort}
              />
            </div>
          </div>
        </section>


        {/* ====================================================================
            SECTION 04: VERIFIED 3D PROOFCARD LEDGER (#proofcard)
            ==================================================================== */}
        <section id="proofcard" className="glm-section">
          <div className="max-w-6xl mx-auto">
            <div className="glm-section-header">
              <h2 className="glm-section-title">Verified 3D ProofCard</h2>

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


        {/* ====================================================================
            SECTION 05: RECRUITER BATTLE ARENA (#battle)
            ==================================================================== */}
        <section id="battle" className="glm-section">
          <div className="max-w-6xl mx-auto">
            <div className="glm-section-header">
              <h2 className="glm-section-title">Candidate Comparison & Battle</h2>

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


        {/* ====================================================================
            SECTION 06: FAIRNESS & BIAS MIRROR (#bias)
            ==================================================================== */}
        <section id="bias" className="glm-section">
          <div className="max-w-6xl mx-auto">
            <div className="glm-section-header">
              <h2 className="glm-section-title">Hiring Bias Rate & Fairness Audit</h2>
              <p className="glm-section-subtitle">
                Measure disparate impact ratios, audit college tier discrimination, and ensure hiring decisions comply with the EEOC 80% rule.
              </p>
            </div>

            <div className="w-full">
              <BiasMirror 
                cohort={cohort}
              />
            </div>
          </div>
        </section>


        

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
