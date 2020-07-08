'use strict';

const loop = require('./../helpers/promises/loop');
const runLoopConcurrently = require('./../helpers/promises/run-loop-concurrently');

const delayPromiseCreator = async () => {
  console.log('Created promise');
  return Promise.resolve();
  // return Promise.reject();
  // if (Math.random() < 0.3) {
  //   return Promise.reject();
  // } else {
  //   return Promise.resolve();
  // }
};

runLoopConcurrently(delayPromiseCreator, 2, { delay: 2000 });
