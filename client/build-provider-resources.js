'use strict';

const path = require('path');

const writeFile = require('./../worker/helpers/write-file');
const transformToJSONObject = require('./../worker/helpers/transform-to-json-object');

const stops = require('transportes-bundled-data/dist/carris/stops/list');
const routes = require('transportes-bundled-data/dist/carris/routes/all');

const DIRECTORY = path.join(__dirname, 'public/built');
const CARRIS_STOP_DIRECTORY = path.join(DIRECTORY, 'carris/stop');
const CARRIS_ROUTE_DIRECTORY = path.join(DIRECTORY, 'carris/route');

const buildCarrisSingleStop = async id => {
  const stop = await stops.find(({ publicId }) => publicId === id);

  const data = transformToJSONObject(stop);

  await writeFile(CARRIS_STOP_DIRECTORY, id, data);

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

const buildCarrisStops = async () => {
  const stopPositions = stops
    .filter(({ visible }) => visible)
    .map(({ publicId: id, position: { latitude, longitude } }) => ({
      id,
      position: [latitude, longitude]
    }))
    .reduce((acc, { id, position }) => ({ ...acc, [id]: position }), {});

  const data = transformToJSONObject(stopPositions);

  await writeFile(CARRIS_STOP_DIRECTORY, 'list', data);
};

const buildCarrisSingleRoute = async id => {
  const route = await routes.find(({ number }) => number === id);

  await writeFile(CARRIS_ROUTE_DIRECTORY, id, transformToJSONObject(route));
};

// const cleanStops = async () => {
//   const base = path.join(DIRECTORY, 'stop');
//   const files = await fs.promises.readdir(base);
//   const stopsWithNoRoutes = [];
//   const invisibleStops = [];
//   for (const file of files) {
//     const filePath = path.join(base, file);
//     const contents = require(filePath);
//     if (!contents.routes.length) stopsWithNoRoutes.push(contents.publicId);
//     if (!contents.visible) invisibleStops.push(contents.publicId);
//   }
//   // const stopListPath = path.join(DIRECTORY, 'stop-list.json');
//   // const stops = require(stopListPath);
//   const filteredStops = Object.fromEntries(
//     Object.entries(stops).filter(
//       ([id]) => !stopsWithNoRoutes.includes(id) && !invisibleStops.includes(id)
//     )
//   );
//   await writeFile(DIRECTORY, 'stop-list', filteredStops);
// };

(async () => {
  console.log('Copying provider static data...');
  await buildCarrisStops();
  for (const stop of stops) {
    await buildCarrisSingleStop(stop.publicId);
  }
  for (const route of routes) {
    await buildCarrisSingleRoute(route.number);
  }
  // await cleanStops();
  // stops.sort(() => 0.5 - Math.random());
  // for (let stop of stops) {
  //   const id = stop.publicId;
  //   const routes = await client.listRoutes({ stop: id });
  //   const routeIds = routes.map(({ number: id }) => id);
  //   const data = { ...stop, routes: routeIds };
  //   await writeFile(DIRECTORY + '/stop', `${id}`, data, { pretty: true });
  //   await delay(200);
  // }
  console.log('Provider static data copy complete!');
})();
