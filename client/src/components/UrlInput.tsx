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
        <div className={`relative glass-strong rounded-2xl p-1.5 transition-all duration-300
                        ${isFocused ? 'shadow-glow ring-1 ring-primary-400/30' : ''}
                        ${validationMsg && url.trim() ? 'ring-1 ring-red-400/30' : ''}
                        ${isValid && url.trim() ? 'ring-1 ring-emerald-400/30' : ''}`}>
          
          <div className="flex items-center gap-2">
            {/* Platform badge (shows when URL is valid) */}
            {platform && (
              <div className="pl-3 animate-fade-in">
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
              className={`flex-1 min-w-0 px-2 sm:px-4 py-3 sm:py-4 bg-transparent border-none outline-none
                         text-sm sm:text-base font-medium
                         dark:text-white text-dark-900
                         dark:placeholder-white/30 placeholder-dark-400
                         ${platform ? 'pl-1' : ''}`}
              disabled={loading}
              autoComplete="off"
              spellCheck={false}
            />

            {/* Action buttons */}
            <div className="flex items-center gap-1 sm:gap-1.5 pr-1 sm:pr-1.5">
              {url && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-2 rounded-lg dark:text-white/40 text-dark-400 
                             dark:hover:text-white hover:text-dark-900
                             hover:bg-white/10 transition-all"
                  aria-label="Clear input"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}

              <button
                type="button"
                onClick={handlePaste}
                className="px-2.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider
                           dark:text-white/50 text-dark-500
                           dark:hover:text-white hover:text-dark-900
                           hover:bg-white/10 transition-all"
                disabled={loading}
                aria-label="Paste from clipboard"
              >
                <span className="flex items-center gap-1 sm:gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                  </svg>
                  <span className="hidden sm:inline">{t.input.paste}</span>
                </span>
              </button>

              <button
                type="submit"
                disabled={!isValid || loading}
                className="btn-primary flex items-center justify-center gap-1.5 sm:gap-2 !px-3.5 sm:!px-5 !py-2 sm:!py-2.5 !rounded-xl text-sm"
              >
                {loading ? (
                  <div className="spinner !w-4 !h-4 !border-2" />
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                )}
                <span className={loading ? "" : "hidden sm:inline"}>
                  {loading ? t.input.fetching : t.input.fetch}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Validation message */}
        {validationMsg && url.trim() && (
          <p className="mt-2.5 ml-4 text-sm text-red-400 animate-fade-in flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {validationMsg}
          </p>
        )}

        {/* Supported platforms hint & Quick Sample Chips */}
        {!url.trim() && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 animate-fade-in">
            <span className="text-xs dark:text-white/40 text-dark-500 font-medium">{t.input.trySample}</span>
            <button
              type="button"
              onClick={() => {
                const sample = 'https://www.tiktok.com/@scout2015/video/6718335390841097478';
                setUrl(sample);
                if (isValidUrl(sample)) onSubmit(sample);
              }}
              className="text-xs dark:text-primary-300 text-primary-600 
                         dark:bg-primary-500/10 bg-primary-50
                         hover:bg-primary-500/20 px-3 py-1 rounded-full font-semibold transition-all border border-primary-500/20"
            >
              🎵 TikTok Video
            </button>
            <button
              type="button"
              onClick={() => {
                const sample = 'https://www.instagram.com/reel/C8_12345678/';
                setUrl(sample);
                if (isValidUrl(sample)) onSubmit(sample);
              }}
              className="text-xs dark:text-primary-300 text-primary-600 
                         dark:bg-primary-500/10 bg-primary-50
                         hover:bg-primary-500/20 px-3 py-1 rounded-full font-semibold transition-all border border-primary-500/20"
            >
              📸 Instagram Reel
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
