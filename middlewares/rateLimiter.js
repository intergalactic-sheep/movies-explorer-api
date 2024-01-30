const rateLimit = require('express-rate-limit');
const { ERROR_MESSAGE } = require('../utils/constants');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: ERROR_MESSAGE.TOO_MANY_REQUESTS,
});

module.exports = limiter;
