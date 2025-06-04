<script setup lang="ts">
import AuthorCard from '~/components/common/AuthorCard.vue';

defineProps({
  ranks: {
    type: Array,
    required: true
  },
  locale: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 md:mb-16">
    <div 
      v-for="(rank, rankIndex) in ranks" 
      :key="rankIndex" 
      class="mb-8 sm:mb-12 md:mb-16"
      :aria-labelledby="`team-rank-${rankIndex}`"
    >
      <div class="border-l-4 border-primary pl-3 sm:pl-4 mb-4 sm:mb-6 md:mb-8">
        <h2 
          :id="`team-rank-${rankIndex}`" 
          class="text-xl sm:text-2xl md:text-3xl font-bold text-on-surface dark:text-on-surface-dark"
        >
          {{ rank.name }}
        </h2>
        <p 
          v-if="rank.description" 
          class="text-sm sm:text-base text-on-surface-variant dark:text-on-surface-variant-dark mt-1 sm:mt-2"
        >
          {{ rank.description }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        <AuthorCard 
          v-for="(member, memberIndex) in rank.members" 
          :key="member.slug || `${rankIndex}-${memberIndex}`"
          :author="member"
          display-mode="detailed"
          :show-role="false"
          :show-quote="true"
          :show-team-info="true"
        />
      </div>
    </div>
  </div>
</template>
