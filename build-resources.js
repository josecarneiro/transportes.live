'use strict';

// const database = require('./worker/firebase');

const { write } = require('transportes/utilities');

const loadStops = require('./worker/carris/services/load-stops');

const transformToJSONObject = require('./worker/helpers/transform-to-json-object');

const buildCarrisStops = async () => {
  const stops = await loadStops();

  const stopPositions = stops
    .filter(({ visible }) => visible)
    .map(({ publicId: id, name, position }) => ({ id, name, position }))
    .map(({ id, name: name, position: { latitude, longitude } }) => ({
      id,
      position: [latitude, longitude]
    }))
    .reduce((acc, { id, position }) => ({ ...acc, [id]: position }), {});

  const data = transformToJSONObject(stopPositions);

  const path = require('path');

  write(path.join(__dirname, 'client/src/built', 'stops.json'), data);

  // const stopPositions = stops
  //   .filter(({ visible }) => visible)
  //   .map(({ publicId: id, position: { latitude, longitude } }) => ({
  //     id,
  //     position: [latitude, longitude]
  //   }))
  //   .reduce((acc, { id, position }) => ({ ...acc, [id]: position }), {});
  // const carrisStopPositionsReference = database.ref('carris/stop-positions');
  // carrisStopPositionsReference.set(transformToJSONObject(stopPositions));
};

(async () => {
  const stops = await buildCarrisStops();
})();
