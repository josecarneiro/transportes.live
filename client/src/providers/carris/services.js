import {
  RealtimeDatabaseService,
  DatabaseService
} from '@/services/realtime-database';

class VehiclePositionService extends RealtimeDatabaseService {
  constructor(handler) {
    super('/carris/positions', handler);
  }
}

class VehicleDetailService extends DatabaseService {
  constructor() {
    super(`/carris/vehicles`);
  }
}

class EstimatesService extends DatabaseService {
  constructor() {
    super(`/carris/estimates`);
  }
}

const routeService = new DatabaseService('/carris/routes');
const loadRoute = (id) => routeService.load(id);

// const stopPositionService = new DatabaseService('/carris/stop-positions');
// const listStops = () => stopPositionService.load();

const listStops = async () => {
  const response = await fetch('/built/stop-list.json');
  const data = await response.json();
  return Object.fromEntries(
    Object.entries(data).map(([key, [lat, lng]]) => [key, { lat, lng }])
  );
};

const stopService = new DatabaseService('/carris/stop-positions');
const loadStop = (id) => stopService.load(`/carris/stops/${id}`);

export {
  VehiclePositionService,
  VehicleDetailService,
  EstimatesService,
  listStops,
  loadRoute,
  loadStop
};
