<script setup lang="ts">
const props = defineProps({
  bstats: {
    type: Object,
    required: false,
    default: () => ({})
  }
});

// Computed property to get the plugin ID
const pluginId = computed(() => props.bstats?.pluginId || '');
</script>

<template>
  <section class="py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-2xl font-bold text-on-surface dark:text-on-surface-dark mb-8">
        {{ $t('projects.statistics') }}
      </h2>

      <div class="bg-surface-variant dark:bg-surface-variant-dark rounded-lg shadow-md p-6">
        <p class="text-on-surface-variant dark:text-on-surface-variant-dark mb-6">
          {{ $t('projects.statistics_description') }}
        </p>

        <div v-if="pluginId" class="text-center">
          <a 
            :href="`https://bstats.org/plugin/${pluginId}`" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {{ $t('projects.view_on_bstats') }}
            <svg class="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
            </svg>
          </a>
        </div>
        <div v-else class="flex items-center justify-center h-[100px] bg-gray-100 dark:bg-gray-800 rounded-lg">
          {{ $t('projects.no_stats_available') }}
        </div>
      </div>
    </div>
  </section>
</template>
