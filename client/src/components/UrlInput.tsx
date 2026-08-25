import { useState, useEffect, useCallback, type FormEvent } from 'react';
import { isValidUrl, isSupportedUrl, getValidationMessage } from '../utils/validators';
import { detectPlatform } from '../utils/platforms';
import { PlatformBadge } from './PlatformBadge';
import { Language, TRANSLATIONS } from '../utils/i18n';

interface UrlInputProps {
  onSubmit: (url: string) => void;
  loading: boolean;
  onReset: () => void;
  currentLanguage?: Language;
}

export function UrlInput({ onSubmit, loading, onReset, currentLanguage = 'en' }: UrlInputProps) {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const [url, setUrl] = useState('');
  const [validationMsg, setValidationMsg] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const platform = url.trim() ? detectPlatform(url) : null;
  const isValid = isValidUrl(url) && isSupportedUrl(url);

  // Validate on change
  useEffect(() => {
    if (url.trim()) {
      setValidationMsg(getValidationMessage(url));
    } else {
      setValidationMsg(null);
    }
  }, [url]);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (isValid && !loading) {
      onSubmit(url.trim());
    }
  }, [url, isValid, loading, onSubmit]);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text.trim());
        // Auto-submit if the pasted text is a valid URL
        if (isValidUrl(text.trim()) && isSupportedUrl(text.trim())) {
          setTimeout(() => onSubmit(text.trim()), 300);
        }
      }
    } catch {
      // Clipboard access denied — silently ignore
    }
  }, [onSubmit]);

  const handleClear = useCallback(() => {
    setUrl('');
    setValidationMsg(null);
    onReset();
  }, [onReset]);

  return (
    <div className="w-full animate-slide-up">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`relative glass-strong rounded-2xl p-2 transition-all duration-300 shadow-xl
                        ${isFocused ? 'ring-2 ring-primary-500/40 shadow-glow' : 'border border-slate-200/80 dark:border-white/10'}
                        ${validationMsg && url.trim() ? 'ring-2 ring-amber-400/40' : ''}
                        ${isValid && url.trim() ? 'ring-2 ring-emerald-500/40' : ''}`}>
          
          <div className="flex items-center gap-2">
            {/* Platform badge (shows when URL is valid) */}
            {platform && (
              <div className="pl-3 animate-fade-in shrink-0">
                <PlatformBadge platform={platform} size="sm" />
              </div>
            )}

            {/* URL Input */}
            <input
              id="url-input"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={t.input.placeholder}
              className={`flex-1 min-w-0 px-3 sm:px-4 py-3 sm:py-4 bg-transparent border-none outline-none
                         text-sm sm:text-base font-semibold
                         dark:text-white text-slate-900
                         dark:placeholder-white/40 placeholder-slate-400
                         ${platform ? 'pl-1' : ''}`}
              disabled={loading}
              autoComplete="off"
              spellCheck={false}
            />

            {/* Action buttons */}
            <div className="flex items-center gap-1 sm:gap-2 pr-1 shrink-0">
              {url && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-2 rounded-xl dark:text-white/60 text-slate-500 
                             dark:hover:text-white hover:text-slate-900
                             hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer"
                  aria-label="Clear input"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}

              <button
                type="button"
                onClick={handlePaste}
                className="px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider
                           dark:text-white/70 text-slate-700
                           dark:hover:text-white hover:text-slate-900
                           bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 
                           transition-all cursor-pointer border border-slate-200/60 dark:border-white/10"
                disabled={loading}
                aria-label="Paste from clipboard"
              >
                <span className="flex items-center gap-1.5">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                  </svg>
                  <span className="hidden sm:inline">{t.input.paste}</span>
                </span>
              </button>

              <button
                type="submit"
                disabled={!isValid || loading}
                className="bg-gradient-to-r from-primary-500 to-indigo-600 hover:from-primary-600 hover:to-indigo-700 text-white font-extrabold flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm shadow-md shadow-primary-500/25 hover:shadow-primary-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                )}
                <span>
                  {loading ? t.input.fetching : t.input.fetch}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Validation Status Message */}
        {validationMsg && url.trim() && (
          <p className="mt-2.5 ml-4 text-xs font-semibold text-amber-500 dark:text-amber-400 animate-fade-in flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {validationMsg}
          </p>
        )}

        {/* Valid URL Success Feedback Pill */}
        {isValid && url.trim() && !validationMsg && (
          <p className="mt-2.5 ml-4 text-xs font-bold text-emerald-600 dark:text-emerald-400 animate-fade-in flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Valid video link ready to fetch!
          </p>
        )}

        {/* Quick Sample Chips */}
        {!url.trim() && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 animate-fade-in">
            <span className="text-xs dark:text-white/50 text-slate-500 font-semibold">{t.input.trySample}</span>
            <button
              type="button"
              onClick={() => {
                const sample = 'https://www.tiktok.com/@scout2015/video/6718335390841097478';
                setUrl(sample);
                if (isValidUrl(sample)) onSubmit(sample);
              }}
              className="inline-flex items-center gap-1.5 text-xs dark:text-primary-300 text-primary-600 
                         glass-subtle px-3 py-1.5 rounded-full font-bold
                         hover:bg-primary-500/10 hover:border-primary-500/40
                         transition-all border border-slate-200 dark:border-white/10 cursor-pointer shadow-xs"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V5.8a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 12a6.34 6.34 0 0 0 6.35 6.35 6.34 6.34 0 0 0 6.35-6.35V9.45a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.88-.88z"/>
              </svg>
              <span>TikTok Sample</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const sample = 'https://www.instagram.com/reel/Cx123456789/';
                setUrl(sample);
                if (isValidUrl(sample)) onSubmit(sample);
              }}
              className="inline-flex items-center gap-1.5 text-xs dark:text-primary-300 text-primary-600 
                         glass-subtle px-3 py-1.5 rounded-full font-bold
                         hover:bg-primary-500/10 hover:border-primary-500/40
                         transition-all border border-slate-200 dark:border-white/10 cursor-pointer shadow-xs"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Instagram Reel Sample</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
