<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
</script>

<template>
  <header class="shadow fixed w-full z-10 backdrop-blur-sm">
    <nav class="container mx-auto relative flex items-center justify-between flex-row px-4">
      <div class="flex items-center">
        <img src="@/assets/logo.svg" alt="onelitefeather brand logo" class="h-25 w-25" width="150" height="150"/>
      </div>
      <div class="flex items-center mx-2 ">
        <NuxtLink class="px-2" :to="localePath('')">{{ t('link.home') }}</NuxtLink>
        <NuxtLink class="px-2" :to="localePath('projects')">{{ t('link.projects') }}</NuxtLink>
        <NuxtLink class="px-2" :to="localePath('blog')">{{ t('link.blog') }}</NuxtLink>
        <NuxtLink class="px-2" to="https://discord.gg/onelitefeather" target="_blank">{{ t('link.discord') }}</NuxtLink>
      </div>
    </nav>
  </header>
</template>

<style scoped>

</style>