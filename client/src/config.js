const {
  VUE_APP_DEBUG,

  VUE_APP_GOOGLE_ANALYTICS_ID,
  VUE_APP_GOOGLE_MAPS_API_KEY,
  VUE_APP_GOOGLE_MAPS_MAP_ID,
  VUE_APP_FIREBASE_DATABASE_NAME,
  VUE_APP_FIREBASE_API_KEY,

  VUE_APP_PROVIDER_CARRIS,
  VUE_APP_PROVIDER_METRO,
  VUE_APP_PROVIDER_CP,
  VUE_APP_PROVIDER_BOATS,
  VUE_APP_PROVIDER_GIRA
} = process.env;

export const app = {
  debug: VUE_APP_DEBUG === 'true'
};

export const firebase = {
  apiKey: VUE_APP_FIREBASE_API_KEY,
  databaseURL: `https://${VUE_APP_FIREBASE_DATABASE_NAME}.firebaseio.com`
};

export const maps = {
  apiKey: VUE_APP_GOOGLE_MAPS_API_KEY,
  mapId: VUE_APP_GOOGLE_MAPS_MAP_ID
};

export const analytics = {
  id: VUE_APP_GOOGLE_ANALYTICS_ID
};

export const providers = {
  carris: VUE_APP_PROVIDER_CARRIS === 'true',
  metro: VUE_APP_PROVIDER_METRO === 'true',
  gira: VUE_APP_PROVIDER_GIRA === 'true',
  boats: VUE_APP_PROVIDER_BOATS === 'true',
  cp: VUE_APP_PROVIDER_CP === 'true'
};
