'use strict';

const database = require('./../firebase');

const loadBusPositions = require('./load-vehicle-positions');

const { transformToJSONObject } = require('./../utilities');

const updateFirebaseCarrisBusPositions = async () => {
  const vehicles = await loadBusPositions();
  const data = vehicles.reduce((acc, { id, ...value }) => ({ ...acc, [id]: value }), {});
  // const data = trains.reduce((acc, { id, ...value }) => ({ ...acc, [id]: value }), {});
  const vehiclePositionReference = database.ref('carris/vehicles');
  // vehiclePositionReference.set(data);
  vehiclePositionReference.set(transformToJSONObject(data));
};

module.exports = updateFirebaseCarrisBusPositions;
