'use strict';

const fs = require('fs');
const path = require('path');

const writeFile = require('./worker/helpers/write-file');

const listStops = require('./worker/carris/services/list-stops');
const loadSingleStop = require('./worker/carris/services/load-single-stop');
const client = require('./worker/carris/client');

const transformToJSONObject = require('./worker/helpers/transform-to-json-object');

const DIRECTORY = __dirname + '/client/public/built';

const buildCarrisStops = async () => {
  const stops = await listStops();

  const stopPositions = stops
    .filter(({ visible }) => visible)
    .map(({ publicId: id, position: { latitude, longitude } }) => ({
      id,
      position: [latitude, longitude]
    }))
    .reduce((acc, { id, position }) => ({ ...acc, [id]: position }), {});

  const data = transformToJSONObject(stopPositions);

  await writeFile(DIRECTORY, 'stop-list', data);

  return stops;
};

const buildCarrisSingleStop = async id => {
  const stop = await loadSingleStop(id);

  const data = transformToJSONObject(stop);

  await writeFile(DIRECTORY, `stop-${id}`, data);

  return stop;

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

const delay = duration =>
  new Promise((resolve, reject) => setTimeout(resolve, duration));

const cleanStops = async () => {
  const base = path.join(DIRECTORY, 'stop');
  const files = await fs.promises.readdir(base);
  const stopsWithNoRoutes = [];
  const invisibleStops = [];
  for (let file of files) {
    const filePath = path.join(base, file);
    const contents = require(filePath);
    if (!contents.routes.length) stopsWithNoRoutes.push(contents.publicId);
    if (!contents.visible) invisibleStops.push(contents.publicId);
  }
  const stopListPath = path.join(DIRECTORY, 'stop-list.json');
  const stops = require(stopListPath);
  const filteredStops = Object.fromEntries(
    Object.entries(stops).filter(
      ([id]) => !stopsWithNoRoutes.includes(id) && !invisibleStops.includes(id)
    )
  );
  await writeFile(DIRECTORY, 'stop-list', filteredStops);
};

(async () => {
  await cleanStops();
  const stops = await buildCarrisStops();
  stops.sort(() => 0.5 - Math.random());
  for (let stop of stops) {
    const id = stop.publicId;
    const routes = await client.listRoutes({ stop: id });
    const routeIds = routes.map(({ number: id }) => id);
    const data = { ...stop, routes: routeIds };
    await writeFile(DIRECTORY + '/stop', `${id}`, data, { pretty: true });
    await delay(200);
  }
})();
