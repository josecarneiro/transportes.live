const { NODE_ENV } = process.env;

module.exports = {
  firebase: {
    databaseName: NODE_ENV === 'production' ? 'transportes-live' : 'transportes-live-development',
    credentialsPath:
      NODE_ENV === 'production' ? './config/key-production.json' : './config/key-development.json'
  },
  metro: {
    apiKey: process.env.METRO_API_KEY
  }
};
