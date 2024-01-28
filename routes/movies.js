const movieRouter = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { movieValidation, movieIdValidation } = require('../middlewares/customValidation');

movieRouter.get('/', getMovies);
movieRouter.post('/', movieValidation, createMovie);
movieRouter.delete('/:_id', movieIdValidation, deleteMovie);

module.exports = movieRouter;
