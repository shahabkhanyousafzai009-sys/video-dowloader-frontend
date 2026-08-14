interface DownloadButtonProps {
  onClick: () => void;
  disabled: boolean;
  downloading: boolean;
  isAudio: boolean;
}

export function DownloadButton({ onClick, disabled, downloading, isAudio }: DownloadButtonProps) {
  const handleClick = () => {
    try {
      window.open('https://omg10.com/4/11577586', '_blank', 'noopener,noreferrer');
    } catch {
      // Silently ignore if pop-up blocked
    }
    onClick();
  };

  return (
    <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <button
        id="download-button"
        onClick={handleClick}
        disabled={disabled || downloading}
        className={`w-full relative overflow-hidden rounded-2xl px-8 py-4.5
                    font-bold text-base text-white
                    bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500
                    btn-download
                    transition-all duration-300 ease-out
                    shadow-lg hover:shadow-glow-lg
                    active:scale-[0.98]
                    disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-lg
                    group`}
      >
        {/* Hover shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                        translate-x-[-200%] group-hover:translate-x-[200%]
                        transition-transform duration-700 ease-out" />

        <span className="relative flex items-center justify-center gap-3">
          {downloading ? (
            <>
              <div className="spinner !w-5 !h-5" />
              <span>Processing Download...</span>
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {isAudio ? (
                  <>
                    <path d="M9 18V5l12-2v13"/>
                    <circle cx="6" cy="18" r="3"/>
                    <circle cx="18" cy="16" r="3"/>
                  </>
                ) : (
                  <>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </>
                )}
              </svg>
              <span>{isAudio ? 'Extract Audio (MP3)' : 'Download Video'}</span>
            </>
          )}
        </span>
      </button>
    </div>
  );
}
