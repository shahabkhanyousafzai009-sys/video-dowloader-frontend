import { useState, useRef, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import { Language } from '../utils/i18n';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigate?: (path: string) => void;
  currentPlatform?: string;
  onOpenWidgetModal?: () => void;
}

export function Header({
  currentLanguage,
  onLanguageChange,
  onNavigate,
  currentPlatform = 'all',
  onOpenWidgetModal,
}: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);

    if (path.startsWith('#')) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (onNavigate) {
        onNavigate('/');
        setTimeout(() => {
          document.querySelector(path)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      return;
    }

    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new Event('popstate'));
    }
  };

  const downloaderLinks = [
    {
      label: 'TikTok No Watermark',
      path: '/tiktok-downloader',
      icon: '🎵',
      desc: 'Save HD TikTok videos without logo',
    },
    {
      label: 'TikTok MP3 Audio',
      path: '/tiktok-mp3-downloader',
      icon: '🎧',
      desc: 'Extract 320kbps MP3 sounds',
    },
    {
      label: 'Instagram Reels HD',
      path: '/instagram-downloader',
      icon: '📸',
      desc: 'Download Reels & Video posts',
    },
    {
      label: 'YouTube Shorts',
      path: '/youtube-shorts-downloader',
      icon: '▶️',
      desc: 'Save Shorts in 1080p MP4 or MP3',
    },
    {
      label: 'Video to MP3',
      path: '/mp3-downloader',
      icon: '🎶',
      desc: 'Universal high bitrate MP3 extractor',
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-dark-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 transition-colors duration-200 shadow-xs">
      <nav aria-label="Main Navigation" className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="flex items-center gap-3 group cursor-pointer"
          title="SnapLoad — Free Video Downloader"
          aria-label="SnapLoad Home Page"
        >
          {/* Logo Badge Icon matching user screenshot */}
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-[#5B50F6] flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200 border border-white/15">
              {/* White Download Arrow SVG */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                <polyline points="7 11 12 16 17 11" />
                <line x1="12" y1="4" x2="12" y2="16" />
              </svg>
            </div>
          </div>

          {/* Styled Brand Name: Snap + Load with red underline */}
          <div className="flex items-center gap-1">
            <span className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Snap
            </span>
            <span className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight relative inline-block pb-0.5">
              Load
              {/* Vibrant Coral Red Underline Bar */}
              <span className="absolute -bottom-1 left-0 w-full h-[3.5px] bg-[#FF3B60] rounded-full" />
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
          
          {/* All Downloaders Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                isDropdownOpen || currentPlatform !== 'all'
                  ? 'text-primary-600 dark:text-primary-400 bg-slate-100 dark:bg-white/10'
                  : 'text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/5'
              }`}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <span>All Downloaders</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-primary-500' : 'text-slate-400'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/15 shadow-2xl p-2 z-50 animate-fade-in backdrop-blur-xl">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-white/40 px-3 py-1.5">
                  Supported Platforms
                </div>
                {downloaderLinks.map((item) => (
                  <a
                    key={item.path}
                    href={item.path}
                    onClick={(e) => handleLinkClick(e, item.path)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors group cursor-pointer"
                  >
                    <span className="text-xl p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-white/60 line-clamp-1">
                        {item.desc}
                      </div>
                    </div>
                  </a>
                ))}

                {onOpenWidgetModal && (
                  <>
                    <div className="border-t border-slate-100 dark:border-white/10 my-1" />
                    <button
                      type="button"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onOpenWidgetModal();
                      }}
                      className="w-full flex items-center gap-2 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-xs font-bold text-primary-600 dark:text-primary-400 text-left cursor-pointer"
                    >
                      <span>🧩</span>
                      <span>Embed Free Downloader Widget</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>



          {/* Guides Navigation Link */}
          <a
            href="/guides"
            onClick={(e) => handleLinkClick(e, '/guides')}
            className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-xl hover:bg-slate-100/70 dark:hover:bg-white/5 transition-all cursor-pointer"
          >
            Guides
          </a>

          {/* Blog Navigation Link */}
          <a
            href="/blog"
            onClick={(e) => handleLinkClick(e, '/blog')}
            className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-xl hover:bg-slate-100/70 dark:hover:bg-white/5 transition-all cursor-pointer"
          >
            Blog
          </a>

          {/* FAQ Navigation Link */}
          <a
            href="#faq"
            onClick={(e) => handleLinkClick(e, '#faq')}
            className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-xl hover:bg-slate-100/70 dark:hover:bg-white/5 transition-all cursor-pointer"
          >
            FAQ
          </a>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-3">
          {/* Language Selector Pill */}
          <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />

          {/* Dark / Light Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors border border-slate-200 dark:border-white/15"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-dark-900/95 border-b border-slate-200 dark:border-white/10 px-4 py-3 space-y-2 animate-fade-in backdrop-blur-xl">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-white/40 px-2 pt-1">
            Downloaders
          </div>
          {downloaderLinks.map((item) => (
            <a
              key={item.path}
              href={item.path}
              onClick={(e) => handleLinkClick(e, item.path)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}

          <div className="border-t border-slate-100 dark:border-white/10 my-2" />



          <a
            href="/guides"
            onClick={(e) => handleLinkClick(e, '/guides')}
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            Guides
          </a>

          <a
            href="/blog"
            onClick={(e) => handleLinkClick(e, '/blog')}
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            Blog
          </a>

          <a
            href="#faq"
            onClick={(e) => handleLinkClick(e, '#faq')}
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            FAQ
          </a>
        </div>
      )}
    </header>
  );
}
