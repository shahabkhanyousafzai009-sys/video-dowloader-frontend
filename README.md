# 🎬 SnapLoad — Universal Video Downloader

A production-ready web application for downloading videos from **YouTube**, **TikTok** (watermark-free), and **Instagram** (Reels & Posts). Built with streaming architecture — no files stored on the server.

![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)

---

## ✨ Features

- 📥 **Multi-platform**: YouTube, TikTok, Instagram
- 🎬 **Up to 4K quality** with format merging (video + audio via FFmpeg)
- 🎵 **MP3 audio extraction** at 320kbps / 192kbps
- 🌊 **Direct streaming** — chunked transfer encoding, zero server storage
- 🌙 **Dark/Light mode** with glassmorphism UI
- 📱 **Mobile responsive** design
- 🔒 **Security**: Rate limiting, CORS, URL validation, no shell injection
- 🐳 **Docker ready** — one command deployment

---

## 📋 Prerequisites

### For Local Development

| Tool | Version | Required |
|------|---------|----------|
| **Node.js** | 20.0.0+ | ✅ |
| **npm** | 9+ | ✅ |
| **yt-dlp** | 2025.11.12+ | ✅ |
| **FFmpeg** | 6+ | ✅ |
| **Deno** | 1.40+ | ✅ (for YouTube) |

### Install Prerequisites (Windows)

```powershell
# Install yt-dlp
pip install yt-dlp

# Install FFmpeg (via winget or download from https://ffmpeg.org)
winget install Gyan.FFmpeg

# Install Deno
irm https://deno.land/install.ps1 | iex

# Verify installations
yt-dlp --version
ffmpeg -version
deno --version
```

### Install Prerequisites (macOS)

```bash
brew install yt-dlp ffmpeg deno
```

### Install Prerequisites (Linux/Ubuntu)

```bash
pip install yt-dlp
sudo apt install ffmpeg
curl -fsSL https://deno.land/install.sh | sh
```

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Configure Environment

```bash
# Copy the example env file
cd server
cp .env.example .env
# Edit .env as needed (defaults work for local dev)
```

### 3. Start Development Servers

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
# Server starts at http://localhost:3001
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
# Frontend starts at http://localhost:5173
```

Open **http://localhost:5173** in your browser.

---

## 🐳 Docker Deployment (One Command)

```bash
# Build and run
docker-compose up --build -d

# The app will be available at http://localhost:3001
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3001` | Server port |
| `ALLOWED_ORIGINS` | `http://localhost:5173` | CORS allowed origins (comma-separated) |
| `RATE_LIMIT_INFO_MAX` | `30` | Max info requests per window |
| `RATE_LIMIT_DOWNLOAD_MAX` | `10` | Max download requests per window |
| `RATE_LIMIT_WINDOW_MIN` | `15` | Rate limit window in minutes |
| `PROXY_URL` | — | SOCKS5/HTTP proxy for yt-dlp |
| `COOKIES_FILE` | — | Path to Netscape cookies file |

---

## ☁️ Cloud Deployment

### Frontend → Vercel

```bash
cd client
npm run build
# Deploy the 'dist' folder to Vercel
npx vercel --prod
```

Set the `VITE_API_URL` environment variable in Vercel to point to your backend URL.

### Backend → Railway / Render

1. Push your code to GitHub
2. Connect the repository to Railway or Render
3. Set the **Dockerfile path** to `./Dockerfile` in the service settings
4. Set environment variables:
   - `ALLOWED_ORIGINS=https://your-frontend.vercel.app`
   - `NODE_ENV=production`

---

## 📡 API Reference

### `GET /api/info`

Fetch video metadata and available formats.

**Query Parameters:**
- `url` (required) — Video URL from a supported platform

**Response:**
```json
{
  "success": true,
  "data": {
    "title": "Video Title",
    "thumbnail": "https://...",
    "duration": 240,
    "uploader": "Channel Name",
    "platform": { "id": "youtube", "name": "YouTube", "color": "#FF0000" },
    "suggestions": [
      { "qualityLabel": "1080p", "formatId": "137", "audioFormatId": "140", "needsMerge": true },
      { "qualityLabel": "720p", "formatId": "22", "audioFormatId": null, "needsMerge": false },
      { "qualityLabel": "MP3 Audio", "formatId": "audio", "isAudio": true }
    ]
  }
}
```

### `GET /api/download`

Stream video or audio to the client.

**Query Parameters:**
- `url` (required) — Video URL
- `format` (required) — Format ID from `/api/info`
- `type` — `video` or `audio` (default: `video`)
- `audio` — Audio format ID for merged downloads
- `quality` — Audio quality: `320` or `192` (default: `192`)
- `title` — Filename for the download

### `GET /api/health`

Health check endpoint.

---

## 🏗️ Project Structure

```
├── client/                    # React + Vite + TypeScript frontend
│   ├── src/
│   │   ├── components/        # UI components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── utils/             # Validators, API client, platform utils
│   │   ├── App.tsx            # Main application
│   │   ├── App.css            # Custom animations & styles
│   │   └── index.css          # Tailwind directives & design system
│   └── vite.config.ts         # Vite config with API proxy
│
├── server/                    # Express.js backend
│   └── src/
│       ├── routes/            # API route handlers
│       ├── middleware/        # Rate limiter, CORS, URL validator
│       ├── utils/             # yt-dlp helpers, platform configs
│       └── server.js          # Express entry point
│
├── Dockerfile                 # Multi-stage production build
├── docker-compose.yml         # One-command deployment
└── README.md
```

---

## 🔐 Security

- **No shell injection**: All `yt-dlp` calls use `spawn()` with argument arrays
- **URL validation**: Strict regex allowlisting for supported platforms
- **Rate limiting**: Per-IP limits on both info and download endpoints
- **CORS**: Configurable origin allowlist (no wildcards in production)
- **Helmet**: HTTP security headers via `helmet` middleware
- **Non-root Docker**: Production container runs as `snapload` user

---

## 📝 License

MIT © SnapLoad
