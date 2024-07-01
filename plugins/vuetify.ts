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
            accent: "#91268F",
            background: "#212121",
            error: "#d33d3d",
            footer: "#212121",
            info: "#2A388F",
            primary: "#282828",
            secondary: "#2A388F",
            success: "#4caf50",
            surface: "#263238",
            warning: "#ffc107",
            "on-background": "#FFF",
            "on-surface": "#FFF"
          },
          dark: true,
        },
        light: {
          colors: {
            accent: "#91268F",
            background: "#FDFDFD",
            error: "#d33d3d",
            footer: "#212121",
            info: "#27A9E1",
            primary: "#EFEFEF",
            secondary: "#27A9E1",
            success: "#4caf50",
            surface: "#EAEAEA",
            warning: "#ffc107",
            "on-background": "#242424",
            "on-surface": "#242424"
          },
          dark: false,
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
