'use strict';

const dotenv = require('dotenv');
dotenv.config();

const updateIntervals = require('./config/intervals');

const runCarris = require('./carris/run');
const runMetro = require('./metro/run');
const runGira = require('./gira/run');

runCarris(updateIntervals.carris);
runMetro(updateIntervals.metro);
runGira(updateIntervals.gira);
