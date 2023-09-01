<template>
  <div id="projects" class="pt-12 pb-16 mt-16">
    <v-container style="max-width: 1300px">
      <v-row>
        <v-col cols="12" class="text-center text-h3 font-weight-bold pb-16">
          {{ $t("pages.index.projects.title") }}
        </v-col>

        <v-col
          v-for="(project, i) in projects"
          :key="i"
          cols="12"
          sm="6"
          md="4"
        >
          <PagesIndexProjectCard v-bind="project" />
        </v-col>
      </v-row>
    </v-container>
    <div />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "#imports";

const projects = ref([
  {
    image: "/images/placeholder.jpg",
    title: "pages.index.projects.1.title",
    link: "https://example.com",
    description: "pages.index.projects.1.description",
  },
  {
    image: "/images/placeholder.jpg",
    title: "pages.index.projects.1.title",
    link: "https://example.com",
    description: "pages.index.projects.1.description",
  },
  {
    image: "/images/placeholder.jpg",
    title: "pages.index.projects.1.title",
    link: "https://example.com",
    description: "pages.index.projects.1.description",
  },
]);
</script>

<style lang="sass" scoped>
#projects
  background: rgb(var(--v-theme-primary))
</style>
