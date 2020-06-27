import stations from './stations';

const stationNames = Object.fromEntries(
  stations.map(({ id, name }) => [id, name])
);

export default stationNames;
