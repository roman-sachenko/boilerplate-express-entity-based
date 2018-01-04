const express = require('express');
const appRoute = express.Router({ strict: true });

const controller = require(`${basePath}/app/controllers/user.controllers/user.password.controller`);
const acl = require(`${basePath}/app/middlewares/accessControl/entities/user/password`);
const validator = require(`${basePath}/app/middlewares/dataValidators/entities/user/password`);
const loader = require(`${basePath}/app/middlewares/entityLoaders/entities/user/password`);
const authMiddleware = require(`${basePath}/app/middlewares/accessControl/entities/auth/main`);


appRoute.post('/:userId/password',
  authMiddleware.isAuthenticated,
  acl.changePassword,
  validator.changePassword,
  loader.changePassword,
  controller.changePassword,
);

module.exports = appRoute;
