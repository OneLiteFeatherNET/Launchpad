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

// Fetch the tutorial using the localized content composable
const { data: tutorial, error } = await useLocalizedContent('tutorials', { "slug": slugValue });
console.log('Tutorial data:', tutorial);
console.log('Error:', error);

// Find translations in other languages if translationKey exists
const alternateLanguages = ref<{locale: string, url: string}[]>([])
if (tutorial.value?.translationKey) {
  const otherLocales = (locales.value || []).filter(l => typeof l === 'object' && l.code !== locale.value)

  for (const otherLocale of otherLocales) {
    if (typeof otherLocale === 'object') {
      // Fetch the translated tutorial
      const { data: translatedTutorial } = await useAsyncData(
        `${route.path}_${otherLocale.code}`, 
        () => queryCollection(`tutorials_${otherLocale.code}`)
          .where("translationKey", "=", tutorial.value?.translationKey)
          .first()
      )

      if (translatedTutorial.value) {
        const baseUrl = config.public.siteUrl || 'https://blog.onelitefeather.net'
        alternateLanguages.value.push({
          locale: otherLocale.code,
          url: `${baseUrl}/${otherLocale.code}/${translatedTutorial.value.slug}`
        })
      }
    }
  }
}

// Set up SEO metadata
if (tutorial.value) {
  // Apply any custom SEO metadata from the tutorial
  if (tutorial.value.seo) {
    useCustomSeoMeta(tutorial.value.seo)
  }

  // Generate social media preview image
  const img = useImage()
  const previewSocial = img(tutorial.value.headerImage || 'logo.svg', {
    width: 1200,
    height: 630,
    format: 'webp',
    quality: 80,
  })

  // Set basic SEO metadata
  seoHelper.setBasicSeo({
    title: tutorial.value.title || '',
    description: tutorial.value.description || '',
    image: previewSocial,
    type: 'article'
  })

  // Set canonical and alternate language links
  seoHelper.setCanonicalAndAlternates(
    `/${tutorial.value.slug}`,
    tutorial.value.translationKey,
    alternateLanguages.value
  )

  // Apply any custom head settings from the tutorial
  if (tutorial.value.head) {
    useHead(tutorial.value.head)
  }
}

const title = computed(() => {
  if (getFeatureFlag('alternative-title-conversion').value === 'test') {
    return tutorial?.value?.alternativeTitle || tutorial?.value?.title || 'No Title';
  } else {
    return tutorial?.value?.title || 'No Title';
  }
});
</script>

<template>
  <div class="container mx-auto py-4">
    <BackButton />
    <article v-if="tutorial" class="bg-white dark:bg-gray-800 rounded-xxl shadow-md overflow-hidden">
      <NuxtImg v-if="tutorial?.headerImage"
               :src="tutorial?.headerImage"
               :alt="tutorial?.headerImageAlt"
               sizes='xs:300px sm:500px md:700px lg:1200px xl:1920px'
               width='1920px'
               height='1080px'
               fit='cover'
               format='webp'
               quality='80'
               class="aspect-video object-cover rounded-lg w-[48rem] place-self-center" />
      <div class="p-4">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ title }}</h1>
        <time v-if="tutorial?.pubDate" class="text-sm text-gray-500 dark:text-gray-400"><i18n-d :value="new Date(tutorial?.pubDate)"></i18n-d></time>

        <ContentRenderer class="text-gray-700 dark:text-gray-300 mt-2" :value="tutorial">
        </ContentRenderer>

        <!-- Social Media Sharing Buttons -->
        <div class="mt-6">
          <SocialMediaShare
          :url="config.public.siteUrl + '/' + locale + '/' + tutorial.slug"
          :title="tutorial.title"
          :description="tutorial.description || ''"
          />
        </div>
        <!-- Author display -->
        <BlogAuthors v-if="tutorial.authors && tutorial.authors.length > 0" :authors="tutorial.authors" />
      </div>
    </article>
  </div>
</template>

<style scoped>

</style>