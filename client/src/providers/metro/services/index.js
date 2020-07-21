import { RealtimeDatabaseService } from '@/services/realtime-database';
import loadData from '@/services/load-data';

import * as metroData from '@/providers/metro/data';

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
    // if (!data) return data;
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

const removeOldEstimates = (estimates, age = 0) =>
  Object.fromEntries(
    Object.entries(estimates).map(([platform, arrivals]) => [
      platform,
      arrivals.filter(({ time }) => time - Date.now() > -1 * age)
    ])
  );

class StationEstimatesService extends RealtimeDatabaseService {
  constructor(id, handler) {
    super(`/metro/stations/${id.toUpperCase()}`, handler);
  }

  parse(rawEstimates) {
    const deserializedValues = deserializeEstimates(rawEstimates);
    const parsedEstimates = removeOldEstimates(
      deserializedValues,
      1 * 60 * 1000
    );
    return parsedEstimates;
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
  const lines = metroData.lines.filter(({ stations }) => stations.includes(id));
  return {
    id,
    name,
    lines: lines.map(({ id }) => id),
    platforms: Object.fromEntries(
      Object.entries(platforms).map(([id, direction]) => [
        id,
        {
          id,
          direction,
          line: lines.find(({ stations }) => stations.includes(direction)).id
        }
      ])
    )
  };
};

export {
  TrainPositionService,
  StationEstimatesService,
  loadInfrastructure,
  loadStationDetails
};
