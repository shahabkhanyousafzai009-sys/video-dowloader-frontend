const fs = require('fs');
const path = require('path');

/**
 * Platform detection and yt-dlp argument builders
 * Each platform has specific requirements for optimal extraction
 */

function getCookiesPath() {
  if (process.env.COOKIES_FILE) {
    return process.env.COOKIES_FILE;
  }
  const localCookiesPath = path.join(process.cwd(), 'cookies.txt');
  if (fs.existsSync(localCookiesPath)) {
    return localCookiesPath;
  }
  return null;
}

// Supported platform patterns
const PLATFORM_PATTERNS = {
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

// Platform display metadata
const PLATFORM_META = {
  youtube: { name: 'YouTube', color: '#FF0000', icon: '▶' },
  tiktok: { name: 'TikTok', color: '#00F2EA', icon: '♪' },
  instagram: { name: 'Instagram', color: '#E4405F', icon: '📷' },
};

/**
 * Detect which platform a URL belongs to
 * @returns {string|null} Platform name or null if unsupported
 */
function detectPlatform(url) {
  for (const [platform, patterns] of Object.entries(PLATFORM_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(url)) return platform;
    }
  }
  return null;
}

/**
 * Check if a URL is from a supported platform
 */
function isSupportedUrl(url) {
  return detectPlatform(url) !== null;
}

/**
 * Build yt-dlp arguments for fetching video info (metadata)
 */
function buildInfoArgs(url, platform) {
  const args = [
    '--dump-json',
    '--no-download',
    '--no-playlist',
    '--skip-download',
    '--socket-timeout', '15',
    '--extractor-retries', '5',
    ...(platform === 'tiktok' ? ['--impersonate', 'Chrome'] : []),
  ];

  // Platform-specific flags
  // Note: No --format flag for info mode — --dump-json already dumps all formats.
  // Adding --format here can trigger extraction issues with some platforms (e.g. TikTok).

  // Add proxy if configured
  if (process.env.PROXY_URL) {
    args.push('--proxy', process.env.PROXY_URL);
  }

  // Add cookies if configured
  const cookiesPath = getCookiesPath();
  if (cookiesPath) {
    args.push('--cookies', cookiesPath);
  }

  // Strip query parameters from TikTok URLs — they cause yt-dlp extraction failures
  const cleanUrl = platform === 'tiktok' ? url.split('?')[0] : url;

  // Dynamic User-Agent to reduce blocking (except on TikTok where we use --impersonate)
  if (platform !== 'tiktok') {
    args.push('--user-agent', getRandomUserAgent());
  }

  args.push(cleanUrl);
  return args;
}

/**
 * Build yt-dlp arguments for downloading/streaming video
 */
function buildDownloadArgs(url, platform, formatId, type = 'video') {
  const args = ['-q', '--no-playlist', '--extractor-retries', '5',
    ...(platform === 'tiktok' ? ['--impersonate', 'Chrome'] : [])];

  if (type === 'audio') {
    // Audio extraction mode
    args.push('-x', '--audio-format', 'mp3', '--audio-quality', '0');
    args.push('-o', '-');
  } else {
    // Video download mode
    if (formatId) {
      args.push('-f', formatId);
    } else {
      // Platform-specific format selection
      switch (platform) {
        case 'youtube':
          args.push('-f', 'bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4]/b');
          break;
        case 'tiktok':
          // Remove TikTok watermark and prefer MP4
          args.push('--tiktok-no-watermark');
          args.push('-f', 'best[ext=mp4]/best');
          break;
        case 'instagram':
          args.push('-f', 'bv*+ba/b');
          break;
        default:
          args.push('-f', 'best[ext=mp4]/best');
      }
    }
    args.push('-o', '-');
  }

  // Add proxy if configured
  if (process.env.PROXY_URL) {
    args.push('--proxy', process.env.PROXY_URL);
  }

  // Add cookies if configured
  const cookiesPath = getCookiesPath();
  if (cookiesPath) {
    args.push('--cookies', cookiesPath);
  }

  // Dynamic User-Agent (except on TikTok where we use --impersonate)
  if (platform !== 'tiktok') {
    args.push('--user-agent', getRandomUserAgent());
  }
  args.push(platform === 'tiktok' ? url.split('?')[0] : url);

  return args;
}

/**
 * Rotate through common User-Agent strings to reduce blocking
 */
function getRandomUserAgent() {
  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.2 Safari/605.1.15',
  ];
  return userAgents[Math.floor(Math.random() * userAgents.length)];
}

/**
 * Parse yt-dlp JSON output into a clean format list
 */
function parseFormats(info, platform) {
  const formats = [];
  const seen = new Set();

  if (!info.formats || !Array.isArray(info.formats)) {
    // Single format available (common for TikTok, Instagram)
    return [{
      formatId: 'best',
      ext: info.ext || 'mp4',
      resolution: `${info.width || '?'}x${info.height || '?'}`,
      width: info.width || 0,
      height: info.height || 0,
      filesize: info.filesize || info.filesize_approx || null,
      hasAudio: true,
      hasVideo: true,
      qualityLabel: guessQualityLabel(info.height),
      vcodec: info.vcodec || 'unknown',
      acodec: info.acodec || 'unknown',
    }];
  }

  for (const f of info.formats) {
    // Skip manifest-only or storyboard formats
    if (f.format_note === 'storyboard') continue;
    if (f.protocol === 'm3u8_native') continue;

    const height = f.height || 0;
    const hasVideo = f.vcodec && f.vcodec !== 'none';
    const hasAudio = f.acodec && f.acodec !== 'none';

    // For YouTube, TikTok, and Instagram, include both merged and split formats
    // For other platforms, prefer merged formats
    if (!['youtube', 'tiktok', 'instagram'].includes(platform) && !hasVideo) continue;

    const qualityLabel = guessQualityLabel(height);
    const key = `${height}-${hasVideo}-${hasAudio}-${f.ext}`;

    // Avoid duplicate quality levels (keep the best one)
    if (seen.has(key)) continue;
    seen.add(key);

    formats.push({
      formatId: String(f.format_id),
      ext: f.ext || 'mp4',
      resolution: height ? `${f.width || '?'}x${height}` : 'audio only',
      width: f.width || 0,
      height,
      filesize: f.filesize || f.filesize_approx || null,
      hasAudio,
      hasVideo,
      qualityLabel: hasVideo ? qualityLabel : 'Audio',
      vcodec: f.vcodec || 'none',
      acodec: f.acodec || 'none',
      fps: f.fps || null,
      tbr: f.tbr || null,
    });
  }

  // Sort: highest quality first
  formats.sort((a, b) => (b.height || 0) - (a.height || 0));

  return formats;
}

function guessQualityLabel(height) {
  if (!height) return 'Unknown';
  if (height >= 2160) return '4K';
  if (height >= 1440) return '1440p';
  if (height >= 1080) return '1080p';
  if (height >= 720) return '720p';
  if (height >= 480) return '480p';
  if (height >= 360) return '360p';
  if (height >= 240) return '240p';
  return '144p';
}

module.exports = {
  PLATFORM_PATTERNS,
  PLATFORM_META,
  detectPlatform,
  isSupportedUrl,
  buildInfoArgs,
  buildDownloadArgs,
  parseFormats,
};
