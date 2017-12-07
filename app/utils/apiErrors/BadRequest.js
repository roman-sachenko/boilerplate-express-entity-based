'use strict';

const httpStatus  = require('http-status');
const ApiError    = require('./ApiError');

module.exports = class BadRequest extends ApiError {
  constructor (message) {
    super(message || 'Bad Request', 400);
  }
};