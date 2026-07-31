/**
 * CORS Configuration Middleware
 */

const cors = require('cors');

function configureCors() {
  const allowedOriginsEnv = process.env.ALLOWED_ORIGINS || 'http://localhost:5173';
  const allowedOrigins = allowedOriginsEnv.split(',').map((o) => o.trim());

  return cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps, curl, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Disposition', 'Content-Type', 'Content-Length'],
    credentials: true,
    optionsSuccessStatus: 200,
  });
}

module.exports = { configureCors };
