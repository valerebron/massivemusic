module.exports = {
  publicPath: './',
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        data: '@import "scss/main.scss";'
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
  devServer: {
    proxy: 'https://massivemusic.fr/',
  }
}
