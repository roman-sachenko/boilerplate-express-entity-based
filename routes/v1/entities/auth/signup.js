'use strict';

const express = require('express');
const appRoute = express.Router({ strict: true });


const controller  = require(`${basePath}/app/controllers/entities/auth/signup`);
const validator   = require(`${basePath}/app/middlewares/dataValidators/entities/auth/signup`);
const mapper      = require(`${basePath}/app/middlewares/dataMappers/entities/auth/signup`);

appRoute.post('/signup/regular/', validator.regular, mapper.regular, controller.regular);


module.exports = appRoute;