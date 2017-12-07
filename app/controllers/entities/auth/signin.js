'use strict';

const services              = require(`${basePath}/app/services`);
const authService           = new services.AUTH();
const authStrategiesEnum    = require(`${basePath}/app/enums/`).AUTH.STRATEGIES;

module.exports = {
  signin: (req, res, next) => {
    
    authService.authenticate(req, authStrategiesEnum.USER_LOCAL)
      .then((result) => {
        services.RESPONSE.sendSuccessResponse(res, result);
      })
      .catch((err) => {
        next(err);
      });
  }
};
