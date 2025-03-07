// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/seo',
    '@nuxtjs/sitemap',
    '@nuxt/content',
    '@nuxtjs/google-fonts',
    '@nuxtjs/i18n',
    '@nuxt/image',
    'nuxt-schema-org',
  ],
  css: [
      'tailwindcss',
      '@/assets/css/main.css'
  ],
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
    defaultLocale: "en",
    detectBrowserLanguage: {
      alwaysRedirect: false,
      cookieKey: "lang",
      fallbackLocale: "en",
      redirectOn: "root",
      useCookie: true,
    },
    lazy: true,
    locales: [{ code: "en", file: "en.json", iso: "en-US" }, { code: "de", file: "de.json", iso: "de-DE" }],
  },
  nitro: {
    prerender: {
      autoSubfolderIndex: false
    }
  },
  site: {
    name: 'OneLiteFeather Network',
    description: 'OneLiteFeather Network is a open-source project for everyone.',
    themeColor: '#F7931D',
    twitter: '@onelitefeathernet',
    image: '/og-image.png'
  }
})