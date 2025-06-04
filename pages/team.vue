<script setup lang="ts">
import { computed } from 'vue';
import PageContainer from '~/components/common/PageContainer.vue';
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

// Use the SEO composable for meta tags
useCustomSeoMeta({
  title: () => title.value || t('blog.team.title'),
  description: () => description.value || t('blog.team.description'),
  path: '/team'
});
</script>

<template>
  <PageContainer>
    <!-- Page Header -->
    <TeamHeader :title="title" :description="description" />

    <!-- Team Members by Rank -->
    <TeamMembersList :ranks="ranks" :locale="locale" />

    <!-- Rank Explanations -->
    <RankExplanations :rankExplanations="rankExplanations" />
  </PageContainer>
</template>
