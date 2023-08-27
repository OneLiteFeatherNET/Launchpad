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
  devtools: { enabled: true },
  modules: ["@nuxtjs/i18n"],
});
