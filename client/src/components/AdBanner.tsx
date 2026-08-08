import { useEffect, useState } from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  label?: string;
  className?: string;
}

export function AdBanner({
  slot = '1234567890',
  format = 'auto',
  label = 'Advertisement',
  className = '',
}: AdBannerProps) {
  const [isLocalhost, setIsLocalhost] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        setIsLocalhost(true);
      }
      try {
        ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle =
          (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || []).push({});
      } catch {
        // Silently ignore if blocked or in dev
      }
    }
  }, []);

  // Do not render empty ad box placeholders in local development (127.0.0.1 / localhost)
  if (isLocalhost) {
    return null;
  }

  return (
    <div className={`w-full max-w-4xl mx-auto my-6 text-center animate-fade-in ${className}`}>
      <div className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1 font-semibold">
        {label}
      </div>
      <div className="glass-subtle rounded-2xl p-2 border border-white/10 overflow-hidden flex items-center justify-center shadow-sm">
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
  );
}
