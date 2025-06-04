<script setup lang="ts">
import {definePageMeta} from "#imports";
import SocialMediaShare from "~/components/blog/SocialMediaShare.vue";
import BlogAuthors from "~/components/blog/BlogAuthors.vue";
import BackButton from "~/components/common/BackButton.vue";
const { locale, t, locales } = useI18n()
const route = useRoute()
const config = useRuntimeConfig()
const { getFeatureFlag } = usePostHogFeatureFlag()
const seoHelper = useSeoHelper({ defaultLocale: 'de' })

definePageMeta({
  layout: 'blog-entry',
});

// Get the slug from the route params
const slug = route.params.slug;
// If slug is an array, use the first element
const slugValue = Array.isArray(slug) ? slug[0] : slug;
console.log('Slug from route params:', slug);
console.log('Processed slug value:', slugValue);

// Fetch the article using the localized content composable
const { data: article, error } = await useLocalizedContent('blog', { "slug": slugValue });
console.log('Article data:', article);
console.log('Error:', error);

// Find translations in other languages if translationKey exists
const alternateLanguages = ref<{locale: string, url: string}[]>([])
if (article.value?.translationKey) {
  const otherLocales = (locales.value || []).filter(l => typeof l === 'object' && l.code !== locale.value)

  for (const otherLocale of otherLocales) {
    if (typeof otherLocale === 'object') {
      // Fetch the translated article
      const { data: translatedArticle } = await useAsyncData(
        `${route.path}_${otherLocale.code}`, 
        () => queryCollection(`blog_${otherLocale.code}`)
          .where("translationKey", "=", article.value?.translationKey)
          .first()
      )

      if (translatedArticle.value) {
        const baseUrl = config.public.siteUrl || 'https://blog.onelitefeather.net'
        alternateLanguages.value.push({
          locale: otherLocale.code,
          url: `${baseUrl}/${otherLocale.code}/${translatedArticle.value.slug}`
        })
      }
    }
  }
}

// Set up SEO metadata
if (article.value) {
  // Apply any custom SEO metadata from the article
  if (article.value.seo) {
    useCustomSeoMeta(article.value.seo)
  }

  // Generate social media preview image
  const img = useImage()
  const previewSocial = img(article.value.headerImage || 'logo.svg', {
    width: 1200,
    height: 630,
    format: 'webp',
    quality: 80,
  })

  // Set basic SEO metadata
  seoHelper.setBasicSeo({
    title: article.value.title || '',
    description: article.value.description || '',
    image: previewSocial,
    type: 'article'
  })

  // Set canonical and alternate language links
  seoHelper.setCanonicalAndAlternates(
    `/${article.value.slug}`,
    article.value.translationKey,
    alternateLanguages.value
  )

  // Apply any custom head settings from the article
  if (article.value.head) {
    useHead(article.value.head)
  }
}

const title = computed(() => {
  if (getFeatureFlag('alternative-title-conversion').value === 'test') {
    return article?.value?.alternativeTitle || article?.value?.title || 'No Title';
  } else {
    return article?.value?.title || 'No Title';
  }
});
</script>

<template>
  <div class="container mx-auto py-4">
    <BackButton />
    <article v-if="article" class="bg-white dark:bg-gray-800 rounded-xxl shadow-md overflow-hidden">
      <NuxtImg v-if="article?.headerImage"
               :src="article?.headerImage"
               :alt="article?.headerImageAlt"
               sizes='xs:300px sm:500px md:700px lg:1200px xl:1920px'
               width='1920px'
               height='1080px'
               fit='cover'
               format='webp'
               quality='80'
               class="aspect-video object-cover rounded-lg w-[48rem] place-self-center" />
      <div class="p-4">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ title }}</h1>
        <time v-if="article?.pubDate" class="text-sm text-gray-500 dark:text-gray-400"><i18n-d :value="new Date(article?.pubDate)"></i18n-d></time>


        <ContentRenderer class="text-gray-700 dark:text-gray-300 mt-2" :value="article">
        </ContentRenderer>

        <!-- Social Media Sharing Buttons -->
        <div class="mt-6">
          <SocialMediaShare
          :url="config.public.siteUrl + '/' + locale + '/' + article.slug"
          :title="article.title"
          :description="article.description || ''"
          :is-large-page="['alles-was-man-ueber-ethanol-wissen-sollte', 'riding-the-rollercoaster-of-automation-with-proxmox-and-ansible', 'plugins-open-for-adoption', 'effizientes-logging-in-paper-plugins', 'dev-blog-1'].includes(article.slug)"
          />
        </div>
        <!-- Author display -->
        <BlogAuthors v-if="article.authors && article.authors.length > 0" :authors="article.authors" />
      </div>
    </article>
  </div>
</template>

<style scoped>

</style>
