'use strict';

const runConcurrently = async (promiseCreator, concurrency) => {
  const result = await Promise.allSettled(
    [...new Array(concurrency)].fill(null).map(() => promiseCreator())
  );
  return result;
};

module.exports = runConcurrently;
