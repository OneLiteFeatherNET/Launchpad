<script setup lang="ts">
import HomeCarousel from '~/components/home/HomeCarousel.vue';
import HomeMinecraftServers from '~/components/home/HomeMinecraftServers.vue';
import HomeTimeline from '~/components/home/HomeTimeline.vue';
import HomeActivities from '~/components/home/HomeActivities.vue';
import HomeFeaturedProjects from '~/components/home/HomeFeaturedProjects.vue';
import HomeSponsors from '~/components/home/HomeSponsors.vue';

const { locale, t } = useI18n();
const isUnmounted = ref(false);

onBeforeUnmount(() => {
  isUnmounted.value = true;
});

// SEO optimization
definePageMeta({
  title: 'blog.home.title',
});

// Set additional meta tags for SEO
// useHead({
//   meta: [
//     { name: 'description', content: computed(() => isUnmounted.value ? '' : t('blog.home.description')) },
//     // Open Graph tags for social media sharing
//     { property: 'og:title', content: computed(() => isUnmounted.value ? '' : t('blog.home.title')) },
//     { property: 'og:description', content: computed(() => isUnmounted.value ? '' : t('blog.home.description')) },
//     { property: 'og:type', content: 'website' },
//     { property: 'og:image', content: computed(() => isUnmounted.value ? '/logo.svg' : slides.value[0]?.image || '/logo.svg') },
//     // Twitter Card tags
//     { name: 'twitter:card', content: 'summary_large_image' },
//     { name: 'twitter:title', content: computed(() => isUnmounted.value ? '' : t('blog.home.title')) },
//     { name: 'twitter:description', content: computed(() => isUnmounted.value ? '' : t('blog.home.description')) },
//     { name: 'twitter:image', content: computed(() => isUnmounted.value ? '/logo.svg' : slides.value[0]?.image || '/logo.svg') },
//   ],
//   link: [
//     { rel: 'canonical', href: computed(() => isUnmounted.value ? '' : `https://blog.onelitefeather.net/${locale.value === 'de' ? '' : locale.value}`) }
//   ]
// });

// Use the localized content composable to fetch data
const { data: carouselData } = await useLocalizedContent('carousel');
const { data: historyData } = await useLocalizedContent('history');
const { data: activitiesData } = await useLocalizedContent('activities');
const { data: projectsData } = await useLocalizedContent('projects');
const { data: sponsorsData } = await useLocalizedContent('sponsors');

const slides = computed(() => isUnmounted.value ? [] : carouselData.value?.slides || []);
const historyTitle = computed(() => isUnmounted.value ? '' : historyData.value?.title || '');
const timeline = computed(() => isUnmounted.value ? [] : historyData.value?.timeline || []);
const activitiesTitle = computed(() => isUnmounted.value ? '' : activitiesData.value?.title || '');
const activities = computed(() => isUnmounted.value ? [] : activitiesData.value?.activities || []);
const featuredProjects = computed(() => {
  if (isUnmounted.value) return [];
  const projects = projectsData.value?.projects || [];
  return projects.filter(project => project.featured === true);
});
const featuredSponsors = computed(() => {
  if (isUnmounted.value) return [];
  const sponsors = sponsorsData.value?.sponsors || [];
  return sponsors.filter(sponsor => sponsor.featured === true);
});
</script>

<template>
  <div>
    <!-- Carousel Component -->
    <HomeCarousel :slides="slides" />

    <!-- Minecraft Servers Component -->
    <HomeMinecraftServers />

    <!-- Timeline Component -->
    <HomeTimeline :title="historyTitle" :timeline="timeline" />

    <!-- Activities Component -->
    <HomeActivities :title="activitiesTitle" :activities="activities" />

    <!-- Featured Projects Component -->
    <HomeFeaturedProjects 
      v-if="featuredProjects.length > 0" 
      :title="$t('home.featured_projects')" 
      :projects="featuredProjects" 
      :locale="locale" 
    />

    <!-- Sponsors Component -->
    <HomeSponsors
      v-if="featuredSponsors.length > 0"
      :title="$t('home.sponsors')"
      :sponsors="featuredSponsors"
      :locale="locale"
    />
  </div>
</template>
