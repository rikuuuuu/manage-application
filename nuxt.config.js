module.exports = {
  mode: 'universal',
  target: 'server',
  head: {
    title: 'manage',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'manage',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: [
    '@/assets/css/main.scss'
  ],
   plugins: [
     '~/plugins/firebase'
   ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
  ],
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {},
  srcDir: 'src/',
  buildDir: 'functions/nuxt',
  build: {
    publicPath: '/assets/',
    extractCSS: true,
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            configFile: '.eslintrc.js'
          }
        })
      }
    },
    postcss: {
      preset: {
        features: {
          customProperties: false,
        },
      },
    },
  },
  manifest: {
    name: 'manage',
    lang: 'ja'
  }
}
