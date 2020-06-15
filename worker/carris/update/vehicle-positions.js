'use strict';

const database = require('./../../firebase');
const client = require('./../client');

const transformToJSONObject = require('../../helpers/transform-to-json-object');
const calculateBearing = require('./../../helpers/calculate-bearing');
const { serializeVehicle, serializePosition } = require('./../serializers');

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
  const vehicleData = vehicles
    .map(serializeVehicle)
    .reduce((acc, { id, ...value }) => ({ ...acc, [id]: value }), {});
  const vehicleReference = database.ref('carris/vehicles');
  vehicleReference.set(transformToJSONObject(vehicleData));

  const positionReference = database.ref('carris/positions');
  const positionData = vehicles
    .map(serializePosition)
    .reduce((acc, { id, ...value }) => ({ ...acc, [id]: value }), {});
  positionReference.set(transformToJSONObject(positionData));
};

module.exports = updateFirebaseCarrisBusPositions;
