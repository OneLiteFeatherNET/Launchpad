<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  slides: {
    type: Array,
    required: true,
    default: () => []
  }
});

const current = ref(0);
let interval: ReturnType<typeof setInterval> | null = null;

const goToSlide = (index: number) => {
  current.value = index;
  resetInterval();
};

const nextSlide = () => {
  current.value = (current.value + 1) % props.slides.length;
  resetInterval();
};

const prevSlide = () => {
  current.value = (current.value - 1 + props.slides.length) % props.slides.length;
  resetInterval();
};

const resetInterval = () => {
  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    current.value = (current.value + 1) % props.slides.length;
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
          :aria-label="$t('carousel.previous_slide')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          @click="nextSlide" 
          class="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 text-white transition-all duration-300"
          :aria-label="$t('carousel.next_slide')"
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
          :aria-label="$t('carousel.go_to_slide', { number: idx + 1 })"
      ></button>
    </div>
  </section>
</template>
