import Vue from 'vue';
import App from './app';
import router from './router';
import store from './store';
import './register-service-worker';

import * as VueGoogleMaps from 'vue2-google-maps';
import VueGtag from 'vue-gtag';
import VueTimeago from 'vue-timeago';

import { mapsConfiguration, analyticsConfiguration } from './config';

import 'vue-material-design-icons/styles.css';

Vue.config.productionTip = false;

Vue.use(VueGtag, {
  config: { id: analyticsConfiguration.id }
});

Vue.use(VueGoogleMaps, {
  load: {
    key: mapsConfiguration.apiKey
  },
  installComponents: false
});

Vue.use(VueTimeago, {
  name: 'TimeAgo',
  locale: 'en',
  // locale: 'pt',
  locales: {
    pt: require('date-fns/locale/pt')
  },
  converterOptions: {
    includeSeconds: true
  }
});

const app = new Vue({
  router,
  store,
  render: (h) => h(App)
});

export default app;
