const mainValidator = require('../../main');
const userValidatorOptions = require('../../options/index').UserOptions;
const { check } = require('express-validator/check');


module.exports = {
  sendForgotToken(req, res, next) {
    return next();
  },

  changePassword: [
    check('userId').exists().isMongoId().withMessage('Valid user id should be provided'),
    check('new_password').exists().isLength(userValidatorOptions.password).withMessage('Valid password should be provided (String, length min: 6)'),
    check('password').exists().withMessage('Valid password should be provided '),
    (req, res, next) => {
      mainValidator.handleValidationResult(mainValidator.validateErrorsSync(req), res, next);
    },
  ],

};
