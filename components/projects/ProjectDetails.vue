<script setup lang="ts">
import type { Project } from '~/types/project';

defineProps({
  project: {
    type: Object as () => Project,
    required: true
  }
});

// Use the project status composable
const { getStatusTranslationKey, getStatusColor } = useProjectStatus();
</script>

<template>
  <section
    class="py-12 bg-surface-variant dark:bg-surface-variant-dark"
    aria-labelledby="project-details-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 id="project-details-heading" class="text-3xl font-bold text-on-surface dark:text-on-surface-dark mb-8">{{ $t('projects.about_project') }}</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Project Description -->
        <div class="bg-surface dark:bg-surface-dark rounded-lg shadow-md p-6">
          <h3 class="text-xl font-semibold text-on-surface dark:text-on-surface-dark mb-4">{{ $t('projects.description') }}</h3>
          <p class="text-on-surface-variant dark:text-on-surface-variant-dark">{{ project.description }}</p>
        </div>

        <!-- Project Status -->
        <div class="bg-surface dark:bg-surface-dark rounded-lg shadow-md p-6">
          <h3 class="text-xl font-semibold text-on-surface dark:text-on-surface-dark mb-4">{{ $t('projects.current_status') }}</h3>
          <div class="flex items-center">
            <div
              class="w-3 h-3 rounded-full mr-2"
              :class="`bg-${getStatusColor(project.status)}`"
              role="img"
              :aria-label="$t('projects.status_indicator') + ' ' + $t(`projects.status.${getStatusTranslationKey(project.status)}`)"
            ></div>
            <span class="text-on-surface-variant dark:text-on-surface-variant-dark">
              {{ $t(`projects.status.${getStatusTranslationKey(project.status)}`) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
