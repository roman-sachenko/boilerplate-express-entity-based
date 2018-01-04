const express = require('express');

const appRoute = express.Router({ strict: true });

const controller = require(`${basePath}/app/controllers/auth.controllers/auth.signout.controller`);
const authMiddleware = require(`${basePath}/app/middlewares/accessControl/entities/auth/main`);

appRoute.post('/signout/',
  authMiddleware.isAuthenticated,
  controller.signOut,
);

module.exports = appRoute;
