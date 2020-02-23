const dotenv = require('dotenv');
dotenv.config();

const database = require('./firebase');

const loadTrainPositions = require('./metro/load-train-positions');
const loadTrainEstimates = require('./metro/load-estimates');
const loadBusPositions = require('./carris/load-bus-positions');

const transformToJSONObject = object => JSON.parse(JSON.stringify(object));

const updateFirebaseMetroTrainPositions = async () => {
  const trains = await loadTrainPositions();
  const data = trains.reduce((acc, { id, ...value }) => ({ ...acc, [id]: value }), {});
  const metroPositionReference = database.ref('metro/position');
  metroPositionReference.set(transformToJSONObject(data));
};

const updateFirebaseMetroEstimates = async () => {
  const estimates = await loadTrainEstimates();
  // console.log(estimates);
  // const data = trains.reduce((acc, { id, ...value }) => ({ ...acc, [id]: value }), {});
  const metroPositionReference = database.ref('metro/stations');
  metroPositionReference.set(transformToJSONObject(estimates));
};

const updateFirebaseCarrisBusPositions = async () => {
  const vehicles = await loadBusPositions();
  const data = vehicles.reduce((acc, { id, ...value }) => ({ ...acc, [id]: value }), {});
  // const data = trains.reduce((acc, { id, ...value }) => ({ ...acc, [id]: value }), {});
  const vehiclePositionReference = database.ref('carris/vehicles');
  // vehiclePositionReference.set(data);
  vehiclePositionReference.set(transformToJSONObject(data));
};

const DELAY = 1000;
// const DELAY = 5000;

const loop = async () => {
  try {
    await updateFirebaseCarrisBusPositions();
  } catch (error) {
    console.log('Error updating firebase with carris', error);
  }
  try {
    await updateFirebaseMetroTrainPositions();
  } catch (error) {
    console.log('Error updating firebase with metro', error);
  }
  try {
    await updateFirebaseMetroEstimates();
  } catch (error) {
    console.log('Error updating firebase with metro estimates', error);
  }
  setTimeout(loop, DELAY);
};

loop();
