const { ValidationError, CastError } = require('mongoose').Error;
const Movie = require('../models/movie');
const {
  NotFoundError,
  InaccurateDataError,
  NoPermissionError,
} = require('../errors/errors');
const { ERROR_CODE, ERROR_MESSAGE } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
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
        return next(new InaccurateDataError(ERROR_MESSAGE.WRONG_DATA_MOVIE_CREATE));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movieToDelete) => {
      if (!movieToDelete) {
        throw new NotFoundError(ERROR_MESSAGE.MOVIE_NOT_FOUND);
      }
      if (movieToDelete.owner.toString() !== req.user._id.toString()) {
        throw new NoPermissionError(ERROR_MESSAGE.ACCESS_ERROR);
      }
      return movieToDelete.deleteOne();
    })
    .then(() => res.status(ERROR_CODE.OK).send({ message: 'Фильм был удален' }))
    .catch((err) => {
      if (err instanceof CastError) {
        return next(new InaccurateDataError(ERROR_MESSAGE.WRONG_DATA_MOVIE_DELETE));
      }
      return next(err);
    });
};
