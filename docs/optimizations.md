# Optimizations Documentation

This document outlines the optimizations made to the codebase to improve maintainability, performance, and accessibility.

## New Composables

### useLocalizedContent

A composable for fetching localized content from the content collections.

```typescript
const { data, pending, error, refresh } = useLocalizedContent('collection-name', { optionalQueryParam: 'value' })
```

**Parameters:**
- `baseCollectionName`: The base name of the collection without locale suffix
- `queryParams`: Optional query parameters for filtering the collection

**Returns:**
- `data`: The fetched content
- `pending`: Boolean indicating if the request is still pending
- `error`: Any error that occurred during the request
- `refresh`: Function to refresh the data

**Example:**
```typescript
// Fetch localized carousel data
const { data: carouselData } = await useLocalizedContent('carousel')

// Fetch a specific blog post by slug
const { data: article } = await useLocalizedContent('blog', { slug: 'my-article' })
```

### useCarousel

A composable for carousel functionality.

```typescript
const { current, goToSlide, nextSlide, prevSlide } = useCarousel(slidesCount, autoplayInterval)
```

**Parameters:**
- `totalSlides`: Total number of slides in the carousel
- `autoplayInterval`: Interval in milliseconds for autoplay (default: 5000ms)

**Returns:**
- `current`: Ref with the current slide index
- `goToSlide`: Function to go to a specific slide
- `nextSlide`: Function to go to the next slide
- `prevSlide`: Function to go to the previous slide
- `resetInterval`: Function to reset the autoplay interval

**Example:**
```vue
<script setup>
const props = defineProps({
  slides: Array
})

const { current, goToSlide, nextSlide, prevSlide } = useCarousel(
  computed(() => props.slides.length)
)
</script>
```

### useSeoHelper

A composable for managing SEO metadata.

```typescript
const seoHelper = useSeoHelper({ defaultLocale: 'de' })

// Set basic SEO metadata
seoHelper.setBasicSeo({
  title: 'Page Title',
  description: 'Page description',
  image: '/path/to/image.jpg',
  type: 'article'
})

// Set canonical and alternate language links
seoHelper.setCanonicalAndAlternates(
  '/page-path',
  'translation-key',
  alternateUrls
)
```

**Parameters:**
- `options`: Configuration options
  - `defaultLocale`: The default locale for the site (default: 'de')

**Methods:**
- `setBasicSeo`: Set basic SEO metadata
- `setCanonicalAndAlternates`: Set canonical and alternate language links

## Accessibility Improvements

- Carousel components now use proper ARIA attributes
- Images use NuxtImg for better optimization and include alt text
- Proper semantic HTML structure

## Performance Improvements

- Using NuxtImg for image optimization
- Reduced code duplication
- More efficient data fetching

## How to Use These Optimizations

### Optimizing Pages

1. Replace repetitive data fetching with useLocalizedContent:

```typescript
// Before
const { data: carouselData } = await useAsyncData('carousel', () => {
  const collection = locale.value === 'de' ? 'carousel_de' : 'carousel_en';
  return queryCollection(collection).first();
});

// After
const { data: carouselData } = await useLocalizedContent('carousel');
```

2. Replace complex SEO logic with useSeoHelper:

```typescript
// Before
useSeoMeta({
  title: page.title,
  description: page.description,
  // ... many more properties
})

// After
seoHelper.setBasicSeo({
  title: page.title,
  description: page.description,
  image: page.image,
  type: 'article'
})
```

### Optimizing Components

1. Replace carousel logic with useCarousel:

```typescript
// Before
const current = ref(0);
let interval = null;
// ... many more lines of carousel logic

// After
const { current, goToSlide, nextSlide, prevSlide } = useCarousel(
  computed(() => slides.length)
)
```

2. Replace img tags with NuxtImg:

```vue
<!-- Before -->
<img :src="image.src" :alt="image.alt" class="..." />

<!-- After -->
<NuxtImg 
  :src="image.src" 
  :alt="image.alt" 
  class="..."
  sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw"
  width="1920"
  height="1080"
  format="webp"
  quality="80"
/>
```