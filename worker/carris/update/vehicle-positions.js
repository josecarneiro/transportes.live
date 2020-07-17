'use strict';

const client = require('./../client');
const {
  carrisVehicleReference,
  carrisPositionReference
} = require('./../references');

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
  carrisVehicleReference.set(transformToJSONObject(vehicleData));

  const positionData = vehicles
    .map(serializePosition)
    .reduce((acc, { id, ...value }) => ({ ...acc, [id]: value }), {});
  carrisPositionReference.set(transformToJSONObject(positionData));
};

module.exports = updateFirebaseCarrisBusPositions;
