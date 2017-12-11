'use strict';

const cool                = require('cool-ascii-faces');
const { ResponseService}  = require(`${basePath}/app/services`);

module.exports = {
  main: async (req, res, next) => {
    ResponseService.sendSuccessResponse(res, cool());
  },

  status: async (req, res, next) => {
    ResponseService.sendSuccessResponse(res, { status: 'OK' });
  }
};