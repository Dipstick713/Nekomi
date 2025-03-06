export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules : [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@nuxt/fonts',
  ],
  
  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/confirm',
      exclude:[]
    }
  },
  runtimeConfig: {
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
    }
  },
  devtools: { enabled: true }
})