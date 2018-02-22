const express   = require('express');
const appRoute  = express.Router({ strict: true });

appRoute.use('/v1', require('./index.routes'));

module.exports = appRoute;
