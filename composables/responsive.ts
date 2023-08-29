import { computed } from "#imports";
import { useDisplay } from "vuetify";

export const isXs = computed(() => useDisplay().name.value === "xs");
