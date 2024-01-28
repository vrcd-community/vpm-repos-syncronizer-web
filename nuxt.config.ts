// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    "@nuxt/content",
    "@vueuse/nuxt",
    '@nuxtjs/sitemap',
    "nuxt-simple-robots",
    "nuxt-og-image",
    "nuxt-link-checker"
  ],
  devtools: { enabled: true },
  site: {
    url: 'https://vcc.vrczh.org',
    strictNuxtContentPaths: true,
  },
  colorMode: {
    preference: 'system',
    fallback: 'dark',
  },
  ogImage: {
    fonts: [
      'Noto+Sans+SC:400'
    ]
  },
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