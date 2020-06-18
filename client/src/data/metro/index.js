import metroData from '@/../public/built/metro/data';

const stations = Object.entries(metroData.stations).map(
  ([id, [latitude, longitude, name]]) => ({
    id,
    name,
    position: { latitude, longitude }
  })
);

const lineNameMap = {
  azul: 'Azul',
  amarela: 'Amarela',
  vermelha: 'Vermelha',
  verde: 'Verde'
};

const lines = Object.entries(metroData.lines).map(([id, stations]) => ({
  id,
  name: lineNameMap[id],
  stations
  // stations: stationIds.map(id => {
  //   const [latitude, longitude] = metroData.stations[id];
  //   return { id, position: { latitude, longitude } };
  // })
}));

export { stations, lines };
