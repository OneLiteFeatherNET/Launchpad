<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  authors: {
    type: Array,
    required: true
  }
});

// Function to get Minecraft head URL
const getMinecraftHeadUrl = (username: string) => {
  return `https://mc-heads.net/avatar/${username}/100`;
};

// Function to get profile image URL
const getProfileImageUrl = (author: any) => {
  // If profileImage is provided, use it
  if (author.profileImage) {
    return author.profileImage;
  }
  
  // Otherwise use Minecraft head
  return getMinecraftHeadUrl(author.minecraftUsername);
};

const { locale } = useI18n();
</script>

<template>
  <section class="py-12 px-4 sm:px-6 lg:px-8 bg-surface-variant dark:bg-surface-variant-dark">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-2xl font-bold text-on-surface-variant dark:text-on-surface-variant-dark mb-8">
        {{ $t('projects.authors') }}
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(author, index) in authors" 
          :key="index"
          class="bg-surface dark:bg-surface-dark rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
        >
          <NuxtLinkLocale :to="`/team/${author.slug || ''}`" class="block">
            <div class="p-6 flex flex-col items-center text-center">
              <!-- Author Image -->
              <div class="w-24 h-24 rounded-full overflow-hidden bg-primary-container dark:bg-primary-container-dark mb-4">
                <img 
                  :src="getProfileImageUrl(author)" 
                  :alt="`${author.name}'s profile picture`"
                  class="w-full h-full object-cover"
                />
              </div>
              
              <!-- Author Info -->
              <h3 class="text-xl font-bold text-on-surface dark:text-on-surface-dark mb-2">
                {{ author.name }}
              </h3>
              
              <p v-if="author.role" class="text-on-surface-variant dark:text-on-surface-variant-dark mb-2">
                {{ author.role }}
              </p>
              
              <div class="flex items-center justify-center mt-2">
                <span class="text-sm text-on-surface-variant dark:text-on-surface-variant-dark">
                  {{ $t('projects.view_profile') }}
                </span>
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
  </section>
</template>