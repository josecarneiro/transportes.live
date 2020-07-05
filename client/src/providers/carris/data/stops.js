import rawStops from '@/../public/built/carris/stop/list';

const stops = Object.entries(rawStops).map(([id, [latitude, longitude]]) => ({
  id,
  position: { latitude, longitude }
}));

export default stops;
