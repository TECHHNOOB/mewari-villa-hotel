import { BlogPost, BlogFilterOptions } from '../types/blog';
import { SAMPLE_BLOG_POSTS } from '../data/blogData';
import { REAL_HOTEL_IMAGES } from '../data/hotelData';
import { WORDPRESS_CONFIG } from '../config/wordpressConfig';

const CACHE_TTL_MS = WORDPRESS_CONFIG.checkIntervalHours * 60 * 60 * 1000; // 8 hours (3 times a day)

const FALLBACK_IMAGES = [
  REAL_HOTEL_IMAGES.lakeViewRooftop,
  REAL_HOTEL_IMAGES.royalPalaceUdaipur,
  REAL_HOTEL_IMAGES.heroExterior,
  REAL_HOTEL_IMAGES.propertyCourtyard,
  REAL_HOTEL_IMAGES.lakeBoatRide,
  REAL_HOTEL_IMAGES.jalsaFoodView,
  REAL_HOTEL_IMAGES.heritageArches,
  REAL_HOTEL_IMAGES.lakeViewTwilight,
];

interface CachedData {
  posts: BlogPost[];
  lastChecked: number;
}

/**
 * Get internal WordPress base URL
 */
export function getWordPressBaseUrl(): string {
  const envUrl = (import.meta as any).env?.VITE_WORDPRESS_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim()) {
    return envUrl.trim().replace(/\/+$/, '');
  }
  return (WORDPRESS_CONFIG.baseUrl || 'https://old.mewarivilla.com').trim().replace(/\/+$/, '');
}

/**
 * Utility: Decode common HTML entities from WordPress REST output
 */
export function decodeHtmlEntities(str: string): string {
  if (!str) return '';
  return str
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8217;/g, '’')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&hellip;/g, '…')
    .replace(/&nbsp;/g, ' ');
}

/**
 * Utility: Strip HTML tags to create plain-text preview
 */
export function stripHtml(html: string): string {
  if (!html) return '';
  return decodeHtmlEntities(html.replace(/<[^>]*>?/gm, '')).trim();
}

/**
 * Utility: Calculate approximate reading time
 */
