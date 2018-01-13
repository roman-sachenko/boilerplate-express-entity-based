const cool = require('cool-ascii-faces');
const { ResponseService } = require(`${basePath}/app/services`);

module.exports = {
  async main(req, res, next) {
    ResponseService.sendSuccessResponse(res, cool());
  },

  async status(req, res, next) {
    ResponseService.sendSuccessResponse(res, { status: 'OK' });
  },
};
