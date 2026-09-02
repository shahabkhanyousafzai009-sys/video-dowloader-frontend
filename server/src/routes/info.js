/**
 * GET /api/info
 * Fetches video metadata and available formats from a given URL
 *
 * Query params:
 *   url - The video URL (must be from a supported platform)
 *
 * Response:
 *   {
 *     title: string,
 *     thumbnail: string,
 *     duration: number,
 *     uploader: string,
 *     platform: { id, name, color, icon },
 *     formats: [{ formatId, ext, resolution, height, filesize, qualityLabel, ... }]
 *   }
 */

const express = require('express');
const router = express.Router();
const { validateUrl } = require('../middleware/validator');
const { infoLimiter } = require('../middleware/rateLimiter');
const { getVideoInfo } = require('../utils/ytdlp');

router.get('/', infoLimiter, validateUrl, async (req, res) => {
  try {
    const info = await getVideoInfo(req.cleanUrl);

    // Add suggested download options (simplified format choices for the UI)
    const suggestions = buildSuggestions(info.formats, info.platform.id);

    res.json({
      success: true,
      data: {
        ...info,
        suggestions,
      },
    });
  } catch (error) {
    console.error(`[/api/info] Error for URL ${req.cleanUrl}:`, error.message);

    const statusCode = error.message.includes('unavailable') ? 404
      : error.message.includes('authentication') ? 403
      : error.message.includes('geo-restricted') ? 451
      : error.message.includes('not found') ? 500
      : 500;

    res.status(statusCode).json({
      success: false,
      error: error.message || 'Failed to fetch video information.',
    });
  }
});

/**
 * Build simplified download suggestions from the full format list
 * Groups formats into user-friendly quality tiers
 */
function buildSuggestions(formats, platform) {
  const suggestions = [];

  // For Facebook & progressive platforms, add direct HD/SD formats first for fast download
  if (platform === 'facebook') {
    const hdFormat = formats.find(f => f.formatId === 'hd');
    const sdFormat = formats.find(f => f.formatId === 'sd');

    if (hdFormat) {
      suggestions.push({
        qualityLabel: '1080p Full HD',
        formatId: 'hd',
        audioFormatId: null,
        needsMerge: false,
        ext: 'mp4',
        filesize: hdFormat.filesize,
        resolution: '1080p HD',
      });
    }

    if (sdFormat) {
      suggestions.push({
        qualityLabel: '720p SD',
        formatId: 'sd',
        audioFormatId: null,
        needsMerge: false,
        ext: 'mp4',
        filesize: sdFormat.filesize,
        resolution: '720p SD',
      });
    }
  }

  // Add Lovetik fallback formats directly if present
  const fallbackFormats = formats.filter(f => f.formatId && f.formatId.startsWith('fb_'));
  if (fallbackFormats.length > 0) {
    fallbackFormats.forEach(f => {
      if (f.hasVideo) {
        suggestions.push({
          qualityLabel: f.qualityLabel, // e.g. "No Watermark"
          formatId: f.formatId,
          audioFormatId: null,
          needsMerge: false,
          ext: f.ext || 'mp4',
          filesize: null,
          resolution: f.resolution || '720p',
        });
      }
    });
  }

  const qualityTiers = ['1080p', '720p', '480p', '360p', '4K', '1440p'];

  for (const tier of qualityTiers) {
    // If Facebook already added hd/sd, skip adding duplicate quality labels
    if (platform === 'facebook' && suggestions.some(s => s.qualityLabel.includes(tier))) continue;

    // Prefer formats with embedded audio (merged) over video-only DASH formats
    // This avoids silent videos when audio merge fails
    const match = formats.find(
      (f) => f.qualityLabel === tier && f.hasVideo && f.hasAudio
    ) || formats.find(
      (f) => f.qualityLabel === tier && f.hasVideo
    );
    if (match) {
      const needsMerge = !match.hasAudio;
      let audioFormatId = null;

      if (needsMerge) {
        const audioStream = formats
          .filter((f) => !f.hasVideo && f.hasAudio && f.acodec && f.acodec.includes('aac'))
          .sort((a, b) => (b.abr || 0) - (a.abr || 0))[0]
          || formats.find(
            (f) => !f.hasVideo && f.hasAudio && f.acodec !== 'none'
          );
        audioFormatId = audioStream?.formatId || null;
      }

      suggestions.push({
        qualityLabel: tier,
        formatId: match.formatId,
        audioFormatId,
        needsMerge,
        ext: match.ext || 'mp4',
        filesize: match.filesize,
        resolution: match.resolution,
      });
    }
  }

  // Check if we have a direct fallback audio format (from TikWM music, Lovetik audio, etc.)
  const fallbackAudio = formats.find(f => f.formatId && f.formatId.startsWith('fb_') && f.hasAudio && !f.hasVideo)
    || formats.find(f => f.formatId && f.formatId.startsWith('fb_') && f.hasAudio);

  // Always add MP3 audio option
  suggestions.push({
    qualityLabel: 'MP3 Audio',
    formatId: fallbackAudio ? fallbackAudio.formatId : 'audio',
    audioFormatId: null,
    needsMerge: false,
    ext: 'mp3',
    filesize: null,
    resolution: 'Audio only',
    isAudio: true,
  });

  return suggestions;
}

module.exports = router;
