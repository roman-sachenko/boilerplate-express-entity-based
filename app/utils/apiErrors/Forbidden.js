const httpStatus  = require('http-status');
const ApiError    = require('./ApiError');

module.exports = class Forbidden extends ApiError {
  constructor(message) {
    super(message || 'Forbidden', httpStatus.FORBIDDEN);
  }
};
