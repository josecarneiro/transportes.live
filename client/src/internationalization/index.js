import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const AVAILABLE_LOCALES = ['en', 'pt'];

const DEFAULT_LOCALE = 'en';

const BROWSER_LOCALE = window?.navigator?.language.split('-')[0];

const i18n = new VueI18n({
  // locale: 'pt',
  locale: BROWSER_LOCALE,
  fallbackLocale: 'en'
});

export default i18n;
