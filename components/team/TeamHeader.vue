<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  }
});
</script>

<template>
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
</template>