require('dotenv').config();

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: 'Student Demo Test',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Student Demo Test' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#999' },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: './plugins/custom.plugin.js', ssr: false }],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/pwa',
    'vue-sweetalert2/nuxt',
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    prefix: '/api',
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true,
    retry: true,
    debug: process.env.NODE_ENV === 'development',
  },

  proxy: {
    '/api/': process.env.API_BASE_URL,
  },

  /*
   ** Build configuration
   */
  build: {
    babel: {
      plugins: ['transform-object-rest-spread'],
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
};
