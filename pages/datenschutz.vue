<template>
  <v-container id="privacy" v-html="data.value" />
</template>

<script setup lang="ts">
import { defineI18nRoute } from "#imports";

interface DataPrivacy {
  id?: string | number;
  value: string;
}

defineI18nRoute(false);
const { getSingletonItem } = useDirectusItems();

const data = await getSingletonItem<DataPrivacy>({
  collection: "data_privacy"
});
</script>

<style lang="sass">
#privacy *
  margin-top: 10px
</style>
