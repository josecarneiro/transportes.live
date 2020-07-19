'use strict';

const client = require('./../client');
const database = require('./../../firebase');
const arrayToObjectReducerFactory = require('./../../helpers/array-to-object-reducer-factory');
const transformToJSONObject = require('./../../helpers/transform-to-json-object');

const updateFirebaseMetroLineStatus = async () => {
  const rawData = await client.checkLineStatus();
  const data = rawData.reduce(arrayToObjectReducerFactory('line'), {});

  const metroLineStatusReference = database.ref('metro/lines');
  metroLineStatusReference.set(transformToJSONObject(data));
};

module.exports = updateFirebaseMetroLineStatus;
