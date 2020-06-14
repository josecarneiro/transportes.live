'use strict';

const database = require('./../../firebase');
const client = require('./../client');

const transformToJSONObject = require('./../../helpers/transform-to-json-object');
const extractEstimates = require('./../extract-estimates');

const updateFirebaseMetroEstimates = async () => {
  const unparsedEstimates = await client.listEstimates();
  const estimates = extractEstimates(unparsedEstimates);

  const metroPositionReference = database.ref('metro/stations');
  metroPositionReference.set(transformToJSONObject(estimates));
};

module.exports = updateFirebaseMetroEstimates;
