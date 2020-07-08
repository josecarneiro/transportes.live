'use strict';

const delay = require('./delay');

const loop = async (callback, interval) => {
  await callback();
  await delay(interval);
  return loop(callback, interval);
};

module.exports = loop;
