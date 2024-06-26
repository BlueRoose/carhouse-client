// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: ["@pinia/nuxt", "@vueuse/nuxt", "@element-plus/nuxt", "@nuxtjs/tailwindcss"],

  runtimeConfig: {
    public: {
      apiPath: "https://carhouse-backend.onrender.com",
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import '@/assets/styles/colors.scss';
            @import '@/assets/styles/mq.scss';
          `
        }
      }
    }
  }
})
