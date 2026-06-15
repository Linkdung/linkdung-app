// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({

  // ─── Modules ─────────────────────────────────────────────────────────────
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/apollo',
    '@nuxt/eslint',
    'nuxt-lucide-icons',
  ],
  devtools: { enabled: true },

  // ─── App Config ───────────────────────────────────────────────────────────
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Linkdung - Your Universe of Links',
      meta: [
        { name: 'description', content: 'Linkdung - Link-in-bio platform' },
        { name: 'theme-color', content: '#E23636' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:wght@400;700&family=Permanent+Marker&display=swap',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  // ─── CSS ─────────────────────────────────────────────────────────────────
  css: ['~/assets/css/main.css'],

  // ─── Runtime Config ───────────────────────────────────────────────────────
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'super-secret-change-in-prod',
    databaseUrl: process.env.DATABASE_URL || '',
    public: {
      appName: 'Linkdung',
      appUrl: process.env.APP_URL || 'http://localhost:3000',
      apiBase: process.env.API_BASE || '/api',
    },
  },
  compatibilityDate: '2024-11-01',

  // ─── Nitro / Server ───────────────────────────────────────────────────────
  nitro: {
    // Deploy ke Vercel — output ke .vercel/output (Build Output API v3),
    // auto-terdeteksi oleh Vercel. Lokal tetap bisa `nuxt build`/`preview`.
    preset: 'vercel',
    routeRules: {
      '/api/**': { cors: true },
    },
  },

  // ─── Vite ─────────────────────────────────────────────────────────────────
  // @nuxtjs/apollo otomatis menambahkan @rollup/plugin-graphql yang handle:
  //   - import '*.gql' → DocumentNode
  //   - #import directive lintas file
  // Tidak perlu vite-plugin-graphql-loader (akan bentrok / double transform)
  vite: {
    optimizeDeps: {
      include: ['echarts', 'vue-echarts'],
    },
  },

  // ─── TypeScript ──────────────────────────────────────────────────────────
  typescript: {
    strict: true,
    typeCheck: false,
  },

  // ─── Apollo / GraphQL ─────────────────────────────────────────────────────
  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.GRAPHQL_ENDPOINT || 'https://linkdung-service-nolepdev.koyeb.app/query',
        wsEndpoint: process.env.GRAPHQL_WS_ENDPOINT || 'ws://localhost:4000/graphql',
        tokenStorage: 'cookie',
        authType: 'Bearer',
        authHeader: 'Authorization',
      },
    },
  },

  // ─── ESLint ───────────────────────────────────────────────────────────────
  eslint: {
    config: {
      stylistic: true,
    },
  },

  // ─── Lucide Icons ─────────────────────────────────────────────────────────
  lucide: {
    namePrefix: 'Icon',
  },

  // ─── Pinia ────────────────────────────────────────────────────────────────
  pinia: {
    storesDirs: ['./stores/**'],
  },
})
