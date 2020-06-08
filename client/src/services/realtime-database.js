import { firebase } from '@firebase/app';
import '@firebase/database';

import { firebaseConfiguration } from './../config';

const app = firebase.initializeApp(firebaseConfiguration);
const database = app.database();

class GenericDatabaseService {
  constructor(path) {
    this.database = database;
    this.reference = this.database.ref(path);
  }

  static parse(data) {
    return Object.entries(data).map(([id, value]) => ({ id, ...value }));
  }

  parse(data) {
    return data;
  }

  _parse(snapshot) {
    const data = snapshot.val();
    return data;
  }
}

class DatabaseService extends GenericDatabaseService {
  async load(id) {
    const reference = id ? this.reference.child(id) : this.reference;
    const snapshot = await reference.once('value');
    return this._parse(snapshot);
  }
}

class RealtimeDatabaseService extends DatabaseService {
  constructor(path, handler) {
    super(path);
    this.handler = handler;
    this.callback = this.callback.bind(this);
  }

  callback(snapshot) {
    this.handler(this.parse(this._parse(snapshot)));
  }

  listen() {
    this.reference.on('value', this.callback);
  }

  destroy() {
    this.reference.off('value', this.callback);
  }
}

export { DatabaseService, RealtimeDatabaseService };
