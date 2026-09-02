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
  tiktok: [
    /^https?:\/\/(www\.)?tiktok\.com\/@[\w.-]+\/video\/\d+/i,
    /^https?:\/\/(vm|vt|v)\.tiktok\.com\/[\w-]+/i,
    /^https?:\/\/(www\.)?tiktok\.com\/t\/[\w-]+/i,
  ],
  instagram: [
    /^https?:\/\/(www\.)?instagram\.com\/(p|reel|reels|tv)\/[\w-]+/i,
    /^https?:\/\/(www\.)?instagram\.com\/stories\/[\w.-]+\/\d+/i,
  ],
  facebook: [
    /^https?:\/\/(www\.|web\.|m\.)?facebook\.com\/watch\/?\?v=\d+/i,
    /^https?:\/\/(www\.|web\.|m\.)?facebook\.com\/watch/i,
    /^https?:\/\/(www\.|web\.|m\.)?facebook\.com\/reel\/\d+/i,
    /^https?:\/\/(www\.|web\.|m\.)?facebook\.com\/share\/(v|r|p)?\/?[a-zA-Z0-9_-]+/i,
    /^https?:\/\/(www\.|web\.|m\.)?facebook\.com\/[\w.-]+\/(videos|posts|reel)\/\d+/i,
    /^https?:\/\/(www\.|web\.|m\.)?facebook\.com\/[\w.-]+\/videos\/[a-zA-Z0-9_-]+/i,
    /^https?:\/\/(www\.|web\.|m\.)?facebook\.com\/story\.php/i,
    /^https?:\/\/(www\.)?fb\.watch\/[\w-]+/i,
    /^https?:\/\/(www\.)?fb\.gg\/v\/[\w-]+/i,
  ],
};

// Platform display metadata
const PLATFORM_META = {
  tiktok: { name: 'TikTok', color: '#00F2EA', icon: '♪' },
  instagram: { name: 'Instagram', color: '#E4405F', icon: '📷' },
  facebook: { name: 'Facebook', color: '#1877F2', icon: '📘' },
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
    '--js-runtimes', 'node',
    ...(platform === 'tiktok' ? ['--impersonate', 'Chrome'] : []),
    ...(platform === 'youtube' ? ['--extractor-args', 'youtube:player-client=ios,android'] : []),
  ];

  // Add proxy if configured
  if (process.env.PROXY_URL) {
    args.push('--proxy', process.env.PROXY_URL);
  }

  // Add cookies if configured
  const cookiesPath = getCookiesPath();
  if (cookiesPath) {
    args.push('--cookies', cookiesPath);
  }

  // Strip query parameters from TikTok and Instagram URLs — they cause yt-dlp extraction failures
  const cleanUrl = ['tiktok', 'instagram'].includes(platform) ? url.split('?')[0] : url;

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
    '--js-runtimes', 'node',
    ...(platform === 'tiktok' ? ['--impersonate', 'Chrome'] : []),
    ...(platform === 'youtube' ? ['--extractor-args', 'youtube:player-client=ios,android'] : [])];

  if (type === 'audio') {
    // Audio extraction mode
    args.push('-x', '--audio-format', 'mp3', '--audio-quality', '0');
    args.push('-o', '-');
  } else {
    // Video download mode
    if (formatId) {
      if (platform === 'facebook' && formatId.endsWith('v')) {
        args.push('-f', `${formatId}+bestaudio/best[ext=mp4]/best`);
      } else {
        args.push('-f', formatId);
      }
    } else {
      // Platform-specific format selection
      switch (platform) {
        case 'tiktok':
          // Remove TikTok watermark and prefer MP4
          args.push('--tiktok-no-watermark');
          args.push('-f', 'best[ext=mp4]/best');
          break;
        case 'instagram':
          // Prefer clean progressive MP4 with audio to avoid video corruption / green line artifacts
          args.push('-f', 'best[ext=mp4]/b/best');
          args.push('--remux-video', 'mp4');
          break;
        case 'facebook':
          // Prefer best progressive or merged MP4 for Facebook
          args.push('-f', 'hd/sd/best[ext=mp4]/b/best');
          args.push('--remux-video', 'mp4');
          break;
        default:
          args.push('-f', 'best[ext=mp4]/best');
          args.push('--remux-video', 'mp4');
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
  args.push(['tiktok', 'instagram'].includes(platform) ? url.split('?')[0] : url);

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

    const height = f.height || (f.format_id === 'hd' ? 1080 : f.format_id === 'sd' ? 480 : 0);
    const hasVideo = Boolean((f.vcodec && f.vcodec !== 'none') || f.format_id === 'sd' || f.format_id === 'hd' || (f.width && f.width > 0));
    const hasAudio = Boolean((f.acodec && f.acodec !== 'none') || f.format_id === 'sd' || f.format_id === 'hd' || (f.asr && f.asr > 0) || (f.audio_channels && f.audio_channels > 0));

    // Keep audio streams for platforms that need audio extraction or merging
    if (!['tiktok', 'instagram', 'facebook', 'youtube'].includes(platform) && !hasVideo) continue;

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

/**
 * Resolve shortened TikTok / Instagram mobile redirect URLs (vt.tiktok.com, vm.tiktok.com)
 * to full video permalinks before passing to extractors
 */
function resolveShortUrl(url, depth = 0) {
  return new Promise((resolve) => {
    if (!url || typeof url !== 'string' || depth > 5) return resolve(url);

    const isShort = /^https?:\/\/(vm|vt|v)\.tiktok\.com\/[\w-]+/i.test(url) ||
                    /^https?:\/\/(www\.)?tiktok\.com\/t\/[\w-]+/i.test(url) ||
                    /^https?:\/\/(www\.)?instagr\.am\//i.test(url) ||
                    /^https?:\/\/(www\.)?fb\.watch\/[\w-]+/i.test(url) ||
                    /^https?:\/\/(www\.|web\.|m\.)?facebook\.com\/share\//i.test(url);

    if (!isShort) return resolve(url);

    try {
      const http = require('http');
      const https = require('https');
      const parsed = new URL(url);
      const client = parsed.protocol === 'https:' ? https : http;

      const options = {
        hostname: parsed.hostname,
        port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
        path: parsed.pathname + parsed.search,
        method: 'HEAD',
        headers: {
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        },
      };

      const req = client.request(options, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          let redirectUrl = res.headers.location;
          if (!redirectUrl.startsWith('http')) {
            redirectUrl = new URL(redirectUrl, url).toString();
          }
          console.log(`[url resolver] Expanded short link (${url}) -> ${redirectUrl}`);
          return resolve(resolveShortUrl(redirectUrl, depth + 1));
        }
        resolve(url);
      });

      req.on('error', (err) => {
        console.warn(`[url resolver] Error expanding URL ${url}: ${err.message}`);
        resolve(url);
      });

      req.setTimeout(4000, () => {
        try { req.destroy(); } catch (e) { }
        resolve(url);
      });
      req.end();
    } catch (e) {
      resolve(url);
    }
  });
}

module.exports = {
  PLATFORM_PATTERNS,
  PLATFORM_META,
  detectPlatform,
  isSupportedUrl,
  buildInfoArgs,
  buildDownloadArgs,
  parseFormats,
  resolveShortUrl,
};
