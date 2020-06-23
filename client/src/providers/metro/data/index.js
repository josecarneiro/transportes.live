import metroData from '@/../public/built/metro/data';

const stations = Object.entries(metroData.stations).map(
  ([id, [latitude, longitude, name]]) => ({
    id,
    name,
    position: { latitude, longitude }
  })
);

export { stations };
export { default as lines } from './lines';
