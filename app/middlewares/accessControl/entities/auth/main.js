const { AuthService, UserService } = require(`${basePath}/app/services`);
const { Forbidden } = require(`${basePath}/app/utils/apiErrors`);

const authService = new AuthService();
const userRoles = UserService.getRoles();


module.exports = {

  /**
   * auth middleware method to authenticate via token
   */

  async isAuthenticated(req, res, next) {

    try {
      await authService.verifyAccessToken(req);
      return next();
    } catch (err) {
      return next(err);
    }
  },

  async isAdmin(req, res, next) {
    if (req.user && req.user.role === userRoles.ADMIN) {
      return next();
    }
    return next(new Forbidden());
  },
};
