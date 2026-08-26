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
        {/* Internal Keyword Links Section for SEO Indexation & Search Engine Crawling */}
        <div className="glass-subtle rounded-2xl p-5 mb-6 border border-slate-200/80 dark:border-white/10 shadow-sm">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-center dark:text-white/50 text-slate-500 mb-3.5">
            Free Online Video Downloaders &amp; High-Bitrate MP3 Converters
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-bold text-center">
            <a
              href="/tiktok-downloader"
              className="dark:text-primary-300 text-primary-600 hover:underline transition-all"
              title="TikTok Downloader Without Watermark HD"
            >
              TikTok Downloader Without Watermark
            </a>
            <span className="dark:text-white/20 text-slate-300">•</span>
            <a
              href="/tiktok-mp3-downloader"
              className="dark:text-primary-300 text-primary-600 hover:underline transition-all"
              title="TikTok MP3 Sound Extractor 320kbps"
            >
              TikTok MP3 Sound Extractor
            </a>
            <span className="dark:text-white/20 text-slate-300">•</span>
            <a
              href="/instagram-downloader"
              className="dark:text-primary-300 text-primary-600 hover:underline transition-all"
              title="Instagram Reels & Video Downloader 1080p HD"
            >
              Instagram Reels Downloader 1080p
            </a>
            <span className="dark:text-white/20 text-slate-300">•</span>
            <a
              href="/youtube-shorts-downloader"
              className="dark:text-primary-300 text-primary-600 hover:underline transition-all"
              title="YouTube Shorts Downloader MP4 & MP3"
            >
              YouTube Shorts Downloader
            </a>
            <span className="dark:text-white/20 text-slate-300">•</span>
            <a
              href="/mp3-downloader"
              className="dark:text-primary-300 text-primary-600 hover:underline transition-all"
              title="Video to MP3 Converter 320kbps"
            >
              Video to MP3 Converter
            </a>
            <span className="dark:text-white/20 text-slate-300">•</span>
            <a
              href="/guides"
              className="dark:text-primary-300 text-primary-600 hover:underline transition-all"
              title="Step-by-step How-To Downloader Guides"
            >
              📖 How-To Guides
            </a>
            <span className="dark:text-white/20 text-slate-300">•</span>
            <a
              href="/blog"
              className="dark:text-primary-300 text-primary-600 hover:underline transition-all"
              title="SnapLoad Knowledge Base & Blog"
            >
              📚 Blog &amp; Tutorials
            </a>
            <span className="dark:text-white/20 text-slate-300">•</span>
            {onOpenWidget ? (
              <button
                onClick={onOpenWidget}
                className="text-amber-500 dark:text-amber-400 hover:underline underline-offset-2 transition-all cursor-pointer font-extrabold"
              >
                ⚡ Embed Widget on Your Site
              </button>
            ) : (
              <a
                href="/widget"
                className="text-amber-500 dark:text-amber-400 hover:underline underline-offset-2 transition-all font-extrabold"
              >
                ⚡ Embed Widget on Your Site
              </a>
            )}
          </div>

          {/* High Intent SEO Keyword Tag Cloud */}
          <div className="mt-4 pt-3.5 border-t border-slate-200/60 dark:border-white/10 flex flex-wrap items-center justify-center gap-1.5 text-[10px] font-semibold dark:text-white/40 text-slate-500">
            {[
              'TikTok Downloader',
              'TikTok Video Downloader',
              'Baixar Video TikTok',
              'TikTok Download',
              'Descargar Videos de TikTok',
              'Baixar Video do TikTok',
              'Descargar Video TikTok',
              'TikTok Video Download',
              'TikTok Downloader Without Watermark',
              'Baixar Musica do TikTok',
              'Descargar TikTok Sin Marca de Agua',
              'TikTok MP3 Downloader',
              'TikTok Photo Downloader',
              'SaveFrom TikTok',
              'SSSTik TikTok',
              'SnapTik TikTok Downloader',
              'TikTok Saver',
              'Save Video TikTok',
            ].map((kw) => (
              <span key={kw} className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 font-extrabold text-primary-600 dark:text-primary-300">
                {kw}
              </span>
            ))}
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
        <div className="glass-subtle rounded-xl p-4 mb-6 border border-slate-200/80 dark:border-white/10 shadow-xs">
          <p className="text-xs dark:text-slate-300 text-slate-800 text-center leading-relaxed font-medium">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="inline-block text-amber-500 mr-1.5 align-text-bottom">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <strong className="text-slate-900 dark:text-white font-extrabold">Disclaimer:</strong> SnapLoad is intended for downloading content you have rights to access.
            Downloading copyrighted material without permission may violate the terms of service of respective platforms.
            We do not store any videos on our servers — all files are streamed directly to your device.
          </p>
        </div>

        {/* Footer links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#7026b9] via-[#d92662] to-[#f97316] flex items-center justify-center shadow-xs border border-white/20">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"
                   strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>
                <polyline points="7 11 12 16 17 11"/>
                <line x1="12" y1="4" x2="12" y2="16"/>
              </svg>
            </div>
            <span className="text-xs font-extrabold dark:text-slate-300 text-slate-800">
              SnapLoad © 2026
            </span>
          </div>

          <div className="flex items-center gap-6">
            {['TikTok', 'Instagram'].map((platform) => (
              <span key={platform} className="text-[11px] font-extrabold uppercase tracking-wider dark:text-slate-400 text-slate-600">
                {platform}
              </span>
            ))}
          </div>

          <p className="text-[11px] font-bold dark:text-slate-400 text-slate-600">
            No videos stored on server • Direct streaming
          </p>

        </div>
      </div>
    </footer>
  );
};
