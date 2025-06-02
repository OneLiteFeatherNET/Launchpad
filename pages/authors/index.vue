<script setup lang="ts">
import { computed } from 'vue';
import AuthorCard from '~/components/common/AuthorCard.vue';

const { locale, t } = useI18n();

// SEO optimization
definePageMeta({
  title: 'blog.authors.title',
});

// Set additional meta tags for SEO
useHead({
  meta: [
    { name: 'description', content: computed(() => t('blog.authors.description')) },
    // Open Graph tags for social media sharing
    { property: 'og:title', content: computed(() => t('blog.authors.title')) },
    { property: 'og:description', content: computed(() => t('blog.authors.description')) },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: '/logo.svg' },
    // Twitter Card tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: computed(() => t('blog.authors.title')) },
    { name: 'twitter:description', content: computed(() => t('blog.authors.description')) },
    { name: 'twitter:image', content: '/logo.svg' },
  ],
  link: [
    { rel: 'canonical', href: computed(() => `https://blog.onelitefeather.net/${locale.value === 'de' ? '' : locale.value}/authors`) }
  ]
});

// Fetch team members
const { data: teamData } = await useAsyncData('team-members', async () => {
  try {
    const result = await queryContent(`/team/${locale.value}/team`).find();
    if (result && result.length > 0 && result[0]?.ranks) {
      return result[0].ranks.flatMap(rank => rank.members) || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
});

// Fetch standalone authors
const { data: standaloneAuthors } = await useAsyncData('standalone-authors', async () => {
  try {
    const authorCollection = locale.value === 'de' ? 'authors_de' : 'authors_en';
    return await queryCollection(authorCollection).find();
  } catch (error) {
    console.error('Error fetching standalone authors:', error);
    return [];
  }
});

// Combine team members and standalone authors, removing duplicates
const allAuthors = computed(() => {
  const teamMembers = teamData.value || [];
  const authors = standaloneAuthors.value || [];

  // Create a map of authors by slug to remove duplicates
  const authorMap = new Map();

  // Add team members to the map
  teamMembers.forEach(member => {
    if (member.slug) {
      authorMap.set(member.slug, member);
    }
  });

  // Add standalone authors to the map, overwriting team members if they exist
  authors.forEach(author => {
    if (author.slug) {
      authorMap.set(author.slug, author);
    }
  });

  // Convert the map back to an array
  return Array.from(authorMap.values());
});
</script>

<template>
  <div class="bg-white dark:bg-gray-900">
    <!-- Page Header -->
    <div class="bg-primary-container dark:bg-primary-container-dark py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl font-bold text-on-primary-container dark:text-on-primary-container-dark mb-4">
          {{ $t('blog.authors.title') }}
        </h1>
        <p class="text-xl text-on-primary-container dark:text-on-primary-container-dark max-w-4xl">
          {{ $t('blog.authors.description') }}
        </p>
      </div>
    </div>

    <!-- Authors Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AuthorCard
          v-for="author in allAuthors"
          :key="author.slug"
          :author="author"
          display-mode="card"
          :show-role="true"
          :show-view-profile="true"
        />
      </div>
    </div>
  </div>
</template>
