<script setup lang="ts">
import { computed } from 'vue';
import TeamHeader from '~/components/team/TeamHeader.vue';
import TeamMembersList from '~/components/team/TeamMembersList.vue';
import RankExplanations from '~/components/team/RankExplanations.vue';

const { locale } = useI18n();

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
