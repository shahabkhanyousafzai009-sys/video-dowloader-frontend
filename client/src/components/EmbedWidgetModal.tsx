import React, { useState } from 'react';

interface EmbedWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmbedWidgetModal: React.FC<EmbedWidgetModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const embedCode = `<iframe src="https://snaploaddownload.com/widget" width="100%" height="320" frameborder="0" style="border-radius:12px;overflow:hidden;" title="SnapLoad Free Video Downloader Widget"></iframe>\n<p style="font-size:12px;text-align:center;margin-top:6px;"><a href="https://snaploaddownload.com" target="_blank" rel="noopener" style="color:#06b6d4;text-decoration:none;font-weight:600;">Powered by SnapLoad Video Downloader</a></p>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="glass-strong rounded-2xl max-w-xl w-full p-6 space-y-6 border border-white/10 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-400 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            Embed Widget for Websites &amp; Blogs
          </div>
          <h2 className="text-2xl font-extrabold dark:text-white text-dark-900">
            Add Free Video Downloader to Your Site
          </h2>
          <p className="text-xs dark:text-white/60 text-dark-600 leading-relaxed">
            Allow your visitors to download TikTok videos without watermark, Instagram Reels, and convert videos to MP3 directly on your website.
          </p>
        </div>

        {/* Live Widget Preview Box */}
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider dark:text-white/40 text-dark-400">
            Live Preview
          </p>
          <div className="glass-subtle rounded-xl p-4 border border-white/5 space-y-3 bg-dark-900/60">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                SnapLoad Free Downloader
              </span>
              <span className="text-[10px] text-white/40">Compact Widget</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value="https://www.tiktok.com/@user/video/12345..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/50"
              />
              <button readOnly className="bg-primary-500 text-white font-bold text-xs px-4 py-2 rounded-lg flex-shrink-0">
                Download
              </button>
            </div>
            <p className="text-[11px] text-center text-primary-400 font-medium">
              Powered by SnapLoad Video Downloader
            </p>
          </div>
        </div>

        {/* HTML Embed Snippet */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider dark:text-white/40 text-dark-400">
              Copy HTML Code Snippet
            </p>
            {copied && (
              <span className="text-xs font-bold text-emerald-400 animate-fade-in flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied to Clipboard!
              </span>
            )}
          </div>
          <div className="relative">
            <pre className="glass p-3 rounded-xl text-[11px] font-mono dark:text-white/80 text-dark-800 overflow-x-auto border border-white/10 max-h-24">
              {embedCode}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-primary-500 hover:bg-primary-400 text-white shadow-md transition-all cursor-pointer flex items-center gap-1"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
        </div>

        {/* Modal Footer Note */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
          <span>Fully responsive • Works on mobile &amp; desktop</span>
          <button onClick={onClose} className="hover:text-white underline">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
