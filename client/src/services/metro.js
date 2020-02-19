// import database from './realtime-database';

// const parse = object =>
//   Object.entries(object).map(([id, value]) => ({ id, ...value }));

// const listenToPositionUpdates = callback => {
//   const reference = database.ref('/metro/position');
//   reference.on('value', snapshot => {
//     const state = snapshot.val();
//     const parsed = parse(state);
//     callback(parsed);
//   });
// };

// export { listenToPositionUpdates };

import { RealtimeDataService } from './realtime-database';

class TrainPositionService extends RealtimeDataService {
  constructor(...props) {
    super(...props);
    this.reference = this.database.ref('/metro/position');
    this.listen();
  }
}

export { TrainPositionService };
