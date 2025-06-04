<script setup lang="ts">
import {definePageMeta} from "#imports";
import BackButton from "~/components/common/BackButton.vue";
const { locale, t, locales } = useI18n()
const route = useRoute()
const config = useRuntimeConfig()
const seoHelper = useSeoHelper({ defaultLocale: 'de' })

definePageMeta({
  layout: 'default',
});

// Get the slug from the route params
const slug = route.params.slug;
// If slug is an array, use the first element
const slugValue = Array.isArray(slug) ? slug[0] : slug;
console.log('Timeline slug from route params:', slug);
console.log('Processed timeline slug value:', slugValue);

// Fetch the timeline item using the localized content composable
const { data: timelineItem, error } = await useLocalizedContent('timeline', { "slug": slugValue });
console.log('Timeline item data:', timelineItem);
console.log('Error:', error);

// Find translations in other languages if translationKey exists
const alternateLanguages = ref<{locale: string, url: string}[]>([])
if (timelineItem.value?.translationKey) {
  const otherLocales = (locales.value || []).filter(l => typeof l === 'object' && l.code !== locale.value)

  for (const otherLocale of otherLocales) {
    if (typeof otherLocale === 'object') {
      // Fetch the translated timeline item
      const { data: translatedItem } = await useAsyncData(
        `${route.path}_${otherLocale.code}`, 
        () => queryCollection(`timeline_${otherLocale.code}`)
          .where("translationKey", "=", timelineItem.value?.translationKey)
          .first()
      )

      if (translatedItem.value) {
        const baseUrl = config.public.siteUrl || 'https://blog.onelitefeather.net'
        alternateLanguages.value.push({
          locale: otherLocale.code,
          url: `${baseUrl}/${otherLocale.code}/timeline/${translatedItem.value.slug}`
        })
      }
    }
  }
}

// Set up SEO metadata
if (timelineItem.value) {
  // Generate social media preview image if available
  let previewSocial = null
  if (timelineItem.value.image) {
    const img = useImage()
    previewSocial = img(timelineItem.value.image, {
      width: 1200,
      height: 630,
      format: 'webp',
      quality: 80,
    })
  }

  // Set basic SEO metadata
  seoHelper.setBasicSeo({
    title: timelineItem.value.title || '',
    description: timelineItem.value.description || '',
    image: previewSocial,
    type: 'article'
  })

  // Set canonical and alternate language links
  seoHelper.setCanonicalAndAlternates(
    `/timeline/${timelineItem.value.slug}`,
    timelineItem.value.translationKey,
    alternateLanguages.value
  )
}
</script>

<template>
  <div class="container mx-auto py-4">
    <BackButton />
    <article v-if="timelineItem" class="bg-white dark:bg-gray-800 rounded-xxl shadow-md overflow-hidden">
      <NuxtImg v-if="timelineItem?.image"
               :src="timelineItem?.image"
               sizes='xs:300px sm:500px md:700px lg:1200px xl:1920px'
               width='1920px'
               height='1080px'
               fit='cover'
               format='webp'
               quality='80'
               class="aspect-video object-cover rounded-lg w-[48rem] place-self-center" />
      <div class="p-4">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ timelineItem.title }}</h1>
        <div class="flex items-center mt-2 mb-4">
          <span class="text-lg font-semibold mr-2">{{ timelineItem.year }}</span>
          <span v-if="timelineItem.month" class="text-lg font-semibold">{{ timelineItem.month }}</span>
        </div>

        <div v-if="timelineItem.description" class="text-gray-700 dark:text-gray-300 mb-4">
          {{ timelineItem.description }}
        </div>

        <ContentRenderer v-if="timelineItem.content" class="text-gray-700 dark:text-gray-300 mt-2" :value="timelineItem">
        </ContentRenderer>
      </div>
    </article>
  </div>
</template>

<style scoped>
</style>