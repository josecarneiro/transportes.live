'use strict';

const client = require('./client');

module.exports = async () => {
  try {
    const rawEstimates = await client.listEstimates();
    return rawEstimates;
  } catch (error) {
    const { message } = error;
    if (message === 'Circulação encerrada' || message === 'OUT_OF_SERVICE') {
      return [];
    }
    throw error;
  }
};
