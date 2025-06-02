<script setup lang="ts">
const props = defineProps({
  roadmap: {
    type: Array,
    required: true
  }
});

// Status color mapping
const statusColorMap = {
  'Aktiv': 'success',
  'Active': 'success',
  'In Entwicklung': 'info',
  'In Development': 'info',
  'In Progress': 'info',
  'In Bearbeitung': 'info',
  'Geplant': 'warning',
  'Planned': 'warning',
  'Abgeschlossen': 'success',
  'Completed': 'success',
  'Pausiert': 'error',
  'Paused': 'error'
};

// Get status color
const getStatusColor = (status: string) => {
  return statusColorMap[status] || 'primary';
};
</script>

<template>
  <section class="py-12 px-4 sm:px-6 lg:px-8 bg-surface-variant dark:bg-surface-variant-dark">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-2xl font-bold text-on-surface-variant dark:text-on-surface-variant-dark mb-8">
        {{ $t('projects.roadmap') }}
      </h2>
      
      <div class="relative">
        <!-- Timeline Line -->
        <div class="absolute left-0 md:left-1/2 h-full w-0.5 bg-outline dark:bg-outline-dark transform -translate-x-1/2"></div>
        
        <!-- Timeline Items -->
        <div class="space-y-12">
          <div 
            v-for="(phase, index) in roadmap" 
            :key="index"
            class="relative"
          >
            <!-- Timeline Dot -->
            <div 
              :class="[
                'absolute left-0 md:left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2',
                `bg-${getStatusColor(phase.status)}-container dark:bg-${getStatusColor(phase.status)}-container-dark`,
                `border-2 border-${getStatusColor(phase.status)} dark:border-${getStatusColor(phase.status)}-dark`
              ]"
            ></div>
            
            <!-- Timeline Content -->
            <div 
              :class="[
                'ml-6 md:ml-0 md:w-5/12',
                index % 2 === 0 ? 'md:pr-8 md:mr-auto' : 'md:pl-8 md:ml-auto'
              ]"
            >
              <div class="bg-surface dark:bg-surface-dark rounded-lg shadow-md p-6">
                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-xl font-bold text-on-surface dark:text-on-surface-dark">
                    {{ phase.title }}
                  </h3>
                  <span 
                    :class="[
                      'px-3 py-1 rounded-full text-sm font-medium',
                      `bg-${getStatusColor(phase.status)}-container dark:bg-${getStatusColor(phase.status)}-container-dark`,
                      `text-on-${getStatusColor(phase.status)}-container dark:text-on-${getStatusColor(phase.status)}-container-dark`
                    ]"
                  >
                    {{ phase.status }}
                  </span>
                </div>
                <p class="text-on-surface-variant dark:text-on-surface-variant-dark">
                  {{ phase.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>