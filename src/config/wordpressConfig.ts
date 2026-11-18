/**
 * Internal WordPress Configuration for Hotel Mewari Villa
 * The WordPress URL is stored internally here and can also be overridden via .env (VITE_WORDPRESS_URL).
 * No manual sync button or modal is exposed on the public website.
 */
export const WORDPRESS_CONFIG = {
  /**
   * Internal WordPress Website URL.
   * Connected directly to client's live WordPress installation.
   */
  baseUrl: (import.meta as any).env?.VITE_WORDPRESS_URL || 'https://old.mewarivilla.com',

  /**
   * Automatic background check interval:
   * 8 hours = 3 times a day (automatically refreshes and checks for new posts)
   */
  checkIntervalHours: 8,

  /**
   * Local storage cache key for auto-synced posts
   */
  cacheKey: 'mewari_villa_wp_posts_live_v1',

  /**
   * Single post cache prefix
   */
  singlePostCachePrefix: 'mewari_villa_wp_single_live_',
};
