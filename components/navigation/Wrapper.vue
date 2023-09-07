<template>
  <!-- TODO: add an alternative navigation for small devices here. Still require design ideas therefore  -->
  <div v-if="isXs" />
  <NavigationBar :items="items" v-else />
</template>

<script lang="ts" setup>
import { isXs, NavigationItem, ref } from "#imports";

const items: NavigationItem[] = ref([
  {
    title: "layout.navigation.item.about",
    to: "",
    drawerIcon: "",
  },
  {
    title: "layout.navigation.item.projects",
    to: "",
    drawerIcon: "",
  },
  {
    title: "layout.navigation.item.blog",
    to: "",
    drawerIcon: "",
  },
]);
</script>
