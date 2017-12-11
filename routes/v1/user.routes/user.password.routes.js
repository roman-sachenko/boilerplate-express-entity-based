'use strict';

const express = require('express');
const appRoute = express.Router({ strict: true });

const controller = require(`${basePath}/app/controllers/user.controllers/user.password.controller`);
const validator = require(`${basePath}/app/middlewares/dataValidators/entities/user/password`);
const loader = require(`${basePath}/app/middlewares/entityLoaders/entities/user/password`);

appRoute.post('/forgot-password', validator.sendForgotToken, controller.sendForgotToken);
appRoute.post('/forgot-password/:forgotToken', validator.changePassword, loader.changePassword, controller.changePassword);


module.exports = appRoute;