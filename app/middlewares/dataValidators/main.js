'use strict';

const _           = require('lodash');
const exceptions  = require(`${basePath}/app/exceptions`);

const mainDataValidator = {

  validateErrorsAsync: (req) => {

    return req
      .asyncValidationErrors()
      .catch(handleDataErrors)
      .finally((dataErrors) => {
        return dataErrors;
      });
  },

  validateErrorsSync: (req) => {
    return req.getValidationResult();
  },

  handleValidationResult: (dataValidationResultPromise, res, next) => {
    dataValidationResultPromise
      .then((validationResult) => {
        const validationErrors = validationResult.mapped();
        if(validationErrors && Object.keys(validationErrors) && Object.keys(validationErrors).length){
          return next(new exceptions.BadRequest(validationErrors));
        } 
        return next();
      })
  },

};

module.exports = mainDataValidator;


function handleDataErrors(errors) {
  return errors
}
