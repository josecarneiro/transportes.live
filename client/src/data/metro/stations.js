import lines from './lines';

const metroStations = lines
  .map(({ stations }) => stations)
  .reduce((acc, value) => [...acc, ...value], []);

export default metroStations;
