<template>
  <PagesIndexCarousel />
  <PagesIndexAboutUs />
  <PagesIndexProjects />
</template>

<script lang="ts" setup>
useHead({
  script: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/leader-line/1.0.7/leader-line.min.js",
    },
  ],
});
</script>
