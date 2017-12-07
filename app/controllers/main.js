'use strict';

const cool      = require('cool-ascii-faces');
const services  = require(`${basePath}/app/services`);

module.exports = {
  main: (req, res, next) => {
    services.RESPONSE.sendSuccessResponse(res, cool());
  },

  status: (req, res, next) => {
    services.RESPONSE.sendSuccessResponse(res, { status: 'OK' });
  }
};