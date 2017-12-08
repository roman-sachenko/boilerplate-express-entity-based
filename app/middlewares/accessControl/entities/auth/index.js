'use strict';

const { AuthService, DbService } = require(`${basePath}/app/services`);
const { Forbidden } = require(`${basePath}/app/utils/apiErrors`);

const authService   = new AuthService();
const UserModel     = DbService.models().User;


module.exports = {

  /**
   * auth middleware method to authenticate via token
   */

  isAuthenticated: (req, res, next) => {
    
    authService.verifyToken(req, AuthService.getStrategies().USER_LOCAL)
      .then((authResult) => {
        next();
      })
      .catch((err) => {
        next(err);
      })
  },

  isAdmin: (req, res, next) => {
    if(req.user && req.user.role === UserModel.ROLES.ADMIN) {
      return next();
    }
    next(new Forbidden());
  }
};