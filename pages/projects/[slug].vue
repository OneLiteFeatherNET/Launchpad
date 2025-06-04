<script setup lang="ts">
import { computed } from 'vue';
import ProjectHeader from '~/components/projects/ProjectHeader.vue';
import ProjectDetails from '~/components/projects/ProjectDetails.vue';
import ProjectFeatures from '~/components/projects/ProjectFeatures.vue';
import ProjectRoadmap from '~/components/projects/ProjectRoadmap.vue';
import ProjectBStats from '~/components/projects/ProjectBStats.vue';
import ProjectAuthors from '~/components/projects/ProjectAuthors.vue';

const { locale, t } = useI18n();
const route = useRoute();
const slugParam = route.params.slug as string;

// SEO optimization
definePageMeta({
  title: 'blog.project.title',
});

// Fetch projects data based on current locale
const { data: projectsData } = await useAsyncData(`projects-${slugParam}`, () => {
  const collection = locale.value === 'de' ? 'projects_de' : 'projects_en';
  return queryCollection(collection).first();
});

// Parse the slug parameter which should be in the format "namespace:key"
const [namespace, key] = slugParam.includes(':') ? slugParam.split(':') : [null, null];

// Find the current project by namespace and key, or fall back to slug for backward compatibility
const project = computed(() => {
  const projects = projectsData.value?.projects || [];

  // First try to find by namespace and key
  if (namespace && key) {
    return projects.find(p => p.namespace === namespace && p.key === key) || null;
  }

  // Fall back to slug for backward compatibility
  return projects.find(p => p.slug === slugParam) || null;
});

// Redirect if project not found
if (!project.value) {
  navigateTo('/projects');
}

// Set additional meta tags for SEO
useHead({
  meta: [
    { name: 'description', content: computed(() => project.value?.description || t('blog.project.description')) },
    // Open Graph tags for social media sharing
    { property: 'og:title', content: computed(() => project.value?.name || t('blog.project.title')) },
    { property: 'og:description', content: computed(() => project.value?.description || t('blog.project.description')) },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: computed(() => project.value?.image || '/logo.svg') },
    // Twitter Card tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: computed(() => project.value?.name || t('blog.project.title')) },
    { name: 'twitter:description', content: computed(() => project.value?.description || t('blog.project.description')) },
    { name: 'twitter:image', content: computed(() => project.value?.image || '/logo.svg') },
  ],
  link: [
    { rel: 'canonical', href: computed(() => `https://blog.onelitefeather.net/${locale.value === 'de' ? '' : locale.value}/projects/${slugParam}`) }
  ]
});
</script>

<template>
  <div v-if="project" class="bg-white dark:bg-gray-900">
    <!-- Project Header -->
    <ProjectHeader :project="project" />

    <!-- Project Details -->
    <ProjectDetails :project="project" />

    <!-- Project Features -->
    <ProjectFeatures v-if="project.features && project.features.length > 0" :features="project.features" />

    <!-- Project Roadmap -->
    <ProjectRoadmap v-if="project.roadmap && project.roadmap.length > 0" :roadmap="project.roadmap" />

    <!-- Project BStats -->
    <ProjectBStats v-if="project.bstats" :bstats="project.bstats" />

    <!-- Project Authors -->
    <ProjectAuthors v-if="project.authors && project.authors.length > 0" :authors="project.authors" />
  </div>
</template>
