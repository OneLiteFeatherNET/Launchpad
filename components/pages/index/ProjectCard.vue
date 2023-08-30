<template>
  <v-card color="accent">
    <v-card-title class="text-center">
      {{ $t(title) }}
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-img :src="image" alt="" height="250px" cover />
        </v-col>

        <v-col cols="12">
          {{ $t(description) }}
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions class="float-right">
      <v-btn variant="tonal">
        <Icon name="mdi:github" class="mr-2" />
        GitHub
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
defineProps({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
});
</script>
