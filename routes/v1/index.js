const express   = require('express');
const appRoute  = express.Router({ strict: true });

/**
 * Main App Routes (Dummy)
 */
appRoute.use('/', require('./main.routes'));
/**
 * Auth Routes
 */
appRoute.use('/auth', require('./auth.routes/auth.main.routes'));
appRoute.use('/auth', require('./auth.routes/auth.token.routes'));
// appRoute.use('/auth', require('./auth.routes/auth.password.routes'));
/**
 * User Routes
 */
appRoute.use('/users', require('./user.routes/user.main.routes'));
appRoute.use('/users', require('./user.routes/user.password.routes'));


module.exports = appRoute;
