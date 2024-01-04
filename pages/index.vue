<template>
  <PagesIndexCarousel />
  <PagesIndexTimeline />
  <PagesIndexProjects />
</template>

<script lang="ts" setup>
useHead({
  script: [
    {
      src: "/scripts/leader-line.min.js",
    },
  ],
});
</script>
