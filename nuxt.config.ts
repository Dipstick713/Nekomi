export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules : [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    //'@nuxtjs/supabase',
    '@nuxt/fonts',
  ],
  devtools: { enabled: true }
})