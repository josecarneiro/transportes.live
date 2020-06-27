'use strict';

const SECOND = 1000;

const {
  PROVIDER_METRO_UPDATE_INTERVAL_ESTIMATES = '2',
  PROVIDER_CARRIS_UPDATE_INTERVAL_VEHICLE_POSITIONS = '3',
  PROVIDER_CARRIS_UPDATE_INTERVAL_STOP_ESTIMATES = '1',
  PROVIDER_GIRA_UPDATE_INTERVAL_STATIONS = '5'
} = process.env;

const updateIntervals = {
  metro: {
    estimates: SECOND * PROVIDER_METRO_UPDATE_INTERVAL_ESTIMATES
  },
  carris: {
    vehiclePositions:
      SECOND * PROVIDER_CARRIS_UPDATE_INTERVAL_VEHICLE_POSITIONS,
    stopEstimates: SECOND * PROVIDER_CARRIS_UPDATE_INTERVAL_STOP_ESTIMATES
  },
  gira: {
    stations: SECOND * PROVIDER_GIRA_UPDATE_INTERVAL_STATIONS
  }
};

module.exports = updateIntervals;
