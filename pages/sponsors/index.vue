<script setup lang="ts">
import { computed } from 'vue';

const { locale, t } = useI18n();

// SEO optimization
definePageMeta({
  title: 'blog.sponsors.title',
});

// Set additional meta tags for SEO
useHead({
  meta: [
    { name: 'description', content: computed(() => t('blog.sponsors.description')) },
    // Open Graph tags for social media sharing
    { property: 'og:title', content: computed(() => t('blog.sponsors.title')) },
    { property: 'og:description', content: computed(() => t('blog.sponsors.description')) },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: '/logo.svg' },
    // Twitter Card tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: computed(() => t('blog.sponsors.title')) },
    { name: 'twitter:description', content: computed(() => t('blog.sponsors.description')) },
    { name: 'twitter:image', content: '/logo.svg' },
  ],
  link: [
    { rel: 'canonical', href: computed(() => `https://blog.onelitefeather.net/${locale.value === 'de' ? '' : locale.value}/sponsors`) }
  ]
});

// Fetch sponsors data based on current locale
const { data: sponsorsData } = await useAsyncData('sponsors-list', () => {
  const collection = locale.value === 'de' ? 'sponsors_de' : 'sponsors_en';
  return queryCollection(collection).first();
});

// Get all sponsors
const sponsors = computed(() => sponsorsData.value?.sponsors || []);

// Function to get tier color
const tierColorMap = {
  'Gold': 'warning',
  'Silver': 'secondary',
  'Bronze': 'tertiary',
  'Platinum': 'primary'
};

// Get tier color
const getTierColor = (tier: string) => {
  return tierColorMap[tier] || 'primary';
};
</script>

<template>
  <div class="bg-white dark:bg-gray-900">
    <!-- Page Header -->
    <div class="bg-primary-container dark:bg-primary-container-dark py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl font-bold text-on-primary-container dark:text-on-primary-container-dark mb-4">
          {{ $t('blog.sponsors.title') }}
        </h1>
        <p class="text-xl text-on-primary-container dark:text-on-primary-container-dark max-w-4xl">
          {{ $t('blog.sponsors.description') }}
        </p>
      </div>
    </div>

    <!-- Sponsors Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(sponsor, index) in sponsors" 
          :key="index"
          class="bg-surface dark:bg-surface-dark rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
        >
          <NuxtLinkLocale :to="`/sponsors/${sponsor.slug}`" class="block">
            <div class="relative h-48 overflow-hidden">
              <NuxtImg 
                v-if="sponsor.logo" 
                :src="sponsor.logo" 
                :alt="sponsor.name"
                class="w-full h-full object-contain p-4"
                sizes="xs:100vw sm:100vw md:50vw lg:33vw xl:33vw"
                width="800"
                height="400"
                format="webp"
                quality="80"
                loading="lazy"
              />
              <div v-else class="w-full h-full bg-primary-container dark:bg-primary-container-dark flex items-center justify-center">
                <span class="text-2xl font-bold text-on-primary-container dark:text-on-primary-container-dark">{{ sponsor.name }}</span>
              </div>

              <!-- Tier badge -->
              <div 
                v-if="sponsor.tier"
                :class="[
                  'absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium',
                  `bg-${getTierColor(sponsor.tier)}-container dark:bg-${getTierColor(sponsor.tier)}-container-dark`,
                  `text-on-${getTierColor(sponsor.tier)}-container dark:text-on-${getTierColor(sponsor.tier)}-container-dark`
                ]"
              >
                {{ sponsor.tier }}
              </div>
            </div>

            <div class="p-6">
              <h3 class="text-xl font-bold text-on-surface dark:text-on-surface-dark mb-2">{{ sponsor.name }}</h3>
              <p class="text-on-surface-variant dark:text-on-surface-variant-dark mb-4">{{ sponsor.description }}</p>

              <!-- Website link -->
              <div v-if="sponsor.website" class="mb-4">
                <a :href="sponsor.website" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-primary dark:text-primary-dark hover:underline">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                  {{ $t('sponsors.visit_website') }}
                </a>
              </div>

              <!-- Since date -->
              <div v-if="sponsor.since" class="mt-4 text-sm text-on-surface-variant dark:text-on-surface-variant-dark">
                {{ $t('sponsors.sponsor_since') }}: {{ sponsor.since }}
              </div>
            </div>
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
  </div>
</template>
