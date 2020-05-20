'use strict';

const database = require('./../../firebase');

const loadStops = require('./../services/load-stops');

const transformToJSONObject = require('./../../helpers/transform-to-json-object');

const updateFirebaseCarrisStops = async () => {
  const stops = await loadStops();
  const data = stops
    .filter(({ visible }) => visible)
    .map(({ publicId: id, name, position }) => ({ id, name, position, estimates: [] }))
    .reduce((acc, { id, ...value }) => ({ ...acc, [id]: value }), {});
  const carrisStopsReference = database.ref('carris/stops');
  carrisStopsReference.set(transformToJSONObject(data));
};

module.exports = updateFirebaseCarrisStops;
