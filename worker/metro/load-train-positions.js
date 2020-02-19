const { log, write } = require('transportes/metro/utilities');
const extractTrainLocations = require('./extract-train-location');
const lines = require('transportes/metro/data/lines');
const stations = require('transportes/metro/data/stations');

const Metro = require('transportes/metro');

const KEY = 'ba1a551e-e324-32d1-9194-aa31bbf32fcc';

const config = require('config');

const { apiKey } = config.metro;

const client = new Metro({ key: KEY });

const loadTrainPositions = async () => {
  const times = await client.loadWaitTimes();
  // log(times);
  const trains = extractTrainLocations(times);
  return trains;
};

module.exports = loadTrainPositions;

// (async () => {
//   const trains = await loadTrainPositions();
//   log(trains);
//   write('positions.json', trains);
// })();
