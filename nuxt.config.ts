// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxtjs/google-fonts'],
  css: ['~/assets/css/main.css'],
  googleFonts: {
    download: true,
    families: {
      Roboto: true,
      Montserrat: true
    }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  nitro: {
    prerender: {
      autoSubfolderIndex: false
    }
  },
  content: {
    database: {
      type: 'd1',
      bindingName: 'D1_DATABASE'
    }
  }
})