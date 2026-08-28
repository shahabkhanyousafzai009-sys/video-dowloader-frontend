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
import { Language, TRANSLATIONS, LANGUAGE_LABELS } from './utils/i18n';
import { EmbedWidgetModal } from './components/EmbedWidgetModal';
import { StandaloneWidgetView } from './components/StandaloneWidgetView';
import { LegalPage, LegalPageType } from './components/LegalPage';
import { BlogHub } from './components/BlogHub';
import { BlogPostPage } from './components/BlogPostPage';
import { BLOG_POSTS } from './data/blogData';
import { AboutUsPage } from './components/AboutUsPage';
import { ContactUsPage } from './components/ContactUsPage';
import { FaqPage } from './components/FaqPage';
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
    title: 'SnapLoad — TikTok Video Downloader No Watermark & MP3',
    description: 'Free online TikTok video downloader & Instagram Reels saver in 1080p HD. Save watermark-free videos & 320kbps MP3 audio free with no account needed.',
    heroHeading: 'TikTok Downloader &',
    heroHighlight: 'TikTok Video Saver HD',
    heroSub: 'Paste a link from TikTok or Instagram. Save watermark-free TikTok videos, HD Reels, and 320kbps MP3 audio instantly — 100% free and no account needed.',
  },
  tiktok: {
    path: '/tiktok-downloader',
    label: 'TikTok No Watermark',
    title: 'TikTok Downloader Without Watermark HD — TikTok Video Downloader | SnapLoad',
    description: 'Download TikTok videos without watermark in 1080p Full HD for free. Fast online TikTok video downloader & 320kbps MP3 extractor with no registration.',
    heroHeading: 'TikTok Downloader',
    heroHighlight: 'Without Watermark',
    heroSub: 'Paste your TikTok video link below to save clean, watermark-free HD videos directly to your device.',
  },
  'tiktok-mp3': {
    path: '/tiktok-mp3-downloader',
    label: 'TikTok MP3',
    title: 'TikTok MP3 Sound Downloader — Extract 320kbps Audio Free | SnapLoad',
    description: 'Extract and download high quality 320kbps MP3 audio tracks directly from any viral TikTok video link for free with zero account signup.',
    heroHeading: 'TikTok Sound to MP3',
    heroHighlight: 'Audio Converter',
    heroSub: 'Extract high-bitrate MP3 audio tracks directly from viral TikTok video links in seconds.',
  },
  instagram: {
    path: '/instagram-downloader',
    label: 'Instagram Downloader',
    title: 'Instagram Video Downloader 1080p HD — Instagram Reels Saver | SnapLoad',
    description: 'Free online Instagram video downloader to save Instagram Reels, posts & stories in 1080p HD. Best free iGram & SnapInst alternative with zero signup.',
    heroHeading: 'Instagram Video & Reels',
    heroHighlight: 'Downloader 1080p HD',
    heroSub: 'Paste any Instagram Reel, Video, Story, or Post link below to save original 1080p HD media instantly — 100% free with no login required.',
  },
  'youtube-shorts': {
    path: '/youtube-shorts-downloader',
    label: 'YouTube Shorts',
    title: 'YouTube Shorts Downloader 1080p HD — Free MP4 & 320kbps MP3 Saver | SnapLoad',
    description: 'Download YouTube Shorts videos in MP4 1080p HD or extract 320kbps MP3 audio tracks for free. Fast online Shorts downloader with zero account required.',
    heroHeading: 'YouTube Shorts',
    heroHighlight: 'Downloader HD & MP3',
    heroSub: 'Download YouTube Shorts clips in full 1080p HD resolution or convert to MP3 audio files.',
  },
  mp3: {
    path: '/mp3-downloader',
    label: 'MP3 Converter',
    title: 'Video to MP3 Converter Online — High Quality 320kbps Audio Extraction | SnapLoad',
    description: 'Convert video links from TikTok & Instagram into 320kbps MP3 audio files. Free online audio extractor with no registration required.',
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

const findBlogPostSlug = (rawSlug: string): string | null => {
  if (!rawSlug) return null;
  try {
    const decoded = decodeURIComponent(rawSlug).trim().toLowerCase();
    if (BLOG_POSTS[decoded]) return decoded;
    const normalized = decoded.replace(/[\s_]+/g, '-');
    if (BLOG_POSTS[normalized]) return normalized;
    const matched = Object.keys(BLOG_POSTS).find(
      (key) => key.toLowerCase() === normalized || key.toLowerCase() === decoded
    );
    return matched || null;
  } catch {
    return null;
  }
};

const findGuideSlug = (rawSlug: string): string | null => {
  if (!rawSlug) return null;
  try {
    const decoded = decodeURIComponent(rawSlug).trim().toLowerCase();
    if (GUIDES_DATA[decoded]) return decoded;
    const normalized = decoded.replace(/[\s_]+/g, '-');
    if (GUIDES_DATA[normalized]) return normalized;
    const matched = Object.keys(GUIDES_DATA).find(
      (key) => key.toLowerCase() === normalized || key.toLowerCase() === decoded
    );
    return matched || null;
  } catch {
    return null;
  }
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
  const [activeLegalPage, setActiveLegalPage] = useState<LegalPageType | null>(null);
  const [isBlogHub, setIsBlogHub] = useState<boolean>(false);
  const [activeBlogPostSlug, setActiveBlogPostSlug] = useState<string | null>(null);
  const [isAboutUsPage, setIsAboutUsPage] = useState<boolean>(false);
  const [isContactUsPage, setIsContactUsPage] = useState<boolean>(false);
  const [isFaqPage, setIsFaqPage] = useState<boolean>(false);
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

    // Update browser URL bar to match language prefix for SEO and deep linking
    const pathname = window.location.pathname;
    let cleanPath = pathname;
    const allLangKeys = Object.keys(LANGUAGE_LABELS) as Language[];
    for (const lKey of allLangKeys) {
      if (lKey === 'en') continue;
      const prefix = `/${lKey}`;
      if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
        cleanPath = pathname.replace(prefix, '') || '/';
        break;
      }
    }

    const targetPath = lang === 'en' ? cleanPath : `/${lang}${cleanPath === '/' ? '' : cleanPath}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
  };

  // Reset all page view flags helper
  const resetAllViews = () => {
    setIsGuidesHub(false);
    setActiveGuideSlug(null);
    setActiveLegalPage(null);
    setIsBlogHub(false);
    setActiveBlogPostSlug(null);
    setIsAboutUsPage(false);
    setIsContactUsPage(false);
    setIsFaqPage(false);
  };

  // Detect route path on initial mount and browser back/forward buttons
  useEffect(() => {
    const handleLocationChange = () => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      const pathname = window.location.pathname;

      // Extract language prefix if present (dynamic lookup across all 50 global languages)
      let lang: Language = 'en';
      let cleanPath = pathname;
      const allLangKeys = Object.keys(LANGUAGE_LABELS) as Language[];
      for (const lKey of allLangKeys) {
        if (lKey === 'en') continue;
        const prefix = `/${lKey}`;
        if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
          lang = lKey;
          cleanPath = pathname.replace(prefix, '') || '/';
          break;
        }
      }
      setCurrentLanguage(lang);

      resetAllViews();

      // Handle legacy /youtube-downloader link gracefully by redirecting to home
      if (cleanPath === '/youtube-downloader') {
        window.history.replaceState({}, '', '/');
        setCurrentPlatform('all');
        return;
      }

      // About Us & Information Routes
      if (cleanPath === '/about-us' || cleanPath === '/about' || cleanPath === '/information' || cleanPath === '/information-about-snapload') {
        setIsAboutUsPage(true);
        return;
      }

      // Contact Us Routes
      if (cleanPath === '/contact-us' || cleanPath === '/contact') {
        setIsContactUsPage(true);
        return;
      }

      // FAQ Route
      if (cleanPath === '/faq' || cleanPath === '/faqs') {
        setIsFaqPage(true);
        return;
      }

      // Blog Index Route
      if (cleanPath === '/blog') {
        setIsBlogHub(true);
        return;
      }

      // Blog Article Route
      if (cleanPath.startsWith('/blog/')) {
        const rawSlug = cleanPath.replace('/blog/', '');
        const matchedSlug = findBlogPostSlug(rawSlug);
        if (matchedSlug) {
          setActiveBlogPostSlug(matchedSlug);
          return;
        }
        setIsBlogHub(true);
        return;
      }

      // Standalone Legal / Policy Routes
      const legalRoutes: Record<string, LegalPageType> = {
        '/privacy-policy': 'privacy',
        '/terms-of-service': 'terms',
        '/dmca-policy': 'dmca',
        '/disclaimer': 'disclaimer',
        '/cookie-policy': 'cookies',
      };

      if (legalRoutes[cleanPath]) {
        setActiveLegalPage(legalRoutes[cleanPath]);
        return;
      }

      // Guides Hub Route
      if (cleanPath === '/guides') {
        setIsGuidesHub(true);
        return;
      }

      // Guide Detail Route
      if (cleanPath.startsWith('/guides/')) {
        const rawSlug = cleanPath.replace('/guides/', '');
        const matchedSlug = findGuideSlug(rawSlug);
        if (matchedSlug) {
          setActiveGuideSlug(matchedSlug);
          return;
        }
        setIsGuidesHub(true);
        return;
      }

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

    if (isAboutUsPage) {
      title = 'About Us — Mission & Technical Standards | SnapLoad';
      description = 'Learn about SnapLoad mission, privacy engineering standards, technology architecture, and technical editorial team.';
      path = '/about-us';
      label = 'About Us';
    } else if (isContactUsPage) {
      title = 'Contact Us & Customer Support | SnapLoad';
      description = 'Contact the SnapLoad technical support team and Copyright Agent for inquiries, bug reports, and copyright notifications.';
      path = '/contact-us';
      label = 'Contact Us';
    } else if (isFaqPage) {
      title = 'Frequently Asked Questions (FAQ) — SnapLoad Video Downloader';
      description = 'Find fast answers to common questions about downloading TikTok videos without watermark, saving 1080p Instagram Reels, and 320kbps MP3 conversion.';
      path = '/faq';
      label = 'FAQ';
    } else if (isBlogHub) {
      title = 'SnapLoad Blog & Knowledge Base — Media Tutorials & Guides';
      description = 'In-depth articles, tutorials, and technical manuals on downloading TikTok videos without watermark, saving 1080p Instagram Reels, and 320kbps MP3 conversion.';
      path = '/blog';
      label = 'Blog';
    } else if (activeBlogPostSlug && BLOG_POSTS[activeBlogPostSlug]) {
      const post = BLOG_POSTS[activeBlogPostSlug];
      title = `${post.title} | SnapLoad Blog`;
      description = post.excerpt;
      path = `/blog/${post.slug}`;
      label = post.title;
    } else if (activeLegalPage) {
      const legalMeta: Record<LegalPageType, { title: string; desc: string; path: string }> = {
        privacy: {
          title: 'Privacy Policy — SnapLoad Video Downloader',
          desc: 'Official SnapLoad Privacy Policy. Learn about our zero-log architecture, zero server media storage, GDPR and CCPA privacy protections.',
          path: '/privacy-policy',
        },
        terms: {
          title: 'Terms of Service — SnapLoad Video Downloader',
          desc: 'SnapLoad Terms of Service detailing permitted personal, non-commercial fair use of our online media downloading utility.',
          path: '/terms-of-service',
        },
        dmca: {
          title: 'DMCA Copyright Policy & Takedown Agent — SnapLoad',
          desc: 'Digital Millennium Copyright Act (DMCA) policy, copyright infringement notification procedures, and Designated Agent contact for SnapLoad.',
          path: '/dmca-policy',
        },
        about: {
          title: 'About Us — Mission & Standards — SnapLoad',
          desc: 'Learn about SnapLoad mission, privacy engineering standards, technology architecture, and technical editorial team.',
          path: '/about-us',
        },
        contact: {
          title: 'Contact Us & Customer Support — SnapLoad',
          desc: 'Contact the SnapLoad technical support team and Copyright Agent for inquiries, bug reports, and copyright notifications.',
          path: '/contact',
        },
        disclaimer: {
          title: 'Legal Disclaimer & Platform Notice — SnapLoad',
          desc: 'Official legal disclaimers regarding third-party platform trademarks, non-affiliation, and copyright compliance.',
          path: '/disclaimer',
        },
        cookies: {
          title: 'Cookie Policy — SnapLoad Video Downloader',
          desc: 'Comprehensive explanation of cookies, web beacons, Google AdSense advertising cookies, and privacy management on SnapLoad.',
          path: '/cookie-policy',
        },
      };
      const currentMeta = legalMeta[activeLegalPage];
      title = currentMeta.title;
      description = currentMeta.desc;
      path = currentMeta.path;
      label = activeLegalPage.toUpperCase();
    } else if (isGuidesHub) {
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

    // Dynamic Open Graph Meta Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', currentUrl);

    // Dynamic Twitter Meta Tags
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', title);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', description);

    const twUrl = document.querySelector('meta[name="twitter:url"]');
    if (twUrl) twUrl.setAttribute('content', currentUrl);

    // Dynamic hreflang tags for all 50 global languages for international SEO
    const supportedLangs = Object.keys(LANGUAGE_LABELS) as Language[];
    supportedLangs.forEach((lang) => {
      let link = document.querySelector(`link[hreflang="${lang}"]`) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', lang);
        document.head.appendChild(link);
      }
      const langPath = lang === 'en' ? path : `/${lang}${path === '/' ? '' : path}`;
      link.setAttribute('href', `https://snaploaddownload.com${langPath}`);
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

    // SiteNavigationElement Schema for SEO Sitelinks Discovery
    const siteNavSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SiteNavigationElement',
          '@id': 'https://snaploaddownload.com/#nav-tiktok',
          'name': 'TikTok Downloader Without Watermark',
          'url': 'https://snaploaddownload.com/tiktok-downloader'
        },
        {
          '@type': 'SiteNavigationElement',
          '@id': 'https://snaploaddownload.com/#nav-tiktok-mp3',
          'name': 'TikTok MP3 Sound Extractor',
          'url': 'https://snaploaddownload.com/tiktok-mp3-downloader'
        },
        {
          '@type': 'SiteNavigationElement',
          '@id': 'https://snaploaddownload.com/#nav-instagram',
          'name': 'Instagram Reels Downloader HD',
          'url': 'https://snaploaddownload.com/instagram-downloader'
        },
        {
          '@type': 'SiteNavigationElement',
          '@id': 'https://snaploaddownload.com/#nav-youtube',
          'name': 'YouTube Shorts Downloader',
          'url': 'https://snaploaddownload.com/youtube-shorts-downloader'
        },
        {
          '@type': 'SiteNavigationElement',
          '@id': 'https://snaploaddownload.com/#nav-mp3',
          'name': 'Video to MP3 Converter',
          'url': 'https://snaploaddownload.com/mp3-downloader'
        },
        {
          '@type': 'SiteNavigationElement',
          '@id': 'https://snaploaddownload.com/#nav-blog',
          'name': 'Blog & Knowledge Base',
          'url': 'https://snaploaddownload.com/blog'
        }
      ]
    };

    let navScriptTag = document.getElementById('sitenav-jsonld');
    if (!navScriptTag) {
      navScriptTag = document.createElement('script');
      navScriptTag.id = 'sitenav-jsonld';
      navScriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(navScriptTag);
    }
    navScriptTag.textContent = JSON.stringify(siteNavSchema);

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
  }, [currentPlatform, isGuidesHub, activeGuideSlug, activeLegalPage, isBlogHub, activeBlogPostSlug, isAboutUsPage, isContactUsPage, currentLanguage]);

  const handlePlatformChange = (key: Platform) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    resetAllViews();
    setCurrentPlatform(key);
    const targetPath = PLATFORMS[key].path;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
  };

  const handleNavigate = (targetPath: string) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }

    resetAllViews();

    if (targetPath === '/about-us' || targetPath === '/about' || targetPath === '/information' || targetPath === '/information-about-snapload') {
      setIsAboutUsPage(true);
      return;
    }

    if (targetPath === '/contact-us' || targetPath === '/contact') {
      setIsContactUsPage(true);
      return;
    }

    if (targetPath === '/faq' || targetPath === '/faqs') {
      setIsFaqPage(true);
      return;
    }

    if (targetPath === '/blog') {
      setIsBlogHub(true);
      return;
    }

    if (targetPath.startsWith('/blog/')) {
      const rawSlug = targetPath.replace('/blog/', '');
      const matchedSlug = findBlogPostSlug(rawSlug);
      if (matchedSlug) {
        setActiveBlogPostSlug(matchedSlug);
        return;
      }
      setIsBlogHub(true);
      return;
    }

    const legalRoutes: Record<string, LegalPageType> = {
      '/privacy-policy': 'privacy',
      '/terms-of-service': 'terms',
      '/dmca-policy': 'dmca',
      '/disclaimer': 'disclaimer',
      '/cookie-policy': 'cookies',
    };

    if (legalRoutes[targetPath]) {
      setActiveLegalPage(legalRoutes[targetPath]);
      return;
    }

    if (targetPath === '/guides') {
      setIsGuidesHub(true);
    } else if (targetPath.startsWith('/guides/')) {
      const rawSlug = targetPath.replace('/guides/', '');
      const matchedSlug = findGuideSlug(rawSlug);
      if (matchedSlug) {
        setActiveGuideSlug(matchedSlug);
        return;
      }
      setIsGuidesHub(true);
    } else {
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
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        onNavigate={handleNavigate}
        currentPlatform={currentPlatform}
        onOpenWidgetModal={() => setIsWidgetModalOpen(true)}
      />

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
        {/* Render View Components */}
        {isAboutUsPage ? (
          <AboutUsPage onNavigateHome={() => handleNavigate('/')} />
        ) : isContactUsPage ? (
          <ContactUsPage onNavigateHome={() => handleNavigate('/')} />
        ) : isFaqPage ? (
          <FaqPage onNavigateHome={() => handleNavigate('/')} onNavigateContact={() => handleNavigate('/contact-us')} />
        ) : isBlogHub ? (
          <BlogHub onSelectPost={(slug) => handleNavigate(`/blog/${slug}`)} onNavigateHome={() => handleNavigate('/')} />
        ) : activeBlogPostSlug && BLOG_POSTS[activeBlogPostSlug] ? (
          <BlogPostPage
            post={BLOG_POSTS[activeBlogPostSlug]}
            onBack={() => handleNavigate('/blog')}
            onNavigateHome={() => handleNavigate('/')}
            onSelectPost={(slug) => handleNavigate(`/blog/${slug}`)}
          />
        ) : activeLegalPage ? (
          <LegalPage type={activeLegalPage} onNavigate={handleNavigate} />
        ) : isGuidesHub ? (
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
            {/* Full-Bleed Edge-to-Edge Hero Banner with Vibrant Background Color */}
            <div className="instagram-vibrant-hero w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-10 sm:py-16 -mt-4 mb-10 shadow-lg text-center space-y-6 animate-fade-in px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto space-y-6">
                
                {/* Rating Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs sm:text-sm font-semibold shadow-sm backdrop-blur-md">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-amber-300 shrink-0">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span className="text-white font-bold">4.9 / 5 Rating</span>
                  <span className="text-white/70 font-normal">(1,280+ Reviews)</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl mx-auto drop-shadow-md">
                  {(t.hero[currentPlatform] || t.hero.all).heading}{' '}
                  <span className="underline decoration-white/30 underline-offset-8">{(t.hero[currentPlatform] || t.hero.all).highlight}</span>
                </h1>

                {/* Subheading */}
                <p className="text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-xs">
                  {(t.hero[currentPlatform] || t.hero.all).sub}
                </p>

                {/* Interactive Search Bar */}
                <div className="pt-2">
                  <UrlInput onSubmit={handleFetchInfo} loading={loading} onReset={handleReset} currentLanguage={currentLanguage} />
                </div>

                {/* Download History */}
                <div className="max-w-3xl mx-auto pt-2">
                  <DownloadHistory onSelectUrl={handleFetchInfo} />
                </div>

              </div>
            </div>
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

        {/* Video Preview & Format Selection (Strictly No AdSense Ads on Tool Result State) */}
        {videoInfo && !loading && !error && (
          <div className="space-y-6">
            {/* Preview Card */}
            <VideoPreview info={videoInfo} />

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
        {!isAboutUsPage && !isContactUsPage && !isBlogHub && !activeBlogPostSlug && !activeLegalPage && !isGuidesHub && !activeGuideSlug && !videoInfo && !loading && !error && (
          <>
            <SeoContentSection platform={currentPlatform} currentLanguage={currentLanguage} />
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
