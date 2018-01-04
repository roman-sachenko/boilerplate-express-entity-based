const { AuthService } = require(`${basePath}/app/services`);


module.exports = {

  async isTokenValid(req, res, next) {

    try {
      const authService = new AuthService();
      await authService.verifyRefreshToken(req);
      return next();
    } catch (err) {
      return next(err);
    }
  },

};
