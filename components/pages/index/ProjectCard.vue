<template>
  <v-card color="accent"
          class="mx-auto flex-fill fill-height">
    <v-img :src="getThumbnail(header, {format: 'auto', fit: 'cover', withoutEnlargement: true})" alt="" height="275px" cover >
      <v-card-title class="text-center poppins text-black bg-light-blue-accent-4">
        {{ name }}
      </v-card-title>
    </v-img>
    <v-card-text v-html="$mdRenderer.render(description)">

    </v-card-text>
    <v-card-actions class="float-left mb-2 ml-2">
      <v-btn variant="tonal" :href="github" target="_blank">
        <Icon name="mdi:github" class="mr-2" />
        GitHub
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
const { getThumbnail } = useDirectusFiles();
defineProps({
  description: { required: true, type: String },
  header: { required: true, type: String },
  github: { required: true, type: String },
  name: { required: true, type: String },
});
</script>
