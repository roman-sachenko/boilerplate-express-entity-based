const express   = require('express');
const appRoute  = express.Router({ strict: true });

/**
 * Main App Routes (Dummy)
 */
appRoute.use('/', require('./main.routes'));
appRoute.use('/api', require('./main.routes'));

/**
 * API V1 Routes
 */
appRoute.use('/api', require('./v1'));

module.exports = appRoute;
