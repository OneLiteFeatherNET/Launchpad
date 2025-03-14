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
  nitro: {
    prerender: {
      autoSubfolderIndex: false
    }
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

  googleFonts: {
    download: true,
    families: {
      Roboto: true,
      Montserrat: true
    }
  },
  image: {
    format: ['webp'],
    inject: true,
    quality: 80
  },

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
    locales: [{ code: "en", file: "en.json", iso: "en-US" }, { code: "de", file: "de.json", iso: "de-DE" }],
  },

  runtimeConfig: {
    markdownit: {
      runtime: true
    },
  },
  site: {
    name: 'OneLiteFeather Network',
    description: 'OneLiteFeather Network is a open-source project for everyone.',
    themeColor: '#F7931D',
    twitter: '@onelitefeathernet',
    image: '/og-image.png'
  },
  robots: {
    blockNonSeoBots: true,
    blockAiBots: true
  },

  modules: [
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
    "nuxt-icon",
    "@pinia/nuxt",
    "@nuxtjs/google-fonts",
    '@nuxt/image',
    'nuxt-schema-org',
    '@nuxtjs/robots',
    'nuxt-og-image',
  ],

  compatibilityDate: "2025-03-14",
});