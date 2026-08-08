import { useState, useRef, useEffect } from 'react';
import { Language, LANGUAGE_LABELS } from '../utils/i18n';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentMeta = LANGUAGE_LABELS[currentLanguage] || LANGUAGE_LABELS.en;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
                   glass-subtle dark:text-white/80 text-dark-700
                   hover:bg-white/10 transition-all border border-white/10"
        aria-label="Select Language"
      >
        <span>{currentMeta.flag}</span>
        <span className="hidden sm:inline">{currentMeta.label}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-2xl glass-strong border border-white/15 shadow-2xl py-1.5 z-50 animate-fade-in backdrop-blur-xl">
          {(Object.keys(LANGUAGE_LABELS) as Language[]).map((langKey) => {
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
                className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-primary-500/20 text-primary-400 font-bold'
                    : 'dark:text-white/80 text-dark-800 hover:bg-white/10'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{meta.flag}</span>
                  <span>{meta.label}</span>
                </span>
                {isSelected && (
                  <svg className="w-3.5 h-3.5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
