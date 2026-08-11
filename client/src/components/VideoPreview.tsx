import { useState } from 'react';
import type { VideoInfo } from '../utils/api';
import { buildDownloadUrl } from '../utils/api';
import { formatDuration } from '../utils/platforms';
import { PlatformBadge } from './PlatformBadge';

interface VideoPreviewProps {
  info: VideoInfo;
}

export function VideoPreview({ info }: VideoPreviewProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [mediaType, setMediaType] = useState<'video' | 'audio'>('video');
  const [isBuffering, setIsBuffering] = useState<boolean>(false);

  const platformInfo = {
    id: info.platform.id,
    name: info.platform.name,
    color: info.platform.color,
    gradient: '',
    icon: info.platform.icon,
  };

  // Find best format ID for previewing
  const bestVideoSuggestion = info.suggestions.find((s) => !s.isAudio) || info.suggestions[0];
  const formatId = bestVideoSuggestion?.formatId || 'best';
  const audioFormatId = bestVideoSuggestion?.audioFormatId || null;

  const previewStreamUrl = `${buildDownloadUrl(
    info.originalUrl,
    formatId,
    audioFormatId,
    mediaType,
    info.title,
    '192'
  )}&inline=true`;

  const handleStartPreview = (type: 'video' | 'audio') => {
    setMediaType(type);
    setIsBuffering(true);
    setIsPlaying(true);
  };

  const handleStopPreview = () => {
    setIsPlaying(false);
    setIsBuffering(false);
  };

  return (
    <div className="glass rounded-2xl overflow-hidden animate-slide-up shadow-2xl border border-white/10">
      <div className="flex flex-col sm:flex-row">
        {/* Thumbnail & Interactive Player */}
        <div className="relative sm:w-80 w-full aspect-video sm:aspect-auto flex-shrink-0 bg-black/60 overflow-hidden group">
          {isPlaying ? (
            <div className="relative w-full h-full min-h-[220px] flex items-center justify-center bg-black">
              {isBuffering && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-xs gap-3">
                  <div className="w-10 h-10 border-3 border-primary-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs text-white/70 font-medium">Loading stream preview...</span>
                </div>
              )}

              {mediaType === 'video' ? (
                <video
                  src={previewStreamUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain max-h-[300px]"
                  onCanPlay={() => setIsBuffering(false)}
                  onWaiting={() => setIsBuffering(true)}
                  onError={() => setIsBuffering(false)}
                />
              ) : (
                <div className="w-full h-full p-6 flex flex-col items-center justify-center bg-gradient-to-br from-primary-950/80 to-accent-950/80 text-white gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary-500/20 border border-primary-400/30 flex items-center justify-center text-primary-400 animate-pulse">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18V5l12-2v13" />
                      <circle cx="6" cy="18" r="3" />
                      <circle cx="18" cy="16" r="3" />
                    </svg>
                  </div>
                  <audio
                    src={previewStreamUrl}
                    controls
                    autoPlay
                    className="w-full max-w-xs"
                    onCanPlay={() => setIsBuffering(false)}
                    onWaiting={() => setIsBuffering(true)}
                    onError={() => setIsBuffering(false)}
                  />
                </div>
              )}

              {/* Close preview button */}
              <button
                onClick={handleStopPreview}
                className="absolute top-2 right-2 z-30 p-1.5 rounded-full bg-black/70 hover:bg-red-500 text-white backdrop-blur-md transition-colors cursor-pointer"
                title="Close preview"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ) : (
            <>
              {info.thumbnail ? (
                <img
                  src={info.thumbnail}
                  alt={info.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary-900/50 to-accent-900/50 flex items-center justify-center">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/30">
                    <rect x="2" y="2" width="20" height="20" rx="2" />
                    <circle cx="8" cy="8" r="2" />
                    <path d="M2 15l6-6 4 4 3-3 7 7" />
                  </svg>
                </div>
              )}

              {/* Play Overlay Badge */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                <button
                  onClick={() => handleStartPreview('video')}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold text-xs shadow-glow hover:scale-105 transition-transform cursor-pointer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Preview Video
                </button>
                <button
                  onClick={() => handleStartPreview('audio')}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white font-medium text-xs backdrop-blur-md hover:scale-105 transition-transform cursor-pointer"
                  title="Preview Audio"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                  Audio
                </button>
              </div>

              {/* Quick Play Floating Icon on Thumbnail */}
              <button
                onClick={() => handleStartPreview('video')}
                className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-primary-600/90 hover:bg-primary-500 text-white flex items-center justify-center shadow-lg group-hover:hidden transition-all scale-100 cursor-pointer"
                title="Play preview stream"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </button>

              {/* Duration overlay */}
              {info.duration > 0 && (
                <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded-md text-xs font-mono font-semibold text-white">
                  {formatDuration(info.duration)}
                </div>
              )}
            </>
          )}
        </div>

        {/* Video Info Details */}
        <div className="flex-1 p-5 flex flex-col justify-between gap-3">
          <div>
            {/* Platform Badge & Preview Badge */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <PlatformBadge platform={platformInfo} size="sm" />
              <button
                onClick={() => (isPlaying ? handleStopPreview() : handleStartPreview('video'))}
                className="text-xs font-medium text-primary-400 hover:text-primary-300 flex items-center gap-1.5 cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                {isPlaying ? 'Stop Preview' : 'Interactive Preview'}
              </button>
            </div>

            {/* Title */}
            <h2 className="text-lg font-bold dark:text-white text-dark-900 leading-snug line-clamp-2" title={info.title}>
              {info.title}
            </h2>

            {/* Uploader */}
            <p className="mt-1.5 text-sm dark:text-white/50 text-dark-500 flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              {info.uploader}
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs dark:text-white/35 text-dark-400 pt-2 border-t border-white/5">
            {info.duration > 0 && (
              <span className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {formatDuration(info.duration)}
              </span>
            )}
            {info.viewCount && (
              <span className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                {info.viewCount.toLocaleString()} views
              </span>
            )}
            <span className="flex items-center gap-1">
              {info.suggestions.filter((s) => !s.isAudio).length} quality options
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

