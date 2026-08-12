import React from 'react';
import type { VideoInfo } from '../hooks/useVideoInfo';
import { UrlInput } from './UrlInput';
import { VideoPreview } from './VideoPreview';
import { FormatSelector } from './FormatSelector';
import { DownloadButton } from './DownloadButton';
import { ProgressBar } from './ProgressBar';
import { ErrorMessage } from './ErrorMessage';
import { Language } from '../utils/i18n';

interface StandaloneWidgetViewProps {
  videoInfo: VideoInfo | null;
  loading: boolean;
  error: string | null;
  onFetchInfo: (url: string) => void;
  onReset: () => void;
  selectedFormatIndex: number | null;
  onSelectFormat: (index: number) => void;
  onDownload: () => void;
  downloading: boolean;
  progress: number;
  downloadError: string | null;
  currentLanguage?: Language;
}

export const StandaloneWidgetView: React.FC<StandaloneWidgetViewProps> = ({
  videoInfo,
  loading,
  error,
  onFetchInfo,
  onReset,
  selectedFormatIndex,
  onSelectFormat,
  onDownload,
  downloading,
  progress,
  downloadError,
  currentLanguage = 'en',
}) => {
  const selectedSuggestion = selectedFormatIndex !== null && videoInfo
    ? videoInfo.suggestions[selectedFormatIndex]
    : null;

  return (
    <div className="w-full max-w-xl p-5 space-y-5 glass-strong rounded-2xl border border-primary-500/30 shadow-glow bg-dark-950/95 text-white font-sans">
      {/* Header Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-glow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </div>
          <span className="font-extrabold text-base tracking-tight">
            Snap<span className="gradient-text">Load</span> Downloader
          </span>
        </div>
        <span className="text-xs font-bold text-primary-400 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary-500/10 border border-primary-500/20">
          Free HD &amp; MP3
        </span>
      </div>

      {/* Input */}
      <UrlInput onSubmit={onFetchInfo} loading={loading} onReset={onReset} currentLanguage={currentLanguage} />

      {/* Error State */}
      {error && !loading && (
        <ErrorMessage message={error} onDismiss={onReset} />
      )}

      {/* Results & Format Selection */}
      {videoInfo && !loading && !error && (
        <div className="space-y-4 animate-fade-in pt-2">
          <VideoPreview info={videoInfo} />
          <FormatSelector
            suggestions={videoInfo.suggestions}
            selectedIndex={selectedFormatIndex}
            onSelect={onSelectFormat}
          />
          {downloadError && (
            <ErrorMessage message={downloadError} onDismiss={onReset} />
          )}
          <ProgressBar progress={progress} isActive={downloading} />
          <DownloadButton
            onClick={onDownload}
            disabled={selectedFormatIndex === null}
            downloading={downloading}
            isAudio={selectedSuggestion?.isAudio || false}
          />
        </div>
      )}

      {/* Backlink Credit */}
      <div className="pt-3 text-center border-t border-white/5">
        <a
          href="https://snaploaddownload.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-primary-400 hover:text-primary-300 transition-colors inline-flex items-center gap-1"
        >
          <span>Powered by SnapLoad Video Downloader</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>
    </div>
  );
};
