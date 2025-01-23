const config = defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    // "nuxt-og-image"
    'nuxt-time',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxtjs/robots',
    '@primevue/nuxt-module',
  ],

  devtools: { enabled: true },

  css: [
    'primeicons/primeicons.css',
    'assets/css/main.css',
    'assets/css/primevue-vars.css',
  ],

  site: {
    url: 'https://vcc.vrczh.org',
    strictNuxtContentPaths: true,
  },

  colorMode: {
    preference: 'system',
    fallback: 'dark',
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
      apiBaseUrl: 'https://vpm.vrczh.org',
    },
    vrcdServerSideLogging: {
      enabled: false,
      postLogEnabled: false,
      baseUrl: '',
      prefix: '',
      zone: '',
      apiKey: '',
      pipeline: '',
    },
  },

  routeRules: {
    '/docs/**': { isr: true },
    '/docs': { isr: true },
  },

  compatibilityDate: '2024-08-30',

  eslint: {
    config: {
      stylistic: true,
    },
  },

  primevue: {
    options: {
      // https://github.com/primefaces/primevue-tailwind/releases
      theme: 'none',
    },
  },

  robots: {
    disallow: ['/status'],
  },
})

if (import.meta.env.DISABLE_NUXT_HUB !== 'true') {
  config.modules?.push('@nuxthub/core')
}

export default config
