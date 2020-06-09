'use strict';

const database = require('./../../firebase');

const loadStops = require('./../services/list-stops');

const transformToJSONObject = require('./../../helpers/transform-to-json-object');

const updateFirebaseCarrisStops = async () => {
  const stops = await loadStops();

  const stopDetails = stops
    .filter(({ visible }) => visible)
    .map(({ publicId: id, name, position }) => ({
      id,
      name,
      position,
      estimates: []
    }))
    .reduce((acc, { id, ...value }) => ({ ...acc, [id]: value }), {});
  const carrisStopsReference = database.ref('carris/stops');
  carrisStopsReference.set(transformToJSONObject(stopDetails));

  const stopPositions = stops
    .filter(({ visible }) => visible)
    .map(({ publicId: id, position: { latitude, longitude } }) => ({
      id,
      position: [latitude, longitude]
    }))
    .reduce((acc, { id, position }) => ({ ...acc, [id]: position }), {});
  const carrisStopPositionsReference = database.ref('carris/stop-positions');
  carrisStopPositionsReference.set(transformToJSONObject(stopPositions));
};

module.exports = updateFirebaseCarrisStops;
