<script setup lang="ts">
import ContentPreviewCard from "~/components/home/ContentPreviewCard.vue";
import type { BlogPostListItem } from '~/types/blog';

defineProps({
  title: {
    type: String,
    required: true
  },
  featuredContent: {
    type: Array as () => BlogPostListItem[],
    required: true
  },
  locale: {
    type: String,
    required: true
  }
});
</script>

<template>
  <section class="py-8 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">{{ title }}</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ContentPreviewCard 
          v-for="article in featuredContent" 
          :key="article.slug"
          :blogArticle="article" 
        />
      </div>
    </div>
  </section>
</template>
