# 🚀 SnapLoad (Universal Video Downloader) — Project Status & Handover Guide

> **Last Updated:** August 11, 2026  
> **Repository:** `shahabkhanyousafzai009-sys/video-dowloader-frontend`  
> **Live Production URL:** [https://snaploaddownload.com](https://snaploaddownload.com)  
> **Backend Deployment:** Render (Auto-deploys on push to `main` branch)  
> **Support Email:** `shahabkhanyousafzai009@gmail.com`

---

## 📌 1. Project Overview & Architecture

SnapLoad is a high-performance, universal video downloader web application supporting **TikTok** and **Instagram** video/audio downloads in **1080p HD quality** without watermarks.

- **Frontend (`/client`)**: React 18, Vite, TypeScript, TailwindCSS, Glassmorphism design system.
- **Backend (`/server`)**: Node.js, Express, `yt-dlp` CLI binary, `ffmpeg` for video remuxing.
- **Multilingual Support**: English (`/`), Spanish (`/es`), German (`/de`), French (`/fr`).
- **SEO & E-E-A-T**: `SoftwareApplication` Schema with 4.9★ rating (1,280+ reviews), Open Graph tags, XML Sitemap (`/sitemap.xml`).

---

## 🛠️ 2. Core Systems & Technical Implementations

### A. TikTok Downloader Engine
- **Short Link Resolver**: Automatically resolves mobile short URLs (`vt.tiktok.com`, `vm.tiktok.com`, `tiktok.com/t/`) via HEAD HTTP redirects.
- **Query Parameter Cleaner**: Strips tracking parameters (`?_r=1&u_code=...`) before passing URLs to extractors.
- **Default Quality**: **1080p Full HD No Watermark** is prioritized as Option #1.
- **4-Tier Fallback Engine (`server/src/utils/ytdlp.js`)**:
  1. `TikWM`: `POST` `form-urlencoded` with Chrome browser headers & `gzip`/`brotli` decompression.
  2. `SSSTik`: Extracts direct `tikcdn.io` high-speed MP4 streams.
  3. `Lovetik`: Secondary backup parser.
  4. `TikTok oEmbed`: Official metadata provider.

### B. Instagram Downloader Engine
- Uses `-f best[ext=mp4]/b/best` format selection and `--remux-video mp4` with FFmpeg to prevent video distortion and green line artifacts in media players (VLC).

### C. Domain Whitelist Security (`server/src/routes/download.js`)
- Protects the `/api/download` proxy route by restricting allowed upstream domains:
  `tiktokcdn.com`, `tiktokcdn-us.com`, `tiktokcdn-eu.com`, `byteoversea.com`, `ibyteimg.com`, `muscdn.com`, `tiktok.com`, `tikwm.com`, `lovetik.com`, `ssstik.io`, `tikcdn.io`, `tiktokv.com`, `tiktokv.us`.

---

## 📜 3. Recent Commit History & Fixes Pushed

- **`0954b34`**: Prioritized 1080p HD No Watermark format as default selection for TikTok downloads.
- **`e5115b7`**: Integrated SSSTik extractor into fallback engine & added `tikcdn.io` to domain whitelist.
- **`d0bbab3`**: Configured domain-aware streaming headers (`Referer` & `Origin`) for TikWM, Lovetik, and SSSTik.
- **`eb16072`**: Resolved TikWM relative paths (`/video/media/...`) to absolute `tikwm.com` URLs to pass domain whitelist.
- **`a7222d9`**: Switched TikWM to form-urlencoded POST with browser headers & gzip decompression.
- **`2935cd6`**: iPhone TikTok short link resolver & mobile format cards.
- **`6ed2ecd`**: Multilingual SEO routes (`/es`, `/de`, `/fr`) & Google Star Ratings Schema.

---

## 🔑 4. Environment & Deployment Details

- **GitHub Personal Access Token**: Configured in local environment / git push credentials
- **Render Deployment**: Connected to GitHub repository `shahabkhanyousafzai009-sys/video-dowloader-frontend` on branch `main`. Auto-deploys on git push.
- **Local Development**:
  - Backend: `npm --prefix server run dev` (Port `3001`)
  - Frontend: `npm --prefix client run dev` (Port `5173`)
  - Full Build: `npm --prefix client run build`

---

## 🎯 5. Status for Tomorrow / Next Agent Session

- **System Health**: All TikTok (1080p HD) and Instagram downloads are fully functional and tested locally.
- **Render Auto-Deployment**: Commit `0954b34` is live on Render (`https://snaploaddownload.com`).
- **Google Search Console**: `sitemap.xml` is submitted. "Quota Exceeded" warning on manual indexing is normal and will reset in 24 hours (Googlebot crawls via sitemap automatically).
