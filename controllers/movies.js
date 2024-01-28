const { ValidationError, CastError } = require('mongoose').Error;
const Movie = require('../models/movie');
const {
  NotFoundError,
  InaccurateDataError,
  NoPermissionError,
} = require('../errors/errors');
const { ERROR_CODE } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const newMovie = new Movie(req.body);
  newMovie.owner = req.user._id;
  newMovie
    .save()
    .then((createdMovie) => createdMovie.populate(['owner']))
    .then((createdMovie) => res.status(ERROR_CODE.CREATED).send(createdMovie))
    .catch((err) => {
      if (err instanceof ValidationError) {
        return next(new InaccurateDataError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movieToDelete) => {
      if (!movieToDelete) {
        throw new NotFoundError('Фильм не найден');
      }
      if (movieToDelete.owner.toString() !== req.user._id.toString()) {
        throw new NoPermissionError('У вас нет прав на удаление чужого фильма');
      }
      return movieToDelete.deleteOne();
    })
    .then(() => res.status(ERROR_CODE.OK).send({ message: 'Карточка была удалена' }))
    .catch((err) => {
      if (err instanceof CastError) {
        return next(new InaccurateDataError('Переданы некорректные данные'));
      }
      return next(err);
    });
};
