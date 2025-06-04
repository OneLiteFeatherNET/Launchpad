<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AuthorCard from '~/components/common/AuthorCard.vue';

const props = defineProps({
  authors: {
    type: Array,
    required: true
  }
});

const { locale } = useI18n();
const resolvedAuthors = ref([]);
const isLoading = ref(true);

// Function to fetch author data by namespace and key
const fetchAuthorData = async (namespace, key, authorRef) => {
  try {
    // First try to find the author in the standalone authors collection
    const authorCollection = locale.value === 'de' ? 'authors_de' : 'authors_en';
    const author = await queryCollection(authorCollection)
      .where({ namespace, key })
      .findOne();

    if (author) {
      return author;
    }

    // If not found, try to find the author in the team collection
    const teamCollection = locale.value === 'de' ? 'team_de' : 'team_en';
    const teamData = await queryCollection(teamCollection).first();
    if (teamData && teamData.ranks) {
      const allMembers = teamData.ranks.flatMap(rank => rank.members) || [];
      const teamMember = allMembers.find((member) => member.namespace === namespace && member.key === key);
      if (teamMember) {
        return teamMember;
      }
    }

    // If still not found, return a placeholder with the reference info
    return {
      name: `${namespace}:${key}`,
      namespace,
      key,
      slug: authorRef.slug // Preserve the slug from the author reference
    };
  } catch (error) {
    console.error(`Error fetching author data for ${namespace}:${key}:`, error);
    return {
      name: `${namespace}:${key}`,
      namespace,
      key,
      slug: authorRef.slug // Preserve the slug from the author reference
    };
  }
};

// Resolve all author references
onMounted(async () => {
  try {
    const authors = [];

    for (const authorRef of props.authors) {
      if (authorRef.namespace && authorRef.key) {
        const authorData = await fetchAuthorData(authorRef.namespace, authorRef.key, authorRef);
        authors.push(authorData);
      } else {
        // If it's already a full author object, use it as is
        authors.push(authorRef);
      }
    }

    resolvedAuthors.value = authors;
  } catch (error) {
    console.error('Error resolving author references:', error);
  } finally {
    isLoading.value = false;
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

      <!-- Loading state -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary dark:border-primary-dark"></div>
      </div>

      <!-- Authors grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AuthorCard
          v-for="(author, index) in resolvedAuthors"
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
