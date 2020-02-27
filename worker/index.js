const dotenv = require('dotenv');
dotenv.config();

const updateFirebaseMetroTrainPositions = require('./metro/firebase-update-metro-train-positions');
const updateFirebaseMetroEstimates = require('./metro/firebase-update-metro-estimates');
const updateFirebaseCarrisVehiclesPositions = require('./carris/firebase-update-carris-vehicle-positions');
const updateFirebaseCarrisStops = require('./carris/firebase-update-stops');
const updateFirebaseCarrisEstimates = require('./carris/firebase-update-estimates');

const DELAY = 1000;
// const DELAY = 5000;

const runOnce = async () => {
  try {
    await updateFirebaseCarrisStops();
  } catch (error) {
    console.log('Error updating firebase with carris stops', error);
  }
};

const loop = async () => {
  // try {
  //   await updateFirebaseCarrisVehiclesPositions();
  // } catch (error) {
  //   console.log('Error updating firebase with carris', error);
  // }
  // try {
  //   await updateFirebaseMetroTrainPositions();
  // } catch (error) {
  //   console.log('Error updating firebase with metro', error);
  // }
  // try {
  //   await updateFirebaseMetroEstimates();
  // } catch (error) {
  //   console.log('Error updating firebase with metro estimates', error);
  // }
  setTimeout(loop, DELAY);
};

const loopSlower = async () => {
  try {
    await updateFirebaseCarrisEstimates();
  } catch (error) {
    console.log('Error updating firebase with carris estimates', error);
  }
  setTimeout(loop, DELAY * 5);
};

runOnce();
loop();
loopSlower();
