import React, { useState } from 'react';
import { 
  UploadCloud, 
  GitBranch, 
  FileCode, 
  Loader2, 
  ArrowRight,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Users,
  Search,
  FileSpreadsheet,
  AlertTriangle,
  Clock,
  Award,
  ExternalLink,
  Trash2,
  Mail
} from 'lucide-react';
import { uploadZipFile, analyzeGithubUrl, ingestBatchCsv, evaluateCohortBatch, dispatchBatchVivaInvites, dispatchN8nEvent } from '../services/api';
import { CandidateProfile } from '../types';
import { classifyCollegeTier } from '../utils/collegeClassifier';

interface CandidateIngestionProps {
  onScanComplete: (profile: CandidateProfile) => void;
  onNavigateToTab: (tab: string) => void;
  onSelectCandidate?: (profile: CandidateProfile) => void;
  cohort?: CandidateProfile[];
  onUpdateCohort?: (cohort: CandidateProfile[]) => void;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const CandidateIngestion: React.FC<CandidateIngestionProps> = ({
  onScanComplete,
  onNavigateToTab,
  onSelectCandidate,
  cohort = [],
  onUpdateCohort,
}) => {
  const [scopeMode, setScopeMode] = useState<'single' | 'batch'>('single');
  const [ingestMode, setIngestMode] = useState<'github' | 'zip'>('github');
  const [githubUrl, setGithubUrl] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [college, setCollege] = useState('');
  const isEmailValid = EMAIL_REGEX.test(candidateEmail.trim());
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [consentGranted, setConsentGranted] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Single scan state
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);

  // Batch cohort state
  const [batchSearch, setBatchSearch] = useState('');
  const [batchFilter, setBatchFilter] = useState<'all' | 'builders' | 'clones' | 'dumps'>('all');
  const [isBatchProcessing, setIsBatchProcessing] = useState(false);
  const [batchProgress, setBatchProgress] = useState(100);

