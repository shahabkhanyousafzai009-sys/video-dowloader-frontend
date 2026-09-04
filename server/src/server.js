/**
 * SnapLoad — Universal Video Downloader API Server
 * Express entry point with all middleware and route mounting
 */

require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const { configureCors } = require('./middleware/cors');

// ===== Write cookies from env on startup =====
if (process.env.COOKIES_CONTENT) {
  try {
    const cookiesPath = '/tmp/cookies.txt';
    let content = process.env.COOKIES_CONTENT;
    
    // Fix newline encoding issues from environment variable pasting
    // Render may convert real newlines to literal \n or \r\n strings
    content = content.replace(/\\r\\n/g, '\n');
    content = content.replace(/\\n/g, '\n');
    content = content.replace(/\\t/g, '\t');
    content = content.replace(/\r\n/g, '\n');
    
    fs.writeFileSync(cookiesPath, content, 'utf8');
    process.env.COOKIES_FILE = cookiesPath;
    
    const lines = content.split('\n').filter(l => l.trim());
    const dataLines = lines.filter(l => !l.startsWith('#'));
    console.log(`[STARTUP] cookies.txt written to ${cookiesPath} (${lines.length} total lines, ${dataLines.length} data lines, ${content.length} bytes)`);
    
    // Validate format
    if (dataLines.length > 0) {
      const firstLine = dataLines[0];
      const cols = firstLine.split('\t');
      console.log(`[STARTUP] First cookie: ${cols.length} columns (need 7), domain: ${cols[0]}`);
      if (cols.length !== 7) {
        console.error('[STARTUP] WARNING: Cookie format looks WRONG. Expected 7 tab-separated columns per line.');
        console.error('[STARTUP] First data line preview:', firstLine.substring(0, 120));
      }
    } else {
      console.error('[STARTUP] WARNING: No data lines found in cookies (only comments/empty lines).');
    }
  } catch (e) {
    console.error('[STARTUP] Failed to write cookies.txt:', e.message);
  }
} else {
  console.log('[STARTUP] No COOKIES_CONTENT env var found.');
}


const app = express();
const PORT = parseInt(process.env.PORT, 10) || 3001;

// ===== Security Middleware =====
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false, // Served as SPA frontend
}));
app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

// ===== CORS =====
app.use(configureCors());

// ===== Body Parsing =====
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ===== Request Logging =====
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`;
    if (res.statusCode >= 400) {
      console.error(`[REQ] ${log}`);
    } else {
      console.log(`[REQ] ${log}`);
    }
  });
  next();
});

// ===== API Routes =====
const infoRouter = require('./routes/info');
const downloadRouter = require('./routes/download');
const blogRouter = require('./routes/blog');

app.use('/api/info', infoRouter);
app.use('/api/download', downloadRouter);
app.use('/api/blog', blogRouter);

// ===== Serve ads.txt for Google AdSense Crawler =====
app.get('/ads.txt', (req, res) => {
  const distAdsPath = path.join(__dirname, '../../client/dist/ads.txt');
  const publicAdsPath = path.join(__dirname, '../../client/public/ads.txt');
  const adsTxtPath = fs.existsSync(distAdsPath) ? distAdsPath : publicAdsPath;

  if (fs.existsSync(adsTxtPath)) {
    res.header('Content-Type', 'text/plain');
    return res.sendFile(adsTxtPath);
  }
  res.header('Content-Type', 'text/plain');
  res.send('google.com, pub-9601240294629728, DIRECT, f0082457d0754d40\n');
});

// ===== Dynamic Sitemap Generator (Auto-includes newly published studio articles) =====
app.get('/sitemap.xml', (req, res) => {
  try {
    const distSitemapPath = path.join(__dirname, '../../client/dist/sitemap.xml');
    const publicSitemapPath = path.join(__dirname, '../../client/public/sitemap.xml');
    
    let staticSitemapPath = '';
    if (fs.existsSync(distSitemapPath)) {
      staticSitemapPath = distSitemapPath;
    } else if (fs.existsSync(publicSitemapPath)) {
      staticSitemapPath = publicSitemapPath;
    }

    let xmlContent = '';
    if (staticSitemapPath) {
      xmlContent = fs.readFileSync(staticSitemapPath, 'utf8');
    } else {
      const today = new Date().toISOString().split('T')[0];
      xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://snaploaddownload.com/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://snaploaddownload.com/tiktok-downloader</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://snaploaddownload.com/instagram-downloader</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://snaploaddownload.com/facebook-downloader</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://snaploaddownload.com/mp3-downloader</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;
    }

    // Read server-stored custom blog posts
    const customPostsFile = path.join(__dirname, './data/custom_blog_posts.json');
    if (fs.existsSync(customPostsFile)) {
      const customPosts = JSON.parse(fs.readFileSync(customPostsFile, 'utf8') || '{}');
      const today = new Date().toISOString().split('T')[0];

      const customXmlEntries = Object.values(customPosts)
        .map(
          (post) => `  <url>
    <loc>https://snaploaddownload.com/blog/${post.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
        )
        .join('\n');

      if (customXmlEntries && xmlContent.includes('</urlset>')) {
        xmlContent = xmlContent.replace('</urlset>', `${customXmlEntries}\n</urlset>`);
      }
    }

    res.header('Content-Type', 'application/xml');
    res.send(xmlContent);
  } catch (e) {
    res.status(500).send('Error generating dynamic sitemap');
  }
});

