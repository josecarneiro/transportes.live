/* eslint-disable no-console */

import { register } from 'register-service-worker';

const { NODE_ENV, BASE_URL } = process.env;

if (NODE_ENV === 'production') {
  register(`${BASE_URL}service-worker.js`, {
    ready() {
      console.log('transportes.live is being served from cache by a service worker.');
    },
    registered() {
      console.log('Service worker has been registered.');
    },
    cached() {
      console.log('Content has been cached for offline use.');
    },
    updatefound() {
      console.log('New content is downloading.');
    },
    updated() {
      console.log('New content is available. Please refresh.');
      console.log('Refreshing in 3 seconds.');
      setTimeout(() => {
        window.location.reload(true);
      }, 3000);
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.');
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    }
  });
}
