'use strict';

const delay = (duration = 0) =>
  new Promise((resolve, reject) => setTimeout(resolve, duration));

module.exports = delay;
