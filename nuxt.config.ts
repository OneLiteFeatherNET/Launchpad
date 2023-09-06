// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "OneLiteFeather",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [{ name: "format-detection", content: "telephone=no" }],
      style: [],
      script: [],
    },
  },
  build: {
    transpile: ["vuetify"],
  },
  css: [
    "vuetify/styles",
    "@mdi/font/css/materialdesignicons.min.css",
    "@/assets/main.sass",
  ],
  devtools: { enabled: true },
  i18n: {
    locales: [
      { code: "en", iso: "en-US", file: "en.json" },
      // just for testing purposes
      { code: "de", iso: "de-DE", file: "de.json" },
    ],
    lazy: true,
    langDir: "./locales",
    defaultLocale: "en",
    detectBrowserLanguage: {
      cookieKey: "lang",
      useCookie: true,
      redirectOn: "root",
      alwaysRedirect: true,
    },
  },
  modules: [
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
    "nuxt-icon",
    "@pinia/nuxt",
  ],
});
