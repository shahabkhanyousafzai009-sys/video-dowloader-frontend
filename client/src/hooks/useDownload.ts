import { useState, useCallback } from 'react';
import { buildDownloadUrl } from '../utils/api';

interface UseDownloadReturn {
  downloading: boolean;
  progress: number;
  error: string | null;
  startDownload: (params: DownloadParams) => void;
  reset: () => void;
}

interface DownloadParams {
  url: string;
  formatId: string;
  audioFormatId: string | null;
  type: 'video' | 'audio';
  title: string;
  quality?: string;
}

export function useDownload(): UseDownloadReturn {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const startDownload = useCallback((params: DownloadParams) => {
    setDownloading(true);
    setError(null);
    setProgress(0);

    const downloadUrl = buildDownloadUrl(
      params.url,
      params.formatId,
      params.audioFormatId,
      params.type,
      params.title,
      params.quality
    );

    const ext = params.type === 'audio' ? 'mp3' : 'mp4';
    const cleanTitle = params.title.replace(/[<>:"/\\|?*\x00-\x1f]/g, '').replace(/\s+/g, '_').trim() || 'video';

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${cleanTitle}.${ext}`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Simulate progress since native browser download stream is handled out-of-process
    let currentProgress = 10;
    setProgress(currentProgress);

    const intervalId = setInterval(() => {
      currentProgress += 5;
      if (currentProgress >= 90) {
        clearInterval(intervalId);
        setProgress(100);
        setTimeout(() => {
          setDownloading(false);
        }, 1500); // Show "Download complete" for 1.5s then reset
      } else {
        setProgress(currentProgress);
      }
    }, 450); // Fills up to 90% over ~7.2 seconds while backend downloads to disk

  }, []);

  const reset = useCallback(() => {
    setDownloading(false);
    setProgress(0);
    setError(null);
  }, []);

  return { downloading, progress, error, startDownload, reset };
}
