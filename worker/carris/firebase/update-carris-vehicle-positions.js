'use strict';

const database = require('./../../firebase');

const loadBusPositions = require('./../services/load-vehicle-positions');

const transformToJSONObject = require('./../../helpers/transform-to-json-object');

const updateFirebaseCarrisBusPositions = async () => {
  const vehicles = await loadBusPositions();

  const vehicleReference = database.ref('carris/vehicles');
  const positionReference = database.ref('carris/positions');

  const vehicleData = vehicles.reduce(
    (acc, { id, ...value }) => ({ ...acc, [id]: value }),
    {}
  );
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

  vehicleReference.set(transformToJSONObject(vehicleData));
  positionReference.set(transformToJSONObject(positionData));
};

module.exports = updateFirebaseCarrisBusPositions;
