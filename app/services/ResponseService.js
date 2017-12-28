/**
 * Service to close response data formatting
 * Uses express res.send method
 */

const MainService = require('./MainService');

module.exports = class ResponseService extends MainService {
  constructor() {
    super('Response Service');
  }

  static sendSuccessResponse(response, data) {
    response.send({ success: true, data });
  }
  static sendErrorResponse(response, err) {
    const errStatus = err.status || 500;
    response.status(errStatus).send({ success: false, error: err.message });
  }
};
