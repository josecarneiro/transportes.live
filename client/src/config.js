const {
  VUE_APP_GOOGLE_ANALYTICS_ID,
  VUE_APP_GOOGLE_MAPS_API_KEY,
  VUE_APP_FIREBASE_DATABASE_NAME,
  VUE_APP_FIREBASE_API_KEY,

  VUE_APP_PROVIDER_CARRIS,
  VUE_APP_PROVIDER_METRO,
  VUE_APP_PROVIDER_CP,
  VUE_APP_PROVIDER_BOATS,
  VUE_APP_PROVIDER_GIRA
} = process.env;

const firebaseConfiguration = {
  apiKey: VUE_APP_FIREBASE_API_KEY,
  databaseURL: `https://${VUE_APP_FIREBASE_DATABASE_NAME}.firebaseio.com`
};

const mapsConfiguration = {
  apiKey: VUE_APP_GOOGLE_MAPS_API_KEY
};

const analyticsConfiguration = {
  id: VUE_APP_GOOGLE_ANALYTICS_ID
};

const providersConfiguration = {
  carris: VUE_APP_PROVIDER_CARRIS === 'true',
  metro: VUE_APP_PROVIDER_METRO === 'true',
  gira: VUE_APP_PROVIDER_CP === 'true',
  boats: VUE_APP_PROVIDER_BOATS === 'true',
  cp: VUE_APP_PROVIDER_GIRA === 'true'
};

export {
  firebaseConfiguration,
  mapsConfiguration,
  analyticsConfiguration,
  providersConfiguration
};
