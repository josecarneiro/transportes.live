import { RealtimeDatabaseService } from '@/services/realtime-database';

class TrainPositionService extends RealtimeDatabaseService {
  constructor(handler) {
    super('/metro/position', handler);
  }
}

class StationDetailService extends RealtimeDatabaseService {
  constructor(id, handler) {
    super('/metro/stations/' + id, handler);
  }
}

export { TrainPositionService, StationDetailService };
