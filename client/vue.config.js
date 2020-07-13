'use strict';

const pwaConfig = require('./pwa.config');
const scssConfig = require('./sass.config');
const metaConfig = require('./meta.config');

const ENVIRONMENT =
  process.env.NODE_ENV === 'development'
    ? 'development'
    : process.env.URL && process.env.URL.includes('staging')
    ? 'staging'
    : 'production';

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
  chainWebpack: config => {
    config.plugin('html').tap(([options, ...args]) => [
      {
        ...options,
        meta: {
          ...metaConfig
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
