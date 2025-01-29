// nuxt.config.js
export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
  modules: ['@nuxtjs/tailwindcss'],
  compatibilityDate: '2025-01-22',
  runtimeConfig: {
    public: {
      geminiApiKey: process.env.NUXT_GEMINI_API_KEY
    }
  }
});