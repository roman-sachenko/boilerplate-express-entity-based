'use strict';

const SERVICES_FOLDER_NAME = 'entities';

module.exports = {
  AUTH            : require(`./${SERVICES_FOLDER_NAME}/auth`),
  USER            : require(`./${SERVICES_FOLDER_NAME}/user`),
  DB_SERVICE      : require(`./${SERVICES_FOLDER_NAME}/db`),
  ENTITY_LOADER   : require(`./${SERVICES_FOLDER_NAME}/entityLoader`),
  RESPONSE        : require(`./${SERVICES_FOLDER_NAME}/response`),
  LOGGER          : require(`./${SERVICES_FOLDER_NAME}/logger`),
  CRYPTO          : require(`./${SERVICES_FOLDER_NAME}/crypto`)
};
