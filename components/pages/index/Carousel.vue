<template>
  <v-carousel id="carousel" height="calc(100vh - 64px)" hide-delimiter-background show-arrows color="white" progress
    :cycle="cycle">
    <template v-slot:prev="{ props }">
      <v-icon name="mdi-chevron-left" size="x-large" v-bind="props" @click="pauseOnManual(props.onClick)" />
    </template>

    <template v-slot:next="{ props }">
      <v-icon name="mdi-chevron-right" size="x-large" v-bind="props" @click="pauseOnManual(props.onClick)" />
    </template>

    <v-carousel-item v-for="(entry, i) in carouselEntries" :key="i" cover :src="getThumbnail(entry.image)">
      <div class="carousel-item-title poppins">
        {{ entry.title }}
      </div>

      <div class="carousel-item-description" v-html="$mdRenderer.render(entry.description)">
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script setup lang="ts">
const { getItems } = useDirectusItems();
const { getThumbnail } = useDirectusFiles();
interface CarouselEntry {
  id?: string | number;
  title: string;
  description: string;
  image: string;
}
const carouselEntries = await getItems<CarouselEntry>({
  collection: "carousel"
});
import {ref} from "#imports";

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
