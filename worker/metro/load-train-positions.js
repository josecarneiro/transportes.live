// const { log, write } = require('transportes/utilities');
const extractTrainLocations = require('./location/extract');
const lines = require('transportes/metro/data/lines');
const stations = require('transportes/metro/data/stations');

const client = require('./client');

const loadTrainPositions = async () => {
  const times = await client.loadEstimates();
  // write(require('path').join(__dirname, 'train-location.json'), times);
  // log(times);
  return extractTrainLocations(times);
};

module.exports = loadTrainPositions;
