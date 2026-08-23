import type { Suggestion } from '../utils/api';
import { formatFileSize } from '../utils/platforms';

interface FormatSelectorProps {
  suggestions: Suggestion[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

function renderQualityIcon(label: string) {
  const size = "w-5 h-5 text-white";
  if (label === '4K') {
    return (
      <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
        <line x1="7" y1="2" x2="7" y2="22"/>
        <line x1="17" y1="2" x2="17" y2="22"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <line x1="2" y1="7" x2="7" y2="7"/>
        <line x1="2" y1="17" x2="7" y2="17"/>
        <line x1="17" y1="17" x2="22" y2="17"/>
        <line x1="17" y1="7" x2="22" y2="7"/>
      </svg>
    );
  }
  if (label === '1440p' || label === '1080p' || label === '720p') {
    return (
      <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    );
  }
  if (label === '480p' || label === '360p') {
    return (
      <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
        <line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    );
  }
  if (label === 'MP3 Audio') {
    return (
      <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13"/>
        <circle cx="6" cy="18" r="3"/>
        <circle cx="18" cy="16" r="3"/>
      </svg>
    );
  }
  return (
    <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 7l-7 5 7 5V7z"/>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
    </svg>
  );
}

const qualityColors: Record<string, string> = {
  '4K': 'from-amber-400 to-orange-500',
  '1440p': 'from-violet-400 to-purple-500',
  '1080p': 'from-emerald-400 to-green-500',
  '720p': 'from-blue-400 to-cyan-500',
  '480p': 'from-slate-400 to-slate-500',
  '360p': 'from-stone-400 to-stone-500',
  'MP3 Audio': 'from-pink-500 to-rose-600',
  'No Watermark': 'from-cyan-400 to-blue-500',
  'Watermark': 'from-purple-400 to-indigo-500',
};

export function FormatSelector({ suggestions, selectedIndex, onSelect }: FormatSelectorProps) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="animate-slide-up space-y-3" style={{ animationDelay: '0.1s' }}>
      <div className="flex items-center justify-between">
        <h3 className="text-xs sm:text-sm font-bold dark:text-white/70 text-slate-600 uppercase tracking-wider flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polygon points="23 7 16 12 23 17 23 7"/>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
          </svg>
          Select Download Quality
        </h3>
        <span className="text-[11px] font-semibold text-primary-500 dark:text-primary-400">
          {suggestions.length} Options Available
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {suggestions.map((suggestion, index) => {
          const isSelected = selectedIndex === index;
          const isAudio = suggestion.isAudio;
          const colorGradient = qualityColors[suggestion.qualityLabel] || 'from-indigo-500 to-slate-600';
          const isBest = index === 0 && !isAudio;

          return (
            <button
              key={`${suggestion.formatId}-${index}`}
              id={`format-${suggestion.qualityLabel.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onSelect(index)}
              className={`relative rounded-2xl p-4 text-left cursor-pointer transition-all duration-200 group border shadow-md ${
                isSelected
                  ? 'bg-slate-100/90 dark:bg-white/10 border-primary-500 ring-2 ring-primary-500/40 shadow-glow'
                  : 'glass-subtle border-slate-200/80 dark:border-white/10 hover:bg-slate-100/70 dark:hover:bg-white/5'
              }`}
            >
              {/* Best quality badge */}
              {isBest && (
                <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full text-[10px] 
                                 font-extrabold uppercase tracking-wider text-white
                                 bg-gradient-to-r from-amber-500 to-orange-500 shadow-md border border-white/20">
                   ★ Recommended
                </span>
              )}

              <div className="flex items-center gap-3">
                {/* Quality icon badge */}
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${colorGradient}
                                 flex items-center justify-center shadow-md shrink-0
                                 group-hover:scale-105 transition-transform duration-200`}>
                  {renderQualityIcon(suggestion.qualityLabel)}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Quality label */}
                  <span className={`block text-sm font-extrabold tracking-tight ${
                    isSelected ? 'text-primary-600 dark:text-primary-300' : 'text-slate-900 dark:text-white'
                  }`}>
                    {suggestion.qualityLabel}
                  </span>

                  {/* File size & format */}
                  <span className="block text-xs dark:text-white/60 text-slate-500 font-medium mt-0.5">
                    {suggestion.filesize ? formatFileSize(suggestion.filesize) : suggestion.resolution}
                    {suggestion.ext && ` · ${suggestion.ext.toUpperCase()}`}
                  </span>
                </div>

                {/* Selection Radio Indicator */}
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                  isSelected
                    ? 'border-primary-500 bg-primary-500 text-white'
                    : 'border-slate-300 dark:border-white/30'
                }`}>
                  {isSelected && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                         stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
