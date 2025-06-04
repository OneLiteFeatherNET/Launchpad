// Test script to verify that the useLocalizedContent composable works correctly
// Run this script with: node tests/test-blog-article.js

// Import the useLocalizedContent composable
import { useLocalizedContent } from '../composables/useLocalizedContent';

// Set up a test environment
const testSlug = 'effizientes-logging-paper-plugins-slf4j-log4j2-grafana-loki';

// Use the composable to fetch the article
const { data: article } = useLocalizedContent('blog', { slug: testSlug });

// Log the result
console.log('Article:', article.value);

// Check if the article was found
if (article.value) {
  console.log('Article found:', article.value.title);
} else {
  console.log('Article not found for slug:', testSlug);
}