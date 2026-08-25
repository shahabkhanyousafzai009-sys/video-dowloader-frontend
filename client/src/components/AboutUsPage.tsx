import React, { useEffect } from 'react';

interface AboutUsPageProps {
  onNavigateHome: () => void;
  onNavigateContact?: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onNavigateHome, onNavigateContact }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Information About SnapLoad — Technology, Mission & Architecture';

    // Inject AboutPage Organization JSON-LD Schema
    const aboutSchema = {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': 'https://snaploaddownload.com/about-us#aboutpage',
      'name': 'Information About SnapLoad',
      'description': 'Comprehensive overview of SnapLoad video downloader mission, CDN stream manifest parsing technology, zero-storage privacy architecture, and engineering standards.',
      'publisher': {
        '@type': 'Organization',
        'name': 'SnapLoad',
        'url': 'https://snaploaddownload.com/',
        'logo': 'https://snaploaddownload.com/logo.png',
        'email': 'shahabkhanyousafzai009@gmail.com',
      },
    };

    let scriptTag = document.getElementById('aboutpage-jsonld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'aboutpage-jsonld';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(aboutSchema);

    return () => {
      if (scriptTag) scriptTag.remove();
    };
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 animate-fade-in space-y-10 text-left">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold dark:text-white/50 text-slate-500">
        <button onClick={onNavigateHome} className="hover:text-primary-400 transition-colors cursor-pointer">
          Home
        </button>
        <span>/</span>
        <span className="dark:text-white text-slate-900 font-bold">About SnapLoad</span>
      </nav>

      {/* Hero Header */}
      <header className="glass-strong rounded-3xl p-8 sm:p-12 border border-slate-200/80 dark:border-white/10 shadow-2xl space-y-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-400 text-xs font-extrabold">
          <span>⚙️ Platform Information &amp; Architecture</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight max-w-4xl mx-auto">
          Information About <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">SnapLoad</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
          Discover the mission, technology, zero-storage privacy architecture, and engineering standards powering the world's fastest universal video downloader and 320kbps MP3 extractor.
        </p>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 max-w-3xl mx-auto">
          <div className="p-4 rounded-2xl glass-subtle border border-slate-200 dark:border-white/10 text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-primary-500">100%</div>
            <div className="text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider">Free Forever</div>
          </div>
          <div className="p-4 rounded-2xl glass-subtle border border-slate-200 dark:border-white/10 text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-emerald-500">&lt; 2 Sec</div>
            <div className="text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider">Fetch Speed</div>
          </div>
          <div className="p-4 rounded-2xl glass-subtle border border-slate-200 dark:border-white/10 text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-indigo-500">0 Byte</div>
            <div className="text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider">Server Storage</div>
          </div>
          <div className="p-4 rounded-2xl glass-subtle border border-slate-200 dark:border-white/10 text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-pink-500">1080p HD</div>
            <div className="text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider">Max Quality</div>
          </div>
        </div>
      </header>

      {/* Main Narrative Section */}
      <section className="glass-strong rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-xl space-y-6">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-4">
          What is SnapLoad?
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          <p>
            <strong>SnapLoad</strong> is a high-performance, web-based digital media utility designed to extract, convert, and save high-definition video clips and high-bitrate audio from leading social media platforms including <strong>TikTok, Instagram Reels, and YouTube Shorts</strong>.
          </p>
          <p>
            Founded in 2026 by digital signal processing engineers and web security analysts, SnapLoad was built with a single goal: <strong>to give users total control over public online media for personal offline viewing, research, and creative editing without forcing account signups, paid software installations, or intrusive popunder ads.</strong>
          </p>
        </div>
      </section>

      {/* Technical Pillars Grid */}
      <section className="space-y-6">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white text-center">
          Our Four Core Technical Pillars
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-strong p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 space-y-3 shadow-lg hover:border-primary-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-primary-500/10 text-primary-500 flex items-center justify-center text-2xl font-bold border border-primary-500/20">
              ⚡
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Direct CDN Stream Parsing
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              SnapLoad inspects raw Content Delivery Network (CDN) video manifests in real-time. By extracting the un-watermarked source stream directly from origin platform servers, we deliver clean 1080p MP4 files without re-encoding quality degradation or visual logo overlays.
            </p>
          </div>

          <div className="glass-strong p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 space-y-3 shadow-lg hover:border-emerald-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-2xl font-bold border border-emerald-500/20">
              🛡️
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Zero-Storage Privacy Architecture
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              We enforce a strict zero-log, zero-storage policy. Video and audio files are never written to physical disk drives on our servers. Media streams pass directly through volatile RAM buffers straight to your browser’s native download manager.
            </p>
          </div>

          <div className="glass-strong p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 space-y-3 shadow-lg hover:border-purple-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center text-2xl font-bold border border-purple-500/20">
              🎵
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              320kbps Audio DSP Extraction
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Our custom audio extraction engine separates multiplexed sound tracks and converts them into studio-grade 320kbps MP3 audio (44.1kHz sampling rate), retaining crisp vocal dynamics and deep acoustic range for music lovers and video editors.
            </p>
          </div>

          <div className="glass-strong p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 space-y-3 shadow-lg hover:border-pink-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-500 flex items-center justify-center text-2xl font-bold border border-pink-500/20">
              🔒
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              GDPR &amp; AdSense Policy Compliance
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              SnapLoad adheres strictly to Google Publisher Policies, GDPR, and CCPA standards. We do not place misleading download buttons, popunders, or malicious software prompts, ensuring a safe and clean user experience.
            </p>
          </div>
        </div>
      </section>

      {/* Supported Platforms Breakdown */}
      <section className="glass-strong rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-xl space-y-6">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-4">
          Supported Social Media Platforms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl glass-subtle space-y-2 border border-slate-200 dark:border-white/10">
            <div className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>🎵</span> TikTok Downloader
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Save TikTok clips in 1080p HD without bouncing watermarks, extract full-res JPEG photo slideshows, and download viral background sounds in 320kbps MP3 format.
            </p>
          </div>

          <div className="p-5 rounded-2xl glass-subtle space-y-2 border border-slate-200 dark:border-white/10">
            <div className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>📸</span> Instagram Reels
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Download Instagram Reels, IGTV clips, and swipeable carousel posts in 1080p portrait resolution, keeping crisp video detail and AAC stereo audio intact.
            </p>
          </div>

          <div className="p-5 rounded-2xl glass-subtle space-y-2 border border-slate-200 dark:border-white/10">
            <div className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>▶️</span> YouTube Shorts
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Reconstruct DASH adaptive stream fragments from YouTube Shorts into single standalone MP4 files or high-quality audio files with zero software installs.
            </p>
          </div>
        </div>
      </section>

      {/* Engineering Disclosures & Contact */}
      <section className="glass-strong rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-xl space-y-6">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-4">
          Publisher &amp; Engineering Disclosures
        </h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 rounded-2xl glass-subtle border border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
              SL
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                SnapLoad Media Engineering Team
              </h3>
              <p className="text-xs text-primary-500 dark:text-primary-400 font-bold">
                Platform Operations &amp; Technology Infrastructure
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Official Contact: shahabkhanyousafzai009@gmail.com
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {onNavigateContact && (
              <button
                onClick={onNavigateContact}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-xs font-bold text-slate-900 dark:text-white transition-colors cursor-pointer"
              >
                Contact Us
              </button>
            )}
            <button
              onClick={onNavigateHome}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-indigo-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Use Downloader &rarr;
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
