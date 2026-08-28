import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blogData';
import { getMergedBlogPosts } from '../utils/blogStore';
import { BlogThumbnail } from './BlogThumbnail';

interface BlogHubProps {
  onSelectPost: (slug: string) => void;
  onNavigateHome: () => void;
  onOpenAdminStudio?: () => void;
}

export const BlogHub: React.FC<BlogHubProps> = ({ onSelectPost, onNavigateHome, onOpenAdminStudio }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'SnapLoad Knowledge Base — Tutorials, Guides & Media Insights';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore SnapLoad Knowledge Base for expert guides on downloading TikTok videos without watermarks, Instagram Reels in 1080p HD, and converting video links to 320kbps MP3 audio.'
      );
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://snaploaddownload.com/blog');
    }

    const blogHubSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Blog',
          '@id': 'https://snaploaddownload.com/blog#blog',
          'name': 'SnapLoad Knowledge Base',
          'description': 'Master online media downloading, video format standards, audio bitrate conversion, and digital copyright compliance.',
          'url': 'https://snaploaddownload.com/blog',
          'publisher': {
            '@type': 'Organization',
            'name': 'SnapLoad',
            'url': 'https://snaploaddownload.com/',
            'logo': 'https://snaploaddownload.com/logo.png',
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://snaploaddownload.com/blog#breadcrumb',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://snaploaddownload.com/',
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Blog',
              'item': 'https://snaploaddownload.com/blog',
            },
          ],
        },
      ],
    };

    let scriptTag = document.getElementById('blog-hub-jsonld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'blog-hub-jsonld';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(blogHubSchema);

    return () => {
      if (scriptTag) scriptTag.remove();
    };
  }, []);

  const posts = Object.values(getMergedBlogPosts());
  const categories = ['All', 'TikTok', 'Instagram', 'MP3 Conversion', 'YouTube Shorts', 'Legal & Security'];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const remainingPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : (filteredPosts.length === 1 ? filteredPosts : []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 animate-fade-in space-y-10 text-left">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between gap-4">
        <nav className="flex items-center gap-2 text-xs font-semibold dark:text-white/50 text-slate-500">
          <button onClick={onNavigateHome} className="hover:text-primary-400 transition-colors cursor-pointer">
            Home
          </button>
          <span>/</span>
          <span className="dark:text-white text-slate-900 font-bold">Blog &amp; Knowledge Base</span>
        </nav>

        {onOpenAdminStudio && (
          <button
            onClick={onOpenAdminStudio}
            className="px-3.5 py-1.5 text-xs font-extrabold bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-xl shadow-md transition flex items-center gap-1.5"
          >
            <span>🔐 Rank Math Admin Studio</span>
          </button>
        )}
      </div>

      {/* Hero Header */}
      <header className="glass-strong rounded-3xl p-8 sm:p-12 border border-slate-200/80 dark:border-white/10 shadow-2xl space-y-6 text-center">
        <div className="flex items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-400 text-xs font-extrabold">
            <span>📚 SnapLoad Knowledge Base</span>
          </div>

          {onOpenAdminStudio && (
            <button
              onClick={onOpenAdminStudio}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-extrabold hover:bg-red-500/20 transition cursor-pointer"
            >
              <span>✍️ Write Article & Rank Math Check</span>
            </button>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight max-w-4xl mx-auto">
          Tutorials, Guides &amp; <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Technical Insights</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
          Master online media downloading, video format standards, audio bitrate conversion, and digital copyright compliance.
        </p>

        {/* Real-Time Search & Category Filters */}
        <div className="pt-4 max-w-3xl mx-auto space-y-4">
          <div className="relative">
            <svg
              className="w-5 h-5 absolute left-4 top-3.5 text-slate-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search guides, tutorials, format specs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-white/10 border border-slate-200 dark:border-white/15 text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/40 focus:ring-2 focus:ring-primary-500/40 shadow-sm transition-all outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-500 to-indigo-600 text-white border-transparent shadow-md'
                      : 'glass-subtle dark:text-white/70 text-slate-700 border-slate-200 dark:border-white/10 hover:border-primary-500/40 hover:bg-slate-100 dark:hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Featured Article Card (Top Article on Desktop) */}
      {featuredPost && selectedCategory === 'All' && !searchQuery && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-white/40">
            <span>⭐ Featured Guide</span>
          </div>

          <article
            onClick={() => onSelectPost(featuredPost.slug)}
            className="glass-strong rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 hover:border-primary-500/40 transition-all cursor-pointer group shadow-2xl hover:shadow-primary-500/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Visual Thumbnail */}
            <div className="lg:col-span-6 w-full">
              <BlogThumbnail category={featuredPost.category} title={featuredPost.title} imageUrl={featuredPost.imageUrl} size="lg" />
            </div>

            {/* Article Details */}
            <div className="lg:col-span-6 space-y-4 flex flex-col justify-between h-full py-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-500/15 text-primary-600 dark:text-primary-300 border border-primary-500/30">
                    {featuredPost.category}
                  </span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono">
                    {featuredPost.readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors leading-tight">
                  {featuredPost.title}
                </h2>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium line-clamp-3">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{featuredPost.author.avatar}</span>
                  <div>
                    <p className="font-bold text-xs text-slate-900 dark:text-white">{featuredPost.author.name}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{featuredPost.publishDate}</p>
                  </div>
                </div>

                <span className="px-4 py-2 rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-400 font-bold text-xs group-hover:bg-primary-500 group-hover:text-white transition-all flex items-center gap-1">
                  Read Full Guide &rarr;
                </span>
              </div>
            </div>
          </article>
        </section>
      )}

      {/* Desktop 3-Column Articles Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            {selectedCategory === 'All' ? 'All Knowledge Base Articles' : `${selectedCategory} Articles`}
          </h2>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
          </span>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 glass-subtle rounded-3xl border border-slate-200 dark:border-white/10 space-y-3">
            <p className="text-3xl">🔍</p>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              No matching articles found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Try adjusting your search terms or category selection above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {(selectedCategory === 'All' && !searchQuery ? remainingPosts : filteredPosts).map((post) => (
              <article
                key={post.slug}
                onClick={() => onSelectPost(post.slug)}
                className="glass-strong rounded-3xl p-5 border border-slate-200/80 dark:border-white/10 hover:border-primary-500/40 transition-all cursor-pointer flex flex-col justify-between group shadow-lg hover:shadow-2xl hover:scale-[1.01] space-y-4"
              >
                {/* Visual Thumbnail */}
                <BlogThumbnail category={post.category} title={post.title} imageUrl={post.imageUrl} size="sm" />

                <div className="space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary-500/15 text-primary-600 dark:text-primary-300 border border-primary-500/30">
                        {post.category}
                      </span>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono">
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed font-medium">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs mt-auto">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{post.author.avatar}</span>
                      <div>
                        <p className="font-bold text-[11px] text-slate-900 dark:text-white">{post.author.name}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">{post.publishDate}</p>
                      </div>
                    </div>

                    <span className="text-primary-500 dark:text-primary-400 font-bold text-xs group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                      Read &rarr;
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
