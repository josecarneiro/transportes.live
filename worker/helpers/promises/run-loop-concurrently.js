'use strict';

const loop = require('./loop');
const delay = require('./delay');
const runConcurrently = require('./run-concurrently');

const runLoopConcurrently = async (
  promiseCreator,
  concurrency = 1,
  { delay: loopDelay = 0 } = {}
) =>
  runConcurrently(async () => {
    if (loopDelay) await delay(loopDelay * Math.random());
    return loop(promiseCreator, loopDelay);
  }, concurrency);

module.exports = runLoopConcurrently;
