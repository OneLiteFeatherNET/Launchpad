import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import type { ComputedRef } from 'vue'

/**
 * Composable for carousel functionality
 * @param totalSlides Total number of slides in the carousel or a computed property that returns the total
 * @param autoplayInterval Interval in milliseconds for autoplay (default: 5000ms)
 * @returns Carousel state and control functions
 */
export function useCarousel(totalSlides: number | ComputedRef<number>, autoplayInterval = 5000) {
  const current = ref(0)
  let interval: ReturnType<typeof setInterval> | null = null

  // Create a computed property to always get the current total slides
  const slidesCount = computed(() => {
    return typeof totalSlides === 'number' ? totalSlides : totalSlides.value;
  });

  // Go to a specific slide
  const goToSlide = (index: number) => {
    current.value = index
    resetInterval()
  }

  // Go to the next slide
  const nextSlide = () => {
    // Always use the current value of slidesCount
    if (slidesCount.value <= 0) return; // Guard against division by zero

    // Ensure we wrap around from last to first slide
    if (current.value >= slidesCount.value - 1) {
      current.value = 0;
    } else {
      current.value = current.value + 1;
    }
    resetInterval()
  }

  // Go to the previous slide
  const prevSlide = () => {
    // Always use the current value of slidesCount
    if (slidesCount.value <= 0) return; // Guard against division by zero

    // Ensure we wrap around from first to last slide
    if (current.value <= 0) {
      current.value = slidesCount.value - 1;
    } else {
      current.value = current.value - 1;
    }
    resetInterval()
  }

  // Reset the autoplay interval
  const resetInterval = () => {
    if (interval) clearInterval(interval)
    interval = setInterval(() => {
      // Always use the current value of slidesCount
      if (slidesCount.value <= 0) return; // Guard against division by zero

      // Ensure we wrap around from last to first slide (same logic as nextSlide)
      if (current.value >= slidesCount.value - 1) {
        current.value = 0;
      } else {
        current.value = current.value + 1;
      }
    }, autoplayInterval)
  }

  // Start the carousel on mount
  onMounted(() => {
    resetInterval()
  })

  // Clean up the interval on unmount
  onBeforeUnmount(() => {
    if (interval) clearInterval(interval)
  })

  return {
    current,
    goToSlide,
    nextSlide,
    prevSlide,
    resetInterval
  }
}
