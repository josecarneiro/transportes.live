import { RealtimeDatabaseService } from '@/services/realtime-database';
import loadData from '@/services/load-data';

import * as metroData from '@/data/metro';

const deserializeDate = timestamp => new Date(timestamp * 1000);

const deserializeLocation = ({ s: station, t: time }) => ({
  station,
  time: deserializeDate(time)
});

class TrainPositionService extends RealtimeDatabaseService {
  constructor(handler) {
    super('/metro/position', handler);
  }

  parse(data) {
    if (!data) return data;
    return Object.fromEntries(
      Object.entries(data).map(([train, { l: location }]) => [
        train,
        location.map(deserializeLocation)
      ])
    );
  }
}

const deserializeArrival = ({ i: train, t: time }) => ({
  train,
  time: deserializeDate(time)
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
  const { lines, stations } = metroData;
  return {
    lines: lines.map(({ stations: stationIds, ...line }) => ({
      ...line,
      stations: stationIds.map(id =>
        stations.find(station => id === station.id)
      )
    })),
    stations
  };
};

const loadStationDetails = async id => {
  const station = await loadData(`/built/metro/station/${id}.json`);
  const { n: name, f: platforms } = station;
  return {
    id,
    name,
    platforms
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
