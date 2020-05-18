const { log, write } = require('transportes/utilities');
const extractTrainLocations = require('./extract');
const estimates = require('./estimates.data.spec.json');

const prepareJSON = object => {
  return JSON.parse(JSON.stringify(object), (key, value) => {
    if (key.toLowerCase().includes('time') || key.toLowerCase().includes('date')) {
      return new Date(value);
    } else {
      return value;
    }
  });
};

const preparedEstimates = prepareJSON(estimates);

const resolve = path => require('path').join(__dirname, path);

// console.log(preparedEstimates);

describe('Metro', () => {
  describe('extract position', () => {
    it('should load station wait times', async () => {
      log(
        preparedEstimates
          .map(({ station, pier }) => [station, pier])
          .reduce(
            (acc, [station, pier]) => ({
              ...acc,
              [station]: [...(acc[station] || []), pier]
            }),
            {}
          )
      );

      const positions = extractTrainLocations(preparedEstimates);

      write(resolve('tmp/train-estimations.json'), preparedEstimates);
      write(resolve('tmp/train-location.json'), positions);

      // log(positions);
    });
  });
});
