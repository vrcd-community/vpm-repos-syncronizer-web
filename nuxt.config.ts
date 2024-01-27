// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', "@nuxt/content", "@vueuse/nuxt"],
  devtools: { enabled: true },
  ui: {
    icons: ['mdi']
  },
  content: {
    markdown: {
      anchorLinks: false
    }
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://vpm.vrczh.org',
    }
  }
})