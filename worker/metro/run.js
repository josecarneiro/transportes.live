'use strict';

const updatePositions = require('./update/train-positions');
const updateEstimates = require('./update/estimates');

const loop = require('./../helpers/loop');
const logger = require('./../logger');

const metroServiceLog = logger.extend('metro');

const DELAY = 1000;

module.exports = () => {
  loop(async () => {
    try {
      await updatePositions();
      metroServiceLog.extend('success')('Updated Metro train positions.');
    } catch (error) {
      metroServiceLog.extend('error')(
        'Error updating firebase with metro train positions'
      );
      metroServiceLog.extend('detailed')(error);
    }
  }, DELAY);

  loop(async () => {
    try {
      await updateEstimates();
      metroServiceLog.extend('success')('Updated Metro estimates.');
    } catch (error) {
      metroServiceLog.extend('error')(
        'Error updating firebase with metro train estimates'
      );
      metroServiceLog.extend('detailer')(error);
    }
  }, DELAY);
};
