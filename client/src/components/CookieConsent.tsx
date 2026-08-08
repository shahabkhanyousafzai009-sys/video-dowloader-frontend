import { useState, useEffect } from 'react';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState<boolean>(false);

  useEffect(() => {
    const consent = localStorage.getItem('snapload_cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('snapload_cookie_consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('snapload_cookie_consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-slide-up">
      <div className="glass-strong rounded-2xl p-5 border border-white/20 shadow-2xl backdrop-blur-xl text-left">
        <div className="flex items-start gap-3">
          <span className="text-2xl shrink-0">🍪</span>
          <div className="flex-1 text-xs sm:text-sm text-gray-700 dark:text-gray-200">
            <h4 className="font-bold text-gray-900 dark:text-white mb-1">
              We value your privacy
            </h4>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              SnapLoad uses essential cookies to ensure peak performance and non-intrusive analytics. No personal video data is tracked.
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={handleDecline}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-gray-500 dark:text-gray-400 hover:bg-white/10 transition-all"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="btn-primary !px-4 !py-1.5 !rounded-xl text-xs font-bold"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
