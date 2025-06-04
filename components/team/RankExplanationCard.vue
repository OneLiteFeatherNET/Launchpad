<script setup lang="ts">
defineProps({
  explanation: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="bg-surface dark:bg-surface-dark rounded-lg shadow-md p-4 sm:p-5 md:p-6">
    <h3 class="text-lg sm:text-xl font-semibold text-on-surface dark:text-on-surface-dark mb-2 sm:mb-3">{{ explanation.rank }}</h3>
    <p class="text-sm sm:text-base text-on-surface-variant dark:text-on-surface-variant-dark">{{ explanation.description }}</p>
  </div>
</template>
