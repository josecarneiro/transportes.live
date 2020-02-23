const { log, write } = require('transportes/metro/utilities');

const client = require('./client');

const loadTrainPositions = async () => {
  const vehicles = await client.listVehicles();
  // log(vehicles);
  // const trains = extractTrainLocations(times);
  return vehicles;
};

module.exports = loadTrainPositions;

// (async () => {
//   const trains = await loadTrainPositions();
//   log(trains);
//   write('positions.json', trains);
// })();
