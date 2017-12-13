'use strict';

const { AuthService, DbService } = require(`${basePath}/app/services`);
const { Forbidden } = require(`${basePath}/app/utils/apiErrors`);

const authService   = new AuthService();
const UserModel     = DbService.models().User;


module.exports = {

  /**
   * auth middleware method to authenticate via token
   */

  async isAuthenticated(req, res, next) {

    try {
      const authResult = await authService.verifyToken(req, AuthService.getStrategies().USER_LOCAL);
      return next();
    } catch(err) {
      return next(err);
    }
  },

  async isAdmin(req, res, next) {
    if(req.user && req.user.role === UserModel.ROLES.ADMIN) {
      return next();
    }
    return next(new Forbidden());
  }
};