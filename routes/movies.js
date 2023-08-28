const moviesRouter = require('express').Router();

const { saveMovie, getMovies, deleteMovie } = require('../controllers/movies');
const { validateSaveMovie, validateDeleteMovie } = require('../middlewares/routesValidation');

// роут возвращает все сохранённые текущим пользователем фильмы
moviesRouter.get('/movies', getMovies);
// роут создаёт фильм
moviesRouter.post('/movies', validateSaveMovie, saveMovie);
// роут удаляет сохранённый фильм по id
moviesRouter.delete('/movies/:movieId', validateDeleteMovie, deleteMovie);

module.exports = moviesRouter;
