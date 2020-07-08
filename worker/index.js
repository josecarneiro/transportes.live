'use strict';

const dotenv = require('dotenv');
dotenv.config();

const updateProviderConfig = require('./config/provider-update');

const runCarris = require('./carris/run');
const runMetro = require('./metro/run');
const runGira = require('./gira/run');

runCarris(updateProviderConfig.carris);
runMetro(updateProviderConfig.metro.intervals);
runGira(updateProviderConfig.gira.intervals);
