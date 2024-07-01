<template>
  <v-container id="imprint" v-html="data.value" />
</template>

<script setup lang="ts">
import { defineI18nRoute } from "#imports";

interface Imprint {
  id?: string | number;
  value: string;
}

defineI18nRoute(false);
const { getSingletonItem } = useDirectusItems();

const data = await getSingletonItem<Imprint>({
  collection: "imprint"
});
</script>

<style lang="sass" scoped>
#imprint *
  margin-top: 10px
</style>
