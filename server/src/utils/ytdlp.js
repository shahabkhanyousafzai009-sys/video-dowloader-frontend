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
  const url = await resolveShortUrl(rawUrl);
  const platform = detectPlatform(url);
  if (!platform) {
    return Promise.reject(new Error('Unsupported platform'));
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
  console.log(`[TikTok fallback] Trying TikWM first for: ${url}`);
  return getTikWMInfo(url)
    .catch((err) => {
      console.warn(`[TikTok fallback] TikWM failed (${err.message}). Trying Lovetik...`);
      return getLovetikInfo(url);
    });
}

function getTikWMInfo(url) {
  return new Promise((resolve, reject) => {
    const cleanUrl = url.split('?')[0];
    const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(cleanUrl)}`;
    const parsed = new URL(apiUrl);

    const reqOptions = {
      hostname: parsed.hostname,
      port: 443,
      path: parsed.pathname + parsed.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Referer': 'https://www.tikwm.com/',
      },
    };

    const req = https.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.code !== 0) {
            return reject(new Error(json.msg || 'TikWM failed'));
          }

          const formats = [];
          const videoData = json.data;

          if (videoData.play) {
            const base64Url = Buffer.from(videoData.play).toString('base64url');
            formats.push({
              formatId: `fb_${base64Url}`,
              ext: 'mp4',
              resolution: '720p',
              width: 0,
              height: 0,
              filesize: null,
              hasAudio: true,
              hasVideo: true,
              qualityLabel: 'No Watermark',
              vcodec: 'h264',
              acodec: 'aac',
            });
          }

          if (videoData.wmplay) {
            const base64Url = Buffer.from(videoData.wmplay).toString('base64url');
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
            const base64Url = Buffer.from(videoData.music).toString('base64url');
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

          resolve({
            title: videoData.title || 'TikTok Video',
            thumbnail: videoData.cover || null,
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
          reject(new Error('Failed to parse TikWM response'));
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.setTimeout(8000, () => {
      try { req.destroy(); } catch (e) { }
      reject(new Error('TikWM request timeout'));
    });
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
        'Referer': 'https://lovetik.com/',
      }
    };

    console.log(`[TikTok fallback] Querying Lovetik for metadata: ${url}`);

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.status !== 'ok') {
            return reject(new Error(json.mess || 'Failed to extract TikTok video via fallback'));
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
          reject(new Error('Failed to parse fallback response'));
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.write(postData);
    req.end();
  });
}

function handleTikTokDownloadFallback(url, formatId, headers, res) {
  const cleanUrl = url.split('?')[0];
  console.log(`[TikTok download fallback] Attempting download fallback for clean URL: ${cleanUrl}`);

  // Try TikWM direct stream first
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
      console.warn(`[TikTok download fallback] TikWM download fallback failed (${err.message}). Trying Lovetik...`);
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

  const reqOptions = {
    hostname: parsed.hostname,
    port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
    path: parsed.pathname + parsed.search,
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      'Referer': 'https://www.tiktok.com/',
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
