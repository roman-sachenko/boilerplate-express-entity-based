'use strict';

module.exports = {
  isObjectValid: (inputObject) => {
    return !!(inputObject && Object.keys(inputObject) && Object.keys(inputObject).length);
  }
};