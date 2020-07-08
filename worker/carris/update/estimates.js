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

const shuffleArray = original => {
  const array = [...original];
  let size = array.length;
  let t;
  let i;
  while (size) {
    i = Math.floor(Math.random() * size--);
    t = array[size];
    array[size] = array[i];
    array[i] = t;
  }
  return array;
};

const updateFirebaseCarrisStops = async () => {
  const stops = await client.listStops();
  const filtered = stops.filter(({ visible }) => visible);
  const ids = shuffleArray(filtered.map(({ id }) => id));

  const requestedIds = ids.slice(0, MAXIMUM_COUNT);

  // console.log(requestedIds);

  const estimates = await loadEstimates(requestedIds);
  const estimatesData = estimates.reduce(
    (acc, { id, estimates: value }) => ({
      ...acc,
      [id]: value.map(serializeEstimate)
    }),
    {}
  );

  const carrisStopsReference = database.ref('carris/estimates');
  carrisStopsReference.update(transformToJSONObject(estimatesData));
};

module.exports = updateFirebaseCarrisStops;
