<script setup lang="ts">
const { data: projects } = await useAsyncData('project', () => queryCollection('project').all())
</script>

<template>
  <Header></Header>
  <main class="">
    <section class="w-full">
      <h1 class="text-center">Unsere Open-Source Projekte</h1>
      <ul class="mx-4 grid grid-flow-row grid-cols-3 gap-4 my-8">
        <li class="col-span-1 row-span-1 px-2 py-2 border-0 min-h-78 rounded-md shadow-2xl flex flex-col" v-for="project in projects" :key="project.id">
          <NuxtImg v-if="project.headerImage" width="720" height="360" class="rounded-lg hover:shadow-2xl transition duration-300 ease-in-out delay-100" :datasrc="project?.headerImage"  alt=""/>
          <h4 class="text-center my-2">{{project?.title}}</h4>
          <p>
            {{project?.description}}
          </p>
          <span class="mb-auto"></span>
          <div class="justify-center mb-2 text-center flex">
            <nuxt-link :to="project?.projectLink" target="_blank" class="px-2">
              <svg viewBox="0 0 16 16" aria-hidden="true" width="32" height="32"
              ><path
                  fill="currentColor"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
              ></path></svg
              >
            </nuxt-link>
          </div>
        </li>
      </ul>
    </section>
  </main>
  <Footer></Footer>
</template>
