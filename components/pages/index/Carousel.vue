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
    <v-carousel-item v-for="(image, i) in images" :key="i" :src="image" cover />
  </v-carousel>
</template>

<script setup lang="ts">
import { ref } from "#imports";

/*
  In order to add a new element to the carousel just insert the image link here. The image files are preferred to be stored in the
  `public/images/carousel` directory. For example if the file is stored under `public/images/carousel/example.jpg` you would
  have to insert `/images/carousel/example.jpg` into the array below (Dont forget the / at the start!).
 */
const images = ref([
  "/images/carousel/slideshow1.png",
  "/images/carousel/slideshow2.png",
  "/images/carousel/slideshow3.png",
]);
</script>

<style lang="sass">
#carousel
  .v-progress-linear
    .v-progress-linear__determinate
      background: rgb(var(--v-theme-accent)) !important
</style>
