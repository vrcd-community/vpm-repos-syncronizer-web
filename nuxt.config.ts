export default defineNuxtConfig({
  modules: [
    "@nuxt/content",
    "@nuxtjs/color-mode",
    "@nuxt/icon",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxtjs/sitemap",
    // "nuxt-og-image"
    "@bg-dev/nuxt-naiveui",
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

  sitemap: {
    sources: [
      '/api/__sitemap__/urls'
    ]
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

  icon: {
    serverBundle: 'local',
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