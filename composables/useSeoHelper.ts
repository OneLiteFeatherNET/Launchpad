import { useI18n } from 'vue-i18n'
import { useRuntimeConfig } from 'nuxt/app'

/**
 * Composable for managing SEO metadata
 * @param options SEO options
 * @returns Functions for setting up SEO metadata
 */
export function useSeoHelper(options: {
  defaultLocale?: string;
}) {
  const { locale, locales } = useI18n()
  const config = useRuntimeConfig()
  const defaultLocale = options.defaultLocale || 'de'
  
  /**
   * Set up basic SEO metadata for a page
   * @param metadata Page metadata
   */
  const setBasicSeo = (metadata: {
    title: string;
    description?: string;
    image?: string;
    type?: string;
  }) => {
    useSeoMeta({
      title: metadata.title,
      description: metadata.description,
      ogTitle: metadata.title,
      ogDescription: metadata.description,
      ogImage: metadata.image,
      ogType: metadata.type || 'website',
      twitterTitle: metadata.title,
      twitterDescription: metadata.description,
      twitterImage: metadata.image,
      twitterCard: 'summary_large_image'
    })
  }
  
  /**
   * Set up canonical and alternate language links
   * @param path Current page path
   * @param translationKey Translation key for finding alternate versions
   * @param alternateUrls Optional pre-defined alternate URLs
   */
  const setCanonicalAndAlternates = (
    path: string,
    translationKey?: string,
    alternateUrls?: { locale: string; url: string }[]
  ) => {
    const baseUrl = config.public.siteUrl || 'https://blog.onelitefeather.net'
    const canonicalUrl = `${baseUrl}/${locale.value}${path}`
    
    const links = [
      {
        rel: 'canonical',
        href: canonicalUrl
      }
    ]
    
    // Add alternate language links if provided
    if (alternateUrls && alternateUrls.length > 0) {
      alternateUrls.forEach(alt => {
        links.push({
          rel: 'alternate',
          hreflang: alt.locale,
          href: alt.url
        })
      })
      
      // Add x-default hreflang
      const defaultLocaleUrl = alternateUrls.find(alt => alt.locale === defaultLocale)?.url
      if (locale.value === defaultLocale) {
        links.push({
          rel: 'alternate',
          hreflang: 'x-default',
          href: canonicalUrl
        })
      } else if (defaultLocaleUrl) {
        links.push({
          rel: 'alternate',
          hreflang: 'x-default',
          href: defaultLocaleUrl
        })
      }
    }
    
    useHead({
      link: links
    })
  }
  
  return {
    setBasicSeo,
    setCanonicalAndAlternates
  }
}