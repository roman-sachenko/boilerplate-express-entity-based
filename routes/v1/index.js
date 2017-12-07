'use strict';

const express   = require('express');
const appRoute  = express.Router({ strict: true });

require('./entities/main')(appRoute);

/**
 * Auth Routes
 */
require('./entities/auth/signup')(appRoute);
require('./entities/auth/signin')(appRoute);

/**
 * User Routes
 */
require('./entities/user/password')(appRoute);

module.exports = appRoute;