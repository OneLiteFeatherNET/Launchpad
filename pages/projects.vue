<script setup lang="ts">
import { computed } from 'vue';
import ProjectsHeader from '~/components/projects/ProjectsHeader.vue';
import ProjectsList from '~/components/projects/ProjectsList.vue';

const { locale, t } = useI18n();

// SEO optimization
definePageMeta({
  title: 'blog.projects.title',
});

// Fetch projects data based on current locale
const { data: projectsData } = await useAsyncData('projects', () => {
  const collection = locale.value === 'de' ? 'projects_de' : 'projects_en';
  return queryCollection(collection).first();
});

// Computed properties for projects data
const title = computed(() => projectsData.value?.title || '');
const description = computed(() => projectsData.value?.description || '');
const projects = computed(() => projectsData.value?.projects || []);

// Set additional meta tags for SEO
useHead({
  meta: [
    { name: 'description', content: computed(() => description.value || t('blog.projects.description')) },
    // Open Graph tags for social media sharing
    { property: 'og:title', content: computed(() => title.value || t('blog.projects.title')) },
    { property: 'og:description', content: computed(() => description.value || t('blog.projects.description')) },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: '/logo.svg' },
    // Twitter Card tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: computed(() => title.value || t('blog.projects.title')) },
    { name: 'twitter:description', content: computed(() => description.value || t('blog.projects.description')) },
    { name: 'twitter:image', content: '/logo.svg' },
  ],
  link: [
    { rel: 'canonical', href: computed(() => `https://blog.onelitefeather.net/${locale.value === 'de' ? '' : locale.value}/projects`) }
  ]
});
</script>

<template>
  <div class="bg-white dark:bg-gray-900">
    <!-- Page Header -->
    <ProjectsHeader :title="title" :description="description" />

    <!-- Projects List -->
    <ProjectsList :projects="projects" :locale="locale" />
  </div>
</template>