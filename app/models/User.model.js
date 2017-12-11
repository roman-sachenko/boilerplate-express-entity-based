'use strict';

const userEnums     = require(`${basePath}/app/enums`).USER;
const { DbService } = require(`${basePath}/app/services`);
const schema        = require('./schemas/user.schema');

const UserModel = DbService.createModel('User', schema);

UserModel.ROLES = userEnums.ROLES;

module.exports = UserModel;