import { useState, useRef, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import { Language, TRANSLATIONS } from '../utils/i18n';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigate?: (path: string) => void;
  currentPlatform?: string;
  onOpenWidgetModal?: () => void;
}

const HEADER_EXTRAS: Record<string, {
  allDownloaders: string;
  supportedPlatforms: string;
  embedWidget: string;
  guides: string;
  blog: string;
  faq: string;
  about: string;
  contact: string;
}> = {
  pt: { allDownloaders: 'Baixadores', supportedPlatforms: 'Plataformas Suportadas', embedWidget: 'Incorporar Widget Gratuito', guides: 'Guias', blog: 'Blog', faq: 'FAQ', about: 'Sobre', contact: 'Contato' },
  es: { allDownloaders: 'Descargadores', supportedPlatforms: 'Plataformas Compatibles', embedWidget: 'Incrustar Widget Gratis', guides: 'Guías', blog: 'Blog', faq: 'FAQ', about: 'Nosotros', contact: 'Contacto' },
  id: { allDownloaders: 'Semua Pengunduh', supportedPlatforms: 'Platform Didukung', embedWidget: 'Pasang Widget Gratis', guides: 'Panduan', blog: 'Blog', faq: 'FAQ', about: 'Tentang', contact: 'Kontak' },
  fr: { allDownloaders: 'Téléchargeurs', supportedPlatforms: 'Plateformes Supportées', embedWidget: 'Intégrer le Widget Gratuit', guides: 'Guides', blog: 'Blog', faq: 'FAQ', about: 'À Propos', contact: 'Contact' },
  de: { allDownloaders: 'Downloader', supportedPlatforms: 'Unterstützte Plattformen', embedWidget: 'Kostenloses Widget Einbinden', guides: 'Anleitungen', blog: 'Blog', faq: 'FAQ', about: 'Über Uns', contact: 'Kontakt' },
  ar: { allDownloaders: 'جميع الأدوات', supportedPlatforms: 'المنصات المدعومة', embedWidget: 'تضمين ودجة التحميل مجاناً', guides: 'الأدلة', blog: 'المدونة', faq: 'الأسئلة', about: 'من نحن', contact: 'اتصل بنا' },
  ru: { allDownloaders: 'Все Загрузчики', supportedPlatforms: 'Поддерживаемые Платформы', embedWidget: 'Встроить Бесплатный Виджет', guides: 'Гайды', blog: 'Блог', faq: 'FAQ', about: 'О нас', contact: 'Контакты' },
  tr: { allDownloaders: 'Tüm İndiriciler', supportedPlatforms: 'Desteklenen Platformlar', embedWidget: 'Ücretsiz Widget Ekle', guides: 'Kılavuzlar', blog: 'Blog', faq: 'SSS', about: 'Hakkımızda', contact: 'İletişim' },
  hi: { allDownloaders: 'सभी डाउनलोडर', supportedPlatforms: 'समर्थित प्लेटफॉर्म', embedWidget: 'मुफ़्त विजेट जोड़ें', guides: 'गाइड्स', blog: 'ब्लॉग', faq: 'FAQ', about: 'हमारे बारे में', contact: 'संपर्क' },
  ur: { allDownloaders: 'تمام ڈاؤنلوڈرز', supportedPlatforms: 'سپورٹ شدہ پلیٹ فارمز', embedWidget: 'مفت ویجیٹ لگائیں', guides: 'گائیڈز', blog: 'بلاگ', faq: 'سوالات', about: 'ہمارے بارے میں', contact: 'رابطہ' },
  it: { allDownloaders: 'Tutti i Downloader', supportedPlatforms: 'Piattaforme Supportate', embedWidget: 'Incorpora Widget Gratuito', guides: 'Guide', blog: 'Blog', faq: 'FAQ', about: 'Chi Siamo', contact: 'Contatti' },
  vi: { allDownloaders: 'Tất Cả Công Cụ', supportedPlatforms: 'Nền Tảng Hỗ Trợ', embedWidget: 'Nhúng Tiện Ích Miễn Phí', guides: 'Hướng Dẫn', blog: 'Blog', faq: 'Hỏi Đáp', about: 'Giới Thiệu', contact: 'Liên Hệ' },
  th: { allDownloaders: 'เครื่องมือทั้งหมด', supportedPlatforms: 'แพลตฟอร์มที่รองรับ', embedWidget: 'ติดตั้งวิดเจ็ตฟรี', guides: 'คู่มือ', blog: 'บล็อก', faq: 'คำถามที่พบบ่อย', about: 'เกี่ยวกับเรา', contact: 'ติดต่อ' },
  ko: { allDownloaders: '모든 다운로더', supportedPlatforms: '지원되는 플랫폼', embedWidget: '무료 위젯 임베드', guides: '가이드', blog: '블로그', faq: 'FAQ', about: '소개', contact: '문의' },
  ja: { allDownloaders: '動画保存ツール', supportedPlatforms: '対応プラットフォーム', embedWidget: '無料ウィジェットを埋め込み', guides: '使い方', blog: 'ブログ', faq: 'FAQ', about: '概要', contact: 'お問い合わせ' },
  pl: { allDownloaders: 'Pobieracze', supportedPlatforms: 'Obsługiwane Platformy', embedWidget: 'Wklej Darmowy Widżet', guides: 'Poradniki', blog: 'Blog', faq: 'FAQ', about: 'O Nas', contact: 'Kontakt' },
  nl: { allDownloaders: 'Alle Downloaders', supportedPlatforms: 'Ondersteunde Platforms', embedWidget: 'Gratis Widget Insluiten', guides: 'Gidsen', blog: 'Blog', faq: 'FAQ', about: 'Over Ons', contact: 'Contact' },
  ms: { allDownloaders: 'Semua Pemuat Turun', supportedPlatforms: 'Platform Disokong', embedWidget: 'Pasang Widget Percuma', guides: 'Panduan', blog: 'Blog', faq: 'Soalan Lazim', about: 'Tentang', contact: 'Hubungi' },
  fil: { allDownloaders: 'Lahat ng Downloader', supportedPlatforms: 'Mga Suportadong Platform', embedWidget: 'I-embed ang Libreng Widget', guides: 'Mga Gabay', blog: 'Blog', faq: 'FAQ', about: 'Tungkol', contact: 'Kontak' },
  uk: { allDownloaders: 'Всі Завантажувачі', supportedPlatforms: 'Підтримувані Платформи', embedWidget: 'Вставити Безкоштовний Віджет', guides: 'Посібники', blog: 'Блог', faq: 'FAQ', about: 'Про нас', contact: 'Контакти' },
  sv: { allDownloaders: 'Alla Downloaders', supportedPlatforms: 'Plattformar som stöds', embedWidget: 'Bädda in Gratis Widget', guides: 'Guider', blog: 'Blogg', faq: 'FAQ', about: 'Om Oss', contact: 'Kontakt' },
  ro: { allDownloaders: 'Descărcătoare', supportedPlatforms: 'Platforme Suportate', embedWidget: 'Integrează Widget Gratuit', guides: 'Ghiduri', blog: 'Blog', faq: 'FAQ', about: 'Despre', contact: 'Contact' },
  cs: { allDownloaders: 'Všechny Stahovače', supportedPlatforms: 'Podporované Platformy', embedWidget: 'Vložit Widget Zdarma', guides: 'Návody', blog: 'Blog', faq: 'FAQ', about: 'O Nás', contact: 'Kontakt' },
  el: { allDownloaders: 'Όλα τα Εργαλεία', supportedPlatforms: 'Υποστηριζόμενες Πλατφόρμες', embedWidget: 'Ενσωμάτωση Δωρεάν Widget', guides: 'Οδηγοί', blog: 'Blog', faq: 'FAQ', about: 'Σχετικά', contact: 'Επικοινωνία' },
  fa: { allDownloaders: 'همه دانلودرها', supportedPlatforms: 'پلتفرم‌های پشتیبانی شده', embedWidget: 'افزودن ابزارک رایگان', guides: 'راهنماها', blog: 'وبلاگ', faq: 'سوالات', about: 'درباره ما', contact: 'تماس' },
  bn: { allDownloaders: 'সকল ডাউনলোডার', supportedPlatforms: 'সমর্থিত প্ল্যাটফর্ম', embedWidget: 'ফ্রি উইজেট যুক্ত করুন', guides: 'নির্দেশিকা', blog: 'ব্লগ', faq: 'প্রশ্নোত্তর', about: 'আমাদের সম্পর্কে', contact: 'যোগাযোগ' },
  en: { allDownloaders: 'All Downloaders', supportedPlatforms: 'Supported Platforms', embedWidget: 'Embed Free Downloader Widget', guides: 'Guides', blog: 'Blog', faq: 'FAQ', about: 'About', contact: 'Contact' },
};

