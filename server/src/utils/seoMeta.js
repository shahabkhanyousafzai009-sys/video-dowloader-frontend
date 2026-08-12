/**
 * Server-Side SEO & Open Graph Metadata Registry
 * Provides pre-rendered title, description, canonical links, and social cards
 * for non-JS search crawlers (Googlebot, Bingbot, Yandex, ChatGPT, Perplexity) and social previews (WhatsApp, Twitter, Telegram)
 */

const BASE_URL = 'https://snaploaddownload.com';

const ROUTE_META = {
  '/': {
    title: 'SnapLoad — Universal Video Downloader | TikTok, Instagram & MP3',
    description: 'Download videos from TikTok without watermark and Instagram Reels in 1080p HD or 4K. Extract MP3 audio. Free, fast, private, and no signup required.',
    canonical: `${BASE_URL}/`,
  },
  '/tiktok-downloader': {
    title: 'TikTok Downloader Without Watermark HD — Free MP4 Saver | SnapLoad',
    description: 'Download TikTok videos without watermark in full HD 1080p quality for free. Fast online TikTok video downloader, no app or account required.',
    canonical: `${BASE_URL}/tiktok-downloader`,
  },
  '/instagram-downloader': {
    title: 'Instagram Reels Downloader 1080p HD — Free Video Saver | SnapLoad',
    description: 'Download Instagram Reels, videos, IGTV clips & photos in original high definition. Free online Instagram downloader for mobile and desktop.',
    canonical: `${BASE_URL}/instagram-downloader`,
  },
  '/mp3-downloader': {
    title: 'Video to MP3 Converter Online — High Quality Audio Extraction | SnapLoad',
    description: 'Convert video links from TikTok & Instagram into 320kbps MP3 audio files. Free, fast audio extractor with no registration required.',
    canonical: `${BASE_URL}/mp3-downloader`,
  },
  '/tiktok-mp3-downloader': {
    title: 'TikTok MP3 Sound Downloader — Extract Audio Tracks Free | SnapLoad',
    description: 'Extract and download high quality 320kbps MP3 audio tracks directly from any TikTok video link for free.',
    canonical: `${BASE_URL}/tiktok-mp3-downloader`,
  },
  '/youtube-shorts-downloader': {
    title: 'YouTube Shorts Downloader 1080p HD — Free MP4 & MP3 Saver | SnapLoad',
    description: 'Download YouTube Shorts videos in MP4 1080p HD or extract 320kbps MP3 audio tracks for free.',
    canonical: `${BASE_URL}/youtube-shorts-downloader`,
  },
  '/widget': {
    title: 'Free Video Downloader Widget — Embed SnapLoad on Your Site',
    description: 'Embed SnapLoad free video downloader widget on your website or blog with clean backlink integration.',
    canonical: `${BASE_URL}/widget`,
  },
  '/guides': {
    title: 'SnapLoad Video Downloader Tutorials & How-To Guides',
    description: 'Step-by-step guides on how to download TikTok videos without watermark, save Instagram Reels in 1080p HD, and convert videos to MP3 audio.',
    canonical: `${BASE_URL}/guides`,
  },
  '/guides/how-to-download-tiktok-without-watermark': {
    title: 'How to Download TikTok Videos Without Watermark (iPhone, Android & PC)',
    description: 'Learn the easiest free way to save HD TikTok videos without watermark on iOS, Android, Mac, or Windows PC using SnapLoad.',
    canonical: `${BASE_URL}/guides/how-to-download-tiktok-without-watermark`,
  },
  '/guides/how-to-save-instagram-reels-hd': {
    title: 'How to Save Instagram Reels & Videos in 1080p HD Quality',
    description: 'Step-by-step tutorial on how to download Instagram Reels, clips, and video posts in original high definition quality without quality loss.',
    canonical: `${BASE_URL}/guides/how-to-save-instagram-reels-hd`,
  },
  '/guides/how-to-convert-video-to-mp3': {
    title: 'How to Convert TikTok & Instagram Video Links to 320kbps MP3 Audio',
    description: 'Extract high-bitrate MP3 audio tracks directly from TikTok videos or Instagram Reels for free with no app installation.',
    canonical: `${BASE_URL}/guides/how-to-convert-video-to-mp3`,
  },
  '/guides/how-to-download-youtube-shorts-hd': {
    title: 'How to Download YouTube Shorts Videos & Audio in 1080p HD Quality',
    description: 'Learn how to download YouTube Shorts videos in MP4 format or extract 320kbps MP3 audio quickly and safely using SnapLoad.',
    canonical: `${BASE_URL}/guides/how-to-download-youtube-shorts-hd`,
  },
  '/guides/how-to-download-tiktok-slideshow-photos': {
    title: 'How to Download TikTok Photo Slideshows & Images in Full HD',
    description: 'Complete guide to downloading all HD pictures from TikTok photo slideshows without watermarks on mobile or desktop.',
    canonical: `${BASE_URL}/guides/how-to-download-tiktok-slideshow-photos`,
  },
  '/guides/how-to-save-instagram-stories-anonymously': {
    title: 'How to Download Instagram Stories & Highlights Anonymously',
    description: 'Learn how to download Instagram stories, video posts, and highlights anonymously in high definition.',
    canonical: `${BASE_URL}/guides/how-to-save-instagram-stories-anonymously`,
  },
  '/guides/how-to-extract-audio-from-tiktok': {
    title: 'How to Extract & Save TikTok Sound Tracks as 320kbps MP3',
    description: 'Easy guide to converting viral TikTok video sounds into high-quality MP3 audio files for offline listening or editing.',
    canonical: `${BASE_URL}/guides/how-to-extract-audio-from-tiktok`,
  },
  // ===== Spanish (ES) Routes =====
  '/es': {
    title: 'SnapLoad — Descargador Universal de Videos | TikTok, Instagram y MP3',
    description: 'Descarga videos de TikTok sin marca de agua e Instagram Reels en 1080p HD o 4K. Extrae audio MP3. Gratis, rápido y sin registro.',
    canonical: `${BASE_URL}/es`,
  },
  '/es/tiktok-downloader': {
    title: 'Descargar Videos de TikTok Sin Marca de Agua Gratis HD | SnapLoad',
    description: 'Descarga videos de TikTok sin marca de agua en full HD 1080p gratis. Descargador de TikTok online rápido sin aplicación.',
    canonical: `${BASE_URL}/es/tiktok-downloader`,
  },
  '/es/instagram-downloader': {
    title: 'Descargar Instagram Reels 1080p HD Gratis | SnapLoad',
    description: 'Guarda Instagram Reels, videos e IGTV en alta definición original. Descargador gratis para móvil y computadora.',
    canonical: `${BASE_URL}/es/instagram-downloader`,
  },
  '/es/mp3-downloader': {
    title: 'Convertidor de Video a MP3 Online Gratis | SnapLoad',
    description: 'Convierte enlaces de video de TikTok e Instagram en archivos de audio MP3 de 320kbps. Extractor gratis sin registro.',
    canonical: `${BASE_URL}/es/mp3-downloader`,
  },
  // ===== German (DE) Routes =====
  '/de': {
    title: 'SnapLoad — Video Downloader | TikTok, Instagram & MP3',
    description: 'Laden Sie TikTok-Videos ohne Wasserzeichen und Instagram Reels in 1080p HD oder 4K herunter. MP3-Audio extrahieren. Kostenlos & schnell.',
    canonical: `${BASE_URL}/de`,
  },
  '/de/tiktok-downloader': {
    title: 'TikTok Video Downloader Ohne Wasserzeichen HD | SnapLoad',
    description: 'Laden Sie TikTok-Videos ohne Wasserzeichen in voller HD 1080p-Qualität kostenlos herunter. Schneller Online-Downloader.',
    canonical: `${BASE_URL}/de/tiktok-downloader`,
  },
  '/de/instagram-downloader': {
    title: 'Instagram Reels Downloader 1080p HD Gratis | SnapLoad',
    description: 'Speichern Sie Instagram Reels, Videos und IGTV-Clips in originaler HD-Auflösung. Kostenloser Downloader.',
    canonical: `${BASE_URL}/de/instagram-downloader`,
  },
  '/de/mp3-downloader': {
    title: 'Video zu MP3 Konverter Online Gratis | SnapLoad',
    description: 'Konvertieren Sie Videolinks von TikTok & Instagram in 320kbps MP3-Audiodateien. Kostenloser Audio-Extractor.',
    canonical: `${BASE_URL}/de/mp3-downloader`,
  },
  // ===== French (FR) Routes =====
  '/fr': {
    title: 'SnapLoad — Téléchargeur de Vidéos | TikTok, Instagram & MP3',
    description: 'Téléchargez des vidéos TikTok sans filigrane et Reels Instagram en 1080p HD ou 4K. Extrayez des fichiers MP3. Gratuit et rapide.',
    canonical: `${BASE_URL}/fr`,
  },
  '/fr/tiktok-downloader': {
    title: 'Télécharger Vidéo TikTok Sans Filigrane HD Gratuit | SnapLoad',
    description: 'Téléchargez des vidéos TikTok sans filigrane en haute définition 1080p gratuitement. Enregistreur TikTok en ligne sans application.',
    canonical: `${BASE_URL}/fr/tiktok-downloader`,
  },
  '/fr/instagram-downloader': {
    title: 'Télécharger Instagram Reels 1080p HD Gratuit | SnapLoad',
    description: 'Enregistrez des Reels Instagram, vidéos et clips IGTV en haute définition originale. Téléchargeur gratuit mobile et PC.',
    canonical: `${BASE_URL}/fr/instagram-downloader`,
  },
  '/fr/mp3-downloader': {
    title: 'Convertisseur Vidéo en MP3 Audio En Ligne | SnapLoad',
    description: 'Convertissez des liens vidéo TikTok et Instagram en fichiers audio MP3 320kbps. Extracteur audio rapide sans inscription.',
    canonical: `${BASE_URL}/fr/mp3-downloader`,
  },
};

