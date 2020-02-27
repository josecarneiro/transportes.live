const dotenv = require('dotenv');
dotenv.config();

const updateFirebaseMetroTrainPositions = require('./metro/firebase-update-metro-train-positions');
const updateFirebaseMetroEstimates = require('./metro/firebase-update-metro-estimates');
const updateFirebaseCarrisVehiclesPositions = require('./carris/firebase-update-carris-vehicle-positions');
const updateFirebaseCarrisStops = require('./carris/firebase-update-stops');
const updateFirebaseCarrisEstimates = require('./carris/firebase-update-estimates');

const DELAY = 1000;
// const DELAY = 5000;

const debug = require('debug');
const log = debug('transportes-live');

const workerLog = log.extend('worker');
const carrisServiceLog = log.extend('carris');
const metroServiceLog = log.extend('metro');

const runOnce = async () => {
  try {
    await updateFirebaseCarrisStops();
    carrisServiceLog.extend('success')('Updated Carris stops.');
  } catch (error) {
    carrisServiceLog.extend('error')('Error updating Carris stops.', error);
  }
};

const loop = async () => {
  try {
    await updateFirebaseCarrisVehiclesPositions();
    carrisServiceLog.extend('success')('Updated Carris vehicle positions.');
  } catch (error) {
    carrisServiceLog.extend('error')('Error updating Carris vehicle positions.', error);
  }
  try {
    await updateFirebaseMetroTrainPositions();
    metroServiceLog.extend('success')('Updated Metro train positions.');
  } catch (error) {
    metroServiceLog.extend('error')('Error updating firebase with metro train positions', error);
  }
  try {
    await updateFirebaseMetroEstimates();
    metroServiceLog.extend('success')('Updated Metro estimates.');
  } catch (error) {
    metroServiceLog.extend('error')('Error updating firebase with metro train estimates', error);
  }
  setTimeout(loop, DELAY);
};

const loopSlower = async () => {
  try {
    await updateFirebaseCarrisEstimates();
    carrisServiceLog.extend('success')('Updated Carris estimates.');
  } catch (error) {
    carrisServiceLog.extend('error')('Error updating Carris estimates.', error);
  }
  setTimeout(loopSlower, DELAY * 5);
};

runOnce();
loop();
loopSlower();
