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
      
      // Security check: only allow known media domains
      const parsed = new URL(targetUrl);
      const allowedDomains = ['tiktokcdn.com', 'tiktokcdn-us.com', 'byteoversea.com', 'ibyteimg.com', 'muscdn.com', 'tiktok.com', 'tikwm.com', 'lovetik.com'];
      const isAllowed = allowedDomains.some(domain => parsed.hostname.endsWith(domain));
      if (!isAllowed) {
        return res.status(403).json({ error: 'Forbidden', message: 'Target domain is not allowed.' });
      }

      const https = require('https');
      res.setHeader('Content-Type', type === 'audio' ? 'audio/mpeg' : 'video/mp4');
      res.setHeader('Content-Disposition', `${dispMode}; filename="${asciiTitle}.${type === 'audio' ? 'mp3' : 'mp4'}"; filename*=UTF-8''${encodedTitle}.${type === 'audio' ? 'mp3' : 'mp4'}`);

      return https.get(targetUrl, (streamRes) => {
        if (streamRes.headers['content-length']) {
          res.setHeader('Content-Length', streamRes.headers['content-length']);
        }
        streamRes.pipe(res);
      }).on('error', (err) => {
        console.error(`[fallback stream] Error: ${err.message}`);
        if (!res.headersSent) {
          res.status(500).json({ success: false, error: 'Failed to stream video' });
        }
      });
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

module.exports = router;
