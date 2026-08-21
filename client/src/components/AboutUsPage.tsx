import React from 'react';

interface AboutUsPageProps {
  onNavigateHome: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onNavigateHome }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-fade-in space-y-8">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold dark:text-white/50 text-dark-500">
        <button onClick={onNavigateHome} className="hover:text-primary-400 transition-colors cursor-pointer">
          Home
        </button>
        <span>/</span>
        <span className="dark:text-white text-dark-900">About Us</span>
      </div>

      {/* Main Glass Card */}
      <div className="glass rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl space-y-8">
        
        {/* Header */}
        <header className="border-b border-white/10 pb-6 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-semibold">
            <span>⚙️ Technology &amp; Publisher Profile</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold dark:text-white text-dark-900 tracking-tight">
            About SnapLoad — Mission &amp; Engineering Standards
          </h1>
          <p className="text-sm sm:text-base dark:text-white/60 text-dark-600 leading-relaxed">
            High-Performance Web Utility &amp; Media Educational Platform
          </p>
        </header>

        {/* Brand Mission Section */}
        <section className="space-y-4 dark:text-white/80 text-dark-800 leading-relaxed text-sm sm:text-base">
          <h2 className="text-xl font-bold dark:text-white text-dark-900">
            Our Mission &amp; Core Vision
          </h2>
          <p>
            <strong>SnapLoad</strong> was launched in 2026 to redefine online video conversion and downloading. We believe that web tools should be <strong>fast, private, free, and accessible to everyone worldwide</strong> without forcing software installs, invasive browser extensions, or deceptive popunder ads.
          </p>
          <p>
            Whether you are a content creator archiving your TikTok slideshows, a video editor sourcing HD clips for commentary, or a music enthusiast extracting 320kbps MP3 audio tracks, SnapLoad delivers instant, direct stream downloads across all desktop and mobile devices.
          </p>
        </section>

        {/* Core Technical Pillars Grid */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold dark:text-white text-dark-900">
            Our Technical Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-subtle p-5 rounded-2xl border border-primary-500/20 space-y-2">
              <span className="text-2xl">⚡</span>
              <h3 className="font-bold text-primary-400 text-base">Direct CDN Stream Parsing</h3>
              <p className="text-xs sm:text-sm dark:text-white/70 text-dark-600 leading-relaxed">
                SnapLoad queries origin platform manifests in real-time to deliver original 1080p MP4 files directly to your device without re-encoding quality degradation.
              </p>
            </div>

            <div className="glass-subtle p-5 rounded-2xl border border-accent-500/20 space-y-2">
              <span className="text-2xl">🛡️</span>
              <h3 className="font-bold text-accent-400 text-base">Zero File Storage Policy</h3>
              <p className="text-xs sm:text-sm dark:text-white/70 text-dark-600 leading-relaxed">
                We operate a strict zero-log, zero-storage architecture. Downloaded files are never cached or archived on our servers — all streams execute directly in volatile memory.
              </p>
            </div>

            <div className="glass-subtle p-5 rounded-2xl border border-emerald-500/20 space-y-2">
              <span className="text-2xl">📚</span>
              <h3 className="font-bold text-emerald-400 text-base">Editorial &amp; E-E-A-T Standards</h3>
              <p className="text-xs sm:text-sm dark:text-white/70 text-dark-600 leading-relaxed">
                Our team publishes in-depth technical guides, tutorials, and digital copyright documentation to promote media literacy and creator safety.
              </p>
            </div>

            <div className="glass-subtle p-5 rounded-2xl border border-amber-500/20 space-y-2">
              <span className="text-2xl">🌐</span>
              <h3 className="font-bold text-amber-400 text-base">AdSense &amp; GDPR Compliance</h3>
              <p className="text-xs sm:text-sm dark:text-white/70 text-dark-600 leading-relaxed">
                We strictly adhere to Google Publisher Policies, GDPR, and CCPA standards, ensuring transparent consent management and zero invasive popups.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Editorial Team */}
        <section className="space-y-4 border-t border-white/10 pt-6">
          <h2 className="text-xl font-bold dark:text-white text-dark-900">
            Editorial Team &amp; Operator Disclosures
          </h2>
          <div className="glass-subtle p-6 rounded-2xl space-y-3 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg">
                SL
              </div>
              <div>
                <h3 className="font-bold text-base dark:text-white text-dark-900">SnapLoad Media Engineering Group</h3>
                <p className="text-xs text-primary-400 font-medium">Platform Infrastructure &amp; Technical Publisher</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm dark:text-white/70 text-dark-600 leading-relaxed">
              Our engineering team comprises full-stack developers, audio signal processing specialists, and web security analysts dedicated to maintaining high-availability web converters.
            </p>
            <div className="pt-2 text-xs font-mono text-primary-400">
              Official Email: <a href="mailto:shahabkhanyousafzai009@gmail.com" className="underline">shahabkhanyousafzai009@gmail.com</a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
