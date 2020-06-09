'use strict';

const client = require('./../client');
const calculateBearing = require('./../../helpers/calculate-bearing');

const transformVehicle = vehicle => {
  let bearing =
    vehicle.position && vehicle.previousPosition
      ? calculateBearing(vehicle.previousPosition, vehicle.position)
      : 0;
  return {
    bearing,
    ...vehicle
  };
};

const loadVehiclePositions = async () => {
  const vehicles = await client.listVehicles();
  return vehicles.map(transformVehicle);
};

module.exports = loadVehiclePositions;
