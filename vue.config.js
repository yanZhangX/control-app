"use strict";
const path = require("path");
const defaultSettings = require("./src/settings.js");
const NyanProgressPlugin = require('nyan-progress-webpack-plugin')
const IP = require('./build/getIp')

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = defaultSettings.title || "vue Admin Template"; // page title

const host = process.env.HOST || process.env.npm_config_host || IP;
const port = process.env.port || process.env.npm_config_port || 9528; // dev port

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  productionSourceMap: false,
  devServer: {
    hot: true,
    public: host + ":" + port,
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    before: require("./mock/mock-server.js")
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        "@": resolve("src")
      }
    },
    plugins: [
      new NyanProgressPlugin({
        debounceInterval: 60,
        hookStdout: false,
        nyanCatSays(progress) {
          if (progress === 1) {
            return "呦, 又在写 Bug 了?";
          }
        }
      })
    ]
  },
  chainWebpack(config) {
    config.plugins.delete("preload"); // TODO: need test
    config.plugins.delete("prefetch"); // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();

    // set preserveWhitespace
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();

    config.when(process.env.NODE_ENV === "development", config =>
      config.devtool("cheap-source-map")
    );

    config.when(process.env.NODE_ENV !== "development", config => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            inline: /runtime\..*\.js$/
          }
        ])
        .end();
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial"
          },
          elementUI: {
            name: "chunk-elementUI",
            priority: 20,
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
      config.optimization.runtimeChunk("single");
    });
  }
};
