import React, { useState } from 'react';
import { loginAdmin } from '../utils/blogStore';

interface AdminLoginModalProps {
  onSuccess: () => void;
  onCancel?: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onSuccess, onCancel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    setTimeout(() => {
      const ok = loginAdmin(email, password, remember);
      setLoading(false);
      if (ok) {
        onSuccess();
      } else {
        setErrorMsg('Invalid login credentials. Please use valid admin email & password.');
      }
    }, 400);
  };

  const handleFillDemo = () => {
    setEmail('shahabkhanyousafzai009');
    setPassword('shahab@1009');
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-dark-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden transform transition-all">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 p-6 text-white text-center relative">
          {onCancel && (
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full w-8 h-8 flex items-center justify-center transition"
              title="Close Portal"
            >
              ✕
            </button>
          )}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md mb-3 text-3xl border border-white/30 shadow-inner">
            🔐
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Rank Math Admin Studio</h2>
          <p className="text-sm text-white/90 mt-1 font-medium">
            Enter your credentials to access the Article Publisher & Heading Analyzer
          </p>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {errorMsg && (
            <div className="p-3 text-xs font-semibold text-red-700 bg-red-100 dark:bg-red-950/60 dark:text-red-300 rounded-xl border border-red-300 dark:border-red-800/60 flex items-center gap-2 animate-shake">
              <span className="text-base">⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
              Admin Username / Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                👤
              </span>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin username or email"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-dark-700/60 border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm font-medium transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                🔑
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-dark-700/60 border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm font-medium transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 dark:border-gray-600 dark:bg-dark-700"
              />
              <span className="text-gray-600 dark:text-gray-300 font-medium">Keep me logged in</span>
            </label>
            
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-red-600 dark:text-red-400 font-bold hover:underline opacity-80 hover:opacity-100 transition"
            >
              ⚡ Fill Saved Credentials
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition transform active:scale-95 flex items-center justify-center gap-2 text-base"
          >
            {loading ? (
              <span className="inline-block animate-spin font-bold">⏳ Authenticating...</span>
            ) : (
              <>
                <span>Unlock Rank Math Admin Studio</span>
                <span>➔</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
