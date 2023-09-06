<template>
  <v-sheet color="accent" width="500px" max-width="100%" rounded>
    <v-row>
      <v-col cols="12">
        <v-img class="elevation-4" :src="image" alt="" height="200px" cover />
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
defineProps({
  image: { type: String, required: true },
});
</script>
