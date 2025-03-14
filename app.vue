<template>
  <v-app>
    <NavigationWrapper />

    <div id="content">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>

    <v-alert
      v-for="(emit, i) in emitter.emits"
      :key="i"
      class="emit"
      :text="$t(emit.content)"
      :icon="emit.icon!"
      :color="emit.type"
    />

    <Footer />
  </v-app>
</template>

<script lang="ts" setup>
import { useEmitter } from "~/store/emitter";

const emitter = useEmitter();
/*
useHead({
  title: 'OneLiteFeather.net',
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
});

useSeoMeta({
  title: 'OneLiteFeather.net',
  ogTitle: 'OneLiteFeather.net',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})*/
</script>

<style lang="sass">
#content
  margin-top: 64px
  min-height: calc(100vh - 64px)

html
  scroll-behavior: smooth

.emit
  position: fixed
  left: 50%
  bottom: 20px
  transform: translateX(-50%)
  width: fit-content
  z-index: 1000000
</style>
