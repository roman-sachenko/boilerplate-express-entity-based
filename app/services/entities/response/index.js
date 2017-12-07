'use strict';

/**
 * Service to close response data formatting
 * Uses express res.send method
 */

const MainService = require('../main');

module.exports = class ResponseService extends MainService {
  constructor() {

  }

  static sendSuccessResponse(response, data) {
    response.send({ success: true, data: data })
  }
  static sendErrorResponse(response, err) {
    let errStatus = err.status || 500;
    response.status(errStatus).send({ success: false, error: err });
  }
}