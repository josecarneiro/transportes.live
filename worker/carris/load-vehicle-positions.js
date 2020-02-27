'use strict';

const client = require('./client');

const loadVehiclePositions = async () => {
  const vehicles = await client.listVehicles();
  return vehicles;
};

module.exports = loadVehiclePositions;
