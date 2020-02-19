import Firebase from 'firebase';
import { firebaseConfiguration } from './../config';

const app = Firebase.initializeApp(firebaseConfiguration);

const database = app.database();

export default database;
