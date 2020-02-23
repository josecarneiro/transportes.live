import Vue from 'vue';
import App from './app';
// import './registerServiceWorker';
import router from './router';
import store from './store';

import * as VueGoogleMaps from 'vue2-google-maps';

import 'vue-material-design-icons/styles.css';

import { mapsConfiguration } from './config';

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: mapsConfiguration.apiKey
    // OR: libraries: 'places,drawing,visualization'
  },
  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,
  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then set installComponents to 'false'.
  //// If you want to automatically install all the components this property must be set to 'true':
  installComponents: true
  // installComponents: false
});

import VueTimeago from 'vue-timeago';

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
