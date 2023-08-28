const { VALIDATION_ERR } = require('../utils/constants');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = VALIDATION_ERR;
  }
}

module.exports = ValidationError;
