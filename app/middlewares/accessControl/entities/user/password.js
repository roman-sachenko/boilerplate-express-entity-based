const authStrategiesEnum = require(`${basePath}/app/enums/`).AUTH.STRATEGIES;
const { AuthService } = require(`${basePath}/app/services`);
const { Forbidden } = require(`${basePath}/app/utils/apiErrors`);

module.exports = {
  async sendForgotToken(req, res, next) {
    return next();
  },

  async changePassword(req, res, next) {
    try {
      req.body.email = req.user.email;

      const authService = new AuthService();
      const authResult = await authService.authenticate(req, authStrategiesEnum.USER_LOCAL);

      if (req.user._id.toString() === authResult.user._id.toString()) {
        return next();
      }

      throw new Forbidden();

    } catch (err) {
      return next(err);
    }

  },
};
