import React from 'react';
import { LegalTab } from './LegalModal';

interface FooterProps {
  onOpenLegal: (tab: LegalTab) => void;
  onOpenWidget?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenWidget }) => {
  return (
    <footer className="w-full mt-16 pb-8 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4">
        {/* Internal Keyword Links Section for SEO Indexation & Crawling */}
        <div className="glass-subtle rounded-xl p-4 mb-6">
          <p className="text-[11px] font-bold uppercase tracking-wider text-center dark:text-white/40 text-dark-500 mb-3">
            Popular Downloader Tools &amp; Converters
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold">
            <a
              href="/tiktok-downloader"
              className="dark:text-primary-300 text-primary-600 hover:underline transition-all"
            >
              TikTok Downloader No Watermark
            </a>
            <span className="dark:text-white/10 text-dark-300">•</span>
            <a
              href="/tiktok-mp3-downloader"
              className="dark:text-primary-300 text-primary-600 hover:underline transition-all"
            >
              TikTok MP3 Sound Extractor
            </a>
            <span className="dark:text-white/10 text-dark-300">•</span>
            <a
              href="/instagram-downloader"
              className="dark:text-primary-300 text-primary-600 hover:underline transition-all"
            >
              Instagram Reels Downloader 1080p
            </a>
            <span className="dark:text-white/10 text-dark-300">•</span>
            <a
              href="/youtube-shorts-downloader"
              className="dark:text-primary-300 text-primary-600 hover:underline transition-all"
            >
              YouTube Shorts Downloader
            </a>
            <span className="dark:text-white/10 text-dark-300">•</span>
            <a
              href="/mp3-downloader"
              className="dark:text-primary-300 text-primary-600 hover:underline transition-all"
            >
              Video to MP3 Converter
            </a>
            <span className="dark:text-white/10 text-dark-300">•</span>
            {onOpenWidget ? (
              <button
                onClick={onOpenWidget}
                className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-all cursor-pointer font-bold"
              >
                ⚡ Embed Widget on Your Site
              </button>
            ) : (
              <a
                href="/widget"
                className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-all font-bold"
              >
                ⚡ Embed Widget on Your Site
              </a>
            )}
          </div>
        </div>

        {/* Legal & Policy Navigation Links for Google AdSense Compliance */}
        <div className="glass-subtle rounded-xl p-4 mb-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium dark:text-white/70 text-dark-600">
          <a
            href="/privacy-policy"
            onClick={(e) => { e.preventDefault(); onOpenLegal('privacy'); }}
            className="hover:text-primary-400 transition-colors underline underline-offset-4 cursor-pointer"
          >
            Privacy Policy
          </a>
          <span className="text-white/20">•</span>
          <a
            href="/terms-of-service"
            onClick={(e) => { e.preventDefault(); onOpenLegal('terms'); }}
            className="hover:text-primary-400 transition-colors underline underline-offset-4 cursor-pointer"
          >
            Terms of Service
          </a>
          <span className="text-white/20">•</span>
          <a
            href="/dmca-policy"
            onClick={(e) => { e.preventDefault(); onOpenLegal('dmca'); }}
            className="hover:text-primary-400 transition-colors underline underline-offset-4 cursor-pointer"
          >
            DMCA Policy
          </a>
          <span className="text-white/20">•</span>
          <a
            href="/about-us"
            onClick={(e) => { e.preventDefault(); onOpenLegal('about'); }}
            className="hover:text-primary-400 transition-colors underline underline-offset-4 cursor-pointer"
          >
            About Us
          </a>
          <span className="text-white/20">•</span>
          <a
            href="/contact"
            onClick={(e) => { e.preventDefault(); onOpenLegal('contact'); }}
            className="hover:text-primary-400 transition-colors underline underline-offset-4 cursor-pointer"
          >
            Contact Us
          </a>
          <span className="text-white/20">•</span>
          <a
            href="/disclaimer"
            onClick={(e) => { e.preventDefault(); onOpenLegal('disclaimer'); }}
            className="hover:text-primary-400 transition-colors underline underline-offset-4 cursor-pointer"
          >
            Disclaimer
          </a>
          <span className="text-white/20">•</span>
          <a
            href="/cookie-policy"
            onClick={(e) => { e.preventDefault(); onOpenLegal('cookies'); }}
            className="hover:text-primary-400 transition-colors underline underline-offset-4 cursor-pointer"
          >
            Cookie Policy
          </a>
        </div>

        {/* Disclaimer Note */}
        <div className="glass-subtle rounded-xl p-4 mb-6">
          <p className="text-xs dark:text-white/40 text-dark-500 text-center leading-relaxed">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="inline-block text-amber-500 mr-1.5 align-text-bottom">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <strong>Disclaimer:</strong> SnapLoad is intended for downloading content you have rights to access.
            Downloading copyrighted material without permission may violate the terms of service of respective platforms.
            We do not store any videos on our servers — all files are streamed directly to your device.
          </p>
        </div>

        {/* Footer links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 
                            flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"
                   strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </div>
            <span className="text-xs font-semibold dark:text-white/40 text-dark-400">
              SnapLoad © 2026
            </span>
          </div>

          <div className="flex items-center gap-6">
            {['TikTok', 'Instagram'].map((platform) => (
              <span key={platform} className="text-[10px] font-medium uppercase tracking-wider
                                              dark:text-white/20 text-dark-300">
                {platform}
              </span>
            ))}
          </div>

          <p className="text-[11px] dark:text-white/20 text-dark-300">
            No videos stored on server • Direct streaming
          </p>
        </div>
      </div>
    </footer>
  );
};
