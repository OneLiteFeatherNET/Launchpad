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
        <div class="relative py-5">
          <!-- Vertical line in the middle -->
          <div class="absolute top-0 bottom-0 left-1/2 md:left-1/2 w-1 bg-secondary dark:bg-secondary dark:opacity-80 transform -translate-x-1/2 md:-translate-x-1/2 left-5 sm:left-5"></div>

          <!-- Timeline Items -->
          <div 
            v-for="(item, index) in timeline" 
            :key="index"
            :class="[
              'p-6 md:p-6 sm:p-3 rounded-lg shadow-md relative overflow-hidden md:w-[45%] w-[calc(100%-40px)] mb-8 md:mb-8 sm:mb-6',
              index % 2 === 0 ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0',
              'ml-10 sm:ml-8',
              item.color === 'secondary' 
                ? 'bg-secondary-container dark:bg-secondary-container-dark' 
                : `bg-${item.color}-container dark:bg-${item.color}-container-dark`
            ]"
            role="article"
          >
            <!-- Timeline dot -->
            <div 
              :class="[
                'absolute w-4 h-4 sm:w-3 sm:h-3 bg-secondary dark:bg-secondary dark:opacity-90 rounded-full top-5 z-10',
                index % 2 === 0 ? 'md:right-[-38px] md:left-auto' : 'md:left-[-38px] md:right-auto',
                'left-[-30px] sm:left-[-22px]',
                'dark:shadow-[0_0_5px_rgba(255,255,255,0.3)]'
              ]"
            ></div>

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
</style>