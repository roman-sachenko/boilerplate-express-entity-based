'use strict';

const express = require('express');
const appRoute = express.Router({ strict: true });

const controller  = require(`${basePath}/app/controllers/entities/user/main`);
const acl         = require(`${basePath}/app/middlewares/accessControl/entities/user/main`);
const validator   = require(`${basePath}/app/middlewares/dataValidators/entities/user/main`);
const loader      = require(`${basePath}/app/middlewares/entityLoaders/entities/user/main`);

appRoute.get('/', acl.getAll, loader.getAll, controller.getAll);
appRoute.get('/:userId', acl.getOne, validator.getOne, loader.getOne, controller.getOne);
appRoute.put('/:userId', acl.updateOne, validator.updateOne, loader.updateOne, controller.updateOne);
appRoute.delete('/:userId', acl.deleteOne, validator.deleteOne, loader.deleteOne, controller.deleteOne);


module.exports = appRoute;