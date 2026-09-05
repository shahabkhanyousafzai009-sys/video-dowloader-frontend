const fs = require('fs');
const path = require('path');

const TODAY = new Date().toISOString().split('T')[0];

const CORE_KEYWORD_URLS = [
  { loc: 'https://snaploaddownload.com/', priority: '1.0', changefreq: 'daily' },
  { loc: 'https://snaploaddownload.com/tiktok-video-downloader', priority: '1.0', changefreq: 'daily' },
  { loc: 'https://snaploaddownload.com/tiktok-download', priority: '1.0', changefreq: 'daily' },
  { loc: 'https://snaploaddownload.com/baixar-video-tiktok', priority: '1.0', changefreq: 'daily' },
  { loc: 'https://snaploaddownload.com/descargar-videos-de-tiktok', priority: '1.0', changefreq: 'daily' },
  { loc: 'https://snaploaddownload.com/tiktok-downloader', priority: '1.0', changefreq: 'daily' },
  { loc: 'https://snaploaddownload.com/instagram-downloader', priority: '0.9', changefreq: 'daily' },
  { loc: 'https://snaploaddownload.com/facebook-downloader', priority: '0.9', changefreq: 'daily' },
  { loc: 'https://snaploaddownload.com/mp3-downloader', priority: '0.9', changefreq: 'daily' },
  { loc: 'https://snaploaddownload.com/tiktok-mp3-downloader', priority: '0.9', changefreq: 'daily' },
  { loc: 'https://snaploaddownload.com/widget', priority: '0.8', changefreq: 'weekly' },
];

const TOP_LANGUAGES = [
  'pt', 'es', 'id', 'ar', 'tr', 'ru', 'de', 'fr', 'it', 'vi',
  'th', 'ko', 'ja', 'pl', 'nl', 'hi', 'ur', 'ms', 'fil', 'uk',
  'sv', 'ro', 'cs', 'el', 'fa', 'bn'
];

const OTHER_LANGUAGES = [
  'fi', 'hu', 'he', 'bg', 'da', 'sk', 'hr', 'sr', 'sl', 'lt',
  'lv', 'et', 'sq', 'mk', 'bs', 'is', 'no', 'ta', 'te', 'mr',
  'sw', 'kk', 'uz'
];

const LEGAL_PAGES = [
  'privacy-policy',
  'terms-of-service',
  'dmca-policy',
  'disclaimer',
  'cookie-policy',
  'about-us',
  'contact-us',
];

const GUIDES = [
  'how-to-download-tiktok-without-watermark',
  'how-to-save-instagram-reels-hd',
  'how-to-convert-video-to-mp3',
  'how-to-download-tiktok-slideshow-photos',
  'how-to-save-instagram-stories-anonymously',
  'how-to-download-facebook-videos-hd',
  'how-to-extract-audio-from-tiktok',
  'how-to-download-instagram-carousel-photos',
  'how-to-save-tiktok-mp4-on-iphone-safari',
  'top-free-tiktok-and-instagram-downloaders-comparison',
  'how-to-save-tiktok-sound-as-ringtone-iphone',
  'download-instagram-reels-without-app',
  'copyright-and-fair-use-guidelines',
  'video-resolution-and-audio-quality-guide',
  'video-downloader-security-and-privacy-audit',
];

const BLOG_POSTS = [
  'instagram-video-download-without-watermark',
  'download-tiktok-video-without-watermark',
  'how-to-download-tiktok-videos-on-laptop',
  'tiktok-downloader-complete-guide',
  'baixar-video-do-tiktok-complete-guide',
  'ultimate-guide-tiktok-video-downloader-no-watermark-2026',
  'how-to-save-instagram-reels-stories-carousel-photos-1080p-hd',
  'converting-video-links-to-320kbps-mp3-audio-technical-manual',
  'social-media-video-formats-resolutions-audio-guide',
  'digital-copyright-fair-use-media-security-content-creators-guide',
  'how-to-download-tiktok-slideshows-photos-and-carousels-hd-guide',
  'instagram-story-saver-anonymous-viewer-privacy-guide',
  'top-10-free-snaptik-and-ssstik-alternatives-2026-comparison',
  'fixing-common-video-downloader-errors-failed-fetches-private-links',
  'best-audio-settings-converting-social-videos-to-flac-wav-mp3',
  'baixar-video-tiktok-url-guia-completo',
  'baixar-video-tiktok-sem-marca-dagua-app',
  'baixar-audio-de-video-mp3-guia',
  'tiktok-pc-video-download-guide',
  'facebook-video-downloader-hd-guide',
  'download-facebook-reels-1080p-guide',
  'facebook-video-download-1080p-guide',
  'facebook-to-mp3-converter-guide',
  'facebook-video-download-on-iphone-guide',
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// 1. Core Keywords & Main URLs
xml += `  <!-- Core Landing Pages & High-Volume Search Keywords -->\n`;
for (const item of CORE_KEYWORD_URLS) {
  xml += `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>\n`;
}

// 2. Hub Indexes
xml += `  <!-- Main Hub Sections -->\n`;
xml += `  <url>
    <loc>https://snaploaddownload.com/guides</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
xml += `  <url>
    <loc>https://snaploaddownload.com/blog</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>\n`;
xml += `  <url>
    <loc>https://snaploaddownload.com/faq</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;

// 3. Top 26 Languages (Clusters with Downloader Sub-pages)
xml += `  <!-- Top 26 Multilingual International Route Clusters -->\n`;
for (const lang of TOP_LANGUAGES) {
  xml += `  <url>
    <loc>https://snaploaddownload.com/${lang}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://snaploaddownload.com/${lang}/tiktok-downloader</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://snaploaddownload.com/${lang}/instagram-downloader</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://snaploaddownload.com/${lang}/facebook-downloader</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://snaploaddownload.com/${lang}/mp3-downloader</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>\n`;
}

// 4. Other Regional Languages
xml += `  <!-- Additional Global Language Landing Pages -->\n`;
for (const lang of OTHER_LANGUAGES) {
  xml += `  <url>
    <loc>https://snaploaddownload.com/${lang}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>\n`;
}

// 5. Guides Detail Pages
xml += `  <!-- Step-by-Step Educational Guides -->\n`;
for (const slug of GUIDES) {
  xml += `  <url>
    <loc>https://snaploaddownload.com/guides/${slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
}

// 6. Blog Posts
xml += `  <!-- Technical Blog Posts & In-Depth Tutorials -->\n`;
for (const slug of BLOG_POSTS) {
  xml += `  <url>
    <loc>https://snaploaddownload.com/blog/${slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>\n`;
}

// 7. Trust & Legal Pages
xml += `  <!-- Legal, Privacy & Compliance Pages -->\n`;
for (const slug of LEGAL_PAGES) {
  xml += `  <url>
    <loc>https://snaploaddownload.com/${slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>\n`;
}

xml += `</urlset>\n`;

const targetPath = path.join(__dirname, '../client/public/sitemap.xml');
fs.writeFileSync(targetPath, xml, 'utf8');

const distPath = path.join(__dirname, '../client/dist/sitemap.xml');
if (fs.existsSync(path.dirname(distPath))) {
  fs.writeFileSync(distPath, xml, 'utf8');
}

console.log(`[SUCCESS] Generated sitemap.xml with updated URLs. Total size: ${xml.length.toLocaleString()} bytes.`);
