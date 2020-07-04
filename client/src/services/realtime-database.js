import { firebase } from '@firebase/app';
import '@firebase/database';

import { firebase as firebaseConfiguration } from './../config';

const app = firebase.initializeApp(firebaseConfiguration);
const database = app.database();

class GenericDatabaseService {
  constructor(path) {
    this.database = database;
    this.reference = this.database.ref(path);
  }

  parse(data) {
    return data;
  }
}

class DatabaseService extends GenericDatabaseService {
  async load(id) {
    const reference = id ? this.reference.child(id) : this.reference;
    const snapshot = await reference.once('value');
    const data = snapshot.val();
    if (data) return this.parse(data);
  }
}

class RealtimeDatabaseService extends DatabaseService {
  constructor(path, handler) {
    super(path);
    this.handler = handler;
    this.callback = this.callback.bind(this);
  }

  callback(snapshot) {
    const data = snapshot.val();
    if (data) {
      const parsed = this.parse(data);
      this.handler(parsed);
    }
  }

  listen() {
    this.reference.on('value', this.callback);
  }

  destroy() {
    this.reference.off('value', this.callback);
  }
}

export { DatabaseService, RealtimeDatabaseService };
