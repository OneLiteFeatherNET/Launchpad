import { useHead } from '#imports';
import { computed } from 'vue';

/**
 * Composable for setting SEO metadata
 * @param options Configuration options for SEO metadata
 */
export function useCustomSeoMeta(options: {
  title: string | (() => string);
  description: string | (() => string);
  image?: string | (() => string);
  path?: string | (() => string);
}) {
  const { locale } = useI18n();

  const titleValue = computed(() => {
    return typeof options.title === 'function' ? options.title() : options.title;
  });

  const descriptionValue = computed(() => {
    return typeof options.description === 'function' ? options.description() : options.description;
  });

  const imageValue = computed(() => {
    const defaultImage = '/logo.svg';
    if (!options.image) return defaultImage;
    return typeof options.image === 'function' ? options.image() : options.image;
  });

  const pathValue = computed(() => {
    if (!options.path) return '';
    return typeof options.path === 'function' ? options.path() : options.path;
  });

  // Set meta tags for SEO
  useHead({
    meta: [
      { name: 'description', content: descriptionValue },
      // Open Graph tags for social media sharing
      { property: 'og:title', content: titleValue },
      { property: 'og:description', content: descriptionValue },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: imageValue },
      // Twitter Card tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: titleValue },
      { name: 'twitter:description', content: descriptionValue },
      { name: 'twitter:image', content: imageValue },
    ],
    link: [
      { 
        rel: 'canonical', 
        href: computed(() => {
          if (!pathValue.value) return '';
          return `https://blog.onelitefeather.net/${locale.value === 'de' ? '' : locale.value}${pathValue.value}`;
        })
      }
    ]
  });
}
