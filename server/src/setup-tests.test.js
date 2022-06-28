const databaseHelper = require('./application/helpers/database.helper');
const envHelper = require('./application/helpers/env.helper');

before(async () => {
  envHelper.loadEnvFile('default');
  envHelper.loadEnvFile(process.env.NODE_ENV);

  await databaseHelper.connectDatabase();
});

beforeEach(async () => {
  await databaseHelper.clearDatabase();
});

after(async () => {
  await databaseHelper.closeDatabase();
});
