'use strict';

const database = require('./../../firebase');
const { log } = require('transportes/utilities');
const transformToJSONObject = require('./../../helpers/transform-to-json-object');
const extractTrainLocations = require('../helpers/extract-position');
const reduceArrayToObject = require('./../helpers/reduce-array-to-object');

const serializeDate = require('./../../helpers/serialize-date');

const serializePosition = ({ location, ...train }) => ({
  ...train,
  l: location.map(({ station, time }) => ({
    s: station,
    t: serializeDate(time)
  }))
});

const updateFirebaseMetroTrainPositions = async estimates => {
  const positions = extractTrainLocations(estimates);
  const data = positions.map(serializePosition).reduce(reduceArrayToObject, {});
  // log(data);

  const metroPositionReference = database.ref('metro/position');
  metroPositionReference.set(transformToJSONObject(data));
};

module.exports = updateFirebaseMetroTrainPositions;
