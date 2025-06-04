import type { BlogPost, BlogPostListItem } from '~/types/blog';
import type { Author } from '~/types/author';

/**
 * Composable for blog-related functionality
 */
export const useBlog = () => {
  const { locale } = useI18n();

  /**
   * Fetch a blog post by slug
   * @param slug The slug of the blog post
   * @returns Async data with the blog post
   */
  const fetchBlogPost = async (slug: string) => {
    return await useLocalizedContent<BlogPost>('blog', { slug });
  };

  /**
   * Fetch all blog posts
   * @param limit Optional limit for the number of posts to fetch
   * @returns Async data with the blog posts
   */
  const fetchBlogPosts = async (limit?: number) => {
    const { data, pending, error, refresh } = await useAsyncData<BlogPostListItem[]>(
      `blog-posts-${locale.value}-${limit}`,
      async () => {
        const query = queryCollection<BlogPostListItem>(`blog_${locale.value}`).order('pubDate', 'DESC');
        
        if (limit) {
          return await query.limit(limit).all();
        }
        
        return await query.all();
      }
    );

    return { data, pending, error, refresh };
  };

  /**
   * Fetch the featured (most recent) blog post
   * @returns Async data with the featured blog post
   */
  const fetchFeaturedBlogPost = async () => {
    const { data, pending, error, refresh } = await useAsyncData<BlogPostListItem>(
      `featured-blog-post-${locale.value}`,
      async () => {
        return await queryCollection<BlogPostListItem>(`blog_${locale.value}`)
          .order('pubDate', 'DESC')
          .first();
      }
    );

    return { data, pending, error, refresh };
  };

  /**
   * Fetch blog posts by author
   * @param authorNamespace The namespace of the author
   * @param authorKey The key of the author
   * @returns Async data with the blog posts
   */
  const fetchBlogPostsByAuthor = async (authorNamespace: string, authorKey: string) => {
    const { data, pending, error, refresh } = await useAsyncData<BlogPostListItem[]>(
      `blog-posts-by-author-${locale.value}-${authorNamespace}-${authorKey}`,
      async () => {
        return await queryCollection<BlogPostListItem>(`blog_${locale.value}`)
          .where('author.namespace', '=', authorNamespace)
          .where('author.key', '=', authorKey)
          .order('pubDate', 'DESC')
          .all();
      }
    );

    return { data, pending, error, refresh };
  };

  /**
   * Calculate the estimated reading time for a blog post
   * @param content The content of the blog post
   * @returns The estimated reading time in minutes
   */
  const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  /**
   * Format a date for display
   * @param date The date to format
   * @returns The formatted date string
   */
  const formatDate = (date: string | Date): string => {
    return new Date(date).toLocaleDateString(locale.value, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return {
    fetchBlogPost,
    fetchBlogPosts,
    fetchFeaturedBlogPost,
    fetchBlogPostsByAuthor,
    calculateReadingTime,
    formatDate
  };
};