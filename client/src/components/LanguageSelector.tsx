import { useState, useRef, useEffect, useMemo } from 'react';
import { Language, LANGUAGE_LABELS } from '../utils/i18n';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  const currentMeta = LANGUAGE_LABELS[currentLanguage] || LANGUAGE_LABELS.en;

  const filteredLanguages = useMemo(() => {
    const allLangs = Object.keys(LANGUAGE_LABELS) as Language[];
    if (!searchQuery.trim()) return allLangs;
    const q = searchQuery.toLowerCase();
    return allLangs.filter((key) => {
      const meta = LANGUAGE_LABELS[key];
      return (
        meta.label.toLowerCase().includes(q) ||
        meta.code.toLowerCase().includes(q) ||
        key.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold
                   bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white/90
                   hover:bg-slate-200 dark:hover:bg-white/20 transition-all duration-200
                   border border-slate-200/80 dark:border-white/15 cursor-pointer shadow-sm"
        aria-label="Select Language"
      >
        <span>{currentMeta.flag}</span>
        <span className="font-bold tracking-tight">{currentMeta.code || currentMeta.label}</span>
        <svg
          className={`w-3.5 h-3.5 text-slate-500 dark:text-white/70 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-strong border border-white/15 shadow-2xl p-2 z-50 animate-fade-in backdrop-blur-xl">
          {/* Search Input for 50 Global Languages */}
          <div className="px-1.5 pt-1 pb-2 border-b border-slate-200/50 dark:border-white/10 mb-1">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search language..."
                className="w-full pl-7 pr-2.5 py-1 text-xs rounded-xl bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-white/40 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
              <svg className="w-3.5 h-3.5 absolute left-2 top-2 text-slate-400 dark:text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Scrollable list of 50 languages */}
          <div className="max-h-64 overflow-y-auto space-y-0.5 custom-scrollbar pr-0.5">
            {filteredLanguages.length === 0 ? (
              <div className="px-3 py-3 text-center text-xs text-slate-400 dark:text-white/40 font-medium">
                No language found
              </div>
            ) : (
              filteredLanguages.map((langKey) => {
                const meta = LANGUAGE_LABELS[langKey];
                const isSelected = currentLanguage === langKey;
                return (
                  <button
                    key={langKey}
                    type="button"
                    onClick={() => {
                      onLanguageChange(langKey);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-primary-500/20 text-primary-400 font-bold'
                        : 'dark:text-white/80 text-dark-800 hover:bg-white/10'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 truncate">
                      <span className="text-sm">{meta.flag}</span>
                      <span className="truncate">{meta.label}</span>
                    </span>
                    <span className="text-[10px] opacity-50 uppercase tracking-wider font-mono">{meta.code}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
