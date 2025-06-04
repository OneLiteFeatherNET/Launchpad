<script setup lang="ts">
import { computed } from 'vue';
import { useSponsorTier } from '~/composables/useSponsorTier';

const { locale, t } = useI18n();
const route = useRoute();
const slug = route.params.slug as string;

// SEO optimization
definePageMeta({
  title: 'blog.sponsor.title',
});

// Fetch sponsors data based on current locale
const { data: sponsorsData } = await useAsyncData(`sponsors-${slug}`, () => {
  const collection = locale.value === 'de' ? 'sponsors_de' : 'sponsors_en';
  return queryCollection(collection).first();
});

// Find the current sponsor by slug
const sponsor = computed(() => {
  const sponsors = sponsorsData.value?.sponsors || [];
  return sponsors.find(s => s.slug === slug) || null;
});

// Redirect if sponsor not found
if (!sponsor.value) {
  navigateTo('/sponsors');
}

// Fetch projects data to get full project information
const { data: projectsData } = await useAsyncData('projects-for-sponsor', () => {
  const collection = locale.value === 'de' ? 'projects_de' : 'projects_en';
  return queryCollection(collection).first();
});

// Get full project information for each project reference in sponsor.projects
const sponsorProjects = computed(() => {
  if (!sponsor.value?.projects || !projectsData.value?.projects) {
    return [];
  }

  const allProjects = projectsData.value.projects;
  return sponsor.value.projects.map(projectRef => {
    const fullProject = allProjects.find(p => 
      p.namespace === projectRef.namespace && p.key === projectRef.key
    );

    // If we can't find the full project, create a default project object with basic information
    if (!fullProject) {
      return {
        name: projectRef.key.charAt(0).toUpperCase() + projectRef.key.slice(1).replace(/-/g, ' '),
        slug: projectRef.key,
        namespace: projectRef.namespace,
        key: projectRef.key,
        description: `${projectRef.namespace}:${projectRef.key}`
      };
    }

    return fullProject;
  });
});

// Set additional meta tags for SEO
useHead({
  meta: [
    { name: 'description', content: computed(() => sponsor.value?.description || t('blog.sponsor.description')) },
    // Open Graph tags for social media sharing
    { property: 'og:title', content: computed(() => sponsor.value?.name || t('blog.sponsor.title')) },
    { property: 'og:description', content: computed(() => sponsor.value?.description || t('blog.sponsor.description')) },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: computed(() => sponsor.value?.logo || '/logo.svg') },
    // Twitter Card tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: computed(() => sponsor.value?.name || t('blog.sponsor.title')) },
    { name: 'twitter:description', content: computed(() => sponsor.value?.description || t('blog.sponsor.description')) },
    { name: 'twitter:image', content: computed(() => sponsor.value?.logo || '/logo.svg') },
  ],
  link: [
    { rel: 'canonical', href: computed(() => `https://blog.onelitefeather.net/${locale.value === 'de' ? '' : locale.value}/sponsors/${slug}`) }
  ]
});

// Use the sponsor tier composable
const { getTierColor } = useSponsorTier();
</script>

<template>
  <div v-if="sponsor" class="bg-white dark:bg-gray-900">
    <!-- Sponsor Header -->
    <div class="bg-primary-container dark:bg-primary-container-dark py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
          <!-- Sponsor Logo -->
          <div class="w-full md:w-1/3 flex justify-center">
            <div class="bg-surface dark:bg-surface-dark p-6 rounded-lg shadow-md w-full max-w-xs">
              <NuxtImg 
                v-if="sponsor.logo" 
                :src="sponsor.logo" 
                :alt="sponsor.name"
                class="w-full h-auto object-contain"
                sizes="xs:100vw sm:100vw md:33vw lg:33vw xl:33vw"
                width="400"
                height="400"
                format="webp"
                quality="80"
                loading="eager"
              />
              <div v-else class="w-full h-48 bg-primary-container dark:bg-primary-container-dark flex items-center justify-center">
                <span class="text-2xl font-bold text-on-primary-container dark:text-on-primary-container-dark">{{ sponsor.name }}</span>
              </div>
            </div>
          </div>

          <!-- Sponsor Info -->
          <div class="w-full md:w-2/3">
            <div class="flex items-center mb-4">
              <h1 class="text-4xl font-bold text-on-primary-container dark:text-on-primary-container-dark mr-4">
                {{ sponsor.name }}
              </h1>
              <!-- Tier badge -->
              <div 
                v-if="sponsor.tier"
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium',
                  `bg-${getTierColor(sponsor.tier)}-container dark:bg-${getTierColor(sponsor.tier)}-container-dark`,
                  `text-on-${getTierColor(sponsor.tier)}-container dark:text-on-${getTierColor(sponsor.tier)}-container-dark`
                ]"
              >
                {{ sponsor.tier }}
              </div>
            </div>

            <p class="text-xl text-on-primary-container dark:text-on-primary-container-dark mb-6">
              {{ sponsor.description }}
            </p>

            <!-- Website link -->
            <div v-if="sponsor.website" class="mb-4">
              <a :href="sponsor.website" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-on-primary-container dark:text-on-primary-container-dark hover:underline">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
                {{ $t('sponsors.visit_website') }}
              </a>
            </div>

            <!-- Since date -->
            <div v-if="sponsor.since" class="text-on-primary-container dark:text-on-primary-container-dark">
              {{ $t('sponsors.sponsor_since') }}: {{ sponsor.since }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sponsor Content -->
    <div v-if="sponsor.content" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="prose dark:prose-invert max-w-none">
        <div v-html="sponsor.content"></div>
      </div>
    </div>

    <!-- Sponsor Projects -->
    <div v-if="sponsorProjects.length > 0" class="bg-surface-variant dark:bg-surface-variant-dark py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-2xl font-bold text-on-surface-variant dark:text-on-surface-variant-dark mb-8">
          {{ $t('sponsors.supported_projects') }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="(project, index) in sponsorProjects" 
            :key="index"
            class="bg-primary-container dark:bg-primary-container-dark rounded-lg shadow-md overflow-hidden"
          >
            <NuxtLinkLocale :to="`/projects/${project.slug}`" class="block">
              <div class="p-6">
                <h3 class="text-xl font-bold text-on-primary-container dark:text-on-primary-container-dark mb-2">{{ project.name }}</h3>
                <p v-if="project.description" class="text-on-primary-container dark:text-on-primary-container-dark">
                  {{ project.description }}
                </p>
                <!-- Affiliate link disclaimer -->
                <div v-if="project.isAffiliate" class="mt-2 text-sm text-warning dark:text-warning-dark">
                  {{ $t('projects.affiliate_link') }}
                </div>
              </div>
            </NuxtLinkLocale>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
