export interface BlogAuthor {
  name: string;
  avatar?: string;
  role?: string;
}

export interface BlogPost {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  formattedDate: string;
  readTime: string;
  author: BlogAuthor;
  category: string;
  tags: string[];
  isFeatured?: boolean;
}

export interface BlogFilterOptions {
  category?: string;
  search?: string;
  page?: number;
  perPage?: number;
}
