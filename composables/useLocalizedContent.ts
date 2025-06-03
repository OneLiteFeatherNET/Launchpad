import { useI18n } from 'vue-i18n'

/**
 * Composable for fetching localized content from the content collections
 * @param baseCollectionName The base name of the collection without locale suffix
 * @param queryParams Optional query parameters for filtering the collection
 * @returns Async data with the localized content
 */
export function useLocalizedContent(baseCollectionName: string, queryParams?: Record<string, any>) {
  const { locale } = useI18n()

  // Determine the collection name based on the current locale
  const collectionName = computed(() => `${baseCollectionName}_${locale.value}`)

  // Fetch the data with the appropriate collection name
  const { data, pending, error, refresh } = useAsyncData(
    `${baseCollectionName}-${locale.value}`,
    () => {
      let query = queryCollection(collectionName.value)

      // Apply any query parameters if provided
      if (queryParams) {
        // Create a where object with all query parameters
        const whereObj = Object.fromEntries(
          Object.entries(queryParams).map(([key, value]) => [key, value])
        )
        // Apply the where object to the query
        query = query.where(whereObj)
      }

      return query.first()
    }
  )

  return {
    data,
    pending,
    error,
    refresh
  }
}
