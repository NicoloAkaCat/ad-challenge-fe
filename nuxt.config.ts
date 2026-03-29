// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    'nuxt-auth-utils',
    '@norbiros/nuxt-auto-form'
  ],

  imports: {
    presets: [
      {
        from: 'zod',
        imports: [
          { as: 'z', name: '*' },
          {
            name: 'infer',
            as: 'zInfer',
            type: true
          }
        ]
      }
    ]
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    apiBase: process.env.BACKEND_API_BASE || 'http://localhost:3001'
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
