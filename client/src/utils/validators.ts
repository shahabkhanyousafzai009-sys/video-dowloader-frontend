/**
 * URL validation utilities for supported social media platforms
 */

export const PLATFORM_PATTERNS: Record<string, RegExp[]> = {
  youtube: [
    /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+/i,
    /^https?:\/\/(www\.)?youtube\.com\/shorts\/[\w-]+/i,
    /^https?:\/\/youtu\.be\/[\w-]+/i,
    /^https?:\/\/(www\.)?youtube\.com\/embed\/[\w-]+/i,
    /^https?:\/\/(music\.)?youtube\.com\/watch\?v=[\w-]+/i,
  ],
  tiktok: [
    /^https?:\/\/(www\.)?tiktok\.com\/@[\w.-]+\/video\/\d+/i,
    /^https?:\/\/(vm|vt|v)\.tiktok\.com\/[\w-]+/i,
    /^https?:\/\/(www\.)?tiktok\.com\/t\/[\w-]+/i,
  ],
  instagram: [
    /^https?:\/\/(www\.)?instagram\.com\/(p|reel|reels|tv)\/[\w-]+/i,
    /^https?:\/\/(www\.)?instagram\.com\/stories\/[\w.-]+\/\d+/i,
  ],
};

export function isValidUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  try {
    new URL(url.trim());
    return /^https?:\/\//i.test(url.trim());
  } catch {
    return false;
  }
}

export function isSupportedUrl(url: string): boolean {
  const trimmed = url.trim();
  for (const patterns of Object.values(PLATFORM_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(trimmed)) return true;
    }
  }
  return false;
}

export function getValidationMessage(url: string): string | null {
  if (!url.trim()) return null;
  if (!isValidUrl(url)) return 'Please enter a valid URL';
  if (!isSupportedUrl(url)) return 'Only YouTube, TikTok, and Instagram URLs are supported';
  return null;
}
