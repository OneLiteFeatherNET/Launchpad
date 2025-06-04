import type { Author } from './author';

/**
 * Interface for a blog post
 */
export interface BlogPost {
  // Basic metadata
  title: string;
  alternativeTitle?: string;
  description: string;
  slug: string;
  namespace: string;
  key: string;
  
  // Dates
  pubDate: string | Date;
  updatedDate?: string | Date;
  
  // Images
  headerImage?: string;
  headerImageAlt?: string;
  
  // Content
  excerpt?: {
    type: string;
    children: any[];
  };
  
  // Relationships
  author?: {
    namespace: string;
    key: string;
  };
  authors?: Author[];
  
  // Internationalization
  translationKey?: string;
  
  // SEO
  seo?: Record<string, any>;
  head?: Record<string, any>;
  
  // System fields
  _path?: string;
  _locale?: string;
}

/**
 * Interface for blog post list item (used in listings)
 */
export interface BlogPostListItem {
  title: string;
  alternativeTitle?: string;
  description: string;
  slug: string;
  pubDate: string | Date;
  headerImage?: string;
  headerImageAlt?: string;
  author?: {
    namespace: string;
    key: string;
  };
  _path?: string;
}

/**
 * Type for blog post with computed properties
 */
export interface BlogPostWithComputed extends BlogPost {
  formattedDate: string;
  readingTime: number;
}