<script setup lang="ts">
import { computed } from 'vue';
import PageContainer from '~/components/common/PageContainer.vue';

const { locale, t } = useI18n();

// SEO optimization
definePageMeta({
  title: 'blog.rules.title',
});

// Fetch rules data based on current locale
const { data: rulesData } = await useAsyncData('rules', () => {
  const collection = locale.value === 'de' ? 'rules_de' : 'rules_en';
  return queryCollection(collection).first();
});

// Computed properties for rules data
const title = computed(() => rulesData.value?.title || '');
const description = computed(() => rulesData.value?.description || '');
const generalRules = computed(() => rulesData.value?.generalRules || []);
const sections = computed(() => rulesData.value?.sections || []);
// For backward compatibility
const rules = computed(() => rulesData.value?.rules || []);

// Use the SEO composable for meta tags
useCustomSeoMeta({
  title: () => title.value || t('blog.rules.title'),
  description: () => description.value || t('blog.rules.description'),
  path: '/rules'
});
</script>

<template>
  <PageContainer>
    <!-- Page Header -->
    <div class="mb-12">
      <h1 class="text-4xl font-bold mb-4">{{ title }}</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">{{ description }}</p>
    </div>

    <!-- General Rules -->
    <div v-if="generalRules.length > 0" class="mb-12">
      <h2 class="text-3xl font-bold mb-6">Allgemeine Regeln / General Rules</h2>
      <div class="space-y-6">
        <div v-for="(rule, index) in generalRules" :key="index" class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 class="text-2xl font-semibold mb-2">{{ rule.title }}</h3>
          <p class="text-gray-700 dark:text-gray-300 whitespace-pre-line">{{ rule.description }}</p>
        </div>
      </div>
    </div>

    <!-- Sections -->
    <div v-for="(section, sectionIndex) in sections" :key="'section-' + sectionIndex" class="mb-12">
      <h2 class="text-3xl font-bold mb-4">{{ section.title }}</h2>
      <p v-if="section.description" class="text-lg text-gray-600 dark:text-gray-300 mb-6">{{ section.description }}</p>

      <div class="space-y-6">
        <div v-for="(rule, ruleIndex) in section.rules" :key="'section-' + sectionIndex + '-rule-' + ruleIndex" class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 class="text-2xl font-semibold mb-2">{{ rule.title }}</h3>
          <p class="text-gray-700 dark:text-gray-300 whitespace-pre-line">{{ rule.description }}</p>
        </div>
      </div>
    </div>

    <!-- Legacy Rules (for backward compatibility) -->
    <div v-if="rules.length > 0 && generalRules.length === 0 && sections.length === 0" class="space-y-6">
      <div v-for="(rule, index) in rules" :key="index" class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 class="text-2xl font-semibold mb-2">{{ rule.title }}</h3>
        <p class="text-gray-700 dark:text-gray-300 whitespace-pre-line">{{ rule.description }}</p>
      </div>
    </div>
  </PageContainer>
</template>
