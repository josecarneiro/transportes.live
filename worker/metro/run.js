'use strict';

const updateTrainPositions = require('./update/train-positions');
const updateStationEstimates = require('./update/station-estimates');
const updateTrainDetails = require('./update/train-timetable');

const loop = require('./../helpers/promises/loop');
const logger = require('./../logger');
const loadEstimates = require('./load-estimates');

const metroServiceLog = logger.extend('metro');

module.exports = updateIntervals => {
  loop(async () => {
    try {
      const estimates = await loadEstimates();
      try {
        await updateTrainPositions(estimates);
        metroServiceLog.extend('success')('Updated Metro train positions.');
      } catch (error) {
        metroServiceLog.extend('error')(
          'Error updating firebase with metro train positions'
        );
        metroServiceLog.extend('detailed')(error);
      }
      try {
        await updateTrainDetails(estimates);
        metroServiceLog.extend('success')('Updated Metro train details.');
      } catch (error) {
        metroServiceLog.extend('error')(
          'Error updating firebase with metro train details'
        );
        metroServiceLog.extend('detailed')(error);
      }
      try {
        await updateStationEstimates(estimates);
        metroServiceLog.extend('success')('Updated Metro estimates.');
      } catch (error) {
        metroServiceLog.extend('error')(
          'Error updating firebase with metro train estimates'
        );
        metroServiceLog.extend('detailed')(error);
      }
    } catch (error) {
      metroServiceLog.extend('error')('Error loading metro estimates');
      metroServiceLog.extend('detailed')(error);
    }
  }, updateIntervals.estimates);
};
