const express = require('express');

const appRoute = express.Router({ strict: true });


const controller = require(`${basePath}/app/controllers/auth.controllers/auth.signup.controller`);
const validator = require(`${basePath}/app/middlewares/dataValidators/entities/auth/signup`);
const mapper = require(`${basePath}/app/middlewares/dataMappers/entities/auth/signup`);

/**
 * Regular sign in process using email and password
 */
appRoute.post('/signup/regular',
  validator.regular, 
  mapper.regular,
  controller.regular);


module.exports = appRoute;
