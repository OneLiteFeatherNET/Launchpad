<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  author: {
    type: Object,
    required: true
  },
  displayMode: {
    type: String,
    default: 'card', // 'compact', 'card', 'detailed'
    validator: (value: string) => ['compact', 'card', 'detailed'].includes(value)
  },
  showRole: {
    type: Boolean,
    default: true
  },
  showViewProfile: {
    type: Boolean,
    default: true
  },
  showQuote: {
    type: Boolean,
    default: false
  },
  showTeamInfo: {
    type: Boolean,
    default: false
  }
});

const { locale } = useI18n();

// Function to get Minecraft head URL
const getMinecraftHeadUrl = (username?: string) => {
  return username ? `https://mc-heads.net/avatar/${username}/100` : '/images/authors/placeholder.svg';
};

// Function to get profile image URL with fallbacks
const getProfileImageUrl = computed(() => {
  const author = props.author;

  // First priority: profileImage
  if (author.profileImage) {
    return author.profileImage;
  }

  // Second priority: avatar
  if (author.avatar) {
    return author.avatar;
  }

  // Third priority: Minecraft head
  if (author.minecraftUsername) {
    return getMinecraftHeadUrl(author.minecraftUsername);
  }

  // Last resort: use slug for Minecraft head
  if (author.slug) {
    return getMinecraftHeadUrl(author.slug);
  }

  // Fallback to a placeholder avatar
  return '/images/authors/placeholder.svg';
});

// Determine if we should show the author's role
const shouldShowRole = computed(() => {
  return props.showRole && props.author.role;
});

// Get the author's about text, preferring about over bio
const aboutText = computed(() => {
  return props.author.about || props.author.bio || '';
});

// Determine if we should show the quote
const shouldShowQuote = computed(() => {
  return props.showQuote && props.author.quote;
});

// Determine if we should show team info
const shouldShowTeamInfo = computed(() => {
  return props.showTeamInfo && (props.author.joinDate || props.author.onProbation);
});

// Determine image size based on display mode
const imageSize = computed(() => {
  switch (props.displayMode) {
    case 'compact':
      return 'w-10 h-10';
    case 'card':
      return 'w-24 h-24';
    case 'detailed':
      return 'w-16 h-16';
    default:
      return 'w-16 h-16';
  }
});

// Determine heading level based on display mode
const headingLevel = computed(() => {
  switch (props.displayMode) {
    case 'compact':
      return 'span';
    case 'card':
    case 'detailed':
      return 'h3';
    default:
      return 'h3';
  }
});

// Determine if the author has a valid slug for linking
const hasValidSlug = computed(() => {
  return !!props.author.slug && props.author.slug.trim() !== '';
});

// Get the author's slug for routing
const authorSlug = computed(() => {
  return props.author.slug || '';
});
</script>

