<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="bg-primary dark:bg-primary-dark py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 class="text-4xl font-bold text-on-primary dark:text-on-primary-dark mb-4">{{ title }}</h1>
      <p class="text-xl text-on-primary dark:text-on-primary-dark max-w-3xl mx-auto">{{ description }}</p>
    </div>
  </div>
</template>