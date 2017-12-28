const httpStatus = require('http-status');

/**
 * @extends Error
 */

module.exports = class ApiError extends Error {
  constructor(message, status) {
    super(message);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.status = status || httpStatus.INTERNAL_SERVER_ERROR;
    this.message = message;
  }
};
