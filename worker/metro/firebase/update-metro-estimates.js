const database = require('./../../firebase');

const loadTrainEstimates = require('./../services/load-estimates');

const transformToJSONObject = require('./../../helpers/transform-to-json-object');

const updateFirebaseMetroEstimates = async () => {
  const estimates = await loadTrainEstimates();
  // console.log(estimates);
  // const data = trains.reduce((acc, { id, ...value }) => ({ ...acc, [id]: value }), {});
  const metroPositionReference = database.ref('metro/stations');
  metroPositionReference.set(transformToJSONObject(estimates));
};

module.exports = updateFirebaseMetroEstimates;
