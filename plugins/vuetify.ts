import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as labs from "vuetify/labs/components";
import * as directives from "vuetify/directives";
import { defineNuxtPlugin } from "#imports";
import { de, en } from "vuetify/locale";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      ...components,
      ...labs,
    },
    directives,
    locale: {
      locale: "en",
      messages: { de, en },
    },
    theme: {
      defaultTheme: "dark",
      themes: {
        dark: {
          colors: {
            accent: "#3498db",
            background: "#2C3E50",
            error: "#d33d3d",
            footer: "#212121",
            info: "#346ddb",
            primary: "#34495E",
            secondary: "#2C3E50",
            success: "#4caf50",
            surface: "#263238",
            warning: "#ffc107",
          },
          dark: true,
        },
        light: {
          colors: {
            accent: "#3498db",
            background: "#546E7A",
            error: "#d33d3d",
            footer: "#212121",
            info: "#346ddb",
            primary: "#607D8B",
            secondary: "#546E7A",
            success: "#4caf50",
            surface: "#263238",
            warning: "#ffc107",
          },
          dark: false,
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
