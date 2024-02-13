// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: ["@pinia/nuxt", "@nuxtjs/google-fonts"],

  runtimeConfig: {
    googleFonts: {
      families: {
        Roboto: true
      }
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@use '~/assets/styles/colors.scss' as *;"
        }
      }
    }
  }
})
