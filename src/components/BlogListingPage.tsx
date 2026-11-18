import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Clock, 
  Calendar, 
  ArrowRight, 
  ArrowLeft, 
  BookOpen, 
  RefreshCw 
} from 'lucide-react';
import { BlogPost } from '../types/blog';
import { fetchBlogPosts } from '../services/wordpressService';
import { HOTEL_INFO } from '../data/hotelData';

interface BlogListingPageProps {
  onBack: () => void;
  onSelectPost: (slug: string) => void;
  onOpenEnquiry: (room?: string) => void;
}

const CATEGORIES = [
  'All',
  'Heritage & Culture',
  'Udaipur Travel',
  'Culinary & Dining',
  'Villa Stories'
];

export const BlogListingPage: React.FC<BlogListingPageProps> = ({
  onBack,
  onSelectPost,
  onOpenEnquiry,
}) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const loadPosts = async () => {
    setLoading(true);
    try {
      const result = await fetchBlogPosts({
        category: selectedCategory,
        search: searchQuery,
      });
      setPosts(result.posts);
    } catch (err) {
      console.warn('Error loading stories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadPosts();
  };

  // Separate featured post if viewing 'All' and no search
  const featuredPost = (selectedCategory === 'All' && !searchQuery.trim()) 
    ? (posts.find((p) => p.isFeatured) || posts[0]) 
    : null;
    
  const gridPosts = featuredPost 
    ? posts.filter((p) => p.id !== featuredPost.id) 
    : posts;

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-20">
      {/* Top Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-6">
        <div className="flex items-center justify-between border-b border-[#EAE4D9] pb-4">
          <div className="flex items-center space-x-3 text-xs font-sans">
            <button
              onClick={onBack}
              className="group flex items-center text-[#78716C] hover:text-[#C59B51] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Home</span>
            </button>
            <span className="text-[#D6D3D1]">/</span>
            <span className="text-[#1C1917] font-medium">Mewari Journal</span>
          </div>
        </div>
      </div>

      {/* Editorial Hero Banner */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-4 pb-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center space-x-2 mb-3">
            <span className="w-8 h-px bg-[#C59B51]"></span>
            <span className="text-xs uppercase tracking-widest text-[#C59B51] font-sans font-semibold">
              The Mewari Chronicles &amp; Journal
            </span>
            <span className="w-8 h-px bg-[#C59B51]"></span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1C1917] font-normal leading-tight mb-4">
            Stories of Royal Heritage, Lakeside Serenities &amp; Udaipur Curiosities
          </h1>

          <p className="text-sm sm:text-base font-body text-[#666666] leading-relaxed">
            Immerse yourself in timeless Rajasthani legends, insider guides to Lake Pichola's hidden ghats, royal recipes from our Jalsa rooftop, and unforgettable travel memories.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="mt-10 max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-sans whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1C1917] text-[#FAF8F5] shadow-xs'
                    : 'bg-white text-[#666666] border border-[#EAE4D9] hover:border-[#C59B51] hover:text-[#1C1917]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, guides..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#EAE4D9] rounded-full text-xs text-[#1C1917] placeholder-[#999999] focus:outline-hidden focus:border-[#C59B51] shadow-2xs"
            />
            <Search className="w-4 h-4 text-[#999999] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </form>
        </div>
      </section>

      {/* Loading Skeleton */}
      {loading && (
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 text-center">
          <RefreshCw className="w-8 h-8 text-[#C59B51] animate-spin mx-auto mb-4" />
          <p className="text-xs font-sans tracking-wider uppercase text-[#78716C]">
            Gathering stories from the archive...
          </p>
        </div>
      )}

      {/* Main Content Area */}
      {!loading && (
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          {/* 1. Sleek Compact Featured Post Card */}
          {featuredPost && (
            <article 
              onClick={() => onSelectPost(featuredPost.slug)}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-[#EAE4D9] hover:border-[#C59B51]/60 shadow-xs hover:shadow-md transition-all duration-300 max-w-5xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-stretch">
                {/* Image side - strictly constrained compact height */}
                <div className="md:col-span-5 relative h-52 sm:h-60 md:h-72 overflow-hidden bg-[#F5F0E8]">
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold tracking-wider uppercase bg-[#FAF8F5]/90 backdrop-blur-md text-[#A77E36] border border-[#EAE4D9]">
                      Featured Story
                    </span>
                  </div>
                </div>

                {/* Content side - refined and compact */}
                <div className="md:col-span-7 p-5 sm:p-6 md:p-7 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex items-center space-x-2 text-[11px] font-sans text-[#78716C] mb-2">
                      <span className="font-semibold text-[#C59B51] uppercase tracking-wider">
                        {featuredPost.category}
                      </span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl md:text-2xl font-serif text-[#1C1917] group-hover:text-[#A77E36] transition-colors leading-snug mb-2 line-clamp-2">
                      {featuredPost.title}
                    </h2>

                    <p className="text-xs sm:text-sm font-body text-[#666666] leading-relaxed line-clamp-2 sm:line-clamp-3 mb-4">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="border-t border-[#F2ECE1] pt-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      {featuredPost.author.avatar && (
                        <img
                          src={featuredPost.author.avatar}
                          alt={featuredPost.author.name}
                          className="w-7 h-7 rounded-full object-cover border border-[#EAE4D9]"
                        />
                      )}
                      <div>
                        <div className="text-xs font-sans font-medium text-[#1C1917]">
                          {featuredPost.author.name}
                        </div>
                        <div className="text-[10px] font-sans text-[#78716C]">
                          {featuredPost.formattedDate}
                        </div>
                      </div>
                    </div>

                    <span className="inline-flex items-center text-xs font-sans font-medium text-[#A77E36] group-hover:translate-x-1 transition-transform">
                      Read Story <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* 2. Blog Posts Grid */}
          {gridPosts.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-6 border-b border-[#EAE4D9] pb-3">
                <h3 className="text-xl font-serif text-[#1C1917]">
                  {selectedCategory === 'All' ? 'Latest Stories & Guides' : `${selectedCategory} Articles`}
                </h3>
                <span className="text-xs font-sans text-[#78716C]">
                  {gridPosts.length} {gridPosts.length === 1 ? 'article' : 'articles'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {gridPosts.map((post) => (
                  <article
                    key={post.id}
                    onClick={() => onSelectPost(post.slug)}
                    className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-[#EAE4D9] hover:border-[#C59B51]/60 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Thumbnail */}
                      <div className="relative h-52 overflow-hidden bg-[#F5F0E8]">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-[#FAF8F5]/90 backdrop-blur-xs text-[#A77E36] border border-[#EAE4D9]">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-center space-x-2 text-[11px] font-sans text-[#78716C] mb-2.5">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {post.formattedDate}
                          </span>
                          <span>•</span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {post.readTime}
                          </span>
                        </div>

                        <h4 className="text-lg font-serif font-semibold text-[#1C1917] group-hover:text-[#A77E36] transition-colors leading-snug mb-2.5 line-clamp-2">
                          {post.title}
                        </h4>

                        <p className="text-xs font-body text-[#666666] leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="p-5 pt-0 border-t border-[#FAF8F5] mt-4 flex items-center justify-between text-xs font-sans">
                      <span className="text-[#78716C] font-medium truncate max-w-[150px]">
                        By {post.author.name}
                      </span>
                      <span className="inline-flex items-center text-[#A77E36] font-medium group-hover:translate-x-0.5 transition-transform">
                        Read Story <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-2xl border border-[#EAE4D9] p-12 text-center max-w-lg mx-auto">
              <BookOpen className="w-10 h-10 text-[#C59B51] mx-auto mb-3" />
              <h3 className="text-xl font-serif text-[#1C1917] mb-2">No Stories Found</h3>
              <p className="text-xs font-body text-[#666666] mb-6">
                No articles matched your criteria. Try searching for something else or clear the filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  loadPosts();
                }}
                className="px-5 py-2.5 bg-[#1C1917] text-[#FAF8F5] rounded-full text-xs font-sans hover:bg-[#C59B51] transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Luxury Reservation Invitation Banner */}
          <section className="bg-gradient-to-r from-[#1C1917] via-[#2A2521] to-[#1C1917] text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden border border-[#C59B51]/20">
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-[#DFC088] font-sans font-medium block mb-2">
                Experience Udaipur In Person
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-normal text-white mb-3">
                Let These Stories Become Your Next Unforgettable Getaway
              </h3>
              <p className="text-xs sm:text-sm font-body text-[#D6D3D1] leading-relaxed mb-6">
                Wake up to glistening views of Lake Pichola, private heritage suites, and handcrafted hospitality right in the heart of royal Udaipur.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onOpenEnquiry('Villa Suite Lake View')}
                  className="px-6 py-3 bg-[#C59B51] hover:bg-[#A77E36] text-[#1C1917] hover:text-white rounded-full text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-200 shadow-md cursor-pointer"
                >
                  Reserve Your Suite
                </button>
                <a
                  href={`https://wa.me/${HOTEL_INFO.whatsappNumber}?text=Hi%20Hotel%20Mewari%20Villa%2C%20I%20was%20reading%20your%20blog%20and%20would%20like%20to%20inquire%20about%20stay%20availability`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-sans font-medium tracking-wide border border-white/20 transition-all duration-200"
                >
                  WhatsApp Concierge
                </a>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
