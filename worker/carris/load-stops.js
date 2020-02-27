'use strict';

const client = require('./client');

const loadStops = async () => {
  const stops = await client.listStops();
  return stops;
};

module.exports = loadStops;
