<script setup lang="ts">
import type { BlogDeCollectionItem, BlogEnCollectionItem} from '@nuxt/content';
const {locale} = useI18n();
const {blogArticle} = defineProps<{
  blogArticle: BlogDeCollectionItem | BlogEnCollectionItem;
}>();
</script>

<template>
  <article class="bg-white dark:bg-gray-800 rounded-xxl shadow-md overflow-hidden xl:mx-80">
    <NuxtLink :to="`/${locale}/${blogArticle.slug}`">
      <NuxtImg v-if="blogArticle.headerImage"
               :src="blogArticle.headerImage"
               :alt="blogArticle.headerImageAlt"
               sizes='xs:300px sm:500px md:700px lg:1200px xl:1920px'
               width='1920px'
               height='1080px'
               fit='outside'
               format='webp'
               quality='80'
               class="w-full h-96 object-cover rounded-xxl" />
      <div class="p-4">
        <h1 class="text-xl font-bold text-on-surface dark:text-white">{{ blogArticle.title }}</h1>
        <time class="text-sm text-on-surface-variant dark:text-white">
          <i18n-d :value="blogArticle.pubDate"></i18n-d>
        </time>
        <p class="text-on-surface-variant mt-4 dark:text-white">{{ blogArticle.description }}</p>
      </div>
    </NuxtLink>
  </article>
</template>

<style scoped>
</style>
