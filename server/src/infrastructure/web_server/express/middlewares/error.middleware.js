const { isJSONString } = require('../../../../application/helpers/types.helper');
const HttpRespone = require('../../../../application/payloads/http-response');
const errorParser = require('../../../error_parser');
const logger = require('../../../logger');

module.exports = function (err, _req, res, _next) {
  const message = err.message;
  const response = {};
  if (isJSONString(message)) response.data = JSON.parse(message);
  else response.message = message;

  const httpResponse = HttpRespone.fromJSON(
    {
      status: err.status || 500,
      success: false,
      ...response,
    },
    { serialize: false }
  );
  if (httpResponse.status === 500) logger.error(errorParser.parseErrorAsString(err));

  res.status(httpResponse.status).json(httpResponse.toJSON());
};
