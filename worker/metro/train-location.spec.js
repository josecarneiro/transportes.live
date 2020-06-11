'use strict';

const { log, write } = require('./utilities');

const Metro = require('.');

const KEY = 'ba1a551e-e324-32d1-9194-aa31bbf32fcc';

const client = new Metro({ key: KEY });

const extractTrainLocations = require('./extract-train-location');

const loadLineData = async () => {
  const lines = require('./data/lines');
  const stations = require('./data/stations');
  return lines.map(line => ({
    ...line,
    stations: line.stations.map(id =>
      stations.find(station => id === station.id)
    )
  }));
};

// (async () => {
//   const lineData = await loadLineData();
//   log(lineData);
//   write('line-data.json', lineData);
// })();

(async () => {
  const times = await client.loadWaitTimes();
  // const times = require('./wait-times');
  const trains = extractTrainLocations(times);
  // log(trains);
  write('positions.json', trains);
})();

// describe('Metro', () => {
//   describe('wait times', () => {
//     it('should load station wait times', async () => {
//       const times = await client.loadStationWaitTimes('CU');
//       log(times);
//     });
//   });
// });
