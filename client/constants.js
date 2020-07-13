'use strict';

const { NODE_ENV, URL = 'https://transportes.live', NETLIFY } = process.env;

const BUILD_ENVIRONMENT = NETLIFY ? 'remote' : 'local';

const ENVIRONMENT =
  NODE_ENV === 'development'
    ? 'development'
    : ORIGIN.includes('staging')
    ? 'staging'
    : 'production';

const ORIGIN = URL.replace(/https:\/\//, '');
const NAME = ORIGIN;

module.exports = {
  ENVIRONMENT,
  BUILD_ENVIRONMENT,
  URL,
  ORIGIN,
  NAME
};
