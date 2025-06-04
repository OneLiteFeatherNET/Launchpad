<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();

/**
 * A component that displays a back button to navigate to the previous page
 * following Material Design 3 guidelines
 */
const goBack = () => {
  router.back();
};
</script>

<template>
  <button 
    @click="goBack" 
    class="inline-flex items-center px-4 py-2 rounded-full bg-surface dark:bg-surface-dark text-on-surface dark:text-on-surface-dark hover:bg-surface-variant dark:hover:bg-surface-variant-dark transition-colors shadow-sm mb-4"
    :aria-label="t('common.back')"
  >
    <svg 
      class="w-5 h-5 mr-2" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      ></path>
    </svg>
    {{ t('common.back') }}
  </button>
</template>

<style scoped>
button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.5);
}

button:active {
  transform: translateY(1px);
}
</style>
