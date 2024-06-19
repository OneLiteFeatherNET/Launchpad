<template>
  <v-container v-html="data.value">
  </v-container>
</template>

<script setup lang="ts">
const { getSingletonItem } = useDirectusItems();
interface DataPrivacy {
  id?: string | number;
  value: string;
}
const data = await getSingletonItem<DataPrivacy>({
  collection: "data_privacy"
});

import { defineI18nRoute } from "#imports";

defineI18nRoute(false);
</script>

<style lang="sass" scoped>
*
  margin-top: 10px
</style>
