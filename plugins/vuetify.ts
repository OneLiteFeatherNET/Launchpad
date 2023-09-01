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
          dark: true,
          colors: {
            primary: "#181c1f",
            secondary: "#eaf2f7",
            accent: "#3498db",
            error: "#d33d3d",
            warning: "#ffc107",
            info: "#346ddb",
            success: "#4caf50",
          },
        },
        light: {
          dark: false,
          colors: {
            primary: "#EEEEEE",
            secondary: "#FFFFFF",
            surface: "#E0E0E0",
            accent: "#3498db",
            error: "#d33d3d",
            warning: "#ffc107",
            info: "#346ddb",
            success: "#4caf50",
            "on-surface": "#212121",
            "on-primary": "#212121",
            "on-secondary": "#212121",
            "on-background": "#212121",
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
