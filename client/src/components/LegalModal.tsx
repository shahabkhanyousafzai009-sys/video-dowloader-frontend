import React from 'react';

export type LegalTab = 'privacy' | 'terms' | 'disclaimer' | 'contact' | 'dmca' | 'about' | 'cookies';

interface LegalModalProps {
  isOpen: boolean;
  activeTab: LegalTab;
  onClose: () => void;
  onTabChange: (tab: LegalTab) => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  activeTab,
  onClose,
  onTabChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div
        className="glass-strong rounded-3xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl border border-slate-200/80 dark:border-white/15 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Navigation Tabs */}
        <div className="p-4 sm:p-5 bg-slate-900/90 dark:bg-slate-900/90 border-b border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1">
            {[
              { id: 'privacy', label: 'Privacy Policy' },
              { id: 'terms', label: 'Terms of Service' },
              { id: 'dmca', label: 'DMCA Policy' },
              { id: 'about', label: 'About Us' },
              { id: 'contact', label: 'Contact Us' },
              { id: 'disclaimer', label: 'Disclaimer' },
              { id: 'cookies', label: 'Cookie Policy' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id as LegalTab)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/25'
                      : 'text-slate-300 dark:text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors ml-3 cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm dark:text-slate-200 text-slate-800 leading-relaxed font-medium bg-slate-900/40 dark:bg-slate-900/40">
          
          {/* Privacy Policy */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white border-b border-slate-200/60 dark:border-white/10 pb-3">
                Privacy Policy for SnapLoad
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                Effective Date: August 2026 | Last Updated: August 2026
              </p>

              <p>
                At SnapLoad (accessible from <strong>https://snaploaddownload.com</strong>), one of our main priorities is visitor privacy. This Privacy Policy document details the types of information collected and recorded by SnapLoad and how we utilize it in compliance with Google AdSense Policies, GDPR, and CCPA regulations.
              </p>

              <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2">
                1. Google AdSense &amp; DoubleClick DART Cookies
              </h3>
              <p>
                Google is a third-party vendor on our site. Google uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to <code>snaploaddownload.com</code> and other websites on the internet.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
                <li>Third-party vendors, including Google, use cookies to serve ads based on prior user visits to this website.</li>
                <li>Visitors may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary-400 underline">Google Ads Settings</a>.</li>
              </ul>

              <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2">
                2. Information Collection &amp; Zero-Log Policy
              </h3>
              <p>
                SnapLoad operates on a privacy-first model. We <strong>do not require account registration</strong>, and we do not store, copy, or host any downloaded video or audio files on server disks. All downloads are executed dynamically in volatile RAM buffers.
              </p>

              <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2">
                3. GDPR Compliance (EEA &amp; UK User Rights)
              </h3>
              <p>
                If you are located in the EEA or UK, you possess rights under the General Data Protection Regulation (GDPR) to access, erase, or restrict personal data processing. You can manage your preferences at any time via our Cookie ConsentCMP banner.
              </p>
            </div>
          )}

          {/* Terms of Service */}
          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white border-b border-slate-200/60 dark:border-white/10 pb-3">
                Terms of Service
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                Effective Date: August 2026
              </p>

              <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2">
                1. Acceptance of Terms
              </h3>
              <p>
                By accessing and using SnapLoad (https://snaploaddownload.com), you accept and agree to be bound by the terms and provisions of this agreement.
              </p>

              <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2">
                2. Acceptable Use &amp; Intellectual Property
              </h3>
              <p>
                SnapLoad is provided as an online utility for downloading media content for personal, non-commercial use only. Users are solely responsible for ensuring they possess legal rights or fair-use permissions for media entered into the tool.
              </p>

              <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2">
                3. Disclaimer of Platform Affiliation
              </h3>
              <p>
                SnapLoad is an independent web utility and is <strong>NOT affiliated, endorsed by, or connected with TikTok, ByteDance, Instagram, Meta, or YouTube</strong>. All trademark names belong to their respective owners.
              </p>
            </div>
          )}

          {/* DMCA Policy */}
          {activeTab === 'dmca' && (
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white border-b border-slate-200/60 dark:border-white/10 pb-3">
                DMCA Copyright Takedown Policy
              </h2>
              <p>
                SnapLoad respects the intellectual property of content creators. We comply fully with the Digital Millennium Copyright Act (17 U.S.C. § 512).
              </p>
              <div className="p-4 rounded-2xl glass-subtle border border-amber-500/30 space-y-2">
                <h3 className="font-bold text-amber-400 text-base">Zero Server Storage Notice</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  SnapLoad does not host, store, or archive media files on its servers. All downloads stream in real-time directly from origin CDN servers to the user device.
                </p>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2">
                Submitting a Takedown Notice
              </h3>
              <p>
                If you are a copyright owner and wish to submit a DMCA notice, please send a written notification containing video URL links and ownership proof to our designated agent:
              </p>
              <p className="font-mono text-primary-400 text-xs font-bold">
                Email: shahabkhanyousafzai009@gmail.com
              </p>
            </div>
          )}

          {/* About Us */}
          {activeTab === 'about' && (
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white border-b border-slate-200/60 dark:border-white/10 pb-3">
                About SnapLoad
              </h2>
              <p>
                SnapLoad is a high-performance web application designed to extract 1080p HD videos and 320kbps MP3 audio from TikTok, Instagram Reels, and Facebook.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl glass-subtle border border-slate-200 dark:border-white/10 space-y-1">
                  <div className="font-bold text-primary-400">⚡ Direct CDN Streaming</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">Extract un-watermarked HD source streams directly from origin CDNs.</div>
                </div>
                <div className="p-4 rounded-xl glass-subtle border border-slate-200 dark:border-white/10 space-y-1">
                  <div className="font-bold text-emerald-400">🛡️ Zero Storage</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">Strict zero-log, zero-disk storage privacy protection.</div>
                </div>
              </div>
            </div>
          )}

          {/* Contact Us */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white border-b border-slate-200/60 dark:border-white/10 pb-3">
                Contact Technical Support
              </h2>
              <p>
                Have technical questions, bug reports, or copyright inquiries? Contact our engineering group:
              </p>
              <div className="p-5 rounded-2xl glass-subtle border border-slate-200 dark:border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/20 text-primary-400 flex items-center justify-center font-bold text-lg">
                    ✉
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Customer Support &amp; Privacy Agent</h4>
                    <p className="text-xs font-mono text-primary-400 font-bold">
                      <a href="mailto:shahabkhanyousafzai009@gmail.com" className="hover:underline">
                        shahabkhanyousafzai009@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          {activeTab === 'disclaimer' && (
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white border-b border-slate-200/60 dark:border-white/10 pb-3">
                Disclaimer &amp; Legal Notice
              </h2>
              <p>
                SnapLoad is provided &quot;as is&quot; without warranties of any kind. Users are responsible for ensuring their download activities comply with local copyright laws and platform Terms of Service.
              </p>
            </div>
          )}

          {/* Cookie Policy */}
          {activeTab === 'cookies' && (
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white border-b border-slate-200/60 dark:border-white/10 pb-3">
                Cookie Policy
              </h2>
              <p>
                SnapLoad uses essential session cookies and third-party Google AdSense advertising cookies to deliver personalized services and measure ad traffic. You can adjust your cookie settings at any time in your browser settings.
              </p>
            </div>
          )}

        </div>

        {/* Modal Footer Action */}
        <div className="p-4 bg-slate-900/90 dark:bg-slate-900/90 border-t border-slate-700/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs sm:text-sm font-extrabold transition-colors text-white cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
