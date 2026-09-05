import { useEffect, useState } from 'react';
import { Language } from '../utils/i18n';
import { AdBanner } from './AdBanner';
import { LOCALIZED_SEO_DATA, HOW_TO_BADGES, FAQ_SUBTITLES } from '../data/localizedSeoData';

type PlatformKey = 'all' | 'tiktok' | 'instagram' | 'facebook' | 'mp3' | 'tiktok-mp3' | 'widget';

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

const MASTER_EN_DATA: Record<PlatformKey, ContentData> = {
  all: {
    heading: 'Fast, Free TikTok & Instagram Video Downloader — Original HD Quality',
    subheading: 'SnapLoad is a free, web-based video downloader that allows you to instantly extract clean, watermark-free TikTok videos and original HD Instagram Reels directly to your local storage without account registration. Built for content creators, social media managers, and casual users, it processes video links in under three seconds through a secure, browser-based interface.',
    whyTitle: 'Why Choose SnapLoad Video Downloader?',
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
        'Online short video platforms utilize distributed Content Delivery Networks (CDNs) to stream video segments to millions of mobile devices simultaneously. When you view a video on TikTok or Instagram, your mobile app requests dynamic manifest playlists containing segmented video data.',
        'SnapLoad employs an advanced server-side stream manifest parser. When a media URL is submitted to SnapLoad, our cloud infrastructure analyzes origin platform endpoint responses, resolves direct HTTPS stream links to the raw, uncompressed source file, and presents original resolution options (such as 1080p Full HD MP4 and 320kbps MP3 audio).',
        'Furthermore, SnapLoad operates under a zero-storage server architecture. Video and audio files are never stored, cached, or saved on our physical server disks. The conversion data streams dynamically through real-time volatile memory buffers directly into your browser download manager, guaranteeing total user privacy, zero digital footprint, and strict compliance with global data protection standards including GDPR and CCPA.',
      ],
    },
    troubleshooting: {
      title: 'Troubleshooting & Download Best Practices',
      items: [
        { title: 'Verify Account Privacy Status', desc: 'SnapLoad can only process public video links. Ensure the video creator has not marked their profile or clip as private.' },
        { title: 'iOS Safari Camera Roll Transfer', desc: 'On iPhone, Safari downloads files to the Files app. To move a video to your Photos app, open Safari Downloads, tap Share, and select "Save Video".' },
        { title: 'Clear Browser Cache on Failed Requests', desc: 'If the fetch button hangs, clear your browser cache or open SnapLoad in a fresh Incognito window.' },
      ],
    },
    faqs: [
      { question: 'Do I have to pay to use TikTok download without watermark?', answer: 'No, our TikTok Downloader is 100% free to use with unlimited downloads. You do not need to pay any subscription fees, enter credit card details, or purchase software.' },
      { question: 'Do I need to install an extension to use the TikTok Downloader?', answer: 'No extension or software installation is required. You can use our downloader directly inside any web browser on iPhone, Android, Windows, or Mac by simply pasting the video link.' },
      { question: 'Where are TikTok videos saved after downloading?', answer: 'Downloaded videos are saved to your device’s default Downloads folder. On Android, Windows PC, and Mac, check your Downloads folder or Gallery app. On iPhone/iPad, Safari saves files to the Files app under Downloads, where you can tap "Save Video" to transfer them to your Camera Roll.' },
      { question: 'Do I need to have a TT account to download TikTok videos?', answer: 'No, you do not need a TikTok account or to be logged in. As long as you have the link to a public TikTok video, you can paste it and download the file immediately.' },
    ],
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
        'TikTok embeds watermarks dynamically during client-side video saving. When a video is uploaded, TikTok maintains the raw original MP4 file alongside client composition layers.',
        'SnapLoad bypasses client-side composition by connecting directly to origin CDN media API nodes. Our parser retrieves the direct URI of the original un-watermarked master stream.',
      ],
    },
    troubleshooting: {
      title: 'TikTok Download Best Practices',
      items: [
        { title: 'Use Direct Video Share Links', desc: 'Ensure your copied URL starts with `https://www.tiktok.com/` or `https://vm.tiktok.com/`.' },
        { title: 'Extracting Carousel Slideshows', desc: 'For TikTok photo posts, SnapLoad detects each photo individual link so you can save high-res JPEG images.' },
      ],
    },
    faqs: [
      { question: 'Do I have to pay to use TikTok download without watermark?', answer: 'No, our TikTok Downloader is 100% free with unlimited downloads.' },
      { question: 'How to download TikTok video without watermark in HD?', answer: 'Copy your TikTok link, paste it into our search bar, and select "No Watermark HD 1080p".' },
    ],
  },
  instagram: {
    heading: 'Instagram Reels & Video Downloader 1080p HD',
    subheading: 'Download Instagram Reels, IGTV clips, carousel photos, and video posts in lossless 1080p HD resolution.',
    whyTitle: 'Why Choose SnapLoad Instagram Saver?',
    faqTitle: 'Instagram Downloader FAQ',
    steps: [
      { number: '01', title: 'Copy Instagram Post URL', desc: 'Open Instagram, tap the three dots or share button on any Reel, and tap "Copy Link".' },
      { number: '02', title: 'Paste into Search Box', desc: 'Paste the link into SnapLoad search box above and click "Fetch Video".' },
      { number: '03', title: 'Save High Definition MP4', desc: 'Select 1080p HD MP4 format to save high quality media to your gallery.' },
    ],
    features: [
      { title: 'Full 1080p HD Resolution', desc: 'Preserve full resolution without video compression loss.', icon: '🌟' },
      { title: 'Reels, IGTV & Posts', desc: 'Complete 1080p support for all public Instagram media formats.', icon: '📹' },
      { title: 'Carousel Multi-Photo', desc: 'Download all high-resolution images from carousel posts.', icon: '🖼️' },
      { title: 'No Instagram Login', desc: 'Download content anonymously without entering your credentials.', icon: '🔒' },
    ],
    deepTechnicalBreakdown: {
      title: 'Instagram HLS Manifest Parsing',
      paragraphs: [
        'Instagram stores high-resolution Reels as HTTP Live Streaming (HLS) adaptive bitrate streams. When viewed in app, Instagram dynamically adjusts resolution based on your network speed.',
        'SnapLoad inspects the HLS playlist manifest to identify the highest bitrate video variant (up to 1080p @ 60fps), merging audio and video streams into a standalone MP4 file.',
      ],
    },
    troubleshooting: {
      title: 'Instagram Download Troubleshooting',
      items: [
        { title: 'Public Posts Only', desc: 'Ensure the Instagram account is public. Videos from private accounts cannot be accessed.' },
        { title: 'Copying Link from App', desc: 'Tap Share -> Copy Link on the target post to ensure a clean URL format.' },
      ],
    },
    faqs: [
      { question: 'Can I download Instagram Reels in 1080p HD?', answer: 'Yes! SnapLoad extracts the highest available 1080p HD video file directly from Instagram servers.' },
    ],
  },
  facebook: {
    heading: 'Facebook Video Downloader 1080p HD — Free FB Reels & Watch Saver',
    subheading: 'Download Facebook Reels, Watch videos, live broadcasts, and public video clips in crystal-clear 1080p Full HD MP4 format or convert to 320kbps MP3 audio for free with zero registration.',
    whyTitle: 'Why Choose SnapLoad Facebook Video Downloader?',
    faqTitle: 'Facebook Downloader FAQ',
    steps: [
      { number: '01', title: 'Copy Facebook Video Link', desc: 'Open Facebook, tap the Share button on any public video, Reel, or Watch clip, and choose "Copy Link".' },
      { number: '02', title: 'Paste into Search Bar', desc: 'Paste the copied Facebook link into SnapLoad search box above and click "Fetch Video".' },
      { number: '03', title: 'Save HD Video or MP3', desc: 'Select your preferred video quality (1080p HD, 720p SD) or 320kbps MP3 audio to download instantly.' },
    ],
    features: [
      { title: '1080p Full HD Quality', desc: 'Preserve high resolution and crisp bitrate for Facebook Reels and Watch clips.', icon: '🎬' },
      { title: 'Reels, Watch & Stories', desc: 'Full support for public Facebook Reels, Watch videos, and timeline clips.', icon: '📱' },
      { title: '320kbps MP3 Extractor', desc: 'Extract background songs, speeches, and podcast audio directly from Facebook videos.', icon: '🎵' },
      { title: '100% Free & Anonymous', desc: 'Zero login or Facebook account access required. Safe, fast, and secure.', icon: '🔒' },
    ],
    deepTechnicalBreakdown: {
      title: 'Facebook Video Stream Manifest Extraction',
      paragraphs: [
        'Facebook delivers streaming video using progressive MP4 endpoints and dynamic adaptive streaming protocols. Different quality streams (such as 1080p HD, 720p SD, and low bitrate mobile streams) are referenced inside origin metadata payloads.',
        'SnapLoad parses Facebook video link parameters, resolves mobile redirects (including fb.watch and share links), and identifies the highest available video container stream on Meta CDN servers.',
        'The video file is then streamed directly to your browser memory and saved to your device with zero intermediate server storage, ensuring blazing speed and total privacy.',
      ],
    },
    troubleshooting: {
      title: 'Facebook Download Best Practices',
      items: [
        { title: 'Public Videos Only', desc: 'Ensure the Facebook video is posted with a Public (globe icon) privacy setting. Private videos or closed group posts cannot be accessed.' },
        { title: 'Supported URL Formats', desc: 'Works with facebook.com/watch, facebook.com/reel, facebook.com/share, and fb.watch short links.' },
        { title: 'Mobile Browser Saving', desc: 'On iOS devices, files download to the Files app where you can tap "Save Video" to transfer to Photos.' },
      ],
    },
    faqs: [
      { question: 'Is SnapLoad Facebook Video Downloader free to use?', answer: 'Yes! SnapLoad is 100% free with unlimited downloads. You do not need to register, provide credentials, or pay any fees.' },
      { question: 'Can I download Facebook Reels in 1080p HD?', answer: 'Yes! SnapLoad extracts original 1080p Full HD and 720p HD MP4 video streams whenever the creator uploaded the clip in high definition.' },
      { question: 'How do I download Facebook videos on mobile (Android or iPhone)?', answer: 'Copy the video link from the Facebook app, open SnapLoad in Safari or Chrome, paste the link into the search box, and tap Download. On iPhone, save the downloaded file to your Camera Roll via the Files app.' },
      { question: 'Do I need to log into my Facebook account?', answer: 'No, you never need to log in or share any Facebook credentials. SnapLoad only requires the public URL of the video.' },
      { question: 'Can I convert Facebook videos to MP3 audio?', answer: 'Yes! Simply paste any Facebook video link and select the "MP3 Audio (320kbps)" format option to download studio-quality sound tracks.' },
    ],
  },
  mp3: {
    heading: 'High-Quality Video to MP3 Audio Converter (320kbps)',
    subheading: 'Extract uncompressed studio-grade 320kbps MP3 audio tracks directly from TikTok and Instagram video links.',
    whyTitle: 'Why Choose SnapLoad MP3 Extractor?',
    faqTitle: 'MP3 Converter FAQ',
    steps: [
      { number: '01', title: 'Copy Video Link', desc: 'Copy the URL of any TikTok or Instagram video containing your favorite song or sound.' },
      { number: '02', title: 'Select MP3 Option', desc: 'Paste the URL into SnapLoad and choose the 320kbps MP3 audio format.' },
      { number: '03', title: 'Save Audio File', desc: 'Click Download to save the crystal-clear MP3 file directly to your device.' },
    ],
    features: [
      { title: '320kbps Bitrate Audio', desc: 'Extract high-fidelity 44.1kHz stereo audio for music and podcasts.', icon: '🎵' },
      { title: 'Instant Processing', desc: 'Convert video streams into MP3 audio in less than 2 seconds.', icon: '⚡' },
      { title: 'Ringtone Ready', desc: 'Use extracted MP3 files for custom phone ringtones or alarms.', icon: '🔔' },
      { title: '100% Free & Unlimited', desc: 'Convert unlimited videos to MP3 without daily caps or fees.', icon: '♾️' },
    ],
    deepTechnicalBreakdown: {
      title: 'Audio Stream Demuxing Engine',
      paragraphs: [
        'Social video streams bundle AAC audio channels inside MP4 video containers. SnapLoad uses dynamic demuxing algorithms to isolate the audio stream without re-encoding loss.',
        'This delivers studio-quality 320kbps MP3 audio files ready for music playback, sound editing, or custom ringtones.',
      ],
    },
    troubleshooting: {
      title: 'Audio Converter Tips',
      items: [
        { title: 'Muted Copyrighted Audio', desc: 'If an origin video has been muted due to copyright, audio cannot be extracted.' },
      ],
    },
    faqs: [
      { question: 'What audio quality can I expect?', answer: 'SnapLoad extracts uncompressed 320kbps MP3 audio tracks for maximum audio fidelity.' },
    ],
  },
  'tiktok-mp3': {
    heading: 'TikTok Sound & Music MP3 Downloader',
    subheading: 'Download viral TikTok audio tracks, background songs, and sound effects in 320kbps MP3 format.',
    whyTitle: 'Why Extract TikTok Audio with SnapLoad?',
    faqTitle: 'TikTok MP3 FAQ',
    steps: [
      { number: '01', title: 'Copy TikTok Link', desc: 'Copy the link of the TikTok video containing the audio track.' },
      { number: '02', title: 'Paste in SnapLoad', desc: 'Paste the link above and click Fetch Video.' },
      { number: '03', title: 'Download MP3', desc: 'Select the 320kbps MP3 option to save the sound file.' },
    ],
    features: [
      { title: 'Viral Sound Extractor', desc: 'Isolate original background music from viral videos.', icon: '🎧' },
      { title: '320kbps HD Audio', desc: 'Crystal-clear stereo audio quality for editing.', icon: '🎵' },
      { title: 'Mobile & Desktop', desc: 'Works seamlessly on iPhone, Android, Mac, and Windows.', icon: '📱' },
      { title: 'No Registration', desc: 'No email or account needed to download TikTok sounds.', icon: '⚡' },
    ],
    deepTechnicalBreakdown: {
      title: 'TikTok Audio Parsing Architecture',
      paragraphs: [
        'TikTok hosts original sound files as discrete AAC audio streams on its media servers. SnapLoad resolves the audio URL directly to provide uncompressed 320kbps MP3 downloads.',
      ],
    },
    troubleshooting: {
      title: 'TikTok Sound Troubleshooting',
      items: [
        { title: 'Removed Audio', desc: 'Videos with muted or removed sounds cannot be processed.' },
      ],
    },
    faqs: [
      { question: 'Can I download TikTok sounds as MP3 for free?', answer: 'Yes! SnapLoad allows unlimited free downloads of TikTok sound tracks in 320kbps MP3 format.' },
    ],
  },
  widget: {
    heading: 'Free Online Video Downloader Widget',
    subheading: 'Embed SnapLoad free video downloader on your website or blog with clean backlink integration.',
    whyTitle: 'Why Embed SnapLoad Widget?',
    faqTitle: 'Widget FAQ',
    steps: [
      { number: '01', title: 'Copy Embed Code', desc: 'Copy the lightweight iframe embed code.' },
      { number: '02', title: 'Paste on Website', desc: 'Paste into your HTML or CMS editor.' },
      { number: '03', title: 'Instant Downloads', desc: 'Users can download videos directly.' },
    ],
    features: [
      { title: 'Responsive Design', desc: 'Adapts seamlessly to mobile and desktop layouts.', icon: '📱' },
      { title: 'Secure & Fast', desc: 'SSL encrypted with direct CDN processing.', icon: '🔒' },
      { title: 'Multi-Platform', desc: 'Supports TikTok, Instagram, and Facebook.', icon: '🎬' },
      { title: '100% Free', desc: 'Completely free for all website owners.', icon: '⚡' },
    ],
    deepTechnicalBreakdown: { title: 'Seamless Embed Architecture', paragraphs: ['Lightweight iframe integration with full responsive styling.'] },
    troubleshooting: { title: 'Embed Help', items: [{ title: 'Dimensions', desc: 'Recommended minimum height is 500px.' }] },
    faqs: [{ question: 'Is the widget free to embed?', answer: 'Yes! Free for any website or blog.' }],
  },
};



