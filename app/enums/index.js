'use strict';

/**
 * App Enumerations
 */

module.exports = {
  WORK_ENVS : require('./entities/env'),
  USER: {
    ROLES: require('./entities/user/roles')
  },
  AUTH: {
    STRATEGIES    : require('./entities/auth/strategies'),
    TOKEN_TYPES   : require('./entities/auth/tokenTypes')
  }
};