<script setup lang="ts">
defineProps({
  /**
   * The title of the section
   */
  title: {
    type: String,
    required: true
  },
  /**
   * The ID of the section for anchor links
   */
  id: {
    type: String,
    required: true
  }
});
</script>

<template>
  <section class="mb-10">
    <h2 :id="id" class="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300">
      {{ title }}
    </h2>
    <slot></slot>
  </section>
</template>