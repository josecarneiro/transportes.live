'use strict';

const database = require('./../../firebase');

const loadRoutes = require('./../services/load-routes');
const loadSingleRoute = require('./../services/load-single-route');

const transformToJSONObject = require('./../../helpers/transform-to-json-object');
const delay = require('./../../helpers/delay');

// const convertArrayOfDocumentsToObject = items => items.reduce((acc, { id, ...value }) => ({ ...acc, [id]: value }), {});

const updateFirebaseCarrisStops = async () => {
  const routes = await loadRoutes();
  const parsed = routes.reduce(
    (acc, { number, ...value }) => ({ ...acc, [number]: value }),
    {}
  );
  // Is currently replacing every existing route with simplified route,
  // having the option to deep merge would solve this
  const carrisRoutesReference = database.ref('carris/routes');
  carrisRoutesReference.set(transformToJSONObject(parsed));
  // Randomized order of route loading
  for (let item of [...routes].sort(() => 0.5 - Math.random())) {
    const route = await loadSingleRoute(item.number);
    if (route) {
      const carrisRouteReference = database.ref('carris/routes/' + item.number);
      carrisRouteReference.set(
        transformToJSONObject(route, [
          'shape',
          'order',
          'creationDate',
          'updateDate'
        ])
      );
    }
    await delay(1000);
  }
};

module.exports = updateFirebaseCarrisStops;
