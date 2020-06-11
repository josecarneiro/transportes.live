'use strict';

const config = require('./../config');

const { apiKey } = config.gira;

const Gira = require('transportes/gira');
const client = new Gira({ key: apiKey });

module.exports = client;
