'use strict';

const { log, write } = require('transportes/utilities');

const lines = require('transportes/metro/data/lines');

const limitValue = (value, max, min) => Math.max(Math.min(value, max), min);

const getTrains = piers => {
  const trains = [];
  for (const {
    station,
    pier,
    destination,
    arrivals,
    time: dataTime
  } of piers) {
    for (const { train, time } of arrivals) {
      const estimate = {
        station,
        pier,
        destination,
        computationTime: new Date(),
        referenceTime: dataTime,
        time,
        timeUntil: (time - dataTime) / 1000
      };
      const trainInList = trains.find(({ id }) => id === train);
      if (trainInList) {
        trainInList.estimates.push(estimate);
      } else {
        trains.push({
          id: train,
          estimates: [estimate]
        });
      }
    }
  }
  trains.forEach(train => {
    train.estimates.sort(({ time: a }, { time: b }) => a - b);
  });
  return trains;
};

module.exports = piers => {
  // log(piers);
  const trains = getTrains(piers);
  // log(trains);
  return trains
    .filter(train => train.estimates.length >= 2)
    .map(train => {
      const line = lines.find(line =>
        train.estimates.every(({ station }) =>
          line.stations.some(id => station === id)
        )
      );

      const [
        { station: currentStation },
        { station: nextStation }
      ] = train.estimates;

      const currentStationIndex = line.stations.indexOf(currentStation);
      const nextStationIndex = line.stations.indexOf(nextStation);

      let previousStationIndex =
        currentStationIndex + (currentStationIndex < nextStationIndex ? -1 : 1);
      if (previousStationIndex < 1) previousStationIndex *= -1;
      if (previousStationIndex >= line.stations.length - 1)
        previousStationIndex -= 2;

      const previousStation = line.stations[previousStationIndex];

      const betweenStations = [previousStation, currentStation];

      const nextEstimation = train.estimates[0];

      const timeBetweenStations = 120;

      const progress = limitValue(
        (nextEstimation.time - new Date()) / 1000 / timeBetweenStations,
        1,
        0
      );

      return {
        ...train,
        line: line.id,
        position: {
          stations: betweenStations,
          progress
        }
      };
    })
    .map(train => {
      return {
        ...train
      };
    });
};
