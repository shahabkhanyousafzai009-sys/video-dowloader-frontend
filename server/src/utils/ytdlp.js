const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const { buildInfoArgs, buildDownloadArgs, detectPlatform, parseFormats, PLATFORM_META, resolveShortUrl } = require('./platforms');

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

const YTDLP_BIN = process.env.YTDLP_PATH || 'yt-dlp';
const FFMPEG_BIN = (() => {
  if (process.env.FFMPEG_PATH) return process.env.FFMPEG_PATH;
  try {
    const ffmpegStatic = require('ffmpeg-static');
    return ffmpegStatic;
  } catch {
    return 'ffmpeg';
  }
})();

async function getVideoInfo(rawUrl) {
  let url = await resolveShortUrl(rawUrl);
  const platform = detectPlatform(url);
  if (!platform) {
    return Promise.reject(new Error('Unsupported platform'));
  }

  // Strip TikTok tracking params early — they break yt-dlp and all fallback APIs
  if (platform === 'tiktok') {
    url = url.split('?')[0];
    console.log(`[getVideoInfo] TikTok URL cleaned: ${url}`);
  }

  return new Promise((resolve, reject) => {
    const args = buildInfoArgs(url, platform);
    const proc = spawn(YTDLP_BIN, args, {
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: platform === 'tiktok' ? 8000 : 30000,
    });

    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', (chunk) => { stdout += chunk.toString(); });
    proc.stderr.on('data', (chunk) => { stderr += chunk.toString(); });

    proc.on('close', (code) => {
      if (code !== 0) {
        console.error(`[yt-dlp info] Exit code ${code}: ${stderr}`);
        const lowercaseStderr = stderr.toLowerCase();
        const errorMessage = 
          lowercaseStderr.includes('video unavailable') ? 'This video is unavailable or private.' :
          (lowercaseStderr.includes('login') || lowercaseStderr.includes('log in') || lowercaseStderr.includes('cookie')) ? 
            'This content is age-restricted or requires cookies. Please place a cookies.txt file in the server directory.' :
          lowercaseStderr.includes('geo') ? 'This content is geo-restricted.' :
          `Failed to fetch video info (code ${code})`;
        return reject(new Error(errorMessage));
      }

      try {
        const info = JSON.parse(stdout);
        const formats = parseFormats(info, platform);
        const meta = PLATFORM_META[platform];

        resolve({
          title: info.title || 'Untitled',
          thumbnail: info.thumbnail || info.thumbnails?.[info.thumbnails.length - 1]?.url || null,
          duration: info.duration || 0,
          uploader: info.uploader || info.channel || 'Unknown',
          viewCount: info.view_count || null,
          platform: {
            id: platform,
            name: meta.name,
            color: meta.color,
            icon: meta.icon,
          },
          formats,
          originalUrl: url,
        });
      } catch (parseErr) {
        reject(new Error('Failed to parse video metadata'));
      }
    });

    proc.on('error', (err) => {
      reject(new Error(`yt-dlp not found. Ensure yt-dlp is installed and in PATH. (${err.message})`));
    });
  }).catch((err) => {
    if (platform === 'tiktok') {
      console.log(`[yt-dlp info] Failed. Attempting TikTok fallback extraction for: ${url}`);
      return getTikTokInfoFallback(url);
    }
    if (platform === 'instagram') {
      console.log(`[yt-dlp info] Failed. Attempting Instagram fallback extraction for: ${url}`);
      return getInstagramInfoFallback(url);
    }
    if (platform === 'facebook') {
      console.log(`[yt-dlp info] Failed. Attempting Facebook fallback extraction for: ${url}`);
      return getFacebookInfoFallback(url);
    }
    throw err;
  });
}

