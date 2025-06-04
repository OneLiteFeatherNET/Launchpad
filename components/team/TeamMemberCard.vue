<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  member: {
    type: Object,
    required: true
  },
  locale: {
    type: String,
    required: true
  }
});

// Function to get Minecraft head URL
const getMinecraftHeadUrl = (username?: string) => {
  return username ? `https://mc-heads.net/avatar/${username}/100` : '/images/authors/placeholder.svg';
};

// Determine if the member has a valid slug for linking
const hasValidSlug = computed(() => {
  return !!props.member.slug && props.member.slug.trim() !== '';
});

// Get the member's slug for routing
const memberSlug = computed(() => {
  return props.member.slug || '';
});
</script>

<template>
  <!-- Linked version for members with valid slug -->
  <NuxtLinkLocale v-if="hasValidSlug" :to="`/authors/${memberSlug}`" class="block">
    <div class="bg-surface-variant dark:bg-surface-variant-dark rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div class="p-6">
        <div class="flex items-center mb-4">
          <NuxtImg
            :src="getMinecraftHeadUrl(member.minecraftUsername)"
            :alt="`${member.name}'s avatar`"
            class="w-16 h-16 rounded-md mr-4"
            sizes="xs:64px sm:64px md:64px lg:64px xl:64px"
            width="64"
            height="64"
            format="webp"
            quality="80"
            loading="lazy"
          />
          <div>
            <h3 class="text-xl font-semibold text-on-surface dark:text-on-surface-dark">{{ member.name }}</h3>
            <p class="text-on-surface-variant dark:text-on-surface-variant-dark">{{ member.minecraftUsername }}</p>
          </div>
        </div>

        <div v-if="member.quote" class="mb-4 italic text-on-surface-variant dark:text-on-surface-variant-dark">
          "{{ member.quote }}"
        </div>

        <div class="flex flex-wrap gap-2 mt-4">
          <div v-if="member.joinDate" class="text-sm bg-primary-container dark:bg-primary-dark-container text-on-primary-container dark:text-on-primary-dark-container px-3 py-1 rounded-full">
            {{ $t('team.joined') }}: {{ new Date(member.joinDate).toLocaleDateString(locale) }}
          </div>
          <div v-if="member.onProbation" class="text-sm bg-error-container dark:bg-error-dark-container text-on-error-container dark:text-on-error-dark-container px-3 py-1 rounded-full">
            {{ $t('team.on_probation') }}
          </div>
        </div>

        <div class="flex items-center justify-center mt-4">
          <span class="text-sm text-on-surface-variant dark:text-on-surface-variant-dark">
            {{ $t('projects.view_profile') }}
          </span>
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
    </div>
  </NuxtLinkLocale>

  <!-- Non-linked version for members without slug -->
  <div v-else class="bg-surface-variant dark:bg-surface-variant-dark rounded-lg shadow-md overflow-hidden">
    <div class="p-6">
      <div class="flex items-center mb-4">
        <NuxtImg
          :src="getMinecraftHeadUrl(member.minecraftUsername)"
          :alt="`${member.name}'s avatar`"
          class="w-16 h-16 rounded-md mr-4"
          sizes="xs:64px sm:64px md:64px lg:64px xl:64px"
          width="64"
          height="64"
          format="webp"
          quality="80"
          loading="lazy"
        />
        <div>
          <h3 class="text-xl font-semibold text-on-surface dark:text-on-surface-dark">{{ member.name }}</h3>
          <p class="text-on-surface-variant dark:text-on-surface-variant-dark">{{ member.minecraftUsername }}</p>
        </div>
      </div>

      <div v-if="member.quote" class="mb-4 italic text-on-surface-variant dark:text-on-surface-variant-dark">
        "{{ member.quote }}"
      </div>

      <div class="flex flex-wrap gap-2 mt-4">
        <div v-if="member.joinDate" class="text-sm bg-primary-container dark:bg-primary-dark-container text-on-primary-container dark:text-on-primary-dark-container px-3 py-1 rounded-full">
          {{ $t('team.joined') }}: {{ new Date(member.joinDate).toLocaleDateString(locale) }}
        </div>
        <div v-if="member.onProbation" class="text-sm bg-error-container dark:bg-error-dark-container text-on-error-container dark:text-on-error-dark-container px-3 py-1 rounded-full">
          {{ $t('team.on_probation') }}
        </div>
      </div>
    </div>
  </div>
</template>
