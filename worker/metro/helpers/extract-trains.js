'use strict';

module.exports = platforms => {
  const trains = [];
  for (const {
    station,
    platform,
    destination,
    arrivals,
    time: dataTime
  } of platforms) {
    for (const { train, time } of arrivals) {
      const estimate = {
        station,
        platform,
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
