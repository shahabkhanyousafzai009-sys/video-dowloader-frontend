export interface GuideStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface GuideFaq {
  question: string;
  answer: string;
}

export interface GuideArticle {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  platform: 'tiktok' | 'instagram' | 'mp3';
  readTime: string;
  updatedDate: string;
  targetKeyword: string;
  heroHeading: string;
  heroHighlight: string;
  steps: GuideStep[];
  faqs: GuideFaq[];
}

export const GUIDES_DATA: Record<string, GuideArticle> = {
  'how-to-download-tiktok-without-watermark': {
    slug: 'how-to-download-tiktok-without-watermark',
    title: 'How to Download TikTok Videos Without Watermark (iPhone, Android & PC)',
    subtitle: 'A complete step-by-step guide to saving clean, watermark-free TikTok videos in full 1080p HD quality.',
    description: 'Learn the easiest free way to save HD TikTok videos without watermark on iOS Safari, Android Chrome, Mac, or Windows PC using SnapLoad.',
    platform: 'tiktok',
    readTime: '3 min read',
    updatedDate: 'August 11, 2026',
    targetKeyword: 'how to download tiktok video without watermark',
    heroHeading: 'How to Download TikTok',
    heroHighlight: 'Without Watermark',
    steps: [
      {
        stepNumber: 1,
        title: 'Copy the TikTok Video Link',
        description: 'Open the TikTok app or website. Find the video you want to download, tap the "Share" button, and select "Copy Link".',
      },
      {
        stepNumber: 2,
        title: 'Paste Link into SnapLoad',
        description: 'Open your web browser and go to SnapLoad. Paste the copied TikTok URL into the search box at the top of the page.',
      },
      {
        stepNumber: 3,
        title: 'Download HD Video Without Watermark',
        description: 'Click the "Fetch Video" button. Choose your preferred quality (e.g. 1080p No Watermark) and click Download to save the video directly to your device.',
      },
    ],
    faqs: [
      {
        question: 'Is it free to download TikTok videos without watermark on SnapLoad?',
        answer: 'Yes! SnapLoad is 100% free to use with no hidden fees, subscriptions, or account creation required.',
      },
      {
        question: 'Does this work on iPhone Safari and Android Chrome?',
        answer: 'Absolutely. SnapLoad runs entirely in your web browser and works seamlessly on iOS (iPhone/iPad), Android, Mac, and Windows PC.',
      },
      {
        question: 'Can I extract MP3 audio from TikTok videos as well?',
        answer: 'Yes, SnapLoad provides both MP4 video downloads without watermark and high-bitrate MP3 audio extraction for any TikTok link.',
      },
    ],
  },
  'how-to-save-instagram-reels-hd': {
    slug: 'how-to-save-instagram-reels-hd',
    title: 'How to Save Instagram Reels & Videos in 1080p HD Quality',
    subtitle: 'Save your favorite Instagram Reels, video posts, and IGTV clips directly to your phone or computer.',
    description: 'Step-by-step tutorial on how to download Instagram Reels, clips, and video posts in original high definition quality without quality loss.',
    platform: 'instagram',
    readTime: '3 min read',
    updatedDate: 'August 11, 2026',
    targetKeyword: 'how to save instagram reels',
    heroHeading: 'How to Save Instagram Reels',
    heroHighlight: 'in 1080p HD',
    steps: [
      {
        stepNumber: 1,
        title: 'Copy the Instagram Reel Link',
        description: 'In the Instagram app or website, navigate to the Reel or video you wish to download. Tap the three dots (...) or Share icon and select "Copy Link".',
      },
      {
        stepNumber: 2,
        title: 'Paste URL into SnapLoad Instagram Saver',
        description: 'Head to SnapLoad and paste the Instagram Reel link into the input field.',
      },
      {
        stepNumber: 3,
        title: 'Save HD Video to Camera Roll',
        description: 'Click "Fetch Video". Once processed, choose 1080p HD quality and click Download to save the Reel directly to your camera roll or downloads folder.',
      },
    ],
    faqs: [
      {
        question: 'How do I save Instagram Reels directly to my iPhone Camera Roll?',
        answer: 'On iOS Safari, tap Download on SnapLoad. Once downloaded, tap the Downloads manager in Safari address bar, select the video, and tap "Save Video" to send it to your Photos app.',
      },
      {
        question: 'Do I need an Instagram account to download Reels?',
        answer: 'No registration or Instagram login is needed. As long as the Instagram Reel or video post is public, you can download it instantly.',
      },
    ],
  },
  'how-to-convert-video-to-mp3': {
    slug: 'how-to-convert-video-to-mp3',
    title: 'How to Convert TikTok & Instagram Video Links to 320kbps MP3 Audio',
    subtitle: 'Extract crystal clear audio tracks from any social video link in seconds.',
    description: 'Extract high-bitrate MP3 audio tracks directly from TikTok videos or Instagram Reels for free with no app installation.',
    platform: 'mp3',
    readTime: '2 min read',
    updatedDate: 'August 11, 2026',
    targetKeyword: 'how to convert video to mp3',
    heroHeading: 'How to Convert Video Links',
    heroHighlight: 'to 320kbps MP3',
    steps: [
      {
        stepNumber: 1,
        title: 'Copy the Video Link',
        description: 'Copy the video link from TikTok or Instagram that contains the sound or audio track you want to extract.',
      },
      {
        stepNumber: 2,
        title: 'Paste into SnapLoad MP3 Converter',
        description: 'Paste the link into SnapLoad and select the MP3 Audio option from the available quality options.',
      },
      {
        stepNumber: 3,
        title: 'Download High-Bitrate MP3',
        description: 'Click Download MP3. The server will extract and convert the video audio into a high-quality 320kbps MP3 audio file.',
      },
    ],
    faqs: [
      {
        question: 'What audio format does SnapLoad extract?',
        answer: 'SnapLoad converts video sound tracks into high-standard MP3 format (up to 320kbps) compatible with all music players.',
      },
      {
        question: 'Is there a limit on how many MP3 files I can convert?',
        answer: 'There are no limits. You can convert and download as many video links to MP3 as you like for free.',
      },
    ],
  },
};
