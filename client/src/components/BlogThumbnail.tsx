import React, { useState } from 'react';

interface BlogThumbnailProps {
  category: 'TikTok' | 'Instagram' | 'MP3 Conversion' | 'YouTube Shorts' | 'Legal & Security' | string;
  title: string;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BlogThumbnail: React.FC<BlogThumbnailProps> = ({ category, title, imageUrl, size = 'md' }) => {
  const [imageError, setImageError] = useState(false);

  // Category-specific fallback gradients, icons, and visual themes matching platform identity
  const getCategoryConfig = () => {
    switch (category) {
      case 'TikTok':
      case 'tiktok':
        return {
          gradient: 'from-cyan-600 via-slate-900 to-pink-600',
          badgeText: 'TIKTOK HD',
          badgeBg: 'bg-black/60 text-cyan-300 border-cyan-500/40',
          icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
            </svg>
          ),
          tag: 'No Watermark MP4',
        };
      case 'Instagram':
      case 'instagram':
        return {
          gradient: 'from-amber-600 via-pink-700 to-purple-900',
          badgeText: 'INSTAGRAM REELS',
          badgeBg: 'bg-black/60 text-pink-300 border-pink-500/40',
          icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          ),
          tag: '1080p HD & Carousel',
        };
      case 'MP3 Conversion':
      case 'mp3':
        return {
          gradient: 'from-amber-600 via-purple-800 to-indigo-950',
          badgeText: 'AUDIO EXTRACTOR',
          badgeBg: 'bg-black/60 text-amber-300 border-amber-500/40',
          icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
          ),
          tag: '320kbps Studio MP3',
        };
      case 'YouTube Shorts':
        return {
          gradient: 'from-red-700 via-slate-900 to-red-950',
          badgeText: 'YOUTUBE SHORTS',
          badgeBg: 'bg-black/60 text-red-300 border-red-500/40',
          icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          ),
          tag: 'DASH Stream Merger',
        };
      case 'Legal & Security':
      default:
        return {
          gradient: 'from-indigo-800 via-slate-950 to-blue-900',
          badgeText: 'SECURITY & LAW',
          badgeBg: 'bg-black/60 text-indigo-300 border-indigo-500/40',
          icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          ),
          tag: 'Fair Use & Privacy',
        };
    }
  };

  const config = getCategoryConfig();

  const heightClasses = {
    sm: 'h-40 sm:h-44',
    md: 'h-48 sm:h-52',
    lg: 'h-64 sm:h-80',
  }[size];

  return (
    <div className={`relative w-full ${heightClasses} rounded-2xl overflow-hidden shadow-xl border border-white/10 group-hover:shadow-primary-500/20 transition-all duration-300 bg-slate-900`}>
      
      {/* Real Article Photo Image */}
      {imageUrl && !imageError ? (
        <img
          src={imageUrl}
          alt={title}
          onError={() => setImageError(true)}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
        />
      ) : (
        /* Fallback Background Mesh Gradient */
        <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-95 group-hover:scale-105 transition-transform duration-500`} />
      )}

      {/* Dark Vignette Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/30" />
      <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />

      {/* Decorative Glow Orb */}
      <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-white/10 blur-2xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

      {/* Content Overlay */}
      <div className="relative z-10 h-full p-4.5 flex flex-col justify-between">
        
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2">
          <span className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase border backdrop-blur-md shadow-md ${config.badgeBg}`}>
            {config.badgeText}
          </span>

          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/50 text-white/90 backdrop-blur-md border border-white/20 shadow-md">
            {config.tag}
          </span>
        </div>

        {/* Bottom Title & Floating Icon Badge */}
        <div className="flex items-end justify-between gap-3 pt-2">
          <div className="space-y-1 max-w-[80%]">
            <p className="text-xs sm:text-sm font-extrabold text-white drop-shadow-md line-clamp-2 leading-snug tracking-tight">
              {title}
            </p>
          </div>

          {/* 3D Glass Icon Badge */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-black/40 backdrop-blur-xl border border-white/25 flex items-center justify-center shadow-2xl group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 shrink-0">
            {config.icon}
          </div>
        </div>
      </div>
    </div>
  );
};
