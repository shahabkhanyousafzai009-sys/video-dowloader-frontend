/**
 * Platform detection and metadata for the UI
 */

import { PLATFORM_PATTERNS } from './validators';

export interface PlatformInfo {
  id: string;
  name: string;
  color: string;
  gradient: string;
  icon: string;
}

const PLATFORM_META: Record<string, PlatformInfo> = {
  tiktok: {
    id: 'tiktok',
    name: 'TikTok',
    color: '#00F2EA',
    gradient: 'linear-gradient(135deg, #00F2EA, #FF0050)',
    icon: '🎵',
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    color: '#E4405F',
    gradient: 'linear-gradient(135deg, #833AB4, #E4405F, #FCAF45)',
    icon: '📸',
  },
};

export function detectPlatform(url: string): PlatformInfo | null {
  const trimmed = url.trim();
  for (const [platform, patterns] of Object.entries(PLATFORM_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(trimmed)) {
        return PLATFORM_META[platform] || null;
      }
    }
  }
  return null;
}

export function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return '0:00';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function formatFileSize(bytes: number | null): string {
  if (!bytes) return 'Unknown size';
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(1)} ${units[unitIndex]}`;
}
