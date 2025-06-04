<script setup lang="ts">
import ArticleCard from "~/components/blog/page/card/ArticleCard.vue";
import {definePageMeta} from "#imports";
import Top1 from "~/components/blog/page/top1/Top1.vue";
const { locale, t } = useI18n()

definePageMeta({
  title: 'tutorials.overview.title',
});
const { data: top1Tutorial} = await useAsyncData('top1-tutorial', () => {
  // @ts-ignore
  return queryCollection('tutorials_'+locale?.value || 'tutorials_de').order('pubDate', 'DESC').first();
});

const {data: allTutorialsData} = await useAsyncData('all-tutorials', () => {
  // @ts-ignore
  return queryCollection('tutorials_'+locale?.value || 'tutorials_de').order('pubDate', 'DESC').all();
});
const allTutorials = allTutorialsData.value?.slice(1); // Remove the first item as it is already displayed in Top1
useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg'
    }
  ]
})
const img = useImage()
const previewSocial = img('images/logo.svg', {
  width: 1200,
  height: 630,
  format: 'webp',
  quality: 80,
});
useSeoMeta({
  description: t('tutorials.overview.description'),
  ogDescription: t('tutorials.overview.description'),
  ogImage: previewSocial,
  twitterTitle: t('tutorials.overview.title'),
  twitterDescription: t('tutorials.overview.description'),
  twitterImage: previewSocial
})
useSchemaOrg({
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: t('tutorials.overview.title'),
  description: t('tutorials.overview.description'),
  url: previewSocial,
  image: previewSocial,
})
</script>

<template>
  <div class="container mx-auto py-4">
    <Top1
        v-if="top1Tutorial"
        :blogArticle="top1Tutorial"
    />
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 lg:mx-16">
      <LazyBlogPageCardArticleCard
          v-for="article in allTutorials"
          :blogArticle="article" />
    </div>
  </div>
</template>

<style scoped>

</style>