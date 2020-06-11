'use strict';

const database = require('./../../firebase');
const client = require('./../client');

const transformToJSONObject = require('./../../helpers/transform-to-json-object');
const delay = require('./../../helpers/delay');

const updateFirebaseCarrisStops = async () => {
  const routes = await client.listRoutes();
  const parsed = routes.reduce(
    (acc, { number, ...value }) => ({ ...acc, [number]: value }),
    {}
  );
  // Is currently replacing every existing route with simplified route,
  // having the option to deep merge would solve this
  const carrisRoutesReference = database.ref('carris/routes');
  carrisRoutesReference.set(transformToJSONObject(parsed));

  // Randomized order of route loading
  for (const item of [...routes].sort(() => 0.5 - Math.random())) {
    const route = await client.loadRoute(item.number);
    if (route) {
      const routeData = transformToJSONObject(route, [
        'shape',
        'order',
        'creationDate',
        'updateDate'
      ]);
      const carrisRouteReference = database.ref('carris/routes/' + item.number);
      carrisRouteReference.set(routeData);
    }
    await delay(1000);
  }
};

module.exports = updateFirebaseCarrisStops;
