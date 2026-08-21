import { useEffect, useRef } from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  label?: string;
  className?: string;
}

export function AdBanner({
  slot = '1234567890',
  format = 'auto',
  label = 'ADVERTISEMENT',
  className = '',
}: AdBannerProps) {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Push Google AdSense ad unit safely
    try {
      ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle =
        (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || []).push({});
    } catch {
      // Silently ignore if blocked or in development mode
    }
  }, []);

  return (
    <div className={`w-full max-w-4xl mx-auto my-8 animate-fade-in ${className}`}>
      {/* Policy-Required Clear Ad Labeling */}
      <div className="text-center font-bold text-[11px] md:text-xs uppercase tracking-[0.25em] text-slate-400 dark:text-gray-400/90 mb-2.5 font-sans">
        {label}
      </div>

      {/* Main Container — Strictly non-clickable wrapper to prevent invalid click triggers */}
      <div
        className="relative w-full rounded-2xl md:rounded-3xl border border-white/10 dark:border-white/10 border-slate-300/30 bg-[#0c091d]/85 dark:bg-[#0c091d]/95 backdrop-blur-xl shadow-2xl p-4 md:p-6 min-h-[220px] md:min-h-[260px] flex items-center justify-center overflow-hidden transition-all duration-300"
      >
        <div ref={adContainerRef} className="w-full flex items-center justify-center min-h-[180px]">
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%' }}
            data-ad-client="ca-pub-9601240294629728"
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </div>
  );
}


