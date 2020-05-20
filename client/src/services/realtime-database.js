import { firebase } from '@firebase/app';
import '@firebase/database';

import { firebaseConfiguration } from './../config';

const app = firebase.initializeApp(firebaseConfiguration);

const database = app.database();

export default database;

class RealtimeDataService {
  constructor(handler) {
    this.handler = handler;
    this.database = database;
    this.callback = this.callback.bind(this);
  }

  static parse(data) {
    return Object.entries(data).map(([id, value]) => ({ id, ...value }));
  }

  _parse(data) {
    return data;
    // console.log(data);
    // return Object.entries(data).map(([id, value]) => ({ id, ...value }));
  }

  callback(snapshot) {
    const state = snapshot.val();
    const parsed = this._parse(state);
    this.handler(parsed);
  }

  async load(id) {
    const snapshot = await this.reference.once('value');
    const state = snapshot.val();
    const parsed = this._parse(state);
    return parsed;
  }

  listen() {
    this.reference.on('value', this.callback);
  }

  destroy() {
    this.reference.off('value', this.callback);
  }
}

export { RealtimeDataService };
