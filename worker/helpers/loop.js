'use strict';

const loop = (callback, delay) =>
  setTimeout(() => {
    callback();
    loop(callback, delay);
  }, delay);

module.exports = loop;
