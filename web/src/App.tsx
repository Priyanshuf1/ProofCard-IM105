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
import { OFFLINE_DEMO_PROFILES } from './data/offlineDemoData';
import { CAMPUS_COHORT_100 } from './data/cohortData';
import { CandidateProfile } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('ingestion');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [currentCandidate, setCurrentCandidate] = useState<CandidateProfile>(OFFLINE_DEMO_PROFILES[0]); // Default to Priyanshu Awasthi
  const [isImatsOpen, setIsImatsOpen] = useState<boolean>(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const verifyId = params.get('verify');
      if (verifyId) {
        const foundInCohort = CAMPUS_COHORT_100.find(p => p.candidate_id === verifyId);
        const found = foundInCohort || OFFLINE_DEMO_PROFILES.find(p => p.candidate_id === verifyId);
        if (found) {
          setCurrentCandidate(found);
        }
        setActiveTab('proofcard');
      }
    }
  }, []);

  const handleSelectDemoProfile = (index: number) => {
    const profile = OFFLINE_DEMO_PROFILES[index] || OFFLINE_DEMO_PROFILES[0];
    setCurrentCandidate(profile);
    setActiveTab('terminal');
  };

  const handleScanComplete = (profile: CandidateProfile) => {
    setCurrentCandidate(profile);
  };

  const handleUpdateVivaScore = (newScore: number) => {
    setCurrentCandidate(prev => ({
      ...prev,
      viva_score: newScore,
      proof_card: {
        ...prev.proof_card,
        headline: newScore >= 8 
          ? 'Exceptional systems intuition with proven codebase ownership.'
          : 'Competent engineer with solid understanding of primary workflows.'
      }
    }));
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
          />
        )}

        {activeTab === 'terminal' && (
          <ForensicTerminal
            candidate={currentCandidate}
            onNavigateToTab={setActiveTab}
            onSelectCandidate={setCurrentCandidate}
            cohort={CAMPUS_COHORT_100}
          />
        )}

        {activeTab === 'viva' && (
          <VivaArena
            candidate={currentCandidate}
            onUpdateVivaScore={handleUpdateVivaScore}
            onNavigateToTab={setActiveTab}
            onSelectCandidate={setCurrentCandidate}
            cohort={CAMPUS_COHORT_100}
          />
        )}

        {activeTab === 'proofcard' && (
          <ProofCard3D
            candidate={currentCandidate}
            onNavigateToTab={setActiveTab}
            onSelectCandidate={setCurrentCandidate}
            cohort={CAMPUS_COHORT_100}
          />
        )}

        {activeTab === 'battle' && (
          <RecruiterBattle
            currentCandidate={currentCandidate}
            onNavigateToTab={setActiveTab}
            onSelectCandidate={setCurrentCandidate}
            cohort={CAMPUS_COHORT_100}
          />
        )}

        {activeTab === 'bias-mirror' && (
          <BiasMirror />
        )}
      </main>

      {/* Clean Production Footer */}
      <footer className="border-t border-[#D4AF37]/15 bg-black/60 py-5 px-6 text-xs text-[#E6C280]/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-white font-medium">ProofCard Talent Intelligence</span>
            <span className="text-neutral-500">·</span>
            <span className="text-neutral-400 font-mono text-[11px]">IM-105 Engine</span>
          </div>
          <div className="text-neutral-400 text-[11px] font-mono">
            Autonomous Skill Verification & Recruiter Bias Audit
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default App;
