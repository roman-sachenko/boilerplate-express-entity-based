'use strict';

const services    = require(`${basePath}/app/services/`);
const UserModel   = services.DB_SERVICE.models()['User'];

module.exports = {
  isAdmin: (user) => {
    return !!(user && user.role === UserModel.ROLES.ADMIN);
  }
};