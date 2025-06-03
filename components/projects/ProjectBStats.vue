<script setup lang="ts">
const props = defineProps({
  bstats: {
    type: Object,
    required: false,
    default: () => ({})
  }
});

// Computed property to determine if we should show servers chart
const showServers = computed(() => props.bstats?.showServers !== false && props.bstats?.pluginId);

// Computed property to determine if we should show players chart
const showPlayers = computed(() => props.bstats?.showPlayers !== false && props.bstats?.pluginId);

// Computed property to get the plugin ID
const pluginId = computed(() => props.bstats?.pluginId || '');

// Computed property to get the iframe URLs
const serversChartUrl = computed(() => {
  if (!pluginId.value) return '';
  return `https://bstats.org/api/v1/plugins/${pluginId.value}/charts/servers/data/line?maxElements=30&width=1000&height=300`;
});

const playersChartUrl = computed(() => {
  if (!pluginId.value) return '';
  return `https://bstats.org/api/v1/plugins/${pluginId.value}/charts/players/data/line?maxElements=30&width=1000&height=300`;
});
</script>

<template>
  <section class="py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-2xl font-bold text-on-surface dark:text-on-surface-dark mb-8">
        {{ $t('projects.statistics') }}
      </h2>

      <div class="space-y-8">
        <!-- Servers Chart -->
        <div v-if="showServers" class="bg-surface-variant dark:bg-surface-variant-dark rounded-lg shadow-md p-6">
          <h3 class="text-xl font-bold text-on-surface-variant dark:text-on-surface-variant-dark mb-4">
            {{ $t('projects.servers_using') }}
          </h3>
          <div class="aspect-w-16 aspect-h-9 bg-surface dark:bg-surface-dark rounded-lg overflow-hidden">
            <iframe 
              v-if="pluginId"
              :src="`https://bstats.org/signatures/${pluginId}/servers.svg`" 
              width="100%" 
              height="300" 
              frameborder="0"
            ></iframe>
            <div v-else class="flex items-center justify-center h-[300px] bg-gray-100 dark:bg-gray-800 rounded-lg">
              {{ $t('projects.no_stats_available') }}
            </div>
          </div>
          <div v-if="pluginId" class="mt-4 text-center">
            <a 
              :href="`https://bstats.org/plugin/${pluginId}`" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="inline-flex items-center text-primary dark:text-primary-dark hover:underline"
            >
              {{ $t('projects.view_on_bstats') }}
              <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
              </svg>
            </a>
          </div>
        </div>

        <!-- Players Chart -->
        <div v-if="showPlayers" class="bg-surface-variant dark:bg-surface-variant-dark rounded-lg shadow-md p-6">
          <h3 class="text-xl font-bold text-on-surface-variant dark:text-on-surface-variant-dark mb-4">
            {{ $t('projects.players_using') }}
          </h3>
          <div class="aspect-w-16 aspect-h-9 bg-surface dark:bg-surface-dark rounded-lg overflow-hidden">
            <iframe 
              v-if="pluginId"
              :src="`https://bstats.org/signatures/${pluginId}/players.svg`" 
              width="100%" 
              height="300" 
              frameborder="0"
            ></iframe>
            <div v-else class="flex items-center justify-center h-[300px] bg-gray-100 dark:bg-gray-800 rounded-lg">
              {{ $t('projects.no_stats_available') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
