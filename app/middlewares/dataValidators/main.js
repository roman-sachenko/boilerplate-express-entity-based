'use strict';

const _                 = require('lodash');
const { BadRequest }    = require(`${basePath}/app/utils/apiErrors/index`);


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
        if(!validationResult.isEmpty()){
          return next(new BadRequest(JSON.stringify(validationResult.mapped())));
        } 
        return next();
      });
  },

};

module.exports = mainDataValidator;


function handleDataErrors(errors) {
  return errors
}
