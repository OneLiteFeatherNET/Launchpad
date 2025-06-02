<script setup lang="ts">
const props = defineProps({
  features: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <section class="py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-2xl font-bold text-on-surface dark:text-on-surface-dark mb-8">
        {{ $t('projects.features') }}
      </h2>
      
      <div class="bg-surface-variant dark:bg-surface-variant-dark rounded-lg shadow-md p-6">
        <ul class="space-y-4">
          <li 
            v-for="(feature, index) in features" 
            :key="index"
            class="flex items-start"
          >
            <!-- Feature Icon -->
            <div class="flex-shrink-0 mt-1">
              <svg class="w-5 h-5 text-primary dark:text-primary-dark" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
            </div>
            
            <!-- Feature Text -->
            <p class="ml-3 text-on-surface-variant dark:text-on-surface-variant-dark">
              {{ feature }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>