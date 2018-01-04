const express = require('express');
const appRoute = express.Router({ strict: true });

const controller = require(`${basePath}/app/controllers/user.controllers/auth.password.controller`);
const validator = require(`${basePath}/app/middlewares/dataValidators/entities/auth/password`);
const loader = require(`${basePath}/app/middlewares/entityLoaders/entities/auth/password`);

appRoute.post('/forgot-password', validator.sendForgotToken, controller.sendForgotToken);
appRoute.post('/forgot-password/:forgotToken', validator.resetPassword, loader.resetPassword, controller.resetPassword);


module.exports = appRoute;
