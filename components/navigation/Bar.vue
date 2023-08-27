<template>
  <v-app-bar color="accent" sticky :absolute="false">
    <v-container>
      <v-row class="align-center">
        <v-app-bar-title class="d-flex align-center justify-start">
          <NuxtLink :to="localePath('/')">OneLiteFeather</NuxtLink>
          <!-- Brand -->
        </v-app-bar-title>

        <v-spacer />

        <v-btn-toggle selected-class="text--white" group variant="plain">
          <v-btn>
            {{ $t("layout.navigation.item.about") }}
          </v-btn>

          <v-btn>
            {{ $t("layout.navigation.item.projects") }}
          </v-btn>

          <v-btn>
            {{ $t("layout.navigation.item.blog") }}
          </v-btn>
        </v-btn-toggle>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useLocalePath } from "#imports";

const localePath = useLocalePath();
</script>

<style lang="sass" scoped>
.v-app-bar
  .v-container
    max-width: 1200px
</style>
