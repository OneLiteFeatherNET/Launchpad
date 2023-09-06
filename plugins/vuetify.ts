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
            primary: "#014a51",
            secondary: "#00838F",
            accent: "#3498db",
            error: "#d33d3d",
            warning: "#ffc107",
            info: "#346ddb",
            success: "#4caf50",
            background: "#006064",
            surface: "#424242",
            footer: "#424242",
          },
        },
        light: {
          dark: false,
          colors: {
            primary: "#0097A7",
            secondary: "#00ACC1",
            surface: "#E0E0E0",
            accent: "#3498db",
            error: "#d33d3d",
            warning: "#ffc107",
            info: "#346ddb",
            success: "#4caf50",
            background: "#00838F",
            "on-surface": "#212121",
            "on-primary": "#F5F5F5",
            "on-secondary": "#212121",
            "on-background": "#F5F5F5",
            footer: "#424242",
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
