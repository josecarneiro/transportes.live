'use strict';

const config = require('./../config');

const { apiKey } = config.metro;

const Metro = require('transportes/metro');
const client = new Metro({ key: apiKey, allowInsecureRequests: true });

module.exports = client;
