const DATABASE_NAME = 'transportes-live';

module.exports = {
  firebase: {
    databaseName: DATABASE_NAME
  },
  metro: {
    apiKey: process.env.METRO_API_KEY
  }
};
