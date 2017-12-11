'use strict';

const express = require('express');
const appRoute = express.Router({ strict: true });

const controller = require(`${basePath}/app/controllers/auth.controllers/auth.signin.controller`);
const validator = require(`${basePath}/app/middlewares/dataValidators/entities/auth/signin`);
const acl = require(`${basePath}/app/middlewares/accessControl/entities/auth/index`);
const mapper = require(`${basePath}/app/middlewares/dataMappers/entities/auth/signin`);
const passport = require(`${basePath}/app/libs/passport`);


appRoute.post('/signin/', validator.signin, controller.signin);


module.exports = appRoute;