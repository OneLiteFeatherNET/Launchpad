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

// Function to get tier color with Material Design 3 colors in descending order
const tierColorMap = {
  'Platinum': 'secondary-cyan-bg',
  'Gold': 'secondary-orange-bg',
  'Silver': 'secondary-blue-bg',
  'Bronze': 'secondary-purple-bg'
};

// Get tier color
const getTierColor = (tier: string) => {
  return tierColorMap[tier] || 'primary';
};
</script>

<template>
  <div class="bg-white dark:bg-gray-900">
    <!-- Page Header -->
    <div class="bg-primary-container dark:bg-primary-container-dark py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl sm:text-4xl font-bold text-on-primary-container dark:text-on-primary-container-dark mb-2 sm:mb-4">
          {{ $t('blog.sponsors.title') }}
        </h1>
        <p class="text-lg sm:text-xl text-on-primary-container dark:text-on-primary-container-dark max-w-4xl">
          {{ $t('blog.sponsors.description') }}
        </p>
      </div>
    </div>

    <!-- Sponsors Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div class="flex overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary scrollbar-track-surface-variant -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory" style="-webkit-overflow-scrolling: touch;">
        <div 
          v-for="(sponsor, index) in sponsors" 
          :key="index"
          class="bg-surface dark:bg-surface-dark rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 flex-shrink-0 w-[85%] sm:w-[70%] md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] mr-4 snap-start"
        >
          <NuxtLinkLocale :to="`/sponsors/${sponsor.slug}`" class="block">
            <div class="relative h-48 overflow-hidden">
              <NuxtImg 
                v-if="sponsor.logo" 
                :src="sponsor.logo" 
                :alt="sponsor.name"
                class="w-full h-full object-contain p-4"
                sizes="xs:85vw sm:70vw md:50vw lg:33vw xl:33vw"
                width="800"
                height="400"
                format="webp"
                quality="80"
                loading="lazy"
              />
              <div v-else class="w-full h-full bg-primary-container dark:bg-primary-container-dark flex items-center justify-center">
                <span class="text-2xl font-bold text-on-primary-container dark:text-on-primary-container-dark">{{ sponsor.name }}</span>
              </div>

            </div>

            <div class="p-4 sm:p-6">
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
              <div v-if="sponsor.since" class="mt-4 text-sm text-on-surface-variant dark:text-on-surface-variant-dark mb-4">
                {{ $t('sponsors.sponsor_since') }}: {{ sponsor.since }}
              </div>

              <!-- Tier badge -->
              <div 
                v-if="sponsor.tier"
                :class="[
                  'inline-block mt-4 px-3 py-1 rounded-full text-sm font-medium',
                  `bg-${getTierColor(sponsor.tier)} dark:bg-${getTierColor(sponsor.tier)}`,
                  `text-white dark:text-white`
                ]"
              >
                {{ sponsor.tier }}
              </div>
            </div>
          </NuxtLinkLocale>
        </div>
      </div>
    </div>

    <!-- Tier Explanations -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 border-t border-outline dark:border-outline-dark">
      <h2 class="text-xl sm:text-2xl font-bold text-on-surface dark:text-on-surface-dark mb-4 sm:mb-6">
        {{ $t('sponsors.tier_explanations') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <!-- Platinum Tier -->
        <div class="bg-secondary-cyan-bg dark:bg-secondary-cyan-bg p-4 rounded-lg">
          <h3 class="text-xl font-bold text-white dark:text-white mb-2">
            {{ $t('sponsors.tier.platinum') }}
          </h3>
          <p class="text-white dark:text-white">
            {{ $t('sponsors.tier_description.platinum') }}
          </p>
        </div>

        <!-- Gold Tier -->
        <div class="bg-secondary-orange-bg dark:bg-secondary-orange-bg p-4 rounded-lg">
          <h3 class="text-xl font-bold text-white dark:text-white mb-2">
            {{ $t('sponsors.tier.gold') }}
          </h3>
          <p class="text-white dark:text-white">
            {{ $t('sponsors.tier_description.gold') }}
          </p>
        </div>

        <!-- Silver Tier -->
        <div class="bg-secondary-blue-bg dark:bg-secondary-blue-bg p-4 rounded-lg">
          <h3 class="text-xl font-bold text-white dark:text-white mb-2">
            {{ $t('sponsors.tier.silver') }}
          </h3>
          <p class="text-white dark:text-white">
            {{ $t('sponsors.tier_description.silver') }}
          </p>
        </div>

        <!-- Bronze Tier -->
        <div class="bg-secondary-purple-bg dark:bg-secondary-purple-bg p-4 rounded-lg">
          <h3 class="text-xl font-bold text-white dark:text-white mb-2">
            {{ $t('sponsors.tier.bronze') }}
          </h3>
          <p class="text-white dark:text-white">
            {{ $t('sponsors.tier_description.bronze') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
