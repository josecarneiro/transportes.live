import { RealtimeDatabaseService, DatabaseService } from './realtime-database';

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

class RouteService extends DatabaseService {
  constructor() {
    super(`/carris/routes`);
  }
}

class StopService extends DatabaseService {
  constructor() {
    super(`/carris/stops`);
  }
}

class StopPositionService extends DatabaseService {
  constructor() {
    super(`/carris/stop-positions`);
  }
}

class EstimatesService extends DatabaseService {
  constructor() {
    super(`/carris/estimates`);
  }
}

export {
  VehiclePositionService,
  VehicleDetailService,
  RouteService,
  StopService,
  StopPositionService,
  EstimatesService
};
