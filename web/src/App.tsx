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

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('ingestion');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [currentCandidate, setCurrentCandidate] = useState<CandidateProfile | null>(null);
  const [cohort, setCohort] = useState<CandidateProfile[]>([]);
  const [isImatsOpen, setIsImatsOpen] = useState<boolean>(false);
  const [isN8nOpen, setIsN8nOpen] = useState<boolean>(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const verifyId = params.get('verify');
      if (verifyId) {
        const foundInCohort = cohort.find(p => p.candidate_id === verifyId);
        if (foundInCohort) {
          setCurrentCandidate(foundInCohort);
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
