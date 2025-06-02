<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  timeline: {
    type: Array,
    required: true,
    default: () => []
  }
});
</script>

<template>
  <section class="py-16 bg-surface">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center text-secondary mb-12">{{ title }}</h2>

      <div class="relative overflow-x-auto pb-8" role="region" :aria-label="$t('timeline.label')" tabindex="0">
        <div class="flex space-x-8 min-w-max px-4">
          <!-- Timeline Items -->
          <div 
            v-for="(item, index) in timeline" 
            :key="index"
            :class="`timeline-item bg-${item.color}-container p-6 rounded-lg shadow-md min-w-[300px]`"
            role="article"
          >
            <h3 :class="`text-xl font-bold text-${item.color} mb-2`">{{ item.year }}</h3>
            <p class="text-on-surface-variant">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* For horizontal scrolling on timeline */
.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: var(--md-sys-color-secondary) transparent;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: var(--md-sys-color-secondary);
  border-radius: 20px;
}
</style>