export function Header({
  currentLanguage,
  onLanguageChange,
  onNavigate,
  currentPlatform = 'all',
  onOpenWidgetModal,
}: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const hx = HEADER_EXTRAS[currentLanguage] || HEADER_EXTRAS.en;

  // Close dropdown on click outside & listen for popstate path changes
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const handlePathUpdate = () => {
      setCurrentPath(window.location.pathname);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('popstate', handlePathUpdate);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('popstate', handlePathUpdate);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setCurrentPath(path);

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
      label: t.nav.tiktok,
      path: '/tiktok-downloader',
      icon: '🎵',
      desc: 'TikTok MP4 HD',
    },
    {
      label: t.nav['tiktok-mp3'],
      path: '/tiktok-mp3-downloader',
      icon: '🎧',
      desc: 'TikTok MP3 320kbps',
    },
    {
      label: t.nav.instagram,
      path: '/instagram-downloader',
      icon: '📸',
      desc: 'Instagram Reels HD',
    },
    {
      label: t.nav.facebook,
      path: '/facebook-downloader',
      icon: '📘',
      desc: 'Facebook Reels & Watch 1080p',
    },
    {
      label: t.nav.mp3,
      path: '/mp3-downloader',
      icon: '🎶',
      desc: 'MP3 320kbps Audio',
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
          {/* Logo Badge Icon with Hero Gradient */}
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#7026b9] via-[#d92662] to-[#f97316] flex items-center justify-center shadow-md shadow-pink-500/25 group-hover:scale-105 transition-transform duration-200 border border-white/20">
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
              className={`flex items-center gap-1.5 text-sm font-extrabold px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                isDropdownOpen || (currentPath !== '/blog' && !currentPath.startsWith('/blog/') && currentPath !== '/guides' && !currentPath.startsWith('/guides/') && currentPath !== '/faq' && currentPath !== '/about-us' && currentPath !== '/contact-us')
                  ? 'text-primary-600 dark:text-primary-400 bg-primary-500/10 border border-primary-500/30 shadow-xs'
                  : 'text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/5 border border-transparent'
              }`}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <span>{hx.allDownloaders}</span>
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
                  {hx.supportedPlatforms}
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
                      <span>{hx.embedWidget}</span>
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
            className={`text-sm px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              currentPath === '/guides' || currentPath.startsWith('/guides/')
                ? 'font-extrabold bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/30 shadow-xs'
                : 'font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/5 border border-transparent'
            }`}
          >
            {(currentPath === '/guides' || currentPath.startsWith('/guides/')) && (
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
            )}
            <span>{hx.guides}</span>
          </a>

          {/* Blog Navigation Link */}
          <a
            href="/blog"
            onClick={(e) => handleLinkClick(e, '/blog')}
            className={`text-sm px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              currentPath === '/blog' || currentPath.startsWith('/blog/')
                ? 'font-extrabold bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/30 shadow-xs'
                : 'font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/5 border border-transparent'
            }`}
          >
            {(currentPath === '/blog' || currentPath.startsWith('/blog/')) && (
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
            )}
            <span>{hx.blog}</span>
          </a>

          {/* FAQ Navigation Link */}
          <a
            href="/faq"
            onClick={(e) => handleLinkClick(e, '/faq')}
            className={`text-sm px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              currentPath === '/faq' || currentPath === '/faqs'
                ? 'font-extrabold bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/30 shadow-xs'
                : 'font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/5 border border-transparent'
            }`}
          >
            {(currentPath === '/faq' || currentPath === '/faqs') && (
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
            )}
            <span>{hx.faq}</span>
          </a>

          {/* About Us Link */}
          <a
            href="/about-us"
            onClick={(e) => handleLinkClick(e, '/about-us')}
            className={`text-sm px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              currentPath === '/about-us' || currentPath === '/about'
                ? 'font-extrabold bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/30 shadow-xs'
                : 'font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/5 border border-transparent'
            }`}
          >
            {(currentPath === '/about-us' || currentPath === '/about') && (
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
            )}
            <span>{hx.about}</span>
          </a>

          {/* Contact Us Link */}
          <a
            href="/contact"
            onClick={(e) => handleLinkClick(e, '/contact')}
            className={`text-sm px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              currentPath === '/contact' || currentPath === '/contact-us'
                ? 'font-extrabold bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/30 shadow-xs'
                : 'font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/5 border border-transparent'
            }`}
          >
            {(currentPath === '/contact' || currentPath === '/contact-us') && (
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
            )}
            <span>{hx.contact}</span>
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
            {hx.allDownloaders}
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
            className={`block px-3 py-2 rounded-xl text-sm transition-colors ${
              currentPath === '/guides' || currentPath.startsWith('/guides/')
                ? 'font-extrabold bg-primary-500/10 text-primary-600 dark:text-primary-400'
                : 'font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10'
            }`}
          >
            {hx.guides}
          </a>

          <a
            href="/blog"
            onClick={(e) => handleLinkClick(e, '/blog')}
            className={`block px-3 py-2 rounded-xl text-sm transition-colors ${
              currentPath === '/blog' || currentPath.startsWith('/blog/')
                ? 'font-extrabold bg-primary-500/10 text-primary-600 dark:text-primary-400'
                : 'font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10'
            }`}
          >
            {hx.blog}
          </a>

          <a
            href="/faq"
            onClick={(e) => handleLinkClick(e, '/faq')}
            className={`block px-3 py-2 rounded-xl text-sm transition-colors ${
              currentPath === '/faq' || currentPath === '/faqs'
                ? 'font-extrabold bg-primary-500/10 text-primary-600 dark:text-primary-400'
                : 'font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10'
            }`}
          >
            {hx.faq}
          </a>

          <a
            href="/about-us"
            onClick={(e) => handleLinkClick(e, '/about-us')}
            className={`block px-3 py-2 rounded-xl text-sm transition-colors ${
              currentPath === '/about-us' || currentPath === '/about'
                ? 'font-extrabold bg-primary-500/10 text-primary-600 dark:text-primary-400'
                : 'font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10'
            }`}
          >
            {hx.about}
          </a>

          <a
            href="/contact"
            onClick={(e) => handleLinkClick(e, '/contact')}
            className={`block px-3 py-2 rounded-xl text-sm transition-colors ${
              currentPath === '/contact' || currentPath === '/contact-us'
                ? 'font-extrabold bg-primary-500/10 text-primary-600 dark:text-primary-400'
                : 'font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10'
            }`}
          >
            {hx.contact}
          </a>
        </div>
      )}
    </header>
  );
}
