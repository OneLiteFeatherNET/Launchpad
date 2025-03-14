<template>
  <ClientOnly>
    <NavigationDrawer v-model:expanded="expanded" :items="items" v-if="isXs" />
    <NavigationBar v-model:expanded="expanded" :items="items" />
  </ClientOnly>
</template>

<script lang="ts" setup>
import { ref } from "#imports";
import { type NavigationItem } from "~/composables/types";

const expanded = ref(false);

const items: Ref<NavigationItem[]> = ref([
  {
    title: "layout.navigation.item.about",
    to: "#timeline",
  },
  {
    title: "layout.navigation.item.projects",
    to: "#projects",
  },
  {
    title: "layout.navigation.item.blog",
    to: "https://blog.onelitefeather.net/",
  },
  {
    title: "layout.navigation.item.team",
    to: "/team",
  },
]);
</script>
