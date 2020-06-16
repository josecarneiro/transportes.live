import { RealtimeDatabaseService } from '@/services/realtime-database';
import loadData from '@/services/load-data';
import {
  deserializeStationOccupancy,
  deserializeStation
} from './deserializers';

import giraStations from '@/../public/built/gira/station/list.json';

class StationSingleOccupancyService extends RealtimeDatabaseService {
  constructor(handler) {
    super('/gira/stations', handler);
  }
}

class StationOccupancyService extends StationSingleOccupancyService {
  parse(vehicles) {
    return Object.fromEntries(
      Object.entries(vehicles).map(([key, station]) => [
        key,
        deserializeStationOccupancy(station)
      ])
    );
  }
}

const loadStation = async id => {
  const stationOccupancy = new StationSingleOccupancyService();
  const [station, occupancy] = await Promise.all([
    loadData(`/built/gira/station/${id}.json`),
    stationOccupancy.load(id)
  ]);
  return {
    ...deserializeStation(station),
    ...deserializeStationOccupancy(occupancy)
  };
};

const listStations = async () =>
  Object.fromEntries(
    Object.entries(giraStations).map(([key, [latitude, longitude]]) => [
      key,
      { position: { latitude, longitude } }
    ])
  );

export { StationOccupancyService, listStations, loadStation };
