import React, { useState, useEffect } from 'react';

interface FaqItem {
  id: string;
  category: 'tiktok' | 'instagram' | 'mp3' | 'device' | 'legal';
  categoryLabel: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'tiktok',
    categoryLabel: 'TikTok Downloader',
    question: 'Do I have to pay to use TikTok download without watermark?',
    answer: 'No, our TikTok Downloader is 100% free to use with unlimited downloads. You do not need to pay any subscription fees, enter credit card details, or purchase paid software licenses.',
  },
  {
    id: 'faq-2',
    category: 'tiktok',
    categoryLabel: 'TikTok Downloader',
    question: 'Do I need to install an extension to use the TikTok Downloader?',
    answer: 'No extension or software installation is required. You can use our TikTok Downloader directly inside any standard web browser on iPhone, Android, Windows, or Mac simply by copying and pasting the TikTok video link.',
  },
  {
    id: 'faq-3',
    category: 'device',
    categoryLabel: 'iPhone & Android',
    question: 'Where are TikTok videos saved after downloading?',
    answer: 'Downloaded TikTok videos are automatically saved to your device’s default Downloads folder. On Android, Windows PC, and Mac, you can find them in your Downloads folder or Gallery app. On iPhone/iPad, Safari saves files to the Files app under Downloads, where you can tap "Save Video" to transfer them to your Camera Roll.',
  },
  {
    id: 'faq-4',
    category: 'tiktok',
    categoryLabel: 'TikTok Downloader',
    question: 'Do I need to have a TT account to download TikTok videos?',
    answer: 'No, you do not need a TikTok account or to be logged in to save videos. As long as you have the share link to a public TikTok clip, you can paste it and download the file immediately.',
  },
  {
    id: 'faq-5',
    category: 'legal',
    categoryLabel: 'Privacy & Legal',
    question: 'Can the HD TikTok Downloader save videos from private accounts?',
    answer: 'No, to respect user privacy and copyright standards, our downloader can only process public TikTok videos. Videos hosted on private accounts or clips restricted by creator privacy settings cannot be retrieved.',
  },
  {
    id: 'faq-6',
    category: 'tiktok',
    categoryLabel: 'TikTok Downloader',
    question: 'How do I get a link for TikTok videos?',
    answer: 'Open the TikTok app or website, navigate to the video you want to keep, tap the "Share" arrow icon on your screen, and select "Copy Link". The URL will be saved to your clipboard ready to paste into our search box.',
  },
  {
    id: 'faq-7',
    category: 'device',
    categoryLabel: 'iPhone & Android',
    question: 'How to save from TikTok video in MP4 on iPhone (iOS)?',
    answer: 'Copy the TikTok video link, open Safari on your iPhone, visit our TikTok Downloader, paste the URL, and tap "Download". After Safari processes the download prompt, open your Safari Downloads, tap the Share icon, and select "Save Video" to store it directly in your Camera Roll.',
  },
  {
    id: 'faq-8',
    category: 'device',
    categoryLabel: 'iPhone & Android',
    question: 'Can I use your TikTok downloader without watermark on my Android phone?',
    answer: 'Yes! Our downloader works seamlessly across all Android smartphones and tablets using Chrome, Edge, Firefox, or any mobile browser. Simply paste the TikTok link and select "Without Watermark" to save clean HD MP4 files directly to your device gallery.',
  },
  {
    id: 'faq-9',
    category: 'tiktok',
    categoryLabel: 'TikTok Downloader',
    question: 'How to download TikTok video without watermark in HD?',
    answer: 'Copy your desired TikTok link, paste it into our search bar, click "Fetch Video", and select the "No Watermark HD 1080p" format option. Our engine extracts the clean raw stream directly from origin server CDNs.',
  },
  {
    id: 'faq-10',
    category: 'tiktok',
    categoryLabel: 'TikTok Downloader',
    question: 'Is TikTok Download Available in MP4 Format?',
    answer: 'Yes, all exported TikTok clips are provided in universal, high-definition MP4 format, ensuring crisp 1080p video playback across all mobile devices, desktop computers, and video editing software.',
  },
  {
    id: 'faq-11',
    category: 'tiktok',
    categoryLabel: 'TikTok Downloader',
    question: 'How can I convert TikTok to MP4 using a tiktok downloader app?',
    answer: 'You do not need to install a separate application! Simply copy the TikTok link, open our web-based downloader in any browser, paste the link, and click download. Our cloud parser automatically processes the clean MP4 file in seconds.',
  },
  {
    id: 'faq-12',
    category: 'instagram',
    categoryLabel: 'Instagram Reels',
    question: 'How do I download Instagram Reels and Carousel photos in 1080p?',
    answer: 'Copy the Instagram Reel or post link from the Instagram app, paste it into SnapLoad, and click Fetch. You can save 1080p video files or individual high-resolution carousel images directly to your gallery.',
  },
  {
    id: 'faq-13',
    category: 'mp3',
    categoryLabel: 'MP3 Conversion',
    question: 'What audio quality do I get when converting videos to MP3?',
    answer: 'SnapLoad converts video audio tracks into high-bitrate 320kbps MP3 files (44.1kHz sampling rate), offering studio-fidelity clarity for music tracks, voiceovers, and ringtones.',
  },
  {
    id: 'faq-14',
    category: 'legal',
    categoryLabel: 'Privacy & Legal',
    question: 'Is it legal to download videos for offline personal viewing?',
    answer: 'Downloading videos for personal offline viewing, research, or fair-use educational analysis is legal in most jurisdictions. However, re-uploading or monetizing copyrighted content without creator permission violates platform terms.',
  },
];

