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
import { useVideoInfo } from './hooks/useVideoInfo';
import { useDownload } from './hooks/useDownload';
import './App.css';

type Platform = 'all' | 'tiktok' | 'instagram' | 'mp3' | 'youtube';

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
    heroSub: 'Paste a link from TikTok, Instagram, or YouTube. Choose your quality and download instantly — no signup required.',
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
  instagram: {
    path: '/instagram-downloader',
    label: 'Instagram Reels',
    title: 'Instagram Reels Downloader 1080p HD — Free Video Saver | SnapLoad',
    description: 'Download Instagram Reels, videos, IGTV clips & photos in original high definition. Free online Instagram downloader for mobile and desktop.',
    heroHeading: 'Instagram Reels & Video',
    heroHighlight: 'Downloader HD',
    heroSub: 'Save high-definition Instagram Reels, clips, and video posts directly to your phone or computer.',
  },
  mp3: {
    path: '/mp3-downloader',
    label: 'MP3 Converter',
    title: 'Video to MP3 Converter Online — High Quality Audio Extraction | SnapLoad',
    description: 'Convert video links from TikTok, Instagram & YouTube into 320kbps MP3 audio files. Free, fast audio extractor with no registration required.',
    heroHeading: 'Video to MP3',
    heroHighlight: 'Audio Converter',
    heroSub: 'Extract high-bitrate MP3 audio tracks directly from TikTok, Instagram, or YouTube video links.',
  },
  youtube: {
    path: '/youtube-downloader',
    label: 'YouTube Shorts',
    title: 'YouTube Shorts & Video Downloader 1080p HD — Free Saver | SnapLoad',
    description: 'Download YouTube Shorts and full videos in 1080p HD, 4K or extract MP3 audio. Fast online YouTube video downloader, free and unlimited.',
    heroHeading: 'YouTube Video & Shorts',
    heroHighlight: 'Downloader',
    heroSub: 'Save YouTube Shorts and full length HD videos directly to your device for offline viewing.',
  },
};

