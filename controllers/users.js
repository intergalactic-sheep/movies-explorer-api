const { ValidationError } = require('mongoose').Error;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  NotFoundError,
  InaccurateDataError,
  ConflictError,
} = require('../errors/errors');
const { ERROR_CODE, ERROR_MESSAGE } = require('../utils/constants');
const { devJWT } = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND);
      }
      res.send(user);
    })
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND);
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        return next(new InaccurateDataError(ERROR_MESSAGE.WRONG_DATA_USER_UPDATE));
      }
      if (err.code === 11000) {
        return next(new ConflictError(ERROR_MESSAGE.EMAIL_ALREADY_EXISTS));
      }
      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => res.status(ERROR_CODE.CREATED).send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        return next(new InaccurateDataError(ERROR_MESSAGE.WRONG_DATA_MOVIE_CREATE));
      }
      if (err.code === 11000) {
        return next(new ConflictError(ERROR_MESSAGE.EMAIL_ALREADY_EXISTS));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : devJWT,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};
