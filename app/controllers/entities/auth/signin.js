'use strict';

const { AuthService, ResponseService } = require(`${basePath}/app/services`);
const authStrategiesEnum    = require(`${basePath}/app/enums/`).AUTH.STRATEGIES;
const authService           = new AuthService();

module.exports = {
  signin: (req, res, next) => {
    
    authService.authenticate(req, authStrategiesEnum.USER_LOCAL)
      .then((result) => {
        ResponseService.sendSuccessResponse(res, result);
      })
      .catch((err) => {
        next(err);
      });
  }
};
