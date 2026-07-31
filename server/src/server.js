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
    fs.writeFileSync(path.join(process.cwd(), 'cookies.txt'), process.env.COOKIES_CONTENT);
    console.log('[STARTUP] cookies.txt successfully written from environment variable.');
  } catch (e) {
    console.error('[STARTUP] Failed to write cookies.txt from environment variable:', e.message);
  }
}

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 3001;

// ===== Security Middleware =====
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false, // We serve static frontend files
}));

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

app.use('/api/info', infoRouter);
app.use('/api/download', downloadRouter);

// ===== Health Check =====
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ===== Serve Static Frontend (Production) =====
const clientBuildPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientBuildPath));

// SPA fallback — serve index.html for any non-API route
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(clientBuildPath, 'index.html'), (err) => {
    if (err) {
      // Frontend not built yet — show helpful message
      res.status(200).send(`
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
