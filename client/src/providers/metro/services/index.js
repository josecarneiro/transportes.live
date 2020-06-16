import { RealtimeDatabaseService } from '@/services/realtime-database';
import loadData from '@/services/load-data';

import metroData from '@/../public/built/metro/data';

class TrainPositionService extends RealtimeDatabaseService {
  constructor(handler) {
    super('/metro/position', handler);
  }
}

const deserializeArrival = ({ i: train, t: time }) => ({
  train,
  time: new Date(time * 1000)
});

const deserializeEstimates = estimates =>
  Object.fromEntries(
    Object.entries(estimates).map(([platform, arrivals]) => [
      platform,
      arrivals.map(deserializeArrival)
    ])
  );

class StationEstimatesService extends RealtimeDatabaseService {
  constructor(id, handler) {
    super(`/metro/stations/${id.toUpperCase()}`, handler);
  }

  parse(data) {
    if (!data) return data;
    return deserializeEstimates(data);
  }
}

const loadInfrastructure = async () => {
  // const { lines, stations } = await loadData('/built/metro/data.json');
  const { lines, stations } = metroData;
  return {
    lines: Object.entries(lines).map(([id, stationIds]) => ({
      id,
      stations: stationIds.map(id => {
        const [latitude, longitude] = stations[id];
        return { id, position: { latitude, longitude } };
      })
    })),
    stations: Object.entries(stations).map(
      ([id, [latitude, longitude, name]]) => ({
        id,
        name,
        position: { latitude, longitude }
      })
    )
  };
};

const loadStationDetails = async id => {
  const station = await loadData(`/built/metro/station/${id}.json`);
  return {
    id,
    name: station.n,
    platforms: station.f
    // platforms: Object.entries(station.f).map(([id, direction]) => ({
    //   id,
    //   direction
    // }))
    // platforms: Object.entries(station.f).map(([id, direction]) => ({
    //   id,
    //   direction
    // }))
  };
};

export {
  TrainPositionService,
  StationEstimatesService,
  loadInfrastructure,
  loadStationDetails
};
