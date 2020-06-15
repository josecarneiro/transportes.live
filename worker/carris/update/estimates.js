'use strict';

const database = require('./../../firebase');
const client = require('./../client');

const transformToJSONObject = require('./../../helpers/transform-to-json-object');
const { serializeEstimate } = require('./../serializers');
const { log } = require('transportes/utilities');

const loadEstimates = async ids => {
  const COUNT = 50;
  const operations = ids.reduce(
    (acc, value) => {
      const last = acc[acc.length - 1];
      if (last.length >= COUNT) {
        acc.push([value]);
      } else {
        last.push(value);
      }
      return acc;
    },
    [[]]
  );
  const estimates = [];
  for (const list of operations) {
    const values = await client.listEstimates(list);
    estimates.push(...values);
  }
  return estimates.filter(value => value);
};

const MAXIMUM_COUNT = 40;

const updateFirebaseCarrisStops = async () => {
  const stops = await client.listStops();
  const filtered = stops
    .filter(({ visible }) => visible)
    .map(({ id, publicId }) => ({ id, publicId }));
  const ids = filtered.map(({ id }) => id);
  ids.sort(() => 0.5 - Math.random());

  const estimates = await loadEstimates(ids.slice(0, MAXIMUM_COUNT));
  const estimatesData = estimates.reduce(
    (acc, { publicId: id, estimates: value }) => ({
      ...acc,
      [id]: value.map(serializeEstimate)
    }),
    {}
  );

  const carrisStopsReference = database.ref('carris/estimates');
  carrisStopsReference.update(transformToJSONObject(estimatesData));
};

module.exports = updateFirebaseCarrisStops;
