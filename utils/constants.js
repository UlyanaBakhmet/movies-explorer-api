const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

// ошибки
const VALIDATION_ERR = 400;
const AUTH_ERR = 401;
const FORBIDDEN_ERR = 403;
const NOT_FOUND_ERR = 404;
const CONFLICT_ERR = 409;
const INTERNAL_SERVER_ERR = 500;

module.exports = {
  urlRegex,
  VALIDATION_ERR,
  AUTH_ERR,
  FORBIDDEN_ERR,
  NOT_FOUND_ERR,
  CONFLICT_ERR,
  INTERNAL_SERVER_ERR,
};
