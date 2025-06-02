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
            :class="[
              'timeline-item p-6 rounded-lg shadow-md min-w-[300px] relative overflow-hidden',
              item.color === 'secondary' 
                ? 'bg-secondary-container' 
                : `bg-${item.color}-container`
            ]"
            role="article"
          >
            <!-- Background color overlay with higher opacity -->
            <div 
              :class="[
                'absolute inset-0 opacity-30',
                item.color === 'secondary' 
                  ? 'bg-secondary' 
                  : `bg-${item.color}`
              ]"
            ></div>

            <div class="relative z-10">
              <h3 :class="[
                'text-xl font-bold mb-2',
                item.color === 'secondary' 
                  ? 'text-secondary' 
                  : `text-${item.color}`
              ]">{{ item.year }}</h3>
              <p class="text-on-surface-variant">{{ item.description }}</p>
            </div>
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
