import { computed } from "#imports";
import { useDisplay } from "vuetify";

export const isXs = computed(() =>
  process.client ? useDisplay().name.value === "xs" : false,
);
