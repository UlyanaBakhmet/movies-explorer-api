const router = require('express').Router(); // создание роутера
const usersRouter = require('./users');
const moviesRouter = require('./movies');

const { createUser, login } = require('../controllers/users');
const { validateSignIn, validateSignUp } = require('../middlewares/routesValidation');
const auth = require('../middlewares/auth');

const NotFoundError = require('../errors/NotFoundError'); // 404

// роут для логина
// проверяет переданные в теле почту и пароль и возвращает JWT
router.post('/signin', validateSignIn, login);

// роут для регистрации
// создаёт пользователя с переданными в теле email, password и name
router.post('/signup', validateSignUp, createUser);

router.use(auth); // ниже все будут защищены авторизацией

router.use('/', usersRouter); // запускаем. передали ф своим обработчикам запроса
router.use('/', moviesRouter);
// неизвестного маршрута
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
