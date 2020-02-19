const database = require('./firebase');

const loadTrainPositions = require('./metro/load-train-positions');
const loadBusPositions = require('./carris/load-bus-positions');

const transformToJSONObject = object => JSON.parse(JSON.stringify(object));

const updateFirebaseMetroTrainPositions = async () => {
  const trains = await loadTrainPositions();
  const data = trains.reduce((acc, { id, ...value }) => ({ ...acc, [id]: value }), {});
  const metroPositionReference = database.ref('metro/position');
  metroPositionReference.set(transformToJSONObject(data));
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
  await updateFirebaseCarrisBusPositions();
  await updateFirebaseMetroTrainPositions();
  setTimeout(loop, DELAY);
};

loop();
