/**
 * Customer validators for express-validator module
 */

const moment = require('moment');

module.exports = {
  isDate: (value) => {
    return moment(value, 'YYYY-MM-DD').isValid();
  },

  isDateFromValid: (value) => {
    if (!value) {
      return true;
    }

    return (moment().diff(value, 'seconds') > 0);
  },
};
