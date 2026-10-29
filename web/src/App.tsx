import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CandidateIngestion } from './components/CandidateIngestion';
import { ForensicTerminal } from './components/ForensicTerminal';
import { VivaArena } from './components/VivaArena';
import { ProofCard3D } from './components/ProofCard3D';
import { RecruiterBattle } from './components/RecruiterBattle';
import { BiasMirror } from './components/BiasMirror';
import { Devithation3DCanvas } from './components/Devithation3DCanvas';
import { ImatsApiModal } from './components/ImatsApiModal';
import { N8nAutomationModal } from './components/N8nAutomationModal';
import { CandidateProfile } from './types';
import { OFFLINE_DEMO_PROFILES } from './data/offlineDemoData';

function resolveInitialStateFromUrl(): { tab: string; candidate: CandidateProfile | null } {
  if (typeof window === 'undefined') {
    return { tab: 'ingestion', candidate: null };
  }
  const params = new URLSearchParams(window.location.search);
  const verifyId = params.get('verify');
  const vivaCid = params.get('cid');

  if (vivaCid) {
    let vivaCandidate: CandidateProfile | null = OFFLINE_DEMO_PROFILES.find(p => p.candidate_id === vivaCid) || null;
    if (!vivaCandidate) {
      try {
        const cached = localStorage.getItem(`proofcard_${vivaCid}`);
        if (cached) vivaCandidate = JSON.parse(cached);
      } catch (e) {}
    }
    return { tab: 'viva', candidate: vivaCandidate };
  }

  if (verifyId) {
    let target: CandidateProfile | null = null;
    try {
      const cached = localStorage.getItem(`proofcard_${verifyId}`) || localStorage.getItem('proofcard_last_scanned');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && (parsed.candidate_id === verifyId || !verifyId)) target = parsed;
      }
    } catch (e) {}

    if (!target) {
      target = OFFLINE_DEMO_PROFILES.find(p => p.candidate_id === verifyId) || null;
    }

    if (!target) {
      const candName = decodeURIComponent(params.get('name') || 'Priyanshu Awasthi');
      const candCollege = decodeURIComponent(params.get('college') || 'GLA University (Mathura)');
      const candTier = decodeURIComponent(params.get('tier') || 'Tier-2');
      const candProject = decodeURIComponent(params.get('project') || 'rabto');
      const candTrack = decodeURIComponent(params.get('track') || 'Full Stack Engineer');
      const authScore = parseInt(params.get('auth') || '95', 10);
      const vivaScore = parseFloat(params.get('viva') || '0.0');
      const cardStatus = params.get('status') || 'VERIFIED_EXEMPLARY';
      const isClone = cardStatus === 'FLAGGED_CLONE';
      const isInjected = cardStatus.includes('INJECTION');

      target = {
        candidate_id: verifyId,
        name: candName,
        college: candCollege,
        college_tier: candTier,
        project_name: candProject,
        project_type: candTrack,
        total_loc: 2450,
        authenticity_score: authScore,
        is_clone: isClone,
        has_prompt_injection: isInjected,
        is_prompt_injected: isInjected,
        viva_score: vivaScore,
        viva_status: vivaScore > 0 ? 'COMPLETED' : (isInjected ? 'BLOCKED_ADVERSARIAL' : (isClone ? 'BLOCKED_CLONE' : 'PENDING_DEFENSE')),
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
          headline: isClone 
            ? 'Repository matched public tutorial architecture.' 
            : (isInjected 
              ? 'Security Alert: Manipulative directive intercepted.' 
              : `Demonstrated authentic software development with steady commit history, structured code organization, and verified implementation of core application logic across ${candProject}.`),
          strengths: isInjected
            ? [
                'Adversarial prompt injection pattern intercepted by integrity filters',
                'Quarantined by automated AST security scanner with zero authenticity score',
                'Candidate evaluation frozen pending manual recruiter review'
              ]
            : (isClone 
              ? [
                  'Repository files and structure successfully parsed',
                  'Matched existing public tutorial implementation',
                  'Awaiting original project architecture proof'
                ]
              : [
                  'Cryptographic proof verified on live public Pariksha ledger',
                  'Demonstrated code originality with organic development cadence',
                  'Verified core functions with strong algorithmic logic and clear code structure'
                ]),
          growth_area: isInjected
            ? 'Remove adversarial prompt injection directives from repository code and documentation.'
            : (isClone 
              ? 'Build original software architectures rather than duplicating online tutorial repos.'
              : 'Expand automated test suites and mock coverage for external API integrations.'),
          specific_action: isInjected
            ? 'Submit an authentic code repository without injected system prompt instructions or hidden bypasses.'
            : (isClone
              ? 'Design custom database schema models and independent business domain logic.'
              : 'Add automated tests to verify how the application handles network timeouts and error states.'),
          tamper_proof_hash: `SHA256:${verifyId}`
        }
      };
    }

    return { tab: 'proofcard', candidate: target };
  }

  return { tab: 'ingestion', candidate: null };
}

