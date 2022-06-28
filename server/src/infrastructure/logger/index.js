const { createLogger, format, transports } = require('winston');

const timestampFormat = format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' });
const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        timestampFormat,
        format.printf(({ timestamp, level, message }) => `[logger] ${timestamp} ${level}: ${message}`)
      ),
    }),
  ],
});

function info(message) {
  if (process.env.NODE_ENV === 'test') return;

  logger.info(message);
}

function error(message) {
  logger.error(message);
}

function warning(message) {
  logger.warn(message);
}

module.exports = { info, error, warning };
