'use strict';

const services      = require(`${basePath}/app/services`);
const AuthService   = services.AUTH;
const authService   = new AuthService();

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

  }
};