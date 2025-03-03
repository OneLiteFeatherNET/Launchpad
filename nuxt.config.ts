// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/seo',
    '@nuxt/content',
    '@nuxtjs/google-fonts',
    '@nuxtjs/i18n',
    '@nuxt/image',
    'nuxt-schema-org',
  ],
  css: ['~/assets/css/main.css'],
  googleFonts: {
    download: true,
    families: {
      Roboto: true,
      Montserrat: true
    }
  },
  vite: {
    plugins: [tailwindcss()]
  },
  i18n: {
    baseUrl: 'https://onelitefeather.net',
    locales: [
      { code: 'en', language: 'en-US' },
      { code: 'de', language: 'de-DE' }
    ],
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root' // recommended
    }
  },
  nitro: {
    prerender: {
      autoSubfolderIndex: false
    }
  },
})