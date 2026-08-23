import { useEffect, useState } from 'react';
import { Language } from '../utils/i18n';
import { AdBanner } from './AdBanner';

type PlatformKey = 'all' | 'tiktok' | 'instagram' | 'mp3' | 'tiktok-mp3' | 'youtube-shorts' | 'widget';

interface SeoContentProps {
  platform: PlatformKey;
  currentLanguage?: Language;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface ContentData {
  heading: string;
  subheading: string;
  whyTitle: string;
  faqTitle: string;
  steps: { number: string; title: string; desc: string }[];
  features: { title: string; desc: string; icon: string }[];
  faqs: FaqItem[];
  deepTechnicalBreakdown: {
    title: string;
    paragraphs: string[];
  };
  troubleshooting: {
    title: string;
    items: { title: string; desc: string }[];
  };
}

const SEO_DATA: Record<Language, Record<PlatformKey, ContentData>> = {
  en: {
    all: {
      heading: 'Universal Online Video & Audio Downloader',
      subheading: 'SnapLoad provides the fastest, most reliable privacy-first utility to convert and save HD videos and 320kbps MP3 audio from TikTok, Instagram Reels, and YouTube Shorts for free.',
      whyTitle: 'Why Choose SnapLoad Universal Converter?',
      faqTitle: 'Frequently Asked Questions',
      steps: [
        { number: '01', title: 'Copy Media URL', desc: 'Open TikTok or Instagram, find your target video or Reel, tap Share, and select "Copy Link".' },
        { number: '02', title: 'Paste into Search Bar', desc: 'Paste the copied web address into the search box above and click the "Fetch Video" button.' },
        { number: '03', title: 'Select Quality & Download', desc: 'Choose your desired format (1080p Full HD MP4 or 320kbps MP3 audio) and save directly to your device.' },
      ],
      features: [
        { title: 'No Watermark Engine', desc: 'Parse original clean TikTok streams without creator handle overlays.', icon: '✨' },
        { title: '1080p & 4K Resolution', desc: 'Retain maximum source video bitrate and crystal-clear visual resolution.', icon: '🎬' },
        { title: '320kbps MP3 Audio', desc: 'Extract uncompressed 44.1kHz audio tracks for music, podcasts, and ringtones.', icon: '🎵' },
        { title: '100% Free & Zero Logging', desc: 'Zero account signups, zero server storage of files, and end-to-end SSL privacy.', icon: '🔒' },
      ],
      deepTechnicalBreakdown: {
        title: 'Technical Overview & CDN Stream Parsing Architecture',
        paragraphs: [
          'Online short video platforms utilize distributed Content Delivery Networks (CDNs) to stream video segments to millions of mobile devices simultaneously. When you view a video on TikTok or Instagram, your mobile app requests dynamic manifest playlists containing segmented video data. Traditional downloader apps often capture low-resolution screen streams or attempt to record mobile viewports, resulting in blurry visuals, compressed audio, and visual watermark clutter.',
          'SnapLoad employs an advanced server-side stream manifest parser. When a media URL is submitted to SnapLoad, our cloud infrastructure analyzes origin platform endpoint responses, resolves direct HTTPS stream links to the raw, uncompressed source file, and presents original resolution options (such as 1080p Full HD MP4 and 320kbps MP3 audio). This ensures you download the exact digital master file hosted on the origin CDN without re-encoding loss or visual overlays.',
          'Furthermore, SnapLoad operates under a zero-storage server architecture. Video and audio files are never stored, cached, or saved on our physical server disks. The conversion data streams dynamically through real-time volatile memory buffers directly into your browser download manager, guaranteeing total user privacy, zero digital footprint, and strict compliance with global data protection standards including GDPR and CCPA.',
        ],
      },
      troubleshooting: {
        title: 'Troubleshooting & Download Best Practices',
        items: [
          {
            title: 'Verify Account Privacy Status',
            desc: 'SnapLoad can only process public video links. Ensure the video creator has not marked their profile or clip as private.',
          },
          {
            title: 'iOS Safari Camera Roll Transfer',
            desc: 'On iPhone, Safari downloads files to the Files app. To move a video to your Photos app, open Safari Downloads, tap Share, and select "Save Video".',
          },
          {
            title: 'Clear Browser Cache on Failed Requests',
            desc: 'If the fetch button hangs, clear your browser cache or open SnapLoad in a fresh Incognito window.',
          },
        ],
      },
      faqs: [
        {
          question: 'Is SnapLoad completely free to use?',
          answer: 'Yes! SnapLoad is 100% free with unlimited downloads. No sign-up, credit card, or software installation is required.'
        },
        {
          question: 'How do I download TikTok videos without watermark?',
          answer: 'Copy the TikTok video link, paste it into SnapLoad search box, click Fetch, and choose the "No Watermark HD" option.'
        },
        {
          question: 'Can I convert Instagram Reels or TikTok videos to MP3?',
          answer: 'Yes, SnapLoad automatically extracts high-bitrate 320kbps MP3 audio files from any social video link.'
        },
      ]
    },
    tiktok: {
      heading: 'Free TikTok Downloader Without Watermark HD',
      subheading: 'Save watermark-free TikTok videos, slideshow pictures, and trending audio tracks in full 1080p HD resolution.',
      whyTitle: 'Why Choose SnapLoad TikTok Saver?',
      faqTitle: 'TikTok Downloader FAQ',
      steps: [
        { number: '01', title: 'Copy TikTok URL', desc: 'Open the TikTok app or website, tap Share, and choose "Copy Link".' },
        { number: '02', title: 'Paste into SnapLoad', desc: 'Paste the TikTok link into the box above and hit "Fetch Video".' },
        { number: '03', title: 'Download Clean MP4', desc: 'Choose "Without Watermark" to save your clean, high-definition video instantly.' },
      ],
      features: [
        { title: 'Clean Watermark Removal', desc: 'Eliminate bouncing TikTok logos and creator handle overlays.', icon: '🚫' },
        { title: 'Sub-2-Second Fetching', desc: 'Ultra-fast CDN manifest parsing with zero queue delay.', icon: '⚡' },
        { title: 'TikTok Sound Saver', desc: 'Extract viral TikTok audio sounds into standalone 320kbps MP3 files.', icon: '🎧' },
        { title: 'Slideshow Photo Extractor', desc: 'Download all original HD photos from TikTok carousel posts.', icon: '📷' },
      ],
      deepTechnicalBreakdown: {
        title: 'How TikTok Watermark Extraction Works Technically',
        paragraphs: [
          'TikTok embeds watermarks dynamically during client-side video saving. When a video is uploaded, TikTok maintains the raw original MP4 file alongside client composition layers. Official app downloads automatically composite the animated logo and creator name onto the video frame, decreasing usable screen real estate and reducing visual quality.',
          'SnapLoad bypasses client-side composition by connecting directly to origin CDN media API nodes. Our parser retrieves the direct URI of the original un-watermarked master stream. This allows content creators, researchers, and archivists to save pristine 1080p video files suitable for high-quality playback, video editing, or offline archiving.',
        ],
      },
      troubleshooting: {
        title: 'TikTok Download Best Practices',
        items: [
          {
            title: 'Use Direct Video Share Links',
            desc: 'Ensure your copied URL starts with `https://www.tiktok.com/` or `https://vm.tiktok.com/`.',
          },
          {
            title: 'Extracting Carousel Slideshows',
            desc: 'For TikTok photo posts, SnapLoad detects each photo individual link so you can save high-res JPEG images.',
          },
        ],
      },
      faqs: [
        {
          question: 'Why download TikTok videos without watermark?',
          answer: 'Downloading without watermark provides a clean 1080p HD video file suitable for personal archiving and high-quality viewing.'
        },
        {
          question: 'Do I need a TikTok account to download videos?',
          answer: 'No, you do not need a TikTok account or app installation. All you need is the public video URL.'
        }
      ]
    },
    instagram: {
      heading: 'Instagram Reels & Video Downloader 1080p HD',
      subheading: 'Download Instagram Reels, IGTV clips, multi-photo carousels, and video posts in original high definition.',
      whyTitle: 'Why Choose SnapLoad Instagram Saver?',
      faqTitle: 'Instagram Reels & Video FAQ',
      steps: [
        { number: '01', title: 'Copy Instagram Link', desc: 'Tap the three dots or Share icon on any Instagram Reel or Video and tap "Copy link".' },
        { number: '02', title: 'Paste on SnapLoad', desc: 'Paste the copied Instagram URL into our converter search field above.' },
        { number: '03', title: 'Save Original MP4', desc: 'Click Download to save the highest resolution 1080p MP4 file to your gallery.' },
      ],
      features: [
        { title: '1080p Full HD', desc: 'Preserves original 1080x1920 portrait crispness and high bitrate.', icon: '🌟' },
        { title: 'Reels, IGTV & Carousels', desc: 'Full support for Reels, feed posts, carousels, and IGTV clips.', icon: '📸' },
        { title: 'No App Required', desc: 'Runs 100% inside Safari, Chrome, Edge, and Firefox browsers.', icon: '🌐' },
        { title: 'Anonymous Viewing', desc: 'Stream and save media server-side without leaving viewer logs.', icon: '🛡️' },
      ],
      deepTechnicalBreakdown: {
        title: 'Technical Guide to Instagram Reels & HLS Stream Extraction',
        paragraphs: [
          'Instagram uses HTTP Live Streaming (HLS) and fragmented MP4 containers to deliver high-density video clips across mobile networks. When viewing Reels in the Instagram app, the client dynamically adjusts video resolution based on current cellular bandwidth.',
          'SnapLoad forces maximum quality retrieval by inspecting master HLS playlists and selecting the highest bitrate sub-manifest available (typically 1080p at 60fps with 256kbps AAC audio). The resulting stream is delivered as a single cohesive MP4 file compatible with all mobile devices and desktop editors.',
        ],
      },
      troubleshooting: {
        title: 'Instagram Download Troubleshooting',
        items: [
          {
            title: 'Public Posts vs Private Accounts',
            desc: 'Instagram privacy settings restrict external download access to public posts. Ensure the post is publicly accessible.',
          },
          {
            title: 'Saving Stories & Highlights',
            desc: 'Copy active Story or Highlight links directly from the share menu to download temporary 24-hour media.',
          },
        ],
      },
      faqs: [
        {
          question: 'How to download Instagram Reels on mobile?',
          answer: 'Copy the Reel link from the Instagram app, paste it into SnapLoad on Safari/Chrome, tap Fetch Video, and select Download.'
        }
      ]
    },
    mp3: {
      heading: 'Online Video to MP3 Audio Converter (320kbps)',
      subheading: 'Extract studio-grade 320kbps MP3 audio tracks from TikTok, Instagram, and social video links instantly.',
      whyTitle: 'Why Choose SnapLoad MP3 Converter?',
      faqTitle: 'MP3 Converter FAQ',
      steps: [
        { number: '01', title: 'Copy Video Link', desc: 'Copy any video URL containing the music or sound track you want to extract.' },
        { number: '02', title: 'Paste into Converter', desc: 'Paste the video URL into SnapLoad and choose the MP3 Audio option.' },
        { number: '03', title: 'Download Studio Sound', desc: 'Click Download MP3 to receive your high-quality 320kbps audio track.' },
      ],
      features: [
        { title: '320kbps Studio Quality', desc: 'Extracts clear uncompressed audio quality for music & podcasts.', icon: '🎵' },
        { title: 'Real-Time DSP Parsing', desc: 'Processes audio stream extraction in seconds directly in volatile memory.', icon: '⚡' },
        { title: 'Multi-Platform Support', desc: 'Converts TikTok sounds, Instagram audio, and short video clips.', icon: '🌐' },
        { title: 'Custom Ringtone Ready', desc: 'Perfect for creating custom iPhone and Android ringtones or alarms.', icon: '📱' },
      ],
      deepTechnicalBreakdown: {
        title: 'Audio Signal Processing & Bitrate Technical Analysis',
        paragraphs: [
          'Video files embed audio multiplexed alongside video streams. Extracting standalone audio requires demuxing the AAC or Opus stream and encoding it into an optimized MP3 bitstream. Low-quality converters re-sample audio at 128kbps, stripping high frequencies above 15kHz and creating audible distortion.',
          'SnapLoad processes all audio extractions at 320kbps — the absolute maximum bitrate supported by the MP3 codec — using 44.1kHz sampling. This preserves full acoustic range, crisp vocal clarity, and deep bass levels, ensuring studio-fidelity playback across audiophile headphones, car stereos, and mobile speakers.',
        ],
      },
      troubleshooting: {
        title: 'MP3 Extraction Best Practices',
        items: [
          {
            title: 'Setting Ringtones on iPhone',
            desc: 'Import the downloaded 320kbps MP3 file into GarageBand for iOS, select Share > Ringtone, and export to iPhone Settings.',
          },
          {
            title: 'Android Ringtones',
            desc: 'Copy the MP3 file directly to the Ringtones directory using Android File Manager.',
          },
        ],
      },
      faqs: [
        {
          question: 'What is the bitrate quality of extracted MP3 files?',
          answer: 'SnapLoad converts and extracts audio at up to 320kbps (the highest standard MP3 quality available).'
        }
      ]
    },
    'tiktok-mp3': {
      heading: 'TikTok Sound & Audio MP3 Downloader',
      subheading: 'Extract viral sound tracks and trending songs from TikTok video links into 320kbps MP3 audio.',
      whyTitle: 'Why SnapLoad TikTok MP3 Downloader?',
      faqTitle: 'TikTok MP3 FAQ',
      steps: [
        { number: '01', title: 'Copy TikTok Link', desc: 'Find the TikTok video with the sound track you want, tap Share, and select "Copy Link".' },
        { number: '02', title: 'Paste into Converter', desc: 'Paste the link into SnapLoad and select MP3 Audio format.' },
        { number: '03', title: 'Save Audio File', desc: 'Click Download MP3 to receive your 320kbps audio file.' },
      ],
      features: [
        { title: '320kbps High Bitrate', desc: 'Preserves full audio frequency response up to 20kHz.', icon: '🎵' },
        { title: 'Fast Conversion', desc: 'Demuxes audio streams in less than 2 seconds.', icon: '⚡' },
      ],
      deepTechnicalBreakdown: {
        title: 'TikTok Sound Extraction Technical Details',
        paragraphs: [
          'TikTok viral trends rely heavily on unique audio tracks. SnapLoad isolates the primary audio stream from TikTok video manifests, removing background noise compression where possible and encoding into standard MP3 format compatible with all music players.',
        ],
      },
      troubleshooting: {
        title: 'Troubleshooting TikTok Audio',
        items: [
          {
            title: 'Muted Original Audio',
            desc: 'If a TikTok video has been muted due to copyright restrictions on TikTok, audio stream extraction cannot process.',
          },
        ],
      },
      faqs: [
        {
          question: 'Can I extract audio from any TikTok video?',
          answer: 'Yes, as long as the video is public and the audio is un-muted, SnapLoad extracts the 320kbps MP3 sound track.'
        }
      ]
    },
    'youtube-shorts': {
      heading: 'YouTube Shorts Downloader & MP3 Extractor',
      subheading: 'Download YouTube Shorts clips in 1080p HD MP4 or extract 320kbps MP3 audio tracks for free.',
      whyTitle: 'Why Choose SnapLoad YouTube Shorts Saver?',
      faqTitle: 'YouTube Shorts FAQ',
      steps: [
        { number: '01', title: 'Copy Shorts URL', desc: 'In YouTube app or browser, tap Share on the Shorts clip and select "Copy Link".' },
        { number: '02', title: 'Paste into SnapLoad', desc: 'Paste the link into SnapLoad search box.' },
        { number: '03', title: 'Download Video or Audio', desc: 'Select 1080p HD MP4 or 320kbps MP3 audio and click Download.' },
      ],
      features: [
        { title: '1080p Full HD', desc: 'Downloads vertical YouTube Shorts in original 1080p quality.', icon: '🎬' },
        { title: '320kbps MP3 Option', desc: 'Extracts standalone audio tracks for offline listening.', icon: '🎧' },
      ],
      deepTechnicalBreakdown: {
        title: 'YouTube Shorts DASH Manifest Rebuilding',
        paragraphs: [
          'YouTube Shorts use DASH adaptive streaming, serving video and audio in separate streams. SnapLoad automatically merges video and audio tracks server-side in real-time memory, delivering a single cohesive MP4 file to your device.',
        ],
      },
      troubleshooting: {
        title: 'YouTube Shorts Troubleshooting',
        items: [
          {
            title: 'Valid Shorts URLs',
            desc: 'Links should follow the format `https://youtube.com/shorts/...` or `https://youtu.be/...`.',
          },
        ],
      },
      faqs: [
        {
          question: 'Is software installation required to download YouTube Shorts?',
          answer: 'No software, Python scripts, or browser addons are needed. Everything processes 100% inside your web browser.'
        }
      ]
    },
    widget: {
      heading: 'Free Embeddable Downloader Widget',
      subheading: 'Embed SnapLoad video downloader widget on your website or blog with clean integration.',
      whyTitle: 'Why Embed SnapLoad Widget?',
      faqTitle: 'Widget FAQ',
      steps: [
        { number: '01', title: 'Copy Iframe Code', desc: 'Copy the provided responsive iframe embed snippet.' },
        { number: '02', title: 'Paste in HTML', desc: 'Insert the widget code into your blog post or website body.' },
        { number: '03', title: 'Offer Downloader', desc: 'Give your visitors instant video downloading capabilities.' },
      ],
      features: [
        { title: 'Responsive Design', desc: 'Adapts smoothly to desktop and mobile screens.', icon: '📱' },
      ],
      deepTechnicalBreakdown: {
        title: 'Widget Technical Integration',
        paragraphs: [
          'The SnapLoad widget uses lightweight iframe sandbox security, providing an embedded tool interface for your visitors without impacting your page load speed.',
        ],
      },
      troubleshooting: {
        title: 'Widget Best Practices',
        items: [
          {
            title: 'Iframe Dimensions',
            desc: 'Use width 100% and min-height 500px for optimal widget display.',
          },
        ],
      },
      faqs: [
        {
          question: 'Is the downloader widget free to embed?',
          answer: 'Yes! The widget is 100% free to embed on any blog or website.'
        }
      ]
    }
  },
  de: {
    all: {
      heading: 'Universal Online Video & Audio Downloader',
      subheading: 'SnapLoad bietet die schnellste Möglichkeit, HD-Videos und MP3-Audio von TikTok und Instagram kostenlos zu speichern.',
      whyTitle: 'Warum SnapLoad wählen?',
      faqTitle: 'Häufig gestellte Fragen',
      steps: [
        { number: '01', title: 'Link kopieren', desc: 'Kopieren Sie die URL eines Videos von TikTok oder Instagram.' },
        { number: '02', title: 'Link einfügen', desc: 'Fügen Sie die URL oben ein und klicken Sie auf "Holen".' },
        { number: '03', title: 'Herunterladen', desc: 'Wählen Sie die Auflösung oder das MP3-Format zum sofortigen Download.' },
      ],
      features: [
        { title: 'Ohne Wasserzeichen', desc: 'Laden Sie TikTok-Videos ohne Logo herunter.', icon: '✨' },
        { title: 'Full HD & 4K', desc: 'Erhalten Sie die originale Videoqualität in 1080p HD oder 4K.', icon: '🎬' },
      ],
      deepTechnicalBreakdown: {
        title: 'Technische Übersicht',
        paragraphs: [
          'SnapLoad nutzt Cloud-Infrastruktur, um direkte CDN-Streams von Herkunftsservern abzurufen, sodass Videos in voller 1080p HD-Auflösung ohne Qualitätsverlust gespeichert werden.',
        ],
      },
      troubleshooting: {
        title: 'Fehlerbehebung',
        items: [
          { title: 'Öffentliche Links', desc: 'Stellen Sie sicher, dass das Video auf öffentlich eingestellt ist.' },
        ],
      },
      faqs: [
        {
          question: 'Ist SnapLoad kostenlos?',
          answer: 'Ja! SnapLoad ist 100% kostenlos ohne Registrierung.'
        }
      ]
    },
    tiktok: {
      heading: 'TikTok Downloader Ohne Wasserzeichen HD',
      subheading: 'Speichern Sie wasserzeichenfreie TikTok-Videos und Audio direkt auf Ihrem Gerät.',
      whyTitle: 'Warum SnapLoad TikTok Downloader?',
      faqTitle: 'TikTok FAQ',
      steps: [
        { number: '01', title: 'TikTok URL kopieren', desc: 'Tippen Sie bei TikTok auf Teilen und Link kopieren.' },
        { number: '02', title: 'Einfügen', desc: 'Fügen Sie den Link bei SnapLoad ein.' },
        { number: '03', title: 'Speichern', desc: 'Wählen Sie Ohne Wasserzeichen.' },
      ],
      features: [{ title: 'Wasserzeichenfrei', desc: 'Saubere Videos ohne Logo.', icon: '🚫' }],
      deepTechnicalBreakdown: { title: 'TikTok Technologie', paragraphs: ['SnapLoad extrahiert den rohen MP4-Stream direkt vom CDN.'] },
      troubleshooting: { items: [{ title: 'Link-Format', desc: 'Prüfen Sie, ob der Link mit tiktok.com beginnt.' }] },
      faqs: [{ question: 'Warum ohne Wasserzeichen?', answer: 'Ermöglicht saubere persönliche Archivierung.' }]
    },
    instagram: {
      heading: 'Instagram Reels Downloader 1080p HD',
      subheading: 'Laden Sie Instagram Reels und Videos in HD herunter.',
      whyTitle: 'Warum SnapLoad Instagram?',
      faqTitle: 'Instagram FAQ',
      steps: [
        { number: '01', title: 'Link kopieren', desc: 'Kopieren Sie den Reel-Link.' },
        { number: '02', title: 'Einfügen', desc: 'Fügen Sie ihn oben ein.' },
        { number: '03', title: 'Download', desc: 'Speichern Sie die 1080p MP4-Datei.' },
      ],
      features: [{ title: '1080p HD', desc: 'Originale Qualität.', icon: '🌟' }],
      deepTechnicalBreakdown: { title: 'Instagram Streaming', paragraphs: ['Verarbeitet HLS-Streams direkt.'] },
      troubleshooting: { items: [{ title: 'Öffentliche Beiträge', desc: 'Nur öffentliche Beiträge können verarbeitet werden.' }] },
      faqs: [{ question: 'Wie lade ich Reels herunter?', answer: 'Link kopieren und bei SnapLoad einfügen.' }]
    },
    mp3: {
      heading: 'Video zu MP3 Konverter (320kbps)',
      subheading: 'Extrahierten Sie MP3-Audiospuren in hoher Qualität.',
      whyTitle: 'Warum MP3 Konverter?',
      faqTitle: 'MP3 FAQ',
      steps: [
        { number: '01', title: 'Link kopieren', desc: 'Kopieren Sie den Videolink.' },
        { number: '02', title: 'Konvertieren', desc: 'Wählen Sie MP3-Audio.' },
        { number: '03', title: 'Speichern', desc: 'Herunterladen der 320kbps Datei.' },
      ],
      features: [{ title: '320kbps MP3', desc: 'Höchste Audiobitrate.', icon: '🎵' }],
      deepTechnicalBreakdown: { title: 'Audio-Verarbeitung', paragraphs: ['Extrahiert unkomprimierten Sound.'] },
      troubleshooting: { items: [{ title: 'Klingeltöne', desc: 'Kann als iPhone/Android Klingelton verwendet werden.' }] },
      faqs: [{ question: 'Welche Qualität?', answer: 'Bis zu 320kbps MP3.' }]
    },
    'tiktok-mp3': { heading: 'TikTok MP3', subheading: 'TikTok Sound Extraktor.', whyTitle: 'Warum TikTok MP3?', faqTitle: 'FAQ', steps: [{ number: '01', title: 'Kopieren', desc: 'Link kopieren.' }, { number: '02', title: 'Einfügen', desc: 'Einfügen.' }, { number: '03', title: 'Speichern', desc: 'Download MP3.' }], features: [{ title: '320kbps', desc: 'Klarer Sound.', icon: '🎵' }], deepTechnicalBreakdown: { title: 'Audio Details', paragraphs: ['Isoliert die Tonspur.'] }, troubleshooting: { items: [{ title: 'Stummgeschaltet', desc: 'Urheberrechtlich stummgeschaltete Videos können nicht konvertiert werden.' }] }, faqs: [{ question: 'Alle Videos?', answer: 'Ja, wenn öffentlich.' }] },
    'youtube-shorts': { heading: 'YouTube Shorts', subheading: 'Shorts Downloader.', whyTitle: 'Warum Shorts?', faqTitle: 'FAQ', steps: [{ number: '01', title: 'Kopieren', desc: 'Link kopieren.' }, { number: '02', title: 'Einfügen', desc: 'Einfügen.' }, { number: '03', title: 'Speichern', desc: 'Download.' }], features: [{ title: '1080p HD', desc: 'HD Video.', icon: '🎬' }], deepTechnicalBreakdown: { title: 'DASH Streams', paragraphs: ['Fügt Video & Audio zusammen.'] }, troubleshooting: { items: [{ title: 'URL Prüfen', desc: 'Muss youtube.com/shorts enthalten.' }] }, faqs: [{ question: 'Kostenlos?', answer: 'Ja, 100% kostenlos.' }] },
    widget: { heading: 'Widget', subheading: 'Embed Downloader.', whyTitle: 'Warum Widget?', faqTitle: 'FAQ', steps: [{ number: '01', title: 'Code kopieren', desc: 'Iframe kopieren.' }, { number: '02', title: 'Einbinden', desc: 'In Webseite einfügen.' }, { number: '03', title: 'Fertig', desc: 'Tool anbieten.' }], features: [{ title: 'Responsive', desc: 'Passt sich an.', icon: '📱' }], deepTechnicalBreakdown: { title: 'Widget Tech', paragraphs: ['Sicherer Iframe.'] }, troubleshooting: { items: [{ title: 'Höhe', desc: 'Empfohlen 500px.' }] }, faqs: [{ question: 'Gratis?', answer: 'Ja.' }] }
  },
  fr: {
    all: { heading: 'Téléchargeur Universal', subheading: 'Téléchargez des vidéos HD et MP3.', whyTitle: 'Pourquoi SnapLoad ?', faqTitle: 'FAQ', steps: [{ number: '01', title: 'Copier', desc: 'Copiez le lien.' }, { number: '02', title: 'Coller', desc: 'Collez le lien.' }, { number: '03', title: 'Télécharger', desc: 'Téléchargez le fichier.' }], features: [{ title: 'Sans Filigrane', desc: 'Vidéo propre.', icon: '✨' }], deepTechnicalBreakdown: { title: 'Aperçu Technique', paragraphs: ['Analyse les flux CDN directement.'] }, troubleshooting: { items: [{ title: 'Liens Publics', desc: 'Assurez-vous que le profil est public.' }] }, faqs: [{ question: 'Est-ce gratuit ?', answer: 'Oui, 100% gratuit.' }] },
    tiktok: { heading: 'TikTok Sans Filigrane', subheading: 'Vidéos TikTok HD.', whyTitle: 'Pourquoi SnapLoad ?', faqTitle: 'FAQ', steps: [{ number: '01', title: 'Copier', desc: 'Lien TikTok.' }, { number: '02', title: 'Coller', desc: 'Sur SnapLoad.' }, { number: '03', title: 'Télécharger', desc: 'MP4 sans filigrane.' }], features: [{ title: 'Sans Filigrane', desc: 'Logo supprimé.', icon: '🚫' }], deepTechnicalBreakdown: { title: 'Technologie', paragraphs: ['Extrait le MP4 original.'] }, troubleshooting: { items: [{ title: 'Format du lien', desc: 'Doit contenir tiktok.com.' }] }, faqs: [{ question: 'Sans filigrane ?', answer: 'Oui, vidéo propre.' }] },
    instagram: { heading: 'Instagram Reels HD', subheading: 'Reels en 1080p.', whyTitle: 'Pourquoi SnapLoad ?', faqTitle: 'FAQ', steps: [{ number: '01', title: 'Copier', desc: 'Lien Reel.' }, { number: '02', title: 'Coller', desc: 'Sur SnapLoad.' }, { number: '03', title: 'Télécharger', desc: 'Fichier MP4.' }], features: [{ title: '1080p HD', desc: 'Qualité originale.', icon: '🌟' }], deepTechnicalBreakdown: { title: 'HLS Flux', paragraphs: ['Récupère le flux HLS max.'] }, troubleshooting: { items: [{ title: 'Comptes publics', desc: 'Seuls les contenus publics sont gérés.' }] }, faqs: [{ question: 'Comment enregistrer ?', answer: 'Copiez le lien et collez.' }] },
    mp3: { heading: 'Convertisseur MP3', subheading: 'Audio 320kbps.', whyTitle: 'Pourquoi MP3 ?', faqTitle: 'FAQ', steps: [{ number: '01', title: 'Copier', desc: 'Lien vidéo.' }, { number: '02', title: 'Convertir', desc: 'Option MP3.' }, { number: '03', title: 'Télécharger', desc: 'Fichier MP3.' }], features: [{ title: '320kbps', desc: 'Son studio.', icon: '🎵' }], deepTechnicalBreakdown: { title: 'DSP Audio', paragraphs: ['Extraction audio pure.'] }, troubleshooting: { items: [{ title: 'Sonneries', desc: 'Compatible iPhone et Android.' }] }, faqs: [{ question: 'Qualité ?', answer: 'Jusqu\'à 320kbps.' }] },
    'tiktok-mp3': { heading: 'TikTok MP3', subheading: 'Audio TikTok.', whyTitle: 'Pourquoi ?', faqTitle: 'FAQ', steps: [{ number: '01', title: 'Copier', desc: 'Lien.' }, { number: '02', title: 'Coller', desc: 'Lien.' }, { number: '03', title: 'Sauvegarder', desc: 'MP3.' }], features: [{ title: '320kbps', desc: 'Son net.', icon: '🎵' }], deepTechnicalBreakdown: { title: 'Audio', paragraphs: ['Isole le son.'] }, troubleshooting: { items: [{ title: 'Audio muet', desc: 'Les sons supprimés ne peuvent pas être téléchargés.' }] }, faqs: [{ question: 'Tout vidéo ?', answer: 'Oui si publique.' }] },
    'youtube-shorts': { heading: 'YouTube Shorts', subheading: 'Shorts HD.', whyTitle: 'Pourquoi ?', faqTitle: 'FAQ', steps: [{ number: '01', title: 'Copier', desc: 'Lien.' }, { number: '02', title: 'Coller', desc: 'Lien.' }, { number: '03', title: 'Sauvegarder', desc: 'Télécharger.' }], features: [{ title: '1080p HD', desc: 'HD.', icon: '🎬' }], deepTechnicalBreakdown: { title: 'DASH', paragraphs: ['Fusionne vidéo et audio.'] }, troubleshooting: { items: [{ title: 'URL', desc: 'Format youtube.com/shorts.' }] }, faqs: [{ question: 'Gratuit ?', answer: 'Oui.' }] },
    widget: { heading: 'Widget', subheading: 'Intégrer.', whyTitle: 'Pourquoi ?', faqTitle: 'FAQ', steps: [{ number: '01', title: 'Copier', desc: 'Code.' }, { number: '02', title: 'Intégrer', desc: 'HTML.' }, { number: '03', title: 'Offrir', desc: 'Outil.' }], features: [{ title: 'Responsive', desc: 'Adaptatif.', icon: '📱' }], deepTechnicalBreakdown: { title: 'Iframe', paragraphs: ['Sécurisé.'] }, troubleshooting: { items: [{ title: 'Hauteur', desc: '500px.' }] }, faqs: [{ question: 'Gratuit ?', answer: 'Oui.' }] }
  },
  es: {
    all: { heading: 'Descargador Universal', subheading: 'Descarga videos HD y MP3.', whyTitle: '¿Por qué SnapLoad?', faqTitle: 'FAQ', steps: [{ number: '01', title: 'Copiar', desc: 'Copia el enlace.' }, { number: '02', title: 'Pegar', desc: 'Pega el enlace.' }, { number: '03', title: 'Descargar', desc: 'Guarda tu archivo.' }], features: [{ title: 'Sin Marca de Agua', desc: 'Video limpio.', icon: '✨' }], deepTechnicalBreakdown: { title: 'Análisis Técnico', paragraphs: ['Obtiene transmisiones CDN directas en 1080p.'] }, troubleshooting: { items: [{ title: 'Cuentas Públicas', desc: 'El contenido debe ser público.' }] }, faqs: [{ question: '¿Es gratis?', answer: 'Sí, 100% gratis.' }] },
    tiktok: { heading: 'TikTok Sin Marca de Agua', subheading: 'Videos de TikTok HD.', whyTitle: '¿Por qué SnapLoad?', faqTitle: 'FAQ', steps: [{ number: '01', title: 'Copiar', desc: 'Enlace de TikTok.' }, { number: '02', title: 'Pegar', desc: 'En SnapLoad.' }, { number: '03', title: 'Descargar', desc: 'MP4 limpio.' }], features: [{ title: 'Sin Marca de Agua', desc: 'Elimina el logo.', icon: '🚫' }], deepTechnicalBreakdown: { title: 'Tecnología', paragraphs: ['Obtiene el stream MP4 maestro.'] }, troubleshooting: { items: [{ title: 'Formato URL', desc: 'Debe contener tiktok.com.' }] }, faqs: [{ question: '¿Sin marca de agua?', answer: 'Sí, video original limpio.' }] },
    instagram: { heading: 'Instagram Reels HD', subheading: 'Reels en 1080p HD.', whyTitle: '¿Por qué SnapLoad?', faqTitle: 'FAQ', steps: [{ number: '01', title: 'Copiar', desc: 'Enlace del Reel.' }, { number: '02', title: 'Pegar', desc: 'En SnapLoad.' }, { number: '03', title: 'Descargar', desc: 'Guardar MP4.' }], features: [{ title: '1080p HD', desc: 'Calidad original.', icon: '🌟' }], deepTechnicalBreakdown: { title: 'Flujo HLS', paragraphs: ['Procesa streams HLS en máxima resolución.'] }, troubleshooting: { items: [{ title: 'Publicaciones Públicas', desc: 'Requiere acceso público.' }] }, faqs: [{ question: '¿Cómo guardar?', answer: 'Copia y pega el enlace.' }] },
    mp3: { heading: 'Convertidor MP3', subheading: 'Audio en 320kbps.', whyTitle: '¿Por qué MP3?', faqTitle: 'FAQ', steps: [{ number: '01', title: 'Copiar', desc: 'Enlace de video.' }, { number: '02', title: 'Convertir', desc: 'Opción MP3.' }, { number: '03', title: 'Descargar', desc: 'Guardar audio.' }], features: [{ title: '320kbps MP3', desc: 'Calidad de estudio.', icon: '🎵' }], deepTechnicalBreakdown: { title: 'Procesamiento DSP', paragraphs: ['Extracción de audio pura.'] }, troubleshooting: { items: [{ title: 'Tonos de llamada', desc: 'Compatible con iPhone y Android.' }] }, faqs: [{ question: '¿Qué calidad?', answer: 'Hasta 320kbps.' }] },
    'tiktok-mp3': { heading: 'TikTok MP3', subheading: 'Audio de TikTok.', whyTitle: '¿Por qué?', faqTitle: 'FAQ', steps: [{ number: '01', title: 'Copiar', desc: 'Enlace.' }, { number: '02', title: 'Pegar', desc: 'Enlace.' }, { number: '03', title: 'Guardar', desc: 'MP3.' }], features: [{ title: '320kbps', desc: 'Audio claro.', icon: '🎵' }], deepTechnicalBreakdown: { title: 'Audio', paragraphs: ['Aísla el canal de sonido.'] }, troubleshooting: { items: [{ title: 'Audio silenciado', desc: 'Videos silenciados no se pueden extraer.' }] }, faqs: [{ question: '¿Cualquier video?', answer: 'Sí, si es público.' }] },
    'youtube-shorts': { heading: 'YouTube Shorts', subheading: 'Shorts HD.', whyTitle: '¿Por qué?', faqTitle: 'FAQ', steps: [{ number: '01', title: 'Copiar', desc: 'Enlace.' }, { number: '02', title: 'Pegar', desc: 'Enlace.' }, { number: '03', title: 'Guardar', desc: 'Descargar.' }], features: [{ title: '1080p HD', desc: 'Full HD.', icon: '🎬' }], deepTechnicalBreakdown: { title: 'DASH', paragraphs: ['Combina video y audio.'] }, troubleshooting: { items: [{ title: 'Formato URL', desc: 'Debe contener youtube.com/shorts.' }] }, faqs: [{ question: '¿Gratis?', answer: 'Sí.' }] },
    widget: { heading: 'Widget', subheading: 'Incrustar.', whyTitle: '¿Por qué?', faqTitle: 'FAQ', steps: [{ number: '01', title: 'Copiar', desc: 'Código.' }, { number: '02', title: 'Pegar', desc: 'HTML.' }, { number: '03', title: 'Ofrecer', desc: 'Herramienta.' }], features: [{ title: 'Adaptable', desc: 'Diseño responsive.', icon: '📱' }], deepTechnicalBreakdown: { title: 'Iframe', paragraphs: ['Iframe seguro.'] }, troubleshooting: { items: [{ title: 'Altura', desc: '500px recomendado.' }] }, faqs: [{ question: '¿Gratis?', answer: 'Sí.' }] }
  }
};

export function SeoContentSection({ platform, currentLanguage = 'en' }: SeoContentProps) {
  const langData = SEO_DATA[currentLanguage] || SEO_DATA.en;
  const content = langData[platform] || langData.all;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    // Dynamic HowTo & FAQPage JSON-LD Schemas for Rich Search Snippets & E-E-A-T
    if (content) {
      const schemas: object[] = [];

      if (content.steps && content.steps.length > 0) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          '@id': `https://snaploaddownload.com/#howto-${platform}`,
          'name': content.heading,
          'description': content.subheading,
          'step': content.steps.map((step, idx) => ({
            '@type': 'HowToStep',
            'position': idx + 1,
            'name': step.title,
            'text': step.desc,
          })),
        });
      }

      if (content.faqs && content.faqs.length > 0) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': `https://snaploaddownload.com/#faq-${platform}`,
          'mainEntity': content.faqs.map((faq) => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': faq.answer,
            },
          })),
        });
      }

      let scriptTag = document.getElementById('dynamic-page-jsonld');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'dynamic-page-jsonld';
        scriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schemas);
    }
  }, [content, platform]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-4xl mx-auto mt-16 space-y-16 animate-fade-in text-left">
      
      {/* 1. Step-by-Step How-To Guide */}
      <article className="glass-strong rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl space-y-8">
        <header className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 dark:text-primary-400 text-xs font-bold">
            <span>📖 How-To Guide</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {content.heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {content.subheading}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.steps.map((step, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-2xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 shadow-md hover:border-primary-500/40 hover:shadow-xl transition-all"
            >
              <span className="inline-block text-3xl font-black text-primary-500/50 mb-2 font-mono">
                {step.number}
              </span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-1.5">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </article>

      {/* 2. Key Features & Deep Technical Breakdown */}
      <article className="space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {content.whyTitle}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {content.features.map((feat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl glass-subtle border border-slate-200/80 dark:border-white/10 hover:border-primary-500/40 transition-all flex flex-col items-start shadow-sm"
            >
              <span className="text-3xl mb-3">{feat.icon}</span>
              <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white mb-1">
                {feat.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Deep Technical Content Box */}
        {content.deepTechnicalBreakdown && (
          <div className="glass-strong rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 space-y-4 shadow-lg">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-white/10 pb-3">
              ⚙️ {content.deepTechnicalBreakdown.title}
            </h3>
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {content.deepTechnicalBreakdown.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Policy-Compliant In-Content Ad Banner */}
      <AdBanner slot={`platform-${platform}-slot`} label="Sponsored Content" className="my-8" />

      {/* 3. Troubleshooting & Best Practices Section */}
      {content.troubleshooting && (
        <article className="glass-strong rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 space-y-6 shadow-lg">
          <header className="space-y-1">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>🛠️</span> {content.troubleshooting.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Verified solutions and operational guidelines for seamless video conversions.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.troubleshooting.items.map((item, idx) => (
              <div key={idx} className="glass-subtle p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 space-y-2">
                <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </article>
      )}

      {/* 4. Interactive Accordion FAQ Section */}
      <article className="glass-strong rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-xl">
        <header className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
            {content.faqTitle}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Answers to common questions about downloads, quality, and platform safety.
          </p>
        </header>

        <div className="space-y-3.5">
          {content.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 dark:border-white/10 overflow-hidden transition-all bg-white/40 dark:bg-white/5"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-slate-900 dark:text-white text-sm sm:text-base hover:bg-slate-100/50 dark:hover:bg-white/10 transition-all cursor-pointer"
                >
                  <span className="pr-4">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 text-primary-500 dark:text-primary-400 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 animate-fade-in border-t border-slate-200/60 dark:border-white/5 pt-3 leading-relaxed font-medium">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </article>

    </section>
  );
}
