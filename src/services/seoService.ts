import { BlogPost } from '../types/blog';

const DEFAULT_TITLE = 'Hotel Mewari Villa | Luxury Heritage Lake View Hotel, Udaipur';
const DEFAULT_DESC =
  'Hotel Mewari Villa is a luxury heritage boutique hotel overlooking Lake Pichola in Udaipur, Rajasthan. Experience authentic Mewari royal charm, rooftop dining at Jalsa Restaurant, and panoramic lake view suites.';
const DEFAULT_IMAGE = 'https://www.mewarivilla.com/assets/images/hero_exterior.jpg';
const SITE_URL = 'https://www.mewarivilla.com';

function setMetaTag(name: string, content: string, isProperty = false) {
  const attr = isProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

/**
 * Dynamically updates document metadata & Google Schema for SEO when viewing a blog post.
 */
export function updateBlogPostSEO(post: BlogPost): () => void {
  const fullUrl = `${SITE_URL}/${post.slug}`;
  const title = `${post.title} | Hotel Mewari Villa Udaipur`;
  const desc = post.excerpt || DEFAULT_DESC;
  const image = post.coverImage.startsWith('http') ? post.coverImage : `${SITE_URL}${post.coverImage}`;

  // Update Page Title
  document.title = title;

  // Update Standard Meta
  setMetaTag('description', desc);
  setCanonical(fullUrl);

  // Update OpenGraph
  setMetaTag('og:type', 'article', true);
  setMetaTag('og:title', title, true);
  setMetaTag('og:description', desc, true);
  setMetaTag('og:image', image, true);
  setMetaTag('og:url', fullUrl, true);
  setMetaTag('og:site_name', 'Hotel Mewari Villa', true);

  // Update Twitter Cards
  setMetaTag('twitter:card', 'summary_large_image');
  setMetaTag('twitter:title', title);
  setMetaTag('twitter:description', desc);
  setMetaTag('twitter:image', image);

  // Inject or update JSON-LD Structured Data Schema for Google BlogPosting
  let schemaScript = document.getElementById('blog-post-schema') as HTMLScriptElement | null;
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.id = 'blog-post-schema';
    schemaScript.type = 'application/ld+json';
    document.head.appendChild(schemaScript);
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullUrl,
    },
    headline: post.title,
    description: desc,
    image: [image],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name || 'Mewari Villa Editor',
    },
    publisher: {
      '@type': 'Hotel',
      name: 'Hotel Mewari Villa',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/mewari-villa-logo.png`,
      },
    },
  };

  schemaScript.textContent = JSON.stringify(structuredData);

  // Return cleanup function to reset to homepage default SEO
  return () => {
    document.title = DEFAULT_TITLE;
    setMetaTag('description', DEFAULT_DESC);
    setCanonical(`${SITE_URL}/`);
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:title', 'Mewari Villa Hotel', true);
    setMetaTag('og:description', DEFAULT_DESC, true);
    setMetaTag('og:image', DEFAULT_IMAGE, true);
    setMetaTag('og:url', `${SITE_URL}/`, true);
    setMetaTag('twitter:title', 'Mewari Villa Hotel');
    setMetaTag('twitter:description', DEFAULT_DESC);
    setMetaTag('twitter:image', DEFAULT_IMAGE);

    const oldSchema = document.getElementById('blog-post-schema');
    if (oldSchema) {
      oldSchema.remove();
    }
  };
}
