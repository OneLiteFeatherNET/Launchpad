<script setup lang="ts">
import { computed } from 'vue';
import { useSponsorTier } from '~/composables/useSponsorTier';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  sponsors: {
    type: Array,
    required: true
  },
  locale: {
    type: String,
    required: true
  }
});

// Use the sponsor tier composable
const { getTierColor } = useSponsorTier();
</script>

<template>
  <section class="py-12 px-4 sm:px-6 lg:px-8 bg-surface dark:bg-surface-dark">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-bold text-on-surface dark:text-on-surface-dark">
          {{ title }}
        </h2>
        <NuxtLinkLocale to="/sponsors" class="inline-flex items-center text-primary dark:text-primary-dark hover:underline">
          {{ $t('home.view_all_sponsors') }}
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </NuxtLinkLocale>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="(sponsor, index) in sponsors" 
          :key="index"
          class="bg-surface-variant dark:bg-surface-variant-dark rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
        >
          <NuxtLinkLocale :to="`/sponsors/${sponsor.slug}`" class="block">
            <div class="relative h-48 overflow-hidden">
              <NuxtImg 
                :src="sponsor.logo || '/images/sponsors/placeholder.svg'" 
                :alt="sponsor.name"
                class="w-full h-full object-contain p-4"
                sizes="xs:100vw sm:100vw md:50vw lg:33vw xl:33vw"
                width="800"
                height="400"
                format="webp"
                quality="80"
                loading="lazy"
              />

            </div>

            <div class="p-6">
              <h3 class="text-xl font-bold text-on-surface-variant dark:text-on-surface-variant-dark mb-2">{{ sponsor.name }}</h3>
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
                  `text-black dark:text-white`
                ]"
              >
                {{ sponsor.tier }}
              </div>
            </div>
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
  </section>
</template>
