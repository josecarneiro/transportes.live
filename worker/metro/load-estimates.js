const extractEstimates = require('./extract-estimates');

const client = require('./client');

const loadEstimates = async () => {
  const estimates = await client.loadEstimates();
  return extractEstimates(estimates);
};

module.exports = loadEstimates;
