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
  <div class="mt-4 mb-6">
    <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3" id="blog-authors-heading">
      {{ $t('blog.authors') }}
    </h2>

    <div class="flex flex-wrap gap-4" aria-labelledby="blog-authors-heading">
      <AuthorCard
        v-for="author in authors"
        :key="author.slug"
        :author="author"
        display-mode="compact"
        :show-role="false"
        :show-view-profile="false"
      />
    </div>
  </div>
</template>
