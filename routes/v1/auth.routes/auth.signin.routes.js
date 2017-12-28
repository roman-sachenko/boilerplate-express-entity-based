const express = require('express');

const appRoute = express.Router({ strict: true });

const controller = require(`${basePath}/app/controllers/auth.controllers/auth.signin.controller`);
const validator = require(`${basePath}/app/middlewares/dataValidators/entities/auth/signin`);
const mapper = require(`${basePath}/app/middlewares/dataMappers/entities/auth/signin`);


appRoute.post('/signin/',
  validator.signin,
  mapper.signin,
  controller.signin);


module.exports = appRoute;
