interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

export function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  return (
    <div className="animate-slide-up">
      <div className="glass rounded-2xl p-5 border-red-400/20
                      dark:bg-red-500/[0.08] bg-red-50/80">
        <div className="flex items-start gap-3">
          {/* Error icon */}
          <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                 className="text-red-400">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>

          {/* Message */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-red-400 mb-1">Something went wrong</h4>
            <p className="text-sm dark:text-white/60 text-dark-600 leading-relaxed">{message}</p>
          </div>

          {/* Dismiss */}
          <button
            onClick={onDismiss}
            className="p-1.5 rounded-lg dark:text-white/30 text-dark-400
                       hover:bg-white/10 transition-all flex-shrink-0"
            aria-label="Dismiss error"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Retry hint */}
        <div className="mt-3 pt-3 border-t dark:border-white/5 border-dark-200/30">
          <p className="text-xs dark:text-white/30 text-dark-400">
            💡 Tips: Make sure the link is public and the video hasn't been removed.
            For Instagram, the post must be from a public account.
          </p>
        </div>
      </div>
    </div>
  );
}
