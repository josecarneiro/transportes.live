'use strict';

const database = require('./../../firebase');
const client = require('./../client');

const transformToJSONObject = require('./../../helpers/transform-to-json-object');

const extractTrainLocations = require('./../location/extract');
const lines = require('transportes/metro/data/lines');
const stations = require('transportes/metro/data/stations');

const updateFirebaseMetroTrainPositions = async () => {
  const rawTrains = await client.loadEstimates();
  const trains = extractTrainLocations(rawTrains);
  const data = trains.reduce(
    (acc, { id, ...value }) => ({ ...acc, [id]: value }),
    {}
  );

  const metroPositionReference = database.ref('metro/position');
  metroPositionReference.set(transformToJSONObject(data));
};

module.exports = updateFirebaseMetroTrainPositions;
