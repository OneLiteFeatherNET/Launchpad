<script setup lang="ts">
defineProps({
  project: {
    type: Object,
    required: true
  }
});

// Funktion zum Ermitteln des korrekten Übersetzungsschlüssels basierend auf dem Status
const getStatusKey = (status: string) => {
  const statusMap: Record<string, string> = {
    'Aktiv': 'active',
    'Active': 'active',
    'Abgeschlossen': 'completed',
    'Completed': 'completed',
    'In Entwicklung': 'in_development',
    'In Development': 'in_development',
    'In Progress': 'in_progress',
    'In Bearbeitung': 'in_progress',
    'Geplant': 'planned',
    'Planned': 'planned',
    'Pausiert': 'paused',
    'Paused': 'paused'
  };

  return statusMap[status] || 'active';
};
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
              :class="{
                'bg-success': ['Aktiv', 'Active', 'Abgeschlossen', 'Completed'].includes(project.status),
                'bg-info': ['In Entwicklung', 'In Development', 'In Progress', 'In Bearbeitung'].includes(project.status),
                'bg-warning': ['Geplant', 'Planned'].includes(project.status),
                'bg-error': ['Pausiert', 'Paused'].includes(project.status),
                'bg-primary': !['Aktiv', 'Active', 'Abgeschlossen', 'Completed', 'In Entwicklung', 'In Development', 'In Progress', 'In Bearbeitung', 'Geplant', 'Planned', 'Pausiert', 'Paused'].includes(project.status)
              }"
              role="img"
              :aria-label="$t('projects.status_indicator') + ' ' + $t(`projects.status.${getStatusKey(project.status)}`)"
            ></div>
            <span class="text-on-surface-variant dark:text-on-surface-variant-dark">
              {{ $t(`projects.status.${getStatusKey(project.status)}`) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

