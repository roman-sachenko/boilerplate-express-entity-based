const { AuthService, ResponseService } = require(`${basePath}/app/services`);
const authStrategiesEnum = require(`${basePath}/app/enums/`).AUTH.STRATEGIES;
const authService = new AuthService();

module.exports = {
  async signin(req, res, next) {

    try {
      const authResult = await authService.authenticate(req, authStrategiesEnum.USER_LOCAL);
      ResponseService.sendSuccessResponse(res, authResult);
    } catch (err) {
      return next(err);
    }
  },
};
