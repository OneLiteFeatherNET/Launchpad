<template>
  <!-- TODO: add an alternative navigation for small devices here. Still require design ideas therefore  -->
  <template v-if="isXs" />
  <NavigationBar v-else />
</template>

<script lang="ts" setup>
import { isXs } from "#imports";
</script>
