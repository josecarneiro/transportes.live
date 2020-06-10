import {
  RealtimeDatabaseService,
  DatabaseService
} from '@/services/realtime-database';

const parseStation = ({
  n: name,
  a: active,
  b: bikes,
  d: docks,
  p: [latitude, longitude]
}) => ({
  name,
  active,
  bikes,
  docks,
  ratio: bikes / docks,
  position: { latitude, longitude }
});

class StationService extends RealtimeDatabaseService {
  constructor(handler) {
    super('/gira/stations', handler);
  }

  parse(vehicles) {
    return Object.fromEntries(
      Object.entries(vehicles).map(([key, station]) => [
        key,
        parseStation(station)
      ])
    );
  }
}

class StationDetailService extends DatabaseService {
  constructor() {
    super(`/gira/stations`);
  }
}

const stationDetail = new StationDetailService();

const loadStation = async id => parseStation(await stationDetail.load(id));

export { StationService, loadStation };
