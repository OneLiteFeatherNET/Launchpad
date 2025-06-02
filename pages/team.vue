<script setup lang="ts">
import { ref, computed } from 'vue';

const { locale } = useI18n();

// Fetch team data based on current locale
const { data: teamData } = await useAsyncData('team', () => 
  queryContent(`team/${locale.value}/team`).findOne()
);

// Computed properties for team data
const title = computed(() => teamData.value?.title || '');
const description = computed(() => teamData.value?.description || '');
const ranks = computed(() => teamData.value?.ranks || []);
const rankExplanations = computed(() => teamData.value?.rankExplanations || []);

// Function to get Minecraft head URL
const getMinecraftHeadUrl = (username: string) => {
  return `https://mc-heads.net/avatar/${username}/100`;
};
</script>

<template>
  <div class="bg-white dark:bg-gray-900">
    <!-- Page Header -->
    <div class="bg-primary-container dark:bg-primary-dark-container py-12 mb-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold text-center text-on-primary-container dark:text-on-primary-dark-container mb-4">
          {{ title }}
        </h1>
        <p v-if="description" class="text-xl text-center text-on-primary-container dark:text-on-primary-dark-container max-w-3xl mx-auto">
          {{ description }}
        </p>
      </div>
    </div>

    <!-- Team Members by Rank -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div v-for="(rank, rankIndex) in ranks" :key="rankIndex" class="mb-16">
        <div class="border-l-4 border-primary pl-4 mb-8">
          <h2 class="text-3xl font-bold text-on-surface dark:text-on-surface-dark">{{ rank.name }}</h2>
          <p v-if="rank.description" class="text-on-surface-variant dark:text-on-surface-variant-dark mt-2">
            {{ rank.description }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(member, memberIndex) in rank.members" 
            :key="memberIndex"
            class="bg-surface-variant dark:bg-surface-variant-dark rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
          >
            <div class="p-6">
              <div class="flex items-center mb-4">
                <img 
                  :src="getMinecraftHeadUrl(member.minecraftUsername)" 
                  :alt="`${member.name}'s Minecraft head`"
                  class="w-16 h-16 rounded-md mr-4"
                />
                <div>
                  <h3 class="text-xl font-semibold text-on-surface dark:text-on-surface-dark">{{ member.name }}</h3>
                  <p class="text-on-surface-variant dark:text-on-surface-variant-dark">{{ member.minecraftUsername }}</p>
                </div>
              </div>
              
              <div v-if="member.quote" class="mb-4 italic text-on-surface-variant dark:text-on-surface-variant-dark">
                "{{ member.quote }}"
              </div>
              
              <div class="flex flex-wrap gap-2 mt-4">
                <div v-if="member.joinDate" class="text-sm bg-primary-container dark:bg-primary-dark-container text-on-primary-container dark:text-on-primary-dark-container px-3 py-1 rounded-full">
                  {{ $t('team.joined') }}: {{ new Date(member.joinDate).toLocaleDateString(locale) }}
                </div>
                <div v-if="member.onProbation" class="text-sm bg-error-container dark:bg-error-dark-container text-on-error-container dark:text-on-error-dark-container px-3 py-1 rounded-full">
                  {{ $t('team.on_probation') }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Rank Explanations -->
    <div v-if="rankExplanations.length > 0" class="bg-surface-variant dark:bg-surface-variant-dark py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center text-on-surface dark:text-on-surface-dark mb-8">
          {{ $t('team.rank_explanations') }}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(explanation, index) in rankExplanations" 
            :key="index"
            class="bg-surface dark:bg-surface-dark rounded-lg shadow-md p-6"
          >
            <h3 class="text-xl font-semibold text-on-surface dark:text-on-surface-dark mb-3">{{ explanation.rank }}</h3>
            <p class="text-on-surface-variant dark:text-on-surface-variant-dark">{{ explanation.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>