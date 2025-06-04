<script setup lang="ts">
import RankExplanationCard from './RankExplanationCard.vue';

defineProps({
  rankExplanations: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div v-if="rankExplanations.length > 0" class="bg-surface-variant dark:bg-surface-variant-dark py-6 sm:py-8 md:py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-center text-on-surface dark:text-on-surface-dark mb-4 sm:mb-6 md:mb-8">
        {{ $t('team.rank_explanations') }}
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        <RankExplanationCard 
          v-for="(explanation, index) in rankExplanations" 
          :key="index"
          :explanation="explanation"
        />
      </div>
    </div>
  </div>
</template>
