'use strict';

const { log, write } = require('transportes/utilities');

const client = require('./client');

const listEstimationsRecursively = async ids => {
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
  const estimations = [];
  for (const list of operations) {
    const values = await client.listEstimations(list);
    estimations.push(...values);
  }
  return estimations;
};

module.exports = async ids => {
  const estimations = await listEstimationsRecursively(ids);
  return estimations;
};

// module.exports = ids => {};

// (async () => {
//   const COUNT = 50;
//   const stops = await client.listStops();
//   const ids = stops.map(({ id }) => id);
//   ids.sort(() => 0.5 - Math.random());
//   // const estimations = await listEstimationsRecursively(ids);
//   console.log(estimations);
//   write('all-estimations.json', estimations);
//   // console.log(ids.length);
//   // const estimations = await client.listEstimations(ids.slice(0, COUNT), 100);
//   // log(estimations.map(value => (value ? true : false)));
//   // log(COUNT);
//   // log(estimations.length);
// })();