// Function to resolve complete ContentData for any language (including all 50 global languages)
function getResolvedContentData(platform: PlatformKey, currentLanguage: Language = 'en'): ContentData {
  const customLangDict = LOCALIZED_SEO_DATA[currentLanguage];
  const langAllBlock = customLangDict ? customLangDict.all : null;
  const customBlock = customLangDict ? (customLangDict[platform] || langAllBlock) : null;
  const masterBlock = MASTER_EN_DATA[platform] || MASTER_EN_DATA.all;

  if (!customBlock && !langAllBlock) {
    return masterBlock;
  }

  const active = customBlock || langAllBlock || masterBlock;
  const fallback = langAllBlock || masterBlock;

  return {
    heading: active.heading || fallback.heading || masterBlock.heading,
    subheading: active.subheading || fallback.subheading || masterBlock.subheading,
    whyTitle: active.whyTitle || fallback.whyTitle || masterBlock.whyTitle,
    faqTitle: active.faqTitle || fallback.faqTitle || masterBlock.faqTitle,
    steps: (active.steps && active.steps.length >= 3) ? active.steps : (fallback.steps || masterBlock.steps),
    features: (active.features && active.features.length >= 4) ? active.features : (fallback.features || masterBlock.features),
    deepTechnicalBreakdown: {
      title: active.deepTechnicalBreakdown?.title || fallback.deepTechnicalBreakdown?.title || masterBlock.deepTechnicalBreakdown.title,
      paragraphs: (active.deepTechnicalBreakdown?.paragraphs && active.deepTechnicalBreakdown.paragraphs.length >= 2)
        ? active.deepTechnicalBreakdown.paragraphs
        : (fallback.deepTechnicalBreakdown?.paragraphs || masterBlock.deepTechnicalBreakdown.paragraphs),
    },
    troubleshooting: {
      title: active.troubleshooting?.title || fallback.troubleshooting?.title || masterBlock.troubleshooting.title,
      items: (active.troubleshooting?.items && active.troubleshooting.items.length >= 2)
        ? active.troubleshooting.items
        : (fallback.troubleshooting?.items || masterBlock.troubleshooting.items),
    },
    faqs: (active.faqs && active.faqs.length >= 2) ? active.faqs : (fallback.faqs || masterBlock.faqs),
  };
}

