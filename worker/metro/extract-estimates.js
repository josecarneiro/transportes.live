'use strict';

module.exports = estimates => {
  console.log(estimates);
  return estimates.reduce((accumulator, { station, ...value }) => {
    return { ...accumulator, [station]: [...(accumulator[station] || []), value] };
  });
};
