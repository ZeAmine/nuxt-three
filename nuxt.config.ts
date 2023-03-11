import glsl from 'vite-plugin-glsl'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  css: ['@/assets/styles/index.scss'],

  app: {
    pageTransition: { name: 'page-up' },
  },

  vite: {
    plugins: [glsl()],
  },

  build: {
    transpile: ['three', 'gsap', 'vite-plugin-glsl'],
  },

  modules: ['@kevinmarrec/nuxt-pwa'],

  experimental: {
    reactivityTransform: true,
  },
})