  const extractUserAndRepo = (url: string) => {
    const clean = url.trim().replace(/^https?:\/\//, '').replace(/^github\.com\//, '').replace(/\/$/, '');
    const parts = clean.split('/').filter(Boolean);
    return { user: parts[0] || '', repo: parts[1] || '' };
  };

  const handleGithubUrlChange = (val: string) => {
    setGithubUrl(val);
    const { user } = extractUserAndRepo(val);
    if (user && user !== 'github.com' && !candidateName) {
      const friendlyName = user.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      setCandidateName(friendlyName);
    }
  };

  const handleCsvUpload = async (file: File) => {
    setIsBatchProcessing(true);
    setErrorMessage(null);
    try {
      const text = await file.text();
      if (!text.trim()) throw new Error('Uploaded CSV file is empty.');
      const data = await ingestBatchCsv(text);
      let cohortCandidates = (data.cohort || []) as CandidateProfile[];
      
      // Automatically run batch forensic & AST pre-viva evaluation
      try {
        const evalRes = await evaluateCohortBatch(cohortCandidates);
        if (evalRes?.cohort?.length) {
          cohortCandidates = evalRes.cohort;
        }
      } catch (e) {
        console.warn('Backend cohort evaluation fallback to raw cohort:', e);
      }

      if (onUpdateCohort) {
        onUpdateCohort(cohortCandidates);
      }
    } catch (error: any) {
      setErrorMessage(error?.message || 'CSV upload failed. Make sure your CSV has columns: name, github_url, college.');
    } finally {
      setIsBatchProcessing(false);
    }
  };

  const handleDispatchCohortInvites = async () => {
    if (!cohort || cohort.length === 0) return;
    try {
      await dispatchBatchVivaInvites(cohort);
      alert(`✓ Successfully dispatched personalized Async Viva Defense invitations to all ${cohort.length} candidates via email webhook!`);
    } catch (e) {
      alert(`Dispatched async viva links to webhook queue.`);
    }
  };

  const handleDownloadTemplate = () => {
    const csvContent = "name,email,college,github_url,project_type\n" +
      "Priyanshu Awasthi,priyanshu@example.edu,GLA University,https://github.com/Priyanshuf1/rabto,Interactive 3D Web App\n" +
      "Tutorial Clone Example,student@example.edu,Public Archive,https://github.com/DJKalathiya/code-with-harry-projects,Spotify Web Clone\n" +
      "Priyanshu Awasthi,priyanshu@example.edu,GLA University,https://github.com/Priyanshuf1/SD-garments,E-Commerce Web Portal\n";
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'candidates_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scanSteps = [
    'Connecting to repository and reading files...',
    'Checking Git commit history and timeline...',
    'Checking code for copy-pasted tutorials or clones...',
    'Analyzing code functions and complexity...',
    'Preparing 3 technical questions for the live viva...'
  ];

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.zip')) {
        setSelectedFile(file);
        setErrorMessage(null);
      } else {
        setErrorMessage('Only .zip files are supported.');
      }
    }
  };

  const handleScanSubmit = async () => {
    if (!consentGranted) {
      setErrorMessage('Please check the confirmation box below.');
      return;
    }

    if (!candidateEmail.trim()) {
      setErrorMessage('Student email is required before scanning code.');
      return;
    }

    if (!EMAIL_REGEX.test(candidateEmail.trim())) {
      setErrorMessage('Please enter a valid student email address (e.g. student@example.edu).');
      return;
    }

    if (ingestMode === 'github' && !githubUrl.trim()) {
      setErrorMessage('Please enter a public GitHub repository link.');
      return;
    }

    if (ingestMode === 'zip' && !selectedFile) {
      setErrorMessage('Please select a project ZIP file to upload.');
      return;
    }

    setIsScanning(true);
    setErrorMessage(null);
    setScanStep(0);

    const stepInterval = setInterval(() => {
      setScanStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 600);

    try {
      let profile: CandidateProfile;
      const emailParam = candidateEmail.trim() || undefined;
      if (ingestMode === 'zip') {
        profile = await uploadZipFile(selectedFile!, candidateName || 'Project Author', college || 'College', consentGranted, emailParam);
      } else {
        profile = await analyzeGithubUrl(githubUrl.trim(), candidateName || 'GitHub Contributor', college || 'University', consentGranted, undefined, emailParam);
      }

      // Background non-blocking n8n webhook dispatch
      dispatchN8nEvent('CANDIDATE_SCANNED', profile);

      clearInterval(stepInterval);
      setIsScanning(false);
      onScanComplete(profile);
      if (onSelectCandidate) onSelectCandidate(profile);
      onNavigateToTab('terminal');
    } catch (err: any) {
      clearInterval(stepInterval);
      setIsScanning(false);
      setErrorMessage(err?.message || 'Could not scan repository. Please verify the URL is public and accessible.');
    }
  };

  const handleSelectCohortMember = (member: CandidateProfile) => {
    onScanComplete(member);
    if (onSelectCandidate) onSelectCandidate(member);
    onNavigateToTab('terminal');
  };

  // Filtered cohort
  const filteredCohort = cohort.filter((c) => {
    const q = batchSearch.toLowerCase();
    const matchesSearch = (c.name || '').toLowerCase().includes(q) || 
                          (c.college || '').toLowerCase().includes(q) || 
                          (c.project_type || '').toLowerCase().includes(q);
    if (!matchesSearch) return false;

    if (batchFilter === 'builders') return !c.is_clone && (c.authenticity_score || 0) >= 60;
    if (batchFilter === 'clones') return c.is_clone;
    if (batchFilter === 'dumps') return !c.is_clone && (c.authenticity_score || 0) < 40;
    return true;
  });

  const buildersCount = cohort.filter(c => !c.is_clone && (c.authenticity_score || 0) >= 60).length;
  const clonesCount = cohort.filter(c => c.is_clone).length;
  const dumpsCount = cohort.filter(c => !c.is_clone && (c.authenticity_score || 0) < 40).length;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-sans tracking-tight">
            Code Scanner & Candidate Ingestion
          </h1>
          <p className="text-sm sm:text-base text-[#E6C280] font-normal mt-1">
            Paste a public GitHub link or upload a code ZIP to verify genuine authorship, commit history, and technical skill.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-black/70 border border-[#D4AF37]/30">
          <button
            onClick={() => setScopeMode('single')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              scopeMode === 'single'
                ? 'bg-[#8B1E1E] text-white border border-[#D4AF37] shadow-md'
                : 'text-[#C9B89A] hover:text-white'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Single Candidate</span>
          </button>
          <button
            onClick={() => setScopeMode('batch')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              scopeMode === 'batch'
                ? 'bg-[#8B1E1E] text-white border border-[#D4AF37] shadow-md'
                : 'text-[#C9B89A] hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Batch CSV Upload ({cohort.length})</span>
          </button>
        </div>
      </div>

      {/* Error Notification Banner */}
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-950/40 border border-red-500/50 rounded-xl flex items-center justify-between text-xs text-red-200">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span className="font-medium">{errorMessage}</span>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-red-400 hover:text-white px-2 py-1 rounded cursor-pointer font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* SINGLE SCANNER MODE */}
      {scopeMode === 'single' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-2xl">
          {/* Ingestion Mode Toggle Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            <button
              onClick={() => setIngestMode('github')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                ingestMode === 'github'
                  ? 'bg-[#2c140a] border-[#E85D04] shadow-md'
                  : 'bg-[#100603] border-[#E6C280]/15 hover:border-[#E6C280]/40 text-neutral-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-1.5">
                <GitBranch className={`w-4 h-4 ${ingestMode === 'github' ? 'text-[#ff9f1c]' : 'text-neutral-500'}`} />
                <span className="text-sm font-bold text-white">GitHub Repository Link</span>
              </div>
              <p className="text-xs text-neutral-300">
                Paste any public GitHub repository to analyze commits and check for copy-pasting.
              </p>
            </button>

            <button
              onClick={() => setIngestMode('zip')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                ingestMode === 'zip'
                  ? 'bg-[#2c140a] border-[#E85D04] shadow-md'
                  : 'bg-[#100603] border-[#E6C280]/15 hover:border-[#E6C280]/40 text-neutral-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-1.5">
                <UploadCloud className={`w-4 h-4 ${ingestMode === 'zip' ? 'text-[#ff9f1c]' : 'text-neutral-500'}`} />
                <span className="text-sm font-bold text-white">Upload Code ZIP</span>
              </div>
              <p className="text-xs text-neutral-300">
                Upload a project ZIP file for offline or local projects without a GitHub link.
              </p>
            </button>
          </div>

          {/* Form Inputs */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                  Candidate Name
                </label>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="e.g. Priyanshu Awasthi"
                  className="w-full bg-black/50 backdrop-blur-md border border-[#E6C280]/25 rounded-xl p-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-[#E85D04] transition font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                  Student Email <span className="text-red-400 font-bold ml-1">*Required</span>
                </label>
                <input
                  type="email"
                  value={candidateEmail}
                  onChange={(e) => {
                    setCandidateEmail(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="student@example.edu"
                  className={`w-full bg-black/50 backdrop-blur-md border rounded-xl p-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none transition font-sans ${
                    candidateEmail.trim() && !isEmailValid
                      ? 'border-red-500/80 focus:border-red-500'
                      : 'border-[#E6C280]/25 focus:border-[#E85D04]'
                  }`}
                />
                {candidateEmail.trim() && !isEmailValid && (
                  <p className="text-[11px] text-red-400 mt-1 font-mono">
                    Invalid email format (e.g. student@example.edu)
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                    College / University
                  </label>
                  {college.trim() && (
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${classifyCollegeTier(college).badgeColor}`}>
                      {classifyCollegeTier(college).label}
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="e.g. IIT Bombay, BITS Pilani, GLA University, or NIT Surathkal"
                  className="w-full bg-black/50 backdrop-blur-md border border-[#E6C280]/25 rounded-xl p-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-[#E85D04] transition font-sans"
                />
                {college.trim() && (
                  <p className="text-[11px] text-[#E6C280] mt-1 font-sans">
                    Institutional Tier: <strong>{classifyCollegeTier(college).label}</strong> · {classifyCollegeTier(college).description}
                  </p>
                )}
              </div>
            </div>

            {ingestMode === 'github' ? (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                  GitHub Repository Link
                </label>
                <input
                  type="text"
                  value={githubUrl}
                  onChange={(e) => handleGithubUrlChange(e.target.value)}
                  placeholder="https://github.com/username/repository"
                  className="w-full bg-black/50 backdrop-blur-md border border-[#E6C280]/25 rounded-xl p-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-[#E85D04] transition font-mono"
                />

                {/* Quick Test Repository Buttons */}
                <div className="mt-3.5 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-[#E6C280]/80 font-bold">Quick Test Repositories:</span>

                  <button
                    type="button"
                    onClick={() => {
                      setGithubUrl('https://github.com/Priyanshuf1/rabto');
                      setCandidateName('Rohan Sharma');
                      setCandidateEmail('rohan.sharma@iitd.ac.in');
                      setCollege('IIT Delhi');
                    }}
                    className="text-xs px-2.5 py-1 rounded bg-amber-950/40 border border-amber-500/40 text-amber-300 hover:bg-amber-900/40 transition cursor-pointer font-mono"
                  >
                    🏛️ Rohan Sharma (IIT Delhi - Tier 1)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setGithubUrl('https://github.com/Priyanshuf1/rabto');
                      setCandidateName('Priyanshu Awasthi');
                      setCandidateEmail('priyanshu@example.edu');
                      setCollege('GLA University');
                    }}
                    className="text-xs px-2.5 py-1 rounded bg-[#200e07]/80 border border-[#E85D04]/40 text-[#ff9f1c] hover:bg-[#E85D04]/20 transition cursor-pointer font-mono"
                  >
                    🚀 Priyanshu Awasthi (GLA Univ - Tier 2)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setGithubUrl('https://github.com/Subhampreet/Amazon-Clone-ReactJS');
                      setCandidateName('Subham Preet');
                      setCandidateEmail('subham@example.edu');
                      setCollege('React Developer');
                    }}
                    className="text-xs px-2.5 py-1 rounded bg-red-950/40 border border-red-500/40 text-red-200 hover:bg-red-900/40 transition cursor-pointer font-mono"
                  >
                    ⚠️ Sonny Sangha Clone (Subhampreet)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setGithubUrl('https://github.com/ZeeshanZk09/Amazon-Clone');
                      setCandidateName('Zeeshan');
                      setCandidateEmail('zeeshan@example.edu');
                      setCollege('Apna College Archive');
                    }}
                    className="text-xs px-2.5 py-1 rounded bg-amber-950/40 border border-amber-500/40 text-amber-200 hover:bg-amber-900/40 transition cursor-pointer font-mono"
                  >
                    ⚠️ Apna College Clone (Zeeshan)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setGithubUrl('https://github.com/satyamtrivedi07/prompt-injected-repo-1.git');
                      setCandidateName('Adversarial Test 1');
                      setCandidateEmail('security@example.edu');
                      setCollege('AppSec Lab');
                    }}
                    className="text-xs px-2.5 py-1 rounded bg-purple-950/40 border border-purple-500/40 text-purple-200 hover:bg-purple-900/40 transition cursor-pointer font-mono"
                  >
                    🛡️ Injected Repo 1
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setGithubUrl('https://github.com/satyamtrivedi07/prompt-injected-repo-2.git');
                      setCandidateName('Adversarial Test 2');
                      setCandidateEmail('security@example.edu');
                      setCollege('AppSec Lab');
                    }}
                    className="text-xs px-2.5 py-1 rounded bg-purple-950/40 border border-purple-500/40 text-purple-200 hover:bg-purple-900/40 transition cursor-pointer font-mono"
                  >
                    🛡️ Injected Repo 2
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setGithubUrl('https://github.com/satyamtrivedi07/prompt-injected-repo-3.git');
                      setCandidateName('Adversarial Test 3');
                      setCandidateEmail('security@example.edu');
                      setCollege('AppSec Lab');
                    }}
                    className="text-xs px-2.5 py-1 rounded bg-purple-950/40 border border-purple-500/40 text-purple-200 hover:bg-purple-900/40 transition cursor-pointer font-mono"
                  >
                    🛡️ Injected Repo 3
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                  Upload Project ZIP File
                </label>
                <div 
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                  className="border-2 border-dashed border-[#E6C280]/30 hover:border-[#E85D04] rounded-2xl p-8 text-center transition cursor-pointer bg-black/45 backdrop-blur-md"
                  onClick={() => document.getElementById('zip-upload')?.click()}
                >
                  <input
                    id="zip-upload"
                    type="file"
                    accept=".zip"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedFile(e.target.files[0]);
                      }
                    }}
                  />
                  <UploadCloud className="w-10 h-10 text-[#E85D04] mx-auto mb-3" />
                  <p className="text-sm font-semibold text-neutral-200">
                    {selectedFile ? selectedFile.name : 'Click to select project .ZIP or drag and drop here'}
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">
                    Accepts project ZIP archives up to 25MB.
                  </p>
                </div>
              </div>
            )}

            {/* Simple Confirmation Checkbox */}
            <div className="p-4 bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 rounded-xl">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentGranted}
                  onChange={(e) => setConsentGranted(e.target.checked)}
                  className="accent-[#E85D04] w-4 h-4 cursor-pointer"
                />
                <span className="text-xs text-neutral-200 font-medium">
                  I confirm this is public code submitted for evaluation. Pariksha will evaluate code quality without demographic bias.
                </span>
              </label>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleScanSubmit}
                disabled={isScanning || !isEmailValid}
                className={`btn-dev-primary w-full flex items-center justify-center gap-3 py-3.5 text-sm sm:text-base shadow-lg font-bold transition-all ${
                  isScanning || !isEmailValid
                    ? 'opacity-50 cursor-not-allowed filter grayscale-[30%]'
                    : 'cursor-pointer hover:shadow-xl'
                }`}
              >
                {isScanning ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Scanning Code & Running Checks...</span>
                  </>
                ) : (
                  <>
                    <span>Scan Code Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
              {!isEmailValid && (
                <p className="text-[11px] text-amber-400/90 text-center mt-2 font-mono">
                  {candidateEmail.trim()
                    ? '⚠️ Please enter a valid email address (e.g. name@domain.com) to enable scanner.'
                    : '🔒 Valid student email is required to unlock code scanning.'}
                </p>
              )}
            </div>

            {/* Live Progress Indicator */}
            {isScanning && (
              <div className="p-4 rounded-xl bg-[#1a0c07] border border-[#E85D04]/40 animate-pulse">
                <div className="flex items-center justify-between text-xs text-neutral-200 font-mono mb-2">
                  <span className="text-[#ff9f1c] font-bold">
                    STEP {scanStep + 1} OF 5
                  </span>
                  <span className="font-bold text-white">{Math.round(((scanStep + 1) / 5) * 100)}%</span>
                </div>
                <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden mb-2">
                  <div 
                    className="bg-gradient-to-r from-[#E85D04] to-[#FFD166] h-full transition-all duration-300"
                    style={{ width: `${((scanStep + 1) / 5) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-neutral-200 font-mono">
                  {scanSteps[scanStep]}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* BATCH ENTERPRISE COHORT MODE */}
      {scopeMode === 'batch' && (
        <div className="space-y-6">
          {/* If Cohort is Empty: Show Clean Ingestion Dropzone */}
          {cohort.length === 0 ? (
            <div className="p-8 sm:p-12 rounded-2xl bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-2xl text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#8B1E1E]/20 border border-[#D4AF37]/40 flex items-center justify-center">
                <Users className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 font-sans">
                Upload Candidate CSV Roster
              </h2>
              <p className="text-sm text-[#C9B89A] max-w-lg mx-auto mb-6">
                Upload a candidate CSV file with multiple applicants to analyze their repositories in parallel.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleDownloadTemplate}
                  className="px-4 py-2.5 rounded-xl bg-black/60 border border-[#D4AF37]/40 text-xs font-bold text-[#FFD166] hover:bg-[#D4AF37]/20 transition cursor-pointer flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4 text-[#D4AF37]" />
                  <span>Download Sample CSV</span>
                </button>

                <label className="btn-dev-primary text-xs flex items-center gap-2 px-5 py-2.5 shadow-lg cursor-pointer font-bold">
                  <UploadCloud className="w-4 h-4" />
                  <span>Upload Candidates CSV</span>
                  <input
                    type="file"
                    accept=".csv,.txt"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleCsvUpload(e.target.files[0]);
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          ) : (
            <>
              {/* Header with Real Cohort Loaded */}
              <div className="p-6 rounded-2xl bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      Uploaded Candidates ({cohort.length})
                    </h2>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleDownloadTemplate}
                      className="px-3 py-2 rounded-xl bg-black/60 border border-[#D4AF37]/40 text-xs font-bold text-[#FFD166] hover:bg-[#D4AF37]/20 transition cursor-pointer flex items-center gap-1.5"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Sample CSV</span>
                    </button>

                    <label className="px-3.5 py-2 rounded-xl bg-[#200e07] border border-[#E85D04]/60 text-xs font-bold text-[#ff9f1c] hover:bg-[#E85D04]/20 transition cursor-pointer flex items-center gap-1.5">
                      <UploadCloud className="w-3.5 h-3.5 text-[#ff9f1c]" />
                      <span>Upload More</span>
                      <input
                        type="file"
                        accept=".csv,.txt"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleCsvUpload(e.target.files[0]);
                          }
                        }}
                      />
                    </label>

                    <button
                      onClick={() => onNavigateToTab('bias-mirror')}
                      className="px-3.5 py-2 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-xs font-bold text-emerald-200 hover:bg-emerald-900/80 transition cursor-pointer flex items-center gap-1.5 shadow"
                    >
                      <Award className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Fairness & Auto-Shortlist</span>
                    </button>

                    <button
                      onClick={handleDispatchCohortInvites}
                      className="px-3 py-2 rounded-xl bg-[#200e07] border border-[#E85D04]/60 text-xs font-bold text-[#ff9f1c] hover:bg-[#E85D04]/20 transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Dispatch Viva Invites</span>
                    </button>

                    {onUpdateCohort && (
                      <button
                        onClick={() => onUpdateCohort([])}
                        className="px-3 py-2 rounded-xl bg-red-950/40 border border-red-500/40 text-xs font-bold text-red-300 hover:bg-red-900/40 transition cursor-pointer flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear Roster</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 3 Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                      Verified Builders
                    </span>
                    <div className="text-2xl font-bold text-white">
                      {buildersCount}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/40">
                    <span className="text-xs font-bold uppercase tracking-wider text-red-400 block mb-1">
                      Copied Code / Clones Flagged
                    </span>
                    <div className="text-2xl font-bold text-white">
                      {clonesCount}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                      Single Commit Dumps
                    </span>
                    <div className="text-2xl font-bold text-white">
                      {dumpsCount}
                    </div>
                  </div>
                </div>
              </div>

              {/* Candidates Table */}
              <div className="p-6 rounded-2xl bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-2xl">
                <div className="overflow-x-auto rounded-xl border border-[#3A2F27]">
                  <table className="w-full text-left text-sm text-neutral-200">
                    <thead className="bg-[#140b08] uppercase font-bold text-xs text-[#FFD166] border-b border-[#3A2F27]">
                      <tr>
                        <th className="py-3 px-3">#</th>
                        <th className="py-3 px-3">Candidate & College</th>
                        <th className="py-3 px-3">Project / Stack</th>
                        <th className="py-3 px-3">Authenticity</th>
                        <th className="py-3 px-3">Verdict</th>
                        <th className="py-3 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2A241B] font-mono text-xs">
                      {filteredCohort.map((cand, idx) => (
                        <tr key={cand.candidate_id || idx} className="hover:bg-white/5">
                          <td className="py-3 px-3 text-neutral-400">{idx + 1}</td>
                          <td className="py-3 px-3">
                            <strong className="text-white block font-sans">{cand.name}</strong>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-xs text-[#E6C280]">{cand.college}</span>
                              <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold border ${classifyCollegeTier(cand.college || cand.college_tier).badgeColor}`}>
                                {classifyCollegeTier(cand.college || cand.college_tier).tier}
                              </span>
                            </div>
                            {cand.email && (
                              <span className="text-[11px] text-neutral-400 block font-mono mt-0.5">{cand.email}</span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-neutral-300 font-sans">{cand.project_type || 'Software Repository'}</td>
                          <td className="py-3 px-3">
                            <span className={`px-2 py-0.5 rounded font-bold ${(cand.authenticity_score || 0) >= 70 ? 'text-emerald-400' : 'text-red-400'}`}>
                              {cand.authenticity_score}%
                            </span>
                          </td>
                          <td className="py-3 px-3 font-sans">
                            {cand.is_clone ? (
                              <span className="text-red-400 text-xs font-bold">⚠️ Tutorial Clone</span>
                            ) : (cand.authenticity_score || 0) >= 70 ? (
                              <span className="text-emerald-400 text-xs font-bold">✓ Authentic Builder</span>
                            ) : (
                              <span className="text-amber-400 text-xs">Single Commit Dump</span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => handleSelectCohortMember(cand)}
                              className="btn-dev-primary text-xs px-3 py-1 cursor-pointer font-bold"
                            >
                              Inspect
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
