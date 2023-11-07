// централизованный обработчик ошибок
const { INTERNAL_SERVER_ERR } = require('../utils/constants');

const handleErrors = ((err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERR, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === INTERNAL_SERVER_ERR
        ? 'Ошибка на сервере'
        : message,
    });
  next();
});

module.exports = handleErrors;
