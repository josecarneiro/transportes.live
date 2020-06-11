'use strict';

const client = require('./client');
const database = require('./../firebase');

const transformToJSONObject = require('./../helpers/transform-to-json-object');

const updateFirebaseGiraStations = async () => {
  const stations = await client.listStations();
  const stationData = stations
    .map(
      ({
        id,
        name, // type,
        bikes,
        docks,
        status,
        position: { latitude, longitude }
      }) => ({
        id,
        n: name,
        b: bikes,
        d: docks,
        a: status === 'active',
        p: [latitude, longitude]
      })
    )
    .reduce((acc, { id, ...value }) => ({ ...acc, [id]: value }), {});
  const giraStationsReference = database.ref('gira/stations');
  giraStationsReference.set(transformToJSONObject(stationData));
};

module.exports = updateFirebaseGiraStations;
