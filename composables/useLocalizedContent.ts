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
    `${baseCollectionName}-${locale.value}-${JSON.stringify(queryParams)}`,
    async () => {
      let query = queryCollection(collectionName.value)

      // Apply any query parameters if provided
      if (queryParams) {
        // Log the query parameters for debugging
        console.log('Query params:', queryParams)

        // If we're querying by slug, use all() to get all documents and then filter manually
        // This is more reliable than using where() which might have issues with exact matching
        if (queryParams.slug) {
          const allDocs = await query.all()
          console.log('All docs:', allDocs.length)

          // Find the document with the matching slug
          const doc = allDocs.find(doc => doc.slug === queryParams.slug)
          console.log('Found doc with slug:', doc?.slug)
          return doc
        }

        // For other queries, use the standard where method
        const whereObj = Object.fromEntries(
          Object.entries(queryParams).map(([key, value]) => [key, value])
        )
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
