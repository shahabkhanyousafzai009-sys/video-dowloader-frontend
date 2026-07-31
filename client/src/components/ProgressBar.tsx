interface ProgressBarProps {
  progress: number;
  isActive: boolean;
}

export function ProgressBar({ progress, isActive }: ProgressBarProps) {
  if (!isActive) return null;

  const isIndeterminate = progress <= 0;

  return (
    <div className="w-full animate-fade-in">
      {/* Progress bar container */}
      <div className="relative w-full h-2 rounded-full overflow-hidden
                      dark:bg-white/[0.06] bg-dark-200/30">
        {isIndeterminate ? (
          /* Indeterminate shimmer */
          <div className="absolute inset-0 progress-bar-fill rounded-full"
               style={{ width: '40%', animation: 'indeterminate 1.5s ease-in-out infinite' }} />
        ) : (
          /* Determinate progress */
          <div className="h-full rounded-full progress-bar-fill transition-all duration-500 ease-out"
               style={{ width: `${Math.min(100, progress)}%` }} />
        )}
      </div>

      {/* Progress text */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs dark:text-white/40 text-dark-400 flex items-center gap-1.5">
          {progress >= 100 ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                   className="text-emerald-400">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              Download complete!
            </>
          ) : (
            <>
              <div className="spinner !w-3 !h-3 !border-[1.5px]" />
              Downloading...
            </>
          )}
        </span>
        {!isIndeterminate && (
          <span className="text-xs font-mono font-semibold dark:text-white/50 text-dark-500">
            {Math.round(progress)}%
          </span>
        )}
      </div>

      <style>{`
        @keyframes indeterminate {
          0% { left: -40%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
}
