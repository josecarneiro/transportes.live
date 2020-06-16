'use strict';

const scssImports = ['~@/style/utilities'];
const pwaConfig = require('./pwa.config');

module.exports = {
  lintOnSave: false,
  productionSourceMap: !process.env.NETLIFY,
  devServer: {
    disableHostCheck: true
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: [...scssImports.map(item => `@import "${item}"`), ''].join(
          ';'
        )
      }
    }
  },
  configureWebpack: config => {
    Object.assign(config, {
      entry: './src/entry-client.js',
      devtool: 'source-map'
    });
  },
  pwa: {
    ...pwaConfig,
    workboxOptions: {
      skipWaiting: true,
      exclude: [/^.*built\/.*$/]
    }
  }
};
