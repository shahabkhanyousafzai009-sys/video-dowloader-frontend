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

type MediaFilter = 'all' | 'video' | 'photo' | 'dp' | 'story' | 'audio';

export function UrlInput({ onSubmit, loading, onReset, currentLanguage = 'en' }: UrlInputProps) {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const [url, setUrl] = useState('');
  const [validationMsg, setValidationMsg] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [activeFilter, setActiveFilter] = useState<MediaFilter>('video');

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
        if (isValidUrl(text.trim()) && isSupportedUrl(text.trim())) {
          setTimeout(() => onSubmit(text.trim()), 300);
        }
      }
    } catch {
      // Clipboard access denied silently
    }
  }, [onSubmit]);

  const handleClear = useCallback(() => {
    setUrl('');
    setValidationMsg(null);
    onReset();
  }, [onReset]);

  const filters: { id: MediaFilter; label: string; icon: string }[] = [
    { id: 'all', label: 'All', icon: '🔍' },
    { id: 'video', label: 'Video', icon: '📹' },
    { id: 'photo', label: 'Photo', icon: '🖼️' },
    { id: 'dp', label: 'DP', icon: '👤' },
    { id: 'story', label: 'Story', icon: '⏱️' },
    { id: 'audio', label: 'Audio', icon: '🎵' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4 animate-slide-up">
      
      {/* Media Type Format Selector Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 relative z-10">
        {filters.map((f) => {
          const isActive = activeFilter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setActiveFilter(f.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 border shadow-xs ${
                isActive
                  ? 'bg-white text-slate-900 border-white shadow-md'
                  : 'bg-white/15 text-white border-white/20 hover:bg-white/25 hover:border-white/40'
              }`}
            >
              <span className="text-sm">{f.icon}</span>
              <span>{f.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="relative space-y-3">
        {/* Crisp White Search Container */}
        <div className={`relative bg-white rounded-2xl p-2 transition-all duration-300 shadow-2xl flex items-center gap-2 border-2 border-slate-900/80
                        ${isFocused ? 'ring-4 ring-white/40' : ''}
                        ${validationMsg && url.trim() ? 'ring-4 ring-amber-400/50' : ''}
                        ${isValid && url.trim() ? 'ring-4 ring-emerald-400/50' : ''}`}>
          
          {/* Platform badge */}
          {platform && (
            <div className="pl-3 animate-fade-in shrink-0">
              <PlatformBadge platform={platform} size="sm" />
            </div>
          )}

          {/* URL Input Field */}
          <input
            id="url-input"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Paste Instagram video link here..."
            className="flex-1 min-w-0 px-3 sm:px-4 py-3 sm:py-3.5 bg-transparent border-none outline-none text-sm sm:text-base font-semibold text-slate-900 placeholder-slate-400"
            disabled={loading}
            autoComplete="off"
            spellCheck={false}
          />

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 pr-1 shrink-0">
            {url && (
              <button
                type="button"
                onClick={handleClear}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
                aria-label="Clear input"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}

            {/* Gradient Paste Button */}
            <button
              type="button"
              onClick={handlePaste}
              className="px-3.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:opacity-95 transition-all cursor-pointer shadow-md flex items-center gap-1.5"
              disabled={loading}
              aria-label="Paste link from clipboard"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
              </svg>
              <span>{t.input.paste}</span>
            </button>
          </div>
        </div>

        {/* Large Prominent Black DOWNLOAD Button */}
        <button
          type="submit"
          disabled={!isValid || loading}
          className="w-full py-4 rounded-2xl bg-slate-950 hover:bg-black text-white font-black text-base sm:text-lg uppercase tracking-wider shadow-2xl flex items-center justify-center gap-2.5 transition-all border border-slate-800 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          )}
          <span>{loading ? t.input.fetching : 'DOWNLOAD'}</span>
        </button>

        {/* Disclaimer Note */}
        <p className="text-[11px] text-white/80 text-center font-medium">
          For personal, offline use only. By using this tool you agree to our <a href="/terms-of-service" className="underline hover:text-white font-bold">Fair Use Policy</a>.
        </p>

        {/* Feature Checkmark Badges */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-bold text-white drop-shadow-sm">
          <span className="flex items-center gap-1"><span className="text-emerald-300">✓</span> Original Quality</span>
          <span className="flex items-center gap-1"><span className="text-emerald-300">✓</span> HD MP4</span>
          <span className="flex items-center gap-1"><span className="text-emerald-300">✓</span> No Login Required</span>
          <span className="flex items-center gap-1"><span className="text-emerald-300">✓</span> 100% Free</span>
        </div>

        {/* Validation Status Message */}
        {validationMsg && url.trim() && (
          <p className="mt-2 text-xs font-bold text-amber-300 text-center flex items-center justify-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {validationMsg}
          </p>
        )}
      </form>
    </div>
  );
}
