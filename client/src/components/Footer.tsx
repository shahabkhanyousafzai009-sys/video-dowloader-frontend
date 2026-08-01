export function Footer() {
  return (
    <footer className="w-full mt-16 pb-8 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4">
        {/* Disclaimer */}
        <div className="glass-subtle rounded-xl p-4 mb-6">
          <p className="text-xs dark:text-white/30 text-dark-400 text-center leading-relaxed">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="inline-block text-amber-500 mr-1.5 align-text-bottom">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <strong>Disclaimer:</strong> SnapLoad is intended for downloading content you have rights to access.
            Downloading copyrighted material without permission may violate the terms of service of the respective platforms.
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
              SnapLoad v1.0
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
}
