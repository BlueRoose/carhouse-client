// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: ["@pinia/nuxt", "@vueuse/nuxt", "@element-plus/nuxt"],

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
