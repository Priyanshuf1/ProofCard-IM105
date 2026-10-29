import React, { useState, useEffect } from 'react';
import { 
  Swords, 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  UserPlus, 
  Loader2,
  Trash2,
  Plus,
  Download,
  Printer,
  Users,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { PRESET_JOB_DESCRIPTIONS } from '../data/offlineDemoData';
import { runBattleCompare, parseJobDescription, analyzeGithubUrl, autoShortlistCohort, dispatchN8nEvent } from '../services/api';
import { BattleResponse, CandidateProfile } from '../types';

const KNOWN_TECH_KEYWORDS: Record<string, string> = {
  'python': 'python', 'fastapi': 'fastapi', 'flask': 'flask', 'django': 'django',
  'redis': 'redis', 'postgres': 'postgresql', 'postgresql': 'postgresql', 'sql': 'sql',
  'mysql': 'mysql', 'mongodb': 'mongodb', 'mongo': 'mongodb', 'docker': 'docker',
  'k8s': 'kubernetes', 'kubernetes': 'kubernetes', 'aws': 'aws', 'gcp': 'gcp', 'azure': 'azure',
  'react': 'react', 'next': 'next.js', 'nextjs': 'next.js', 'next.js': 'next.js',
  'node': 'nodejs', 'nodejs': 'nodejs', 'node.js': 'nodejs', 'express': 'express',
  'typescript': 'typescript', 'ts': 'typescript', 'javascript': 'javascript', 'js': 'javascript',
  'graphql': 'graphql', 'rest': 'rest_api', 'rest api': 'rest_api', 'api': 'rest_api',
  'kafka': 'kafka', 'rabbitmq': 'rabbitmq', 'microservices': 'microservices',
  'testing': 'testing', 'pytest': 'pytest', 'jest': 'jest', 'vitest': 'vitest', 'unit test': 'testing',
  'ci/cd': 'ci/cd', 'github actions': 'ci/cd', 'git': 'git', 'linux': 'linux',
  'asyncio': 'asyncio', 'websocket': 'websocket', 'websockets': 'websocket',
  'machine learning': 'machine_learning', 'ml': 'machine_learning', 'ai': 'ai',
  'pytorch': 'pytorch', 'tensorflow': 'tensorflow', 'pandas': 'pandas', 'numpy': 'numpy',
  'go': 'go', 'golang': 'go', 'rust': 'rust', 'c++': 'c++', 'java': 'java', 'spring': 'spring',
  'tailwind': 'tailwind'
};

export function extractSkillsFromText(text: string): string[] {
  if (!text) return [];
  const lower = text.toLowerCase();
  const found = new Set<string>();
  for (const [key, canonical] of Object.entries(KNOWN_TECH_KEYWORDS)) {
    const escaped = key.replace(/([.+*?^=!:${}()|[\]\/\\])/g, "\\$1");
    const regex = new RegExp(`(?:^|[^a-z0-9])${escaped}(?:$|[^a-z0-9])`, 'i');
    if (regex.test(lower)) {
      found.add(canonical);
    }
  }
  return Array.from(found);
}

interface RecruiterBattleProps {
  currentCandidate?: CandidateProfile | null;
  onNavigateToTab: (tab: string) => void;
  onSelectCandidate?: (candidate: CandidateProfile) => void;
  cohort?: CandidateProfile[];
}

export const RecruiterBattle: React.FC<RecruiterBattleProps> = ({ 
  currentCandidate, 
  onNavigateToTab,
  onSelectCandidate,
  cohort = []
}) => {
  // Default to the side-by-side battle matrix
  const [activeMode, setActiveMode] = useState<'matrix' | 'funnel'>('matrix');

  const [selectedPreset, setSelectedPreset] = useState(0);
  const [jdText, setJdText] = useState(PRESET_JOB_DESCRIPTIONS[0].text);
  const [jobTitle, setJobTitle] = useState(PRESET_JOB_DESCRIPTIONS[0].title);
  const [requiredSkills, setRequiredSkills] = useState(['python', 'fastapi', 'redis', 'postgresql', 'docker', 'testing']);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [extractNotice, setExtractNotice] = useState<string | null>(null);
  
  // Funnel settings
  const [targetCount, setTargetCount] = useState<number>(10);
  const [minAuthScore, setMinAuthScore] = useState<number>(70);
  const [minVivaScore, setMinVivaScore] = useState<number>(6);
  const [excludeClones, setExcludeClones] = useState<boolean>(true);
  const [requireTests, setRequireTests] = useState<boolean>(false);
  const [isShortlisting, setIsShortlisting] = useState<boolean>(false);
  const [shortlistResult, setShortlistResult] = useState<{
    shortlisted: any[];
    qualifiedCount: number;
    cutoffFailedCount: number;
    rejectedCount: number;
    hoursSaved: number;
  } | null>(null);

  // Dynamic Candidate Pool for Battle Matrix
  const [candidatePool, setCandidatePool] = useState<CandidateProfile[]>(() => {
    const list: CandidateProfile[] = [];
    if (currentCandidate) list.push(currentCandidate);
    if (cohort && cohort.length > 0) {
      cohort.forEach(c => {
        if (!list.some(p => p.candidate_id === c.candidate_id)) {
          list.push(c);
        }
      });
    }
    return list;
  });

  // Sync candidate pool whenever currentCandidate or cohort changes
  useEffect(() => {
    setCandidatePool(prev => {
      const list = [...prev];
      if (currentCandidate && !list.some(p => p.candidate_id === currentCandidate.candidate_id)) {
        list.unshift(currentCandidate);
      }
      if (cohort && cohort.length > 0) {
        cohort.forEach(c => {
          if (!list.some(p => p.candidate_id === c.candidate_id)) {
            list.push(c);
          }
        });
      }
      return list;
    });
  }, [currentCandidate, cohort]);

  // Add Real Candidate Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCollege, setNewCollege] = useState('');
  const [isAddingCandidate, setIsAddingCandidate] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const [battleResult, setBattleResult] = useState<BattleResponse | null>(null);
  const [isFighting, setIsFighting] = useState(false);

  // Compute battle matrix locally as guaranteed fallback
  const computeLocalBattle = (skills: string[], pool: CandidateProfile[]): BattleResponse => {
    const matrix = pool.map(c => {
      const detectedStr = ((c.detected_files || []).join(' ') + ' ' + (c.project_type || '')).toLowerCase();
      const verified = skills.filter(s => {
        const sLower = s.toLowerCase();
        if (sLower === 'python') return detectedStr.includes('.py') || detectedStr.includes('python');
        if (sLower === 'fastapi') return detectedStr.includes('fastapi') || detectedStr.includes('api');
        if (sLower === 'react') return detectedStr.includes('.jsx') || detectedStr.includes('.tsx') || detectedStr.includes('react');
        if (sLower === 'docker') return detectedStr.includes('docker') || detectedStr.includes('dockerfile');
        if (sLower === 'testing') return detectedStr.includes('test') || detectedStr.includes('spec');
        return detectedStr.includes(sLower);
      });
      const missing = skills.filter(s => !verified.includes(s));
      const jdPct = Math.round((verified.length / Math.max(skills.length, 1)) * 100);
      const auth = c.authenticity_score || 0;
      const viva = c.viva_score !== undefined ? c.viva_score : 5;
      let composite = Math.round((auth * 0.40) + (jdPct * 0.35) + (viva * 10 * 0.25));
      if (c.is_clone) composite = Math.min(composite, 25);

      const hasTests = verified.includes('testing') || (c.git_dna && (c.git_dna.test_files_detected || 0) > 0) || false;

      return {
        candidate_id: c.candidate_id,
        name: c.name,
        email: c.email,
        college: c.college || 'Engineering Institute',
        authenticity_score: auth,
        jd_match_pct: jdPct,
        viva_score: viva,
        composite_score: composite,
        verified_skills: verified,
        missing_skills: missing,
        has_tests: hasTests,
        is_clone: c.is_clone
      };
    });

    matrix.sort((a, b) => b.composite_score - a.composite_score);
    const winner = matrix[0];
    const runnerUp = matrix[1] || winner;
    const diff = winner.composite_score - runnerUp.composite_score;

    return {
      status: 'success',
      winner_id: winner.candidate_id,
      winner_name: winner.name,
      diff_pts: diff,
      rationale: `${winner.name} ranks #1 (+${diff} pts) with ${winner.authenticity_score}% code authenticity and ${winner.verified_skills.length} of ${skills.length} skills verified in source code.`,
      battle_matrix: matrix
    };
  };

  // Run Battle Comparison
  const handleRunBattle = async (customSkills?: string[]) => {
    if (candidatePool.length < 2) return;
    setIsFighting(true);
    const skillsToUse = customSkills || requiredSkills;

    try {
      const result = await runBattleCompare(skillsToUse, candidatePool.slice(0, 6));
      if (result && result.battle_matrix && result.battle_matrix.length > 0) {
        setBattleResult(result);
        setIsFighting(false);
        dispatchN8nEvent('CANDIDATE_SHORTLISTED', {
          job_title: jobTitle,
          winner_id: result.winner_id,
          winner_name: result.winner_name,
          diff_pts: result.diff_pts,
          rationale: result.rationale,
          battle_matrix: result.battle_matrix
        });
        return;
      }
    } catch (e) {
      // Backend fallback to guaranteed local calculation
    }

    const fallbackResult = computeLocalBattle(skillsToUse, candidatePool.slice(0, 6));
    setBattleResult(fallbackResult);
    setIsFighting(false);
    dispatchN8nEvent('CANDIDATE_SHORTLISTED', {
      job_title: jobTitle,
      winner_id: fallbackResult.winner_id,
      winner_name: fallbackResult.winner_name,
      diff_pts: fallbackResult.diff_pts,
      rationale: fallbackResult.rationale,
      battle_matrix: fallbackResult.battle_matrix
    });
  };

  // Auto-run battle whenever candidatePool has 2 or more candidates and battleResult is null
  useEffect(() => {
    if (candidatePool.length >= 2 && !battleResult && !isFighting) {
      handleRunBattle();
    }
  }, [candidatePool.length]);

  const handleJdTextChange = (text: string) => {
    setJdText(text);
    const extracted = extractSkillsFromText(`${jobTitle} ${text}`);
    if (extracted.length > 0) {
      setRequiredSkills(extracted);
      setExtractNotice(`Auto-extracted ${extracted.length} skills from job text.`);
      if (candidatePool.length >= 2) {
        handleRunBattle(extracted);
      }
    }
  };

  const handleJobTitleChange = (title: string) => {
    setJobTitle(title);
    const extracted = extractSkillsFromText(`${title} ${jdText}`);
    if (extracted.length > 0) {
      setRequiredSkills(extracted);
      setExtractNotice(`Auto-extracted ${extracted.length} skills.`);
      if (candidatePool.length >= 2) {
        handleRunBattle(extracted);
      }
    }
  };

  const handlePresetSelect = async (idx: number) => {
    setSelectedPreset(idx);
    const title = PRESET_JOB_DESCRIPTIONS[idx].title;
    const text = PRESET_JOB_DESCRIPTIONS[idx].text;
    setJobTitle(title);
    setJdText(text);
    try {
      const parsed = await parseJobDescription(title, text);
      const skills = parsed && parsed.length > 0 ? parsed : (idx === 0 
        ? ['python', 'fastapi', 'redis', 'postgresql', 'docker', 'testing']
        : ['react', 'nodejs', 'typescript', 'testing', 'rest_api']
      );
      setRequiredSkills(skills);
      if (candidatePool.length >= 2) {
        handleRunBattle(skills);
      }
    } catch {
      const skills = idx === 0 
        ? ['python', 'fastapi', 'redis', 'postgresql', 'docker', 'testing']
        : ['react', 'nodejs', 'typescript', 'testing', 'rest_api'];
      setRequiredSkills(skills);
      if (candidatePool.length >= 2) {
        handleRunBattle(skills);
      }
    }
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newSkillInput.trim().toLowerCase();
    if (clean && !requiredSkills.includes(clean)) {
      const updated = [...requiredSkills, clean];
      setRequiredSkills(updated);
      setNewSkillInput('');
      if (candidatePool.length >= 2) {
        handleRunBattle(updated);
      }
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updated = requiredSkills.filter(s => s !== skillToRemove);
    setRequiredSkills(updated);
    if (candidatePool.length >= 2) {
      handleRunBattle(updated);
    }
  };

  const handleAddRealCandidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) {
      setAddError('Please enter a GitHub repository link.');
      return;
    }

    setAddError(null);
    setIsAddingCandidate(true);

    try {
      const realProfile = await analyzeGithubUrl(
        newUrl.trim(),
        newName.trim() || 'Candidate',
        newCollege.trim() || 'University',
        true
      );

      setCandidatePool(prev => {
        const updated = [realProfile, ...prev.filter(p => p.candidate_id !== realProfile.candidate_id)];
        return updated;
      });
      setShowAddModal(false);
      setNewName('');
      setNewUrl('');
      setNewCollege('');
      // Trigger new battle calculation
      setTimeout(() => handleRunBattle(), 200);
    } catch (err: any) {
      setAddError(err?.message || 'Failed to scan repository. Please ensure it is a public repository.');
    } finally {
      setIsAddingCandidate(false);
    }
  };

  const handleRemoveCandidate = (candidateId: string) => {
    const updated = candidatePool.filter(c => c.candidate_id !== candidateId);
    setCandidatePool(updated);
    if (updated.length >= 2) {
      const result = computeLocalBattle(requiredSkills, updated);
      setBattleResult(result);
    } else {
      setBattleResult(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl mb-6 bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
              Recruiter Battle Arena
            </h1>
            <p className="text-sm text-[#E6C280] font-normal mt-1">
              Compare candidates side-by-side against job requirements to see who can actually build.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2 bg-black/60 p-1.5 rounded-xl border border-[#D4AF37]/40">
            <button
              onClick={() => setActiveMode('matrix')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
                activeMode === 'matrix'
                  ? 'bg-[#8B1E1E] text-white border border-[#D4AF37] shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Swords className="w-3.5 h-3.5" />
              <span>Side-by-Side Battle ({candidatePool.length})</span>
            </button>
            <button
              onClick={() => setActiveMode('funnel')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
                activeMode === 'funnel'
                  ? 'bg-[#8B1E1E] text-white border border-[#D4AF37] shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Batch Shortlist ({cohort.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Job Description Card */}
      <div className="p-6 rounded-2xl bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-lg mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#3A2F27] pb-3 mb-4 gap-2">
          <div className="flex items-center gap-2 text-sm text-[#FFD166] font-bold uppercase tracking-wider">
            <FileText className="w-4 h-4 text-[#D4AF37]" />
            <span>Job Role & Required Skills</span>
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#FFD166] font-bold uppercase">Role Templates:</span>
            {PRESET_JOB_DESCRIPTIONS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handlePresetSelect(idx)}
                className={`text-xs px-3 py-1.5 rounded-full border transition cursor-pointer font-bold ${
                  selectedPreset === idx
                    ? 'bg-[#8B1E1E] border-[#D4AF37] text-white'
                    : 'bg-black/50 border-[#3A2F27] text-[#C9B89A] hover:border-[#D4AF37]/50'
                }`}
              >
                {preset.title.split(' ')[0]} {preset.title.split(' ')[1] || ''}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-2.5">
            <input
              type="text"
              value={jobTitle}
              onChange={e => handleJobTitleChange(e.target.value)}
              placeholder="e.g. Backend Engineer / Distributed Systems"
              className="w-full bg-black/50 border border-[#3A2F27] rounded-xl px-4 py-2.5 text-sm text-neutral-100 focus:outline-none focus:border-[#D4AF37] font-medium"
            />
            <textarea
              rows={2}
              value={jdText}
              onChange={e => handleJdTextChange(e.target.value)}
              placeholder="Paste job description or requirements (e.g. Seeking Python, FastAPI, Docker, and Redis engineer with async testing experience)..."
              className="w-full bg-black/50 border border-[#3A2F27] rounded-xl p-3.5 text-sm text-neutral-200 focus:outline-none focus:border-[#D4AF37] font-sans"
            />
          </div>

          {/* Skill Tag Manager */}
          <div className="bg-black/50 rounded-xl border border-[#3A2F27] p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#FFD166] uppercase tracking-wider block font-bold">
                  Active Match Skills ({requiredSkills.length})
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">Live In Sync</span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {requiredSkills.map((skill, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full text-xs font-mono bg-[#8B1E1E]/30 border border-[#D4AF37]/40 text-[#F5E9C7] flex items-center gap-1.5">
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-neutral-400 hover:text-white cursor-pointer text-xs"
                      title="Remove skill"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <form onSubmit={handleAddSkill} className="mt-2 pt-2 border-t border-[#3A2F27] flex gap-1">
              <input
                type="text"
                value={newSkillInput}
                onChange={e => setNewSkillInput(e.target.value)}
                placeholder="+ Add custom skill"
                className="w-full bg-black/60 border border-[#3A2F27] rounded-lg px-2.5 py-1 text-xs text-[#F5E9C7] font-mono focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                className="px-2.5 py-1 rounded-lg bg-[#2A241B] border border-[#3A2F27] text-xs text-[#D4AF37] hover:border-[#D4AF37] cursor-pointer font-bold"
              >
                +
              </button>
            </form>
          </div>
        </div>

        {/* Real-time Match Engine Impact Bar */}
        <div className="mt-3.5 p-3 rounded-xl bg-black/60 border border-[#D4AF37]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-neutral-300">
            <Sparkles className="w-4 h-4 text-[#FFD166] shrink-0" />
            <span>
              <strong className="text-white">Active Match Engine Impact:</strong> These <strong className="text-[#FFD166]">{requiredSkills.length} required skills</strong> dynamically scan candidate repositories, calculate JD Match % (35% weight), and crown the #1 head-to-head winner.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {extractNotice && (
              <span className="text-[11px] text-emerald-400 font-mono font-bold animate-fadeIn">
                ✓ {extractNotice}
              </span>
            )}
            <button
              type="button"
              onClick={() => {
                const extracted = extractSkillsFromText(`${jobTitle} ${jdText}`);
                if (extracted.length > 0) {
                  setRequiredSkills(extracted);
                  setExtractNotice(`Synced ${extracted.length} skills.`);
                  if (candidatePool.length >= 2) handleRunBattle(extracted);
                } else {
                  setExtractNotice('Add technical keywords to job text.');
                }
                setTimeout(() => setExtractNotice(null), 3500);
              }}
              className="px-3 py-1 rounded-lg bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#FFD166] text-xs font-bold flex items-center gap-1 transition cursor-pointer"
              title="Re-extract keywords from title and text"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Extract Skills</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODE 1: SIDE-BY-SIDE BATTLE MATRIX */}
      {activeMode === 'matrix' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#FFD166] font-bold uppercase tracking-wider">
              Contenders in Battle ({candidatePool.length} Active Candidates)
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddModal(true)}
                className="btn-dev-outline text-xs flex items-center gap-1.5 px-3 py-1.5 cursor-pointer font-bold"
              >
                <UserPlus className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>+ Add GitHub Candidate</span>
              </button>

              {candidatePool.length >= 2 && (
                <button
                  onClick={() => handleRunBattle()}
                  disabled={isFighting}
                  className="btn-dev-primary text-xs flex items-center gap-2 px-4 py-1.5 cursor-pointer shadow-lg font-bold"
                >
                  <Swords className="w-3.5 h-3.5" />
                  <span>{isFighting ? 'Comparing...' : 'Re-Rank Candidates'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Add Candidate Modal */}
          {showAddModal && (
            <div className="p-6 rounded-2xl mb-6 bg-black/90 backdrop-blur-md border border-[#D4AF37]/50 shadow-2xl animate-in fade-in">
              <div className="flex items-center justify-between border-b border-[#3A2F27] pb-3 mb-4">
                <span className="font-bold text-sm text-[#D4AF37] flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-[#D4AF37]" />
                  <span>Add Candidate to Battle Arena</span>
                </span>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-neutral-400 hover:text-white font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {addError && (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/60 text-red-200 text-xs mb-3">
                  {addError}
                </div>
              )}

              <form onSubmit={handleAddRealCandidate} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    Candidate Name
                  </label>
                  <input
                    type="text"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-black/60 border border-[#3A2F27] rounded-xl px-3.5 py-2 text-xs text-[#F5E9C7] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    GitHub Repository Link *
                  </label>
                  <input
                    type="text"
                    value={newUrl}
                    onChange={e => setNewUrl(e.target.value)}
                    placeholder="https://github.com/user/repo"
                    className="w-full bg-black/60 border border-[#3A2F27] rounded-xl px-3.5 py-2 text-xs text-[#F5E9C7] font-mono focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    College / University
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCollege}
                      onChange={e => setNewCollege(e.target.value)}
                      placeholder="e.g. State University"
                      className="w-full bg-black/60 border border-[#3A2F27] rounded-xl px-3.5 py-2 text-xs text-[#F5E9C7] focus:outline-none focus:border-[#D4AF37]"
                    />
                    <button
                      type="submit"
                      disabled={isAddingCandidate}
                      className="btn-dev-primary text-xs px-4 py-2 shrink-0 cursor-pointer flex items-center gap-1.5 font-bold"
                    >
                      {isAddingCandidate ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                      <span>{isAddingCandidate ? 'Scanning...' : 'Add'}</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Empty State if Fewer Than 2 Candidates in Pool */}
          {candidatePool.length < 2 ? (
            <div className="p-8 sm:p-12 rounded-2xl bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 text-center shadow-2xl">
              <Swords className="w-12 h-12 mx-auto mb-3 text-[#D4AF37]" />
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {candidatePool.length === 1 
                  ? '1 Candidate in Roster — Need at least 2 for Battle'
                  : 'No Candidates in Battle Roster'}
              </h2>
              <p className="text-sm text-[#C9B89A] max-w-md mx-auto mb-6">
                {candidatePool.length === 1 
                  ? `"${candidatePool[0].name}" is ready. Add 1 more candidate to compare their code head-to-head.`
                  : 'Scan candidates in the Code Ingestion Scanner or click "+ Add GitHub Candidate" to pit developers side-by-side.'}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="btn-dev-primary text-xs px-5 py-2.5 cursor-pointer font-bold"
                >
                  + Add GitHub Candidate
                </button>
                <button
                  onClick={() => onNavigateToTab('ingestion')}
                  className="btn-dev-outline text-xs px-5 py-2.5 cursor-pointer font-bold"
                >
                  Scan in Code Ingestion
                </button>
              </div>
            </div>
          ) : battleResult ? (
            <div className="space-y-5">
              {/* Winner Banner */}
              <div className="p-5 rounded-2xl bg-black/70 backdrop-blur-md border border-[#D4AF37]/50 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#8B1E1E]/50 text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#D4AF37]/50 shadow-inner">
                      <Trophy className="w-5 h-5 text-[#FFD166]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                          Top Candidate Match
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#2A241B] border border-[#D4AF37]/40 text-[#FFD166] font-mono font-bold">
                          +{battleResult.diff_pts} Pts Lead
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-white mt-0.5">
                        {battleResult.winner_name}
                      </h2>
                    </div>
                  </div>

                  <div className="text-xs text-neutral-300 bg-black/50 p-3 rounded-xl border border-[#3A2F27] max-w-md leading-relaxed">
                    <span className="text-xs uppercase font-bold text-[#D4AF37] block mb-0.5">Why This Candidate Won:</span>
                    {battleResult.rationale}
                  </div>
                </div>
              </div>

              {/* Side-by-Side Candidate Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {battleResult.battle_matrix.map((c, idx) => {
                  const isWinner = c.candidate_id === battleResult.winner_id;
                  return (
                    <div 
                      key={c.candidate_id || idx}
                      className={`rounded-2xl border p-5 flex flex-col justify-between transition-all backdrop-blur-md ${
                        isWinner
                          ? 'bg-black/75 border-[#D4AF37] shadow-[0_0_18px_rgba(212,175,55,0.3)]'
                          : 'bg-black/60 border-[#3A2F27]'
                      }`}
                    >
                      <div>
                        {/* Rank Badge & Delete */}
                        <div className="flex items-center justify-between mb-2.5 text-xs">
                          <span className={`px-2.5 py-0.5 rounded-full font-bold text-xs ${
                            idx === 0 
                              ? 'bg-[#8B1E1E] text-white border border-[#D4AF37]' 
                              : 'bg-black/50 text-[#C9B89A] border border-[#3A2F27]'
                          }`}>
                            Rank #{idx + 1}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[#8A7F6B] text-xs font-sans">{c.college}</span>
                            {candidatePool.length > 2 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveCandidate(c.candidate_id)}
                                className="text-neutral-500 hover:text-red-400 p-0.5 cursor-pointer"
                                title="Remove from Battle"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Candidate Name & Composite Score */}
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-bold text-white text-base truncate max-w-[180px]">
                            {c.name}
                          </h3>
                          <div className="text-right">
                            <span className={`text-xl font-bold font-mono ${isWinner ? 'text-[#FFD166]' : 'text-white'}`}>
                              {c.composite_score}
                            </span>
                            <span className="text-neutral-400 text-xs block font-mono">/ 100</span>
                          </div>
                        </div>

                        {/* Clone Warning Badge if Clone */}
                        {c.is_clone && (
                          <div className="mb-3 p-2 rounded-lg bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-red-400" />
                            <span>Tutorial Clone Flagged</span>
                          </div>
                        )}

                        {/* 3 Metric Pills */}
                        <div className="grid grid-cols-3 gap-1.5 p-2 rounded-xl bg-black/60 border border-[#3A2F27] text-center text-xs font-mono mb-4">
                          <div>
                            <span className="text-neutral-400 text-[10px] block">Auth</span>
                            <span className="font-bold text-emerald-400">{c.authenticity_score}%</span>
                          </div>
                          <div>
                            <span className="text-neutral-400 text-[10px] block">JD Match</span>
                            <span className="font-bold text-[#FFD166]">{c.jd_match_pct}%</span>
                          </div>
                          <div>
                            <span className="text-neutral-400 text-[10px] block">Viva</span>
                            <span className="font-bold text-[#D4AF37]">{c.viva_score ? `${c.viva_score}/10` : "Pending"}</span>
                          </div>
                        </div>

                        {/* Skills Breakdown */}
                        <div className="space-y-2 text-xs">
                          <div>
                            <span className="text-neutral-400 uppercase font-bold block mb-1">
                              Verified in Code:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {c.verified_skills.length > 0 ? (
                                c.verified_skills.map((s, i) => (
                                  <span key={i} className="px-2 py-0.5 rounded-full bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                                    {s}
                                  </span>
                                ))
                              ) : (
                                <span className="text-neutral-400 italic">None found</span>
                              )}
                            </div>
                          </div>

                          {c.missing_skills.length > 0 && (
                            <div>
                              <span className="text-neutral-400 uppercase font-bold block mb-1">
                                Missing Skills:
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {c.missing_skills.map((s, i) => (
                                  <span key={i} className="px-2 py-0.5 rounded-full bg-black/40 border border-[#3A2F27] text-neutral-400 text-xs font-mono flex items-center gap-1">
                                    <XCircle className="w-3 h-3 text-neutral-500 shrink-0" />
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Test Files Indicator */}
                      <div className="mt-4 pt-2.5 border-t border-[#3A2F27] flex items-center justify-between text-xs">
                        <span className="text-neutral-400">Unit Tests:</span>
                        <span className={c.has_tests ? 'text-emerald-400 font-bold' : 'text-neutral-500'}>
                          {c.has_tests ? '✓ Verified in Code' : '✗ None Found'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* MODE 2: BATCH SHORTLIST FUNNEL */}
      {activeMode === 'funnel' && (
        <div className="space-y-6">
          {cohort.length === 0 ? (
            <div className="p-8 sm:p-12 rounded-2xl bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 text-center shadow-2xl">
              <Users className="w-12 h-12 mx-auto mb-3 text-[#D4AF37]" />
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                No Ingested Batch Cohort
              </h2>
              <p className="text-sm text-[#C9B89A] max-w-md mx-auto mb-6">
                Upload a candidate CSV roster in the Code Ingestion Scanner to run automated ranking and shortlisting on high-volume applicant pools.
              </p>
              <button
                onClick={() => onNavigateToTab('ingestion')}
                className="btn-dev-primary text-xs px-6 py-3 cursor-pointer font-bold inline-flex items-center gap-2"
              >
                <span>Go to Batch Ingestion</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">
                  Batch Shortlist ({cohort.length} Candidates)
                </h2>
                <button
                  onClick={() => {
                    const res = computeLocalBattle(requiredSkills, cohort);
                    setShortlistResult({
                      shortlisted: res.battle_matrix,
                      qualifiedCount: res.battle_matrix.filter(c => c.authenticity_score >= 60).length,
                      cutoffFailedCount: res.battle_matrix.filter(c => c.authenticity_score < 60).length,
                      rejectedCount: res.battle_matrix.filter(c => c.is_clone).length,
                      hoursSaved: Math.round(cohort.length * 0.83 * 10) / 10
                    });
                    dispatchN8nEvent('CANDIDATE_SHORTLISTED', {
                      job_title: jobTitle,
                      winner_id: res.winner_id,
                      winner_name: res.winner_name,
                      diff_pts: res.diff_pts,
                      rationale: res.rationale,
                      battle_matrix: res.battle_matrix
                    });
                  }}
                  className="btn-dev-primary text-xs px-4 py-2 cursor-pointer font-bold"
                >
                  Run Batch Shortlist
                </button>
              </div>

              {shortlistResult && (
                <div className="overflow-x-auto rounded-xl border border-[#3A2F27]">
                  <table className="w-full text-left text-sm text-neutral-200">
                    <thead className="bg-[#140b08] uppercase font-bold text-xs text-[#FFD166] border-b border-[#3A2F27]">
                      <tr>
                        <th className="py-3 px-3">Rank</th>
                        <th className="py-3 px-3">Candidate & College</th>
                        <th className="py-3 px-3 text-center">Authenticity</th>
                        <th className="py-3 px-3 text-center">JD Match</th>
                        <th className="py-3 px-3 text-center">Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2A241B] font-mono text-xs">
                      {shortlistResult.shortlisted.map((c, idx) => (
                        <tr key={idx} className="hover:bg-white/5">
                          <td className="py-3 px-3 font-bold text-[#FFD166]">#{idx + 1}</td>
                          <td className="py-3 px-3 font-sans font-bold text-white">{c.name} ({c.college})</td>
                          <td className="py-3 px-3 text-center text-emerald-400">{c.authenticity_score}%</td>
                          <td className="py-3 px-3 text-center text-[#FFD166]">{c.jd_match_pct}%</td>
                          <td className="py-3 px-3 text-center font-bold text-white text-sm">{c.composite_score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Navigation CTA to Bias Mirror */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => onNavigateToTab('bias-mirror')}
          className="btn-dev-primary text-xs flex items-center gap-2 shadow-xl cursor-pointer px-6 py-3 font-bold"
        >
          <span>Inspect Equal Opportunity Fairness Audit</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
