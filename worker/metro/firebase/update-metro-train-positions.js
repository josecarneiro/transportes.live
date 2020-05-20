const database = require('./../../firebase');

const loadTrainPositions = require('./../services/load-train-positions');

const transformToJSONObject = require('./../../helpers/transform-to-json-object');

const updateFirebaseMetroTrainPositions = async () => {
  const trains = await loadTrainPositions();
  const data = trains.reduce((acc, { id, ...value }) => ({ ...acc, [id]: value }), {});
  const metroPositionReference = database.ref('metro/position');
  metroPositionReference.set(transformToJSONObject(data));
};

module.exports = updateFirebaseMetroTrainPositions;
