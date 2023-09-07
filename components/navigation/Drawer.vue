<template>
  <v-expand-x-transition>
    <v-navigation-drawer class="elevation-12" v-model="expanded" rail fixed>
      <v-btn
        class="ml-4 mt-4"
        icon="mdi-close-thick"
        variant="text"
        @click="expanded = false"
      />

      <NuxtLink
        v-for="(item, i) in items"
        :key="i"
        class="d-flex justify-start ml-8 mr-8 pt-6 pb-6 drawer-link"
        :to="localePath(item.to)"
      >
        {{ $t(item.title) }}
      </NuxtLink>
    </v-navigation-drawer>
  </v-expand-x-transition>
</template>

<script setup lang="ts">
import { useLocalePath } from "#imports";
import { NavigationItem } from "~/composables/types";

interface NavigationDrawerProps {
  items: NavigationItem[];
  expanded: boolean;
}

const localePath = useLocalePath();
const emit = defineEmits(["update:expanded"]);
const props = defineProps<NavigationDrawerProps>();

const expanded = computed({
  get() {
    return props.expanded;
  },
  set(value: boolean) {
    emit("update:expanded", value);
  },
});
</script>

<style lang="sass" scoped>
.v-navigation-drawer
  width: 320px !important
  max-width: calc(100vw - 50px) !important


.drawer-link
  border-bottom: 2px solid lightgrey
  color: lightgrey
  transition: all .3s linear
  font-size: 18px

  &:hover
    color: rgb(var(--v-theme-accent)) !important
    border-color: rgb(var(--v-theme-accent)) !important
</style>
