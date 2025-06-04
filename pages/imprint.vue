<script setup lang="ts">
import { definePageMeta } from "#imports";
import PageContainer from '~/components/common/PageContainer.vue';
import PageHeader from '~/components/common/PageHeader.vue';
import ImprintContent from '~/components/imprint/ImprintContent.vue';

// Define page meta for SEO
definePageMeta({
  title: 'blog.imprint.title',
});

// Use the SEO composable for additional meta tags
useCustomSeoMeta({
  title: () => useI18n().t('blog.imprint.title'),
  description: () => useI18n().t('blog.imprint.description'),
  path: '/imprint'
});
</script>

<template>
  <PageContainer narrow>
    <PageHeader title="Impressum" />

    <ImprintContent />
  </PageContainer>
</template>
