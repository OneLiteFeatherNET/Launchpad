<template>
  <v-sheet color="secondary" width="500px" max-width="65vw" rounded>
    <v-row>
      <v-col cols="12">
        <v-img class="elevation-8" :src="img(image, {format: 'webp'})" alt="" height="200px" cover />
      </v-col>

      <v-col cols="12">
        <div class="pl-6 pr-6 pb-6">
          <slot />
        </div>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts" setup>
const img = useImage();
defineProps({
  image: { required: true, type: String },
});
</script>