function streamDirect(url, formatId, headers, res) {
  const platform = detectPlatform(url);
  const tmpDir = path.join(__dirname, '../../tmp');
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }

  const ext = headers.contentType.includes('audio') ? 'mp3' : 'mp4';
  const tmpFile = path.join(tmpDir, `snapload_${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`);

  const args = buildDownloadArgs(url, platform, formatId, ext === 'mp3' ? 'audio' : 'video');
  if (FFMPEG_BIN) {
    args.unshift('--ffmpeg-location', FFMPEG_BIN);
  }
  
  // Replace the stdout output path argument '-o -' with our temp file
  const oIdx = args.indexOf('-o');
  if (oIdx !== -1) {
    args[oIdx + 1] = tmpFile;
  } else {
    args.push('-o', tmpFile);
  }

  const proc = spawn(YTDLP_BIN, args, {
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  proc.stderr.on('data', (data) => {
    console.error(`[yt-dlp stream] ${data.toString()}`);
  });

  proc.on('error', (err) => {
    console.error(`[yt-dlp stream] Process error: ${err.message}`);
    if (!res.headersSent) {
      res.status(500).json({ success: false, error: 'Download process failed to start' });
    }
  });

  proc.on('close', (code) => {
    if (code !== 0) {
      if (fs.existsSync(tmpFile)) {
        try { fs.unlinkSync(tmpFile); } catch (e) { }
      }
      console.error(`[yt-dlp stream] Failed with code ${code}`);

      // If we used a specific format, retry with default format first!
      if (formatId && formatId !== 'best') {
        console.log(`[yt-dlp stream] Retrying download with default format for: ${url}`);
        return streamDirect(url, null, headers, res);
      }

      if (platform === 'tiktok') {
        console.log(`[yt-dlp stream] Attempting TikTok download fallback for: ${url}`);
        return handleTikTokDownloadFallback(url, formatId, headers, res);
      }
      if (platform === 'instagram') {
        console.log(`[yt-dlp stream] Attempting Instagram download fallback for: ${url}`);
        return handleInstagramDownloadFallback(url, formatId, headers, res);
      }
      if (platform === 'facebook') {
        console.log(`[yt-dlp stream] Attempting Facebook download fallback for: ${url}`);
        return handleFacebookDownloadFallback(url, formatId, headers, res);
      }
      if (!res.headersSent) {
        res.status(500).json({ success: false, error: 'Download process failed' });
      }
      return;
    }

    if (fs.existsSync(tmpFile)) {
      const stats = fs.statSync(tmpFile);
      res.setHeader('Content-Type', headers.contentType);
      res.setHeader('Content-Disposition', headers.contentDisposition);
      res.setHeader('Content-Length', stats.size);

      const fileStream = fs.createReadStream(tmpFile);
      fileStream.pipe(res);

      fileStream.on('close', () => {
        fs.unlink(tmpFile, (err) => {
          if (err) console.error(`[cleanup] Failed to delete temp file: ${err.message}`);
        });
      });
    } else {
      if (!res.headersSent) {
        res.status(500).json({ success: false, error: 'Downloaded file not found' });
      }
    }
  });

  res.on('close', () => {
    try { proc.kill('SIGTERM'); } catch (e) { }
    setTimeout(() => {
      if (fs.existsSync(tmpFile)) {
        fs.unlink(tmpFile, (err) => { /* ignore */ });
      }
    }, 1000);
  });

  return proc;
}

function streamMerged(url, formatSpec, headers, res, req) {
  const platform = detectPlatform(url);

  const tmpDir = path.join(__dirname, '../../tmp');
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }
  const tmpFile = path.join(tmpDir, `snapload_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.mp4`);
  let cleaned = false;
  let streamActive = false;

  const clean = () => {
    if (!cleaned) {
      cleaned = true;
      clearInterval(keepAlive);
      try { fs.unlinkSync(tmpFile); } catch (e) { }
    }
  };

  // Keep socket alive while downloading (no data flows during yt-dlp download)
  const keepAlive = setInterval(() => {
    if (!streamActive && req && req.socket && !req.socket.destroyed) {
      req.socket.setTimeout(60000);
    }
  }, 30000);

  const tiktokArgs = platform === 'tiktok' ? ['--impersonate', 'Chrome', '--extractor-retries', '5'] : [];
  const youtubeArgs = platform === 'youtube' ? ['--extractor-args', 'youtube:player-client=ios,android'] : [];
  const proc = spawn(YTDLP_BIN, [
    '-q',
    '--no-playlist',
    '-f', formatSpec,
    '--merge-output-format', 'mp4',
    '--ffmpeg-location', FFMPEG_BIN,
    '-o', tmpFile,
    ...tiktokArgs,
    ...youtubeArgs,
    ...(process.env.PROXY_URL ? ['--proxy', process.env.PROXY_URL] : []),
    ...(getCookiesPath() ? ['--cookies', getCookiesPath()] : []),
    url,
  ], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  proc.stderr.on('data', (d) => {
    const msg = d.toString();
    console.error(`[yt-dlp merge] ${msg}`);
  });
  console.log(`[yt-dlp merge] Downloading to: ${tmpFile}`);
  console.log(`[yt-dlp merge] Format spec: ${formatSpec}`);

  proc.on('error', (err) => {
    console.error(`[yt-dlp merge] Process error: ${err.message}`);
    if (!res.headersSent) {
      res.status(500).json({ success: false, error: 'Merge process failed to start' });
    }
    clean();
  });

  proc.on('close', (code) => {
    if (code !== 0) {
      console.error(`[yt-dlp merge] Exited with code ${code}`);
      clean();
      console.log(`[yt-dlp merge] Retrying with default best combined stream for: ${url}`);
      return streamDirect(url, null, headers, res);
    }

    if (!fs.existsSync(tmpFile)) {
      console.error(`[yt-dlp merge] Output file not found: ${tmpFile}`);
      if (!res.headersSent) {
        res.status(500).json({ success: false, error: 'Download failed - output file was not created.' });
      }
      clean();
      return;
    }

    try {
      const stat = fs.statSync(tmpFile);
      if (stat.size === 0) {
        console.error(`[yt-dlp merge] Output file is empty: ${tmpFile}`);
        if (!res.headersSent) {
          res.status(500).json({ success: false, error: 'Download failed - output file is empty.' });
        }
        clean();
        return;
      }
      res.setHeader('Content-Type', headers.contentType);
      res.setHeader('Content-Disposition', headers.contentDisposition);
      res.setHeader('Content-Length', stat.size);

      streamActive = true;
      const stream = fs.createReadStream(tmpFile);
      stream.pipe(res);

      stream.on('error', (err) => {
        console.error(`[yt-dlp merge] Stream error: ${err.message}`);
        if (!res.headersSent) {
          res.status(500).json({ success: false, error: 'Failed to stream file' });
        }
        clean();
      });

      stream.on('end', clean);

      res.on('close', () => {
        stream.destroy();
        clean();
        try { proc.kill('SIGTERM'); } catch (e) { }
      });
    } catch (err) {
      console.error(`[yt-dlp merge] File error: ${err.message}`);
      if (!res.headersSent) {
        res.status(500).json({ success: false, error: 'Failed to read downloaded file' });
      }
      clean();
    }
  });

  return { ytdlp: proc };
}

function streamAudio(url, quality = '192', headers, res) {
  const platform = detectPlatform(url);
  const audioBitrate = quality === '320' ? '320k' : '192k';

  const tiktokArgs = platform === 'tiktok' ? ['--impersonate', 'Chrome', '--extractor-retries', '5'] : [];
  const youtubeArgs = platform === 'youtube' ? ['--extractor-args', 'youtube:player-client=ios,android'] : [];
  const ytdlp = spawn(YTDLP_BIN, [
    '--no-playlist',
    '-f', 'ba/b',
    '-o', '-',
    ...tiktokArgs,
    ...youtubeArgs,
    ...(process.env.PROXY_URL ? ['--proxy', process.env.PROXY_URL] : []),
    ...(getCookiesPath() ? ['--cookies', getCookiesPath()] : []),
    url,
  ], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  const ffmpeg = spawn(FFMPEG_BIN, [
    '-i', 'pipe:0',
    '-vn',
    '-acodec', 'libmp3lame',
    '-ab', audioBitrate,
    '-f', 'mp3',
    'pipe:1',
  ], {
    stdio: ['pipe', 'pipe', 'pipe'],
  });

  res.setHeader('Content-Type', headers.contentType);
  res.setHeader('Content-Disposition', headers.contentDisposition);

  ffmpeg.stdout.pipe(res);
  ytdlp.stdout.pipe(ffmpeg.stdin);

  ytdlp.stderr.on('data', (d) => console.error(`[yt-dlp audio] ${d.toString()}`));
  ffmpeg.stderr.on('data', (d) => {
    const msg = d.toString();
    if (msg.includes('Error') || msg.includes('Invalid')) {
      console.error(`[ffmpeg audio] ${msg}`);
    }
  });

  ytdlp.on('error', (err) => {
    console.error(`[yt-dlp audio] Process error: ${err.message}`);
    ffmpeg.kill();
  });

  ytdlp.on('close', (code) => {
    if (code !== 0 && code !== null) {
      console.error(`[yt-dlp audio] Exited with code ${code}`);
    }
    if (!ffmpeg.killed) {
      ffmpeg.stdin.end();
    }
  });

  ffmpeg.on('error', (err) => {
    console.error(`[ffmpeg audio] Process error: ${err.message}`);
    ytdlp.kill();
  });

  res.on('close', () => {
    try { ytdlp.kill('SIGTERM'); } catch (e) { }
    try { ffmpeg.kill('SIGTERM'); } catch (e) { }
  });

  return { ytdlp, ffmpeg };
}

module.exports = { getVideoInfo, streamDirect, streamMerged, streamAudio };

const querystring = require('querystring');
const https = require('https');

function getTikTokInfoFallback(url) {
  // Always strip tracking query params before any fallback
  const cleanUrl = url.split('?')[0];
  console.log(`[TikTok fallback] Clean URL: ${cleanUrl}`);
  console.log(`[TikTok fallback] Trying TikWM POST API first...`);
  return getTikWMInfo(cleanUrl)
    .catch((err) => {
      console.warn(`[TikTok fallback] TikWM failed (${err.message}). Trying SSSTik...`);
      return getSSSTikInfo(cleanUrl);
    })
    .catch((err) => {
      console.warn(`[TikTok fallback] SSSTik failed (${err.message}). Trying Lovetik...`);
      return getLovetikInfo(cleanUrl);
    })
    .catch((err) => {
      console.warn(`[TikTok fallback] Lovetik failed (${err.message}). Trying TikTok oEmbed...`);
      return getTikTokOEmbedInfo(cleanUrl);
    });
}

function getTikWMInfo(url) {
  return new Promise((resolve, reject) => {
    const cleanUrl = url.split('?')[0];
    // Use form-urlencoded POST (matching real TikWM website behavior — JSON POST gets CF-blocked)
    const postData = querystring.stringify({ url: cleanUrl, count: 12, cursor: 0, web: 1, hd: 1 });

    const reqOptions = {
      hostname: 'www.tikwm.com',
      port: 443,
      path: '/api/',
      method: 'POST',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Content-Length': Buffer.byteLength(postData),
        'Origin': 'https://www.tikwm.com',
        'Referer': 'https://www.tikwm.com/',
        'sec-ch-ua': '"Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
    };

    const req = https.request(reqOptions, (rawRes) => {
      // Handle gzip/deflate/br compressed responses
      const zlib = require('zlib');
      let res = rawRes;
      const encoding = rawRes.headers['content-encoding'];
      if (encoding === 'gzip') {
        res = rawRes.pipe(zlib.createGunzip());
      } else if (encoding === 'deflate') {
        res = rawRes.pipe(zlib.createInflate());
      } else if (encoding === 'br') {
        res = rawRes.pipe(zlib.createBrotliDecompress());
      }

      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          // Log first 200 chars if not JSON for debugging on Render
          if (!data.trim().startsWith('{') && !data.trim().startsWith('[')) {
            console.error(`[TikWM] Non-JSON response (${rawRes.statusCode}): ${data.substring(0, 200)}`);
            return reject(new Error(`TikWM returned non-JSON (status ${rawRes.statusCode})`));
          }

          const json = JSON.parse(data);
          if (json.code !== 0) {
            return reject(new Error(json.msg || 'TikWM failed'));
          }

          const formats = [];
          const videoData = json.data;

          // TikWM POST API returns relative paths like /video/media/play/123.mp4
          // Prepend base URL so download route can resolve them
          const tikwmUrl = (path) => {
            if (!path) return path;
            if (path.startsWith('http')) return path;
            return `https://www.tikwm.com${path.startsWith('/') ? '' : '/'}${path}`;
          };

          if (videoData.hdplay) {
            const base64Url = Buffer.from(tikwmUrl(videoData.hdplay)).toString('base64url');
            formats.push({
              formatId: `fb_${base64Url}`,
              ext: 'mp4',
              resolution: '1080p',
              width: 1080,
              height: 1920,
              filesize: null,
              hasAudio: true,
              hasVideo: true,
              qualityLabel: 'HD No Watermark (1080p)',
              vcodec: 'h264',
              acodec: 'aac',
            });
          }

          if (videoData.play) {
            const base64Url = Buffer.from(tikwmUrl(videoData.play)).toString('base64url');
            formats.push({
              formatId: `fb_${base64Url}`,
              ext: 'mp4',
              resolution: '720p',
              width: 720,
              height: 1280,
              filesize: null,
              hasAudio: true,
              hasVideo: true,
              qualityLabel: 'No Watermark (720p)',
              vcodec: 'h264',
              acodec: 'aac',
            });
          }

          if (videoData.wmplay) {
            const base64Url = Buffer.from(tikwmUrl(videoData.wmplay)).toString('base64url');
            formats.push({
              formatId: `fb_${base64Url}`,
              ext: 'mp4',
              resolution: '720p',
              width: 0,
              height: 0,
              filesize: null,
              hasAudio: true,
              hasVideo: true,
              qualityLabel: 'Watermark',
              vcodec: 'h264',
              acodec: 'aac',
            });
          }

          if (videoData.music) {
            const base64Url = Buffer.from(tikwmUrl(videoData.music)).toString('base64url');
            formats.push({
              formatId: `fb_${base64Url}`,
              ext: 'mp3',
              resolution: 'audio only',
              width: 0,
              height: 0,
              filesize: null,
              hasAudio: true,
              hasVideo: false,
              qualityLabel: 'MP3 Audio',
              vcodec: 'none',
              acodec: 'mp3',
            });
          }

          console.log(`[TikWM] Success! Found ${formats.length} formats for: ${cleanUrl}`);
          resolve({
            title: videoData.title || 'TikTok Video',
            thumbnail: videoData.cover || videoData.origin_cover || null,
            duration: videoData.duration || 0,
            uploader: videoData.author?.unique_id || videoData.author?.nickname || 'Unknown',
            viewCount: videoData.play_count || null,
            platform: {
              id: 'tiktok',
              name: 'TikTok',
              color: '#00F2EA',
              icon: '♪',
            },
            formats,
            originalUrl: url,
          });
        } catch (e) {
          console.error(`[TikWM] Parse error: ${e.message}. Response start: ${data.substring(0, 200)}`);
          reject(new Error('Failed to parse TikWM response'));
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.setTimeout(8000, () => {
      try { req.destroy(); } catch (e) { }
      reject(new Error('TikWM request timeout'));
    });
    req.write(postData);
    req.end();
  });
}

function getLovetikInfo(url) {
  return new Promise((resolve, reject) => {
    const cleanUrl = url.split('?')[0];
    const postData = querystring.stringify({ query: cleanUrl });
    const options = {
      hostname: 'lovetik.com',
      port: 443,
      path: '/api/ajax/search',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Content-Length': postData.length,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Origin': 'https://lovetik.com',
        'Referer': 'https://lovetik.com/',
      }
    };

    console.log(`[Lovetik] Querying for metadata: ${cleanUrl}`);

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          if (!data.trim().startsWith('{') && !data.trim().startsWith('[')) {
            console.error(`[Lovetik] Non-JSON response (${res.statusCode}): ${data.substring(0, 200)}`);
            return reject(new Error(`Lovetik returned non-JSON (status ${res.statusCode})`));
          }

          const json = JSON.parse(data);
          if (json.status !== 'ok') {
            return reject(new Error(json.mess || 'Failed to extract TikTok video via Lovetik'));
          }

          const formats = [];
          if (Array.isArray(json.links)) {
            const videoLinks = json.links.filter(l => l.t && (l.t.toLowerCase().includes('no watermark') || l.t.toLowerCase().includes('watermark')));
            videoLinks.forEach((link, idx) => {
              const base64Url = Buffer.from(link.a).toString('base64url');
              formats.push({
                formatId: `fb_${base64Url}`,
                ext: 'mp4',
                resolution: link.q || '720p',
                width: 0,
                height: 0,
                filesize: null,
                hasAudio: true,
                hasVideo: true,
                qualityLabel: link.t.toLowerCase().includes('no watermark') ? 'No Watermark' : 'Watermark',
                vcodec: 'h264',
                acodec: 'aac',
              });
            });

            const audioLink = json.links.find(l => l.t && (l.t.toLowerCase().includes('audio') || l.s === 'MP3'));
            if (audioLink) {
              const base64Url = Buffer.from(audioLink.a).toString('base64url');
              formats.push({
                formatId: `fb_${base64Url}`,
                ext: 'mp3',
                resolution: 'audio only',
                width: 0,
                height: 0,
                filesize: null,
                hasAudio: true,
                hasVideo: false,
                qualityLabel: 'MP3 Audio',
                vcodec: 'none',
                acodec: 'mp3',
              });
            }
          }

          console.log(`[Lovetik] Success! Found ${formats.length} formats for: ${cleanUrl}`);
          resolve({
            title: json.title || 'TikTok Video',
            thumbnail: json.cover || null,
            duration: 0,
            uploader: json.author || 'Unknown',
            viewCount: null,
            platform: {
              id: 'tiktok',
              name: 'TikTok',
              color: '#00F2EA',
              icon: '♪',
            },
            formats,
            originalUrl: url,
          });
        } catch (e) {
          console.error(`[Lovetik] Parse error: ${e.message}. Response start: ${data.substring(0, 200)}`);
          reject(new Error('Failed to parse Lovetik response'));
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.setTimeout(8000, () => {
      try { req.destroy(); } catch (e) { }
      reject(new Error('Lovetik request timeout'));
    });
    req.write(postData);
    req.end();
  });
}

// Third fallback: TikTok oEmbed API (official, no Cloudflare, works from any server)
function getTikTokOEmbedInfo(url) {
  return new Promise((resolve, reject) => {
    const cleanUrl = url.split('?')[0];
    const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(cleanUrl)}`;
    const parsed = new URL(oembedUrl);

    console.log(`[TikTok oEmbed] Fetching metadata for: ${cleanUrl}`);

    const req = https.request({
      hostname: parsed.hostname,
      port: 443,
      path: parsed.pathname + parsed.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      },
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (!json.title && !json.author_name) {
            return reject(new Error('TikTok oEmbed returned empty data'));
          }

          // Extract video ID from URL for direct API download attempt
          const videoIdMatch = cleanUrl.match(/\/video\/(\d+)/);
          const videoId = videoIdMatch ? videoIdMatch[1] : null;

          // oEmbed gives metadata only
          const formats = [];

          console.log(`[TikTok oEmbed] Got metadata: "${json.title?.substring(0, 50)}..." by ${json.author_name}`);
          resolve({
            title: json.title || 'TikTok Video',
            thumbnail: json.thumbnail_url || null,
            duration: 0,
            uploader: json.author_name || json.author_unique_id || 'Unknown',
            viewCount: null,
            platform: {
              id: 'tiktok',
              name: 'TikTok',
              color: '#00F2EA',
              icon: '♪',
            },
            formats,
            originalUrl: url,
          });
        } catch (e) {
          console.error(`[TikTok oEmbed] Parse error: ${e.message}. Response: ${data.substring(0, 200)}`);
          reject(new Error('Failed to parse TikTok oEmbed response'));
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.setTimeout(8000, () => {
      try { req.destroy(); } catch (e) { }
      reject(new Error('TikTok oEmbed timeout'));
    });
    req.end();
  });
}

function getSSSTikInfo(url) {
  return new Promise((resolve, reject) => {
    const cleanUrl = url.split('?')[0];
    console.log(`[SSSTik] Fetching token and media for: ${cleanUrl}`);

    https.get('https://ssstik.io/en-1', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const ttMatch = data.match(/tt:'([^']+)'/);
        const tt = ttMatch ? ttMatch[1] : '';

        const postData = querystring.stringify({
          id: cleanUrl,
          locale: 'en',
          tt: tt
        });

        const req = https.request({
          hostname: 'ssstik.io',
          path: '/abc?url=dl',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Content-Length': Buffer.byteLength(postData),
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'HX-Request': 'true',
            'HX-Target': 'target',
            'HX-Current-URL': 'https://ssstik.io/en-1',
          }
        }, (apiRes) => {
          let apiData = '';
          apiRes.on('data', c => apiData += c);
          apiRes.on('end', () => {
            const dlMatch = apiData.match(/href="(https:\/\/[^"]+)"[^>]*>Without watermark<\/a>/i) || apiData.match(/href="(https:\/\/[^"]+)"/i);
            const titleMatch = apiData.match(/<p class="maintext">([^<]+)<\/p>/i);
            const authorMatch = apiData.match(/<h2>([^<]+)<\/h2>/i);
            const thumbMatch = apiData.match(/<img [^>]*src="(https:\/\/[^"]+)"/i);

            if (dlMatch && dlMatch[1]) {
              const directMediaUrl = dlMatch[1];
              const base64Url = Buffer.from(directMediaUrl).toString('base64url');
              const formats = [{
                formatId: `fb_${base64Url}`,
                ext: 'mp4',
                resolution: '1080p',
                width: 1080,
                height: 1920,
                filesize: null,
                hasAudio: true,
                hasVideo: true,
                qualityLabel: 'HD No Watermark (1080p)',
                vcodec: 'h264',
                acodec: 'aac',
              }];

              console.log(`[SSSTik] Success! Media URL extracted for: ${cleanUrl}`);
              resolve({
                title: titleMatch ? titleMatch[1].trim() : 'TikTok Video',
                thumbnail: thumbMatch ? thumbMatch[1] : null,
                duration: 0,
                uploader: authorMatch ? authorMatch[1].trim() : 'Unknown',
                viewCount: null,
                platform: {
                  id: 'tiktok',
                  name: 'TikTok',
                  color: '#00F2EA',
                  icon: '♪',
                },
                formats,
                originalUrl: url,
              });
            } else {
              reject(new Error('SSSTik media link not found in response'));
            }
          });
        });

        req.on('error', (err) => reject(err));
        req.setTimeout(10000, () => {
          try { req.destroy(); } catch (e) { }
          reject(new Error('SSSTik API request timeout'));
        });
        req.write(postData);
        req.end();
      });
    }).on('error', (err) => reject(err));
  });
}

function handleTikTokDownloadFallback(url, formatId, headers, res) {
  const cleanUrl = url.split('?')[0];
  console.log(`[TikTok download fallback] Attempting download fallback for clean URL: ${cleanUrl}`);

  getTikWMInfo(cleanUrl)
    .then((info) => {
      const fbFormat = info.formats.find(f => f.formatId.startsWith('fb_') && f.hasVideo) || info.formats[0];
      if (fbFormat && fbFormat.formatId) {
        const targetUrl = Buffer.from(fbFormat.formatId.substring(3), 'base64url').toString('utf8');
        console.log(`[TikTok download fallback] Streaming TikWM media URL: ${targetUrl}`);
        return pipeWithRedirects(targetUrl, headers, res);
      }
      throw new Error('No TikWM video stream found');
    })
    .catch((err) => {
      console.warn(`[TikTok download fallback] TikWM download fallback failed (${err.message}). Trying SSSTik...`);
      return getSSSTikInfo(cleanUrl)
        .then((info) => {
          const fbFormat = info.formats.find(f => f.formatId.startsWith('fb_') && f.hasVideo) || info.formats[0];
          if (fbFormat && fbFormat.formatId) {
            const targetUrl = Buffer.from(fbFormat.formatId.substring(3), 'base64url').toString('utf8');
            console.log(`[TikTok download fallback] Streaming SSSTik media URL: ${targetUrl}`);
            return pipeWithRedirects(targetUrl, headers, res);
          }
          throw new Error('No SSSTik video stream found');
        });
    })
    .catch((err) => {
      console.warn(`[TikTok download fallback] SSSTik download fallback failed (${err.message}). Trying Lovetik...`);
      return getLovetikInfo(cleanUrl)
        .then((info) => {
          const fbFormat = info.formats.find(f => f.formatId.startsWith('fb_') && f.hasVideo) || info.formats[0];
          if (fbFormat && fbFormat.formatId) {
            const targetUrl = Buffer.from(fbFormat.formatId.substring(3), 'base64url').toString('utf8');
            console.log(`[TikTok download fallback] Streaming Lovetik media URL: ${targetUrl}`);
            return pipeWithRedirects(targetUrl, headers, res);
          }
          throw new Error('No Lovetik video stream found');
        });
    })
    .catch((err) => {
      console.error(`[TikTok download fallback] All fallbacks failed: ${err.message}`);
      if (!res.headersSent) {
        res.status(500).json({ success: false, error: 'Download process failed' });
      }
    });
}

function pipeWithRedirects(targetUrl, headers, res, depth = 0) {
  if (depth > 5) {
    console.error('[TikTok fallback stream] Too many redirects');
    if (!res.headersSent) res.status(500).json({ success: false, error: 'Too many redirects' });
    return;
  }

  const https = require('https');
  const http = require('http');
  const parsed = new URL(targetUrl);
  const client = parsed.protocol === 'https:' ? https : http;

  const isTikWM = parsed.hostname.includes('tikwm.com');
  const isLovetik = parsed.hostname.includes('lovetik.com');
  const isSSSTik = parsed.hostname.includes('ssstik') || parsed.hostname.includes('tikcdn.io');
  const referer = isTikWM ? 'https://www.tikwm.com/' :
                  isLovetik ? 'https://lovetik.com/' :
                  isSSSTik ? 'https://ssstik.io/' :
                  'https://www.tiktok.com/';
  const origin = isTikWM ? 'https://www.tikwm.com' :
                 isLovetik ? 'https://lovetik.com' :
                 isSSSTik ? 'https://ssstik.io' :
                 'https://www.tiktok.com';

  const reqOptions = {
    hostname: parsed.hostname,
    port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
    path: parsed.pathname + parsed.search,
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      'Accept': '*/*',
      'Referer': referer,
      'Origin': origin,
    },
  };

  const req = client.get(reqOptions, (streamRes) => {
    if (streamRes.statusCode >= 300 && streamRes.statusCode < 400 && streamRes.headers.location) {
      let redirectUrl = streamRes.headers.location;
      if (!redirectUrl.startsWith('http')) {
        redirectUrl = new URL(redirectUrl, targetUrl).toString();
      }
      return pipeWithRedirects(redirectUrl, headers, res, depth + 1);
    }

    if (!res.headersSent) {
      res.setHeader('Content-Type', headers.contentType);
      res.setHeader('Content-Disposition', headers.contentDisposition);
      if (streamRes.headers['content-length']) {
        res.setHeader('Content-Length', streamRes.headers['content-length']);
      }
    }
    streamRes.pipe(res);
  });

  req.on('error', (err) => {
    console.error(`[TikTok fallback stream] Error: ${err.message}`);
    if (!res.headersSent) {
      res.status(500).json({ success: false, error: 'Failed to stream video' });
    }
  });

  res.on('close', () => {
    try { req.destroy(); } catch (e) { }
  });
}

function requestWithRedirect(url, options, postData = null, depth = 0) {
  return new Promise((resolve, reject) => {
    if (depth > 5) return reject(new Error('Too many redirects'));

    const parsedUrl = new URL(url);
    const reqOptions = {
      ...options,
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80)
    };

    const client = parsedUrl.protocol === 'https:' ? https : http;
    const req = client.request(reqOptions, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = new URL(redirectUrl, url).toString();
        }
        const nextOptions = { ...options };
        if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 303) {
          nextOptions.method = 'POST';
        }
        return resolve(requestWithRedirect(redirectUrl, nextOptions, postData, depth + 1));
      }

      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, headers: res.headers, data });
      });
    });

    req.on('error', (err) => reject(err));
    if (postData && options.method === 'POST') {
      req.write(postData);
    }
    req.end();
  });
}

function getInstagramInfoFallback(url) {
  return Promise.reject(new Error('Unable to extract Instagram video info. Please verify that the post is public and accessible.'));
}

function handleInstagramDownloadFallback(url, formatId, headers, res) {
  if (!res.headersSent) {
    res.status(500).json({ success: false, error: 'Download failed. The Instagram video may be private or restricted.' });
  }
}

function getFacebookInfoFallback(url) {
  return Promise.reject(new Error('Unable to extract Facebook video info. Please verify that the video or Reel is public and accessible.'));
}

function handleFacebookDownloadFallback(url, formatId, headers, res) {
  if (!res.headersSent) {
    res.status(500).json({ success: false, error: 'Download failed. The Facebook video may be private or restricted.' });
  }
}