function App() {
  const { videoInfo, loading, error, fetchInfo, reset: resetInfo } = useVideoInfo();
  const { downloading, progress, error: downloadError, startDownload, reset: resetDownload } = useDownload();
  const [selectedFormatIndex, setSelectedFormatIndex] = useState<number | null>(null);
  const [isLegalOpen, setIsLegalOpen] = useState<boolean>(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('privacy');
  const [currentPlatform, setCurrentPlatform] = useState<Platform>('all');

  // Detect route path on initial mount and browser back/forward buttons
  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname;
      const matchedKey = (Object.keys(PLATFORMS) as Platform[]).find(
        (key) => PLATFORMS[key].path === pathname
      ) || 'all';
      setCurrentPlatform(matchedKey);
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Update dynamic document title, meta tags, and canonical link for SEO
  useEffect(() => {
    const seo = PLATFORMS[currentPlatform];
    document.title = seo.title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', seo.description);
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `https://snaploaddownload.com${seo.path === '/' ? '' : seo.path}`);
    }
  }, [currentPlatform]);

  const handlePlatformChange = (key: Platform) => {
    setCurrentPlatform(key);
    const targetPath = PLATFORMS[key].path;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
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

  const currentSEO = PLATFORMS[currentPlatform];

  return (
    <div className="min-h-screen relative">
      {/* Animated background */}
      <div className="app-background">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
      </div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 pb-8">
        {/* Platform Quick Switcher Pills for SEO Routing */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 mb-6 animate-fade-in">
          {(Object.keys(PLATFORMS) as Platform[]).map((key) => {
            const isSelected = currentPlatform === key;
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
                {PLATFORMS[key].label}
              </button>
            );
          })}
        </div>

        {/* Dynamic SEO Hero Section */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-5xl font-extrabold dark:text-white text-dark-900 leading-tight">
            {currentSEO.heroHeading}
            <br />
            <span className="gradient-text">{currentSEO.heroHighlight}</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base dark:text-white/45 text-dark-500 max-w-lg mx-auto leading-relaxed">
            {currentSEO.heroSub}
          </p>
        </div>

        {/* URL Input */}
        <div className="mb-8">
          <UrlInput onSubmit={handleFetchInfo} loading={loading} onReset={handleReset} />
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="space-y-4 animate-fade-in">
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

        {/* Features Section (when idle) */}
        {!videoInfo && !loading && !error && (
          <div className="space-y-12">
            {/* Features Grid */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8 text-primary-500 dark:text-primary-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: 'Lightning Fast',
                  desc: 'Direct streaming — no waiting for server-side processing',
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-primary-500 dark:text-primary-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  ),
                  title: 'Secure & Private',
                  desc: 'No files stored on our servers. Downloads stream directly to you',
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-primary-500 dark:text-primary-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: 'Up to 4K Quality',
                  desc: 'Download in the highest available quality including 4K & 1080p',
                },
              ].map((feature) => (
                <div key={feature.title} className="glass-subtle rounded-2xl p-5 text-center
                                                     hover:bg-white/[0.08] transition-all duration-300
                                                     group cursor-default">
                  <div className="mb-3 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-sm font-bold dark:text-white text-dark-900 mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-xs dark:text-white/35 text-dark-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* SEO Keyword & Guide Content Section */}
            <section className="glass rounded-2xl p-6 sm:p-8 space-y-6 text-left border border-white/10 dark:border-white/5">
              <h2 className="text-2xl font-bold dark:text-white text-dark-900 tracking-tight">
                Universal HD Video &amp; MP3 Downloader
              </h2>
              <p className="text-sm dark:text-white/70 text-dark-600 leading-relaxed">
                SnapLoad is a free, high-speed online video downloader designed to help you save HD videos and extract audio tracks effortlessly from leading social video platforms like TikTok, Instagram, and YouTube.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <article className="space-y-2">
                  <h3 className="text-base font-semibold text-primary-400 dark:text-primary-300">
                    TikTok Downloader (No Watermark)
                  </h3>
                  <p className="text-xs dark:text-white/50 text-dark-500 leading-relaxed">
                    Download full HD TikTok videos without logo watermarks. Save trending clips, dances, and tutorials directly to your device.
                  </p>
                </article>

                <article className="space-y-2">
                  <h3 className="text-base font-semibold text-accent-400 dark:text-accent-300">
                    Instagram Reels &amp; Posts
                  </h3>
                  <p className="text-xs dark:text-white/50 text-dark-500 leading-relaxed">
                    Save Instagram Reels, video posts, and IGTV clips in original crisp 1080p high definition with audio included.
                  </p>
                </article>

                <article className="space-y-2">
                  <h3 className="text-base font-semibold text-emerald-400 dark:text-emerald-300">
                    MP3 Audio Extraction
                  </h3>
                  <p className="text-xs dark:text-white/50 text-dark-500 leading-relaxed">
                    Convert any video link into high-bitrate MP3 audio. Ideal for saving background songs, voiceovers, and podcasts.
                  </p>
                </article>
              </div>

              {/* How It Works Steps */}
              <div className="pt-6 border-t border-white/10 dark:border-white/5 space-y-4">
                <h3 className="text-lg font-bold dark:text-white text-dark-900">
                  How to Download Videos Online
                </h3>
                <ol className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs dark:text-white/60 text-dark-600">
                  <li className="glass-subtle p-4 rounded-xl space-y-1">
                    <span className="font-bold text-primary-400 text-sm">1. Copy Link</span>
                    <p>Copy the video URL from TikTok, Instagram, or YouTube.</p>
                  </li>
                  <li className="glass-subtle p-4 rounded-xl space-y-1">
                    <span className="font-bold text-primary-400 text-sm">2. Paste URL</span>
                    <p>Paste the link into the search box above and click Download.</p>
                  </li>
                  <li className="glass-subtle p-4 rounded-xl space-y-1">
                    <span className="font-bold text-primary-400 text-sm">3. Choose Quality</span>
                    <p>Select video resolution (1080p HD, 720p) or MP3 audio format.</p>
                  </li>
                </ol>
              </div>

              {/* Frequently Asked Questions */}
              <div className="pt-6 border-t border-white/10 dark:border-white/5 space-y-4">
                <h3 className="text-lg font-bold dark:text-white text-dark-900">
                  Frequently Asked Questions (FAQ)
                </h3>
                <div className="space-y-3 text-xs">
                  <details className="glass-subtle p-4 rounded-xl cursor-pointer group" open>
                    <summary className="font-semibold dark:text-white text-dark-900 group-hover:text-primary-400 transition-colors">
                      Is SnapLoad free to use?
                    </summary>
                    <p className="mt-2 dark:text-white/50 text-dark-500 leading-relaxed">
                      Yes, SnapLoad is 100% free. There are no download limits, subscription fees, or account registration requirements.
                    </p>
                  </details>

                  <details className="glass-subtle p-4 rounded-xl cursor-pointer group">
                    <summary className="font-semibold dark:text-white text-dark-900 group-hover:text-primary-400 transition-colors">
                      Can I download TikTok videos without watermark?
                    </summary>
                    <p className="mt-2 dark:text-white/50 text-dark-500 leading-relaxed">
                      Yes, SnapLoad automatically parses and strips TikTok watermarks so you get clean, high-definition video files.
                    </p>
                  </details>

                  <details className="glass-subtle p-4 rounded-xl cursor-pointer group">
                    <summary className="font-semibold dark:text-white text-dark-900 group-hover:text-primary-400 transition-colors">
                      Can I convert videos to MP3 audio files?
                    </summary>
                    <p className="mt-2 dark:text-white/50 text-dark-500 leading-relaxed">
                      Yes! Select the MP3 format option after pasting your video link to extract crisp audio tracks directly.
                    </p>
                  </details>

                  <details className="glass-subtle p-4 rounded-xl cursor-pointer group">
                    <summary className="font-semibold dark:text-white text-dark-900 group-hover:text-primary-400 transition-colors">
                      Are downloaded files stored on your servers?
                    </summary>
                    <p className="mt-2 dark:text-white/50 text-dark-500 leading-relaxed">
                      No. All media transfers are streamed directly to your browser without saving copies or user logs on our servers.
                    </p>
                  </details>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onOpenLegal={handleOpenLegal} />

      {/* Legal Modal (AdSense Policies) */}
      <LegalModal
        isOpen={isLegalOpen}
        activeTab={legalTab}
        onClose={() => setIsLegalOpen(false)}
        onTabChange={setLegalTab}
      />
    </div>
  );
}

export default App;
