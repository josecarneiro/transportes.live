'use strict';

const database = require('./../../firebase');

const loadBusPositions = require('./../services/load-vehicle-positions');

const transformToJSONObject = require('./../../helpers/transform-to-json-object');

const updateFirebaseCarrisBusPositions = async () => {
  const vehicles = await loadBusPositions();
  const vehiclePositionReference = database.ref('carris/vehicles');
  const data = vehicles.reduce((acc, { id, ...value }) => ({ ...acc, [id]: value }), {});
  vehiclePositionReference.set(transformToJSONObject(data));
};

module.exports = updateFirebaseCarrisBusPositions;
