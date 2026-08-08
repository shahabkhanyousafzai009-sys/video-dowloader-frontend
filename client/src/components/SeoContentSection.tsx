import { useState } from 'react';

type PlatformKey = 'all' | 'tiktok' | 'instagram' | 'mp3';

interface SeoContentProps {
  platform: PlatformKey;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface ContentData {
  heading: string;
  subheading: string;
  steps: { number: string; title: string; desc: string }[];
  features: { title: string; desc: string; icon: string }[];
  faqs: FaqItem[];
}

const SEO_DATA: Record<PlatformKey, ContentData> = {
  all: {
    heading: 'Universal Online Video & Audio Downloader',
    subheading: 'SnapLoad provides the fastest way to save HD videos and MP3 audio from TikTok and Instagram for free.',
    steps: [
      { number: '01', title: 'Copy Video Link', desc: 'Copy the URL of any video or reel from TikTok or Instagram.' },
      { number: '02', title: 'Paste Link Above', desc: 'Paste the copied URL into the SnapLoad input bar and click "Fetch".' },
      { number: '03', title: 'Choose & Download', desc: 'Select your preferred resolution or MP3 audio format to download instantly.' },
    ],
    features: [
      { title: 'No Watermark', desc: 'Download clean TikTok videos without any logo or watermark overlay.', icon: '✨' },
      { title: 'Full HD & 4K', desc: 'Preserve original video crispness up to 1080p HD and 4K ultra quality.', icon: '🎬' },
      { title: '320kbps MP3', desc: 'Extract crisp audio tracks directly to high-bitrate MP3 format.', icon: '🎵' },
      { title: '100% Free & Private', desc: 'No account required, no software installation, and zero user logging.', icon: '🔒' },
    ],
    faqs: [
      {
        question: 'Is SnapLoad free to use?',
        answer: 'Yes! SnapLoad is 100% free with unlimited downloads. No sign-up, subscription, or software installation is required.'
      },
      {
        question: 'How do I download TikTok videos without watermark?',
        answer: 'Simply copy the TikTok video link, paste it into SnapLoad, click Fetch, and choose the "No Watermark HD" option.'
      },
      {
        question: 'Can I convert Instagram Reels or TikTok videos to MP3?',
        answer: 'Yes, SnapLoad allows you to extract audio tracks directly into high-quality 320kbps MP3 audio files.'
      },
      {
        question: 'Is it compatible with iPhone, Android, and Desktop?',
        answer: 'SnapLoad is a web application that works seamlessly on all browsers including iOS Safari, Android Chrome, Mac, Windows, and Linux.'
      }
    ]
  },
  tiktok: {
    heading: 'Free TikTok Downloader Without Watermark HD',
    subheading: 'Save watermark-free TikTok videos, slides, and audio tracks in high definition directly to your device.',
    steps: [
      { number: '01', title: 'Copy TikTok URL', desc: 'Open the TikTok app or website, tap Share, and choose "Copy Link".' },
      { number: '02', title: 'Paste into SnapLoad', desc: 'Paste the TikTok link into the box above and hit "Fetch".' },
      { number: '03', title: 'Download Clean MP4', desc: 'Choose "Without Watermark" to save your watermark-free video instantly.' },
    ],
    features: [
      { title: 'Watermark-Free HD', desc: 'Removes the bouncing TikTok logo and username overlay cleanly.', icon: '🚫' },
      { title: 'Fast Processing', desc: 'Fetches media links in less than 2 seconds with zero queue time.', icon: '⚡' },
      { title: 'TikTok Sound Saver', desc: 'Extract original TikTok trending sounds directly into MP3 files.', icon: '🎧' },
      { title: 'Works on iOS & Android', desc: 'Save videos directly to your camera roll or downloads folder.', icon: '📱' },
    ],
    faqs: [
      {
        question: 'Why download TikTok videos without watermark?',
        answer: 'Downloading without watermark gives you a clean video for personal archiving or sharing without visual distractions.'
      },
      {
        question: 'Where are downloaded TikTok videos saved on my phone?',
        answer: 'On Android, files are saved in your Downloads folder. On iPhone/iPad (iOS Safari), files save to the Files app and can be saved directly to Photos.'
      },
      {
        question: 'Do I need a TikTok account to download videos?',
        answer: 'No, you do not need a TikTok account or app. You only need the video URL.'
      }
    ]
  },
  instagram: {
    heading: 'Instagram Reels & Video Downloader 1080p HD',
    subheading: 'Download Instagram Reels, IGTV clips, and video posts in original original high definition.',
    steps: [
      { number: '01', title: 'Copy Instagram Link', desc: 'Tap the three dots on any Instagram Reel or Video and tap "Copy link".' },
      { number: '02', title: 'Paste on SnapLoad', desc: 'Paste the Instagram link into our converter tool above.' },
      { number: '03', title: 'Save Original MP4', desc: 'Click Download to save the highest resolution 1080p MP4 file.' },
    ],
    features: [
      { title: '1080p Full HD', desc: 'Retains maximum original resolution and audio clarity.', icon: '🌟' },
      { title: 'Reels & IGTV', desc: 'Supports Instagram Reels, main feed posts, and IGTV videos.', icon: '📸' },
      { title: 'No App Required', desc: 'Works directly in Safari, Chrome, Edge, and Firefox browsers.', icon: '🌐' },
      { title: 'Safe & Secure', desc: 'We do not store your downloads or track your personal viewing history.', icon: '🛡️' },
    ],
    faqs: [
      {
        question: 'How to download Instagram Reels on mobile?',
        answer: 'Copy the Reel link from the Instagram app, paste it into SnapLoad on Safari/Chrome, tap Fetch, and press Download.'
      },
      {
        question: 'Can I download private Instagram posts?',
        answer: 'SnapLoad only supports public Instagram posts, Reels, and IGTV videos to respect user privacy.'
      },
      {
        question: 'Is there a limit on how many Instagram videos I can save?',
        answer: 'No, there are no limits. You can download as many Instagram Reels as you want for free.'
      }
    ]
  },
  mp3: {
    heading: 'Online Video to MP3 Audio Converter (320kbps)',
    subheading: 'Extract crisp MP3 audio tracks from TikTok, Instagram, and YouTube video links instantly.',
    steps: [
      { number: '01', title: 'Copy Video Link', desc: 'Copy any TikTok, Instagram, or YouTube video link.' },
      { number: '02', title: 'Paste into Converter', desc: 'Paste the video URL into SnapLoad and select MP3 format.' },
      { number: '03', title: 'Download Audio', desc: 'Click Download to receive your high-quality 320kbps MP3 track.' },
    ],
    features: [
      { title: 'High Bitrate 320kbps', desc: 'Extracts clear, uncompressed audio quality for music & podcasts.', icon: '🎵' },
      { title: 'Fast Conversion', desc: 'Processes audio extraction in seconds directly in your browser.', icon: '⚡' },
      { title: 'Multi-Platform', desc: 'Supports TikTok sounds, Instagram audio reels, and YouTube videos.', icon: '🌐' },
      { title: 'Mobile Friendly', desc: 'Listen offline on your phone or sync to your favorite music player.', icon: '📱' },
    ],
    faqs: [
      {
        question: 'What is the quality of extracted MP3 files?',
        answer: 'SnapLoad extracts audio at up to 320kbps (the highest standard MP3 quality available).'
      },
      {
        question: 'Can I convert TikTok background music to MP3?',
        answer: 'Yes! SnapLoad isolates the background audio track from any TikTok video and converts it into a standalone MP3 file.'
      }
    ]
  }
};

export function SeoContentSection({ platform }: SeoContentProps) {
  const content = SEO_DATA[platform] || SEO_DATA.all;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-4xl mx-auto mt-16 space-y-16 animate-fade-in text-left">
      {/* Step-by-Step Guide */}
      <div className="glass-strong rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
            {content.heading}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
            {content.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.steps.map((step, idx) => (
            <div
              key={idx}
              className="relative p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-gray-100 dark:border-white/5 shadow-sm hover:border-primary-500/30 transition-all"
            >
              <span className="inline-block text-3xl font-black text-primary-500/40 mb-2">
                {step.number}
              </span>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
          Why Choose SnapLoad?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {content.features.map((feat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl glass-subtle border border-white/10 hover:border-primary-500/40 transition-all flex flex-col items-start"
            >
              <span className="text-3xl mb-3">{feat.icon}</span>
              <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-1">
                {feat.title}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Accordion FAQ Section */}
      <div className="glass-strong rounded-3xl p-6 sm:p-10 border border-white/10">
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Frequently Asked Questions
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Got questions about downloading videos or converting audio? We have answers.
          </p>
        </div>

        <div className="space-y-4">
          {content.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-gray-200/50 dark:border-white/10 overflow-hidden transition-all bg-white/30 dark:bg-white/5"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-semibold text-gray-900 dark:text-white text-sm sm:text-base hover:bg-white/10 transition-all"
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 text-primary-400 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 animate-fade-in border-t border-gray-100 dark:border-white/5 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
