<script setup lang="ts">
import HomeCarousel from '~/components/home/HomeCarousel.vue';
import HomeTimeline from '~/components/home/HomeTimeline.vue';
import HomeActivities from '~/components/home/HomeActivities.vue';

const { locale, t } = useI18n();

// SEO optimization
definePageMeta({
  title: 'blog.home.title',
});

// Set additional meta tags for SEO
useHead({
  meta: [
    { name: 'description', content: computed(() => t('blog.home.description')) },
    // Open Graph tags for social media sharing
    { property: 'og:title', content: computed(() => t('blog.home.title')) },
    { property: 'og:description', content: computed(() => t('blog.home.description')) },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: computed(() => slides.value[0]?.image || '/logo.svg') },
    // Twitter Card tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: computed(() => t('blog.home.title')) },
    { name: 'twitter:description', content: computed(() => t('blog.home.description')) },
    { name: 'twitter:image', content: computed(() => slides.value[0]?.image || '/logo.svg') },
  ],
  link: [
    { rel: 'canonical', href: computed(() => `https://blog.onelitefeather.net/${locale.value === 'de' ? '' : locale.value}`) }
  ]
});

// Fetch carousel data
const { data: carouselData } = await useAsyncData('carousel', () => {
  const collection = locale.value === 'de' ? 'carousel_de' : 'carousel_en';
  return queryCollection(collection).first();
});

// Fetch history data
const { data: historyData } = await useAsyncData('history', () => {
  const collection = locale.value === 'de' ? 'history_de' : 'history_en';
  return queryCollection(collection).first();
});

// Fetch activities data
const { data: activitiesData } = await useAsyncData('activities', () => {
  const collection = locale.value === 'de' ? 'activities_de' : 'activities_en';
  return queryCollection(collection).first();
});

const slides = computed(() => carouselData.value?.slides || []);
const historyTitle = computed(() => historyData.value?.title || '');
const timeline = computed(() => historyData.value?.timeline || []);
const activitiesTitle = computed(() => activitiesData.value?.title || '');
const activities = computed(() => activitiesData.value?.activities || []);
</script>

<template>
  <div>
    <!-- Carousel Component -->
    <HomeCarousel :slides="slides" />

    <!-- Timeline Component -->
    <HomeTimeline :title="historyTitle" :timeline="timeline" />

    <!-- Activities Component -->
    <HomeActivities :title="activitiesTitle" :activities="activities" />
  </div>
</template>
