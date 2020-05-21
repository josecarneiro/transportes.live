'use strict';

const database = require('./../../firebase');

const loadBusPositions = require('./../services/load-vehicle-positions');

const transformToJSONObject = require('./../../helpers/transform-to-json-object');

const updateFirebaseCarrisBusPositions = async () => {
  const vehicles = await loadBusPositions();

  const vehicleReference = database.ref('carris/vehicles');
  const positionReference = database.ref('carris/positions');

  const vehicleData = vehicles.reduce((acc, { id, ...value }) => ({ ...acc, [id]: value }), {});
  const positionData = vehicles
    .map(({ id, bearing, position, route }) => ({
      id,
      angle: Math.floor((180 * bearing) / Math.PI),
      position,
      route
    }))
    .reduce((acc, { id, ...value }) => ({ ...acc, [id]: value }), {});

  vehicleReference.set(transformToJSONObject(vehicleData));
  positionReference.set(transformToJSONObject(positionData));
};

module.exports = updateFirebaseCarrisBusPositions;
