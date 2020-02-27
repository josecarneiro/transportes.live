// process.env.FIREBASE_CONFIG = JSON.stringify(require('./key.json'));
process.env.GOOGLE_APPLICATION_CREDENTIALS = './config/key.json';

const admin = require('firebase-admin');
const config = require('./config');

const app = admin.initializeApp({
  // credential: process.env.FIREBASE_CONFIG,
  // credential: admin.credential.applicationDefault(),
  // serviceAccount: './key.json',
  databaseURL: `https://${config.firebase.databaseName}.firebaseio.com`
});

const database = app.database();

module.exports = database;
