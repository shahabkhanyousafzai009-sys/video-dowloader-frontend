/**
 * Server-Side SEO & Open Graph Metadata Registry
 * Provides pre-rendered title, description, canonical links, and social cards
 * for non-JS search crawlers (Googlebot, Bingbot, Yandex, ChatGPT, Perplexity) and social previews (WhatsApp, Twitter, Telegram)
 */

const BASE_URL = 'https://snaploaddownload.com';

const ROUTE_META = {
  '/': {
    title: 'TikTok Downloader Without Watermark HD — Free TikTok Video Downloader | SnapLoad',
    description: 'Best free TikTok Downloader and TikTok Video Downloader to save watermark-free HD TikTok videos, Instagram Reels & 320kbps MP3 sound. Fast, free online tiktok download.',
    canonical: `${BASE_URL}/`,
  },
  '/tiktok-downloader': {
    title: 'TikTok Downloader Without Watermark HD — TikTok Video Downloader | SnapLoad',
    description: 'Download TikTok videos without watermark in full HD 1080p for free. Fast online TikTok video downloader, save TikTok MP4 clips & MP3 sound instantly.',
    canonical: `${BASE_URL}/tiktok-downloader`,
  },
  '/instagram-downloader': {
    title: 'Instagram Reels Downloader 1080p HD — Free Video Saver | SnapLoad',
    description: 'Download Instagram Reels, videos, IGTV clips & photos in original high definition. Free online Instagram downloader for mobile and desktop.',
    canonical: `${BASE_URL}/instagram-downloader`,
  },
  '/facebook-downloader': {
    title: 'Facebook Video Downloader 1080p HD — Save FB Reels & Watch Clips | SnapLoad',
    description: 'Download Facebook Reels, Watch videos, live broadcasts, and clips in 1080p Full HD MP4 or 320kbps MP3 audio for free with zero registration.',
    canonical: `${BASE_URL}/facebook-downloader`,
  },
  '/facebook_downloader': {
    title: 'Facebook Video Downloader 1080p HD — Save FB Reels & Watch Clips | SnapLoad',
    description: 'Download Facebook Reels, Watch videos, live broadcasts, and clips in 1080p Full HD MP4 or 320kbps MP3 audio for free with zero registration.',
    canonical: `${BASE_URL}/facebook-downloader`,
  },
  '/facebook': {
    title: 'Facebook Video Downloader 1080p HD — Save FB Reels & Watch Clips | SnapLoad',
    description: 'Download Facebook Reels, Watch videos, live broadcasts, and clips in 1080p Full HD MP4 or 320kbps MP3 audio for free with zero registration.',
    canonical: `${BASE_URL}/facebook-downloader`,
  },
  '/mp3-downloader': {
    title: 'Video to MP3 Converter Online — High Quality Audio Extraction | SnapLoad',
    description: 'Convert video links from TikTok, Instagram & Facebook into 320kbps MP3 audio files. Free, fast audio extractor with no registration required.',
    canonical: `${BASE_URL}/mp3-downloader`,
  },
  '/tiktok-mp3-downloader': {
    title: 'TikTok MP3 Sound Downloader — Extract Audio Tracks Free | SnapLoad',
    description: 'Extract and download high quality 320kbps MP3 audio tracks directly from any TikTok video link for free.',
    canonical: `${BASE_URL}/tiktok-mp3-downloader`,
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
  '/guides/how-to-download-facebook-videos-hd': {
    title: 'How to Download Facebook Videos & Reels in 1080p HD (Android, iPhone & PC)',
    description: 'Learn how to download public Facebook videos, Reels, and Watch clips in 1080p HD quality directly in your browser without software or registration.',
    canonical: `${BASE_URL}/guides/how-to-download-facebook-videos-hd`,
  },
  // ===== Standalone Legal & Policy Routes =====
  '/privacy-policy': {
    title: 'Privacy Policy — SnapLoad Video Downloader',
    description: 'Official SnapLoad Privacy Policy. Learn about our zero-log architecture, zero server media storage, GDPR and CCPA privacy protections.',
    canonical: `${BASE_URL}/privacy-policy`,
  },
  '/terms-of-service': {
    title: 'Terms of Service — SnapLoad Video Downloader',
    description: 'SnapLoad Terms of Service detailing permitted personal, non-commercial fair use of our online media downloading utility.',
    canonical: `${BASE_URL}/terms-of-service`,
  },
  '/dmca-policy': {
    title: 'DMCA Copyright Policy & Takedown Agent — SnapLoad',
    description: 'Digital Millennium Copyright Act (DMCA) policy, copyright infringement notification procedures, and Designated Agent contact for SnapLoad.',
    canonical: `${BASE_URL}/dmca-policy`,
  },
  '/about-us': {
    title: 'About Us — Mission & Standards — SnapLoad',
    description: 'Learn about SnapLoad mission, privacy engineering standards, technology architecture, and technical editorial team.',
    canonical: `${BASE_URL}/about-us`,
  },
  '/contact-us': {
    title: 'Contact Us & Customer Support — SnapLoad',
    description: 'Contact the SnapLoad technical support team and Copyright Agent for inquiries, bug reports, and copyright notifications.',
    canonical: `${BASE_URL}/contact-us`,
  },
  '/blog': {
    title: 'SnapLoad Blog & Knowledge Base — Media Tutorials & Technical Manuals',
    description: 'In-depth articles, tutorials, and technical manuals on downloading TikTok videos without watermark, saving 1080p Instagram Reels, and 320kbps MP3 conversion.',
    canonical: `${BASE_URL}/blog`,
  },
  '/blog/instagram-video-download-without-watermark': {
    title: 'Instagram Video Download Without Watermark | Snapload',
    description: 'Get fast, HD Instagram video download without watermark using Snapload. No app, no signup, just paste a link and save in seconds.',
    canonical: `${BASE_URL}/blog/instagram-video-download-without-watermark`,
  },
  '/blog/download-tiktok-video-without-watermark': {
    title: 'Download TikTok Video Without Watermark – Snapload',
    description: 'Download TikTok video without watermark in full HD using Snapload. Fast, free, and safe — works directly in your mobile or desktop browser, no app needed.',
    canonical: `${BASE_URL}/blog/download-tiktok-video-without-watermark`,
  },
  '/blog/how-to-download-tiktok-videos-on-laptop': {
    title: 'How to Download TikTok Videos on a Laptop: Complete 2026 Guide | SnapLoad',
    description: 'Learn how to download TikTok videos on a laptop without watermark directly in your browser or using free tools.',
    canonical: `${BASE_URL}/blog/how-to-download-tiktok-videos-on-laptop`,
  },
  '/blog/tiktok-downloader-complete-guide': {
    title: 'tiktok downloader: Complete Guide to Fast No Watermark Downloads | SnapLoad',
    description: 'Use a fast tiktok downloader to save watermark-free HD videos and MP3 audio clips. Discover safe, free tools for Android, iPhone, and PC.',
    canonical: `${BASE_URL}/blog/tiktok-downloader-complete-guide`,
  },
  '/blog/baixar-video-do-tiktok-complete-guide': {
    title: 'baixar video do tiktok: Complete Guide for HD Downloads Online | SnapLoad',
    description: 'Learn how to baixar video do tiktok quickly without watermarks. Discover fast, safe, and free HD download tools for mobile and desktop.',
    canonical: `${BASE_URL}/blog/baixar-video-do-tiktok-complete-guide`,
  },
  '/blog/ultimate-guide-tiktok-video-downloader-no-watermark-2026': {
    title: 'The Ultimate Guide to Downloading TikTok Videos Without Watermark in 2026',
    description: 'A technical, step-by-step masterclass on saving full 1080p HD TikTok videos across iOS Safari, Android Chrome, and PC without creator logo overlays.',
    canonical: `${BASE_URL}/blog/ultimate-guide-tiktok-video-downloader-no-watermark-2026`,
  },
  '/blog/how-to-save-instagram-reels-stories-carousel-photos-1080p-hd': {
    title: 'How to Save Instagram Reels, Stories & Carousel Photos in 1080p HD',
    description: 'An exhaustive technical guide covering Instagram Reels saving, multi-photo carousel downloads, and anonymous story viewing in full resolution.',
    canonical: `${BASE_URL}/blog/how-to-save-instagram-reels-stories-carousel-photos-1080p-hd`,
  },
  '/blog/converting-video-links-to-320kbps-mp3-audio-technical-manual': {
    title: 'Converting Video Links to High-Bitrate 320kbps MP3 Audio: A Complete Technical Manual',
    description: 'Everything you need to know about extracting studio-grade 320kbps MP3 sound tracks from video links without audio quality degradation.',
    canonical: `${BASE_URL}/blog/converting-video-links-to-320kbps-mp3-audio-technical-manual`,
  },
  '/blog/social-media-video-formats-resolutions-audio-guide': {
    title: 'Social Media Video Formats, HD Bitrates & Audio Extraction Guide (2026)',
    description: 'Learn the technical standards for TikTok 1080p, Instagram Reels, and Facebook video streams, codecs, and audio bitrates.',
    canonical: `${BASE_URL}/blog/social-media-video-formats-resolutions-audio-guide`,
  },
  '/blog/digital-copyright-fair-use-media-security-content-creators-guide': {
    title: 'Digital Copyright, Fair Use, and Media Security: What Every Content Creator Should Know',
    description: 'An essential legal & publisher guide to copyright law, Fair Use doctrines, digital rights management, and web downloader safety.',
    canonical: `${BASE_URL}/blog/digital-copyright-fair-use-media-security-content-creators-guide`,
  },
  '/blog/how-to-download-tiktok-slideshows-photos-and-carousels-hd-guide': {
    title: 'How to Download TikTok Slideshows, Photo Carousels & Images in Original Resolution (2026)',
    description: 'A technical step-by-step guide on extracting high-resolution JPEG images and background MP3 audio from TikTok photo slideshows.',
    canonical: `${BASE_URL}/blog/how-to-download-tiktok-slideshows-photos-and-carousels-hd-guide`,
  },
  '/blog/instagram-story-saver-anonymous-viewer-privacy-guide': {
    title: 'Anonymous Instagram Story Saver & Highlights Viewer: Privacy & Security Deep Dive',
    description: 'Technical breakdown of anonymous Story viewing protocols, CDN proxy fetching, and 24-hour temporary media caching.',
    canonical: `${BASE_URL}/blog/instagram-story-saver-anonymous-viewer-privacy-guide`,
  },
  '/blog/top-10-free-snaptik-and-ssstik-alternatives-2026-comparison': {
    title: 'Top 10 Free SnapTik, SSSTik & SaveFrom Alternatives for Watermark-Free Video Downloads (2026)',
    description: 'Comparative technical review of online video downloaders evaluated by speed, security, zero-ad purity, and 1080p video quality.',
    canonical: `${BASE_URL}/blog/top-10-free-snaptik-and-ssstik-alternatives-2026-comparison`,
  },
  '/blog/fixing-common-video-downloader-errors-failed-fetches-private-links': {
    title: 'Fixing Common Video Downloader Errors: Failed Fetches, Private Links & HTTP 403 Forbidden Codes',
    description: 'Troubleshooting manual for resolving HTTP 403 access denied errors, private account limitations, and regional CDN geo-blocking.',
    canonical: `${BASE_URL}/blog/fixing-common-video-downloader-errors-failed-fetches-private-links`,
  },
  '/blog/best-audio-settings-converting-social-videos-to-flac-wav-mp3': {
    title: 'Audio Bitrate & Sampling Rates Masterclass: Converting Social Media Videos to MP3, WAV, and AAC',
    description: 'In-depth audio engineering analysis comparing lossy MP3 compression (320kbps) with uncompressed PCM formats for creator sound editing.',
    canonical: `${BASE_URL}/blog/best-audio-settings-converting-social-videos-to-flac-wav-mp3`,
  },
  '/disclaimer': {
    title: 'Legal Disclaimer & Platform Notice — SnapLoad',
    description: 'Official legal disclaimers regarding third-party platform trademarks, non-affiliation, and copyright compliance.',
    canonical: `${BASE_URL}/disclaimer`,
  },
  '/cookie-policy': {
    title: 'Cookie Policy — SnapLoad Video Downloader',
    description: 'Comprehensive explanation of cookies, web beacons, Google AdSense advertising cookies, and privacy management on SnapLoad.',
    canonical: `${BASE_URL}/cookie-policy`,
  },
  '/guides/copyright-and-fair-use-guidelines': {
    title: 'Copyright & Fair Use Guidelines for Online Video Content Creators (2026 Guide)',
    description: 'Comprehensive legal and publisher guide to understanding copyright laws, Fair Use provisions, and attribution best practices.',
    canonical: `${BASE_URL}/guides/copyright-and-fair-use-guidelines`,
  },
  '/guides/video-resolution-and-audio-quality-guide': {
    title: 'Understanding Video Resolution & Audio Bitrate Standards (1080p, 4K, 320kbps)',
    description: 'Technical publisher guide explaining video container formats, codecs, and high-fidelity audio extraction.',
    canonical: `${BASE_URL}/guides/video-resolution-and-audio-quality-guide`,
  },
  '/guides/video-downloader-security-and-privacy-audit': {
    title: 'Online Video Downloader Security & Privacy Audit 2026',
    description: 'Security audit and safety benchmark guide examining web downloader privacy, zero-storage architectures, and HTTPS encryption standards.',
    canonical: `${BASE_URL}/guides/video-downloader-security-and-privacy-audit`,
  },
  // ===== Portuguese (PT) Routes =====
  '/pt': {
    title: 'Baixar Video TikTok Sem Marca d\'Água HD — Downloader de TikTok | SnapLoad',
    description: 'Ferramenta online grátis para baixar vídeo do TikTok sem marca d\'água em alta definição HD 1080p. Baixar música do TikTok e vídeos do Instagram grátis.',
    canonical: `${BASE_URL}/pt`,
  },
  '/pt/tiktok-downloader': {
    title: 'Baixar Video TikTok Sem Marca d\'Água Gratis HD 1080p | SnapLoad',
    description: 'Baixar vídeos do TikTok sem marca d\'água online e grátis. Salve vídeos do TikTok em Full HD MP4 e converta para áudio MP3 rapidamente.',
    canonical: `${BASE_URL}/pt/tiktok-downloader`,
  },
  '/pt/instagram-downloader': {
    title: 'Baixar Reels do Instagram 1080p HD Gratis | SnapLoad',
    description: 'Baixe Reels, vídeos e fotos do Instagram em resolução original HD. Downloader online gratuito para celular e computador.',
    canonical: `${BASE_URL}/pt/instagram-downloader`,
  },
  '/pt/facebook-downloader': {
    title: 'Baixar Vídeos do Facebook HD 1080p Grátis | SnapLoad',
    description: 'Baixe vídeos e Reels do Facebook em alta definição 1080p MP4 ou converta em áudio MP3 rapidamente sem cadastro.',
    canonical: `${BASE_URL}/pt/facebook-downloader`,
  },
  '/pt/mp3-downloader': {
    title: 'Conversor de Vídeo para MP3 Online Grátis | SnapLoad',
    description: 'Extraia e baixe músicas do TikTok e Instagram em formato MP3 de 320kbps com alta qualidade de áudio.',
    canonical: `${BASE_URL}/pt/mp3-downloader`,
  },
  // ===== Spanish (ES) Routes =====
  '/es': {
    title: 'Descargar Videos de TikTok Sin Marca de Agua Gratis HD | SnapLoad',
    description: 'Descargar videos de tiktok sin marca de agua en 1080p HD gratis. Descargar video tiktok y Reels de Instagram de forma rápida y sin registros.',
    canonical: `${BASE_URL}/es`,
  },
  '/es/tiktok-downloader': {
    title: 'Descargar Video TikTok Sin Marca de Agua Gratis 1080p HD | SnapLoad',
    description: 'Descargar videos de tiktok gratis sin marca de agua. Descargador de tiktok rápido online en full HD 1080p para móvil y PC.',
    canonical: `${BASE_URL}/es/tiktok-downloader`,
  },
  '/es/instagram-downloader': {
    title: 'Descargar Instagram Reels 1080p HD Gratis | SnapLoad',
    description: 'Guarda Instagram Reels, videos e IGTV en alta definición original. Descargador gratis para móvil y computadora.',
    canonical: `${BASE_URL}/es/instagram-downloader`,
  },
  '/es/facebook-downloader': {
    title: 'Descargar Videos de Facebook 1080p HD Gratis | SnapLoad',
    description: 'Descarga videos y Reels de Facebook en Full HD 1080p MP4 o extrae audio MP3 de 320kbps gratis sin registros.',
    canonical: `${BASE_URL}/es/facebook-downloader`,
  },
  '/es/mp3-downloader': {
    title: 'Convertidor de Video a MP3 Online Gratis | SnapLoad',
    description: 'Convierte enlaces de video de TikTok e Instagram en archivos de audio MP3 de 320kbps. Extractor gratis sin registro.',
    canonical: `${BASE_URL}/es/mp3-downloader`,
  },
  // ===== German (DE) Routes =====
  '/de': {
    title: 'TikTok Video Downloader Ohne Wasserzeichen HD | SnapLoad',
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
  '/de/facebook-downloader': {
    title: 'Facebook Video Downloader 1080p HD Gratis | SnapLoad',
    description: 'Facebook Videos und Reels in bester Full HD 1080p Qualität oder als 320kbps MP3 Audio kostenlos herunterladen.',
    canonical: `${BASE_URL}/de/facebook-downloader`,
  },
  '/de/mp3-downloader': {
    title: 'Video zu MP3 Konverter Online Gratis | SnapLoad',
    description: 'Konvertieren Sie Videolinks von TikTok & Instagram in 320kbps MP3-Audiodateien. Kostenloser Audio-Extractor.',
    canonical: `${BASE_URL}/de/mp3-downloader`,
  },
  // ===== French (FR) Routes =====
  '/fr': {
    title: 'Télécharger Vidéo TikTok Sans Filigrane HD Gratuit | SnapLoad',
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
  '/fr/facebook-downloader': {
    title: 'Télécharger Vidéo Facebook 1080p HD Gratuit | SnapLoad',
    description: 'Téléchargez des vidéos et Reels Facebook en Full HD 1080p MP4 ou convertissez en MP3 gratuitement sans compte.',
    canonical: `${BASE_URL}/fr/facebook-downloader`,
  },
  '/fr/mp3-downloader': {
    title: 'Convertisseur Vidéo en MP3 Audio En Ligne | SnapLoad',
    description: 'Convertissez des liens vidéo TikTok et Instagram en fichiers audio MP3 320kbps. Extracteur audio rapide sans inscription.',
    canonical: `${BASE_URL}/fr/mp3-downloader`,
  },
  // ===== High-Volume Keyword Direct Routes (Matching SimilarWeb Top Keywords) =====
  '/tiktok-video-downloader': {
    title: 'TikTok Video Downloader Without Watermark HD — Free MP4 & MP3 | SnapLoad',
    description: 'Download TikTok videos without watermark in original 1080p Full HD quality. Fast online TikTok video downloader for Android, iPhone, and PC with 320kbps audio.',
    canonical: `${BASE_URL}/tiktok-video-downloader`,
  },
  '/tiktok-download': {
    title: 'TikTok Download Without Watermark HD 1080p — Free Video Saver | SnapLoad',
    description: 'Instant TikTok download online without watermark. Save viral TikTok clips, stories, and background music in MP4 or MP3 format with zero registration.',
    canonical: `${BASE_URL}/tiktok-download`,
  },
  '/baixar-video-tiktok': {
    title: 'Baixar Video TikTok Sem Marca d\'Água Gratis HD 1080p | SnapLoad',
    description: 'Baixar video tiktok sem marca d\'água online e grátis. Salve vídeos do TikTok em Full HD MP4 e converta para áudio MP3 rapidamente.',
    canonical: `${BASE_URL}/baixar-video-tiktok`,
  },
  '/descargar-videos-de-tiktok': {
    title: 'Descargar Videos de TikTok Sin Marca de Agua Gratis HD | SnapLoad',
    description: 'Descargar videos de tiktok sin marca de agua en 1080p HD gratis. Descargador de tiktok rápido online en full HD 1080p para móvil y PC.',
    canonical: `${BASE_URL}/descargar-videos-de-tiktok`,
  },
  // ===== Bahasa Indonesia (ID) Routes =====
  '/id': {
    title: 'Download Video TikTok Tanpa Watermark HD Gratis — SnapLoad',
    description: 'Unduh video TikTok tanpa watermark dalam resolusi Full HD 1080p gratis. Download Reels Instagram dan video Facebook serta convert audio MP3 320kbps.',
    canonical: `${BASE_URL}/id`,
  },
  '/id/tiktok-downloader': {
    title: 'Download Video TikTok Tanpa Watermark HD 1080p Gratis | SnapLoad',
    description: 'Download video TikTok tanpa watermark dan tanpa logo secara online dan gratis. Simpan video TikTok MP4 dan musik MP3 langsung di HP dan PC.',
    canonical: `${BASE_URL}/id/tiktok-downloader`,
  },
  '/id/instagram-downloader': {
    title: 'Download Reels Instagram HD 1080p Gratis | SnapLoad',
    description: 'Download Reels, video, dan foto Instagram kualitas asli HD. Pengunduh online cepat tanpa aplikasi untuk Android, iPhone, dan laptop.',
    canonical: `${BASE_URL}/id/instagram-downloader`,
  },
  '/id/facebook-downloader': {
    title: 'Download Video Facebook HD 1080p Gratis | SnapLoad',
    description: 'Download video Facebook Watch, Reels, dan video publik kualitas 1080p Full HD MP4 atau ekstrak audio MP3 gratis tanpa registrasi.',
    canonical: `${BASE_URL}/id/facebook-downloader`,
  },
  '/id/mp3-downloader': {
    title: 'Konverter Video ke MP3 Online 320kbps Gratis | SnapLoad',
    description: 'Ekstrak dan unduh lagu dari link video TikTok dan Instagram menjadi format MP3 320kbps jernih tanpa batas.',
    canonical: `${BASE_URL}/id/mp3-downloader`,
  },
  // ===== Arabic (AR) Routes =====
  '/ar': {
    title: 'تحميل فيديو تيك توك بدون علامة مائية HD مجاناً | SnapLoad',
    description: 'أفضل موقع مجاني لتحميل فيديوهات تيك توك بدون علامة مائية بجودة Full HD 1080p، تنزيل ريلز انستغرام وفيديوهات فيسبوك واستخراج صوت MP3 بسرعة فائقة.',
    canonical: `${BASE_URL}/ar`,
  },
  '/ar/tiktok-downloader': {
    title: 'تحميل فيديوهات تيك توك بدون علامة مائية 1080p HD | SnapLoad',
    description: 'تنزيل وحفظ مقاطع تيك توك بدون حقوق أو شعار مجاناً وبأعلى جودة للموبايل والكمبيوتر دون برامج.',
    canonical: `${BASE_URL}/ar/tiktok-downloader`,
  },
  '/ar/instagram-downloader': {
    title: 'تحميل ريلز انستقرام وفيديوهات بجودة عالية HD | SnapLoad',
    description: 'تنزيل مقاطع ريلز انستقرام وفيديوهات البوستات بجودة 1080p HD الأصلية مجاناً وسريع جداً.',
    canonical: `${BASE_URL}/ar/instagram-downloader`,
  },
  '/ar/facebook-downloader': {
    title: 'تحميل فيديو من فيسبوك وريلز بجودة 1080p HD | SnapLoad',
    description: 'حفظ وتحميل فيديوهات فيسبوك العامة ومقاطع الريلز بصيغة MP4 عالية الجودة أو تحويلها إلى MP3 مجاناً.',
    canonical: `${BASE_URL}/ar/facebook-downloader`,
  },
  '/ar/mp3-downloader': {
    title: 'تحويل الفيديو إلى MP3 أونلاين مجاناً 320kbps | SnapLoad',
    description: 'استخراج وتنزيل الصوت والموسيقى من فيديوهات تيك توك وانستغرام بصيغة MP3 نقية 320kbps مجاناً.',
    canonical: `${BASE_URL}/ar/mp3-downloader`,
  },
  // ===== Turkish (TR) Routes =====
  '/tr': {
    title: 'TikTok Video İndir Filigransız HD Ücretsiz | SnapLoad',
    description: 'TikTok videolarını filigransız 1080p Full HD kalitede ücretsiz indirin. Instagram Reels ve Facebook videolarını kaydedin, 320kbps MP3 ses dönüştürün.',
    canonical: `${BASE_URL}/tr`,
  },
  '/tr/tiktok-downloader': {
    title: 'TikTok Video İndir Filigransız HD 1080p | SnapLoad',
    description: 'Logosuz ve filigransız TikTok video indirme aracı. Hızlı, güvenli ve ücretsiz MP4 ve MP3 indirin.',
    canonical: `${BASE_URL}/tr/tiktok-downloader`,
  },
  '/tr/instagram-downloader': {
    title: 'Instagram Reels Video İndir 1080p HD | SnapLoad',
    description: 'Instagram Reels, video ve gönderilerini orijinal yüksek çözünürlükte indirin. Mobil ve PC uyumlu.',
    canonical: `${BASE_URL}/tr/instagram-downloader`,
  },
  '/tr/facebook-downloader': {
    title: 'Facebook Video İndir HD 1080p Ücretsiz | SnapLoad',
    description: 'Facebook Reels ve Watch videolarını 1080p MP4 veya 320kbps MP3 formatında anında indirin.',
    canonical: `${BASE_URL}/tr/facebook-downloader`,
  },
  '/tr/mp3-downloader': {
    title: 'Video MP3 Dönüştürücü Online 320kbps | SnapLoad',
    description: 'TikTok ve Instagram videolarını 320kbps yüksek kaliteli MP3 ses dosyalarına ücretsiz dönüştürün.',
    canonical: `${BASE_URL}/tr/mp3-downloader`,
  },
  // ===== Russian (RU) Routes =====
  '/ru': {
    title: 'Скачать видео Тик Ток без водяного знака HD | SnapLoad',
    description: 'Бесплатный онлайн сервис для скачивания видео TikTok без водяного знака в 1080p HD, Reels из Instagram и Facebook видео, конвертация в MP3.',
    canonical: `${BASE_URL}/ru`,
  },
  '/ru/tiktok-downloader': {
    title: 'Скачать видео Тик Ток без водяного знака бесплатно 1080p HD | SnapLoad',
    description: 'Скачивайте видео из TikTok без логотипа и водяных знаков в оригинальном качестве Full HD на телефон или компьютер.',
    canonical: `${BASE_URL}/ru/tiktok-downloader`,
  },
  '/ru/instagram-downloader': {
    title: 'Скачать Рилс Инстаграм 1080p HD бесплатно | SnapLoad',
    description: 'Скачивайте Instagram Reels, видео и фото в оригинальном высоком разрешении без потери качества.',
    canonical: `${BASE_URL}/ru/instagram-downloader`,
  },
  '/ru/facebook-downloader': {
    title: 'Скачать видео с Фейсбука 1080p HD бесплатно | SnapLoad',
    description: 'Сохраняйте Reels и видео Facebook в формате MP4 1080p или извлекайте аудио треки в MP3 320kbps.',
    canonical: `${BASE_URL}/ru/facebook-downloader`,
  },
  '/ru/mp3-downloader': {
    title: 'Конвертер видео в MP3 онлайн 320kbps | SnapLoad',
    description: 'Извлечение чистого звука из ссылок TikTok и Instagram в формате MP3 320kbps без регистрации.',
    canonical: `${BASE_URL}/ru/mp3-downloader`,
  },
  // ===== Italian (IT) Routes =====
  '/it': {
    title: 'Scaricare Video TikTok Senza Watermark HD Gratis | SnapLoad',
    description: 'Scarica video TikTok senza watermark in 1080p Full HD gratis. Salva Instagram Reels e converti video in audio MP3 a 320kbps rapidamente.',
    canonical: `${BASE_URL}/it`,
  },
  '/it/tiktok-downloader': {
    title: 'Scaricare Video TikTok Senza Logo HD Gratis | SnapLoad',
    description: 'Salva video TikTok senza filigrana in alta definizione 1080p. Downloader veloce e gratuito per iPhone, Android e PC.',
    canonical: `${BASE_URL}/it/tiktok-downloader`,
  },
  // ===== Vietnamese (VI) Routes =====
  '/vi': {
    title: 'Tải Video TikTok Không Logo Hình Mờ HD Miễn Phí | SnapLoad',
    description: 'Tải video TikTok không logo không watermark chuẩn Full HD 1080p miễn phí. Lưu Reels Instagram và tải nhạc MP3 320kbps cực nhanh.',
    canonical: `${BASE_URL}/vi`,
  },
  '/vi/tiktok-downloader': {
    title: 'Tải Video TikTok Không Watermark 1080p HD Miễn Phí | SnapLoad',
    description: 'Công cụ tải video TikTok không dính watermark trực tuyến miễn phí trên điện thoại và máy tính không cần cài app.',
    canonical: `${BASE_URL}/vi/tiktok-downloader`,
  },
};

/**
 * Inject route-specific metadata tags into index.html
 */
function injectSeoMeta(html, rawPathname) {
  const normalizedPath = rawPathname.length > 1 && rawPathname.endsWith('/')
    ? rawPathname.slice(0, -1)
    : rawPathname;

  let meta = ROUTE_META[normalizedPath];

  // Dynamic fallback for any of 50 global language route prefixes (e.g. /id, /tr, /ru, /ar, /hi, etc.)
  if (!meta) {
    const parts = normalizedPath.split('/').filter(Boolean);
    if (parts.length > 0) {
      const baseRoute = '/' + parts.slice(1).join('/');
      const fallbackBase = ROUTE_META[baseRoute] || ROUTE_META['/'];
      meta = {
        title: fallbackBase.title,
        description: fallbackBase.description,
        canonical: `${BASE_URL}${normalizedPath}`,
      };
    } else {
      meta = ROUTE_META['/'];
    }
  }

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
