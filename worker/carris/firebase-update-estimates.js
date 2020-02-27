'use strict';

const database = require('./../firebase');

const loadStops = require('./load-stops');

const { transformToJSONObject } = require('./../utilities');

const loadEstimates = require('./load-estimations');

const updateFirebaseCarrisStops = async () => {
  const stops = await loadStops();
  const filtered = stops
    .filter(({ visible }) => visible)
    .map(({ id, publicId }) => ({ id, publicId }));

  const ids = filtered.map(({ id }) => id);
  ids.sort(() => 0.5 - Math.random());

  const COUNT = 50;

  const estimates = await loadEstimates(ids.slice(0, 50));
  const data = estimates
    .filter(value => value)
    .map(({ publicId: id, name, position, estimations }) => ({ id, name, position, estimations }))
    .reduce((acc, { id, ...value }) => ({ ...acc, [id]: value }), {});

  // console.log(estimates);
  const carrisStopsReference = database.ref('carris/estimates');
  carrisStopsReference.set(transformToJSONObject(data));
};

module.exports = updateFirebaseCarrisStops;
