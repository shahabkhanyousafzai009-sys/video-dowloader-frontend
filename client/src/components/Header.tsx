import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="w-full animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 
                            flex items-center justify-center shadow-glow">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"
                   strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold dark:text-white text-dark-900">
              Snap<span className="gradient-text">Load</span>
            </h1>
            <p className="text-[10px] font-medium tracking-widest uppercase 
                          dark:text-white/40 text-dark-500">
              Universal Video Downloader
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
