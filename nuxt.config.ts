// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      meta: [{ content: "telephone=no", name: "format-detection" }],
      script: [],
      style: [],
      title: "OneLiteFeather",
      viewport: "width=device-width, initial-scale=1",
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
    defaultLocale: "en",
    detectBrowserLanguage: {
      alwaysRedirect: false,
      cookieKey: "lang",
      fallbackLocale: "en",
      redirectOn: "root",
      useCookie: true,
    },
    langDir: "./locales",
    lazy: true,
    locales: [{ code: "en", file: "en.json", iso: "en-US" }],
  },
  modules: [
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
    "nuxt-icon",
    "@pinia/nuxt",
  ],
});