export function calculateReadTime(text: string): string {
  const plain = stripHtml(text);
  const words = plain.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

/**
 * Format ISO date string into luxury editorial format (e.g. "March 15, 2026")
 */
export function formatBlogDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

/**
 * Transform WordPress REST API post item into normalized BlogPost
 */
export function transformWordPressPost(wpPost: any, index: number = 0): BlogPost {
  const rawTitle = wpPost.title?.rendered || 'Untitled Story';
  const cleanTitle = decodeHtmlEntities(rawTitle);

  const rawExcerpt = wpPost.excerpt?.rendered || '';
  const cleanExcerpt = stripHtml(rawExcerpt);

  const rawContent = wpPost.content?.rendered || '';

  // 1. Try embedded featured media
  let coverImage = '';
  const embeddedMedia = wpPost._embedded?.['wp:featuredmedia']?.[0];
  if (embeddedMedia?.source_url) {
    coverImage = embeddedMedia.source_url;
  } else if (embeddedMedia?.media_details?.sizes?.large?.source_url) {
    coverImage = embeddedMedia.media_details.sizes.large.source_url;
  }

  // 2. Try Yoast SEO OpenGraph image
  if (!coverImage && wpPost.yoast_head_json?.og_image?.[0]?.url) {
    coverImage = wpPost.yoast_head_json.og_image[0].url;
  }

  // 3. Try Yoast Schema Image Object
  if (!coverImage && wpPost.yoast_head_json?.schema?.['@graph']) {
    const schemaImg = wpPost.yoast_head_json.schema['@graph'].find(
      (item: any) => item['@type'] === 'ImageObject' && item.url
    );
    if (schemaImg?.url && !schemaImg.url.includes('logo')) {
      coverImage = schemaImg.url;
    }
  }

  // 4. Try first <img> tag inside post content
  if (!coverImage && rawContent) {
    const imgMatch = rawContent.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (imgMatch && imgMatch[1]) {
      coverImage = imgMatch[1];
    }
  }

  // 5. Fallback to curated royal Mewari Villa photography
  if (!coverImage) {
    coverImage = FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
  }

  // Author details
  const embeddedAuthor = wpPost._embedded?.['author']?.[0];
  const authorName = embeddedAuthor?.name || 'Mewari Villa';
  const authorAvatar = embeddedAuthor?.avatar_urls?.['96'] || embeddedAuthor?.avatar_urls?.['48'];

  // Categories & Tags
  const terms = wpPost._embedded?.['wp:term'] || [];
  let categoryName = 'Heritage & Culture';
  const tags: string[] = [];

  if (terms[0] && Array.isArray(terms[0]) && terms[0].length > 0) {
    // Look for first category that is not just uncategorized
    const foundCat = terms[0].find((c: any) => c?.name && c.name.toLowerCase() !== 'uncategorized');
    if (foundCat?.name) {
      categoryName = decodeHtmlEntities(foundCat.name);
    } else if (terms[0][0]?.name) {
      categoryName = decodeHtmlEntities(terms[0][0].name);
    }
  }

  if (terms[1] && Array.isArray(terms[1])) {
    terms[1].forEach((tagObj: any) => {
      if (tagObj?.name) tags.push(decodeHtmlEntities(tagObj.name));
    });
  }

  return {
    id: wpPost.id,
    slug: wpPost.slug || `post-${wpPost.id}`,
    title: cleanTitle,
    excerpt: cleanExcerpt,
    content: rawContent,
    coverImage,
    publishedAt: wpPost.date || new Date().toISOString(),
    formattedDate: formatBlogDate(wpPost.date || new Date().toISOString()),
    readTime: calculateReadTime(rawContent || rawExcerpt),
    author: {
      name: authorName,
      avatar: authorAvatar,
      role: 'Mewari Villa Host',
    },
    category: categoryName,
    tags: tags.length > 0 ? tags : ['Udaipur', 'Heritage', 'Hotel Mewari Villa', 'Lake Pichola'],
    isFeatured: Boolean(wpPost.sticky) || index === 0,
  };
}

/**
 * Get cached posts from localStorage
 */
function getCachedPosts(): CachedData | null {
  try {
    const raw = localStorage.getItem(WORDPRESS_CONFIG.cacheKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedData;
    if (parsed && Array.isArray(parsed.posts) && typeof parsed.lastChecked === 'number') {
      return parsed;
    }
  } catch {
    // Ignore storage parse errors
  }
  return null;
}

/**
 * Save posts to localStorage cache
 */
function setCachedPosts(posts: BlogPost[]): void {
  try {
    const data: CachedData = {
      posts,
      lastChecked: Date.now(),
    };
    localStorage.setItem(WORDPRESS_CONFIG.cacheKey, JSON.stringify(data));
  } catch (err) {
    console.warn('Could not cache blog posts:', err);
  }
}

/**
 * Fetch from live internal WordPress API
 */
async function fetchFromWordPressInternal(): Promise<BlogPost[] | null> {
  const wpBase = getWordPressBaseUrl();
  if (!wpBase) return null;

  try {
    const apiUrl = `${wpBase}/wp-json/wp/v2/posts?_embed=true&per_page=30`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) return null;

    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    const posts = data.map((postItem, idx) => transformWordPressPost(postItem, idx));
    setCachedPosts(posts);
    return posts;
  } catch (err) {
    console.warn('Silent WordPress fetch notice:', err);
    return null;
  }
}

/**
 * Fetch Blog Posts with Automatic Background Checking:
 * - Checks automatically 2-3 times a day (every 8 hours).
 * - If cache is valid, serves instantly.
 * - If cache expired or empty, triggers internal WordPress check to old.mewarivilla.com.
 * - If WordPress is slow or unreachable, seamlessly displays cached/sample posts.
 */
export async function fetchBlogPosts(options?: BlogFilterOptions): Promise<{ posts: BlogPost[] }> {
  const cached = getCachedPosts();
  const now = Date.now();
  let basePosts: BlogPost[] = [];

  // Check if cache is fresh (less than 8 hours old = 3 checks a day)
  if (cached && now - cached.lastChecked < CACHE_TTL_MS && cached.posts.length > 0) {
    basePosts = cached.posts;
  } else {
    // Time to automatically check WordPress in the background
    const freshPosts = await fetchFromWordPressInternal();
    if (freshPosts && freshPosts.length > 0) {
      basePosts = freshPosts;
    } else if (cached && cached.posts.length > 0) {
      // Keep using existing cached posts if temporary connection hiccup
      basePosts = cached.posts;
    } else {
      // Fallback
      basePosts = SAMPLE_BLOG_POSTS;
    }
  }

  // Filter in memory for category and search
  let filtered = [...basePosts];
  if (options?.category && options.category !== 'All') {
    filtered = filtered.filter((p) => p.category.toLowerCase() === options.category?.toLowerCase());
  }
  if (options?.search && options.search.trim()) {
    const q = options.search.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return { posts: filtered };
}

/**
 * Fetch a single blog post by its slug (checks cache, then live WordPress, then fallback)
 */
export async function fetchBlogPostBySlug(slug: string): Promise<{ post: BlogPost | null }> {
  // 1. Check local cache first
  const cached = getCachedPosts();
  if (cached) {
    const matched = cached.posts.find((p) => p.slug === slug);
    if (matched) return { post: matched };
  }

  // 2. Try fetching directly from WordPress endpoint
  const wpBase = getWordPressBaseUrl();
  if (wpBase) {
    try {
      const apiUrl = `${wpBase}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed=true`;
      const response = await fetch(apiUrl, {
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const post = transformWordPressPost(data[0], 0);
          return { post };
        }
      }
    } catch {
      // Silent fallback
    }
  }

  // 3. Fallback to sample posts
  const sampleMatch = SAMPLE_BLOG_POSTS.find((p) => p.slug === slug);
  if (sampleMatch) return { post: sampleMatch };

  if (SAMPLE_BLOG_POSTS.length > 0) {
    return { post: SAMPLE_BLOG_POSTS[0] };
  }

  return { post: null };
}
