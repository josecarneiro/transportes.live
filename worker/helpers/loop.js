'use strict';

const delay = require('./delay');

const loop = async (callback, interval) => {
  await callback();
  await delay(interval);
  loop(callback, interval);
};

module.exports = loop;
