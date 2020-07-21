'use strict';

const database = require('./../../firebase');
// const { log } = require('transportes/utilities');
const transformToJSONObject = require('./../../helpers/transform-to-json-object');
const extractTrainLocations = require('./../helpers/extract-position');
const arrayToObjectReducerFactory = require('./../../helpers/array-to-object-reducer-factory');

const serializeDate = require('./../../helpers/serialize-date');

const serializePosition = ({ location, ...train }) => ({
  ...train,
  l: location.map(({ station, time }) => ({
    s: station,
    t: serializeDate(time)
  }))
});

const updateFirebaseMetroTrainPositions = async rawEstimates => {
  const positions = extractTrainLocations(rawEstimates);
  const data = positions
    .map(serializePosition)
    .reduce(arrayToObjectReducerFactory(), {});

  const metroPositionReference = database.ref('metro/position');
  metroPositionReference.set(transformToJSONObject(data));
};

module.exports = updateFirebaseMetroTrainPositions;
