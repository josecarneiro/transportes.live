'use strict';

const updateVehiclesPositions = require('./update/vehicle-positions');
const updateStops = require('./update/stops');
const updateRoutes = require('./update/routes');
const updateEstimates = require('./update/estimates');

const loop = require('./../helpers/loop');
const logger = require('./../logger');

const carrisServiceLog = logger.extend('carris');

const DELAY = 1000;

module.exports = async () => {
  const runOnce = async () => {
    try {
      await updateStops();
      carrisServiceLog.extend('success')('Updated Carris stops.');
    } catch (error) {
      carrisServiceLog.extend('error')('Error updating Carris stops.');
      carrisServiceLog.extend('detailed')(error);
    }

    try {
      await updateRoutes();
      carrisServiceLog.extend('success')('Updated Carris routes.');
    } catch (error) {
      carrisServiceLog.extend('error')('Error updating Carris routes.');
      carrisServiceLog.extend('detailed')(error);
    }
  };

  runOnce();

  loop(async () => {
    try {
      await updateVehiclesPositions();
      carrisServiceLog.extend('success')('Updated Carris vehicle positions.');
    } catch (error) {
      carrisServiceLog.extend('error')(
        'Error updating Carris vehicle positions.'
      );
      carrisServiceLog.extend('detailed')(error);
    }
  }, DELAY / 4);

  loop(async () => {
    try {
      await updateEstimates();
      carrisServiceLog.extend('success')('Updated Carris estimates.');
    } catch (error) {
      carrisServiceLog.extend('error')('Error updating Carris estimates.');
      carrisServiceLog.extend('detailed')(error);
    }
  }, DELAY);
};
