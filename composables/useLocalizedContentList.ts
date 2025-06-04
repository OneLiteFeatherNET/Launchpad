import { useI18n } from 'vue-i18n'
import { useContentService } from './content/useContentService'

/**
 * Composable for fetching a list of localized content from the content collections
 * @param baseCollectionName The base name of the collection without locale suffix
 * @param queryParams Optional query parameters for filtering the collection
 * @param providerName Optional name of the content provider to use
 * @returns Async data with the localized content list
 */
export function useLocalizedContentList<T = any>(
  baseCollectionName: string, 
  queryParams?: Record<string, any>,
  providerName?: string
) {
  const { locale } = useI18n()
  const contentService = useContentService(providerName)

  // Determine the collection name based on the current locale
  const collectionName = computed(() => `${baseCollectionName}_${locale.value}`)

  // Fetch the data with the appropriate collection name
  const { data, pending, error, refresh } = useAsyncData<T[]>(
    `${baseCollectionName}-list-${locale.value}-${JSON.stringify(queryParams)}`,
    async () => {
      return await contentService.queryAll<T>(collectionName.value, queryParams)
    }
  )

  return {
    data,
    pending,
    error,
    refresh
  }
}