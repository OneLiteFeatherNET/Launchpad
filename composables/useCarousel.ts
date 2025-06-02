import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * Composable for carousel functionality
 * @param totalSlides Total number of slides in the carousel
 * @param autoplayInterval Interval in milliseconds for autoplay (default: 5000ms)
 * @returns Carousel state and control functions
 */
export function useCarousel(totalSlides: number, autoplayInterval = 5000) {
  const current = ref(0)
  let interval: ReturnType<typeof setInterval> | null = null

  // Go to a specific slide
  const goToSlide = (index: number) => {
    current.value = index
    resetInterval()
  }

  // Go to the next slide
  const nextSlide = () => {
    current.value = (current.value + 1) % totalSlides
    resetInterval()
  }

  // Go to the previous slide
  const prevSlide = () => {
    current.value = (current.value - 1 + totalSlides) % totalSlides
    resetInterval()
  }

  // Reset the autoplay interval
  const resetInterval = () => {
    if (interval) clearInterval(interval)
    interval = setInterval(() => {
      current.value = (current.value + 1) % totalSlides
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