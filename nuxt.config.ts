export default defineNuxtConfig({
  modules: [
    "@nuxt/content",
    "@nuxtjs/color-mode",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    // "nuxt-og-image"
    "nuxt-time",
    "@vueuse/nuxt",
    "@nuxt/image",
    "@nuxtjs/robots",
    "@primevue/nuxt-module",
  ],

  css: [
    'primeicons/primeicons.css',
    'assets/css/main.css',
    'assets/css/primevue-vars.css'
  ],

  primevue: {
    options: {
      // https://github.com/primefaces/primevue-tailwind/releases
      theme: 'none'
    }
  },

  routeRules: {
    "/docs/**": { isr: true },
    "/docs": { isr: true },
  },

  devtools: { enabled: true },

  site: {
    url: "https://vcc.vrczh.org",
    strictNuxtContentPaths: true,
  },

  colorMode: {
    preference: "system",
    fallback: "dark",
  },

  content: {
    markdown: {
      anchorLinks: false,
      toc: {
        depth: 5,
        searchDepth: 5,
      },
    },
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: "https://vpm.vrczh.org",
    },
    vrcdServerSideLogging: {
      enabled: false,
      postLogEnabled: false,
      baseUrl: "",
      prefix: "",
      zone: "",
      apiKey: "",
      pipeline: "",
    },
  },

  compatibilityDate: "2024-08-30",
})