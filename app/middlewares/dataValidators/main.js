'use strict';

const _           = require('lodash');
const exceptions  = require(`${basePath}/app/exceptions`);

var mainDataValidator = {
  validateErrorsAsync: (req) => {
    return req
      .asyncValidationErrors()
      .catch(handleDataErrors)
      .finally((dataErrors) => {
        return dataErrors;
      });
  },

  validateErrorsSync: (req) => {
    return req.validationErrors(true);
  },

  handleValidationResult: (dataValidationError, res, next) => {
    if(dataValidationError && Object.keys(dataValidationError) && Object.keys(dataValidationError).length){
      next(new exceptions.BadRequest(dataValidationError));
    } else {
      next();
    }
  }

};

module.exports = mainDataValidator;


function handleDataErrors(errors) {
  return errors
}
