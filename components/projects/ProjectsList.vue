<script setup lang="ts">
import ProjectCard from './ProjectCard.vue';

defineProps({
  projects: {
    type: Array,
    required: true
  },
  locale: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ProjectCard 
        v-for="(project, index) in projects" 
        :key="index"
        :project="project"
        :locale="locale"
      />
    </div>
  </div>
</template>