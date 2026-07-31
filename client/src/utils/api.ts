/**
 * API client configuration
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface VideoFormat {
  formatId: string;
  ext: string;
  resolution: string;
  width: number;
  height: number;
  filesize: number | null;
  hasAudio: boolean;
  hasVideo: boolean;
  qualityLabel: string;
  vcodec: string;
  acodec: string;
  fps?: number;
  tbr?: number;
}

export interface Suggestion {
  qualityLabel: string;
  formatId: string;
  audioFormatId: string | null;
  needsMerge: boolean;
  ext: string;
  filesize: number | null;
  resolution: string;
  isAudio?: boolean;
}

export interface PlatformData {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface VideoInfo {
  title: string;
  thumbnail: string | null;
  duration: number;
  uploader: string;
  viewCount: number | null;
  platform: PlatformData;
  formats: VideoFormat[];
  suggestions: Suggestion[];
  originalUrl: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Fetch video metadata from the API
 */
export async function fetchVideoInfo(url: string): Promise<VideoInfo> {
  const response = await fetch(
    `${API_BASE}/api/info?url=${encodeURIComponent(url)}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  );

  const result: ApiResponse<VideoInfo> = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || `Request failed with status ${response.status}`);
  }

  return result.data!;
}

/**
 * Build the download URL for direct browser download
 */
export function buildDownloadUrl(
  url: string,
  formatId: string,
  audioFormatId: string | null,
  type: 'video' | 'audio',
  title: string,
  quality: string = '192'
): string {
  const params = new URLSearchParams({
    url,
    format: formatId,
    type,
    title,
    quality,
  });

  if (audioFormatId) {
    params.set('audio', audioFormatId);
  }

  return `${API_BASE}/api/download?${params.toString()}`;
}
