const { ERROR_MESSAGE } = require('../utils/constants');

module.exports.errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? ERROR_MESSAGE.SERVER_INTERNAL_ERROR : message,
  });
  next();
};
