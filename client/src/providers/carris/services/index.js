import {
  RealtimeDatabaseService,
  DatabaseService
} from '@/services/realtime-database';
import loadData from '@/services/load-data';
import { deserializeEstimate, deserializeVehicle } from './deserializers';

class VehiclePositionService extends RealtimeDatabaseService {
  constructor(handler) {
    super('/carris/positions', handler);
  }

  parse(vehicles) {
    return Object.fromEntries(
      Object.entries(vehicles).map(
        ([
          key,
          {
            r: route,
            a: angle,
            p: [latitude, longitude]
          }
        ]) => [key, { route, angle, position: { latitude, longitude } }]
      )
    );
  }
}

class VehicleDetailService extends DatabaseService {
  constructor() {
    super(`/carris/vehicles`);
  }

  parse(vehicle) {
    if (!vehicle) return vehicle;
    return deserializeVehicle(vehicle);
  }
}
class EstimatesService extends DatabaseService {
  constructor() {
    super(`/carris/estimates`);
  }

  parse(estimates) {
    if (!estimates) return estimates;
    return estimates.map(deserializeEstimate);
  }
}

const loadRoute = async id => {
  const route = await loadData(`/built/carris/route/${id}.json`);
  return route;
};

const listStops = async () => {
  const stops = await loadData('/built/carris/stop/list.json');
  return Object.fromEntries(
    Object.entries(stops).map(([key, [lat, lng]]) => [key, { lat, lng }])
  );
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
