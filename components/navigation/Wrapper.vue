<template>
  <ClientOnly>
    <NavigationDrawer v-model:expanded="expanded" :items="items" v-if="isXs" />
    <NavigationBar v-model:expanded="expanded" :items="items" />
  </ClientOnly>
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
    to: "https://blog.onelitefeather.net/",
  },
]);
</script>
