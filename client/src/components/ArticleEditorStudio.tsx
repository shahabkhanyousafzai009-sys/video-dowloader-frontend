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

  // Article Form State (Clean Blank State by default)
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<BlogPost['category']>('TikTok');
  const [readTime, setReadTime] = useState('5 min read');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [authorName, setAuthorName] = useState('SnapLoad Editorial Team');
  const [authorRole, setAuthorRole] = useState('Senior Digital Media Analyst');
  const [authorAvatar, setAuthorAvatar] = useState('📝');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [isPillarContent, setIsPillarContent] = useState(false);

  const [publishedSuccessMsg, setPublishedSuccessMsg] = useState('');
  const [copiedMsg, setCopiedMsg] = useState('');
  const [highlightedLine, setHighlightedLine] = useState<number | null>(null);
  const [postsRefresh, setPostsRefresh] = useState(0);

  // Run Rank Math Heading & SEO Analysis
  const analysis = useMemo(() => {
    return analyzeRankMathHeadings(title, content, focusKeyword);
  }, [title, content, focusKeyword]);

  // All Posts List for Manager
  const allPostsList = useMemo(() => {
    return Object.values(getMergedBlogPosts());
  }, [postsRefresh, publishedSuccessMsg]);

  // Load Sample Flawed Draft
  const handleLoadSample = () => {
    setTitle(SAMPLE_DRAFT_ARTICLE.title);
    setSubtitle(SAMPLE_DRAFT_ARTICLE.subtitle);
    setSlug(SAMPLE_DRAFT_ARTICLE.slug);
    setCategory(SAMPLE_DRAFT_ARTICLE.category);
    setReadTime(SAMPLE_DRAFT_ARTICLE.readTime);
    setFocusKeyword(SAMPLE_DRAFT_ARTICLE.focusKeyword);
    setAuthorName(SAMPLE_DRAFT_ARTICLE.authorName);
    setAuthorRole(SAMPLE_DRAFT_ARTICLE.authorRole);
    setAuthorAvatar(SAMPLE_DRAFT_ARTICLE.authorAvatar);
    setImageUrl(SAMPLE_DRAFT_ARTICLE.imageUrl);
    setContent(SAMPLE_DRAFT_ARTICLE.content);
    setPublishedSuccessMsg('⚡ Loaded Rank Math test draft with heading errors!');
    setTimeout(() => setPublishedSuccessMsg(''), 3500);
  };

  // Title to Slug Generator
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

  // 1-Click Auto-Fix Hierarchy
  const handleAutoFixHierarchy = () => {
    const lines = content.split('\n');
    let fixCount = 0;

    const fixedLines = lines.map((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('#### ')) {
        fixCount++;
        return line.replace(/^####\s+/, '## ');
      }
      if (trimmed.startsWith('##### ')) {
        fixCount++;
        return line.replace(/^#####\s+/, '### ');
      }
      if (trimmed.match(/^<h1(?:\s+class="[^"]*")?>([^<]+)<\/h1>$/i)) {
        fixCount++;
        return line.replace(/<h1/gi, '<h2').replace(/<\/h1>/gi, '</h2>');
      }
      return line;
    });

    setContent(fixedLines.join('\n'));
    setPublishedSuccessMsg(`✨ Fixed ${fixCount || 1} heading hierarchy levels automatically!`);
    setTimeout(() => setPublishedSuccessMsg(''), 3000);
  };

  // 1-Click Capitalize Headings
  const handleCapitalizeHeadings = () => {
    const toTitleCase = (str: string) =>
      str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

    const lines = content.split('\n');
    const fixedLines = lines.map((line) => {
      const mdMatch = line.match(/^(#{1,6})\s+(.+)$/);
      if (mdMatch) {
        return `${mdMatch[1]} ${toTitleCase(mdMatch[2])}`;
      }
      const htmlMatch = line.match(/^<h([1-6])(?:\s+class="[^"]*")?>([^<]+)<\/h[1-6]>$/i);
      if (htmlMatch) {
        return `<h${htmlMatch[1]}>${toTitleCase(htmlMatch[2])}</h${htmlMatch[1]}>`;
      }
      return line;
    });

    setContent(fixedLines.join('\n'));
    setPublishedSuccessMsg('✨ Capitalized headings into clean Title Case!');
    setTimeout(() => setPublishedSuccessMsg(''), 3000);
  };

  // Insert Formatting Shortcode
  const insertFormatting = (prefix: string, suffix: string = '') => {
    setContent((prev) => `${prev}\n${prefix}New Heading or Paragraph${suffix}`);
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
      readTime: readTime || '5 min read',
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
  };

  const contentLines = content.split('\n');
  const errorDiagnostics = analysis.diagnostics.filter((d) => d.type === 'error');
  const warningDiagnostics = analysis.diagnostics.filter((d) => d.type === 'warning');
  const passDiagnostics = analysis.diagnostics.filter((d) => d.type === 'pass');

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

        {/* Right Side: Rank Math Scores & Action Badges (PIXEL PERFECT REFERENCE MATCH) */}
        <div className="flex items-center space-x-2.5">
          
          {/* Pink Heading Health Badge */}
          <div
            className="hidden lg:flex items-center px-2.5 py-1 bg-[#fcf0f2] border border-[#f8cbad] text-[#d63638] rounded font-bold text-xs gap-1.5 shadow-2xs cursor-pointer"
            title="Heading Structure Score"
          >
            <span className="font-extrabold text-sm">H</span>
            <span>00/100</span>
          </div>

          {/* GREEN / RED RANK MATH SCORE BADGE (EXACT SCREENSHOT MATCH) */}
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
            <span>0 / 100</span>
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
              
              {/* Top Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e0e0e0] pb-4">
                <div className="flex items-center space-x-1 bg-[#f6f7f7] p-1 rounded border border-[#dcdcde]">
                  <button
                    onClick={() => insertFormatting('## ')}
                    className="px-2.5 py-1 text-xs font-bold hover:bg-white rounded text-[#1d2327]"
                    title="H2 Heading"
                  >
                    H2
                  </button>
                  <button
                    onClick={() => insertFormatting('### ')}
                    className="px-2.5 py-1 text-xs font-bold hover:bg-white rounded text-[#1d2327]"
                    title="H3 Heading"
                  >
                    H3
                  </button>
                  <button
                    onClick={() => insertFormatting('<strong>', '</strong>')}
                    className="px-2.5 py-1 text-xs font-bold hover:bg-white rounded text-[#1d2327]"
                    title="Bold"
                  >
                    B
                  </button>
                  <button
                    onClick={() => insertFormatting('<em>', '</em>')}
                    className="px-2.5 py-1 text-xs font-bold hover:bg-white rounded text-[#1d2327]"
                    title="Italic"
                  >
                    I
                  </button>
                  <button
                    onClick={() => insertFormatting('<p>', '</p>')}
                    className="px-2.5 py-1 text-xs font-bold hover:bg-white rounded text-[#1d2327]"
                    title="Paragraph"
                  >
                    Paragraph
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleLoadSample}
                    className="px-3 py-1 text-xs font-bold bg-[#f6f7f7] hover:bg-[#e0e0e0] text-[#1d2327] rounded border border-[#dcdcde]"
                  >
                    ⚡ Test Draft
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
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Add Title"
                  className="w-full text-2xl sm:text-4xl font-extrabold text-[#1d2327] placeholder-[#a7aaad] border-b-2 border-transparent focus:border-[#2271b1] focus:outline-none pb-2 transition"
                />
              </div>

              {/* Subtitle / Excerpt */}
              <div>
                <textarea
                  rows={2}
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Write a brief meta description summary..."
                  className="w-full text-sm text-[#50575e] placeholder-[#a7aaad] border border-[#dcdcde] rounded-md p-3 focus:outline-none focus:border-[#2271b1]"
                />
              </div>

              {/* Red Line Diagnostic Alert Box */}
              {analysis.redLineLines.length > 0 && (
                <div className="p-3.5 bg-[#fcf0f2] border-l-4 border-[#d63638] text-xs text-[#d63638] space-y-1 rounded-r">
                  <div className="font-bold flex items-center gap-1.5">
                    <span>🔴 Rank Math Heading Alert:</span>
                    <span>{analysis.redLineLines.length} Heading / Structural issues flagged below!</span>
                  </div>
                  <p className="text-[#50575e]">
                    Problematic lines are marked with a red wavy underline in the visual line editor. Click line badges in the sidebar to jump directly!
                  </p>
                </div>
              )}

              {/* Red Line Code & Line Inspector */}
              <div className="font-mono text-xs border border-[#dcdcde] rounded-md bg-[#2c3338] text-[#f0f0f1] overflow-hidden">
                <div className="p-4 space-y-1 max-h-[350px] overflow-y-auto">
                  {contentLines.map((line, idx) => {
                    const lineNum = idx + 1;
                    const isRedLine = analysis.redLineLines.includes(lineNum);
                    const isHighlighted = highlightedLine === lineNum;

                    return (
                      <div
                        key={idx}
                        id={`editor-line-${lineNum}`}
                        className={`flex items-start gap-3 px-2 py-0.5 rounded transition ${
                          isHighlighted
                            ? 'bg-[#f59e0b]/30 border border-[#f59e0b]'
                            : isRedLine
                            ? 'bg-[#d63638]/20 border-b border-[#d63638] border-dashed'
                            : 'hover:bg-white/5'
                        }`}
                      >
                        <span className={`w-8 text-right font-bold select-none shrink-0 ${
                          isRedLine ? 'text-[#ff8080] font-black' : 'text-[#8c8f94]'
                        }`}>
                          {isRedLine ? `🔴 ${lineNum}` : lineNum}
                        </span>

                        <div className="flex-1 overflow-x-auto whitespace-pre-wrap break-words">
                          {isRedLine ? (
                            <span className="text-[#ffb3b3] font-semibold underline decoration-[#d63638] decoration-wavy underline-offset-4">
                              {line || ' '}
                            </span>
                          ) : (
                            <span>{line || ' '}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Main Content Body Canvas Textarea */}
              <div>
                <textarea
                  rows={14}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start writing or paste HTML / Markdown content..."
                  className="w-full p-4 border border-[#dcdcde] rounded-md text-sm text-[#1d2327] font-serif leading-relaxed focus:outline-none focus:border-[#2271b1]"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between text-xs text-[#50575e] pt-2 border-t border-[#e0e0e0]">
                <span>Slug: <code className="bg-[#f0f0f1] px-1.5 py-0.5 rounded">{slug}</code></span>
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

              {/* FOCUS KEYWORD BOX (EXACT SCREENSHOT CLONE) */}
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

                {/* Focus Keyword Tag Input Container (Green Tag Pill) */}
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

              {/* ACCORDION 1: BASIC SEO (EXACT SCREENSHOT MATCH) */}
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
                        ✓ Passed
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

                    {/* Item 2 */}
                    <div className="flex items-start space-x-2">
                      <span className="text-sm shrink-0 text-[#d63638]">❌</span>
                      <div className="flex-1 leading-snug space-y-1">
                        <span>Focus Keyword not found in your SEO Meta Description.</span>
                        <div>
                          <button
                            onClick={() => {
                              setSubtitle(`Complete guide on ${focusKeyword || 'tiktok downloader'} for fast HD video downloads.`);
                            }}
                            className="px-2 py-0.5 bg-[#fcf0f2] border border-[#f8cbad] text-[#d63638] rounded text-[10px] font-bold hover:bg-[#f8cbad]"
                          >
                            🎯 Fix with AI
                          </button>
                        </div>
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

              {/* ACCORDION 2: HEADING STRUCTURE & RED-LINE DIAGNOSTICS */}
              <div className="border-b border-[#dcdcde]">
                <button
                  onClick={() => setIsHeadingsSeoOpen(!isHeadingsSeoOpen)}
                  className="w-full p-4 flex items-center justify-between bg-white hover:bg-[#f6f7f7] transition"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-extrabold text-[#1d2327]">Heading Hierarchy & Structure</span>
                    {analysis.redLineLines.length > 0 && (
                      <span className="px-2 py-0.5 bg-[#fcf0f2] text-[#d63638] rounded-full text-[10px] font-bold">
                        🔴 {analysis.redLineLines.length} Flagged Lines
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-[#50575e] font-bold">
                    {isHeadingsSeoOpen ? '▲' : '▼'}
                  </span>
                </button>

                {isHeadingsSeoOpen && (
                  <div className="px-4 pb-4 space-y-3 text-xs text-[#50575e]">
                    
                    {/* Auto Fix Assistant */}
                    <div className="flex items-center gap-2 pt-1 pb-2">
                      <button
                        onClick={handleAutoFixHierarchy}
                        className="flex-1 py-1.5 px-2 bg-[#2271b1] hover:bg-[#135e96] text-white font-bold rounded text-[11px] shadow-2xs"
                      >
                        🪄 Fix Hierarchy Levels
                      </button>
                      <button
                        onClick={handleCapitalizeHeadings}
                        className="flex-1 py-1.5 px-2 bg-[#f6f7f7] hover:bg-[#e0e0e0] border border-[#dcdcde] text-[#1d2327] font-bold rounded text-[11px]"
                      >
                        ✨ Title Case
                      </button>
                    </div>

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

                          {item.lineNumber && (
                            <button
                              onClick={() => {
                                setHighlightedLine(item.lineNumber!);
                                const el = document.getElementById(`editor-line-${item.lineNumber}`);
                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              }}
                              className="px-1.5 py-0.5 bg-white text-[#1d2327] rounded border border-[#dcdcde] text-[10px] font-bold hover:border-[#d63638] shrink-0"
                            >
                              Line {item.lineNumber} 🔴
                            </button>
                          )}
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
                        snaploaddownload.com › blog › {slug}
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
              onNavigateHome={onNavigateHome}
              onNavigateBlogHub={onNavigateBlogHub}
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
