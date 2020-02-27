const { log, write } = require('transportes/utilities');
const extractTrainLocations = require('./extract-train-location');
const lines = require('transportes/metro/data/lines');
const stations = require('transportes/metro/data/stations');

const client = require('./client');

const loadTrainPositions = async () => {
  const times = await client.loadEstimates();
  // log(times);
  return extractTrainLocations(times);
};

module.exports = loadTrainPositions;
