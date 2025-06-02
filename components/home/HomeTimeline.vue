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
  <section class="py-16 bg-surface dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center text-secondary dark:text-secondary mb-12">{{ title }}</h2>

      <div class="relative overflow-y-auto pb-8" role="region" :aria-label="$t('timeline.label')" tabindex="0">
        <div class="timeline-container relative">
          <!-- Vertical line in the middle -->
          <div class="timeline-line"></div>

          <!-- Timeline Items -->
          <div 
            v-for="(item, index) in timeline" 
            :key="index"
            :class="[
              'timeline-item p-6 rounded-lg shadow-md relative overflow-hidden',
              index % 2 === 0 ? 'timeline-left' : 'timeline-right',
              item.color === 'secondary' 
                ? 'bg-secondary-container dark:bg-secondary-container-dark' 
                : `bg-${item.color}-container dark:bg-${item.color}-container-dark`
            ]"
            role="article"
          >
            <!-- Timeline dot -->
            <div class="timeline-dot"></div>

            <!-- Background color overlay with higher opacity -->
            <div 
              :class="[
                'absolute inset-0',
                item.color === 'secondary' 
                  ? 'bg-secondary dark:bg-secondary opacity-30 dark:opacity-40' 
                  : `bg-${item.color} dark:bg-${item.color} opacity-30 dark:opacity-40`
              ]"
            ></div>

            <div class="relative z-10">
              <h3 :class="[
                'text-xl font-bold mb-2',
                item.color === 'secondary' 
                  ? 'text-secondary dark:text-secondary' 
                  : `text-${item.color} dark:text-${item.color}`
              ]">
                {{ item.year }}
                <span v-if="item.month" class="ml-2">{{ item.month }}</span>
              </h3>
              <p class="text-on-surface-variant dark:text-gray-300">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* For vertical scrolling on timeline */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: var(--md-sys-color-secondary) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: var(--md-sys-color-secondary);
  border-radius: 20px;
}

/* Dark mode scrollbar styles */
:global(.dark) .overflow-y-auto {
  scrollbar-color: var(--md-sys-color-secondary) rgba(0, 0, 0, 0.2);
}

:global(.dark) .overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: var(--md-sys-color-secondary);
  opacity: 0.8;
}

:global(.dark) .overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
}

/* Timeline styling */
.timeline-container {
  position: relative;
  padding: 20px 0;
}

.timeline-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 4px;
  background-color: var(--md-sys-color-secondary);
  transform: translateX(-50%);
}

/* Dark mode styles for timeline line */
:global(.dark) .timeline-line {
  background-color: var(--md-sys-color-secondary);
  opacity: 0.8;
}

.timeline-item {
  width: 45%;
  margin-bottom: 30px;
  position: relative;
}

.timeline-left {
  margin-right: auto;
}

.timeline-right {
  margin-left: auto;
}

.timeline-dot {
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: var(--md-sys-color-secondary);
  border-radius: 50%;
  top: 20px;
  z-index: 10;
}

/* Dark mode styles for timeline dots */
:global(.dark) .timeline-dot {
  background-color: var(--md-sys-color-secondary);
  opacity: 0.9;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
}

.timeline-left .timeline-dot {
  right: -38px;
}

.timeline-right .timeline-dot {
  left: -38px;
}

/* Responsive styles for tablet and mobile */
@media (max-width: 768px) {
  .timeline-line {
    left: 20px;
  }

  .timeline-item {
    width: calc(100% - 40px);
    margin-left: 40px;
    margin-right: 0;
  }

  .timeline-left .timeline-dot,
  .timeline-right .timeline-dot {
    left: -30px;
    right: auto;
  }

  /* Adjust the max height for better mobile experience */
  .overflow-y-auto {
    max-height: 500px;
  }
}

/* Additional adjustments for very small screens */
@media (max-width: 480px) {
  .timeline-item {
    width: calc(100% - 30px);
    margin-left: 30px;
    padding: 12px;
  }

  .timeline-line {
    left: 15px;
  }

  .timeline-left .timeline-dot,
  .timeline-right .timeline-dot {
    left: -22px;
    width: 12px;
    height: 12px;
  }

  /* Reduce text size on very small screens */
  h3 {
    font-size: 1rem;
  }

  p {
    font-size: 0.875rem;
  }
}
</style>
