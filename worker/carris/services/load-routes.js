'use strict';

const client = require('./../client');

const loadRoutes = async () => {
  const routes = await client.listRoutes();
  return routes;
};

module.exports = loadRoutes;
