import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Share2, 
  Copy, 
  Check, 
  Sparkles, 
  MapPin, 
  Bookmark, 
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import { BlogPost } from '../types/blog';
import { fetchBlogPostBySlug, fetchBlogPosts } from '../services/wordpressService';
import { HOTEL_INFO, REAL_HOTEL_IMAGES } from '../data/hotelData';
import { updateBlogPostSEO } from '../services/seoService';

interface SingleBlogPageProps {
  slug: string;
  onBack: () => void;
  onSelectPost: (slug: string) => void;
  onOpenEnquiry: (room?: string) => void;
}

export const SingleBlogPage: React.FC<SingleBlogPageProps> = ({
  slug,
  onBack,
  onSelectPost,
  onOpenEnquiry,
}) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let cleanupSEO: (() => void) | null = null;

    const loadPostData = async () => {
      setLoading(true);
      window.scrollTo({ top: 0, behavior: 'instant' });
      try {
        const { post: loadedPost } = await fetchBlogPostBySlug(slug);
        if (isMounted && loadedPost) {
          setPost(loadedPost);
          cleanupSEO = updateBlogPostSEO(loadedPost);
        }

        // Fetch related posts
        const all = await fetchBlogPosts();
        if (isMounted) {
          const others = all.posts.filter((p) => p.slug !== slug).slice(0, 3);
          setRelatedPosts(others);
        }
      } catch (err) {
        console.error('Error loading single blog post:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadPostData();
    return () => {
      isMounted = false;
      if (cleanupSEO) cleanupSEO();
    };
  }, [slug]);

  const getCleanPostUrl = () => {
    return `${window.location.origin}/${post?.slug || slug}`;
  };

  const handleCopyLink = () => {
    const url = getCleanPostUrl();
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShareWhatsApp = () => {
    if (!post) return;
    const url = getCleanPostUrl();
    const text = `Read this story on Hotel Mewari Villa: "${post.title}"\n${url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareFacebook = () => {
    const url = getCleanPostUrl();
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const handleShareTwitter = () => {
    if (!post) return;
    const url = getCleanPostUrl();
    const text = `${post.title} | Hotel Mewari Villa Udaipur`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-20 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#C59B51] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xs font-sans uppercase tracking-widest text-[#78716C]">
          Unfolding story...
        </p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-20 max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-serif text-[#1C1917] mb-3">Story Not Found</h2>
        <p className="text-sm font-body text-[#666666] mb-6">
          The requested article may have been moved or is no longer published.
        </p>
        <button
          onClick={onBack}
          className="px-6 py-2.5 bg-[#1C1917] text-[#FAF8F5] rounded-full text-xs font-sans hover:bg-[#C59B51] transition-colors"
        >
          Return to All Stories
        </button>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-[#FAF8F5] pt-24 pb-24 text-[#1C1917]">
      {/* Top Header / Breadcrumbs Bar */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 mb-8">
        <div className="flex items-center justify-between border-b border-[#EAE4D9] pb-4">
          <button
            onClick={onBack}
            className="group inline-flex items-center text-xs font-sans text-[#78716C] hover:text-[#C59B51] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Stories</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center px-3 py-1.5 bg-white border border-[#EAE4D9] text-[#525252] hover:text-[#C59B51] hover:border-[#C59B51] rounded-full text-xs font-sans transition-colors shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  <span className="text-emerald-700 font-medium">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1 text-[#C59B51]" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Header / Article Title Area */}
      <header className="max-w-4xl mx-auto px-6 sm:px-8 mb-10 text-center">
        {/* Category Pill */}
        <div className="inline-flex items-center space-x-2 mb-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-sans font-semibold uppercase tracking-wider bg-white text-[#A77E36] border border-[#EAE4D9] shadow-2xs">
            {post.category}
          </span>
        </div>

        {/* Grand Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1C1917] leading-tight font-normal mb-6 max-w-3xl mx-auto">
          {post.title}
        </h1>

        {/* Author & Publication Details */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-sans text-[#78716C] pt-2">
          {post.author.avatar && (
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover border border-[#C59B51]/40 shadow-xs"
            />
          )}
          <div className="text-left">
            <div className="font-medium text-[#1C1917]">{post.author.name}</div>
            <div className="text-[11px] text-[#78716C]">{post.author.role || 'Heritage Storyteller'}</div>
          </div>

          <span className="text-[#D6D3D1] hidden sm:inline">•</span>

          <div className="flex items-center">
            <Calendar className="w-3.5 h-3.5 mr-1 text-[#C59B51]" />
            <span>{post.formattedDate}</span>
          </div>

          <span className="text-[#D6D3D1] hidden sm:inline">•</span>

          <div className="flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1 text-[#C59B51]" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </header>

      {/* Hero Featured Cover Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-12">
        <div className="rounded-2xl overflow-hidden shadow-md border border-[#EAE4D9] bg-[#F5F0E8] relative">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-80 sm:h-[460px] md:h-[520px] object-cover object-center"
          />
          <div className="absolute bottom-3 right-4 bg-black/60 backdrop-blur-xs text-white/90 text-[11px] font-sans px-3 py-1 rounded-md">
            Hotel Mewari Villa • Udaipur
          </div>
        </div>
      </div>

      {/* Article Body + Sticky Social Share Sidebar */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Share Sidebar (on desktop) */}
          <aside className="lg:col-span-1 hidden lg:flex flex-col items-center space-y-3 sticky top-28 self-start">
            <span className="text-[10px] uppercase font-sans tracking-widest text-[#78716C] writing-mode-vertical rotate-180 mb-2">
              SHARE
            </span>
            <button
              onClick={handleShareWhatsApp}
              title="Share on WhatsApp"
              className="w-9 h-9 rounded-full bg-white border border-[#EAE4D9] text-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-colors shadow-2xs"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
            <button
              onClick={handleShareFacebook}
              title="Share on Facebook"
              className="w-9 h-9 rounded-full bg-white border border-[#EAE4D9] text-[#1877F2] hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-colors shadow-2xs"
            >
              <span className="font-bold text-xs">f</span>
            </button>
            <button
              onClick={handleShareTwitter}
              title="Share on X"
              className="w-9 h-9 rounded-full bg-white border border-[#EAE4D9] text-[#1C1917] hover:bg-[#1C1917] hover:text-white flex items-center justify-center transition-colors shadow-2xs"
            >
              <span className="font-bold text-xs">𝕏</span>
            </button>
            <button
              onClick={handleCopyLink}
              title="Copy Link"
              className="w-9 h-9 rounded-full bg-white border border-[#EAE4D9] text-[#78716C] hover:text-[#C59B51] hover:border-[#C59B51] flex items-center justify-center transition-colors shadow-2xs"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </aside>

          {/* Main Article Content (Rendered WordPress HTML or Structured Content) */}
          <div className="lg:col-span-11 prose-container">
            <div 
              className="font-body text-[#3A352F] text-base sm:text-[17px] leading-relaxed space-y-6 [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-serif [&_h2]:font-semibold [&_h2]:text-[#1C1917] [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:border-b [&_h2]:border-[#EAE4D9] [&_h2]:pb-2 [&_h3]:text-xl [&_h3]:font-serif [&_h3]:font-semibold [&_h3]:text-[#1C1917] [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:leading-relaxed [&_p]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-5 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-5 [&_ol]:space-y-2 [&_blockquote]:border-l-4 [&_blockquote]:border-[#C59B51] [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:my-6 [&_blockquote]:bg-[#F9F6F0] [&_blockquote]:py-3 [&_blockquote]:rounded-r-md [&_img]:rounded-xl [&_img]:my-6 [&_img]:border [&_img]:border-[#EAE4D9]"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* In-Article Heritage Booking Highlight Card */}
            <div className="my-12 p-8 bg-gradient-to-br from-[#FAF8F5] via-[#F5F0E8] to-[#EAE4D9]/60 rounded-2xl border border-[#C59B51]/40 shadow-xs relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                <div className="space-y-2 text-center sm:text-left">
                  <div className="inline-flex items-center text-xs font-sans font-semibold uppercase tracking-wider text-[#A77E36]">
                    <Sparkles className="w-3.5 h-3.5 mr-1" /> Stay At The Heart of Udaipur
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif text-[#1C1917] font-normal">
                    Experience Lake Pichola from Hotel Mewari Villa
                  </h3>
                  <p className="text-xs sm:text-sm font-body text-[#666666] max-w-lg">
                    Lakeside suites, rooftop dining at Jalsa, and historic landmarks just minutes away on foot.
                  </p>
                </div>
                <div className="shrink-0 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => onOpenEnquiry('Villa Suite Lake View')}
                    className="px-6 py-2.5 bg-[#C59B51] hover:bg-[#A77E36] text-[#1C1917] hover:text-white rounded-full text-xs font-sans font-semibold tracking-wider uppercase transition-colors shadow-xs cursor-pointer"
                  >
                    Check Availability
                  </button>
                  <a
                    href={`https://wa.me/${HOTEL_INFO.whatsappNumber}?text=Hi%20Hotel%20Mewari%20Villa%2C%20I%20am%20reading%20your%20story%20"${encodeURIComponent(post.title)}"%20and%20would%20like%20to%20plan%20a%20stay`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-white border border-[#EAE4D9] hover:border-[#C59B51] text-[#1C1917] rounded-full text-xs font-sans font-medium text-center transition-colors"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Tags Section */}
            {post.tags && post.tags.length > 0 && (
              <div className="pt-6 border-t border-[#EAE4D9] flex flex-wrap items-center gap-2">
                <span className="text-xs font-sans text-[#78716C] mr-2">Tags:</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white border border-[#EAE4D9] rounded-full text-xs font-sans text-[#525252]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author Bio Box */}
            <div className="mt-10 p-6 bg-white rounded-xl border border-[#EAE4D9] flex flex-col sm:flex-row items-center sm:items-start gap-4">
              {post.author.avatar && (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-16 h-16 rounded-full object-cover border border-[#C59B51]/40 shrink-0"
                />
              )}
              <div className="text-center sm:text-left">
                <h4 className="font-serif text-lg text-[#1C1917] font-semibold">
                  {post.author.name}
                </h4>
                <div className="text-xs font-sans text-[#A77E36] mb-2">
                  {post.author.role || 'Heritage Columnist'}
                </div>
                <p className="text-xs font-body text-[#666666] leading-relaxed">
                  Passionate about the living history, culinary traditions, and hidden alleyways of Mewar. Writing stories to help visitors experience authentic Udaipur hospitality at Hotel Mewari Villa.
                </p>
              </div>
            </div>

            {/* Mobile Share Bar */}
            <div className="mt-8 flex lg:hidden items-center justify-between p-4 bg-white rounded-xl border border-[#EAE4D9]">
              <span className="text-xs font-sans text-[#78716C]">Share this article:</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleShareWhatsApp}
                  className="p-2 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={handleShareFacebook}
                  className="p-2 rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <span className="font-bold text-xs px-1">f</span>
                </button>
                <button
                  onClick={handleShareTwitter}
                  className="p-2 rounded-full bg-black/10 text-[#1C1917] hover:bg-black hover:text-white transition-colors"
                  aria-label="X"
                >
                  <span className="font-bold text-xs px-1">𝕏</span>
                </button>
                <button
                  onClick={handleCopyLink}
                  className="p-2 rounded-full bg-gray-100 text-[#525252] hover:text-[#C59B51] transition-colors"
                  aria-label="Copy"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Related Stories Section */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 sm:px-8 mt-20 pt-16 border-t border-[#EAE4D9]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C59B51] font-sans font-semibold block mb-1">
                More from our Journal
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#1C1917]">
                Related Stories &amp; Curated Guides
              </h3>
            </div>
            <button
              onClick={onBack}
              className="hidden sm:inline-flex items-center text-xs font-sans text-[#A77E36] hover:underline"
            >
              View all stories <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((related) => (
              <div
                key={related.id}
                onClick={() => onSelectPost(related.slug)}
                className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-[#EAE4D9] hover:border-[#C59B51] shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-[#F5F0E8]">
                    <img
                      src={related.coverImage}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-[#FAF8F5]/90 backdrop-blur-xs text-[#A77E36]">
                        {related.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center space-x-2 text-[11px] font-sans text-[#78716C] mb-2">
                      <span>{related.formattedDate}</span>
                      <span>•</span>
                      <span>{related.readTime}</span>
                    </div>
                    <h4 className="font-serif text-lg font-semibold text-[#1C1917] group-hover:text-[#A77E36] transition-colors leading-snug line-clamp-2 mb-2">
                      {related.title}
                    </h4>
                    <p className="text-xs font-body text-[#666666] line-clamp-2">
                      {related.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 mt-3 border-t border-[#FAF8F5] flex items-center justify-between text-xs font-sans">
                  <span className="text-[#78716C]">By {related.author.name}</span>
                  <span className="inline-flex items-center text-[#A77E36] font-medium group-hover:translate-x-0.5 transition-transform">
                    Read <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
