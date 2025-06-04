<script setup lang="ts">
import { definePageMeta } from "#imports";
const { locale } = useI18n();
const seoHelper = useSeoHelper({ defaultLocale: 'de' });

definePageMeta({
  layout: 'default',
});

// Fetch all timeline items using the localized content composable
const { data: timelineItems } = await useLocalizedContent('timeline');

// Sort timeline items by year (and month if available)
const sortedTimelineItems = computed(() => {
  if (!timelineItems.value) return [];
  
  return [...timelineItems.value].sort((a, b) => {
    // First compare by year
    const yearA = parseInt(a.year) || 0;
    const yearB = parseInt(b.year) || 0;
    
    if (yearA !== yearB) {
      return yearB - yearA; // Descending order (newest first)
    }
    
    // If years are the same, compare by month if available
    if (a.month && b.month) {
      return a.month.localeCompare(b.month);
    }
    
    // If one has a month and the other doesn't, the one with a month comes first
    if (a.month) return -1;
    if (b.month) return 1;
    
    return 0;
  });
});

// Set up SEO metadata
seoHelper.setBasicSeo({
  title: 'Timeline',
  description: 'Explore our history timeline',
  type: 'website'
});
</script>

<template>
  <div class="container mx-auto py-8 px-4">
    <h1 class="text-3xl font-bold text-center mb-8">{{ $t('timeline.title') }}</h1>
    
    <div class="grid gap-6">
      <div v-for="item in sortedTimelineItems" :key="item.slug" 
           class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <NuxtLink :to="`/timeline/${item.slug}`" class="block p-6">
          <div class="flex items-center mb-2">
            <span class="text-xl font-bold mr-2">{{ item.year }}</span>
            <span v-if="item.month" class="text-lg">{{ item.month }}</span>
          </div>
          <h2 class="text-xl font-semibold mb-2">{{ item.title }}</h2>
          <p class="text-gray-700 dark:text-gray-300">{{ item.description }}</p>
        </NuxtLink>
      </div>
    </div>
    
    <div v-if="sortedTimelineItems.length === 0" class="text-center py-8">
      <p>{{ $t('timeline.no_items') }}</p>
    </div>
  </div>
</template>

<style scoped>
</style>