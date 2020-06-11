'use strict';

const database = require('./../../firebase');
const client = require('./../client');

const transformToJSONObject = require('../../helpers/transform-to-json-object');
const calculateBearing = require('./../../helpers/calculate-bearing');

const transformVehicle = vehicle => {
  const bearing =
    vehicle.position && vehicle.previousPosition
      ? calculateBearing(vehicle.previousPosition, vehicle.position)
      : 0;
  return {
    bearing,
    ...vehicle
  };
};

const updateFirebaseCarrisBusPositions = async () => {
  const unparsedVehicles = await client.listVehicles();
  const vehicles = unparsedVehicles.map(transformVehicle);
  const vehicleReference = database.ref('carris/vehicles');
  const vehicleData = vehicles.reduce(
    (acc, { id, ...value }) => ({ ...acc, [id]: value }),
    {}
  );
  vehicleReference.set(transformToJSONObject(vehicleData));

  const positionReference = database.ref('carris/positions');
  const positionData = vehicles
    .map(({ bearing, ...vehicle }) => ({
      angle: Math.floor((180 * bearing) / Math.PI),
      ...vehicle
    }))
    .map(({ id, angle, position: { latitude, longitude }, route }) => ({
      id,
      a: angle,
      p: [latitude, longitude],
      r: route
    }))
    .reduce((acc, { id, ...value }) => ({ ...acc, [id]: value }), {});
  positionReference.set(transformToJSONObject(positionData));
};

module.exports = updateFirebaseCarrisBusPositions;
