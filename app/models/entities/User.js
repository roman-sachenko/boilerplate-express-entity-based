'use strict';

const userEnums     = require(`${basePath}/app/enums`).USER;
const DbService     = require(`${basePath}/app/services`).DB_SERVICE;
const schema        = require('./schemas/user');

const UserModel = DbService.createModel('User', schema);

UserModel.ROLES = userEnums.ROLES;

module.exports = UserModel;