import { useState, useEffect } from 'react';
import { PlatformBadge } from './PlatformBadge';

export interface HistoryItem {
  id: string;
  title: string;
  thumbnail: string;
  platform: 'tiktok' | 'instagram' | 'youtube' | 'mp3' | 'other';
  url: string;
  downloadUrl: string;
  timestamp: number;
}

interface DownloadHistoryProps {
  onSelectUrl?: (url: string) => void;
}

export function DownloadHistory({ onSelectUrl }: DownloadHistoryProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('snapload_download_history');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  const handleClearHistory = () => {
    localStorage.removeItem('snapload_download_history');
    setHistory([]);
  };

  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 text-left animate-fade-in">
      <div className="glass-strong rounded-2xl p-4 sm:p-6 border border-white/10 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">📜</span>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
              Recent Downloads ({history.length})
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-xs font-semibold text-primary-400 hover:text-primary-300 transition-colors"
            >
              {isOpen ? 'Hide' : 'Show All'}
            </button>
            <button
              type="button"
              onClick={handleClearHistory}
              className="text-xs text-gray-400 hover:text-red-400 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="space-y-3 mt-4 animate-fade-in max-h-80 overflow-y-auto pr-1">
            {history.slice(0, 10).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/40 dark:bg-white/5 border border-white/5 hover:border-primary-500/30 transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-12 h-12 rounded-lg object-cover shrink-0 border border-white/10"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center shrink-0">
                      🎬
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {item.title || 'Downloaded Media'}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <PlatformBadge platform={item.platform} size="sm" />
                      <span className="text-[10px] text-gray-400">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {onSelectUrl && (
                    <button
                      type="button"
                      onClick={() => onSelectUrl(item.url)}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-primary-500/10 text-primary-400 hover:bg-primary-500/20 transition-all"
                    >
                      Re-fetch
                    </button>
                  )}
                  <a
                    href={item.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all"
                    title="Download again"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Utility function to append items to history from DownloadButton
export function addHistoryItem(item: Omit<HistoryItem, 'id' | 'timestamp'>) {
  try {
    const existing: HistoryItem[] = JSON.parse(
      localStorage.getItem('snapload_download_history') || '[]'
    );
    const newItem: HistoryItem = {
      ...item,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
    };
    // Deduplicate by URL
    const filtered = existing.filter((i) => i.url !== item.url);
    const updated = [newItem, ...filtered].slice(0, 20); // Keep max 20
    localStorage.setItem('snapload_download_history', JSON.stringify(updated));
  } catch {
    // Ignore storage errors
  }
}
