'use strict';

module.exports = duration =>
  new Promise((resolve, reject) => setTimeout(resolve, duration));
