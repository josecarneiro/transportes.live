import metroData from '@/../public/built/metro/data';
import lineNameMap from './line-names';

const lines = Object.entries(metroData.lines).map(([id, stations]) => ({
  id,
  name: lineNameMap[id],
  stations
  // stations: stationIds.map(id => {
  //   const [latitude, longitude] = metroData.stations[id];
  //   return { id, position: { latitude, longitude } };
  // })
}));

export default lines;
