const { AuthService, ResponseService } = require(`${basePath}/app/services`);

module.exports = {
  async signOut(req, res, next) {
    try {
      await AuthService.signOut(req.user);
      return ResponseService.sendSuccessResponse(res, true);
    } catch (err) {
      return next(err);
    }
  },
};
