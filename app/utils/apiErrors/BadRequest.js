const ApiError    = require('./ApiError');
const httpStatus  = require('http-status');

module.exports = class BadRequest extends ApiError {
  constructor(message) {
    super(message || 'Bad Request', httpStatus.BAD_REQUEST);
  }
};
