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
  const [activeView, setActiveView] = useState<'editor' | 'preview' | 'posts_manager' | 'export'>('editor');
  const [activeSidebarTab, setActiveSidebarTab] = useState<'seo' | 'headings' | 'serp'>('seo');

  // Article Form State
  const [title, setTitle] = useState(SAMPLE_DRAFT_ARTICLE.title);
  const [subtitle, setSubtitle] = useState(SAMPLE_DRAFT_ARTICLE.subtitle);
  const [slug, setSlug] = useState(SAMPLE_DRAFT_ARTICLE.slug);
  const [category, setCategory] = useState<BlogPost['category']>(SAMPLE_DRAFT_ARTICLE.category);
  const [readTime, setReadTime] = useState(SAMPLE_DRAFT_ARTICLE.readTime);
  const [focusKeyword, setFocusKeyword] = useState(SAMPLE_DRAFT_ARTICLE.focusKeyword);
  const [authorName, setAuthorName] = useState(SAMPLE_DRAFT_ARTICLE.authorName);
  const [authorRole, setAuthorRole] = useState(SAMPLE_DRAFT_ARTICLE.authorRole);
  const [authorAvatar, setAuthorAvatar] = useState(SAMPLE_DRAFT_ARTICLE.authorAvatar);
  const [imageUrl, setImageUrl] = useState(SAMPLE_DRAFT_ARTICLE.imageUrl);
  const [content, setContent] = useState(SAMPLE_DRAFT_ARTICLE.content);

  const [publishedSuccessMsg, setPublishedSuccessMsg] = useState('');
  const [copiedMsg, setCopiedMsg] = useState('');
  const [highlightedLine, setHighlightedLine] = useState<number | null>(null);

  // Refresh trigger for posts list manager
  const [postsRefresh, setPostsRefresh] = useState(0);

  // Run Rank Math Heading & SEO Analysis
  const analysis = useMemo(() => {
    return analyzeRankMathHeadings(title, content, focusKeyword);
  }, [title, content, focusKeyword]);

  // Load All Merged Posts for Posts Manager
  const allPostsList = useMemo(() => {
    return Object.values(getMergedBlogPosts());
  }, [postsRefresh, publishedSuccessMsg]);

  // Handle Loading Sample Flawed Draft
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
    setPublishedSuccessMsg('⚡ Loaded Rank Math test draft with intentional heading errors!');
    setTimeout(() => setPublishedSuccessMsg(''), 3500);
  };

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

  // Insert Editor Formatting Shortcode
  const insertFormatting = (prefix: string, suffix: string = '') => {
    setContent((prev) => `${prev}\n${prefix}New Heading or Content${suffix}`);
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
    setPublishedSuccessMsg('🎉 Article published to live blog! Opening live post page...');
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

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans -mt-4 -mb-16 pb-16 pt-4 animate-fade-in text-left">
      
      {/* CMS TOPBAR DASHBOARD HEADER */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-4 sm:px-8 py-3 flex items-center justify-between shadow-2xl">
        
        {/* Left Brand & Breadcrumb */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 via-orange-500 to-amber-500 flex items-center justify-center text-xl shadow-lg shadow-red-500/20 font-black border border-white/20">
            🎯
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">SnapLoad CMS</span>
              <span className="text-xs text-slate-600">/</span>
              <span className="text-sm font-extrabold text-white">Rank Math Pro Studio</span>
            </div>
            <div className="flex items-center space-x-3 text-[11px] text-slate-400 mt-0.5">
              <span>Status: <strong className="text-emerald-400 font-bold">🟢 Auto-Saved</strong></span>
              <span>•</span>
              <span>Words: <strong className="text-white font-bold">{content.trim().split(/\s+/).filter(Boolean).length}</strong></span>
              <span>•</span>
              <span>Headings: <strong className="text-amber-400 font-bold">{analysis.totalHeadings}</strong></span>
            </div>
          </div>
        </div>

        {/* Center Mode Switcher Tabs */}
        <div className="hidden md:flex items-center p-1 bg-slate-950/80 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveView('editor')}
            className={`px-4 py-1.5 text-xs font-extrabold rounded-lg transition flex items-center gap-1.5 ${
              activeView === 'editor'
                ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>✍️ Editor Studio</span>
            <span className={`px-2 py-0.5 text-[10px] rounded-full font-black ${
              analysis.status === 'green'
                ? 'bg-emerald-500 text-white'
                : analysis.status === 'yellow'
                ? 'bg-amber-500 text-black'
                : 'bg-red-600 text-white animate-pulse'
            }`}>
              {analysis.score}/100
            </span>
          </button>

          <button
            onClick={() => setActiveView('preview')}
            className={`px-4 py-1.5 text-xs font-extrabold rounded-lg transition flex items-center gap-1.5 ${
              activeView === 'preview'
                ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>👁️ Live Preview</span>
          </button>

          <button
            onClick={() => setActiveView('posts_manager')}
            className={`px-4 py-1.5 text-xs font-extrabold rounded-lg transition flex items-center gap-1.5 ${
              activeView === 'posts_manager'
                ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>📂 All Posts ({allPostsList.length})</span>
          </button>

          <button
            onClick={() => setActiveView('export')}
            className={`px-4 py-1.5 text-xs font-extrabold rounded-lg transition flex items-center gap-1.5 ${
              activeView === 'export'
                ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>💻 Code</span>
          </button>
        </div>

        {/* Right Quick Actions */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={handleLoadSample}
            className="hidden lg:flex px-3 py-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition border border-slate-700"
            title="Load sample article with heading errors"
          >
            ⚡ Test Sample Draft
          </button>

          <button
            onClick={onNavigateBlogHub}
            className="px-3 py-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition border border-slate-700"
          >
            📖 Blog Hub
          </button>

          <button
            onClick={handlePublish}
            className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition transform active:scale-95 flex items-center gap-1.5"
          >
            <span>🚀 Publish Live</span>
          </button>

          <button
            onClick={() => {
              logoutAdmin();
              onLogout();
            }}
            className="px-2.5 py-1.5 text-xs font-bold bg-red-950/60 text-red-300 hover:bg-red-900 rounded-xl border border-red-800 transition"
            title="Log out admin"
          >
            🚪
          </button>
        </div>
      </header>

      {publishedSuccessMsg && (
        <div className="max-w-7xl mx-auto px-4 mt-4">
          <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold rounded-2xl flex items-center justify-between text-sm shadow-lg animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="text-lg">✅</span>
              <span>{publishedSuccessMsg}</span>
            </div>
            <button onClick={() => setPublishedSuccessMsg('')} className="text-xs opacity-70 hover:opacity-100">
              ✕
            </button>
          </div>
        </div>
      )}

      {/* VIEW 1: STUDIO EDITOR & RANK MATH DRAWER */}
      {activeView === 'editor' && (
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content & Canvas Editor (Left 8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Article Top Settings Bar */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <span>⚙️</span>
                  <span>Article Metadata & Targeting</span>
                </span>

                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-bold border border-slate-700">
                  Category: {category}
                </span>
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Article H1 Main Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter a compelling H1 title with target keyword..."
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-white font-extrabold text-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-slate-600 transition"
                />
              </div>

              {/* Focus Keyword & Subtitle Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    🎯 Rank Math Focus Keyword <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={focusKeyword}
                    onChange={(e) => setFocusKeyword(e.target.value)}
                    placeholder="e.g. tiktok downloader"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Category Selector
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as BlogPost['category'])}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="TikTok">TikTok</option>
                    <option value="Instagram">Instagram</option>
                    <option value="MP3 Conversion">MP3 Conversion</option>
                    <option value="YouTube Shorts">YouTube Shorts</option>
                    <option value="Legal & Security">Legal & Security</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Subtitle / Meta Excerpt
                </label>
                <textarea
                  rows={2}
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Enter meta description summary..."
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-400 uppercase mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-400 uppercase mb-1">Author Name</label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-400 uppercase mb-1">Estimated Read Time</label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-300"
                  />
                </div>
              </div>
            </div>

            {/* Editor Canvas Toolbar & Red Line Inspector Container */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
              
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-black uppercase text-slate-400">📝 Article Editor</span>
                  <span className="px-2 py-0.5 bg-red-950/80 text-red-400 text-[11px] font-bold rounded-full border border-red-800/60">
                    🔴 Red Line Inspector Active
                  </span>
                </div>

                {/* Quick Formatting Shortcuts */}
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => insertFormatting('## ')}
                    className="px-2.5 py-1 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700"
                    title="Insert H2 Subheading"
                  >
                    H2
                  </button>

                  <button
                    onClick={() => insertFormatting('### ')}
                    className="px-2.5 py-1 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700"
                    title="Insert H3 Subheading"
                  >
                    H3
                  </button>

                  <button
                    onClick={() => insertFormatting('<p>', '</p>')}
                    className="px-2.5 py-1 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700"
                    title="Insert Paragraph"
                  >
                    Paragraph
                  </button>
                </div>
              </div>

              {/* Red Line Diagnostics Banner */}
              {analysis.redLineLines.length > 0 && (
                <div className="p-3.5 bg-red-950/40 border border-red-500/40 rounded-2xl text-xs text-red-300 space-y-1">
                  <div className="font-extrabold text-red-400 flex items-center gap-2">
                    <span>🔴 Rank Math Alert:</span>
                    <span>{analysis.redLineLines.length} Heading / Structural issues flagged in editor!</span>
                  </div>
                  <p className="text-red-300/80">
                    Lines marked with a red wavy underline require attention to improve your Rank Math SEO score.
                  </p>
                </div>
              )}

              {/* Red Line Visual Code & Text Editor Display */}
              <div className="relative font-mono text-xs border border-slate-800 rounded-2xl overflow-hidden bg-slate-950 text-slate-200 shadow-inner">
                <div className="p-4 space-y-1 max-h-[450px] overflow-y-auto">
                  {contentLines.map((line, idx) => {
                    const lineNum = idx + 1;
                    const isRedLine = analysis.redLineLines.includes(lineNum);
                    const isHighlighted = highlightedLine === lineNum;

                    return (
                      <div
                        key={idx}
                        id={`editor-line-${lineNum}`}
                        className={`flex items-start gap-3 px-2 py-1 rounded transition ${
                          isHighlighted
                            ? 'bg-amber-500/30 border border-amber-400'
                            : isRedLine
                            ? 'bg-red-950/40 border-b border-red-500 border-dashed'
                            : 'hover:bg-slate-900'
                        }`}
                      >
                        <span className={`w-8 text-right font-bold select-none shrink-0 ${
                          isRedLine ? 'text-red-400 font-black' : 'text-slate-600'
                        }`}>
                          {isRedLine ? `🔴 ${lineNum}` : lineNum}
                        </span>

                        <div className="flex-1 overflow-x-auto whitespace-pre-wrap break-words">
                          {isRedLine ? (
                            <span className="text-red-200 font-semibold underline decoration-red-500 decoration-wavy underline-offset-4">
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

              {/* Main Content Input Textarea */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Article Content Editor (HTML / Markdown)
                </label>
                <textarea
                  rows={12}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste or write your article content here..."
                  className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Right Panel: Rank Math Pro Diagnostic Drawer (Right 4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Rank Math Pro Circular Score Meter */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-5">
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Rank Math SEO Score
                  </h4>
                  <h5 className="text-base font-black text-white mt-0.5">
                    {analysis.statusText}
                  </h5>
                </div>

                <div className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center text-white shadow-2xl transition-transform ${
                  analysis.status === 'green'
                    ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 shadow-emerald-500/30'
                    : analysis.status === 'yellow'
                    ? 'bg-gradient-to-tr from-amber-500 to-orange-500 shadow-amber-500/30'
                    : 'bg-gradient-to-tr from-red-600 to-rose-600 shadow-red-500/30 animate-pulse'
                }`}>
                  <span className="text-2xl font-black">{analysis.score}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">/ 100</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    analysis.status === 'green'
                      ? 'bg-emerald-500'
                      : analysis.status === 'yellow'
                      ? 'bg-amber-500'
                      : 'bg-red-600'
                  }`}
                  style={{ width: `${analysis.score}%` }}
                />
              </div>

              {/* Quick Auto Fixes */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  🪄 1-Click Rank Math Auto-Fix Tools
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleAutoFixHierarchy}
                    className="p-2.5 text-xs font-bold bg-red-950/40 text-red-300 hover:bg-red-900/60 rounded-xl border border-red-800/50 transition text-left flex items-center gap-1"
                  >
                    <span>🪄</span>
                    <span>Fix Hierarchy</span>
                  </button>

                  <button
                    onClick={handleCapitalizeHeadings}
                    className="p-2.5 text-xs font-bold bg-amber-950/40 text-amber-300 hover:bg-amber-900/60 rounded-xl border border-amber-800/50 transition text-left flex items-center gap-1"
                  >
                    <span>✨</span>
                    <span>Title Case</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Rank Math Diagnostic Accordion Drawer */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
              
              {/* Drawer Tabs */}
              <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setActiveSidebarTab('seo')}
                  className={`flex-1 py-1.5 font-bold rounded-lg transition ${
                    activeSidebarTab === 'seo' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Basic SEO
                </button>

                <button
                  onClick={() => setActiveSidebarTab('headings')}
                  className={`flex-1 py-1.5 font-bold rounded-lg transition ${
                    activeSidebarTab === 'headings' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Headings
                </button>

                <button
                  onClick={() => setActiveSidebarTab('serp')}
                  className={`flex-1 py-1.5 font-bold rounded-lg transition ${
                    activeSidebarTab === 'serp' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Google SERP
                </button>
              </div>

              {/* TAB A: BASIC SEO & HEADINGS CHECKLIST */}
              {(activeSidebarTab === 'seo' || activeSidebarTab === 'headings') && (
                <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                  {analysis.diagnostics.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 rounded-2xl border transition ${
                        item.type === 'error'
                          ? 'bg-red-950/40 border-red-800/60 text-red-300'
                          : item.type === 'warning'
                          ? 'bg-amber-950/40 border-amber-800/60 text-amber-300'
                          : 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span>{item.type === 'error' ? '❌' : item.type === 'warning' ? '⚠️' : '✅'}</span>
                          <h6 className="text-xs font-bold">{item.title}</h6>
                        </div>

                        {item.lineNumber && (
                          <button
                            onClick={() => {
                              setHighlightedLine(item.lineNumber!);
                              const el = document.getElementById(`editor-line-${item.lineNumber}`);
                              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }}
                            className="px-2 py-0.5 text-[10px] font-bold bg-slate-950 text-slate-300 rounded border border-slate-800 hover:border-red-500 shrink-0"
                          >
                            Line {item.lineNumber} 🔴
                          </button>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-300/80 mt-1 pl-5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB B: GOOGLE SERP SEARCH PREVIEW CARD */}
              {activeSidebarTab === 'serp' && (
                <div className="space-y-3">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    🔍 Google Search Snippet Preview
                  </span>

                  <div className="p-4 bg-white text-slate-900 rounded-2xl shadow-lg border border-slate-200 font-sans space-y-1">
                    <div className="text-xs text-slate-600 truncate flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                        S
                      </span>
                      <span>snaploaddownload.com › blog › {slug || 'article-slug'}</span>
                    </div>

                    <h4 className="text-base font-extrabold text-blue-700 hover:underline cursor-pointer leading-snug line-clamp-2">
                      {title || 'Article Title Preview | SnapLoad'}
                    </h4>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {subtitle || 'Subtitle or meta description excerpt preview appears here in Google search engine result cards.'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: LIVE BLOG POST PREVIEW */}
      {activeView === 'preview' && (
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between text-xs text-slate-300">
            <span>👁️ Live Preview Mode: Showing exact rendering as seen by readers on SnapLoad Blog</span>
            <button
              onClick={handlePublish}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition"
            >
              Publish Article Now 🚀
            </button>
          </div>

          <div className="border border-slate-800 rounded-3xl p-6 bg-slate-950">
            <BlogPostPage
              post={previewPost}
              onNavigateHome={onNavigateHome}
              onNavigateBlogHub={onNavigateBlogHub}
              onSelectPost={() => {}}
            />
          </div>
        </div>
      )}

      {/* VIEW 3: POSTS MANAGER DASHBOARD */}
      {activeView === 'posts_manager' && (
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-white">📂 Published Articles Manager</h3>
              <p className="text-xs text-slate-400">Total Articles: {allPostsList.length}</p>
            </div>

            <button
              onClick={() => setActiveView('editor')}
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white text-xs font-extrabold rounded-xl"
            >
              + Create New Article
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPostsList.map((post) => (
              <div key={post.slug} className="bg-slate-900 p-5 rounded-3xl border border-slate-800 shadow-xl space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 bg-red-950 text-red-300 rounded-full font-bold border border-red-800/60">
                      {post.category}
                    </span>
                    <span className="text-slate-400 text-[11px]">{post.publishDate}</span>
                  </div>

                  <h4 className="text-sm font-extrabold text-white line-clamp-2 leading-snug">
                    {post.title}
                  </h4>

                  <p className="text-xs text-slate-400 line-clamp-2">
                    {post.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => onSelectPost(post.slug)}
                    className="text-xs font-bold text-emerald-400 hover:underline"
                  >
                    View Live ➔
                  </button>

                  <button
                    onClick={() => handleDeletePost(post.slug)}
                    className="text-xs font-bold text-red-400 hover:text-red-300"
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
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-white">
                💻 Export Article TypeScript Code for <code className="text-red-400">blogData.ts</code>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Copy formatted TypeScript object directly into your project repo.
              </p>
            </div>

            <button
              onClick={handleCopyCode}
              className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-orange-600 text-white text-xs font-bold rounded-xl shadow"
            >
              {copiedMsg || '📋 Copy Code Snippet'}
            </button>
          </div>

          <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl overflow-x-auto text-xs font-mono border border-slate-800 max-h-[500px]">
            {generateExportCode()}
          </pre>
        </div>
      )}
    </div>
  );
};
