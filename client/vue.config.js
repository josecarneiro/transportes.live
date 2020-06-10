'use strict';

const scssImports = ['~@/style/utilities'];
const pwaConfig = require('./pwa.config');

console.log(
  process.env,
  process.env.SITE_NAME,
  process.env.URL,
  process.env.BRANCH
);

module.exports = {
  lintOnSave: false,
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
    ...pwaConfig
  }
};
