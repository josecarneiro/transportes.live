'use strict';

const dotenv = require('dotenv');
dotenv.config();

const runCarris = require('./carris/run');
const runMetro = require('./metro/run');
const runGira = require('./gira/run');

// runCarris();
runMetro();
// runGira();
