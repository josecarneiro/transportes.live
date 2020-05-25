'use strict';

const database = require('./../../firebase');

const loadStops = require('./../services/list-stops');

const transformToJSONObject = require('./../../helpers/transform-to-json-object');

const loadEstimates = require('../services/load-estimates');

// const MAXIMUM_COUNT = 20;
const MAXIMUM_COUNT = 40;

const updateFirebaseCarrisStops = async () => {
  const stops = await loadStops();
  const filtered = stops.map(({ id, publicId }) => ({ id, publicId }));

  const ids = filtered.map(({ id }) => id);
  ids.sort(() => 0.5 - Math.random());

  const estimates = await loadEstimates(ids.slice(0, MAXIMUM_COUNT));
  const data = estimates.reduce(
    (acc, { publicId: id, estimates }) => ({ ...acc, [id]: estimates }),
    {}
  );

  const carrisStopsReference = database.ref('carris/estimates');
  carrisStopsReference.update(transformToJSONObject(data));
};

module.exports = updateFirebaseCarrisStops;
