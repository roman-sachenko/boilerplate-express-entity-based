'use strict';

const AlreadyExist      = require('./AlreadyExist');
const BadRequest        = require('./BadRequest');
const Forbidden         = require('./Forbidden');
const NotAuthorized     = require('./NotAuthorized');
const NotFound          = require('./NotFound');

module.exports = {
  AlreadyExist,
  BadRequest,
  Forbidden,
  NotAuthorized,
  NotFound,
};