export function SeoContentSection({ platform, currentLanguage = 'en' }: SeoContentProps) {
  const content = getResolvedContentData(platform, currentLanguage);
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

      let scriptTag = document.getElementById('seo-content-schema');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'seo-content-schema';
        scriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schemas);

      return () => {
        const tag = document.getElementById('seo-content-schema');
        if (tag) tag.remove();
      };
    }
  }, [platform, content]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  if (!content) return null;

  return (
    <section className="w-full space-y-12 mt-16 animate-fade-in text-slate-800 dark:text-slate-100 font-sans">
      
      {/* 1. Step-By-Step How To Guide Section */}
      <article className="glass-strong rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full filter blur-3xl pointer-events-none" />
        
        <header className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-wider">
            <span>{HOW_TO_BADGES[currentLanguage] || HOW_TO_BADGES.en}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {content.heading}
          </h2>
          <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {content.subheading}
          </p>
        </header>

        {/* 3 Step Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {content.steps.map((step) => (
            <div
              key={step.number}
              className="glass-subtle rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 flex flex-col justify-between hover:border-primary-500/30 transition-all duration-300 shadow-sm group"
            >
              <div className="space-y-3">
                <span className="text-3xl sm:text-4xl font-black text-primary-500/40 dark:text-primary-400/30 group-hover:text-primary-500 transition-colors">
                  {step.number}
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </article>

      {/* 2. Key Features Grid */}
      <article className="space-y-6">
        <h3 className="text-xl sm:text-2xl font-extrabold text-center text-slate-900 dark:text-white tracking-tight">
          {content.whyTitle}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {content.features.map((feature, idx) => (
            <div
              key={idx}
              className="glass-subtle p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 hover:border-primary-500/30 transition-all space-y-2 shadow-xs"
            >
              <div className="text-2xl mb-1">{feature.icon}</div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                {feature.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </article>

      {/* Inline AdBanner */}
      <AdBanner slot="mid-article-slot" label="Advertisement" className="my-8" />

      {/* 3. Deep Technical Architecture & Troubleshooting Section */}
      {content.deepTechnicalBreakdown && (
        <article className="glass-strong rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-xl space-y-8">
          <header className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
              <span>⚙️</span>
              <span>{content.deepTechnicalBreakdown.title}</span>
            </h3>
          </header>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {content.deepTechnicalBreakdown.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <hr className="border-slate-200/60 dark:border-white/10" />

          {/* Troubleshooting Guidelines */}
          <header className="space-y-1">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
              {content.troubleshooting.title}
            </h3>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
      <article id="faq" className="glass-strong rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-xl scroll-mt-24">
        <header className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
            {content.faqTitle}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {FAQ_SUBTITLES[currentLanguage] || FAQ_SUBTITLES.en}
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
