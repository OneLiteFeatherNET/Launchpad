<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const { locale } = useI18n();

// Fetch carousel data
const { data: carouselData } = await useAsyncData('carousel', () => {
  const collection = locale.value === 'de' ? 'carousel_de' : 'carousel_en';
  return queryCollection(collection).first();
});

// Fetch history data
const { data: historyData } = await useAsyncData('history', () => {
  const collection = locale.value === 'de' ? 'history_de' : 'history_en';
  return queryCollection(collection).first();
});

// Fetch activities data
const { data: activitiesData } = await useAsyncData('activities', () => {
  const collection = locale.value === 'de' ? 'activities_de' : 'activities_en';
  return queryCollection(collection).first();
});

const slides = computed(() => carouselData.value?.slides || []);
const historyTitle = computed(() => historyData.value?.title || '');
const timeline = computed(() => historyData.value?.timeline || []);
const activitiesTitle = computed(() => activitiesData.value?.title || '');
const activities = computed(() => activitiesData.value?.activities || []);

const current = ref(0);
let interval: ReturnType<typeof setInterval> | null = null;

const goToSlide = (index: number) => {
  current.value = index;
  resetInterval();
};

const nextSlide = () => {
  current.value = (current.value + 1) % slides.length;
  resetInterval();
};

const prevSlide = () => {
  current.value = (current.value - 1 + slides.length) % slides.length;
  resetInterval();
};

const resetInterval = () => {
  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    current.value = (current.value + 1) % slides.length;
  }, 5000);
};

onMounted(() => {
  resetInterval();
});

onBeforeUnmount(() => {
  if (interval) clearInterval(interval);
});
</script>

<template>
  <div>
    <!-- Full-width Image Carousel with M3 Design -->
    <section class="relative w-full">
      <div class="overflow-hidden bg-surface">
        <div class="relative h-[60vh] w-full">
          <transition-group name="slide-fade" tag="div">
            <div
                v-for="(slide, idx) in slides"
                :key="slide.title"
                v-show="current === idx"
                class="absolute inset-0"
            >
              <div class="relative h-full w-full">
                <img 
                  :src="slide.image" 
                  :alt="slide.title"
                  class="h-full w-full object-cover brightness-75"
                />
                <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-black bg-opacity-40">
                  <h1 class="text-white text-4xl md:text-5xl font-bold mb-4">{{ slide.title }}</h1>
                  <p class="text-white text-xl md:text-2xl max-w-3xl">{{ slide.subtitle }}</p>
                </div>
              </div>
            </div>
          </transition-group>

          <!-- Navigation Arrows -->
          <button 
            @click="prevSlide" 
            class="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 text-white transition-all duration-300"
            aria-label="Vorherige Folie"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            @click="nextSlide" 
            class="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 text-white transition-all duration-300"
            aria-label="Nächste Folie"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Slide Indicators -->
      <div class="flex justify-center mt-4 space-x-3 pb-6">
        <button
            v-for="(slide, idx) in slides"
            :key="idx"
            @click="goToSlide(idx)"
            :class="[
              'w-4 h-4 rounded-full transition-all duration-300', 
              current === idx 
                ? idx === 0 
                  ? 'bg-secondary scale-125' 
                  : idx === 1 
                    ? 'bg-secondary-orange-color scale-125' 
                    : 'bg-secondary-cyan-color scale-125'
                : 'bg-outline-variant'
            ]"
            aria-label="Zur Folie {{ idx + 1 }}"
        ></button>
      </div>
    </section>

    <!-- Timeline Section -->
    <section class="py-16 bg-surface">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-secondary mb-12">{{ historyTitle }}</h2>

        <div class="relative overflow-x-auto pb-8">
          <div class="flex space-x-8 min-w-max px-4">
            <!-- Timeline Items -->
            <div 
              v-for="(item, index) in timeline" 
              :key="index"
              :class="`timeline-item bg-${item.color}-container p-6 rounded-lg shadow-md min-w-[300px]`"
            >
              <h3 :class="`text-xl font-bold text-${item.color} mb-2`">{{ item.year }}</h3>
              <p class="text-on-surface-variant">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Activities Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-secondary-blue-color mb-12">{{ activitiesTitle }}</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Activity Cards -->
          <div 
            v-for="(activity, index) in activities" 
            :key="index"
            class="bg-surface rounded-lg shadow-md overflow-hidden"
          >
            <div class="h-48 relative">
              <img 
                :src="activity.image" 
                :alt="activity.title" 
                class="h-full w-full object-cover"
              />
              <div :class="`absolute inset-0 bg-${activity.color}-container bg-opacity-50`"></div>
            </div>
            <div class="p-6">
              <h3 :class="`text-xl font-bold text-${activity.color}-color mb-2`">{{ activity.title }}</h3>
              <p class="text-on-surface-variant">{{ activity.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* For horizontal scrolling on timeline */
.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: var(--md-sys-color-secondary) transparent;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: var(--md-sys-color-secondary);
  border-radius: 20px;
}
</style>
