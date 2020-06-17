'use strict';

const { log } = require('transportes/utilities');

const lines = require('transportes/metro/data/lines');
const destinations = require('transportes-bundled-data/dist/metro/destinations');

const extractTrains = require('./extract-trains');

const getAdjacentPreviousStation = (line, currentStation, direction) => {
  const currentStationIndex = line.stations.indexOf(currentStation);
  const directionIndex = line.stations.indexOf(direction);

  let previousStationIndex;
  if (currentStationIndex === directionIndex) {
    previousStationIndex = currentStationIndex ? currentStationIndex - 1 : 1;
  } else {
    previousStationIndex = currentStationIndex + (directionIndex ? 1 : -1);
  }
  const previousStation = line.stations[previousStationIndex];

  return previousStation;
};

module.exports = platforms => {
  const trains = extractTrains(platforms);
  return trains
    .filter(train => train.estimates.length >= 2)
    .map(({ estimates: rawEstimates, ...train }) => {
      const estimates = rawEstimates.map(({ destination, ...data }) => ({
        destination: (destinations.find(({ id }) => id === destination) || {})
          .station,
        ...data
      }));

      // log(estimates);
      const line = lines.find(({ stations }) =>
        estimates.every(({ station }) => stations.some(id => station === id))
      );

      const [
        {
          station: currentStation,
          destination: currentDirection,
          time: currentTime
        }
      ] = estimates;

      const previousStation = getAdjacentPreviousStation(
        line,
        currentStation,
        currentDirection
      );

      const timeBetweenStations = 120;

      const location = [
        {
          station: previousStation,
          time: new Date(currentTime - timeBetweenStations * 1000)
        },
        { station: currentStation, time: currentTime }
      ];

      return {
        ...train,
        // line: line.id,
        location
      };
    });
};
