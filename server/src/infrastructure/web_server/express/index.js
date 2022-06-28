const express = require('express');
const cors = require('cors');

const loggingMiddleware = require('./middlewares/logging.middleware');
const errorMiddleware = require('./middlewares/error.middleware');

const articleRoutes = require('./routes/article.routes');

const app = express();

function start(port) {
  app.use(loggingMiddleware);
  app.use(cors({ credentials: true, origin: [process.env.FRONT_APP_BASE_URL] }));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/v1/articles', articleRoutes);

  app.use(errorMiddleware);

  return new Promise((resolve) => {
    app.listen(port, resolve);
  });
}

module.exports = { start };
