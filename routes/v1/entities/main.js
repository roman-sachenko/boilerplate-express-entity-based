'use strict';

const express = require('express');
const appRoute = express.Router({ strict: true });
const controller = require(`${basePath}/app/controllers/main`);

appRoute.get('/', controller.main);
appRoute.get('/status/', controller.status);


module.exports = appRoute;