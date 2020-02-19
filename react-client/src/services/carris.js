import database from './realtime-database';

const parse = object => Object.entries(object).map(([id, value]) => ({ id, ...value }));

const listenToPositionUpdates = callback => {
  let reference = database.ref('/carris/vehicles');
  reference.on('value', snapshot => {
    const state = snapshot.val();
    const parsed = parse(state);
    callback(parsed);
  });
};

export { listenToPositionUpdates };
