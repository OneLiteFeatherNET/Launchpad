<template>
  <v-carousel
    id="carousel"
    height="calc(100vh - 64px)"
    hide-delimiter-background
    :show-arrows="false"
    color="white"
    progress
    cycle
  >
    <v-carousel-item v-for="(image, i) in images" :key="i" cover :src="image">
      <div class="carousel-item-title poppins">
        {{ $t(`pages.index.carousel.${i}.title`) }}
      </div>

      <div class="carousel-item-description">
        {{ $t(`pages.index.carousel.${i}.description`) }}
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script setup lang="ts">
import { ref } from "#imports";
import slideshow1 from "~/assets/images/carousel/slideshow1.png";
import slideshow2 from "~/assets/images/carousel/slideshow2.png";
import slideshow3 from "~/assets/images/carousel/slideshow3.png";

const images = ref([slideshow1, slideshow2, slideshow3]);
</script>

<style lang="sass">
#carousel
  .v-progress-linear
    .v-progress-linear__determinate
      background: rgb(var(--v-theme-accent)) !important

.carousel-item-title
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  font-size: 80px

  @media screen and (max-width: 1000px)
    font-size: 40px

  @media screen and (max-width: 600px)
    font-size: 27px

.carousel-item-description
  position: absolute
  bottom: 45px
  left: 50%
  transform: translateX(-50%)
</style>
