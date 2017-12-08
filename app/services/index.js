'use strict';

const SERVICES_FOLDER_NAME = 'entities';

const AuthService = require(`./${SERVICES_FOLDER_NAME}/auth`);
const UserService = require(`./${SERVICES_FOLDER_NAME}/user`);
const DbService = require(`./${SERVICES_FOLDER_NAME}/db`);
const EntityLoaderService = require(`./${SERVICES_FOLDER_NAME}/entityLoader`);
const ResponseService = require(`./${SERVICES_FOLDER_NAME}/response`);
const LoggerService = require(`./${SERVICES_FOLDER_NAME}/logger`);
const CryptoService = require(`./${SERVICES_FOLDER_NAME}/crypto`);

module.exports = {
  AuthService,
  UserService,
  DbService,
  EntityLoaderService,
  ResponseService,
  LoggerService,
  CryptoService
};
