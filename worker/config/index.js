'use strict';

const {
  FIREBASE_DATABASE_NAME,
  FIREBASE_CREDENTIALS_PATH,
  METRO_API_KEY,
  GIRA_API_KEY
} = process.env;

module.exports = {
  firebase: {
    databaseName: FIREBASE_DATABASE_NAME,
    credentialsPath: FIREBASE_CREDENTIALS_PATH
  },
  metro: {
    apiKey: METRO_API_KEY
  },
  gira: {
    apiKey: GIRA_API_KEY
  }
};
