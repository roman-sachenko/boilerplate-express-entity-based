'use strict';

const controller  = require(`${basePath}/app/controllers/entities/auth/signin`);
const validator   = require(`${basePath}/app/middlewares/dataValidators/entities/auth/signin`);
const acl         = require(`${basePath}/app/middlewares/accessControl/entities/auth/index`);
const mapper      = require(`${basePath}/app/middlewares/dataMappers/entities/auth/signin`);

const passport    = require(`${basePath}/app/libs/passport`);

module.exports = (router) => {
  router
    .post('/auth/signin/', validator.signin, controller.signin)
};