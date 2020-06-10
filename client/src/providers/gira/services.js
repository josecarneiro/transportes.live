import {
  RealtimeDatabaseService,
  DatabaseService
} from '@/services/realtime-database';

class StationService extends RealtimeDatabaseService {
  constructor(handler) {
    super('/gira/stations', handler);
  }

  parse(vehicles) {
    return Object.fromEntries(
      Object.entries(vehicles).map(
        ([
          key,
          {
            n: name,
            a: active,
            b: bikes,
            d: docks,
            p: [latitude, longitude]
          }
        ]) => [
          key,
          {
            name,
            active,
            bikes,
            docks,
            ratio: bikes / docks,
            position: { latitude, longitude }
          }
        ]
      )
    );
  }
}

export { StationService };