<template>
  <div 
    :class="[
      'author-card',
      displayMode === 'compact' ? 'author-card--compact' : '',
      displayMode === 'card' ? 'author-card--card' : '',
      displayMode === 'detailed' ? 'author-card--detailed' : ''
    ]"
  >
    <!-- Compact Mode -->
    <NuxtLinkLocale 
      v-if="displayMode === 'compact' && hasValidSlug" 
      :to="`/authors/${authorSlug}`"
      class="flex items-center p-3 bg-surface dark:bg-surface-dark rounded-lg hover:bg-surface-variant dark:hover:bg-surface-variant-dark transition-colors"
      :aria-label="$t('author.view_profile_of', { name: author.name })"
    >
      <div :class="[imageSize, 'rounded-full overflow-hidden mr-3']">
        <NuxtImg
          :src="getProfileImageUrl"
          :alt="`${author.name}'s avatar`"
          class="w-full h-full object-cover"
          sizes="xs:100px sm:100px md:100px lg:100px xl:100px"
          width="100"
          height="100"
          format="webp"
          quality="80"
          loading="lazy"
        />
      </div>
      <span class="text-on-surface dark:text-on-surface-dark">{{ author.name }}</span>
    </NuxtLinkLocale>

    <!-- Card Mode -->
    <div v-else-if="displayMode === 'card'" class="bg-surface dark:bg-surface-dark rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <NuxtLinkLocale 
        v-if="hasValidSlug" 
        :to="`/authors/${authorSlug}`" 
        class="block"
        :aria-label="$t('author.view_profile_of', { name: author.name })"
      >
        <div class="p-6 flex flex-col items-center text-center">
          <div :class="[imageSize, 'rounded-full overflow-hidden bg-primary-container dark:bg-primary-container-dark mb-4']">
            <NuxtImg 
              :src="getProfileImageUrl" 
              :alt="`${author.name}'s profile picture`"
              class="w-full h-full object-cover"
              sizes="xs:100px sm:100px md:100px lg:100px xl:100px"
              width="100"
              height="100"
              format="webp"
              quality="80"
              loading="lazy"
            />
          </div>

          <component :is="headingLevel" class="text-xl font-bold text-on-surface dark:text-on-surface-dark mb-2">
            {{ author.name }}
          </component>

          <p v-if="shouldShowRole" class="text-on-surface-variant dark:text-on-surface-variant-dark mb-2">
            {{ author.role }}
          </p>

          <div v-if="showViewProfile" class="flex items-center justify-center mt-2">
            <span class="text-sm text-on-surface-variant dark:text-on-surface-variant-dark">
              {{ $t('projects.view_profile') }}
            </span>
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </NuxtLinkLocale>

      <!-- Non-linked version for authors without slug -->
      <div v-else class="p-6 flex flex-col items-center text-center">
        <div :class="[imageSize, 'rounded-full overflow-hidden bg-primary-container dark:bg-primary-container-dark mb-4']">
          <NuxtImg 
            :src="getProfileImageUrl" 
            :alt="`${author.name}'s profile picture`"
            class="w-full h-full object-cover"
            sizes="xs:100px sm:100px md:100px lg:100px xl:100px"
            width="100"
            height="100"
            format="webp"
            quality="80"
            loading="lazy"
          />
        </div>

        <component :is="headingLevel" class="text-xl font-bold text-on-surface dark:text-on-surface-dark mb-2">
          {{ author.name }}
        </component>

        <p v-if="shouldShowRole" class="text-on-surface-variant dark:text-on-surface-variant-dark mb-2">
          {{ author.role }}
        </p>
      </div>
    </div>

    <!-- Detailed Mode -->
    <div v-else-if="displayMode === 'detailed'" class="bg-surface-variant dark:bg-surface-variant-dark rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <NuxtLinkLocale 
        v-if="hasValidSlug" 
        :to="`/authors/${authorSlug}`" 
        class="block"
        :aria-label="$t('author.view_profile_of', { name: author.name })"
      >
        <div class="p-6">
          <div class="flex items-center mb-4">
            <NuxtImg
              :src="getProfileImageUrl"
              :alt="`${author.name}'s profile picture`"
              :class="[imageSize, 'rounded-md mr-4']"
              sizes="xs:100px sm:100px md:100px lg:100px xl:100px"
              width="100"
              height="100"
              format="webp"
              quality="80"
              loading="lazy"
            />
            <div>
              <component :is="headingLevel" class="text-xl font-semibold text-on-surface dark:text-on-surface-dark">
                {{ author.name }}
              </component>
              <p v-if="author.minecraftUsername" class="text-on-surface-variant dark:text-on-surface-variant-dark">
                {{ author.minecraftUsername }}
              </p>
            </div>
          </div>

          <div v-if="shouldShowQuote" class="mb-4 italic text-on-surface-variant dark:text-on-surface-variant-dark">
            "{{ author.quote }}"
          </div>

          <div v-if="shouldShowTeamInfo" class="flex flex-wrap gap-2 mt-4">
            <div v-if="author.joinDate" class="text-sm bg-primary-container dark:bg-primary-dark-container text-on-primary-container dark:text-on-primary-dark-container px-3 py-1 rounded-full">
              {{ $t('team.joined') }}: {{ new Date(author.joinDate).toLocaleDateString(locale) }}
            </div>
            <div v-if="author.onProbation" class="text-sm bg-error-container dark:bg-error-dark-container text-on-error-container dark:text-on-error-dark-container px-3 py-1 rounded-full">
              {{ $t('team.on_probation') }}
            </div>
          </div>

          <div v-if="showViewProfile" class="flex items-center justify-center mt-4">
            <span class="text-sm text-on-surface-variant dark:text-on-surface-variant-dark">
              {{ $t('projects.view_profile') }}
            </span>
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </NuxtLinkLocale>

      <!-- Non-linked version for authors without slug -->
      <div v-else class="p-6">
        <div class="flex items-center mb-4">
          <NuxtImg
            :src="getProfileImageUrl"
            :alt="`${author.name}'s profile picture`"
            :class="[imageSize, 'rounded-md mr-4']"
            sizes="xs:100px sm:100px md:100px lg:100px xl:100px"
            width="100"
            height="100"
            format="webp"
            quality="80"
            loading="lazy"
          />
          <div>
            <component :is="headingLevel" class="text-xl font-semibold text-on-surface dark:text-on-surface-dark">
              {{ author.name }}
            </component>
            <p v-if="author.minecraftUsername" class="text-on-surface-variant dark:text-on-surface-variant-dark">
              {{ author.minecraftUsername }}
            </p>
          </div>
        </div>

        <div v-if="shouldShowQuote" class="mb-4 italic text-on-surface-variant dark:text-on-surface-variant-dark">
          "{{ author.quote }}"
        </div>

        <div v-if="shouldShowTeamInfo" class="flex flex-wrap gap-2 mt-4">
          <div v-if="author.joinDate" class="text-sm bg-primary-container dark:bg-primary-dark-container text-on-primary-container dark:text-on-primary-dark-container px-3 py-1 rounded-full">
            {{ $t('team.joined') }}: {{ new Date(author.joinDate).toLocaleDateString(locale) }}
          </div>
          <div v-if="author.onProbation" class="text-sm bg-error-container dark:bg-error-dark-container text-on-error-container dark:text-on-error-dark-container px-3 py-1 rounded-full">
            {{ $t('team.on_probation') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
