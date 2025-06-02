<script setup lang="ts">
import { computed } from 'vue';
import TeamHeader from '~/components/team/TeamHeader.vue';
import TeamMembersList from '~/components/team/TeamMembersList.vue';
import RankExplanations from '~/components/team/RankExplanations.vue';

const { locale, t } = useI18n();

// SEO optimization
definePageMeta({
  title: 'blog.team.title',
});

// Fetch team data based on current locale
const { data: teamData } = await useAsyncData('team', () => {
  const collection = locale.value === 'de' ? 'team_de' : 'team_en';
  return queryCollection(collection).first();
});

// Computed properties for team data
const title = computed(() => teamData.value?.title || '');
const description = computed(() => teamData.value?.description || '');
const ranks = computed(() => teamData.value?.ranks || []);
const rankExplanations = computed(() => teamData.value?.rankExplanations || []);

// Set additional meta tags for SEO
useHead({
  meta: [
    { name: 'description', content: computed(() => description.value || t('blog.team.description')) },
    // Open Graph tags for social media sharing
    { property: 'og:title', content: computed(() => title.value || t('blog.team.title')) },
    { property: 'og:description', content: computed(() => description.value || t('blog.team.description')) },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: '/logo.svg' },
    // Twitter Card tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: computed(() => title.value || t('blog.team.title')) },
    { name: 'twitter:description', content: computed(() => description.value || t('blog.team.description')) },
    { name: 'twitter:image', content: '/logo.svg' },
  ],
  link: [
    { rel: 'canonical', href: computed(() => `https://blog.onelitefeather.net/${locale.value === 'de' ? '' : locale.value}/team`) }
  ]
});
</script>

<template>
  <div class="bg-white dark:bg-gray-900">
    <!-- Page Header -->
    <TeamHeader :title="title" :description="description" />

    <!-- Team Members by Rank -->
    <TeamMembersList :ranks="ranks" :locale="locale" />

    <!-- Rank Explanations -->
    <RankExplanations :rankExplanations="rankExplanations" />
  </div>
</template>
