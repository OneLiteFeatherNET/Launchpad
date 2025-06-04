<script setup lang="ts">
import type { BlogPostListItem } from '~/types/blog';
import ArticleCard from "~/components/blog/page/card/ArticleCard.vue";
import Top1 from "~/components/blog/page/top1/Top1.vue";
import { definePageMeta } from "#imports";

const { t } = useI18n();
const { fetchFeaturedBlogPost, fetchBlogPosts } = useBlog();

// Define page metadata
definePageMeta({
  title: 'blog.overview.title',
});

// Fetch the featured blog post (most recent)
const { data: top1Article, pending: featuredLoading } = await fetchFeaturedBlogPost();

// Fetch all blog posts
const { data: allPostsData, pending: postsLoading } = await fetchBlogPosts();

// Remove the first item as it is already displayed in Top1
const allPosts = computed(() => {
  if (!allPostsData.value) return [];
  return allPostsData.value.slice(1);
});

// Set up head metadata
useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg'
    }
  ]
});

// Prepare social media preview image
const img = useImage();
const previewSocial = img('images/logo.svg', {
  width: 1200,
  height: 630,
  format: 'webp',
  quality: 80,
});

// Set up SEO metadata
useSeoMeta({
  description: t('blog.overview.description'),
  ogDescription: t('blog.overview.description'),
  ogImage: previewSocial,
  twitterTitle: t('blog.overview.title'),
  twitterDescription: t('blog.overview.description'),
  twitterImage: previewSocial
});

// Set up Schema.org metadata
useSchemaOrg({
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: t('blog.overview.title'),
  description: t('blog.overview.description'),
  url: previewSocial,
  image: previewSocial,
});
</script>

<template>
  <div class="container mx-auto py-4">
    <Top1
        v-if="top1Article"
        :blogArticle="top1Article"
    />
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 lg:mx-16">
      <LazyBlogPageCardArticleCard
          v-for="article in allPosts"
          :blogArticle="article" />
    </div>
  </div>
</template>

<style scoped>

</style>
