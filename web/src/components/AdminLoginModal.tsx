import React, { useState } from 'react';
import { Lock, ShieldAlert, ArrowRight, Eye, EyeOff, Loader2, KeyRound, CheckCircle2 } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (token: string, adminUser: string) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please enter both username and admin security passkey.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('http://localhost:8000/api/v1/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password: password.trim() })
      });

      if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem('pariksha_admin_auth', data.token);
        sessionStorage.setItem('pariksha_admin_user', data.admin_user);
        onLoginSuccess(data.token, data.admin_user);
      } else {
        const errData = await res.json().catch(() => ({}));
        setAttempts(prev => prev + 1);
        setErrorMessage(errData.detail || 'Authentication failed. Invalid admin credentials.');
      }
    } catch {
      // Local fallback for offline demo resilience
      if (
        (username.trim().toLowerCase() === 'admin' || username.trim().toLowerCase() === 'admin@pariksha.io') &&
        password.trim() === 'Pariksha@Admin2026!'
      ) {
        const fallbackToken = 'adm_offline_token_' + Date.now();
        sessionStorage.setItem('pariksha_admin_auth', fallbackToken);
        sessionStorage.setItem('pariksha_admin_user', username.trim());
        onLoginSuccess(fallbackToken, username.trim());
      } else {
        setAttempts(prev => prev + 1);
        setErrorMessage('Authentication failed. Invalid username or security passkey.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none">
      <div 
        className="w-full max-w-md bg-white rounded-3xl border border-gray-200 shadow-2xl p-7 sm:p-8 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Amber Ambient Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-[#e20001] shadow-sm">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#111827] font-sans tracking-tight">
                Enterprise Admin Access
              </h2>
              <span className="text-[11px] font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                🔒 Restricted Recruiter Gateway
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-600 mb-5 leading-relaxed font-sans">
          This portal contains proprietary candidate forensics, bias audits, ATS connectors, and automated decision tools. Please authenticate with your administrator credentials.
        </p>

        {/* Error Notice */}
        {errorMessage && (
          <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold block">Access Denied</span>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 font-sans">
              Admin Username / Email
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-[#111827] font-mono focus:bg-white focus:outline-none focus:border-[#e20001] focus:ring-2 focus:ring-[#e20001]/20 transition"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 font-sans">
              Security Passkey
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••••"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pr-10 text-sm text-[#111827] font-mono focus:bg-white focus:outline-none focus:border-[#e20001] focus:ring-2 focus:ring-[#e20001]/20 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick Demo Credentials Reminder Box */}
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-[11px] text-gray-600 space-y-1">
            <span className="font-bold text-gray-700 block">Default Hackathon Credentials:</span>
            <div className="flex items-center justify-between font-mono text-[10px]">
              <span>Username: <strong className="text-[#111827]">admin</strong></span>
              <span>Passkey: <strong className="text-[#e20001]">Pariksha@Admin2026!</strong></span>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2 space-y-2.5">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary text-sm py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Cryptographic Passkey...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authenticate & Unlock Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 text-xs text-gray-500 hover:text-gray-800 font-bold transition cursor-pointer text-center"
            >
              ← Cancel & Return to Candidate Portal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
