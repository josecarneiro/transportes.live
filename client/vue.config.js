'use strict';

const pwaConfig = require('./pwa.config');
const scssConfig = require('./sass.config');

module.exports = {
  lintOnSave: false,
  productionSourceMap: !process.env.NETLIFY,
  devServer: {
    disableHostCheck: true
  },
  css: {
    loaderOptions: {
      sass: { ...scssConfig }
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
