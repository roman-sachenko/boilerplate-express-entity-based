const express = require('express');

const appRoute = express.Router({ strict: true });

const controller = require(`${basePath}/app/controllers/auth.controllers/auth.token.controller`);
const acl = require(`${basePath}/app/middlewares/accessControl/entities/auth/token`);


/**
 * Regular sign in process using email and password
 */
appRoute.post('/token/refresh',
  acl.isTokenValid,
  controller.refresh,
);


module.exports = appRoute;
