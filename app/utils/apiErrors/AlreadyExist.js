const ApiError    = require('./ApiError');
const httpStatus  = require('http-status');

module.exports = class AlreadyExist extends ApiError {
  constructor(message) {
    super(message || 'Already Exist', httpStatus.CONFLICT);
  }
};
