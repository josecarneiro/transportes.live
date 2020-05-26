'use strict';

module.exports = {
  name: 'transportes.live',
  themeColor: '#fcfcfd',
  msTileColor: '#fff',
  appleMobileWebAppStatusBarStyle: 'black-translucent',
  // appleMobileWebAppStatusBarStyle: 'default',
  appleMobileWebAppCapable: 'yes',
  workboxOptions: {
    skipWaiting: true
  },
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
