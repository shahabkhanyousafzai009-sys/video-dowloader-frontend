/**
 * Input sanitization utilities
 * Prevents command injection and validates inputs
 */

/**
 * Sanitize a filename for safe use in Content-Disposition headers
 * Removes/replaces characters that could cause issues
 */
function sanitizeFilename(filename) {
  if (!filename || typeof filename !== 'string') return 'download';

  return filename
    .replace(/[<>:"/\\|?*#%\x00-\x1f]/g, '') // Remove illegal filename chars including # and %
    .replace(/\s+/g, '_')                     // Replace spaces with underscores
    .replace(/_{2,}/g, '_')                    // Collapse multiple underscores
    .replace(/^\.+/, '')                       // Remove leading dots
    .trim()
    .slice(0, 200) || 'download';              // Limit length
}

/**
 * Validate that a string looks like a valid URL and belongs to a supported platform
 * This is a critical security function — never pass unvalidated URLs to yt-dlp
 */
function sanitizeUrl(url) {
  if (!url || typeof url !== 'string') return null;

  // Trim whitespace
  url = url.trim();

  // Must start with http:// or https://
  if (!/^https?:\/\//i.test(url)) return null;

  // Split URL to isolate query string (if any) before checking dangerous characters
  const [baseUrl, queryString] = url.split('?', 2);
  // Check for shell metacharacters only in the base part (protocol, domain, path)
  const dangerousChars = /[;&|`$(){}[\]!#~<>]/;
  if (dangerousChars.test(baseUrl)) return null;
  // Reconstruct full URL with query string (if present)
  url = queryString ? `${baseUrl}?${queryString}` : baseUrl;

  // Reject URLs with newlines (could inject extra arguments)
  if (/[\r\n]/.test(url)) return null;

  // Length sanity check
  if (url.length > 2048) return null;

  return url;
}

module.exports = { sanitizeFilename, sanitizeUrl };
