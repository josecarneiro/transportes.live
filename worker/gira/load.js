'use strict';

const client = require('./client');

module.exports = async () => {
  const data = await client.listStations();
  return data;
};
