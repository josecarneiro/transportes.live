'use strict';

const database = require('./../firebase');

const carrisStopsReference = database.ref('carris/estimates');
const carrisVehicleReference = database.ref('carris/vehicles');
const carrisPositionReference = database.ref('carris/positions');

module.exports = {
  carrisStopsReference,
  carrisVehicleReference,
  carrisPositionReference
};
