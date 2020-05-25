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
        src: 'images/icons/manifest-icon-192.jpg',
        sizes: '192x192',
        type: 'image/jpg',
        purpose: 'maskable any'
      },
      {
        src: 'images/icons/manifest-icon-512.jpg',
        sizes: '512x512',
        type: 'image/jpg',
        purpose: 'maskable any'
      }
    ]
  }
};
