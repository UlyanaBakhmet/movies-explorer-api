const { INTERNAL_SERVER_ERR } = require('../utils/constants');

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = INTERNAL_SERVER_ERR;
  }
}

module.exports = InternalServerError;
