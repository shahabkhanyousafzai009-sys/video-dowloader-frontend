import React from 'react';
import { GUIDES_DATA } from '../data/guidesData';
import { AdBanner } from './AdBanner';

interface GuidesHubProps {
  onSelectGuide: (slug: string) => void;
}

export const GuidesHub: React.FC<GuidesHubProps> = ({ onSelectGuide }) => {
  const guidesList = Object.values(GUIDES_DATA);

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl mx-auto">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-500/10 text-primary-400 border border-primary-500/20">
          Knowledge Base &amp; Tutorials
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold dark:text-white text-dark-900">
          How-To Downloader <span className="gradient-text">Guides</span>
        </h1>
        <p className="text-sm dark:text-white/50 text-dark-500 max-w-md mx-auto">
          Step-by-step tutorials to save TikTok videos without watermark, download Instagram Reels in 1080p, and convert videos to MP3 audio.
        </p>
      </div>

      {/* Top Ad Banner */}
      <AdBanner slot="guides-hub-top" label="Sponsored" className="my-6" />

      {/* Guide Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {guidesList.map((guide) => (
          <div
            key={guide.slug}
            onClick={() => onSelectGuide(guide.slug)}
            className="glass hover:glass-strong rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between border border-white/5 hover:border-primary-500/30"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs dark:text-white/40 text-dark-400">
                <span className="font-semibold uppercase tracking-wider text-primary-400">
                  {guide.platform}
                </span>
                <span>{guide.readTime}</span>
              </div>
              <h2 className="text-base font-bold dark:text-white text-dark-900 group-hover:text-primary-400 transition-colors line-clamp-2">
                {guide.title}
              </h2>
              <p className="text-xs dark:text-white/50 text-dark-500 line-clamp-3 leading-relaxed">
                {guide.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-primary-400 group-hover:translate-x-1 transition-transform">
              <span>Read Full Guide</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2 font-bold">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Ad Banner */}
      <AdBanner slot="guides-hub-bottom" label="Advertisement" className="mt-8" />
    </div>
  );
};
