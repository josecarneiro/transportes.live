'use strict';

const path = require('path');

const writeFile = require('./../worker/helpers/write-file');
const transformToJSONObject = require('./../worker/helpers/transform-to-json-object');

const stops = require('transportes-bundled-data/dist/carris/stops/list');
const routes = require('transportes-bundled-data/dist/carris/routes/all');
const stations = require('transportes-bundled-data/dist/metro/stations/list');
const lines = require('transportes/metro/data/lines');
const giraStations = require('transportes-bundled-data/dist/gira/stations/list');

const DIRECTORY = path.join(__dirname, 'public/built');
const CARRIS_STOP_DIRECTORY = path.join(DIRECTORY, 'carris/stop');
const CARRIS_ROUTE_DIRECTORY = path.join(DIRECTORY, 'carris/route');
const METRO_DIRECTORY = path.join(DIRECTORY, 'metro');
const METRO_STATIONS_DIRECTORY = path.join(DIRECTORY, 'metro/station');
const GIRA_STATION_DIRECTORY = path.join(DIRECTORY, 'gira/station');

// Carris

const buildCarrisSingleStop = async stop => {
  const { publicId: id } = stop;
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

const buildCarrisStops = async stops => {
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

const buildCarrisSingleRoute = async route => {
  const { number } = route;
  await writeFile(CARRIS_ROUTE_DIRECTORY, number, transformToJSONObject(route));
};

const buildCarrisRoutes = async routes => {
  const routesData = routes.reduce(
    (acc, { number: id, name }) => ({ ...acc, [id]: name }),
    {}
  );
  const data = transformToJSONObject(routesData);
  await writeFile(CARRIS_ROUTE_DIRECTORY, 'list', data);
};

// Metro

const buildMetroStationsAndLines = async stations => {
  const stationData = stations
    .map(({ id, name, position: { latitude, longitude } }) => [
      id,
      [latitude, longitude, name]
    ])
    .reduce((acc, [id, value]) => ({ ...acc, [id]: value }), {});
  const lineData = lines.reduce(
    (acc, { id, stations }) => ({ ...acc, [id]: stations }),
    {}
  );
  const data = transformToJSONObject({
    stations: stationData,
    lines: lineData
  });
  await writeFile(METRO_DIRECTORY, 'data', data);
};

const buildMetroSingleStation = async ({ id, name, platforms }) => {
  const stationData = {
    n: name,
    f: platforms.reduce(
      (acc, { id, destination }) => ({ ...acc, [id]: destination }),
      {}
    )
  };
  const data = transformToJSONObject(stationData);
  await writeFile(METRO_STATIONS_DIRECTORY, id, data);
};

// Gira

const buildGiraStations = async stations => {
  const stationsData = stations
    .map(({ id, position: { latitude, longitude } }) => ({
      id,
      position: [latitude, longitude]
    }))
    .reduce((acc, { id, position }) => ({ ...acc, [id]: position }), {});
  const data = transformToJSONObject(stationsData);
  await writeFile(GIRA_STATION_DIRECTORY, 'list', data);
};

const buildGiraSingleStation = async ({ id, name, type }) => {
  const stationData = {
    n: name,
    t: type
  };
  const data = transformToJSONObject(stationData);
  await writeFile(GIRA_STATION_DIRECTORY, id, data);
};

// Run all

(async () => {
  await buildCarrisStops(stops);
  for (const stop of stops) {
    await buildCarrisSingleStop(stop);
  }
  await buildCarrisRoutes(routes);
  for (const route of routes) {
    await buildCarrisSingleRoute(route);
  }
  await buildMetroStationsAndLines(stations);
  for (const station of stations) {
    await buildMetroSingleStation(station);
  }
  await buildGiraStations(giraStations);
  for (const station of giraStations) {
    await buildGiraSingleStation(station);
  }
})();
