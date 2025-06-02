<script setup lang="ts">
import AuthorCard from '~/components/common/AuthorCard.vue';

defineProps({
  authors: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <section 
    class="py-12 px-4 sm:px-6 lg:px-8 bg-surface-variant dark:bg-surface-variant-dark"
    aria-labelledby="project-authors-heading"
  >
    <div class="max-w-7xl mx-auto">
      <h2 
        id="project-authors-heading" 
        class="text-2xl font-bold text-on-surface-variant dark:text-on-surface-variant-dark mb-8"
      >
        {{ $t('projects.authors') }}
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AuthorCard
          v-for="(author, index) in authors"
          :key="author.slug || index"
          :author="author"
          display-mode="card"
          :show-role="true"
          :show-view-profile="true"
        />
      </div>
    </div>
  </section>
</template>
