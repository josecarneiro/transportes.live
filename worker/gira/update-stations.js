'use strict';

const client = require('./client');
const database = require('./../firebase');

const transformToJSONObject = require('./../helpers/transform-to-json-object');
const arrayToObjectReducerFactory = require('./../helpers/array-to-object-reducer-factory');

const updateFirebaseGiraStations = async () => {
  const stations = await client.listStations();
  const stationData = stations
    .map(({ id, bikes, docks, status }) => ({
      id,
      b: bikes,
      d: docks,
      a: status === 'active'
    }))
    .reduce(arrayToObjectReducerFactory(), {});
  const giraStationsReference = database.ref('gira/stations');
  giraStationsReference.set(transformToJSONObject(stationData));
};

module.exports = updateFirebaseGiraStations;
