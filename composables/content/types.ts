/**
 * Interface for content providers
 * This interface defines the methods that all content providers must implement
 */
export interface ContentProvider {
  /**
   * Query a collection and return the first result
   * @param collectionName The name of the collection to query
   * @param params Optional query parameters
   * @returns The first result from the collection that matches the query
   */
  queryFirst<T = any>(collectionName: string, params?: Record<string, any>): Promise<T | null>;

  /**
   * Query a collection and return all results
   * @param collectionName The name of the collection to query
   * @param params Optional query parameters
   * @returns All results from the collection that match the query
   */
  queryAll<T = any>(collectionName: string, params?: Record<string, any>): Promise<T[]>;

  /**
   * Find a document by its slug
   * @param collectionName The name of the collection to query
   * @param slug The slug to search for
   * @returns The document with the matching slug, or null if not found
   */
  findBySlug<T = any>(collectionName: string, slug: string): Promise<T | null>;
}

/**
 * Configuration for content providers
 */
export interface ContentProviderConfig {
  /**
   * The default provider to use
   */
  defaultProvider: string;
  
  /**
   * The available providers
   */
  providers: Record<string, ContentProvider>;
}