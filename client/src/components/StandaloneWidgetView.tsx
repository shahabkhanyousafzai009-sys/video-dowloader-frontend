import React from 'react';
import { UrlInput } from './UrlInput';

interface StandaloneWidgetViewProps {
  onFetchInfo: (url: string) => void;
  loading: boolean;
  onReset: () => void;
}

export const StandaloneWidgetView: React.FC<StandaloneWidgetViewProps> = ({
  onFetchInfo,
  loading,
  onReset,
}) => {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-between glass-strong rounded-2xl border border-primary-500/30 shadow-glow bg-dark-950/90 text-white font-sans">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
            <span className="font-extrabold text-sm tracking-tight">
              Snap<span className="gradient-text">Load</span> Downloader
            </span>
          </div>
          <span className="text-[10px] font-bold text-primary-400 uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary-500/10 border border-primary-500/20">
            Free HD
          </span>
        </div>

        <UrlInput onSubmit={onFetchInfo} loading={loading} onReset={onReset} />
      </div>

      <div className="pt-2 text-center border-t border-white/5">
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
