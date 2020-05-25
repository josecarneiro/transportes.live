'use strict';

const client = require('./../client');

module.exports = async id => {
  const route = await client.loadStop(id);
  return route;
};
