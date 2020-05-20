'use strict';

const client = require('./../client');

const loadSingleRoute = async number => {
  const route = await client.loadRoute(number);
  return route;
};

module.exports = loadSingleRoute;
