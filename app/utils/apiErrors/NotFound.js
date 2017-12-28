const httpStatus  = require('http-status');
const ApiError    = require('./ApiError');

module.exports = class NotFound extends ApiError {
  constructor(message) {
    super(message || 'Not Found', httpStatus.NOT_FOUND);
  }
};
