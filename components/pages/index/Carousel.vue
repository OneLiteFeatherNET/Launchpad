<template>
  <v-carousel id="carousel" height="calc(100vh - 64px)" hide-delimiter-background show-arrows color="white" progress
    :cycle="cycle">
    <template v-slot:prev="{ props }">
      <v-icon name="mdi-chevron-left" size="x-large" v-bind="props" @click="pauseOnManual(props.onClick)" />
    </template>

    <template v-slot:next="{ props }">
      <v-icon name="mdi-chevron-right" size="x-large" v-bind="props" @click="pauseOnManual(props.onClick)" />
    </template>

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
import slideshow0 from "assets/images/carousel/slideshow0.png";
import slideshow1 from "assets/images/carousel/slideshow1.png";
import slideshow2 from "assets/images/carousel/slideshow2.png";

const images = ref([slideshow0, slideshow1, slideshow2]);
const cycle = ref(true);

const pauseOnManual = (callback: any) => {
  cycle.value = false;
  callback();
};
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
