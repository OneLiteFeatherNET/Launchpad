<template>
  <v-app-bar
    class="text-white pl-4 pr-4"
    color="secondary"
    sticky
    :absolute="false"
  >
    <v-container>
      <v-row class="align-center justify-space-between flex-row">
        <template v-if="isXs">
          <v-app-bar-nav-icon @click="expanded = !expanded" />

          <div class="poppins text-h5">OneLiteFeather</div>

          <NuxtLink :to="localePath('/')">
            <v-avatar size="60" class="ml-3">
              <v-img
                height="45"
                src="logo.svg"
                alt="onelitefeather-logo"
              />
            </v-avatar>
          </NuxtLink>
        </template>

        <template v-else>
          <v-app-bar-title class="d-flex align-center justify-start">
            <NuxtLink class="d-flex align-center poppins" :to="localePath('/')">
              OneLiteFeather
            </NuxtLink>

            <v-avatar>
              <v-img
                  src="logo.svg"
                alt="onelitefeather-logo"
              />
            </v-avatar>
          </v-app-bar-title>

          <v-spacer v-if="lg" />

          <v-btn-toggle selected-class="text--white" group variant="plain">
            <template v-for="(item, i) in items" :key="i">
              <v-btn
                v-if="item.to.startsWith('http') || item.to.startsWith('#')"
                :href="item.to"
                :target="item.to.startsWith('http') ? '_blank' : ''"
                color="white"
              >
                {{ $t(item.title) }}
              </v-btn>

              <v-btn v-else :to="localePath(item.to)" href color="white">
                {{ $t(item.title) }}
              </v-btn>
            </template>
          </v-btn-toggle>

          <NavigationJoin class="ml-8" v-if="lg" />

          <NavigationThemeSwitcher class="ml-8" />
          <NavigationLocaleSelection class="ml-2" />
        </template>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useLocalePath, isXs, lg } from "#imports";
import { NavigationItem } from "~/composables/types";

interface NavigationBarProps {
  items: NavigationItem[];
  expanded: boolean;
}

const localePath = useLocalePath();
const emit = defineEmits(["update:expanded"]);
const props = defineProps<NavigationBarProps>();

const expanded = computed({
  get() {
    return props.expanded;
  },
  set(value: boolean) {
    emit("update:expanded", value);
  },
});
</script>

<style lang="sass">
.v-app-bar
  border-bottom: 3px solid rgb(var(--v-theme-accent)) !important

  @media screen and (max-width: 600px)
    backdrop-filter: blur(8px)
    background: transparent !important
    border-bottom: none !important

  .v-container
    max-width: 1200px

    .v-toolbar-title
      .v-toolbar-title__placeholder
        display: flex
        justify-content: center
        align-items: center
</style>
