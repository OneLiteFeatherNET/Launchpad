<template>
  <PagesIndexCarousel />
  <PagesIndexTimeline />
  <PagesIndexProjects />
</template>

<script lang="ts" setup>
const { getThumbnail } = useDirectusFiles();
useHead({
  script: [
    {
      src: "/scripts/leader-line.min.js",
    },
  ],
  link: [{ rel: 'icon', type: 'image/webp', href: getThumbnail('5924a3d0-613e-4e51-a3ab-de3dca3619b2', {format: 'webp'}) }]
});
</script>