// ===== Health Check =====
app.get('/api/health', (req, res) => {
  const cookiesEnvSet = !!process.env.COOKIES_CONTENT;
  const cookiesFileEnv = process.env.COOKIES_FILE || null;
  let cookiesFileExists = false;
  let cookiesFileSize = 0;
  let cookiesLineCount = 0;
  let cookiesDataLineCount = 0;
  let firstCookieCols = 0;
  let firstCookieDomain = 'N/A';
  
  if (cookiesFileEnv) {
    try {
      const stat = fs.statSync(cookiesFileEnv);
      cookiesFileExists = true;
      cookiesFileSize = stat.size;
      const content = fs.readFileSync(cookiesFileEnv, 'utf8');
      const lines = content.split('\n').filter(l => l.trim());
      cookiesLineCount = lines.length;
      const dataLines = lines.filter(l => !l.startsWith('#'));
      cookiesDataLineCount = dataLines.length;
      if (dataLines.length > 0) {
        const cols = dataLines[0].split('\t');
        firstCookieCols = cols.length;
        firstCookieDomain = cols[0] || 'empty';
      }
    } catch (e) { /* file doesn't exist */ }
  }

  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    cookies: {
      envVarSet: cookiesEnvSet,
      envVarLength: cookiesEnvSet ? process.env.COOKIES_CONTENT.length : 0,
      cookiesFilePath: cookiesFileEnv,
      cookiesFileExists,
      cookiesFileSize,
      cookiesLineCount,
      cookiesDataLineCount,
      firstCookieCols_expected7: firstCookieCols,
      firstCookieDomain,
    }
  });
});

// ===== Serve Static Frontend (Production) =====
const { injectSeoMeta } = require('./utils/seoMeta');
const { prerenderContent } = require('./utils/prerenderContent');
const clientBuildPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientBuildPath));

// SPA fallback — serve index.html with dynamic server-side SEO & Open Graph meta injection
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }

  const indexPath = path.join(clientBuildPath, 'index.html');
  fs.readFile(indexPath, 'utf8', (err, html) => {
    if (err) {
      // Frontend not built yet — show helpful message
      return res.status(200).send(`
        <html>
          <body style="font-family: system-ui; display: flex; justify-content: center; align-items: center; height: 100vh; background: #0F0F23; color: #fff;">
            <div style="text-align: center;">
              <h1>🎬 SnapLoad API Server</h1>
              <p>API is running on port ${PORT}</p>
              <p>Build the frontend: <code>cd client && npm run build</code></p>
              <p><a href="/api/health" style="color: #7C3AED;">/api/health</a></p>
            </div>
          </body>
        </html>
      `);
    }

    let injectedHtml = injectSeoMeta(html, req.path);

    // Pre-render rich semantic content inside <div id="root"> for Google AdSense & search bots
    try {
      const richBody = prerenderContent(req.path);
      if (richBody) {
        injectedHtml = injectedHtml.replace(
          /<div id="root">[\s\S]*?<\/div>/i,
          `<div id="root">${richBody}</div>`
        );
      }
    } catch (renderErr) {
      console.error('[PRERENDER] Error rendering route:', req.path, renderErr.message);
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(injectedHtml);
  });
});

// ===== Error Handler =====
app.use((err, req, res, _next) => {
  console.error('[ERROR]', err.message);

  if (err.message?.includes('CORS')) {
    return res.status(403).json({ error: 'CORS policy violation', message: err.message });
  }

  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong.',
  });
});

// ===== Graceful Shutdown =====
const activeProcesses = new Set();

process.on('SIGTERM', () => {
  console.log('[SERVER] SIGTERM received. Shutting down gracefully...');
  for (const proc of activeProcesses) {
    try { proc.kill('SIGTERM'); } catch (e) { /* ignore */ }
  }
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('[SERVER] SIGINT received. Shutting down...');
  process.exit(0);
});

// ===== Startup Diagnostics =====
const { execSync } = require('child_process');
try {
  const version = execSync('yt-dlp --version').toString().trim();
  console.log(`[DIAGNOSTIC] yt-dlp version: ${version}`);
  try {
    const checkHelp = execSync('yt-dlp --impersonate Chrome --help').toString();
    console.log(`[DIAGNOSTIC] yt-dlp impersonation support: OK`);
  } catch (e) {
    console.error(`[DIAGNOSTIC] yt-dlp impersonation check FAILED! (likely missing curl-cffi or TLS support). Error:`, e.message);
  }
} catch (err) {
  console.error(`[DIAGNOSTIC] Failed to find or run yt-dlp:`, err.message);
}

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════════╗
  ║  🎬 SnapLoad Server                         ║
  ║  Running on http://localhost:${PORT}            ║
  ║  Environment: ${(process.env.NODE_ENV || 'development').padEnd(28)}║
  ╚══════════════════════════════════════════════╝
  `);
});

module.exports = app;
