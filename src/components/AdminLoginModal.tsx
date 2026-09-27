import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { adminProfile, isAdmin, signInWithCredentials, logoutAdmin } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCredentialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setErrorMsg('Please enter your admin username.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your admin password.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      await signInWithCredentials(username, password);
      setUsername('');
      setPassword('');
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Invalid Username or Password. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutAdmin();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-[#1C0F07] to-[#0D0603] border border-[#F5BD47]/40 shadow-2xl p-6 sm:p-8 text-stone-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#2A160A] text-stone-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors border border-[#F5BD47]/20"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 rounded-full border border-[#F5BD47]/50 bg-gradient-to-b from-[#2E180A] to-[#120703] flex items-center justify-center shadow-gold-glow">
            <span className="text-2xl">🔐</span>
          </div>
          <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#F5BD47] font-semibold block">
            Temple Management
          </span>
          <h2 className="font-serif text-2xl font-bold text-white mt-1">Admin Sign In</h2>
          <p className="text-xs text-stone-400 mt-1 max-w-xs mx-auto">
            Authorized committee members can sign in with their credentials to manage the temple gallery.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-5 p-3 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs text-center flex items-center justify-center gap-2">
            <span>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {isAdmin ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#160B05] border border-[#F5BD47]/30 text-center">
              <div className="w-10 h-10 rounded-full bg-[#F5BD47] text-[#0C0704] font-bold text-base flex items-center justify-center mx-auto mb-2">
                ✓
              </div>
              <p className="text-xs text-stone-400">Currently Logged In As:</p>
              <p className="text-sm font-semibold text-[#FFE29A] mt-0.5">{adminProfile?.name}</p>
              <p className="text-xs text-stone-400 font-mono mt-0.5">{adminProfile?.email}</p>
              <span className="inline-block mt-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                ● Administrator Mode Active
              </span>
            </div>

            <button
              onClick={handleLogout}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-sm transition-colors cursor-pointer border border-stone-700"
            >
              {loading ? 'Signing out...' : 'Sign Out of Admin'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleCredentialLogin} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                Username
              </label>
              <input
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#160B05] border border-[#F5BD47]/30 text-stone-100 placeholder-stone-500 text-xs focus:outline-none focus:border-[#F5BD47]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#160B05] border border-[#F5BD47]/30 text-stone-100 placeholder-stone-500 text-xs focus:outline-none focus:border-[#F5BD47] pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200 text-xs cursor-pointer select-none"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F5BD47] to-[#E5A93C] hover:from-[#FFE29A] hover:to-[#F5BD47] text-[#0C0704] font-bold text-xs tracking-wider uppercase shadow-gold-glow cursor-pointer transition-all transform hover:scale-[1.01] mt-3 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In as Admin'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
