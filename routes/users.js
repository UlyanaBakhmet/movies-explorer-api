const usersRouter = require('express').Router();

const {
  validateUserUpdate,
} = require('../middlewares/routesValidation');

const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users');

// роут возвращает информацию о пользователе (email и имя)
usersRouter.get('/users/me', getCurrentUser);

// роут обновляет информацию о пользователе (email и имя)
usersRouter.patch('/users/me', validateUserUpdate, updateUser);

module.exports = usersRouter;
