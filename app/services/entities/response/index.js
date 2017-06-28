'use strict';

/**
 * Service to close response data formatting
 * Uses express res.send method
 */
module.exports = {
  sendSuccessResponse: (response, data) => {
    response.send({ success: true, data: data })
  },

  sendErrorResponse: (response, err) => {
    let errStatus = err.status || 500;
    response.status(errStatus).send({ success: false, error: err });
  }
};