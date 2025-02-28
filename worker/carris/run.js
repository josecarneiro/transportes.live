'use strict';

const updateVehiclesPositions = require('./update/vehicle-positions');
const updateEstimates = require('./update/estimates');

const loop = require('./../helpers/promises/loop');
const runLoopConcurrently = require('./../helpers/promises/run-loop-concurrently');

const logger = require('./../logger');

const carrisServiceLog = logger.extend('carris');

module.exports = async ({
  intervals: updateIntervals,
  concurrency: updateConcurrency
}) => {
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
  }, updateIntervals.vehiclePositions);
  runLoopConcurrently(
    async () => {
      try {
        await updateEstimates();
        carrisServiceLog.extend('success')('Updated Carris estimates.');
      } catch (error) {
        carrisServiceLog.extend('error')('Error updating Carris estimates.');
        carrisServiceLog.extend('detailed')(error);
      }
    },
    updateConcurrency.stopEstimates,
    { delay: updateIntervals.stopEstimates }
  );
};
