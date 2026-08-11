const express = require('express');
const router = express.Router();
const { validateUrl } = require('../middleware/validator');
const { downloadLimiter } = require('../middleware/rateLimiter');
const { streamDirect, streamMerged, streamAudio } = require('../utils/ytdlp');
const { sanitizeFilename } = require('../utils/sanitize');

const DOWNLOAD_TIMEOUT = parseInt(process.env.DOWNLOAD_TIMEOUT_MS, 10) || 600000;

router.get('/', downloadLimiter, validateUrl, (req, res) => {
  req.setTimeout(DOWNLOAD_TIMEOUT, () => {
    console.error(`[/api/download] Request timed out after ${DOWNLOAD_TIMEOUT}ms`);
    if (!res.headersSent) {
      res.status(504).json({ success: false, error: 'Download timed out. The video may be too large.' });
    } else if (!res.destroyed) {
      res.destroy(new Error('Timeout'));
    }
  });
  const {
    format: formatId,
    audio: audioFormatId,
    type = 'video',
    quality = '192',
    title = 'download',
  } = req.query;

  const url = req.cleanUrl;
  const safeTitle = sanitizeFilename(title);
  const asciiTitle = safeTitle.replace(/[^\x20-\x7E]/g, '') || 'download';
  const cleanDisplayTitle = title.replace(/[#%]/g, '');
  const encodedTitle = encodeURIComponent(cleanDisplayTitle);

  let processes = {};

  try {
    const isInline = req.query.inline === 'true' || req.query.disposition === 'inline';
    const dispMode = isInline ? 'inline' : 'attachment';

    if (formatId && formatId.startsWith('fb_')) {
      const targetUrl = Buffer.from(formatId.substring(3), 'base64url').toString('utf8');
      
      // Security check: allow all verified TikTok and media CDN domains
      const parsed = new URL(targetUrl);
      const allowedDomains = [
        'tiktokcdn.com',
        'tiktokcdn-us.com',
        'tiktokcdn-eu.com',
        'byteoversea.com',
        'ibyteimg.com',
        'muscdn.com',
        'tiktok.com',
        'tikwm.com',
        'lovetik.com',
        'akamaized.net',
        'ssstik.io',
        'douyin.com',
        'tiktokv.com',
        'tiktokv.us',
      ];
      const isAllowed = allowedDomains.some(domain => parsed.hostname.endsWith(domain));
      if (!isAllowed) {
        console.warn(`[fallback stream] Blocked domain: ${parsed.hostname}`);
        return res.status(403).json({ error: 'Forbidden', message: 'Target domain is not allowed.' });
      }

      res.setHeader('Content-Type', type === 'audio' ? 'audio/mpeg' : 'video/mp4');
      res.setHeader('Content-Disposition', `${dispMode}; filename="${asciiTitle}.${type === 'audio' ? 'mp3' : 'mp4'}"; filename*=UTF-8''${encodedTitle}.${type === 'audio' ? 'mp3' : 'mp4'}`);

      return streamFallbackWithRedirects(targetUrl, res);
    }

    if (type === 'audio') {
      processes = streamAudio(url, quality, {
        contentType: 'audio/mpeg',
        contentDisposition: `${dispMode}; filename="${asciiTitle}.mp3"; filename*=UTF-8''${encodedTitle}.mp3`,
      }, res);
    } else if (audioFormatId && formatId) {
      // Detect platform to decide merge strategy
      const { detectPlatform } = require('../utils/platforms');
      const platform = detectPlatform(url);
      
      if (['instagram', 'tiktok'].includes(platform)) {
        // Instagram & TikTok don't support format merging — use best combined format with audio
        processes = streamDirect(url, null, {
          contentType: 'video/mp4',
          contentDisposition: `${dispMode}; filename="${asciiTitle}.mp4"; filename*=UTF-8''${encodedTitle}.mp4`,
        }, res);
      } else {
        // Merge specific video format + best audio
        const formatSpec = `${formatId}+bestaudio[ext=m4a]`;
        processes = streamMerged(url, formatSpec, {
          contentType: 'video/mp4',
          contentDisposition: `${dispMode}; filename="${asciiTitle}.mp4"; filename*=UTF-8''${encodedTitle}.mp4`,
        }, res, req);
      }
    } else {
      const { detectPlatform } = require('../utils/platforms');
      const platform = detectPlatform(url);
      
      let targetFormatId = formatId;
      if (['instagram', 'tiktok'].includes(platform)) {
        targetFormatId = null;
      }

      processes = streamDirect(url, targetFormatId || 'best', {
        contentType: 'video/mp4',
        contentDisposition: `${dispMode}; filename="${asciiTitle}.mp4"; filename*=UTF-8''${encodedTitle}.mp4`,
      }, res);
    }

  } catch (error) {
    console.error(`[/api/download] Error:`, error.message);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        error: 'Download failed. Please try again.',
      });
    }
  }
});

