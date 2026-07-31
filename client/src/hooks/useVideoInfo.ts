import { useState, useCallback } from 'react';
import { fetchVideoInfo, VideoInfo } from '../utils/api';

interface UseVideoInfoReturn {
  videoInfo: VideoInfo | null;
  loading: boolean;
  error: string | null;
  fetchInfo: (url: string) => Promise<void>;
  reset: () => void;
}

export function useVideoInfo(): UseVideoInfoReturn {
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInfo = useCallback(async (url: string) => {
    setLoading(true);
    setError(null);
    setVideoInfo(null);

    try {
      const info = await fetchVideoInfo(url);
      setVideoInfo(info);
    } catch (err) {
      let message = err instanceof Error ? err.message : 'Failed to fetch video info';
      if (message === 'Failed to fetch' || message.includes('NetworkError')) {
        message = 'Unable to connect to the backend server. Please ensure the SnapLoad server is running on port 3001.';
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setVideoInfo(null);
    setLoading(false);
    setError(null);
  }, []);

  return { videoInfo, loading, error, fetchInfo, reset };
}
