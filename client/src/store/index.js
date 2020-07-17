import Vue from 'vue';
import Vuex from 'vuex';

import location from './location';
import favorites from './favorites';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    location,
    favorites
  }
});
