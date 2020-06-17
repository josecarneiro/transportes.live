'use strict';

module.exports = (acc, { id, ...value }) => ({
  ...acc,
  [id]: value
});
