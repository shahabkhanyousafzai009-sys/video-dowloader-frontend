import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blogData';
import { BlogThumbnail } from './BlogThumbnail';

interface BlogHubProps {
  onSelectPost: (slug: string) => void;
  onNavigateHome: () => void;
}

export const BlogHub: React.FC<BlogHubProps> = ({ onSelectPost, onNavigateHome }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const posts = Object.values(BLOG_POSTS);
  const categories = ['All', 'TikTok', 'Instagram', 'MP3 Conversion', 'YouTube Shorts', 'Legal & Security'];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-fade-in space-y-8">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold dark:text-white/50 text-dark-500">
        <button onClick={onNavigateHome} className="hover:text-primary-400 transition-colors cursor-pointer">
          Home
        </button>
        <span>/</span>
        <span className="dark:text-white text-dark-900">Blog &amp; Knowledge Base</span>
      </div>

      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-semibold">
          <span>📚 SnapLoad Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold dark:text-white text-dark-900 tracking-tight">
          Tutorials, Guides &amp; <span className="gradient-text">Technical Insights</span>
        </h1>
        <p className="text-sm sm:text-base dark:text-white/50 text-dark-500 max-w-xl mx-auto leading-relaxed">
          Master online media downloading, video format standards, audio bitrate conversion, and digital copyright compliance.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="glass-strong rounded-2xl p-4 border border-white/10 space-y-4 shadow-lg">
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles, guides, tutorials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-11 rounded-xl bg-white/5 border border-white/10 dark:text-white text-dark-900 placeholder:text-white/40 focus:outline-none focus:border-primary-500 text-xs sm:text-sm"
          />
          <svg
            className="w-5 h-5 absolute left-3.5 top-3.5 text-white/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                  : 'glass-subtle dark:text-white/70 text-dark-600 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid with Visual Thumbnails */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            onClick={() => onSelectPost(post.slug)}
            className="glass rounded-3xl p-5 border border-white/10 hover:border-primary-500/40 transition-all cursor-pointer flex flex-col justify-between group shadow-xl hover:shadow-2xl hover:scale-[1.01] space-y-4"
          >
            {/* Featured Article Visual Thumbnail */}
            <BlogThumbnail category={post.category} title={post.title} imageUrl={post.imageUrl} size="sm" />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary-500/20 text-primary-300 border border-primary-500/30">
                  {post.category}
                </span>
                <span className="text-xs dark:text-white/40 text-dark-400 font-mono">
                  {post.readTime}
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-bold dark:text-white text-dark-900 group-hover:text-primary-400 transition-colors leading-snug">
                {post.title}
              </h2>

              <p className="text-xs sm:text-sm dark:text-white/60 text-dark-600 line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-base">{post.author.avatar}</span>
                <div>
                  <p className="font-semibold dark:text-white/80 text-dark-800">{post.author.name}</p>
                  <p className="text-[10px] dark:text-white/40 text-dark-400">{post.publishDate}</p>
                </div>
              </div>

              <span className="text-primary-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Read Article &rarr;
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
