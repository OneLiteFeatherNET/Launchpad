<script setup lang="ts">
defineProps({
  /**
   * The title of the page
   */
  title: {
    type: String,
    required: true
  },
  /**
   * The subtitle or description of the page
   */
  description: {
    type: String,
    default: ''
  },
  /**
   * Optional date or metadata to display below the title
   */
  metadata: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <div class="mb-8">
    <h1 class="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{{ title }}</h1>
    
    <p v-if="metadata" class="text-sm mb-3 text-gray-600 dark:text-gray-400">{{ metadata }}</p>
    
    <p v-if="description" class="text-lg text-gray-700 dark:text-gray-300">{{ description }}</p>
  </div>
</template>