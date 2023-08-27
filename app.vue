<template>
  <v-app>
    <NavigationWrapper />

    <div id="content">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </v-app>
</template>

<style lang="sass">
#content
  margin-top: 64px
  min-height: calc(100vh - 64px)

html
  scroll-behavior: smooth
</style>
