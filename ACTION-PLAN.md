# SEO Action Plan — SnapLoad Web Application

**Target:** SnapLoad — Universal Video Downloader (`https://snapload.app`)  
**Created:** August 1, 2026  
**Status:** Ready for Execution

---

## 🎯 High-Impact Action Items

### 1. Update `client/index.html` (Critical — Technical & Social SEO)
- [ ] **Canonical URL:** Add `<link rel="canonical" href="https://snapload.app/" />`.
- [ ] **Expanded Meta Description:** Update meta description to target "download TikTok videos without watermark", "Instagram Reels downloader", "MP3 audio extraction", and "free online video downloader".
- [ ] **Open Graph (OG) Tags:** Add `og:site_name`, `og:url`, `og:image`, `og:image:width`, `og:image:height`, `og:locale`.
- [ ] **Twitter Card Tags:** Add `twitter:card` (`summary_large_image`), `twitter:title`, `twitter:description`, `twitter:image`, `twitter:site`.
- [ ] **JSON-LD Structured Data:** Inject `<script type="application/ld+json">` containing:
  - `WebApplication` / `SoftwareApplication` (Category: `MultimediaApplication`, Price: `0`, `operatingSystem`: `All`).
  - `WebSite` with `SearchAction`.
  - `Organization` details.

### 2. Add AI Search Readiness & Crawler Policy (Critical — GEO/AEO & Technical)
- [ ] **Create `client/public/llms.txt`:** Provide structured markdown context for LLM Search Engine Agents (Perplexity, ChatGPT, Claude, Gemini) detailing SnapLoad capabilities, supported URL types (TikTok, Instagram), feature sets, and privacy guarantees.
- [ ] **Enhance `client/public/robots.txt`:** Include `Sitemap: https://snapload.app/sitemap.xml` and specify permissions for AI crawlers (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Bytespider`, `CCBot`).
- [ ] **Create `client/public/sitemap.xml`:** Add standard sitemap XML for core application routes.

### 3. Enhance On-Page Semantic HTML & Indexable Content (High — Content Quality & E-E-A-T)
- [ ] **Add SEO Content Section in `client/src/App.tsx`:** Include rich below-the-fold HTML sections with semantic `<h2>` headings covering:
  - How to download TikTok videos without watermark.
  - How to download Instagram Reels & HD video clips.
  - Supported formats and quality options (1080p, 4K, MP3 audio).
  - Security, privacy, and speed guarantees.
- [ ] **Update Header & Footer Navigation Links:** Ensure semantic `<nav>`, `<header>`, `<footer>` markup with proper aria-labels and descriptive text.

---

## 📊 Expected Outcomes & Impact
- 🚀 **Search Visibility:** Increased keyword rankings for high-volume terms (e.g., "tiktok downloader no watermark", "instagram video downloader online").
- 📱 **Social Engagement:** High CTR social previews on Twitter/X, Discord, Telegram, Facebook, and LinkedIn.
- 🤖 **AI Discovery:** Direct citation readiness when users query Perplexity or ChatGPT Search for "best free TikTok video downloader".
