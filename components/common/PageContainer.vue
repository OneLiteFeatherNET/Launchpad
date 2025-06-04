<script setup lang="ts">
defineProps({
  /**
   * Whether to use a narrower max-width for the content
   */
  narrow: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div class="container mx-auto py-4">
    <div :class="[
      'mx-auto px-4 py-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200',
      narrow ? 'max-w-4xl' : 'max-w-7xl'
    ]">
      <slot></slot>
    </div>
  </div>
</template>