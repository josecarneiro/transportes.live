import Vue from 'vue';
import App from './app';
import router from './router';
import store from './store';
import i18n from './internationalization';
import * as filters from './filters';

import './register-service-worker';

import * as VueGoogleMaps from 'vue2-google-maps';
import VueGtag from 'vue-gtag';

import {
  maps as mapsConfiguration,
  analytics as analyticsConfiguration
} from '@/config';

// Import common components
import Icon from '@/components/icon';

Vue.component('icon', Icon);
// import 'vue-material-design-icons/styles.css';

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
  i18n,
  mounted() {
    this.loadStorageData();
  },
  methods: {
    loadStorageData() {
      this.$store.dispatch('favorites/load');
    }
  },
  render: h => h(App)
});

export default app;
