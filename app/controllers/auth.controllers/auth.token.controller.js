const { AuthService, ResponseService } = require(`${basePath}/app/services`);

module.exports = {
  async refresh(req, res, next) {
    try {
      const currentUser = req.user;
      const authService = new AuthService();
      const refreshResult = await authService.refreshToken(currentUser);

      ResponseService.sendSuccessResponse(res, refreshResult);
    } catch (err) {
      return next(err);
    }
  },
};
