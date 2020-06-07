const dotenv = require('dotenv');
dotenv.config();

const updateFirebaseMetroTrainPositions = require('./metro/firebase/update-metro-train-positions');
const updateFirebaseMetroEstimates = require('./metro/firebase/update-metro-estimates');
const updateFirebaseCarrisVehiclesPositions = require('./carris/firebase/update-carris-vehicle-positions');
const updateFirebaseCarrisStops = require('./carris/firebase/update-stops');
const updateFirebaseCarrisRoutes = require('./carris/firebase/update-routes');
const updateFirebaseCarrisEstimates = require('./carris/firebase/update-estimates');

const DELAY = 1000;
// const DELAY = 5000;

const debug = require('debug');
const log = debug('transportes-live');

const workerLog = log.extend('worker');
const carrisServiceLog = log.extend('carris');
const metroServiceLog = log.extend('metro');

const loop = (callback, delay) =>
  setTimeout(() => {
    callback();
    loop(callback, delay);
  }, delay);

const runOnce = async () => {
  try {
    await updateFirebaseCarrisStops();
    carrisServiceLog.extend('success')('Updated Carris stops.');
  } catch (error) {
    carrisServiceLog.extend('error')('Error updating Carris stops.');
    carrisServiceLog.extend('detailed')(error);
  }
  try {
    await updateFirebaseCarrisRoutes();
    carrisServiceLog.extend('success')('Updated Carris routes.');
  } catch (error) {
    carrisServiceLog.extend('error')('Error updating Carris routes.');
    carrisServiceLog.extend('detailed')(error);
  }
};

runOnce();

loop(async () => {
  try {
    await updateFirebaseCarrisVehiclesPositions();
    carrisServiceLog.extend('success')('Updated Carris vehicle positions.');
  } catch (error) {
    carrisServiceLog.extend('error')('Error updating Carris vehicle positions.');
    carrisServiceLog.extend('detailed')(error);
  }
  try {
    await updateFirebaseMetroTrainPositions();
    metroServiceLog.extend('success')('Updated Metro train positions.');
  } catch (error) {
    metroServiceLog.extend('error')('Error updating firebase with metro train positions');
    metroServiceLog.extend('detailed')(error);
  }
  try {
    await updateFirebaseMetroEstimates();
    metroServiceLog.extend('success')('Updated Metro estimates.');
  } catch (error) {
    metroServiceLog.extend('error')('Error updating firebase with metro train estimates');
    metroServiceLog.extend('detailer')(error);
  }
}, DELAY);

loop(async () => {
  try {
    await updateFirebaseCarrisEstimates();
    carrisServiceLog.extend('success')('Updated Carris estimates.');
  } catch (error) {
    carrisServiceLog.extend('error')('Error updating Carris estimates.');
    carrisServiceLog.extend('detailed')(error);
  }
}, DELAY * 2);
