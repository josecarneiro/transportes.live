import Vue from 'vue';
import App from './app';
import router from './router';
import store from './store';
import * as filters from './filters';

import './register-service-worker';

import * as VueGoogleMaps from 'vue2-google-maps';
import VueGtag from 'vue-gtag';

import {
  maps as mapsConfiguration,
  analytics as analyticsConfiguration
} from '@/config';

import 'vue-material-design-icons/styles.css';

Vue.config.productionTip = false;

Vue.use(VueGtag, {
  config: { id: analyticsConfiguration.id }
});

Vue.use(VueGoogleMaps, {
  load: {
    key: mapsConfiguration.apiKey,
    v: 'beta',
    map_ids: mapsConfiguration.mapId
  },
  installComponents: false
});

for (const key in filters) Vue.filter(key, filters[key]);

const app = new Vue({
  router,
  store,
  render: h => h(App)
});

export default app;