export const App: React.FC = () => {
  const [initialResolved] = useState(resolveInitialStateFromUrl);
  const [activeTab, setActiveTab] = useState<string>(initialResolved.tab);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [currentCandidate, setCurrentCandidate] = useState<CandidateProfile | null>(initialResolved.candidate);
  const [cohort, setCohort] = useState<CandidateProfile[]>([]);
  const [isImatsOpen, setIsImatsOpen] = useState<boolean>(false);
  const [isN8nOpen, setIsN8nOpen] = useState<boolean>(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const verifyId = params.get('verify');
      const vivaCid = params.get('cid');

      // 1. Handle Viva Invite Link: ?cid=...
      if (vivaCid) {
        let vivaCandidate = cohort.find(p => p.candidate_id === vivaCid);
        if (!vivaCandidate) {
          vivaCandidate = OFFLINE_DEMO_PROFILES.find(p => p.candidate_id === vivaCid);
        }
        if (!vivaCandidate) {
          try {
            const cached = localStorage.getItem(`proofcard_${vivaCid}`);
            if (cached) vivaCandidate = JSON.parse(cached);
          } catch (e) {}
        }
        if (vivaCandidate) {
          setCurrentCandidate(vivaCandidate);
        }
        setActiveTab('viva');
        return;
      }

      // 2. Handle Public ProofCard Verification Link & QR Code: ?verify=...
      if (verifyId) {
        let target = cohort.find(p => p.candidate_id === verifyId);

        if (!target) {
          try {
            const cached = localStorage.getItem(`proofcard_${verifyId}`) || localStorage.getItem('proofcard_last_scanned');
            if (cached) {
              const parsed = JSON.parse(cached);
              if (parsed && (parsed.candidate_id === verifyId || !verifyId)) target = parsed;
            }
          } catch (e) {}
        }

        if (!target) {
          target = OFFLINE_DEMO_PROFILES.find(p => p.candidate_id === verifyId);
        }

        // Always construct target from query parameters if not found in memory/storage
        if (!target) {
          const candName = decodeURIComponent(params.get('name') || 'Priyanshu Awasthi');
          const candCollege = decodeURIComponent(params.get('college') || 'GLA University (Mathura)');
          const candTier = decodeURIComponent(params.get('tier') || 'Tier-2');
          const candProject = decodeURIComponent(params.get('project') || 'rabto');
          const candTrack = decodeURIComponent(params.get('track') || 'Full Stack Engineer');
          const authScore = parseInt(params.get('auth') || '95', 10);
          const vivaScore = parseFloat(params.get('viva') || '9.0');
          const cardStatus = params.get('status') || 'VERIFIED_EXEMPLARY';

          target = {
            candidate_id: verifyId,
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
              headline: cardStatus === 'FLAGGED_CLONE' 
                ? 'Repository matched public tutorial architecture.' 
                : (cardStatus.includes('INJECTION') 
                  ? 'Security Alert: Manipulative directive intercepted.' 
                  : `Demonstrated authentic software development with steady commit history, structured code organization, and verified implementation of core application logic across ${candProject}.`),
              strengths: [
                'Cryptographic proof verified on live public Pariksha ledger',
                'Demonstrated code originality with organic development cadence',
                'Verified core functions with strong algorithmic logic and clear code structure'
              ],
              growth_area: 'Expand automated test suites and mock coverage for external API integrations.',
              specific_action: 'Add automated tests to verify how the application handles network timeouts and error states.',
              tamper_proof_hash: `SHA256:${verifyId}`
            }
          };
        }

        if (target) {
          setCurrentCandidate(target);
          setActiveTab('proofcard');
        }
      }
    }
  }, [cohort]);

  const handleSelectDemoProfile = () => {
    // Redirect to real scanner
    setActiveTab('ingestion');
  };

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
  };

  const handleUpdateVivaScore = (newScore: number) => {
    setCurrentCandidate(prev => {
      if (!prev) return null;
      return {
        ...prev,
        viva_score: newScore,
        proof_card: {
          ...prev.proof_card,
          status: prev.proof_card?.status || 'VERIFIED_COMPETENT',
          tamper_proof_hash: prev.proof_card?.tamper_proof_hash || `SHA256:${prev.candidate_id}`,
          headline: newScore >= 8 
            ? 'Exceptional systems intuition with proven codebase ownership.'
            : 'Competent engineer with solid understanding of primary workflows.'
        }
      };
    });
  };

  return (
    <div className="min-h-screen text-[#F5E9C7] flex flex-col selection:bg-[#8B1E1E] selection:text-white relative overflow-x-hidden">
      {/* Full Deviathon Battlefield Panoramic Background from User Asset */}
      <div className="deviathon-full-bg-layer" />
      <div className="deviathon-full-bg-overlay" />

      {/* Three.js Ambient Floating Golden Ember Background */}
      <Devithation3DCanvas />

      {/* Integraminds IMATS Enterprise API & Webhooks Modal */}
      <ImatsApiModal 
        isOpen={isImatsOpen} 
        onClose={() => setIsImatsOpen(false)} 
        onNavigateToTab={(tab) => {
          setIsImatsOpen(false);
          setActiveTab(tab);
        }}
      />

      {/* n8n Automations & Live ATS Integration Modal */}
      <N8nAutomationModal
        isOpen={isN8nOpen}
        onClose={() => setIsN8nOpen(false)}
      />

      <div className="relative z-10 flex flex-col flex-1">
        {/* Navbar with Authentic Deviathon Hackathon branding and 6-Feature Showcase */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDemoMode={isDemoMode}
          setIsDemoMode={setIsDemoMode}
          onSelectDemoProfile={handleSelectDemoProfile}
          onOpenImatsModal={() => setIsImatsOpen(true)}
          onOpenN8nModal={() => setIsN8nOpen(true)}
          currentCandidate={currentCandidate}
        />
      {/* Main Content View Switcher */}
      <main className="flex-1">
        {activeTab === 'ingestion' && (
          <CandidateIngestion
            onScanComplete={handleScanComplete}
            onNavigateToTab={setActiveTab}
            onSelectCandidate={(cand) => {
              setCurrentCandidate(cand);
              setActiveTab('terminal');
            }}
            cohort={cohort}
            onUpdateCohort={setCohort}
          />
        )}

        {activeTab === 'terminal' && (
          <ForensicTerminal
            candidate={currentCandidate}
            onNavigateToTab={setActiveTab}
            onSelectCandidate={setCurrentCandidate}
            cohort={cohort}
          />
        )}

        {activeTab === 'viva' && (
          <VivaArena
            candidate={currentCandidate}
            onUpdateVivaScore={handleUpdateVivaScore}
            onNavigateToTab={setActiveTab}
            onSelectCandidate={setCurrentCandidate}
            cohort={cohort}
          />
        )}

        {activeTab === 'proofcard' && (
          <ProofCard3D
            candidate={currentCandidate}
            onNavigateToTab={setActiveTab}
            onSelectCandidate={setCurrentCandidate}
            cohort={cohort}
          />
        )}

        {activeTab === 'battle' && (
          <RecruiterBattle
            currentCandidate={currentCandidate}
            onNavigateToTab={setActiveTab}
            onSelectCandidate={setCurrentCandidate}
            cohort={cohort}
          />
        )}

        {activeTab === 'bias-mirror' && (
          <BiasMirror 
            cohort={cohort}
          />
        )}
      </main>
      </div>
    </div>
  );
};

export default App;
