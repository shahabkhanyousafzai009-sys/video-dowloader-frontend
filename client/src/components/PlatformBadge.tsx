import type { PlatformInfo } from '../utils/platforms';

interface PlatformBadgeProps {
  platform: PlatformInfo;
  size?: 'sm' | 'md' | 'lg';
}

export function PlatformBadge({ platform, size = 'md' }: PlatformBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px] gap-1',
    md: 'px-3 py-1 text-xs gap-1.5',
    lg: 'px-4 py-1.5 text-sm gap-2',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-bold text-white
                   shadow-lg badge-${platform.id} ${sizeClasses[size]}
                   animate-fade-in`}
    >
      <span>{platform.icon}</span>
      <span>{platform.name}</span>
    </span>
  );
}
