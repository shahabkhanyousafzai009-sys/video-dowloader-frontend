import { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { UrlInput } from './components/UrlInput';
import { VideoPreview } from './components/VideoPreview';
import { FormatSelector } from './components/FormatSelector';
import { DownloadButton } from './components/DownloadButton';
import { ProgressBar } from './components/ProgressBar';
import { ErrorMessage } from './components/ErrorMessage';
import { Footer } from './components/Footer';
import { LegalModal, LegalTab } from './components/LegalModal';
import { InstallPwaBanner } from './components/InstallPwaBanner';
import { SeoContentSection } from './components/SeoContentSection';
import { AdBanner } from './components/AdBanner';
import { CookieConsent } from './components/CookieConsent';
import { DownloadHistory } from './components/DownloadHistory';
import { GuidesHub } from './components/GuidesHub';
import { GuideDetailPage } from './components/GuideDetailPage';
import { GUIDES_DATA } from './data/guidesData';
import { Language, TRANSLATIONS } from './utils/i18n';
import { EmbedWidgetModal } from './components/EmbedWidgetModal';
import { StandaloneWidgetView } from './components/StandaloneWidgetView';
import { useVideoInfo } from './hooks/useVideoInfo';
import { useDownload } from './hooks/useDownload';
import './App.css';

type Platform = 'all' | 'tiktok' | 'instagram' | 'mp3' | 'tiktok-mp3' | 'youtube-shorts' | 'widget';

interface PlatformSEO {
  path: string;
  label: string;
  title: string;
  description: string;
  heroHeading: string;
  heroHighlight: string;
  heroSub: string;
}

const PLATFORMS: Record<Platform, PlatformSEO> = {
  all: {
    path: '/',
    label: 'All Platforms',
    title: 'SnapLoad — Universal Video Downloader | TikTok, Instagram & MP3',
    description: 'Download videos from TikTok without watermark and Instagram Reels in 1080p HD or 4K. Extract MP3 audio. Free, fast, private, and no signup required.',
    heroHeading: 'Download Videos',
    heroHighlight: 'From Anywhere',
    heroSub: 'Paste a link from TikTok or Instagram. Choose your quality and download instantly — no signup required.',
  },
  tiktok: {
    path: '/tiktok-downloader',
    label: 'TikTok No Watermark',
    title: 'TikTok Downloader Without Watermark HD — Free MP4 Saver | SnapLoad',
    description: 'Download TikTok videos without watermark in full HD 1080p quality for free. Fast online TikTok video downloader, no app or account required.',
    heroHeading: 'TikTok Downloader',
    heroHighlight: 'Without Watermark',
    heroSub: 'Paste your TikTok video link below to save clean, watermark-free HD videos directly to your device.',
  },
  'tiktok-mp3': {
    path: '/tiktok-mp3-downloader',
    label: 'TikTok MP3',
    title: 'TikTok MP3 Sound Downloader — Extract Audio Tracks Free | SnapLoad',
    description: 'Extract and download high quality 320kbps MP3 audio tracks directly from any TikTok video link for free.',
    heroHeading: 'TikTok Sound to MP3',
    heroHighlight: 'Audio Converter',
    heroSub: 'Extract high-bitrate MP3 audio tracks directly from viral TikTok video links in seconds.',
  },
  instagram: {
    path: '/instagram-downloader',
    label: 'Instagram Reels',
    title: 'Instagram Reels Downloader 1080p HD — Free Video Saver | SnapLoad',
    description: 'Download Instagram Reels, videos, IGTV clips & photos in original high definition. Free online Instagram downloader for mobile and desktop.',
    heroHeading: 'Instagram Reels & Video',
    heroHighlight: 'Downloader HD',
    heroSub: 'Save high-definition Instagram Reels, clips, and video posts directly to your phone or computer.',
  },
  'youtube-shorts': {
    path: '/youtube-shorts-downloader',
    label: 'YouTube Shorts',
    title: 'YouTube Shorts Downloader 1080p HD — Free MP4 & MP3 Saver | SnapLoad',
    description: 'Download YouTube Shorts videos in MP4 1080p HD or extract 320kbps MP3 audio tracks for free.',
    heroHeading: 'YouTube Shorts',
    heroHighlight: 'Downloader HD & MP3',
    heroSub: 'Download YouTube Shorts clips in full 1080p HD resolution or convert to MP3 audio files.',
  },
  mp3: {
    path: '/mp3-downloader',
    label: 'MP3 Converter',
    title: 'Video to MP3 Converter Online — High Quality Audio Extraction | SnapLoad',
    description: 'Convert video links from TikTok & Instagram into 320kbps MP3 audio files. Free, fast audio extractor with no registration required.',
    heroHeading: 'Video to MP3',
    heroHighlight: 'Audio Converter',
    heroSub: 'Extract high-bitrate MP3 audio tracks directly from TikTok or Instagram video links.',
  },
  widget: {
    path: '/widget',
    label: 'Embed Widget',
    title: 'Free Video Downloader Widget — Embed SnapLoad on Your Site',
    description: 'Embed SnapLoad free video downloader widget on your website or blog with clean backlink integration.',
    heroHeading: 'Embed Video Downloader',
    heroHighlight: 'Widget on Your Site',
    heroSub: 'Give your website visitors the power to download videos with our free embeddable widget.',
  },
};

function App() {
  const { videoInfo, loading, error, fetchInfo, reset: resetInfo } = useVideoInfo();
  const { downloading, progress, error: downloadError, startDownload, reset: resetDownload } = useDownload();
  const [selectedFormatIndex, setSelectedFormatIndex] = useState<number | null>(null);
  const [isLegalOpen, setIsLegalOpen] = useState<boolean>(false);
  const [isWidgetModalOpen, setIsWidgetModalOpen] = useState<boolean>(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('privacy');
  const [currentPlatform, setCurrentPlatform] = useState<Platform>('all');
  const [isGuidesHub, setIsGuidesHub] = useState<boolean>(false);
  const [activeGuideSlug, setActiveGuideSlug] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('snapload_lang') as Language;
      if (saved && TRANSLATIONS[saved]) return saved;
      const navLang = navigator.language.slice(0, 2) as Language;
      if (navLang && TRANSLATIONS[navLang]) return navLang;
    } catch {
      // Fallback to English
    }
    return 'en';
  });

  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
    try {
      localStorage.setItem('snapload_lang', lang);
    } catch {
      // Ignore storage errors
    }
  };

  // Detect route path on initial mount and browser back/forward buttons
  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname;

      // Extract language prefix if present (/es, /de, /fr)
      let lang: Language = 'en';
      let cleanPath = pathname;
      if (pathname.startsWith('/es')) {
        lang = 'es';
        cleanPath = pathname.replace('/es', '') || '/';
      } else if (pathname.startsWith('/de')) {
        lang = 'de';
        cleanPath = pathname.replace('/de', '') || '/';
      } else if (pathname.startsWith('/fr')) {
        lang = 'fr';
        cleanPath = pathname.replace('/fr', '') || '/';
      }
      setCurrentLanguage(lang);

      // Handle legacy /youtube-downloader link gracefully by redirecting to home
      if (cleanPath === '/youtube-downloader') {
        window.history.replaceState({}, '', '/');
        setCurrentPlatform('all');
        setIsGuidesHub(false);
        setActiveGuideSlug(null);
        return;
      }

      if (cleanPath === '/guides') {
        setIsGuidesHub(true);
        setActiveGuideSlug(null);
        return;
      }

      if (cleanPath.startsWith('/guides/')) {
        const slug = cleanPath.replace('/guides/', '');
        if (GUIDES_DATA[slug]) {
          setIsGuidesHub(false);
          setActiveGuideSlug(slug);
          return;
        }
      }

      setIsGuidesHub(false);
      setActiveGuideSlug(null);

      const matchedKey = (Object.keys(PLATFORMS) as Platform[]).find(
        (key) => PLATFORMS[key].path === cleanPath
      ) || 'all';
      setCurrentPlatform(matchedKey);
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Update dynamic document title, meta tags, canonical link, hreflang tags, and BreadcrumbList JSON-LD schema for SEO
  useEffect(() => {
    let title = PLATFORMS[currentPlatform].title;
    let description = PLATFORMS[currentPlatform].description;
    let path = PLATFORMS[currentPlatform].path;
    let label = PLATFORMS[currentPlatform].label;

    if (isGuidesHub) {
      title = 'SnapLoad Video Downloader Tutorials & How-To Guides';
      description = 'Step-by-step guides on how to download TikTok videos without watermark, save Instagram Reels in 1080p HD, and convert videos to MP3 audio.';
      path = '/guides';
      label = 'Guides';
    } else if (activeGuideSlug && GUIDES_DATA[activeGuideSlug]) {
      const guide = GUIDES_DATA[activeGuideSlug];
      title = guide.title;
      description = guide.description;
      path = `/guides/${guide.slug}`;
      label = guide.title;
    }

    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    const currentUrl = `https://snaploaddownload.com${path === '/' ? '' : path}`;

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', currentUrl);
    }

    // Dynamic hreflang tags for multi-language international SEO
    const supportedLangs = ['en', 'de', 'fr', 'es'];
    supportedLangs.forEach((lang) => {
      let link = document.querySelector(`link[hreflang="${lang}"]`) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', lang);
        document.head.appendChild(link);
      }
      link.setAttribute('href', currentUrl);
    });

    let defaultHreflang = document.querySelector('link[hreflang="x-default"]') as HTMLLinkElement | null;
    if (!defaultHreflang) {
      defaultHreflang = document.createElement('link');
      defaultHreflang.setAttribute('rel', 'alternate');
      defaultHreflang.setAttribute('hreflang', 'x-default');
      document.head.appendChild(defaultHreflang);
    }
    defaultHreflang.setAttribute('href', currentUrl);

    // Dynamic BreadcrumbList JSON-LD Schema
    const breadcrumbData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${currentUrl}#breadcrumb`,
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://snaploaddownload.com/'
        },
        ...(path !== '/' ? [{
          '@type': 'ListItem',
          'position': 2,
          'name': label,
          'item': currentUrl
        }] : [])
      ]
    };

    let scriptTag = document.getElementById('breadcrumb-jsonld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'breadcrumb-jsonld';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(breadcrumbData);

    // Dynamic Guide Schema (Article, HowTo, FAQPage) for E-E-A-T and Google Rich Snippets
    let guideScriptTag = document.getElementById('guide-jsonld');
    if (activeGuideSlug && GUIDES_DATA[activeGuideSlug]) {
      const guide = GUIDES_DATA[activeGuideSlug];
      const guideSchema = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Article',
            '@id': `${currentUrl}#article`,
            'headline': guide.title,
            'description': guide.description,
            'mainEntityOfPage': currentUrl,
            'dateModified': '2026-08-12',
            'publisher': {
              '@type': 'Organization',
              'name': 'SnapLoad',
              'url': 'https://snaploaddownload.com/'
            }
          },
          {
            '@type': 'HowTo',
            '@id': `${currentUrl}#howto`,
            'name': guide.title,
            'description': guide.description,
            'step': guide.steps.map((step) => ({
              '@type': 'HowToStep',
              'position': step.stepNumber,
              'name': step.title,
              'text': step.description
            }))
          },
          {
            '@type': 'FAQPage',
            '@id': `${currentUrl}#faq`,
            'mainEntity': guide.faqs.map((faq) => ({
              '@type': 'Question',
              'name': faq.question,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': faq.answer
              }
            }))
          }
        ]
      };

      if (!guideScriptTag) {
        guideScriptTag = document.createElement('script');
        guideScriptTag.id = 'guide-jsonld';
        guideScriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(guideScriptTag);
      }
      guideScriptTag.textContent = JSON.stringify(guideSchema);
    } else if (guideScriptTag) {
      guideScriptTag.remove();
    }
  }, [currentPlatform, isGuidesHub, activeGuideSlug, currentLanguage]);

  const handlePlatformChange = (key: Platform) => {
    setIsGuidesHub(false);
    setActiveGuideSlug(null);
    setCurrentPlatform(key);
    const targetPath = PLATFORMS[key].path;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
  };

  const handleNavigate = (targetPath: string) => {
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    if (targetPath === '/guides') {
      setIsGuidesHub(true);
      setActiveGuideSlug(null);
    } else if (targetPath.startsWith('/guides/')) {
      const slug = targetPath.replace('/guides/', '');
      if (GUIDES_DATA[slug]) {
        setIsGuidesHub(false);
        setActiveGuideSlug(slug);
      }
    } else {
      setIsGuidesHub(false);
      setActiveGuideSlug(null);
      const matchedKey = (Object.keys(PLATFORMS) as Platform[]).find(
        (key) => PLATFORMS[key].path === targetPath
      ) || 'all';
      setCurrentPlatform(matchedKey);
    }
  };

  const handleOpenLegal = useCallback((tab: LegalTab) => {
    setLegalTab(tab);
    setIsLegalOpen(true);
  }, []);

  const handleFetchInfo = useCallback(async (url: string) => {
    setSelectedFormatIndex(null);
    resetDownload();
    await fetchInfo(url);
  }, [fetchInfo, resetDownload]);

  const handleReset = useCallback(() => {
    setSelectedFormatIndex(null);
    resetInfo();
    resetDownload();
  }, [resetInfo, resetDownload]);

  const handleDownload = useCallback(() => {
    if (!videoInfo || selectedFormatIndex === null) return;

    const suggestion = videoInfo.suggestions[selectedFormatIndex];
    if (!suggestion) return;

    const isAudio = suggestion.isAudio || false;

    startDownload({
      url: videoInfo.originalUrl,
      formatId: suggestion.formatId,
      audioFormatId: suggestion.audioFormatId,
      type: isAudio ? 'audio' : 'video',
      title: videoInfo.title,
      quality: '192',
    });
  }, [videoInfo, selectedFormatIndex, startDownload]);

  const selectedSuggestion = selectedFormatIndex !== null
    ? videoInfo?.suggestions[selectedFormatIndex]
    : null;

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  if (currentPlatform === 'widget') {
    return (
      <div className="w-full min-h-screen bg-dark-950 flex items-center justify-center p-2">
        <StandaloneWidgetView
          videoInfo={videoInfo}
          loading={loading}
          error={error}
          onFetchInfo={handleFetchInfo}
          onReset={handleReset}
          selectedFormatIndex={selectedFormatIndex}
          onSelectFormat={setSelectedFormatIndex}
          onDownload={handleDownload}
          downloading={downloading}
          progress={progress}
          downloadError={downloadError}
          currentLanguage={currentLanguage}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Animated background */}
      <div className="app-background">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
      </div>

      {/* Header */}
      <Header currentLanguage={currentLanguage} onLanguageChange={handleLanguageChange} />

      {/* Main Content */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 pb-8">
        {/* Platform & Guides Quick Switcher Pills for SEO Routing */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 mb-6 animate-fade-in">
          {(Object.keys(PLATFORMS) as Platform[]).map((key) => {
            const isSelected = !isGuidesHub && !activeGuideSlug && currentPlatform === key;
            const labelText = t.nav[key] || PLATFORMS[key].label;
            return (
              <button
                key={key}
                onClick={() => handlePlatformChange(key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-glow scale-105'
                    : 'glass-subtle dark:text-white/70 text-dark-600 hover:bg-white/[0.1] hover:text-white'
                }`}
              >
                {labelText}
              </button>
            );
          })}
          <button
            onClick={() => handleNavigate('/guides')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              isGuidesHub || activeGuideSlug
                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-glow scale-105'
                : 'glass-subtle dark:text-white/70 text-dark-600 hover:bg-white/[0.1] hover:text-white'
            }`}
          >
            📖 Guides &amp; How-To
          </button>
        </div>

        {/* Render Guides Hub or Detail Page if Active */}
        {isGuidesHub ? (
          <GuidesHub onSelectGuide={(slug) => handleNavigate(`/guides/${slug}`)} />
        ) : activeGuideSlug && GUIDES_DATA[activeGuideSlug] ? (
          <GuideDetailPage
            guide={GUIDES_DATA[activeGuideSlug]}
            onBack={() => handleNavigate('/guides')}
            onFetchInfo={handleFetchInfo}
            loading={loading}
            onReset={handleReset}
          />
        ) : (
          <>
            {/* Dynamic SEO Hero Section */}
            <div className="text-center mb-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-4 shadow-xs">
                <span className="text-amber-400 tracking-widest">★★★★★</span>
                <span className="dark:text-white/80 text-dark-800">4.9 / 5 Rating</span>
                <span className="dark:text-white/40 text-dark-400 font-normal">(1,280+ Reviews)</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold dark:text-white text-dark-900 leading-tight">
                {(t.hero[currentPlatform] || t.hero.all).heading}
                <br />
                <span className="gradient-text">{(t.hero[currentPlatform] || t.hero.all).highlight}</span>
              </h1>
              <p className="mt-4 text-sm sm:text-base dark:text-white/45 text-dark-500 max-w-lg mx-auto leading-relaxed">
                {(t.hero[currentPlatform] || t.hero.all).sub}
              </p>
            </div>

            {/* URL Input */}
            <div className="mb-8">
              <UrlInput onSubmit={handleFetchInfo} loading={loading} onReset={handleReset} currentLanguage={currentLanguage} />
            </div>

            {/* Recent Downloads History */}
            <DownloadHistory onSelectUrl={handleFetchInfo} />
          </>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="space-y-4 animate-fade-in my-6">
            <div className="glass rounded-2xl overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-72 w-full aspect-video sm:aspect-auto skeleton rounded-none" />
                <div className="flex-1 p-5 space-y-3">
                  <div className="h-4 w-20 skeleton rounded-full" />
                  <div className="h-6 w-3/4 skeleton rounded-lg" />
                  <div className="h-4 w-1/3 skeleton rounded-lg" />
                  <div className="h-3 w-1/4 skeleton rounded-lg" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 skeleton rounded-xl" />
              ))}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && !loading && (
          <div className="mb-6">
            <ErrorMessage message={error} onDismiss={handleReset} />
          </div>
        )}

        {/* Video Preview & Format Selection */}
        {videoInfo && !loading && !error && (
          <div className="space-y-6">
            {/* Preview Card */}
            <VideoPreview info={videoInfo} />

            {/* In-Feed Ad Banner (AdSense Slot 2) */}
            <AdBanner slot="in-feed-slot" label="Sponsored" />

            {/* Format Selector */}
            <FormatSelector
              suggestions={videoInfo.suggestions}
              selectedIndex={selectedFormatIndex}
              onSelect={setSelectedFormatIndex}
            />

            {/* Download Error */}
            {downloadError && (
              <div className="mb-4">
                <ErrorMessage message={downloadError} onDismiss={() => resetDownload()} />
              </div>
            )}

            {/* Progress Bar */}
            <ProgressBar progress={progress} isActive={downloading} />

            {/* Download Button */}
            <DownloadButton
              onClick={handleDownload}
              disabled={selectedFormatIndex === null}
              downloading={downloading}
              isAudio={selectedSuggestion?.isAudio || false}
            />

            {/* Cancel / Download Another */}
            {downloading && (
              <div className="text-center mt-4">
                <button
                  onClick={handleReset}
                  className="text-sm dark:text-white/40 text-dark-400 hover:text-red-400 transition-colors underline underline-offset-2 cursor-pointer"
                >
                  Cancel &amp; Start Over
                </button>
              </div>
            )}
          </div>
        )}

        {/* Platform-Specific SEO & FAQ Content (When Idle on Main Downloader Routes) */}
        {!isGuidesHub && !activeGuideSlug && !videoInfo && !loading && !error && (
          <>
            <SeoContentSection platform={currentPlatform} />
            <AdBanner slot="bottom-banner-slot" label="Advertisement" className="mt-12" />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenLegal={handleOpenLegal}
        onOpenWidget={() => setIsWidgetModalOpen(true)}
      />

      {/* Embed Widget Modal */}
      <EmbedWidgetModal
        isOpen={isWidgetModalOpen}
        onClose={() => setIsWidgetModalOpen(false)}
      />

      {/* Legal Modal (AdSense Policies) */}
      <LegalModal
        isOpen={isLegalOpen}
        activeTab={legalTab}
        onClose={() => setIsLegalOpen(false)}
        onTabChange={setLegalTab}
      />

      {/* GDPR / CCPA Cookie Consent Banner */}
      <CookieConsent />

      {/* PWA Install Banner */}
      <InstallPwaBanner />
    </div>
  );
}

export default App;
