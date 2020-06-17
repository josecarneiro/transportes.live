'use strict';

const database = require('./../../firebase');
const transformToJSONObject = require('./../../helpers/transform-to-json-object');
const { log } = require('transportes/utilities');

const serializeDate = require('./../../helpers/serialize-date');

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

const updateFirebaseMetroStationEstimates = async rawEstimates => {
  const stationEstimates = extractEstimates(rawEstimates);
  // log(stationEstimates);

  const metroPositionReference = database.ref('metro/stations');
  metroPositionReference.set(transformToJSONObject(stationEstimates));
};

module.exports = updateFirebaseMetroStationEstimates;
