const mongoose = require('mongoose');

const Movie = require('../models/movie');

const ValidationError = require('../errors/ValidationError'); // 400
const ForbiddenError = require('../errors/ForbiddenError'); // 403
const NotFoundError = require('../errors/NotFoundError'); // 404

module.exports.saveMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((newMovie) => res.status(201).send(newMovie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('При создании фильма переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;
  Movie
    .findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Такой фильм не найден');
      }
      if (movie.owner.toString() !== userId) {
        throw new ForbiddenError('Нельзя удалить чужой фильм');
      }
      return Movie.deleteOne(movie)
        .then(() => res.status(200).send(movie))
        .catch((err) => {
          if (err instanceof mongoose.Error.CastError) {
            next(new ValidationError('Переданы некорректные данные'));
          }
          return next(err);
        });
    })
    .catch(next);
};
