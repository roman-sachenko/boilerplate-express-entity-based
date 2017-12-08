'use strict';

const express   = require('express');
const appRoute  = express.Router({ strict: true });

/**
 * Main App Routes (Dummy)
 */
appRoute.use('/', require('./entities/main'));
/**
 * Auth Routes
 */
appRoute.use('/auth', require('./entities/auth/signup'));
appRoute.use('/auth', require('./entities/auth/signin'));
/**
 * User Routes
 */
appRoute.use('/users', require('./entities/user/main'));
appRoute.use('/users', require('./entities/user/password'));


module.exports = appRoute;