<template>
  <div>
    <v-menu>
      <template #activator="{ props }">
        <Icon
          v-bind="props"
          :name="flagIcon(currentLocale).value"
          size="20px"
        />
      </template>

      <v-list>
        <template v-for="(locale, i) in locales" :key="i">
          <v-list-item
            v-if="locale.code !== currentLocale"
            @click="currentLocale = locale.code"
          >
            <v-list-item-title>
              <Icon :name="flagIcon(locale.code).value" size="20px" />
            </v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { useI18n, useRouter, watch } from "#imports";

const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const currentLocale = ref(locale.value);

watch(currentLocale, (currentLocale) =>
  useRouter().push(switchLocalePath(currentLocale)),
);

const flagIcon = (locale: string) => computed(() => `circle-flags:${locale}`);
</script>