interface FaqPageProps {
  onNavigateHome: () => void;
  onNavigateContact?: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigateHome, onNavigateContact }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Frequently Asked Questions (FAQ) — SnapLoad Video Downloader';

    // Inject FAQPage JSON-LD Schema
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://snaploaddownload.com/faq#faqpage',
      'mainEntity': FAQ_DATA.map((faq) => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer,
        },
      })),
    };

    let scriptTag = document.getElementById('faqpage-jsonld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'faqpage-jsonld';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(faqSchema);

    return () => {
      if (scriptTag) scriptTag.remove();
    };
  }, []);

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'tiktok', label: 'TikTok Downloader' },
    { id: 'instagram', label: 'Instagram Reels' },
    { id: 'mp3', label: 'MP3 Conversion' },
    { id: 'device', label: 'iPhone & Android' },
    { id: 'legal', label: 'Privacy & Legal' },
  ];

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-fade-in space-y-10 text-left">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold dark:text-white/50 text-slate-500">
        <button onClick={onNavigateHome} className="hover:text-primary-400 transition-colors cursor-pointer">
          Home
        </button>
        <span>/</span>
        <span className="dark:text-white text-slate-900 font-bold">Frequently Asked Questions</span>
      </nav>

      {/* Hero Header */}
      <header className="glass-strong rounded-3xl p-8 sm:p-12 border border-slate-200/80 dark:border-white/10 shadow-2xl text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-400 text-xs font-extrabold">
          <span>❓ Help Center &amp; Support</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Frequently Asked Questions
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
          Find fast, reliable answers to common questions about downloading TikTok videos without watermark, saving 1080p Instagram Reels, 320kbps MP3 conversion, and device compatibility.
        </p>

        {/* Real-time Search Field */}
        <div className="pt-4 max-w-xl mx-auto relative">
          <div className="relative flex items-center">
            <svg
              className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" strokeWidth="2.5" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. watermark, iPhone, MP3, private account)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-white/10 border border-slate-200 dark:border-white/15 outline-none text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/40 focus:ring-2 focus:ring-primary-500/40 shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white font-bold cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                isActive
                  ? 'bg-gradient-to-r from-primary-500 to-indigo-600 text-white border-transparent shadow-md'
                  : 'glass-subtle dark:text-white/70 text-slate-700 border-slate-200 dark:border-white/10 hover:border-primary-500/40 hover:bg-slate-100 dark:hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Accordion FAQ List */}
      <main className="glass-strong rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-xl space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <p className="text-3xl">🔍</p>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              No matching questions found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Try searching with different keywords or switch the category filter above.
            </p>
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <article
                key={faq.id}
                className="rounded-2xl border border-slate-200/80 dark:border-white/10 overflow-hidden transition-all bg-white/40 dark:bg-white/5"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-extrabold text-slate-900 dark:text-white text-sm sm:text-base hover:bg-slate-100/60 dark:hover:bg-white/10 transition-all cursor-pointer gap-4"
                >
                  <span className="flex-1">{faq.question}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20">
                      {faq.categoryLabel}
                    </span>
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
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 animate-fade-in border-t border-slate-200/60 dark:border-white/5 pt-4 leading-relaxed font-medium space-y-3">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </article>
            );
          })
        )}
      </main>

      {/* Still Have Questions CTA */}
      <footer className="glass-subtle rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 shadow-lg text-center space-y-4">
        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
          Still Have Questions or Feedback?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
          If you didn't find the answer you were looking for, reach out to our technical support team or start converting videos right away.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {onNavigateContact && (
            <button
              onClick={onNavigateContact}
              className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-xs sm:text-sm font-extrabold transition-colors text-slate-900 dark:text-white cursor-pointer"
            >
              Contact Support &rarr;
            </button>
          )}
          <button
            onClick={onNavigateHome}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-indigo-600 text-white text-xs sm:text-sm font-extrabold shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            Use Video Downloader &rarr;
          </button>
        </div>
      </footer>

    </div>
  );
};
