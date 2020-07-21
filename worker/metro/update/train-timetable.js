'use strict';

const database = require('./../../firebase');
// const { log } = require('transportes/utilities');
const transformToJSONObject = require('./../../helpers/transform-to-json-object');
const arrayToObjectReducerFactory = require('./../../helpers/array-to-object-reducer-factory');
const extractTrains = require('./../helpers/extract-trains');

const updateFirebaseMetroTrainPositions = async rawEstimates => {
  const trains = extractTrains(rawEstimates);
  const data = trains.reduce(arrayToObjectReducerFactory(), {});

  const metroTrainReference = database.ref('metro/train');
  metroTrainReference.set(transformToJSONObject(data));
};

module.exports = updateFirebaseMetroTrainPositions;
