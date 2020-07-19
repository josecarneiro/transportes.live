'use strict';

module.exports = (key = 'id') => (acc, { [key]: id, ...value }) => ({
  ...acc,
  [id]: value
});
