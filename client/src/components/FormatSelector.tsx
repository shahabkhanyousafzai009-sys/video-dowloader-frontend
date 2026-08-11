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
      <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    );
  }
  if (label === '480p' || label === '360p') {
    return (
      <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
        <line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    );
  }
  if (label === 'MP3 Audio') {
    return (
      <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13"/>
        <circle cx="6" cy="18" r="3"/>
        <circle cx="18" cy="16" r="3"/>
      </svg>
    );
  }
  return (
    <svg className={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  'MP3 Audio': 'from-pink-400 to-rose-500',
  'No Watermark': 'from-cyan-400 to-blue-500',
  'Watermark': 'from-purple-400 to-indigo-500',
};

export function FormatSelector({ suggestions, selectedIndex, onSelect }: FormatSelectorProps) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <h3 className="text-sm font-semibold dark:text-white/60 text-dark-500 uppercase tracking-wider mb-3 
                     flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <polygon points="23 7 16 12 23 17 23 7"/>
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
        </svg>
        Choose Quality
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {suggestions.map((suggestion, index) => {
          const isSelected = selectedIndex === index;
          const isAudio = suggestion.isAudio;
          const colorGradient = qualityColors[suggestion.qualityLabel] || 'from-gray-400 to-gray-500';
          const isBest = index === 0 && !isAudio;

          return (
            <button
              key={`${suggestion.formatId}-${index}`}
              id={`format-${suggestion.qualityLabel.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onSelect(index)}
              className={`format-card relative glass-subtle rounded-xl p-3.5 text-left cursor-pointer
                         transition-all duration-300 group
                         ${isSelected ? 'selected' : 'hover:bg-white/[0.08]'}
                         ${isAudio ? 'col-span-2 sm:col-span-1' : ''}`}
            >
              {/* Best quality badge */}
              {isBest && (
                <span className="absolute -top-1.5 -right-1.5 px-2 py-0.5 rounded-full text-[9px] 
                                 font-bold uppercase tracking-wider text-white
                                 bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg
                                 animate-bounce-subtle">
                   Best
                </span>
              )}

              <div className="flex items-center gap-3">
                {/* Quality icon */}
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorGradient}
                                 flex items-center justify-center shadow-md
                                 group-hover:scale-110 transition-transform duration-300`}>
                  {renderQualityIcon(suggestion.qualityLabel)}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Quality label */}
                  <span className={`block text-sm font-bold
                                    ${isSelected ? 'text-primary-400' : 'dark:text-white text-dark-900'}`}>
                    {suggestion.qualityLabel}
                  </span>

                  {/* File size & format */}
                  <span className="block text-[11px] dark:text-white/35 text-dark-400 mt-0.5">
                    {suggestion.filesize ? formatFileSize(suggestion.filesize) : suggestion.resolution}
                    {suggestion.ext && ` · ${suggestion.ext.toUpperCase()}`}
                  </span>

                  {/* Merge indicator */}
                  {suggestion.needsMerge && (
                    <span className="inline-block mt-1 text-[9px] px-1.5 py-0.5 rounded 
                                     dark:bg-white/5 bg-dark-200/50
                                     dark:text-white/30 text-dark-400 font-medium">
                      Video + Audio merge
                    </span>
                  )}
                </div>

                {/* Selection indicator */}
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                                 transition-all duration-300
                                 ${isSelected
                                   ? 'border-primary-400 bg-primary-400'
                                   : 'dark:border-white/20 border-dark-300'}`}>
                  {isSelected && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                         stroke="white" strokeWidth="3" strokeLinecap="round">
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
