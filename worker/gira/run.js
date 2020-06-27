'use strict';

const updateStations = require('./update-stations');

const loop = require('./../helpers/loop');
const logger = require('./../logger');

const giraServiceLog = logger.extend('gira');

module.exports = updateIntervals => {
  loop(async () => {
    try {
      await updateStations();
      giraServiceLog.extend('success')('Updated Gira stations.');
    } catch (error) {
      giraServiceLog.extend('error')('Error updating Gira stations.');
      giraServiceLog.extend('detailed')(error);
    }
  }, updateIntervals.stations);
};
