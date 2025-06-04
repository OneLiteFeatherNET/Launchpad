<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const { t } = useI18n();
const isOpen = ref(false);
const javaCopied = ref(false);
const bedrockCopied = ref(false);

// Close popup when clicking outside
const popupRef = ref(null);
const buttonRef = ref(null);

const togglePopup = () => {
  isOpen.value = !isOpen.value;
};

const handleClickOutside = (event) => {
  if (
    isOpen.value && 
    popupRef.value && 
    !popupRef.value.contains(event.target) &&
    buttonRef.value && 
    !buttonRef.value.contains(event.target)
  ) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('touchstart', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('touchstart', handleClickOutside);
});

const copyToClipboard = async (text: string, type: 'java' | 'bedrock') => {
  try {
    await navigator.clipboard.writeText(text);
    if (type === 'java') {
      javaCopied.value = true;
      setTimeout(() => {
        javaCopied.value = false;
      }, 2000);
    } else {
      bedrockCopied.value = true;
      setTimeout(() => {
        bedrockCopied.value = false;
      }, 2000);
    }
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};
</script>

<template>
  <div class="minecraft-servers-popup">
    <!-- Centered button under the carousel -->
    <div class="w-full py-4 flex justify-center">
      <button 
        ref="buttonRef"
        @click="togglePopup" 
        class="flex items-center justify-center space-x-2 bg-primary hover:bg-secondary text-black px-4 py-3 md:px-6 md:py-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 text-sm sm:text-base"
        :aria-expanded="isOpen"
        aria-controls="minecraft-servers-content"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7" />
        </svg>
        <span>{{ $t('minecraft.toggle_servers') }}</span>
      </button>
    </div>

    <!-- Popup content -->
    <transition name="fade">
      <div 
        v-if="isOpen" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black bg-opacity-50"
        role="dialog"
        aria-modal="true"
      >
        <div 
          ref="popupRef"
          id="minecraft-servers-content"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto transform transition-all duration-300 ease-in-out"
        >
          <!-- Popup header -->
          <div class="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ $t('minecraft.servers') }}</h2>
            <button 
              @click="togglePopup" 
              class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
              :aria-label="$t('minecraft.close')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Popup body -->
          <div class="p-4 sm:p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <!-- Java Edition -->
              <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
                <h3 class="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white">{{ $t('minecraft.java.title') }}</h3>
                <div class="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded p-3 mb-3">
                  <code class="text-sm font-mono text-gray-800 dark:text-gray-200">{{ $t('minecraft.java.address') }}</code>
                  <button 
                    @click="copyToClipboard($t('minecraft.java.address'), 'java')" 
                    class="bg-primary hover:bg-secondary text-white px-3 py-1 rounded text-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                    :aria-label="$t('minecraft.java.copy')"
                  >
                    <span v-if="!javaCopied">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    </span>
                    <span v-else>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </button>
                </div>
                <p v-if="javaCopied" class="text-sm text-green-600 dark:text-green-400 text-center">{{ $t('minecraft.java.copied') }}</p>
              </div>

              <!-- Bedrock Edition -->
              <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
                <h3 class="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white">{{ $t('minecraft.bedrock.title') }}</h3>
                <div class="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded p-3 mb-2">
                  <code class="text-sm font-mono text-gray-800 dark:text-gray-200">{{ $t('minecraft.bedrock.address') }}</code>
                </div>
                <div class="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded p-3 mb-3">
                  <code class="text-sm font-mono text-gray-800 dark:text-gray-200">{{ $t('minecraft.bedrock.port') }}</code>
                  <button 
                    @click="copyToClipboard($t('minecraft.bedrock.address') + ':' + $t('minecraft.bedrock.port'), 'bedrock')" 
                    class="bg-primary hover:bg-secondary text-white px-3 py-1 rounded text-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                    :aria-label="$t('minecraft.bedrock.copy')"
                  >
                    <span v-if="!bedrockCopied">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    </span>
                    <span v-else>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </button>
                </div>
                <p v-if="bedrockCopied" class="text-sm text-green-600 dark:text-green-400 text-center">{{ $t('minecraft.bedrock.copied') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
