import {
  RealtimeDatabaseService,
  DatabaseService
} from '@/services/realtime-database';
import loadData from '@/services/load-data';

import {
  deserializeEstimate,
  deserializeVehicle,
  deserializeVehiclePosition
} from './deserializers';

import { stops as carrisStops } from './../data';

class VehiclePositionService extends RealtimeDatabaseService {
  constructor(handler) {
    super('/carris/positions', handler);
  }

  parse(vehicles) {
    return Object.fromEntries(
      Object.entries(vehicles).map(([key, data]) => [
        key,
        deserializeVehiclePosition(data)
      ])
    );
  }
}

class VehicleDetailService extends DatabaseService {
  constructor() {
    super(`/carris/vehicles`);
  }

  parse(vehicle) {
    return deserializeVehicle(vehicle);
  }
}

class EstimatesService extends RealtimeDatabaseService {
  constructor(id, handler) {
    super(`/carris/estimates/${id}`, handler);
  }

  parse(estimates) {
    return estimates.map(deserializeEstimate);
  }
}

const loadRoute = async id => {
  const route = await loadData(`/built/carris/route/${id}.json`);
  return route;
};

const listStops = async () => {
  // const stops = carrisStops.reduce(
  //   (acc, { id, position: { latitude: lat, longitude: lng } }) => ({
  //     ...acc,
  //     [id]: { lat, lng }
  //   }),
  //   {}
  // );
  const stops = Object.fromEntries(
    carrisStops.map(({ id, position: { latitude: lat, longitude: lng } }) => [
      id,
      { lat, lng }
    ])
  );
  return stops;
};

const loadStop = async id => {
  const stop = await loadData(`/built/carris/stop/${id}.json`);
  return stop;
};

export {
  VehiclePositionService,
  VehicleDetailService,
  EstimatesService,
  listStops,
  loadRoute,
  loadStop
};
