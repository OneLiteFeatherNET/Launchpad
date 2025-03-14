<template>
  <div id="projects" class="pt-12 pb-16 mt-16">
    <v-container style="max-width: 1300px">
      <v-row>
        <v-col cols="12" class="text-center text-h3 pb-16 poppins">
          {{ $t("pages.index.projects.title") }}
        </v-col>

        <v-col v-for="(project, i) in projects" :key="i" cols="12" sm="6" md="4">
          <PagesIndexProjectCard v-bind="project" />
        </v-col>
      </v-row>
    </v-container>
    <div />
  </div>
</template>

<script lang="ts" setup>
const { getItems } = useDirectusItems();

interface Project {
  id?: string | number;
  name: string;
  description: string;
  github: string;
  header: string;
}

const projects = await getItems<Project>({
  collection: "projects"
});
</script>

<style lang="sass" scoped>
#projects
  background: rgb(var(--v-theme-primary))

  .v-container
    .v-row
      > *
        @media screen and (max-width: 600px)
          margin-top: 30px
</style>
