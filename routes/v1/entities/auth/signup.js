'use strict';

const controller  = require(`${basePath}/app/controllers/entities/auth/signup`);
const validator   = require(`${basePath}/app/middlewares/dataValidators/entities/auth/signup`);
const mapper      = require(`${basePath}/app/middlewares/dataMappers/entities/auth/signup`);

module.exports = (router) => {
router
  .post('/auth/signup/regular/', validator.regular, mapper.regular, controller.regular);
};