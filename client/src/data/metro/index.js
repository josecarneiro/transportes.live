import metroData from '@/../public/built/metro/data';

const stations = Object.entries(metroData.stations).map(
  ([id, [latitude, longitude, name]]) => ({
    id,
    name,
    position: { latitude, longitude }
  })
);

const lines = Object.entries(metroData.lines).map(([id, stationIds]) => ({
  id,
  stations: stationIds.map(id => {
    const [latitude, longitude] = metroData.stations[id];
    return { id, position: { latitude, longitude } };
  })
}));

export { stations, lines };
