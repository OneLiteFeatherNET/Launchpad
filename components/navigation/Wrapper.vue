<template>
  <!-- TODO: add an alternative navigation for small devices here. Still require design ideas therefore  -->
  <NavigationDrawer v-model:expanded="expanded" :items="items" v-if="isXs" />
  <NavigationBar v-model:expanded="expanded" :items="items" />
</template>

<script lang="ts" setup>
import { ref } from "#imports";
import { NavigationItem } from "~/composables/types";

const expanded = ref(false);

const items: NavigationItem[] = ref([
  {
    title: "layout.navigation.item.about",
    to: "",
  },
  {
    title: "layout.navigation.item.projects",
    to: "",
  },
  {
    title: "layout.navigation.item.blog",
    to: "",
  },
]);
</script>
