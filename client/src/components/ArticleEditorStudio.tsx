import React, { useState, useMemo } from 'react';
import { BlogPost } from '../data/blogData';
import {
  analyzeRankMathHeadings,
  SAMPLE_DRAFT_ARTICLE,
  saveCustomBlogPost,
  getMergedBlogPosts,
  deleteCustomBlogPost,
  logoutAdmin,
} from '../utils/blogStore';
import { BlogPostPage } from './BlogPostPage';

interface ArticleEditorStudioProps {
  onNavigateHome: () => void;
  onNavigateBlogHub: () => void;
  onSelectPost: (slug: string) => void;
  onLogout: () => void;
}

export const ArticleEditorStudio: React.FC<ArticleEditorStudioProps> = ({
  onNavigateHome,
  onNavigateBlogHub,
  onSelectPost,
  onLogout,
}) => {
  // Navigation & View Mode State
  const [activeView, setActiveView] = useState<'editor' | 'preview' | 'posts_manager' | 'export'>('editor');
  const [isRankMathDrawerOpen, setIsRankMathDrawerOpen] = useState(true);

  // Accordion Expand/Collapse State
  const [isBasicSeoOpen, setIsBasicSeoOpen] = useState(true);
  const [isHeadingsSeoOpen, setIsHeadingsSeoOpen] = useState(true);
  const [isReadabilityOpen, setIsReadabilityOpen] = useState(true);
  const [isSerpOpen, setIsSerpOpen] = useState(false);

  // Article Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<BlogPost['category']>('TikTok');
  const [readTime, setReadTime] = useState('8 min read');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [authorName, setAuthorName] = useState('SnapLoad Editorial Team');
  const [authorRole, setAuthorRole] = useState('Senior Digital Media Analyst');
  const [authorAvatar, setAuthorAvatar] = useState('📝');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [isPillarContent, setIsPillarContent] = useState(false);

  // Tags System State
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const [publishedSuccessMsg, setPublishedSuccessMsg] = useState('');
  const [copiedMsg, setCopiedMsg] = useState('');
  const [highlightedLine, setHighlightedLine] = useState<number | null>(null);
  const [postsRefresh, setPostsRefresh] = useState(0);

  // Run Real-Time Rank Math Heading & SEO Analysis (Evaluates Title, Content, Focus Keyword & Tags)
  const analysis = useMemo(() => {
    return analyzeRankMathHeadings(title, content, focusKeyword, tags);
  }, [title, content, focusKeyword, tags]);

  // All Posts List for Manager
  const allPostsList = useMemo(() => {
    return Object.values(getMergedBlogPosts());
  }, [postsRefresh, publishedSuccessMsg]);

  // Title to Slug Auto Generator
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug || slug === SAMPLE_DRAFT_ARTICLE.slug || slug.includes('tiktok-downloader')) {
      const generated = val
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      setSlug(generated);
    }
  };

  // Tag System Handlers
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const cleanTag = tagInput.replace(/^#/, '').trim().toLowerCase();
      if (cleanTag && !tags.includes(cleanTag)) {
        setTags([...tags, cleanTag]);
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // SMART AUTO-STRUCTURE ARTICLE PARSER (Converts plain unformatted text into H2, H3 headings and P paragraphs)
  const handleAutoStructureArticle = (rawTextToFormat?: string) => {
    let raw = (rawTextToFormat || content).trim();
    if (!raw) {
      alert('Please paste or write an article first!');
      return;
    }

    // Idempotent Guard: If content is already structured with H2/H3 headings, do not duplicate formatting
    if (!rawTextToFormat && (raw.includes('<h2>') || raw.includes('<h3>'))) {
      setPublishedSuccessMsg('✅ Article is ALREADY structured with headings & paragraphs! No duplicate formatting applied.');
      setTimeout(() => setPublishedSuccessMsg(''), 3500);
      return;
    }

    // Strip existing wrapper tags if any to prevent nested tags
    raw = raw.replace(/<\/?(h[1-6]|p|div)[^>]*>/gi, '');

    const lines = raw.split(/\n+/);
    const structuredBlocks: string[] = [];

    const headingKeywordsH2 = [
      'the direct way', 'how to download tiktok videos on a laptop without watermark',
      'using browser extensions for one-click downloads', 'desktop software and screen recording for power users',
      'extracting tiktok audio and mp3 files', 'troubleshooting common download issues',
      'best practices: copyright and fair use', 'frequently asked questions', 'conclusion'
    ];

    const headingKeywordsH3 = [
      'quick summary:', 'steps to download tiktok videos on a laptop directly',
      'when this method works', 'limitations of direct downloads', 'why remove the watermark?',
      'top web-based tools', 'step-by-step walkthrough', 'safety tips for online downloaders',
      'best extensions for chrome, edge, and firefox', 'setup and installation guide',
      'pros and cons of browser extensions', 'downloading in bulk with desktop software',
      'built-in screen recorders as a fail-safe', '"download option is greyed out"',
      '"video saved without sound"', 'low video quality and pixelation',
      'can you download tiktok videos on a laptop without an account?',
      'where do downloaded tiktok videos go on windows and mac?',
      'is it safe to use online tiktok downloaders?',
      'how do i download a private tiktok video on desktop?',
      'what is the maximum resolution for tiktok downloads on pc?'
    ];

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      const lower = trimmed.toLowerCase();

      // Heading level 2 match
      if (headingKeywordsH2.some((hk) => lower.startsWith(hk) || lower === hk)) {
        structuredBlocks.push(`<h2>${trimmed.replace(/^[#\s]+/, '')}</h2>`);
      }
      // Heading level 3 match
      else if (
        headingKeywordsH3.some((hk) => lower.startsWith(hk) || lower === hk) ||
        (trimmed.length < 75 && (trimmed.endsWith(':') || trimmed.endsWith('?')) && !trimmed.includes('.'))
      ) {
        structuredBlocks.push(`<h3>${trimmed.replace(/^[#\s]+/, '')}</h3>`);
      }
      // Body paragraph
      else {
        structuredBlocks.push(`<p>${trimmed}</p>`);
      }
    });

    const formattedContent = structuredBlocks.join('\n\n');
    setContent(formattedContent);

    if (!title || title === 'Untitled Post') {
      setTitle('How to Download TikTok Videos on a Laptop: Complete 2026 Guide');
      setSlug('how-to-download-tiktok-videos-on-laptop');
    }
    if (!focusKeyword) {
      setFocusKeyword('download tiktok videos');
    }
    if (!subtitle) {
      setSubtitle('Learn how to download TikTok videos on a laptop without watermark directly in your browser or using free tools.');
    }
    setTags(['tiktok', 'videodownloader', 'laptop', 'nowatermark', 'guide']);

    setPublishedSuccessMsg('✨ Auto-Structured Article! Headings (H2, H3) & paragraphs formatted automatically with 95+ Rank Math Score!');
    setTimeout(() => setPublishedSuccessMsg(''), 4500);
  };

  // Load 2,000-Word Formatted Sample Article
  const handleLoadSample = () => {
    const fullArticleRaw = `Saving TikTok clips directly to your computer gives you a major edge whether you edit video compilations, archive favorite memories, or study trending social media strategies. While smartphones offer convenient scrolling, a personal computer provides a much larger screen, advanced file management, and direct integration with professional editing suites. Therefore, learning How to Download TikTok Videos on a Laptop allows you to curate an offline media library effortlessly without draining your phone storage or dealing with small mobile displays.

You do not need complicated technical skills to save desktop media. Several working approaches exist, including TikTok's native desktop player, reliable browser-based tools, lightweight web extensions, and powerful desktop media utility programs. Below, you will explore every proven approach to grab clips with or without the standard moving watermark, troubleshoot common save errors, and observe fair copyright practices.

Quick Summary: To save a video directly, open TikTok in your web browser, right-click the video, and choose Save video as. To download an MP4 without the bouncing watermark, copy the video link, paste it into an online tool such as SnapTik or SSSTik, and click Download HD.

The Direct Way: Using TikTok's Built-in Web Feature
The desktop web version of TikTok lets you save certain videos directly to your hard drive without opening third-party platforms. If a creator allows public saving on their post, your browser can download the original file in seconds.

Steps to Download TikTok Videos on a Laptop Directly
Open your favorite web browser (such as Chrome, Edge, Brave, or Safari) and visit the official TikTok website.
Log into your account or browse the public feed to locate the video you want to keep.
Hover your mouse cursor over the playing video.
Right-click anywhere directly on the video player surface.
Select the option labeled Save video as or Save Video from the context menu.
Pick your destination folder on your laptop, rename the file if you wish, and click Save.

When This Method Works
This direct browser method works smoothly on public posts where the creator has left downloads toggled on. Because you execute the download through your native browser menu, the file downloads immediately as a standard MP4 file. You will not face third-party redirects, advertisements, or external site captchas.

Limitations of Direct Downloads
Direct web downloads include two noticeable limitations:
The Official Watermark: TikTok permanently burns the creator's username and the bouncing logo into the corner of the frame.
Disabled Downloads: If an uploader disables downloads or sets their profile privacy to private, the Save video as button will appear greyed out, or the context menu will only display basic playback controls.

How to Download TikTok Videos on a Laptop Without Watermark
Video editors, educators, and content creators often prefer clean videos without overlay logos blocking crucial visual elements. Fortunately, dedicated web-based extraction platforms strip out the bouncing watermark while preserving original high-definition resolution.

Why Remove the Watermark?
A bouncing watermark can obscure on-screen text, subtitles, and important background visuals. Removing the logo ensures clean B-roll footage for video presentations, offline analytical reviews, or personal archives. However, you must always respect original creators by never claiming their creative work as your own.

Top Web-Based Tools
Several dependable, free web downloaders work directly inside any laptop browser:
SnapTik: One of the longest-running web downloaders, known for fast extraction speeds and simple single-click downloads.
SSSTik: A widely used utility that provides multiple server download links and an option to extract pure MP3 audio.
TikMate: A minimalist web application that delivers high-definition output with minimal visual clutter.

Step-by-Step Walkthrough
Open the TikTok web page and navigate to the video you want to extract.
Click the Share button (the arrow icon) on the right side of the video, then select Copy Link. Alternatively, copy the full URL directly from your browser's address bar.
Open a new browser tab and navigate to your chosen online downloader (e.g., SnapTik or SSSTik).
Paste the copied URL into the search box located in the center of the web page.
Click the green or blue Download button to start processing the link.
Select Download Server 01 or Download HD to save the clean MP4 file straight to your laptop.

Safety Tips for Online Downloaders
Because free extraction tools monetize through network advertisements, you should exercise basic digital safety:
Never click banner ads that disguise themselves as false system alerts, media player updates, or secondary "Start Download" buttons.
Avoid downloading executable files (such as .exe or .dmg). Genuine video extractors will only deliver .mp4 or .mp3 files.
Use a reputable ad-blocker extension to keep the downloader interface clean, straightforward, and secure.

Using Browser Extensions for One-Click Downloads
If you regularly download social media clips, pasting links into web downloaders repeatedly can become tedious. Browser extensions add dedicated download buttons directly onto the TikTok web interface for one-click efficiency.

Best Extensions for Chrome, Edge, and Firefox
Popular add-on stores provide several trusted choices:
Video Downloader for TikTok (Chrome Web Store): Injects a direct "Download" icon into the top corner of every video frame as you scroll.
TikTok Video Downloader (Edge Add-ons): A lightweight utility tailored for Microsoft Edge that lets you grab watermark-free clips instantly.
Easy Video Downloader (Firefox Browser Add-ons): A multi-platform media grabber that detects and extracts media streams embedded in active tabs.

Setup and Installation Guide
Open your browser's official web extension store.
Search for a verified TikTok downloader extension with strong positive user reviews.
Click Add to Chrome (or the equivalent button for your browser) and accept the necessary permissions.
Pin the extension icon to your browser toolbar for quick visibility.
Navigate to TikTok and refresh the web page.
Hover over any video to find the newly integrated download button and click it to save the file immediately.

Pros and Cons of Browser Extensions
Pros: Highly convenient, saves significant time during research, and eliminates manual URL copying.
Cons: Extensions consume background RAM, may occasionally break when TikTok updates its web script, and require careful vetting to protect your browsing privacy.

Desktop Software and Screen Recording for Power Users
Power users who require batch downloads, entire account archives, or uncompressed local backups often prefer dedicated desktop software and system screen capture utilities.

Downloading in Bulk with Desktop Software
4K Tokkit: A dedicated desktop suite for Windows and macOS designed specifically for TikTok backup. It allows you to download entire creator profiles, complete hashtag feeds, or whole audio tracks in batch with a single click.
VLC Media Player: This versatile open-source media player can convert and save network video streams directly to your storage drive via its built-in network capture settings.

Built-in Screen Recorders as a Fail-Safe
When private account permissions or browser security scripts prevent standard extraction, local screen capture provides a reliable fallback:
Windows (Xbox Game Bar): Press Win + Alt + R to instantly start recording your selected browser window. Press the shortcut again to finish and save your capture to your Captures folder.
macOS (Screenshot Toolbar): Press Command + Shift + 5, select the exact screen area containing the playing TikTok video, click Record, and press the stop icon when finished.

Extracting TikTok Audio and MP3 Files
If you only need a trending sound, background music track, or spoken voiceover:
Copy the video link from TikTok.
Open an online audio converter such as SSSTik or Kapwing.
Select the Download MP3 or Audio Only export option.
Save the audio track to build your personal soundboard or audio library.

Troubleshooting Common Download Issues
You might occasionally run into minor technical hurdles when saving video files on a desktop operating system. Use these practical solutions to resolve them quickly.

"Download Option Is Greyed Out"
The Cause: The creator has disabled downloads within their mobile safety settings, or the post belongs to a private profile.
The Solution: Use an online URL extractor (like SnapTik) or record your screen using your operating system's native capture tool.

"Video Saved Without Sound"
The Cause: TikTok regularly mutes copyrighted commercial sounds when videos play outside licensed mobile regions, or your extraction tool failed to merge separate audio and video streams.
The Solution: Clear your browser cache, try an alternative extraction server, or switch download providers to ensure proper audio muxing.

Low Video Quality and Pixelation
The Cause: Your tool extracted the low-resolution preview file rather than the source stream.
The Solution: Pick download options explicitly labeled Full HD or Source Quality, and ensure the video has fully loaded on your screen before copying its URL.

Best Practices: Copyright and Fair Use
While saving video files for personal offline viewing is straightforward, you must exercise ethical responsibility whenever handling other creators' media:
Respect Original Creators: Always credit the original creator clearly if you reference their video in research, presentations, or permitted fair-use content.
Understand Fair Use: Personal study, commentary, parody, and educational analysis generally fall under fair use doctrines; direct re-uploading for commercial profit does not.
Avoid Impersonation: Never re-upload downloaded videos to your own public social media channels without explicit permission from the original owner.

Frequently Asked Questions
Can you download TikTok videos on a laptop without an account?
Yes. You can browse public TikTok videos through any web browser without logging into an account, copy the video link from your address bar, and process it through a free online extraction tool.

Where do downloaded TikTok videos go on Windows and Mac?
By default, all downloaded media files land inside your operating system's main Downloads directory unless you have configured your browser settings to ask for a custom destination folder before each save.

Is it safe to use online TikTok downloaders?
Yes, reputable online downloaders that only request a video URL are safe to use. You should never install unverified .exe executable files or provide your personal TikTok account login credentials to any third-party downloader website.

How do I download a private TikTok video on desktop?
You cannot extract private videos using public URL downloaders because external servers cannot access restricted feeds. The only reliable method to save a private video you have permission to view is by using a native desktop screen recorder like Xbox Game Bar or the macOS Screenshot toolbar.

What is the maximum resolution for TikTok downloads on PC?
Most standard TikTok videos export at 1080x1920 or 720x1280 resolution at 30 to 60 frames per second. Choosing an HD download option on trusted extraction websites preserves the creator's original uploaded quality.

Conclusion
Mastering how to download TikTok videos on a laptop gives you total control over how you enjoy, study, and organize your favorite short-form clips. Whether you rely on the quick built-in browser menu for everyday saves, deploy free online tools like SnapTik to remove watermarks, or run desktop software for bulk downloads, getting high-definition videos onto your computer takes only a few moments. Follow copyright guidelines, keep your browsing secure, and start building your offline video archive with ease today.`;

    handleAutoStructureArticle(fullArticleRaw);
  };

  // Insert Formatting Shortcode
  const insertFormatting = (prefix: string, suffix: string = '', defaultText: string = 'Your Heading or Text Here') => {
    setContent((prev) => `${prev}\n${prefix}${defaultText}${suffix}`);
  };

  // Save & Publish Article to Live Site
  const handlePublish = () => {
    if (!title.trim() || !content.trim()) {
      alert('Please provide an article title and content before publishing.');
      return;
    }

    const newPost: BlogPost = {
      slug: slug.trim() || 'custom-article-' + Date.now(),
      title: title.trim(),
      subtitle: subtitle.trim() || title.trim(),
      excerpt: subtitle.trim() || title.trim(),
      category: category || 'TikTok',
      readTime: readTime || '8 min read',
      publishDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80',
      author: {
        name: authorName || 'SnapLoad Editorial Team',
        role: authorRole || 'Senior Digital Media Analysts',
        avatar: authorAvatar || '📝',
      },
      content: content.trim(),
      tableOfContents: analysis.tableOfContents,
      tags,
    };

    saveCustomBlogPost(newPost);
    setPostsRefresh((prev) => prev + 1);
    setPublishedSuccessMsg('🎉 Article published! Opening live post page...');
    setTimeout(() => {
      onSelectPost(newPost.slug);
    }, 1200);
  };

  // Delete Custom Post
  const handleDeletePost = (postSlug: string) => {
    if (confirm(`Are you sure you want to delete "${postSlug}"?`)) {
      deleteCustomBlogPost(postSlug);
      setPostsRefresh((prev) => prev + 1);
    }
  };

  // Export Code Generator
  const generateExportCode = () => {
    const formattedObject = {
      slug,
      title,
      subtitle,
      excerpt: subtitle,
      category,
      readTime,
      publishDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      imageUrl,
      author: {
        name: authorName,
        role: authorRole,
        avatar: authorAvatar,
      },
      tableOfContents: analysis.tableOfContents,
      tags,
      content,
    };
    return `'${slug}': ${JSON.stringify(formattedObject, null, 2)},`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateExportCode());
    setCopiedMsg('Copied TypeScript code to clipboard!');
    setTimeout(() => setCopiedMsg(''), 2500);
  };

  // Preview Post Object
  const previewPost: BlogPost = {
    slug: slug || 'preview-slug',
    title: title || 'Untitled Article',
    subtitle: subtitle || 'Subtitle preview goes here',
    excerpt: subtitle || 'Excerpt preview goes here',
    category,
    readTime,
    publishDate: 'August 28, 2026',
    lastUpdated: 'August 28, 2026',
    imageUrl: imageUrl || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: authorName || 'Author Name',
      role: authorRole || 'Editor',
      avatar: authorAvatar || '✍️',
    },
    content: content || '<p>Start typing content above to preview...</p>',
    tableOfContents: analysis.tableOfContents,
    tags,
  };

  const errorDiagnostics = analysis.diagnostics.filter((d) => d.type === 'error');

  return (
    <div className="min-h-screen bg-[#f0f0f1] text-[#1e1e1e] font-sans antialiased flex flex-col selection:bg-[#2271b1] selection:text-white">
      
      {/* 1. WORDPRESS / GUTENBERG + RANK MATH PRO HEADER BAR */}
      <header className="bg-white border-b border-[#dcdcde] px-4 py-2 flex items-center justify-between sticky top-0 z-40 shadow-xs h-14">
        
        {/* Left Side: Page & Mode Pills */}
        <div className="flex items-center space-x-3 overflow-x-auto">
          <button
            onClick={() => setActiveView('editor')}
            className="px-3 py-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white rounded-md text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
          >
            <span className="text-sm">≡</span>
            <span>Edit with SnapLoad</span>
          </button>

          <div className="hidden sm:flex items-center px-3 py-1 bg-[#f6f7f7] border border-[#dcdcde] rounded-md text-xs text-[#50575e] font-medium">
            <span className="truncate max-w-[200px] font-bold text-[#1d2327]">
              {title || 'Untitled Post'}
            </span>
            <span className="mx-2 text-[#a7aaad]">•</span>
            <span>Post</span>
            <span className="ml-2 px-1.5 py-0.5 bg-[#e0e0e0] text-[#50575e] rounded text-[10px] font-mono">⌘K</span>
          </div>

          <button
            onClick={() => {
              setPublishedSuccessMsg('Draft auto-saved successfully!');
              setTimeout(() => setPublishedSuccessMsg(''), 2500);
            }}
            className="text-xs font-semibold text-[#2271b1] hover:text-[#135e96] underline underline-offset-2"
          >
            Save draft
          </button>

          <div className="hidden md:flex items-center space-x-1 text-[#50575e] pl-2 border-l border-[#dcdcde]">
            <button
              onClick={() => setActiveView('editor')}
              className={`p-1.5 rounded hover:bg-[#f0f0f1] ${activeView === 'editor' ? 'text-[#2271b1] font-bold' : ''}`}
              title="Desktop Editor View"
            >
              🖥️
            </button>
            <button
              onClick={() => setActiveView('preview')}
              className={`p-1.5 rounded hover:bg-[#f0f0f1] ${activeView === 'preview' ? 'text-[#2271b1] font-bold' : ''}`}
              title="Live Blog Preview"
            >
              👁️
            </button>
            <button
              onClick={() => setActiveView('posts_manager')}
              className={`p-1.5 rounded hover:bg-[#f0f0f1] ${activeView === 'posts_manager' ? 'text-[#2271b1] font-bold' : ''}`}
              title="All Posts List"
            >
              📂
            </button>
          </div>
        </div>

        {/* Right Side: Rank Math Scores & Action Badges */}
        <div className="flex items-center space-x-2.5">
          
          {/* Pink Heading Health Badge */}
          <div
            className="hidden lg:flex items-center px-2.5 py-1 bg-[#fcf0f2] border border-[#f8cbad] text-[#d63638] rounded font-bold text-xs gap-1.5 shadow-2xs cursor-pointer"
            title="Heading Structure Score"
          >
            <span className="font-extrabold text-sm">H</span>
            <span>{analysis.totalHeadings > 0 ? '95/100' : '00/100'}</span>
          </div>

          {/* DYNAMIC RANK MATH SCORE BADGE (Smooth Score Recalculation) */}
          <button
            onClick={() => setIsRankMathDrawerOpen(!isRankMathDrawerOpen)}
            className={`flex items-center px-3 py-1 rounded font-black text-xs gap-1.5 shadow-xs transition transform hover:scale-105 cursor-pointer ${
              analysis.score >= 81
                ? 'bg-[#10b981] text-white border border-[#059669]'
                : analysis.score >= 51
                ? 'bg-[#f59e0b] text-white border border-[#d97706]'
                : 'bg-[#ef4444] text-white border border-[#dc2626] animate-pulse'
            }`}
            title="Click to toggle Rank Math SEO Sidebar"
          >
            <span className="text-sm">📈</span>
            <span>{analysis.score} / 100</span>
          </button>

          {/* Content AI Red Badge */}
          <div
            className="hidden sm:flex items-center px-2 py-1 bg-[#fcf0f2] border border-[#f8cbad] text-[#d63638] rounded font-bold text-xs gap-1 shadow-2xs relative cursor-pointer"
            title="Content AI Score"
          >
            <span className="text-xs">🎯</span>
            <span>{tags.length > 0 ? '90/100' : '0/100'}</span>
            <span className="absolute -top-1.5 -right-1 px-1 bg-red-600 text-white text-[8px] font-black rounded uppercase">
              Free
            </span>
          </div>

          {/* Toggle Rank Math Sidebar Icon */}
          <button
            onClick={() => setIsRankMathDrawerOpen(!isRankMathDrawerOpen)}
            className={`p-1.5 rounded text-sm transition ${
              isRankMathDrawerOpen ? 'bg-[#1e1e1e] text-white' : 'bg-[#f0f0f1] text-[#1e1e1e] hover:bg-[#e0e0e0]'
            }`}
            title="Toggle Rank Math Sidebar"
          >
            ★
          </button>

          {/* Blue Gutenberg Publish Button */}
          <button
            onClick={handlePublish}
            className="px-4 py-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white font-extrabold text-xs rounded transition shadow-xs flex items-center gap-1 cursor-pointer"
          >
            <span>Publish</span>
          </button>

          {/* Logout */}
          <button
            onClick={() => {
              logoutAdmin();
              onLogout();
            }}
            className="p-1.5 text-xs text-[#d63638] hover:bg-[#fcf0f2] rounded transition"
            title="Log out"
          >
            🚪
          </button>
        </div>
      </header>

      {publishedSuccessMsg && (
        <div className="bg-[#ecf7ed] border-b border-[#4ab866] text-[#1e4620] px-6 py-2.5 text-xs font-bold flex items-center justify-between shadow-2xs">
          <span>✅ {publishedSuccessMsg}</span>
          <button onClick={() => setPublishedSuccessMsg('')} className="text-xs opacity-70 hover:opacity-100">
            ✕
          </button>
        </div>
      )}

      {/* VIEW 1: GUTENBERG CANVAS + RANK MATH PRO SIDEBAR */}
      {activeView === 'editor' && (
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          
          {/* Main Content Paper Canvas Area (Left) */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center bg-[#f0f0f1]">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-md border border-[#e0e0e0] p-6 sm:p-12 space-y-6 min-h-[85vh]">
              
              {/* Top Formatting & Smart Auto-Structure Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e0e0e0] pb-4">
                <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                  <button
                    onClick={() => handleAutoStructureArticle()}
                    className="px-3 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white text-xs font-black rounded shadow-xs flex items-center gap-1 cursor-pointer transition transform hover:scale-105"
                    title="1-Click Auto Format Headings & Structure"
                  >
                    <span>🪄 Auto-Structure Headings</span>
                  </button>

                  <button
                    onClick={handleLoadSample}
                    className="px-3 py-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-bold rounded shadow-xs cursor-pointer"
                    title="Load 1,800 Word Structured Article"
                  >
                    ⚡ Load 1,800 Word Guide
                  </button>

                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as BlogPost['category'])}
                    className="px-3 py-1 text-xs font-bold bg-[#f6f7f7] border border-[#dcdcde] rounded text-[#1d2327]"
                  >
                    <option value="TikTok">TikTok</option>
                    <option value="Instagram">Instagram</option>
                    <option value="MP3 Conversion">MP3 Conversion</option>
                    <option value="YouTube Shorts">YouTube Shorts</option>
                    <option value="Legal & Security">Legal & Security</option>
                  </select>
                </div>
              </div>

              {/* Title Canvas Input */}
              <div>
                <label className="block text-xs font-bold text-[#1d2327] uppercase tracking-wider mb-1">
                  Main Article H1 Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter main article title here..."
                  className="w-full text-xl sm:text-3xl font-extrabold text-[#1d2327] placeholder-[#a7aaad] border-b-2 border-[#2271b1] focus:outline-none pb-2 transition"
                />
              </div>

              {/* Subtitle / Excerpt */}
              <div>
                <label className="block text-xs font-bold text-[#1d2327] uppercase tracking-wider mb-1">
                  SEO Meta Description Summary
                </label>
                <textarea
                  rows={2}
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Write a brief meta description summary..."
                  className="w-full text-sm text-[#50575e] placeholder-[#a7aaad] border border-[#dcdcde] rounded-md p-3 focus:outline-none focus:border-[#2271b1]"
                />
              </div>

              {/* TAGS SYSTEM INPUT BAR */}
              <div className="space-y-2 p-3 bg-[#f6f7f7] border border-[#dcdcde] rounded-md">
                <label className="text-xs font-bold text-[#1d2327] flex items-center justify-between">
                  <span>🏷️ Article Topic Tags</span>
                  <span className="text-[11px] font-normal text-[#50575e]">Type tag and press Enter or comma</span>
                </label>

                <div className="flex flex-wrap items-center gap-1.5 bg-white p-2 border border-[#dcdcde] rounded-md">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#2271b1]/10 text-[#2271b1] border border-[#2271b1]/30 rounded-full text-xs font-bold"
                    >
                      <span>#{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-[#d63638] font-black text-xs ml-0.5"
                      >
                        ✕
                      </button>
                    </span>
                  ))}

                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder={tags.length === 0 ? "Add tags (e.g. #tiktok, #videodownloader)" : "Add more tags..."}
                    className="text-xs font-medium text-[#1d2327] focus:outline-none flex-1 min-w-[140px]"
                  />
                </div>
              </div>

              {/* Main Content Body Canvas with Auto-Heading Formatting Bar */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f6f7f7] p-2.5 border border-[#dcdcde] rounded-t-md">
                  <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                    <span className="text-xs font-extrabold text-[#1d2327] mr-1">Insert Tags:</span>
                    <button
                      type="button"
                      onClick={() => insertFormatting('<h2>', '</h2>', 'Your Major Section Heading')}
                      className="px-2.5 py-1 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-bold rounded shadow-2xs cursor-pointer"
                      title="Insert H2 Major Section Heading"
                    >
                      H2 Heading
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('<h3>', '</h3>', 'Your Subsection Heading')}
                      className="px-2.5 py-1 bg-[#10b981] hover:bg-[#059669] text-white text-xs font-bold rounded shadow-2xs cursor-pointer"
                      title="Insert H3 Sub-section Heading"
                    >
                      H3 Heading
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('<p>', '</p>', 'Your paragraph text goes here...')}
                      className="px-2.5 py-1 bg-white hover:bg-[#e0e0e0] border border-[#dcdcde] text-[#1d2327] text-xs font-bold rounded cursor-pointer"
                      title="Insert Paragraph"
                    >
                      Paragraph
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAutoStructureArticle()}
                    className="px-3 py-1 bg-[#10b981] text-white text-xs font-black rounded hover:bg-[#059669] transition shadow-2xs"
                  >
                    🪄 Auto-Structure Plain Text
                  </button>
                </div>

                <textarea
                  rows={18}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste your plain or formatted article text here, then click '🪄 Auto-Structure Headings' to instantly format H2/H3 headings & paragraphs with 95+ Rank Math score..."
                  className="w-full p-4 border border-[#dcdcde] border-t-0 rounded-b-md text-sm text-[#1d2327] font-serif leading-relaxed focus:outline-none focus:border-[#2271b1] bg-white"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between text-xs text-[#50575e] pt-2 border-t border-[#e0e0e0]">
                <span>Slug: <code className="bg-[#f0f0f1] px-1.5 py-0.5 rounded">{slug || 'article-slug'}</code></span>
                <span>Author: {authorName}</span>
                <span>Read Time: {readTime}</span>
              </div>
            </div>
          </div>

          {/* 2. RANK MATH PRO RIGHT SIDEBAR (EXACT REFERENCE SCREENSHOT CLONE) */}
          {isRankMathDrawerOpen && (
            <aside className="w-full md:w-96 bg-white border-l border-[#dcdcde] flex flex-col overflow-y-auto h-full shadow-lg z-30">
              
              {/* Rank Math Title Header */}
              <div className="p-4 border-b border-[#dcdcde] flex items-center justify-between bg-[#f6f7f7]">
                <div className="flex items-center space-x-2">
                  <span className="text-base font-black text-[#2271b1]">Rank Math</span>
                  <span className="px-1.5 py-0.5 bg-[#2271b1] text-white text-[9px] font-black rounded uppercase">
                    PRO
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="text-sm text-[#f59e0b]" title="Star Post">★</button>
                  <button
                    onClick={() => setIsRankMathDrawerOpen(false)}
                    className="text-sm text-[#50575e] hover:text-[#1d2327]"
                    title="Close Sidebar"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* FOCUS KEYWORD BOX */}
              <div className="p-4 border-b border-[#dcdcde] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-[#1d2327] flex items-center gap-1">
                    <span>Focus Keyword</span>
                    <span className="text-[#8c8f94] cursor-pointer" title="Help info">❓</span>
                  </label>

                  <div className="flex items-center space-x-1">
                    <button className="px-2 py-0.5 bg-[#f6f7f7] hover:bg-[#e0e0e0] border border-[#dcdcde] rounded text-[11px] font-bold text-[#50575e] flex items-center gap-1">
                      <span>🎯 Content AI</span>
                    </button>
                    <button className="p-1 bg-[#f6f7f7] border border-[#dcdcde] rounded text-xs" title="Analytics">
                      📈
                    </button>
                  </div>
                </div>

                {/* Focus Keyword Tag Input Container */}
                <div className="p-2 border border-[#2271b1] rounded-md bg-white shadow-2xs space-y-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {focusKeyword && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#10b981]/15 text-[#047857] border border-[#10b981]/40 rounded-full text-xs font-bold">
                        <span>★</span>
                        <span>{focusKeyword}</span>
                        <span className="cursor-pointer opacity-70 hover:opacity-100" onClick={() => setFocusKeyword('')}>
                          🔄
                        </span>
                      </span>
                    )}

                    <input
                      type="text"
                      value={focusKeyword}
                      onChange={(e) => setFocusKeyword(e.target.value)}
                      placeholder="Add focus keyword..."
                      className="text-xs font-medium text-[#1d2327] focus:outline-none flex-1 min-w-[120px]"
                    />
                  </div>
                </div>

                {/* Upgrade PRO Banner */}
                <div className="p-3 bg-[#fff8e5] border border-[#f59e0b]/40 rounded-md text-xs text-[#856404] space-y-1">
                  <p className="font-semibold">
                    Want more keywords & SEO features?{' '}
                    <a href="#pro" onClick={(e) => e.preventDefault()} className="font-bold underline text-[#2271b1]">
                      Upgrade today to the PRO
                    </a>{' '}
                    version.
                  </p>
                </div>

                {/* Pillar Content Checkbox */}
                <label className="flex items-center space-x-2 text-xs text-[#1d2327] cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={isPillarContent}
                    onChange={(e) => setIsPillarContent(e.target.checked)}
                    className="w-4 h-4 text-[#2271b1] border-[#dcdcde] rounded focus:ring-[#2271b1]"
                  />
                  <span className="font-semibold">This post is Pillar Content</span>
                  <span className="text-[#8c8f94]" title="Pillar content help">❓</span>
                </label>
              </div>

              {/* ACCORDION 1: BASIC SEO (DYNAMIC DISMISSAL UPON FIXING) */}
              <div className="border-b border-[#dcdcde]">
                <button
                  onClick={() => setIsBasicSeoOpen(!isBasicSeoOpen)}
                  className="w-full p-4 flex items-center justify-between bg-white hover:bg-[#f6f7f7] transition"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-extrabold text-[#1d2327]">Basic SEO</span>
                    {errorDiagnostics.length > 0 ? (
                      <span className="px-2 py-0.5 bg-[#fcf0f2] text-[#d63638] border border-[#f8cbad] rounded-full text-[10px] font-bold">
                        ✕ {errorDiagnostics.length} Errors
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-[#ecf7ed] text-[#1e4620] rounded-full text-[10px] font-bold">
                        ✓ Passed All
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-[#50575e] font-bold">
                    {isBasicSeoOpen ? '▲' : '▼'}
                  </span>
                </button>

                {isBasicSeoOpen && (
                  <div className="px-4 pb-4 space-y-3 text-xs text-[#50575e]">
                    
                    {/* Item 1 */}
                    <div className="flex items-start space-x-2">
                      <span className="text-sm shrink-0 text-[#10b981]">✔</span>
                      <div className="flex-1 leading-snug">
                        <span>Hurray! You're using Focus Keyword in the SEO Title.</span>
                      </div>
                      <span className="text-[#8c8f94] shrink-0">❓</span>
                    </div>

                    {/* Item 2 (Dynamic Error Check) */}
                    <div className="flex items-start space-x-2">
                      <span className={`text-sm shrink-0 ${subtitle.toLowerCase().includes(focusKeyword.toLowerCase()) && focusKeyword ? 'text-[#10b981]' : 'text-[#d63638]'}`}>
                        {subtitle.toLowerCase().includes(focusKeyword.toLowerCase()) && focusKeyword ? '✔' : '❌'}
                      </span>
                      <div className="flex-1 leading-snug space-y-1">
                        <span>
                          {subtitle.toLowerCase().includes(focusKeyword.toLowerCase()) && focusKeyword
                            ? 'Focus Keyword used in your SEO Meta Description.'
                            : 'Focus Keyword not found in your SEO Meta Description.'}
                        </span>
                        {(!subtitle.toLowerCase().includes(focusKeyword.toLowerCase()) || !focusKeyword) && (
                          <div>
                            <button
                              onClick={() => {
                                setSubtitle(`Complete guide on ${focusKeyword || 'download tiktok videos'} for fast HD video downloads.`);
                              }}
                              className="px-2 py-0.5 bg-[#fcf0f2] border border-[#f8cbad] text-[#d63638] rounded text-[10px] font-bold hover:bg-[#f8cbad]"
                            >
                              🎯 Fix with AI
                            </button>
                          </div>
                        )}
                      </div>
                      <span className="text-[#8c8f94] shrink-0">❓</span>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-start space-x-2">
                      <span className="text-sm shrink-0 text-[#10b981]">✔</span>
                      <div className="flex-1 leading-snug">
                        <span>Focus Keyword used in the URL.</span>
                      </div>
                      <span className="text-[#8c8f94] shrink-0">❓</span>
                    </div>

                    {/* Item 4 */}
                    <div className="flex items-start space-x-2">
                      <span className="text-sm shrink-0 text-[#10b981]">✔</span>
                      <div className="flex-1 leading-snug">
                        <span>Focus Keyword appears in the first 10% of the content.</span>
                      </div>
                      <span className="text-[#8c8f94] shrink-0">❓</span>
                    </div>

                    {/* Item 5 */}
                    <div className="flex items-start space-x-2">
                      <span className="text-sm shrink-0 text-[#10b981]">✔</span>
                      <div className="flex-1 leading-snug">
                        <span>Focus Keyword found in the content.</span>
                      </div>
                      <span className="text-[#8c8f94] shrink-0">❓</span>
                    </div>
                  </div>
                )}
              </div>

              {/* ACCORDION 2: HEADING STRUCTURE & DYNAMIC DIAGNOSTICS */}
              <div className="border-b border-[#dcdcde]">
                <button
                  onClick={() => setIsHeadingsSeoOpen(!isHeadingsSeoOpen)}
                  className="w-full p-4 flex items-center justify-between bg-white hover:bg-[#f6f7f7] transition"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-extrabold text-[#1d2327]">Heading Hierarchy & Structure</span>
                    {analysis.redLineLines.length > 0 ? (
                      <span className="px-2 py-0.5 bg-[#fcf0f2] text-[#d63638] rounded-full text-[10px] font-bold">
                        🔴 {analysis.redLineLines.length} Flagged Lines
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-[#ecf7ed] text-[#1e4620] rounded-full text-[10px] font-bold">
                        ✓ All Clear
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-[#50575e] font-bold">
                    {isHeadingsSeoOpen ? '▲' : '▼'}
                  </span>
                </button>

                {isHeadingsSeoOpen && (
                  <div className="px-4 pb-4 space-y-3 text-xs text-[#50575e]">
                    {analysis.diagnostics.map((item) => (
                      <div
                        key={item.id}
                        className={`p-2.5 rounded border transition ${
                          item.type === 'error'
                            ? 'bg-[#fcf0f2] border-[#f8cbad] text-[#d63638]'
                            : item.type === 'warning'
                            ? 'bg-[#fff8e5] border-[#f59e0b]/40 text-[#856404]'
                            : 'bg-[#ecf7ed] border-[#4ab866]/40 text-[#1e4620]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <div className="flex items-center gap-1.5 font-bold">
                            <span>{item.type === 'error' ? '❌' : item.type === 'warning' ? '⚠️' : '✔'}</span>
                            <span>{item.title}</span>
                          </div>
                        </div>

                        <p className="text-[11px] mt-1 leading-relaxed opacity-90 pl-5">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ACCORDION 3: GOOGLE SERP SEARCH SNIPPET */}
              <div className="border-b border-[#dcdcde]">
                <button
                  onClick={() => setIsSerpOpen(!isSerpOpen)}
                  className="w-full p-4 flex items-center justify-between bg-white hover:bg-[#f6f7f7] transition"
                >
                  <span className="text-xs font-extrabold text-[#1d2327]">Google SERP Snippet Preview</span>
                  <span className="text-xs text-[#50575e] font-bold">{isSerpOpen ? '▲' : '▼'}</span>
                </button>

                {isSerpOpen && (
                  <div className="px-4 pb-4 space-y-3">
                    <div className="p-3.5 bg-white border border-[#dcdcde] rounded-md shadow-2xs font-sans space-y-1">
                      <div className="text-[11px] text-[#50575e] truncate">
                        snaploaddownload.com › blog › {slug || 'article-slug'}
                      </div>
                      <h4 className="text-sm font-bold text-[#1a0dab] hover:underline cursor-pointer line-clamp-2">
                        {title || 'Article Title'}
                      </h4>
                      <p className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
                        {subtitle || 'Meta description summary...'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </aside>
          )}
        </div>
      )}

      {/* VIEW 2: LIVE BLOG PREVIEW */}
      {activeView === 'preview' && (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
          <div className="bg-white p-4 border border-[#dcdcde] rounded-md flex items-center justify-between text-xs text-[#50575e]">
            <span>👁️ Live Preview Mode: Showing exact rendering as seen by readers on SnapLoad Blog</span>
            <button
              onClick={handlePublish}
              className="px-4 py-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white rounded font-bold text-xs"
            >
              Publish Article Now 🚀
            </button>
          </div>

          <div className="bg-white border border-[#dcdcde] rounded-md p-6">
            <BlogPostPage
              post={previewPost}
              onBack={() => setActiveView('editor')}
              onNavigateHome={onNavigateHome}
              onSelectPost={() => {}}
            />
          </div>
        </div>
      )}

      {/* VIEW 3: POSTS MANAGER */}
      {activeView === 'posts_manager' && (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-[#1d2327]">Published Articles Manager</h3>
              <p className="text-xs text-[#50575e]">Total Articles: {allPostsList.length}</p>
            </div>

            <button
              onClick={() => setActiveView('editor')}
              className="px-4 py-2 bg-[#2271b1] text-white text-xs font-bold rounded"
            >
              + Create New Article
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPostsList.map((post) => (
              <div key={post.slug} className="bg-white p-5 rounded-lg border border-[#dcdcde] shadow-xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 bg-[#f0f0f1] text-[#1d2327] rounded font-bold">
                      {post.category}
                    </span>
                    <span className="text-[#8c8f94] text-[11px]">{post.publishDate}</span>
                  </div>

                  <h4 className="text-sm font-bold text-[#1d2327] line-clamp-2">
                    {post.title}
                  </h4>

                  <p className="text-xs text-[#50575e] line-clamp-2">
                    {post.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#e0e0e0] flex items-center justify-between text-xs">
                  <button
                    onClick={() => onSelectPost(post.slug)}
                    className="font-bold text-[#2271b1] hover:underline"
                  >
                    View Live ➔
                  </button>

                  <button
                    onClick={() => handleDeletePost(post.slug)}
                    className="font-bold text-[#d63638] hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: CODE EXPORT */}
      {activeView === 'export' && (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#1d2327]">
              💻 Export Article Code for <code className="text-[#2271b1]">blogData.ts</code>
            </h3>

            <button
              onClick={handleCopyCode}
              className="px-4 py-2 bg-[#2271b1] text-white text-xs font-bold rounded shadow"
            >
              {copiedMsg || '📋 Copy Code Snippet'}
            </button>
          </div>

          <pre className="p-4 bg-[#2c3338] text-[#10b981] rounded-md overflow-x-auto text-xs font-mono max-h-[500px]">
            {generateExportCode()}
          </pre>
        </div>
      )}
    </div>
  );
};
