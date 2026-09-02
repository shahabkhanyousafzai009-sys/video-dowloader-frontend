/**
 * URL Validation Middleware
 * Validates incoming URLs against supported platform patterns
 */

const { sanitizeUrl } = require('../utils/sanitize');
const { isSupportedUrl } = require('../utils/platforms');

function validateUrl(req, res, next) {
  const url = req.query.url || req.body?.url;

  if (!url) {
    return res.status(400).json({
      error: 'Missing URL',
      message: 'Please provide a video URL using the "url" query parameter.',
    });
  }

  // Sanitize the URL (check for injection attempts)
  const cleanUrl = sanitizeUrl(url);
  if (!cleanUrl) {
    return res.status(400).json({
      error: 'Invalid URL',
      message: 'The provided URL contains invalid characters or is malformed.',
    });
  }

  // Check if URL is from a supported platform
  if (!isSupportedUrl(cleanUrl)) {
    return res.status(400).json({
      error: 'Unsupported platform',
      message: 'Only TikTok, Instagram, and Facebook URLs are supported.',
      supportedPlatforms: ['tiktok.com', 'instagram.com', 'facebook.com', 'fb.watch'],
    });
  }

  // Attach clean URL to request for downstream use
  req.cleanUrl = cleanUrl;
  next();
}

module.exports = { validateUrl };
