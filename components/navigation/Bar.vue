<template>
  <v-app-bar color="primary" sticky :absolute="false">
    <v-container>
      <v-row class="align-center">
        <v-app-bar-title class="d-flex align-center justify-start">
          <NuxtLink :to="localePath('/')">OneLiteFeather</NuxtLink>
          <!-- TODO: Brand -->
        </v-app-bar-title>

        <v-spacer />

        <v-btn-toggle selected-class="text--white" group variant="plain">
          <v-btn
            v-for="(item, i) in items"
            :key="i"
            nuxt
            :to="localePath(item.to)"
          >
            {{ $t(item.title) }}
          </v-btn>
        </v-btn-toggle>

        <v-btn
          variant="tonal"
          color="secondary"
          class="ml-10"
          @click="copyAddress"
        >
          <v-icon icon="mdi-human-greeting" class="mr-2" />
          {{ $t("layout.navigation.item.join") }}
        </v-btn>

        <NavigationThemeSwitcher class="ml-2" />
        <NavigationLocaleSelection class="ml-2" />
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useLocalePath, NavigationItem, useClipboard } from "#imports";

interface NavigationBarProps {
  items: NavigationItem[];
}

const localePath = useLocalePath();
defineProps<NavigationBarProps>();

const copyAddress = async () => {
  // access the clipboard
  const { copy } = useClipboard();
  await copy("onelitefeather.net");

  // TODO: emit notification to the client
};
</script>

<style lang="sass" scoped>
.v-app-bar
  .v-container
    max-width: 1200px
</style>
