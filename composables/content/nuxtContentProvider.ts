import type { ContentProvider } from '~/composables/content/types';

/**
 * Nuxt Content provider implementation
 * This provider uses Nuxt Content's queryCollection function to retrieve content
 */
export class NuxtContentProvider implements ContentProvider {
  /**
   * Query a collection and return the first result
   * @param collectionName The name of the collection to query
   * @param params Optional query parameters
   * @returns The first result from the collection that matches the query
   */
  async queryFirst<T = any>(collectionName: string, params?: Record<string, any>): Promise<T | null> {
    try {
      let query = queryCollection<T>(collectionName);

      // Apply query parameters if provided
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          query = query.where(key, '=', value);
        });
      }

      return await query.first();
    } catch (error) {
      console.error(`Error querying collection ${collectionName}:`, error);
      return null;
    }
  }

  /**
   * Query a collection and return all results
   * @param collectionName The name of the collection to query
   * @param params Optional query parameters
   * @returns All results from the collection that match the query
   */
  async queryAll<T = any>(collectionName: string, params?: Record<string, any>): Promise<T[]> {
    try {
      let query = queryCollection<T>(collectionName);

      // Apply query parameters if provided
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          query = query.where(key, '=', value);
        });
      }

      return await query.all();
    } catch (error) {
      console.error(`Error querying collection ${collectionName}:`, error);
      return [];
    }
  }

  /**
   * Find a document by its slug
   * @param collectionName The name of the collection to query
   * @param slug The slug to search for
   * @returns The document with the matching slug, or null if not found
   */
  async findBySlug<T = any>(collectionName: string, slug: string): Promise<T | null> {
    try {
      // Get all documents and find the one with the matching slug
      // This is more reliable than using where() which might have issues with exact matching
      const allDocs = await this.queryAll<T>(collectionName);

      // Find the document with the matching slug
      const doc = allDocs.find((doc: any) => doc.slug === slug);
      return doc || null;
    } catch (error) {
      console.error(`Error finding document by slug in collection ${collectionName}:`, error);
      return null;
    }
  }
}
