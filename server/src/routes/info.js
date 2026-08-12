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

  const qualityTiers = ['4K', '1440p', '1080p', '720p', '480p', '360p'];

  for (const tier of qualityTiers) {
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
        // Find the best matching audio stream for video-only formats
        // Prefer AAC audio (widest player compatibility) over Opus
        // Sort by bitrate (descending) to pick the highest quality
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
