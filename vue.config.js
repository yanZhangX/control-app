'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
const NyanProgressPlugin = require('nyan-progress-webpack-plugin')
const IP = require('./build/getIp')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'control app' // page title
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    hot: true,
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    before: require('./mock/mock-server.js'),
    progress: false
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    // plugins: [
    //   new NyanProgressPlugin({
    //     debounceInterval: 60,
    //     nyanCatSays(progress) {
    //       if (progress === 1) {
    //         return '加油，奥利给！'
    //       }
    //     }
    //   })
    // ]
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
    config.module
      .rule('lint')
        .test(/\.(js|vue)$/)
        .pre()
        .include
          .add(resolve('src'))
          .end()
        .use('eslint')
          .loader('eslint-loader')
          .options({
            formatter: require('eslint-friendly-formatter'),
            emitWarning: false,
            fix: true
          })
    config.when(process.env.NODE_ENV === 'development', (config) => config.devtool('cheap-source-map'))

    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial'
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
