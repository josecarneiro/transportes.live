const {
  VUE_APP_GOOGLE_ANALYTICS_ID,
  VUE_APP_GOOGLE_MAPS_API_KEY,
  VUE_APP_FIREBASE_API_KEY
} = process.env;

const firebaseConfiguration = {
  apiKey: VUE_APP_FIREBASE_API_KEY,
  databaseURL: 'https://transportes-live.firebaseio.com'
};

const mapsConfiguration = {
  apiKey: VUE_APP_GOOGLE_MAPS_API_KEY
};

const analyticsConfiguration = {
  id: VUE_APP_GOOGLE_ANALYTICS_ID
};

export { firebaseConfiguration, mapsConfiguration, analyticsConfiguration };
