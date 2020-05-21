// import database from './realtime-database';

// const parse = object =>
//   Object.entries(object).map(([id, value]) => ({ id, ...value }));

// const listenToPositionUpdates = callback => {
//   const reference = database.ref('/carris/vehicles');
//   const handleValue = snapshot => {
//     const state = snapshot.val();
//     const parsed = parse(state);
//     callback(parsed);
//   };
//   reference.on('value', handleValue);
// };

// export { listenToPositionUpdates };

import { RealtimeDataService } from './realtime-database';

class VehiclePositionService extends RealtimeDataService {
  constructor(...props) {
    super(...props);
    this.reference = this.database.ref('/carris/positions');
    this.listen();
  }
}

class VehicleDetailService extends RealtimeDataService {
  constructor(id, ...props) {
    super(...props);
    this.reference = this.database.ref(`/carris/vehicles/${id}`);
  }
}

class RouteService extends RealtimeDataService {
  constructor(id, ...props) {
    super(...props);
    this.reference = this.database.ref(`/carris/routes/${id}`);
  }
}

class StopService extends RealtimeDataService {
  constructor(id, ...props) {
    super(...props);
    this.reference = this.database.ref(`/carris/stops/${id}`);
  }
}

class EstimatesService extends RealtimeDataService {
  constructor(id, ...props) {
    super(...props);
    this.reference = this.database.ref(`/carris/estimates/${id}`);
  }
}

export {
  VehiclePositionService,
  VehicleDetailService,
  RouteService,
  StopService,
  EstimatesService
};