/**
 * Inject route-specific metadata tags into index.html
 */
function injectSeoMeta(html, rawPathname) {
  const normalizedPath = rawPathname.length > 1 && rawPathname.endsWith('/')
    ? rawPathname.slice(0, -1)
    : rawPathname;

  const meta = ROUTE_META[normalizedPath] || ROUTE_META['/'];

  let injectedHtml = html;

  // Replace Title
  injectedHtml = injectedHtml.replace(
    /<title>.*?<\/title>/i,
    `<title>${escapeHtml(meta.title)}</title>`
  );

  // Replace Meta Description
  injectedHtml = injectedHtml.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`
  );

  // Replace Canonical Link
  injectedHtml = injectedHtml.replace(
    /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
    `<link rel="canonical" href="${escapeHtml(meta.canonical)}" />`
  );

  // Replace Open Graph Tags
  injectedHtml = injectedHtml.replace(
    /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`
  );

  injectedHtml = injectedHtml.replace(
    /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`
  );

  injectedHtml = injectedHtml.replace(
    /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:url" content="${escapeHtml(meta.canonical)}" />`
  );

  // Replace Twitter Card Tags
  injectedHtml = injectedHtml.replace(
    /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`
  );

  injectedHtml = injectedHtml.replace(
    /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`
  );

  injectedHtml = injectedHtml.replace(
    /<meta\s+name="twitter:url"\s+content=".*?"\s*\/?>/i,
    `<meta name="twitter:url" content="${escapeHtml(meta.canonical)}" />`
  );

  return injectedHtml;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = { ROUTE_META, injectSeoMeta };
