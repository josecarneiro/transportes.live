const database = require('./../firebase');

const loadTrainEstimates = require('./load-estimates');

const { transformToJSONObject } = require('./../utilities');

const updateFirebaseMetroEstimates = async () => {
  const estimates = await loadTrainEstimates();
  // console.log(estimates);
  // const data = trains.reduce((acc, { id, ...value }) => ({ ...acc, [id]: value }), {});
  const metroPositionReference = database.ref('metro/stations');
  metroPositionReference.set(transformToJSONObject(estimates));
};

module.exports = updateFirebaseMetroEstimates;
