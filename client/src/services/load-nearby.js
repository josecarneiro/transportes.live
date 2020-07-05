import stops from '@/providers/carris/data/stops';
import stations from '@/providers/metro/data/stations';

import calculateDistance from '@/util/calculate-distance';

const loadNearestGeneric = (data, position, { maximumDistance, limit }) => {
  const nearest = data
    .map(station => ({
      ...station,
      distance: calculateDistance(position, station.position)
    }))
    .filter(({ distance }) => distance < maximumDistance);
  nearest.sort(({ distance: a }, { distance: b }) => a - b);
  nearest.splice(0, nearest.length - limit);
  return nearest;
};

export default async (position, { maximumDistance = 1500, limit = 5 } = {}) => {
  const nearestStations = loadNearestGeneric(stations, position, {
    maximumDistance,
    limit
  });
  const nearestStops = loadNearestGeneric(stops, position, {
    maximumDistance,
    limit
  });
  const nearby = [];
  for (let item of nearestStations)
    nearby.push({ type: 'metro', details: item });
  for (let item of nearestStops) nearby.push({ type: 'carris', details: item });
  return nearby;
};
