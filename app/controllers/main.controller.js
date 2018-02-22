const { ResponseService, ServerService } = require(`${basePath}/app/services`);

module.exports = {
  async main(req, res, next) {
    ResponseService.sendSuccessResponse(res, { uptime: ServerService.getServerUptime() });
  },

  async status(req, res, next) {
    ResponseService.sendSuccessResponse(res, { status: 'OK', uptime: ServerService.getServerUptime() });
  },
};
