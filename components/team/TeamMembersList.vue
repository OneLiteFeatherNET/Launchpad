<script setup lang="ts">
import TeamMemberCard from './TeamMemberCard.vue';

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
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
    <div v-for="(rank, rankIndex) in ranks" :key="rankIndex" class="mb-16">
      <div class="border-l-4 border-primary pl-4 mb-8">
        <h2 class="text-3xl font-bold text-on-surface dark:text-on-surface-dark">{{ rank.name }}</h2>
        <p v-if="rank.description" class="text-on-surface-variant dark:text-on-surface-variant-dark mt-2">
          {{ rank.description }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TeamMemberCard 
          v-for="(member, memberIndex) in rank.members" 
          :key="memberIndex"
          :member="member"
          :locale="locale"
        />
      </div>
    </div>
  </div>
</template>
