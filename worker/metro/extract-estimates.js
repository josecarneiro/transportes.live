'use strict';

module.exports = estimates =>
  estimates.reduce((accumulator, { station, ...value }) => ({
    ...accumulator,
    [station]: [...(accumulator[station] || []), value]
  }));
