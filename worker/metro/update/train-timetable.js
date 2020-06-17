'use strict';

const database = require('./../../firebase');
const { log } = require('transportes/utilities');
const transformToJSONObject = require('./../../helpers/transform-to-json-object');
const reduceArrayToObject = require('./../helpers/reduce-array-to-object');
const extractTrains = require('./../helpers/extract-trains');

const updateFirebaseMetroTrainPositions = async estimates => {
  const trains = extractTrains(estimates);
  const data = trains.reduce(reduceArrayToObject, {});
  // log(trains);

  const metroTrainReference = database.ref('metro/train');
  metroTrainReference.set(transformToJSONObject(data));
};

module.exports = updateFirebaseMetroTrainPositions;
