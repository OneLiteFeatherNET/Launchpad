import type { ContentProvider, ContentProviderConfig } from '~/composables/content/types';
import { NuxtContentProvider } from '~/composables/content/nuxtContentProvider';
import { HeadlessCmsProvider } from '~/composables/content/headlessCmsProvider';

// Default configuration with Nuxt Content as the default provider
const defaultConfig: ContentProviderConfig = {
  defaultProvider: 'nuxtContent',
  providers: {
    nuxtContent: new NuxtContentProvider(),
    headlessCms: new HeadlessCmsProvider()
  }
};

// Global configuration that can be overridden
let contentConfig: ContentProviderConfig = { ...defaultConfig };

/**
 * Configure the content service
 * @param config Configuration for the content service
 */
export function configureContentService(config: Partial<ContentProviderConfig>) {
  contentConfig = {
    ...contentConfig,
    ...config,
    providers: {
      ...contentConfig.providers,
      ...(config.providers || {})
    }
  };
}

/**
 * Get the current content provider
 * @param providerName Optional name of the provider to use
 * @returns The content provider
 */
export function getContentProvider(providerName?: string): ContentProvider {
  const name = providerName || contentConfig.defaultProvider;
  const provider = contentConfig.providers[name];

  if (!provider) {
    console.error(`Content provider "${name}" not found, using default provider`);
    return contentConfig.providers[contentConfig.defaultProvider];
  }

  return provider;
}

/**
 * Composable for accessing the content service
 * @param providerName Optional name of the provider to use
 * @returns The content service
 */
export function useContentService(providerName?: string) {
  const provider = getContentProvider(providerName);

  return {
    /**
     * Query a collection and return the first result
     * @param collectionName The name of the collection to query
     * @param params Optional query parameters
     * @returns The first result from the collection that matches the query
     */
    queryFirst: <T = any>(collectionName: string, params?: Record<string, any>) => {
      return provider.queryFirst<T>(collectionName, params);
    },

    /**
     * Query a collection and return all results
     * @param collectionName The name of the collection to query
     * @param params Optional query parameters
     * @returns All results from the collection that match the query
     */
    queryAll: <T = any>(collectionName: string, params?: Record<string, any>) => {
      return provider.queryAll<T>(collectionName, params);
    },

    /**
     * Find a document by its slug
     * @param collectionName The name of the collection to query
     * @param slug The slug to search for
     * @returns The document with the matching slug, or null if not found
     */
    findBySlug: <T = any>(collectionName: string, slug: string) => {
      return provider.findBySlug<T>(collectionName, slug);
    }
  };
}
