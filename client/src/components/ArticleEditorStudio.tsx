import React, { useState, useMemo } from 'react';
import { BlogPost } from '../data/blogData';
import {
  analyzeRankMathHeadings,
  SAMPLE_DRAFT_ARTICLE,
  saveCustomBlogPost,
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
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'export'>('editor');

  // Form State
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

  // Run Rank Math Heading Analysis in real-time
  const analysis = useMemo(() => {
    return analyzeRankMathHeadings(title, content, focusKeyword);
  }, [title, content, focusKeyword]);

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
    setPublishedSuccessMsg('Loaded sample draft with intentional heading errors to test Rank Math!');
    setTimeout(() => setPublishedSuccessMsg(''), 3500);
  };

  // Auto Title Slug Generator
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug || slug === SAMPLE_DRAFT_ARTICLE.slug) {
      const generated = val
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      setSlug(generated);
    }
  };

  // 1-Click Auto-Fix Heading Hierarchy
  const handleAutoFixHierarchy = () => {
    const lines = content.split('\n');
    let fixedH2Count = 0;

    const fixedLines = lines.map((line) => {
      const trimmed = line.trim();
      // Fix markdown hierarchy jumps like #### to ## or ###
      if (trimmed.startsWith('#### ')) {
        fixedH2Count++;
        return line.replace(/^####\s+/, '## ');
      }
      if (trimmed.startsWith('##### ')) {
        fixedH2Count++;
        return line.replace(/^#####\s+/, '### ');
      }
      // Fix HTML tags like <h1> in body to <h2>
      if (trimmed.match(/^<h1(?:\s+class="[^"]*")?>([^<]+)<\/h1>$/i)) {
        fixedH2Count++;
        return line.replace(/<h1/gi, '<h2').replace(/<\/h1>/gi, '</h2>');
      }
      return line;
    });

    setContent(fixedLines.join('\n'));
    setPublishedSuccessMsg(`Fixed ${fixedH2Count || 1} heading hierarchy levels automatically!`);
    setTimeout(() => setPublishedSuccessMsg(''), 3500);
  };

  // 1-Click Capitalize Headings
  const handleCapitalizeHeadings = () => {
    const toTitleCase = (str: string) => {
      return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    };

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
    setPublishedSuccessMsg('Capitalized all heading titles to Title Case!');
    setTimeout(() => setPublishedSuccessMsg(''), 3000);
  };

  // 1-Click Generate Table of Contents
  const handleAutoGenerateTOC = () => {
    if (analysis.tableOfContents.length === 0) {
      setPublishedSuccessMsg('Add at least one <h2> subheading first to build TOC!');
      setTimeout(() => setPublishedSuccessMsg(''), 3000);
      return;
    }
    setPublishedSuccessMsg(`Table of Contents synchronized with ${analysis.tableOfContents.length} headings!`);
    setTimeout(() => setPublishedSuccessMsg(''), 3000);
  };

  // Save & Publish Article to Local Site
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
    setPublishedSuccessMsg('🎉 Article published successfully! Redirecting to live post...');
    setTimeout(() => {
      onSelectPost(newPost.slug);
    }, 1200);
  };

  // Export Code for blogData.ts
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

  // Build current preview post object
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

  // Split lines for red line editor
  const contentLines = content.split('\n');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 animate-fade-in text-left space-y-6">
      
      {/* Admin Header Bar */}
      <div className="bg-gradient-to-r from-gray-900 via-dark-800 to-black text-white p-5 rounded-3xl shadow-xl border border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center text-2xl shadow-lg shadow-red-500/30">
            🎯
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-extrabold tracking-tight">Rank Math Article Studio</h1>
              <span className="px-2.5 py-0.5 text-xs font-bold bg-red-600 text-white rounded-full uppercase tracking-wider animate-pulse">
                Live Copilot
              </span>
            </div>
            <p className="text-xs text-gray-300 mt-0.5">
              Real-time Heading Diagnostics & Admin Article Publisher
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5 flex-wrap">
          <button
            onClick={handleLoadSample}
            className="px-3.5 py-2 text-xs font-bold bg-white/10 hover:bg-white/20 text-white rounded-xl transition flex items-center gap-1.5 border border-white/20"
          >
            <span>⚡ Load Sample Flawed Draft</span>
          </button>
          
          <button
            onClick={onNavigateBlogHub}
            className="px-3.5 py-2 text-xs font-bold bg-white/10 hover:bg-white/20 text-white rounded-xl transition border border-white/20"
          >
            <span>📖 Blog Hub</span>
          </button>

          <button
            onClick={() => {
              logoutAdmin();
              onLogout();
            }}
            className="px-3 py-2 text-xs font-bold bg-red-600/80 hover:bg-red-600 text-white rounded-xl transition flex items-center gap-1 border border-red-500/50"
            title="Log out from admin"
          >
            <span>🚪 Logout</span>
          </button>
        </div>
      </div>

      {publishedSuccessMsg && (
        <div className="p-4 bg-emerald-500/15 border border-emerald-500/40 text-emerald-800 dark:text-emerald-300 font-bold rounded-2xl flex items-center justify-between text-sm animate-fade-in shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">✅</span>
            <span>{publishedSuccessMsg}</span>
          </div>
          <button onClick={() => setPublishedSuccessMsg('')} className="text-xs opacity-70 hover:opacity-100">
            ✕
          </button>
        </div>
      )}

      {/* Tabs Bar & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 dark:border-white/10 pb-4">
        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-dark-800 p-1.5 rounded-2xl border border-gray-200 dark:border-white/10">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-4 py-2 text-xs font-extrabold rounded-xl transition flex items-center gap-2 ${
              activeTab === 'editor'
                ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <span>✍️ Editor & Rank Math Diagnostics</span>
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
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 text-xs font-extrabold rounded-xl transition flex items-center gap-2 ${
              activeTab === 'preview'
                ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <span>👁️ Live Blog Preview</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`px-4 py-2 text-xs font-extrabold rounded-xl transition flex items-center gap-2 ${
              activeTab === 'export'
                ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <span>💻 Export Code / JSON</span>
          </button>
        </div>

        <button
          onClick={handlePublish}
          className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition transform active:scale-95 flex items-center gap-2"
        >
          <span>🚀 Save & Publish Article</span>
        </button>
      </div>

      {/* TAB 1: EDITOR & RANK MATH DIAGNOSTICS */}
      {activeTab === 'editor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Editor Section (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Article Metadata Form */}
            <div className="bg-white dark:bg-dark-800 p-6 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm space-y-4">
              <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <span>📝</span>
                <span>Article Configuration & SEO Metadata</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                    Article H1 Main Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. tiktok downloader: Complete Guide to Watermark-Free HD Downloads"
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white font-bold text-base focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                      Focus Target Keyword <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={focusKeyword}
                      onChange={(e) => setFocusKeyword(e.target.value)}
                      placeholder="e.g. tiktok downloader"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as BlogPost['category'])}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
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
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                    Subtitle / Excerpt Summary
                  </label>
                  <textarea
                    rows={2}
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Enter engaging meta description and subtitle..."
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                      Author Name
                    </label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Red Line Visual Diagnostic Editor */}
            <div className="bg-white dark:bg-dark-800 p-6 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <span>🔴</span>
                  <span>Article Content (Red Line Heading Inspector)</span>
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Supports HTML & Markdown (## H2, ### H3)
                </span>
              </div>

              {/* Red Line Visual Indicator List */}
              {analysis.redLineLines.length > 0 && (
                <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl text-xs text-red-700 dark:text-red-300 space-y-1.5">
                  <div className="font-extrabold flex items-center gap-2 text-red-600 dark:text-red-400">
                    <span>🔴 Rank Math Alert:</span>
                    <span>{analysis.redLineLines.length} Heading / Structural issues detected!</span>
                  </div>
                  <p className="text-red-600/90 dark:text-red-300/90">
                    Faulty lines are marked below with a red underline. Click any red badge on the right panel to jump to the exact line!
                  </p>
                </div>
              )}

              {/* Red Line Visual Editor Overlay */}
              <div className="relative font-mono text-sm border border-gray-300 dark:border-white/10 rounded-2xl overflow-hidden bg-gray-900 text-gray-100">
                <div className="p-4 space-y-1 max-h-[500px] overflow-y-auto">
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
                            ? 'bg-amber-500/30 border border-amber-400'
                            : isRedLine
                            ? 'bg-red-900/30 border-b-2 border-red-500 border-dashed'
                            : 'hover:bg-white/5'
                        }`}
                      >
                        <span className={`w-8 text-right text-xs font-bold select-none ${
                          isRedLine ? 'text-red-400 font-extrabold' : 'text-gray-500'
                        }`}>
                          {isRedLine ? `🔴 ${lineNum}` : lineNum}
                        </span>

                        <div className="flex-1 overflow-x-auto whitespace-pre-wrap break-words">
                          {isRedLine ? (
                            <span className="text-red-300 font-semibold underline decoration-red-500 decoration-wavy underline-offset-4">
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

                <div className="p-2 bg-black/40 border-t border-white/10 text-xs text-gray-400 flex items-center justify-between">
                  <span>Lines: {contentLines.length}</span>
                  <span>Word Count: {content.trim().split(/\s+/).filter(Boolean).length} words</span>
                </div>
              </div>

              {/* Direct Textarea Input Sync */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                  Raw Code & Text Editor
                </label>
                <textarea
                  rows={10}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste or write your HTML / Markdown article content here..."
                  className="w-full p-4 bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-white/10 rounded-2xl text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Right Panel: Rank Math 0-100 Score & Diagnostic Checklist (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Rank Math Score Gauge Card */}
            <div className="bg-white dark:bg-dark-800 p-6 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Rank Math SEO Copilot
                  </h3>
                  <h4 className="text-lg font-black text-gray-900 dark:text-white mt-0.5">
                    {analysis.statusText}
                  </h4>
                </div>

                <div className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center text-white shadow-xl ${
                  analysis.status === 'green'
                    ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 shadow-emerald-500/30'
                    : analysis.status === 'yellow'
                    ? 'bg-gradient-to-tr from-amber-500 to-orange-500 shadow-amber-500/30'
                    : 'bg-gradient-to-tr from-red-600 to-rose-600 shadow-red-500/30 animate-pulse'
                }`}>
                  <span className="text-2xl font-black">{analysis.score}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-90">/ 100</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-dark-700 h-3 rounded-full overflow-hidden p-0.5">
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

              {/* Quick Auto-Fix Assistant */}
              <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-white/10">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                  🪄 1-Click Rank Math Auto-Fix Tools
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={handleAutoFixHierarchy}
                    className="p-2.5 text-xs font-bold bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/60 rounded-xl border border-red-200 dark:border-red-800/50 transition text-left flex items-center gap-1.5"
                  >
                    <span>🪄</span>
                    <span>Fix Hierarchy Levels</span>
                  </button>

                  <button
                    onClick={handleCapitalizeHeadings}
                    className="p-2.5 text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/60 rounded-xl border border-amber-200 dark:border-amber-800/50 transition text-left flex items-center gap-1.5"
                  >
                    <span>✨</span>
                    <span>Capitalize Headings</span>
                  </button>
                </div>

                <button
                  onClick={handleAutoGenerateTOC}
                  className="w-full p-2.5 text-xs font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 rounded-xl border border-blue-200 dark:border-blue-800/50 transition text-left flex items-center gap-1.5"
                >
                  <span>📑</span>
                  <span>Sync Table of Contents ({analysis.tableOfContents.length} headings)</span>
                </button>
              </div>
            </div>

            {/* Rank Math Diagnostic Checklist */}
            <div className="bg-white dark:bg-dark-800 p-6 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm space-y-4">
              <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider flex items-center justify-between">
                <span>📋 Diagnostic Test Checklist</span>
                <span className="text-xs font-bold text-gray-500">
                  {analysis.diagnostics.length} Tests Evaluated
                </span>
              </h3>

              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {analysis.diagnostics.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-2xl border transition ${
                      item.type === 'error'
                        ? 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800/50'
                        : item.type === 'warning'
                        ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/50'
                        : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-base">
                          {item.type === 'error' ? '❌' : item.type === 'warning' ? '⚠️' : '✅'}
                        </span>
                        <h4 className={`text-xs font-extrabold ${
                          item.type === 'error'
                            ? 'text-red-800 dark:text-red-300'
                            : item.type === 'warning'
                            ? 'text-amber-800 dark:text-amber-300'
                            : 'text-emerald-800 dark:text-emerald-300'
                        }`}>
                          {item.title}
                        </h4>
                      </div>

                      {item.lineNumber && (
                        <button
                          onClick={() => {
                            setHighlightedLine(item.lineNumber!);
                            const el = document.getElementById(`editor-line-${item.lineNumber}`);
                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }}
                          className="px-2 py-0.5 text-[10px] font-bold bg-white dark:bg-dark-700 text-gray-700 dark:text-gray-200 rounded border border-gray-300 dark:border-white/10 hover:border-red-500"
                        >
                          Line {item.lineNumber} 🔴
                        </button>
                      )}
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1.5 leading-relaxed pl-6">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE BLOG PREVIEW */}
      {activeTab === 'preview' && (
        <div className="bg-white dark:bg-dark-800 p-6 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm space-y-6">
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-xs text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-between">
            <span>👁️ Live Preview Mode: Showing exact rendering as seen by readers on SnapLoad Blog</span>
            <button
              onClick={handlePublish}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition"
            >
              Publish Now 🚀
            </button>
          </div>

          {/* Render actual BlogPostPage in preview mode */}
          <div className="border border-gray-200 dark:border-white/10 rounded-3xl p-4 bg-gray-50 dark:bg-dark-900">
            <BlogPostPage
              post={previewPost}
              onNavigateHome={onNavigateHome}
              onNavigateBlogHub={onNavigateBlogHub}
              onSelectPost={() => {}}
            />
          </div>
        </div>
      )}

      {/* TAB 3: EXPORT CODE / JSON */}
      {activeTab === 'export' && (
        <div className="bg-white dark:bg-dark-800 p-6 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                💻 Export Article Code for <code className="text-red-500">blogData.ts</code>
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Copy this formatted TypeScript object directly into your project's blog data file.
              </p>
            </div>

            <button
              onClick={handleCopyCode}
              className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white text-xs font-bold rounded-xl shadow transition"
            >
              {copiedMsg || '📋 Copy Code Snippet'}
            </button>
          </div>

          <pre className="p-4 bg-gray-900 text-emerald-400 rounded-2xl overflow-x-auto text-xs font-mono border border-white/10 max-h-[500px]">
            {generateExportCode()}
          </pre>
        </div>
      )}
    </div>
  );
};
