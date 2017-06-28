'use strict';

const controller  = require(`${basePath}/app/controllers/entities/user/password`);
const validator   = require(`${basePath}/app/middlewares/dataValidators/entities/user/password`);
const loader      = require(`${basePath}/app/middlewares/entityLoaders/entities/user/password`);

module.exports = (router) => {
  router
    .post('/users/forgot-password',                 validator.sendForgotToken, controller.sendForgotToken)
    .post('/users/forgot-password/:forgotToken',    validator.changePassword, loader.changePassword, controller.changePassword)
};