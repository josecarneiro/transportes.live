'use strict';

const database = require('./../../firebase');
const client = require('./../client');

const transformToJSONObject = require('./../../helpers/transform-to-json-object');

// const stations = require('transportes-bundled-data/dist/metro/stations');

const { log } = require('transportes/utilities');

const serializeDate = date => Number(new Date(date)) / 1000;

const serializeArrivals = ({ train, time }) => ({
  i: train,
  t: serializeDate(time)
});

const serializePlatform = ({ arrivals }) => arrivals.map(serializeArrivals);

const extractEstimates = estimates =>
  Object.fromEntries(
    Object.entries(
      estimates.reduce(
        (accumulator, { station, ...value }) => ({
          ...accumulator,
          [station]: [...(accumulator[station] || []), value]
        }),
        {}
      )
    ).map(([key, platforms]) => [
      key,
      platforms.reduce(
        (accumulator, { platform, ...value }) => ({
          ...accumulator,
          [platform]: serializePlatform(value)
        }),
        {}
      )
    ])
  );

const updateFirebaseMetroEstimates = async () => {
  const unparsedEstimates = await client.listEstimates();
  const estimates = extractEstimates(unparsedEstimates);
  log(estimates);

  const metroPositionReference = database.ref('metro/stations');
  metroPositionReference.set(transformToJSONObject(estimates));
};

module.exports = updateFirebaseMetroEstimates;
