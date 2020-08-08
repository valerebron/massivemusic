const env = require('dotenv').config({ path: '../.env' }).parsed
process.env.VUE_APP_ENDPOINT = env.ENDPOINT
process.env.VUE_APP_WEB_PORT = env.WEB_PORT
process.env.VUE_APP_API_PORT = env.API_PORT
process.env.VUE_APP_DB_PORT = env.DB_PORT
process.env.VUE_APP_DB_NAME = env.DB_NAME
process.env.VUE_APP_DB_USER = env.DB_USER
process.env.VUE_APP_DB_PASS = env.DB_PASS
process.env.VUE_APP_DB_URL = env.DB_URL
module.exports = {
  publicPath: '/',
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        data: `@import 'src/styles/preprocessed';`
      }
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  },
}
