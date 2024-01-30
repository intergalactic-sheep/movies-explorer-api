const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/errors');
const { ERROR_MESSAGE } = require('../utils/constants');
const { devJWT } = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(ERROR_MESSAGE.AUTHORIZATION_ERROR));
    return;
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : devJWT,
    );
  } catch (err) {
    next(new UnauthorizedError(ERROR_MESSAGE.AUTHORIZATION_ERROR));
    return;
  }

  req.user = payload;

  next();
};
