'use strict';

const pwaConfig = require('./pwa.config');
const scssConfig = require('./sass.config');
const metadataConfig = require('./meta.config');

const { ENVIRONMENT, BUILD_ENVIRONMENT } = require('./constants');

module.exports = {
  lintOnSave: false,
  productionSourceMap: BUILD_ENVIRONMENT === 'local',
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
  chainWebpack: config => {
    config.plugin('html').tap(([options, ...args]) => [
      {
        ...options,
        metadata: {
          ...metadataConfig
        },
        environment: ENVIRONMENT
      },
      ...args
    ]);
  },
  pwa: {
    ...pwaConfig,
    workboxOptions: {
      skipWaiting: true,
      exclude: [/^.*built\/.*$/]
    }
  }
};
