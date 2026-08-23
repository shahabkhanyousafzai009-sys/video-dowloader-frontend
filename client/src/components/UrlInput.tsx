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
              className="text-xs dark:text-primary-300 text-primary-600 
                         glass-subtle px-3 py-1 rounded-full font-bold
                         hover:bg-primary-500/10 hover:border-primary-500/40
                         transition-all border border-slate-200 dark:border-white/10 cursor-pointer shadow-xs"
            >
              🎵 TikTok Sample
            </button>

            <button
              type="button"
              onClick={() => {
                const sample = 'https://www.instagram.com/reel/Cx123456789/';
                setUrl(sample);
                if (isValidUrl(sample)) onSubmit(sample);
              }}
              className="text-xs dark:text-primary-300 text-primary-600 
                         glass-subtle px-3 py-1 rounded-full font-bold
                         hover:bg-primary-500/10 hover:border-primary-500/40
                         transition-all border border-slate-200 dark:border-white/10 cursor-pointer shadow-xs"
            >
              📸 Instagram Reel Sample
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
