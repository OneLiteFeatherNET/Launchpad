<template>
  <v-carousel id="carousel" height="calc(100vh - 64px)" hide-delimiter-background show-arrows color="white" progress
    :cycle="cycle">
    <template v-slot:prev="{ props }">
      <v-icon name="mdi-chevron-left" size="x-large" v-bind="props" @click="pauseOnManual(props.onClick)" />
    </template>

    <template v-slot:next="{ props }">
      <v-icon name="mdi-chevron-right" size="x-large" v-bind="props" @click="pauseOnManual(props.onClick)" />
    </template>

    <v-carousel-item v-for="(entry, i) in carouselEntries" :key="i" cover :src="entry.image">
      <div class="carousel-item-title poppins text-white">
        {{ entry.title }}
      </div>

      <div class="carousel-item-description text-white" v-html="$mdRenderer.render(entry.description)" />
    </v-carousel-item>
  </v-carousel>
</template>

<script setup lang="ts">
import {ref} from "#imports";

interface CarouselEntry {
  id?: string | number;
  title: string;
  description: string;
  image: string;
}
const cycle = ref(true);

const carouselEntries: CarouselEntry[] = [
  {
    id: 0,
    title: "OneLiteFeather Survival Spawn",
    description: "Gemeinsam erreichen wir alles",
    image: "img/carousel/primary_survival_spawn.png",
  },
  {
    id: 1,
    title: "OneLiteFeather GameModus",
    description: "OneLiteFeather GameModus",
    image: "img/carousel/spawn_tempel.png",
  },
];


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
