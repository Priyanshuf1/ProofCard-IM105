import React, { useState, useEffect } from 'react';
import { 
  X, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Copy, 
  ExternalLink, 
  Send, 
  FileSpreadsheet, 
  Mail, 
  ShieldCheck, 
  Workflow, 
  RefreshCw,
  Info
} from 'lucide-react';
import { fetchN8nConfig, saveN8nConfig, testN8nConnection, N8nConfig } from '../services/api';

interface N8nAutomationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const N8nAutomationModal: React.FC<N8nAutomationModalProps> = ({ isOpen, onClose }) => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [syncSheets, setSyncSheets] = useState(true);
  const [feedbackEmails, setFeedbackEmails] = useState(true);

  const [activeGuideTab, setActiveGuideTab] = useState<'overview' | 'webhook' | 'sheets' | 'email' | 'sample'>('overview');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ status: string; delivered: boolean; error?: string; message?: string } | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [copiedSample, setCopiedSample] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchN8nConfig().then((cfg) => {
        setWebhookUrl(cfg.webhook_url || '');
        setSyncSheets(cfg.sync_sheets !== false);
        setFeedbackEmails(cfg.feedback_emails !== false);
      });
      setTestResult(null);
      setSaveStatus(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      await saveN8nConfig({
        webhook_url: webhookUrl.trim(),
        sync_sheets: syncSheets,
        feedback_emails: feedbackEmails,
      });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 2500);
    } catch {
      setSaveStatus('error');
    }
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await testN8nConnection(webhookUrl.trim() || undefined);
      setTestResult(res);
    } catch (e: any) {
      setTestResult({
        status: 'error',
        delivered: false,
        error: e?.message || 'Failed to communicate with test endpoint'
      });
    } finally {
      setIsTesting(false);
    }
  };

  const samplePayload = {
    event: "CANDIDATE_SCANNED",
    timestamp: new Date().toISOString(),
    source: "ProofCard IM-105 Verification Engine",
    data: {
      candidate_id: "cand_builder_02",
      name: "Priyanshu Awasthi",
      email: "priyanshu@example.edu",
      college: "GLA University",
      college_tier: "Tier-3",
      repo_url: "https://github.com/Priyanshuf1/rabto",
      authenticity_score: 96,
      viva_score: 9,
      is_clone: false,
      status: "VERIFIED_EXEMPLARY",
      headline: "Demonstrated authentic software development with steady commit history and structured code design.",
      qr_verification_url: "https://proofcard.dev/verify/cand_builder_02",
      tamper_proof_hash: "SHA256:d8b7a2c4e1f9801..."
    }
  };

  const copySampleJson = () => {
    navigator.clipboard.writeText(JSON.stringify(samplePayload, null, 2));
    setCopiedSample(true);
    setTimeout(() => setCopiedSample(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0f0907] border border-[#D4AF37]/50 shadow-[0_0_50px_rgba(212,175,55,0.2)] text-neutral-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-[#160c08] border-b border-[#D4AF37]/30 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B1E1E]/60 border border-[#D4AF37]/60 flex items-center justify-center shadow-md">
              <Zap className="w-5 h-5 text-[#FFD166]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white font-sans tracking-tight">
                  ⚡ n8n Automations & Webhooks Bridge
                </h2>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#E85D04]/30 border border-[#E85D04]/60 text-[#FFD166] font-bold">
                  Enterprise Ready
                </span>
              </div>
              <p className="text-xs text-[#E6C280] font-sans">
                Real-time event streaming: Google Sheets ATS sync, automated candidate feedback emails, & CI webhooks.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 flex-1">
          {/* Webhook Configuration Section */}
          <div className="p-5 rounded-xl bg-black/45 border border-[#D4AF37]/25 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                <Workflow className="w-4 h-4 text-[#FFD166]" />
                <span>n8n Webhook Endpoint URL</span>
              </label>
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setWebhookUrl('http://localhost:5678/webhook/proofcard')}
                  className="text-[11px] text-[#ff9f1c] hover:underline cursor-pointer font-mono"
                >
                  Use Local n8n default
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://n8n.your-domain.com/webhook/proofcard"
                className="flex-1 bg-black/60 border border-[#E6C280]/30 rounded-xl px-4 py-2.5 text-sm font-mono text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-[#E85D04] transition"
              />
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTesting}
                className="px-4 py-2.5 rounded-xl bg-[#200e07] border border-[#E85D04] text-[#FFD166] hover:bg-[#E85D04]/20 transition text-xs font-bold cursor-pointer flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
              >
                {isTesting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Testing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Test Ping</span>
                  </>
                )}
              </button>
            </div>

            {/* Test Connection Banner */}
            {testResult && (
              <div className={`p-3.5 rounded-xl text-xs flex items-center justify-between border ${
                testResult.delivered
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                  : 'bg-red-950/40 border-red-500/50 text-red-200'
              }`}>
                <div className="flex items-center gap-2.5">
                  {testResult.delivered ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  )}
                  <span>
                    {testResult.delivered
                      ? '✓ Success! n8n webhook responded with HTTP 200. Webhook connection is active.'
                      : `✕ Ping unreached: ${testResult.error || testResult.message || 'Make sure your n8n workflow is Active and listening.'}`}
                  </span>
                </div>
                <button 
                  onClick={() => setTestResult(null)}
                  className="text-neutral-400 hover:text-white ml-2 text-xs font-bold"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Automation Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-black/40 border border-[#3A2F27] hover:border-[#D4AF37]/40 transition cursor-pointer">
                <input
                  type="checkbox"
                  checked={syncSheets}
                  onChange={(e) => setSyncSheets(e.target.checked)}
                  className="mt-0.5 accent-[#E85D04] w-4 h-4 cursor-pointer"
                />
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Google Sheets Live ATS Sync</span>
                  </div>
                  <p className="text-[11px] text-[#C9B89A] mt-0.5">
                    Stream verified candidate evaluations and scores directly into your recruitment Google Sheet.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-black/40 border border-[#3A2F27] hover:border-[#D4AF37]/40 transition cursor-pointer">
                <input
                  type="checkbox"
                  checked={feedbackEmails}
                  onChange={(e) => setFeedbackEmails(e.target.checked)}
                  className="mt-0.5 accent-[#E85D04] w-4 h-4 cursor-pointer"
                />
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>Candidate Feedback Email Dispatch</span>
                  </div>
                  <p className="text-[11px] text-[#C9B89A] mt-0.5">
                    Automatically trigger constructive coaching emails for candidates flagged with clone code or low authenticity.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Interactive Walkthrough / Guide Tabs */}
          <div className="p-5 rounded-xl bg-black/35 border border-[#D4AF37]/25 space-y-4">
            <div className="flex items-center justify-between border-b border-[#3A2F27] pb-3">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[#FFD166]" />
                <h3 className="text-sm font-bold text-white">
                  Step-by-Step n8n Setup Instructions (What to configure in n8n)
                </h3>
              </div>
              <div className="flex items-center gap-1">
                {(['overview', 'webhook', 'sheets', 'email', 'sample'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveGuideTab(tab)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                      activeGuideTab === tab
                        ? 'bg-[#8B1E1E] text-white border border-[#D4AF37]/60'
                        : 'text-[#C9B89A] hover:text-white'
                    }`}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab: Overview */}
            {activeGuideTab === 'overview' && (
              <div className="space-y-3 text-xs text-neutral-200 font-sans leading-relaxed">
                <p>
                  ProofCard communicates with your n8n workflows through standard HTTP POST webhooks.
                  Here is the recommended 3-node workflow structure:
                </p>
                <div className="p-4 rounded-xl bg-[#140b08] border border-[#3A2F27] font-mono text-xs text-[#FFD166] flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded bg-[#8B1E1E] text-white font-bold">1. Webhook</span>
                    <span>➔</span>
                    <span className="px-2 py-1 rounded bg-amber-900/60 text-amber-200">2. Switch (Event Router)</span>
                    <span>➔</span>
                    <span className="px-2 py-1 rounded bg-emerald-900/60 text-emerald-200">3a. Google Sheets</span>
                    <span>&</span>
                    <span className="px-2 py-1 rounded bg-blue-900/60 text-blue-200">3b. Gmail</span>
                  </div>
                </div>
                <ul className="space-y-2 list-disc list-inside text-neutral-300">
                  <li><strong>Node 1 (Webhook):</strong> Receives ProofCard events (CANDIDATE_SCANNED, CANDIDATE_SHORTLISTED, FEEDBACK_DISPATCH).</li>
                  <li><strong>Node 2 (Google Sheets):</strong> Automatically appends each scanned candidate and their authenticity score as a new row.</li>
                  <li><strong>Node 3 (Gmail):</strong> Sends candidates their verified ProofCard credential or constructive coaching tips.</li>
                </ul>
              </div>
            )}

            {/* Tab: Webhook Node */}
            {activeGuideTab === 'webhook' && (
              <div className="space-y-3 text-xs font-sans text-neutral-200">
                <h4 className="font-bold text-white text-sm">Step 1: Create Webhook Node in n8n</h4>
                <div className="space-y-2 text-neutral-300">
                  <p>1. Open your n8n workspace, click <strong>+ Add node</strong>, and search for <strong>Webhook</strong>.</p>
                  <p>2. Set <strong>HTTP Method</strong> to <code className="text-[#FFD166] font-mono">POST</code>.</p>
                  <p>3. Set <strong>Path</strong> to <code className="text-[#FFD166] font-mono">proofcard</code> (or any slug you choose).</p>
                  <p>4. Set <strong>Response Mode</strong> to <strong>On Received</strong> with response code <code className="text-[#FFD166] font-mono">200</code>.</p>
                  <p>5. Copy the <strong>Production URL</strong> (or Test URL) and paste it into the "n8n Webhook Endpoint URL" field above.</p>
                </div>
              </div>
            )}

            {/* Tab: Google Sheets Node */}
            {activeGuideTab === 'sheets' && (
              <div className="space-y-3 text-xs font-sans text-neutral-200">
                <h4 className="font-bold text-white text-sm">Step 2: Connect Google Sheets Node</h4>
                <div className="space-y-2 text-neutral-300">
                  <p>1. Connect a <strong>Google Sheets</strong> node to the Webhook node.</p>
                  <p>2. Set <strong>Resource</strong> to <strong>Sheet</strong> and <strong>Operation</strong> to <strong>Append Row</strong>.</p>
                  <p>3. Map the fields from the incoming webhook JSON:</p>
                  <div className="p-3 rounded-xl bg-black/60 font-mono text-[11px] text-neutral-200 space-y-1">
                    <div><strong>Candidate ID:</strong> <code className="text-[#FFD166]">{`{{ $json.data.candidate_id }}`}</code></div>
                    <div><strong>Candidate Name:</strong> <code className="text-[#FFD166]">{`{{ $json.data.name }}`}</code></div>
                    <div><strong>Student Email:</strong> <code className="text-[#FFD166]">{`{{ $json.data.email || 'N/A' }}`}</code></div>
                    <div><strong>College:</strong> <code className="text-[#FFD166]">{`{{ $json.data.college }}`}</code></div>
                    <div><strong>Authenticity Score:</strong> <code className="text-[#FFD166]">{`{{ $json.data.authenticity_score }}%`}</code></div>
                    <div><strong>Viva Score:</strong> <code className="text-[#FFD166]">{`{{ $json.data.viva_score }}/10`}</code></div>
                    <div><strong>Is Clone:</strong> <code className="text-[#FFD166]">{`{{ $json.data.is_clone ? 'YES' : 'NO' }}`}</code></div>
                    <div><strong>Status:</strong> <code className="text-[#FFD166]">{`{{ $json.data.status }}`}</code></div>
                    <div><strong>QR Verification Link:</strong> <code className="text-[#FFD166]">{`{{ $json.data.qr_verification_url }}`}</code></div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Gmail Node */}
            {activeGuideTab === 'email' && (
              <div className="space-y-3 text-xs font-sans text-neutral-200">
                <h4 className="font-bold text-white text-sm">Step 3: Connect Gmail Node for Feedback & Credentials</h4>
                <div className="space-y-2 text-neutral-300">
                  <p>1. Add a <strong>Gmail</strong> node (or SMTP node) to your workflow.</p>
                  <p>2. Set <strong>Resource</strong> to <strong>Message</strong> and <strong>Operation</strong> to <strong>Send</strong>.</p>
                  <div className="p-3 rounded-xl bg-black/60 font-mono text-[11px] text-neutral-200 space-y-1.5">
                    <div><strong>To:</strong> <code className="text-[#FFD166]">{`{{ $json.data.email }}`}</code></div>
                    <div><strong>Subject:</strong> <code className="text-[#FFD166]">{`{{ $json.data.subject || 'Your ProofCard Verification Results' }}`}</code></div>
                    <div><strong>Email Body:</strong> Use <code className="text-[#FFD166]">{`{{ $json.data.headline }}`}</code> and <code className="text-[#FFD166]">{`{{ $json.data.action_plan }}`}</code> to provide constructive feedback.</div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Sample Payload */}
            {activeGuideTab === 'sample' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Sample Payload Sent by ProofCard:</span>
                  <button
                    onClick={copySampleJson}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/60 border border-[#D4AF37]/40 text-xs font-mono text-[#FFD166] hover:bg-[#D4AF37]/20 transition cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedSample ? 'Copied!' : 'Copy JSON'}</span>
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-black/70 border border-[#3A2F27] text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-48">
                  {JSON.stringify(samplePayload, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 z-10 bg-[#160c08] border-t border-[#D4AF37]/30 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {saveStatus === 'saved' && (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Configuration Saved!</span>
              </span>
            )}
            {saveStatus === 'error' && (
              <span className="text-xs font-bold text-red-400">
                Failed to save to backend.
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#3A2F27] text-xs font-bold text-neutral-300 hover:text-white hover:border-[#D4AF37]/50 transition cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className="btn-dev-primary px-5 py-2 text-xs font-bold shadow-lg cursor-pointer flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
