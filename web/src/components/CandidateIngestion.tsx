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
  Trash2
} from 'lucide-react';
import { uploadZipFile, analyzeGithubUrl, ingestBatchCsv } from '../services/api';
import { CandidateProfile } from '../types';

interface CandidateIngestionProps {
  onScanComplete: (profile: CandidateProfile) => void;
  onNavigateToTab: (tab: string) => void;
  onSelectCandidate?: (profile: CandidateProfile) => void;
  cohort?: CandidateProfile[];
  onUpdateCohort?: (cohort: CandidateProfile[]) => void;
}

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
  const [college, setCollege] = useState('');
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
  const [batchTitle, setBatchTitle] = useState('Enterprise Batch Ingestion Queue');

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
      const pendingCandidates = (data.cohort || []) as CandidateProfile[];
      if (onUpdateCohort) {
        onUpdateCohort(pendingCandidates);
      }
      setBatchTitle(`Ingested Batch Queue (${pendingCandidates.length} Applicants)`);
    } catch (error: any) {
      setErrorMessage(error?.message || 'CSV ingestion failed. Please verify CSV column headers (name, github_url, college).');
    } finally {
      setIsBatchProcessing(false);
    }
  };

  const handleDownloadTemplate = () => {
    const csvContent = "name,github_url,college,project_type\n" +
      "Priyanshu Awasthi,https://github.com/Priyanshuf1/rabto,GLA University,Interactive WebGL 3D Platform\n" +
      "Tutorial Clone Benchmark,https://github.com/DJKalathiya/code-with-harry-projects,Public GitHub Archive,Spotify Web Clone\n" +
      "Priyanshu Awasthi,https://github.com/Priyanshuf1/SD-garments,GLA University,E-Commerce Web Portal\n";
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'proofcard_applicants_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scanSteps = [
    'Cloning and inspecting live source code tree...',
    'Extracting Abstract Syntax Trees (AST) & cyclomatic density...',
    'Running MOSS Winnowing against online tutorial databases...',
    'Analyzing commit timeline velocity and refactor ratios...',
    'Synthesizing personalized technical viva questions from complex functions...'
  ];

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.zip')) {
        setSelectedFile(file);
        setErrorMessage(null);
      } else {
        setErrorMessage('Only .zip files are supported for direct source upload.');
      }
    }
  };

  const handleScanSubmit = async () => {
    if (!consentGranted) {
      setErrorMessage('Candidate static analysis consent must be acknowledged.');
      return;
    }

    if (ingestMode === 'github' && !githubUrl.trim()) {
      setErrorMessage('Please enter a valid public GitHub repository URL.');
      return;
    }

    if (ingestMode === 'zip' && !selectedFile) {
      setErrorMessage('Please select a project ZIP archive to upload.');
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
      if (ingestMode === 'zip') {
        profile = await uploadZipFile(selectedFile!, candidateName || 'Local Project Author', college || 'Institution', consentGranted);
      } else {
        profile = await analyzeGithubUrl(githubUrl.trim(), candidateName || 'GitHub Contributor', college || 'Independent Engineer', consentGranted);
      }

      clearInterval(stepInterval);
      setIsScanning(false);
      onScanComplete(profile);
      if (onSelectCandidate) onSelectCandidate(profile);
      onNavigateToTab('terminal');
    } catch (err: any) {
      clearInterval(stepInterval);
      setIsScanning(false);
      setErrorMessage(err?.message || 'Repository ingestion failed. Please verify that the repository is public and accessible.');
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
  const hoursSaved = (cohort.length * 0.83).toFixed(1);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-deviathon tracking-wider">
            Applicant Ingestion & Forensics Queue
          </h1>
          <p className="text-sm sm:text-base text-[#E6C280] font-normal max-w-2xl leading-relaxed mt-1">
            Perform live static analysis on any public GitHub repository or batch ingest candidates via CSV roster.
          </p>
        </div>

        {/* Scope Mode Switcher */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-black/70 border border-[#D4AF37]/30 shadow-inner">
          <button
            onClick={() => setScopeMode('single')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-warrior font-bold transition cursor-pointer ${
              scopeMode === 'single'
                ? 'bg-[#8B1E1E] text-white border border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                : 'text-[#C9B89A] hover:text-white'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Single Scanner</span>
          </button>
          <button
            onClick={() => setScopeMode('batch')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-warrior font-bold transition cursor-pointer ${
              scopeMode === 'batch'
                ? 'bg-[#8B1E1E] text-white border border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                : 'text-[#C9B89A] hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Batch Ingestion ({cohort.length})</span>
          </button>
        </div>
      </div>

      {/* Error Notification Banner */}
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-950/40 border border-[#E85D04]/50 rounded-xl flex items-center justify-between text-xs text-red-200">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-[#E85D04] shrink-0" />
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
                  ? 'bg-gradient-to-r from-[#2c140a] to-[#180b06] border-[#E85D04] shadow-[0_0_16px_rgba(232,93,4,0.3)]'
                  : 'bg-[#100603] border-[#E6C280]/15 hover:border-[#E6C280]/40 text-neutral-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-1.5">
                <GitBranch className={`w-4 h-4 ${ingestMode === 'github' ? 'text-[#ff9f1c]' : 'text-neutral-500'}`} />
                <span className="text-sm font-warrior font-bold text-white">Public GitHub Repository</span>
              </div>
              <p className="feature-note">
                Clones and audits real Git commit histories, branch rhythms, AST complexity, and MOSS clone tokens.
              </p>
            </button>

            <button
              onClick={() => setIngestMode('zip')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                ingestMode === 'zip'
                  ? 'bg-gradient-to-r from-[#2c140a] to-[#180b06] border-[#E85D04] shadow-[0_0_16px_rgba(232,93,4,0.3)]'
                  : 'bg-[#100603] border-[#E6C280]/15 hover:border-[#E6C280]/40 text-neutral-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-1.5">
                <UploadCloud className={`w-4 h-4 ${ingestMode === 'zip' ? 'text-[#ff9f1c]' : 'text-neutral-500'}`} />
                <span className="text-sm font-warrior font-bold text-white">Direct Local ZIP Upload</span>
              </div>
              <p className="feature-note">
                For offline assessments, hackathon submissions, or projects without a public GitHub remote.
              </p>
            </button>
          </div>

          {/* Inputs */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-warrior font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                  Candidate Name
                </label>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full bg-black/50 backdrop-blur-md border border-[#E6C280]/25 rounded-xl p-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-[#E85D04] transition font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-warrior font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                  College / Institution
                </label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="e.g. State Institute of Technology"
                  className="w-full bg-black/50 backdrop-blur-md border border-[#E6C280]/25 rounded-xl p-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-[#E85D04] transition font-sans"
                />
              </div>
            </div>

            {ingestMode === 'github' ? (
              <div>
                <label className="block text-xs font-warrior font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                  GitHub Repository URL
                </label>
                <input
                  type="text"
                  value={githubUrl}
                  onChange={(e) => handleGithubUrlChange(e.target.value)}
                  placeholder="https://github.com/owner/repository"
                  className="w-full bg-black/50 backdrop-blur-md border border-[#E6C280]/25 rounded-xl p-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-[#E85D04] transition font-mono"
                />

                {/* Real Live Benchmark Repositories for 1-Click Verification */}
                <div className="mt-3.5 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] text-[#E6C280]/80 font-warrior">Quick Test Repositories:</span>

                  <button
                    type="button"
                    onClick={() => {
                      setGithubUrl('https://github.com/Priyanshuf1/rabto');
                      setCandidateName('Priyanshu Awasthi');
                      setCollege('GLA University');
                    }}
                    className="text-xs px-2.5 py-1 rounded bg-[#200e07]/80 border border-[#E85D04]/40 text-[#ff9f1c] hover:bg-[#E85D04]/20 transition cursor-pointer font-mono"
                  >
                    🚀 Priyanshuf1/rabto (Authentic Builder)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setGithubUrl('https://github.com/DJKalathiya/code-with-harry-projects');
                      setCandidateName('Tutorial Clone Benchmark');
                      setCollege('Public Archive');
                    }}
                    className="text-xs px-2.5 py-1 rounded bg-red-950/40 border border-red-500/40 text-red-200 hover:bg-red-900/40 transition cursor-pointer font-mono"
                  >
                    ⚠️ CodeWithHarry Projects (Tutorial Clone Test)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setGithubUrl('https://github.com/Priyanshuf1/SD-garments');
                      setCandidateName('Priyanshu Awasthi');
                      setCollege('GLA University');
                    }}
                    className="text-xs px-2.5 py-1 rounded bg-black/60 border border-[#E6C280]/30 text-[#E6C280] hover:border-[#E85D04] transition cursor-pointer font-mono"
                  >
                    📦 Priyanshuf1/SD-garments
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-warrior font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                  Offline Project ZIP Archive
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
                    Extracts source files, package manifests, and functions up to 25MB.
                  </p>
                </div>
              </div>
            )}

            {/* Consent Acknowledgement */}
            <div className="p-4 bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 rounded-xl">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentGranted}
                  onChange={(e) => setConsentGranted(e.target.checked)}
                  className="mt-0.5 accent-[#E85D04] w-4 h-4 cursor-pointer"
                />
                <div className="text-xs text-neutral-300">
                  <span className="font-semibold text-white block">
                    Candidate Static Analysis Authorization & Privacy Protocol
                  </span>
                  I authorize ProofCard to perform read-only static analysis on this repository. Demographics are decoupled prior to recruiter ranking.
                </div>
              </label>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleScanSubmit}
                disabled={isScanning}
                className="btn-dev-primary w-full flex items-center justify-center gap-3 py-3.5 text-sm sm:text-base cursor-pointer shadow-lg"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Executing Live Code Inspection...</span>
                  </>
                ) : (
                  <>
                    <span>Start Forensic Code Analysis</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {/* Live Progress Telemetry */}
            {isScanning && (
              <div className="p-4 rounded-xl bg-[#1a0c07] border border-[#E85D04]/40 animate-pulse">
                <div className="flex items-center justify-between text-sm text-neutral-200 font-mono mb-2">
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
                <p className="text-sm text-neutral-200 font-mono">
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
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 font-warrior">
                No Applicants in Batch Ingestion Queue
              </h2>
              <p className="text-sm text-[#C9B89A] max-w-lg mx-auto mb-6">
                Upload a candidate CSV roster or ATS applicant export to run automated Git-DNA, commit velocity, and MOSS clone detection in parallel.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleDownloadTemplate}
                  className="px-4 py-2.5 rounded-xl bg-black/60 border border-[#D4AF37]/40 text-xs font-warrior font-bold text-[#FFD166] hover:bg-[#D4AF37]/20 transition cursor-pointer flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4 text-[#D4AF37]" />
                  <span>Download CSV Template</span>
                </button>

                <label className="btn-dev-primary text-xs flex items-center gap-2 px-5 py-2.5 shadow-lg cursor-pointer font-bold">
                  <UploadCloud className="w-4 h-4" />
                  <span>Upload Candidate CSV Roster</span>
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
              {/* Action Header Card with Real Cohort Loaded */}
              <div className="p-6 rounded-2xl bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                  <div>
                    <span className="text-xs font-warrior font-bold uppercase tracking-wider text-[#D4AF37]">
                      Active Ingestion Pipeline:
                    </span>
                    <h2 className="text-lg font-warrior font-bold text-white mt-0.5">
                      {batchTitle}
                    </h2>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleDownloadTemplate}
                      className="px-3 py-2 rounded-xl bg-black/60 border border-[#D4AF37]/40 text-xs font-warrior font-bold text-[#FFD166] hover:bg-[#D4AF37]/20 transition cursor-pointer flex items-center gap-1.5"
                      title="Download CSV Template"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Template</span>
                    </button>

                    <label className="px-3.5 py-2 rounded-xl bg-[#200e07] border border-[#E85D04]/60 text-xs font-warrior font-bold text-[#ff9f1c] hover:bg-[#E85D04]/20 transition cursor-pointer flex items-center gap-1.5">
                      <UploadCloud className="w-3.5 h-3.5 text-[#ff9f1c]" />
                      <span>Upload More CSV</span>
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

                    {onUpdateCohort && (
                      <button
                        onClick={() => onUpdateCohort([])}
                        className="px-3 py-2 rounded-xl bg-red-950/40 border border-red-500/40 text-xs font-warrior font-bold text-red-300 hover:bg-red-900/40 transition cursor-pointer flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear Queue</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Batch Processing Progress Bar */}
                {isBatchProcessing && (
                  <div className="mb-5 p-4 rounded-xl bg-[#1a0c07] border border-[#E85D04]/40 animate-pulse">
                    <div className="flex items-center justify-between text-xs text-neutral-300 font-mono mb-2">
                      <span className="flex items-center gap-2 text-[#ff9f1c] font-bold">
                        <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
                        PARALLEL GIT-DNA & AST WINNOWING INGESTION QUEUE...
                      </span>
                      <span>{batchProgress}%</span>
                    </div>
                    <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-[#E85D04] via-[#D4AF37] to-[#FFD166] h-full transition-all duration-200"
                        style={{ width: `${batchProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* 4 Summary Metric Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-400">
                        Verified Builders
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-deviathon font-bold text-white">
                      {buildersCount}
                    </div>
                    <span className="text-xs sm:text-sm text-emerald-300 font-mono font-medium block mt-1">
                      {cohort.length > 0 ? Math.round((buildersCount / cohort.length) * 100) : 0}% Organic Git-DNA
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/40">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-red-400">
                        Tutorial Clones Flagged
                      </span>
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-deviathon font-bold text-white">
                      {clonesCount}
                    </div>
                    <span className="text-xs sm:text-sm text-red-300 font-mono font-medium block mt-1">
                      {cohort.length > 0 ? Math.round((clonesCount / cohort.length) * 100) : 0}% MOSS Plagiarism Hit
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400">
                        Single-Commit Dumps
                      </span>
                      <Clock className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-deviathon font-bold text-white">
                      {dumpsCount}
                    </div>
                    <span className="text-xs sm:text-sm text-amber-300 font-mono font-medium block mt-1">
                      {cohort.length > 0 ? Math.round((dumpsCount / cohort.length) * 100) : 0}% 0 Refactor Deletions
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#8B1E1E]/20 border border-[#D4AF37]/40 shadow-inner">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FFD166]">
                        Recruiter Time Saved
                      </span>
                      <Award className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-deviathon font-bold text-white">
                      {hoursSaved}h
                    </div>
                    <span className="text-xs sm:text-sm text-[#FFD166] font-mono font-medium block mt-1">
                      ~10m manual audit / candidate
                    </span>
                  </div>
                </div>
              </div>

              {/* Search, Filter & Cohort Roster Table */}
              <div className="p-6 rounded-2xl bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                    <input
                      type="text"
                      value={batchSearch}
                      onChange={(e) => setBatchSearch(e.target.value)}
                      placeholder="Search by candidate name, college, or tech stack..."
                      className="w-full bg-black/60 border border-[#3A2F27] rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-mono"
                    />
                  </div>

                  {/* Filter Tabs */}
                  <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-warrior">
                    <button
                      onClick={() => setBatchFilter('all')}
                      className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                        batchFilter === 'all'
                          ? 'bg-[#8B1E1E] text-white border border-[#D4AF37]'
                          : 'bg-black/40 text-neutral-400 hover:text-white border border-transparent'
                      }`}
                    >
                      All ({cohort.length})
                    </button>
                    <button
                      onClick={() => setBatchFilter('builders')}
                      className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                        batchFilter === 'builders'
                          ? 'bg-emerald-900/60 text-emerald-200 border border-emerald-500'
                          : 'bg-black/40 text-neutral-400 hover:text-emerald-300 border border-transparent'
                      }`}
                    >
                      Builders ({buildersCount})
                    </button>
                    <button
                      onClick={() => setBatchFilter('clones')}
                      className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                        batchFilter === 'clones'
                          ? 'bg-red-900/60 text-red-200 border border-red-500'
                          : 'bg-black/40 text-neutral-400 hover:text-red-300 border border-transparent'
                      }`}
                    >
                      Clones ({clonesCount})
                    </button>
                    <button
                      onClick={() => setBatchFilter('dumps')}
                      className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                        batchFilter === 'dumps'
                          ? 'bg-amber-900/60 text-amber-200 border border-amber-500'
                          : 'bg-black/40 text-neutral-400 hover:text-amber-300 border border-transparent'
                      }`}
                    >
                      Dumps ({dumpsCount})
                    </button>
                  </div>
                </div>

                {/* Ingested Table */}
                <div className="overflow-x-auto rounded-xl border border-[#3A2F27]">
                  <table className="w-full text-left text-sm text-neutral-200">
                    <thead className="bg-[#140b08] uppercase font-bold text-xs sm:text-sm text-[#FFD166] border-b border-[#3A2F27]">
                      <tr>
                        <th className="py-3.5 px-3">#</th>
                        <th className="py-3.5 px-3">Candidate & College</th>
                        <th className="py-3.5 px-3">Stack / Project</th>
                        <th className="py-3.5 px-3">Authenticity</th>
                        <th className="py-3.5 px-3">Viva Score</th>
                        <th className="py-3.5 px-3">Forensic Verdict</th>
                        <th className="py-3.5 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2A241B] font-mono text-xs sm:text-sm">
                      {filteredCohort.slice(0, 25).map((cand, idx) => {
                        const isHigh = (cand.authenticity_score || 0) >= 80;
                        const isClone = cand.is_clone;
                        return (
                          <tr 
                            key={cand.candidate_id || idx}
                            className="hover:bg-white/5 transition"
                          >
                            <td className="py-3.5 px-3 text-neutral-400">
                              {idx + 1}
                            </td>
                            <td className="py-3.5 px-3">
                              <strong className="text-white block font-sans text-sm sm:text-base font-bold">
                                {cand.name}
                              </strong>
                              <span className="text-xs text-[#E6C280] flex items-center gap-1.5 mt-0.5">
                                {cand.college}
                                <span className={`px-2 py-0.5 rounded text-xs uppercase font-bold ${
                                  cand.college_tier === 'Tier-1' 
                                    ? 'bg-purple-950 text-purple-300 border border-purple-800'
                                    : cand.college_tier === 'Tier-2'
                                    ? 'bg-blue-950 text-blue-300 border border-blue-800'
                                    : 'bg-neutral-800 text-neutral-300'
                                }`}>
                                  {cand.college_tier || 'Tier-3'}
                                </span>
                              </span>
                            </td>
                            <td className="py-3.5 px-3 text-neutral-200 font-sans font-medium">
                              {cand.project_type || 'Software Repository'}
                            </td>
                            <td className="py-3.5 px-3">
                              <span className={`px-2.5 py-1 rounded-full font-bold text-xs sm:text-sm ${
                                isHigh
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                                  : isClone
                                  ? 'bg-red-950 text-red-300 border border-red-600'
                                  : 'bg-amber-950 text-amber-300 border border-amber-600'
                              }`}>
                                {cand.authenticity_score}%
                              </span>
                            </td>
                            <td className="py-3.5 px-3 font-bold text-white text-base">
                              {cand.viva_score !== undefined ? `${cand.viva_score} / 10` : 'Pending'}
                            </td>
                            <td className="py-3.5 px-3 font-sans">
                              {isClone ? (
                                <span className="text-red-400 text-xs sm:text-sm flex items-center gap-1 font-semibold">
                                  <AlertTriangle className="w-4 h-4 shrink-0" />
                                  <span>{cand.matched_tutorial ? `${Math.round(cand.matched_tutorial.similarity_score * 100)}% Copied: ${cand.matched_tutorial.name?.substring(0, 26)}...` : 'Plagiarism Detected'}</span>
                                </span>
                              ) : isHigh ? (
                                <span className="text-emerald-400 text-xs sm:text-sm flex items-center gap-1 font-semibold">
                                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                                  Verified Organic Architecture
                                </span>
                              ) : (
                                <span className="text-amber-400 text-xs sm:text-sm">
                                  Single Commit / Low Churn
                                </span>
                              )}
                            </td>

                            <td className="py-3.5 px-3 text-right">
                              <button
                                onClick={() => handleSelectCohortMember(cand)}
                                className="btn-dev-primary text-xs px-3.5 py-1.5 cursor-pointer font-bold"
                              >
                                Inspect
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {filteredCohort.length > 25 && (
                  <div className="mt-3 text-center text-xs text-[#C9B89A] font-sans">
                    Showing top 25 of {filteredCohort.length} applicants in active cohort view.
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
