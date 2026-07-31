/**
 * Rate Limiting Middleware
 * Prevents abuse by limiting requests per IP
 */

const rateLimit = require('express-rate-limit');

const windowMs = (parseInt(process.env.RATE_LIMIT_WINDOW_MIN, 10) || 15) * 60 * 1000;

const isRateLimitDisabled = process.env.DISABLE_RATE_LIMIT === 'true';

// Rate limiter for /api/info endpoint (metadata fetching)
const infoLimiter = isRateLimitDisabled
  ? (req, res, next) => next()
  : rateLimit({
      windowMs,
      max: parseInt(process.env.RATE_LIMIT_INFO_MAX, 10) || 30,
      message: {
        error: 'Too many requests',
        message: 'You have exceeded the rate limit for video info requests. Please try again later.',
        retryAfter: Math.ceil(windowMs / 1000),
      },
      standardHeaders: true,
      legacyHeaders: false,
      keyGenerator: (req) => {
        return req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip;
      },
    });

// Stricter rate limiter for /api/download endpoint (bandwidth-intensive)
const downloadLimiter = isRateLimitDisabled
  ? (req, res, next) => next()
  : rateLimit({
      windowMs,
      max: parseInt(process.env.RATE_LIMIT_DOWNLOAD_MAX, 10) || 10,
      message: {
        error: 'Too many downloads',
        message: 'You have exceeded the download rate limit. Please try again later.',
        retryAfter: Math.ceil(windowMs / 1000),
      },
      standardHeaders: true,
      legacyHeaders: false,
      keyGenerator: (req) => {
        return req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip;
      },
    });

module.exports = { infoLimiter, downloadLimiter };
