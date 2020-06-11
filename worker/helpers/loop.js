'use strict';

const loop = (callback, delay) =>
  setTimeout(async () => {
    await callback();
    loop(callback, delay);
  }, delay);

module.exports = loop;
