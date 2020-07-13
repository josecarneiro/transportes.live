'use strict';

const { ORIGIN } = require('./constants');

module.exports = {
  name: ORIGIN,
  themeColor: '#fcfcfd',
  msTileColor: '#fff',
  appleMobileWebAppStatusBarStyle: 'black-translucent',
  // appleMobileWebAppStatusBarStyle: 'default',
  appleMobileWebAppCapable: 'yes',
  manifestOptions: {
    icons: [
      {
        src: 'images/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable any'
      },
      {
        src: 'images/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable any'
      }
    ],
    orientation: 'portrait'
  }
};
