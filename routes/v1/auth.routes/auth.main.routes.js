const express = require('express');

const appRoute = express.Router({ strict: true });


const controller = require(`${basePath}/app/controllers/auth.controllers/auth.main.controller`);
const validator = require(`${basePath}/app/middlewares/dataValidators/entities/auth/main`);
const mapper = require(`${basePath}/app/middlewares/dataMappers/entities/auth/main`);
const authMiddleware = require(`${basePath}/app/middlewares/accessControl/entities/auth/main`);

/**
 * Regular sign in process using email and password
 */
appRoute.post('/signup/regular',
  validator.signUp, 
  mapper.signUp,
  controller.signUp,
);


appRoute.post('/signin',
  validator.signIn,
  controller.signIn,
);


appRoute.post('/signout',
  authMiddleware.isAuthenticated,
  controller.signOut,
);


module.exports = appRoute;
