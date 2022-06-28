const webServer = require('./infrastructure/web_server');
const logger = require('./infrastructure/logger');
const envHelper = require('./application/helpers/env.helper');
const databaseHelper = require('./application/helpers/database.helper');

function initEnvironmentVariables() {
  envHelper.loadEnvFile('default');
  envHelper.loadEnvFile(process.env.NODE_ENV);
}

function startServer() {
  initEnvironmentVariables();

  const PORT = process.env.SERVER_PORT;
  webServer
    .start(PORT)
    .then(() => {
      logger.info(`Server has started on port ${PORT}`);

      databaseHelper
        .connectDatabase()
        .then(() => {
          logger.info(`Successfully connected to database at uri: ${process.env.MONGODB_URI}`);
        })
        .catch((error) => {
          logger.error(error.message);
        });
    })
    .catch((error) => {
      logger.error(error.message);
    });
}
startServer();
