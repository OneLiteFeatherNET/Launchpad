<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  activities: {
    type: Array,
    required: true,
    default: () => []
  }
});
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center text-secondary-blue-color mb-12">{{ title }}</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Activity Cards -->
        <div 
          v-for="(activity, index) in activities" 
          :key="index"
          class="bg-surface rounded-lg shadow-md overflow-hidden"
        >
          <div class="h-48 relative">
            <img 
              :src="activity.image" 
              :alt="activity.title" 
              class="h-full w-full object-cover"
            />
            <div :class="[
              'absolute inset-0 bg-opacity-50',
              activity.color === 'secondary' 
                ? 'bg-secondary-container' 
                : `bg-${activity.color}-container`
            ]"></div>
          </div>
          <div class="p-6">
            <h3 :class="[
              'text-xl font-bold mb-2',
              activity.color === 'secondary' 
                ? 'text-secondary' 
                : `text-${activity.color}-color`
            ]">{{ activity.title }}</h3>
            <p class="text-on-surface-variant">{{ activity.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