/**
 * Stream fallback video URLs while handling 301/302 redirects seamlessly.
 * Uses domain-aware headers so TikWM, Lovetik, and TikTok CDNs all receive correct Referer.
 */
function streamFallbackWithRedirects(targetUrl, res, depth = 0) {
  if (depth > 5) {
    console.error('[fallback stream] Too many redirects');
    if (!res.headersSent) res.status(500).json({ success: false, error: 'Too many redirects' });
    return;
  }

  const https = require('https');
  const http = require('http');
  const parsed = new URL(targetUrl);
  const client = parsed.protocol === 'https:' ? https : http;

  // Domain-aware headers — TikWM needs tikwm.com referer, TikTok CDN needs tiktok.com
  const isTikWM = parsed.hostname.includes('tikwm.com');
  const isLovetik = parsed.hostname.includes('lovetik.com');
  const referer = isTikWM ? 'https://www.tikwm.com/' :
                  isLovetik ? 'https://lovetik.com/' :
                  'https://www.tiktok.com/';
  const origin = isTikWM ? 'https://www.tikwm.com' :
                 isLovetik ? 'https://lovetik.com' :
                 'https://www.tiktok.com';

  const reqOptions = {
    hostname: parsed.hostname,
    port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
    path: parsed.pathname + parsed.search,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      'Accept': '*/*',
      'Referer': referer,
      'Origin': origin,
    },
  };

  console.log(`[fallback stream] Streaming from ${parsed.hostname}${parsed.pathname} (depth=${depth})`);

  const req = client.get(reqOptions, (streamRes) => {
    // Follow redirects
    if (streamRes.statusCode >= 300 && streamRes.statusCode < 400 && streamRes.headers.location) {
      let redirectUrl = streamRes.headers.location;
      if (!redirectUrl.startsWith('http')) {
        redirectUrl = new URL(redirectUrl, targetUrl).toString();
      }
      console.log(`[fallback stream] Following ${streamRes.statusCode} redirect -> ${redirectUrl.substring(0, 120)}...`);
      return streamFallbackWithRedirects(redirectUrl, res, depth + 1);
    }

    // Handle error responses
    if (streamRes.statusCode >= 400) {
      let errorBody = '';
      streamRes.on('data', (chunk) => { errorBody += chunk.toString().substring(0, 200); });
      streamRes.on('end', () => {
        console.error(`[fallback stream] HTTP ${streamRes.statusCode} from ${parsed.hostname}: ${errorBody.substring(0, 200)}`);
        if (!res.headersSent) {
          res.status(502).json({ success: false, error: `Media server returned ${streamRes.statusCode}` });
        }
      });
      return;
    }

    // Success — pipe media to client
    if (streamRes.headers['content-length']) {
      res.setHeader('Content-Length', streamRes.headers['content-length']);
    }
    if (streamRes.headers['content-type'] && !res.headersSent) {
      // Preserve original content type if not already set
    }
    console.log(`[fallback stream] Streaming ${streamRes.headers['content-length'] || 'unknown'} bytes from ${parsed.hostname}`);
    streamRes.pipe(res);
  });

  req.on('error', (err) => {
    console.error(`[fallback stream] Error: ${err.message}`);
    if (!res.headersSent) {
      res.status(500).json({ success: false, error: 'Failed to stream video' });
    }
  });

  req.setTimeout(30000, () => {
    console.error(`[fallback stream] Timeout streaming from ${parsed.hostname}`);
    try { req.destroy(); } catch (e) { }
    if (!res.headersSent) {
      res.status(504).json({ success: false, error: 'Media stream timeout' });
    }
  });

  res.on('close', () => {
    try { req.destroy(); } catch (e) { }
  });
}

module.exports = router;
