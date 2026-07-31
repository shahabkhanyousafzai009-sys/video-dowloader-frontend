import type { VideoInfo } from '../utils/api';
import { formatDuration } from '../utils/platforms';
import { PlatformBadge } from './PlatformBadge';

interface VideoPreviewProps {
  info: VideoInfo;
}

export function VideoPreview({ info }: VideoPreviewProps) {
  const platformInfo = {
    id: info.platform.id,
    name: info.platform.name,
    color: info.platform.color,
    gradient: '',
    icon: info.platform.icon,
  };

  return (
    <div className="glass rounded-2xl overflow-hidden animate-slide-up">
      <div className="flex flex-col sm:flex-row">
        {/* Thumbnail */}
        <div className="relative sm:w-72 w-full aspect-video sm:aspect-auto flex-shrink-0">
          {info.thumbnail ? (
            <img
              src={info.thumbnail}
              alt={info.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-900/50 to-accent-900/50 
                            flex items-center justify-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="1.5" className="text-white/30">
                <rect x="2" y="2" width="20" height="20" rx="2"/>
                <circle cx="8" cy="8" r="2"/>
                <path d="M2 15l6-6 4 4 3-3 7 7"/>
              </svg>
            </div>
          )}

          {/* Duration overlay */}
          {info.duration > 0 && (
            <div className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-sm 
                            px-2 py-0.5 rounded-md text-xs font-mono font-semibold text-white">
              {formatDuration(info.duration)}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 p-5 flex flex-col justify-between gap-3">
          <div>
            {/* Platform Badge */}
            <div className="mb-2">
              <PlatformBadge platform={platformInfo} size="sm" />
            </div>

            {/* Title */}
            <h2 className="text-lg font-bold dark:text-white text-dark-900 leading-snug line-clamp-2"
                title={info.title}>
              {info.title}
            </h2>

            {/* Uploader */}
            <p className="mt-1.5 text-sm dark:text-white/50 text-dark-500 flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              {info.uploader}
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs dark:text-white/35 text-dark-400">
            {info.duration > 0 && (
              <span className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                {formatDuration(info.duration)}
              </span>
            )}
            {info.viewCount && (
              <span className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                {info.viewCount.toLocaleString()} views
              </span>
            )}
            <span className="flex items-center gap-1">
              {info.suggestions.filter(s => !s.isAudio).length} quality options
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
