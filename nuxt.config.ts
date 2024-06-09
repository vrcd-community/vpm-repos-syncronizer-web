// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "@nuxt/content",
    "@vueuse/nuxt",
    "@nuxtjs/sitemap",
    "nuxt-simple-robots",
    // "nuxt-og-image"
    "@bg-dev/nuxt-naiveui",
    "nuxt-time"
  ],
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
  ui: {
    icons: ["mdi"],
  },
  content: {
    markdown: {
      anchorLinks: false,
    },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: "https://vpm.vrczh.org",
    },
  },
})