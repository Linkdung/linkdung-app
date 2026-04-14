// https://nuxt.com/docs/api/configuration/nuxt-config
import graphqlLoader from 'vite-plugin-graphql-loader'

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
    preset: 'netlify',
    routeRules: {
      '/api/**': { cors: true },
    },
  },

  // ─── Vite ─────────────────────────────────────────────────────────────────
  // [CHANGE] graphqlLoader: transform import '*.gql' → DocumentNode
  //   - Resolve fragment #import directive lintas file
  //   - Output siap pakai Apollo client.query() / client.mutate()
  //
  // Install satu kali:
  //   npm i -D vite-plugin-graphql-loader
  vite: {
    optimizeDeps: {
      include: ['echarts', 'vue-echarts'],
    },
    plugins: [
      graphqlLoader(),
    ],
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
        httpEndpoint: process.env.GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',
        wsEndpoint: process.env.GRAPHQL_WS_ENDPOINT || 'ws://localhost:4000/graphql',
        httpLinkOptions: {
          credentials: 'include',
        },
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
