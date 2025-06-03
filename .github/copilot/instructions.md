# GitHub Copilot Instructions for OneLiteFeather Blog

This document provides context and guidance for GitHub Copilot when working with the OneLiteFeather Blog codebase. It helps Copilot understand the project structure, coding standards, and patterns to follow.

## Project Overview

OneLiteFeather Blog is a multilingual blog platform built with Nuxt 3, featuring content in both German and English. It serves as the official blog for OneLiteFeather.net, a Minecraft network focusing on development tools.

### Key Features

- Multilingual content (German and English)
- Responsive design with Tailwind CSS
- SEO optimization with meta tags, sitemap, and robots.txt
- Content management using Nuxt Content
- Social media preview images
- Structured data for better search engine visibility
- Project showcase with GitHub integration
- Team member profiles with Minecraft avatar support
- Cross-referencing between blog posts, projects, and team members
- BStats integration for Minecraft plugins

## Technology Stack

- **Framework**: Nuxt 3 (Vue 3)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content Management**: Nuxt Content
- **Internationalization**: Nuxt i18n
- **SEO**: Nuxt SEO, sitemap, robots.txt, schema.org
- **Deployment**: Cloudflare Pages
- **Analytics**: Google Tag Manager, PostHog

## Project Structure

- `content/` - Blog posts and other content (organized by language)
- `components/` - Vue components
  - `base/` - Reusable UI components
  - `[feature-name]/` - Feature-specific components
- `layouts/` - Page layouts
- `pages/` - Application pages
- `public/` - Static assets
- `i18n/` - Internationalization configuration
- `docs/` - Project documentation
- `composables/` - Reusable composition functions

## Coding Standards

### Component Structure

Components use Vue 3's Composition API with `<script setup>` syntax and TypeScript:

```vue
<template>
  <!-- Template code here -->
</template>

<script setup lang="ts">
// Imports
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  // Define props here
})

// Emits
const emit = defineEmits([
  // Define emits here
])

// Refs and reactive state
const localState = ref(null)

// Computed properties
const derivedValue = computed(() => {
  // Compute value based on props or state
})

// Methods
function handleEvent() {
  // Handle event and possibly emit
}

// Lifecycle hooks if needed
onMounted(() => {
  // Mounted logic
})
</script>

<style scoped>
/* Component-specific styles (if not using Tailwind) */
</style>
```

### Naming Conventions

- Use PascalCase for component names (e.g., `NavigationBar.vue`, `BlogPostCard.vue`)
- Be descriptive and specific (e.g., use `NavigationSimpleButton.vue` instead of just `Button.vue`)
- For base components, consider prefixing with the component type (e.g., `BaseButton.vue`, `BaseInput.vue`)
- For feature components, prefix with the feature name (e.g., `BlogPostCard.vue`, `BlogCommentSection.vue`)

### Styling Guidelines

- Use Tailwind CSS classes for styling when possible
- For complex components, consider using scoped CSS
- Follow the project's color palette and design tokens
- Ensure responsive design for all components
- Use CSS variables for theming and consistent values

### Internationalization

- All user-facing text should use the i18n system
- Content is organized by language in the `content/` directory
- The default language is German (`de`), with English (`en`) as an alternative
- URLs follow the pattern `/{locale}/path` (e.g., `/de/blog/post-1`, `/en/blog/post-1`)

### SEO Best Practices

- Each page should have appropriate meta tags
- Use canonical URLs for multilingual content
- Implement structured data using schema.org
- Generate social media preview images

## Content Structure

Content is managed using Nuxt Content and organized by language:

```
content/
├── de/
│   ├── blog/
│   │   └── post-1.md
│   ├── projects/
│   │   └── project-1.md
│   └── team/
│       └── member-1.md
├── en/
│   ├── blog/
│   │   └── post-1.md
│   ├── projects/
│   │   └── project-1.md
│   └── team/
│       └── member-1.md
└── homepage/
    ├── de/
    │   └── activities.json
    └── en/
        └── activities.json
```

## Best Practices

1. **Keep components focused**: Each component should have a single responsibility.
2. **Composition over inheritance**: Compose complex components from simpler ones.
3. **Avoid direct DOM manipulation**: Use Vue's reactivity system instead.
4. **Minimize side effects**: Components should be predictable and avoid unexpected behavior.
5. **Test components**: Write unit tests for components, especially for complex logic.
6. **Consider performance**: Be mindful of expensive operations and unnecessary re-renders.
7. **Internationalization**: Use the i18n system for all user-facing text.
8. **Accessibility**: Follow accessibility best practices (see the Accessibility Guide).

## Common Patterns

### Fetching Content

```typescript
// Fetch a single blog post
const { data: post } = await useAsyncData(`blog-${params.slug}`, () => 
  queryContent(`/${locale.value}/blog`)
    .where({ slug: params.slug })
    .findOne()
)

// Fetch a list of blog posts
const { data: posts } = await useAsyncData('blog-list', () => 
  queryContent(`/${locale.value}/blog`)
    .sort({ date: -1 })
    .limit(10)
    .find()
)
```

### Internationalization

```vue
<template>
  <h1>{{ $t('welcome') }}</h1>
  <p>{{ $t('description') }}</p>
  
  <NuxtLink :to="localePath('blog')">
    {{ $t('blog.view_all') }}
  </NuxtLink>
</template>
```

### SEO

```vue
<script setup>
useHead({
  title: 'Page Title',
  meta: [
    { name: 'description', content: 'Page description' }
  ]
})
</script>
```

## Additional Resources

For more detailed information, refer to the project documentation:

- [Component Design Guide](docs/component-design-guide.md)
- [Accessibility Guide](docs/accessibility-guide.md)
- [Canonical URLs Guide](docs/canonical-urls.md)
- [Optimizations](docs/optimizations.md)