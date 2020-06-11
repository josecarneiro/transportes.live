'use strict';

const transformToJSONObject = require('./../../helpers/transform-to-json-object');

const database = require('./../../firebase');
const client = require('./../client');

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
  const filtered = stops.map(({ id, publicId }) => ({ id, publicId }));

  const ids = filtered.map(({ id }) => id);
  ids.sort(() => 0.5 - Math.random());

  const estimates = await loadEstimates(ids.slice(0, MAXIMUM_COUNT));
  const data = estimates.reduce(
    (acc, { publicId: id, estimates: value }) => ({ ...acc, [id]: value }),
    {}
  );

  const carrisStopsReference = database.ref('carris/estimates');
  carrisStopsReference.update(transformToJSONObject(data));
};

module.exports = updateFirebaseCarrisStops;
